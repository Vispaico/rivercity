import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { sendMail } = require('./_lib/mailer.cjs');
const { getSupabaseAdmin } = require('./_lib/supabaseAdmin.cjs');

const readJsonBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return null;
  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const isEmail = (email) => /.+@.+\..+/.test(String(email || '').trim());

const parseDateUtc = (dateStr) => {
  // dateStr is expected to be YYYY-MM-DD
  const m = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) ? dateStr : null;
  if (!m) return null;
  const d = new Date(`${dateStr}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
};

const diffDays = (startDateStr, endDateStr) => {
  const a = parseDateUtc(startDateStr);
  const b = parseDateUtc(endDateStr);
  if (!a || !b) return null;
  const ms = b.getTime() - a.getTime();
  const days = Math.round(ms / 86400000);
  return Number.isFinite(days) ? days : null;
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const expectedSecret = String(process.env.BOOKING_WEBHOOK_SECRET || '').trim();
    const providedSecret = String(req.headers['x-webhook-secret'] || '').trim();
    if (!expectedSecret) {
      res.status(500).json({ error: 'Server misconfigured (missing BOOKING_WEBHOOK_SECRET)' });
      return;
    }
    if (!providedSecret || providedSecret !== expectedSecret) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const body = await readJsonBody(req);

    // Supports:
    // - { bookingId: '...' }
    // - Supabase DB webhook payloads (commonly { record: { id: '...' }, ... })
    const bookingId = String(body?.bookingId || body?.record?.id || body?.new?.id || '').trim();

    if (!bookingId) {
      res.status(400).json({ error: 'bookingId is required' });
      return;
    }

    const supabase = await getSupabaseAdmin();

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(
        'id, start_date, end_date, status, created_at, intake, notified_at, booking_items(quantity, vehicle_id, vehicles(name, category, price_per_day))'
      )
      .eq('id', bookingId)
      .maybeSingle();

    if (bookingError) {
      res.status(500).json({ error: bookingError.message });
      return;
    }
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.notified_at) {
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    const startDate = String(booking.start_date || '').trim();
    const endDate = String(booking.end_date || '').trim();
    const dayCount = diffDays(startDate, endDate);
    const intake = booking.intake && typeof booking.intake === 'object' ? booking.intake : {};
    const items = Array.isArray(booking.booking_items) ? booking.booking_items : [];

    const intakeEmail = String(intake?.email || '').trim();
    const replyTo = isEmail(intakeEmail) ? intakeEmail : undefined;

    const itemLines = items
      .slice(0, 30)
      .map((it) => {
        const qty = Number(it?.quantity || 0);
        const name = String(it?.vehicles?.name || it?.vehicle_id || 'Vehicle');
        const category = it?.vehicles?.category ? ` (${String(it.vehicles.category)})` : '';
        const price = it?.vehicles?.price_per_day ?? null;
        const priceStr = price === null || price === undefined || price === '' ? '' : ` — $${Number(price)}/day`;
        return `- x${qty} ${name}${category}${priceStr}`;
      });

    const contactChannels = Array.isArray(intake?.contact_channels) ? intake.contact_channels : [];

    const now = new Date().toISOString();
    const referer = String(req.headers.referer || '');
    const userAgent = String(req.headers['user-agent'] || '');

    // 1) Admin notification
    await sendMail({
      scope: 'BOOKING',
      subject: `New booking received: ${bookingId}`,
      replyTo,
      text: [
        'New booking received.',
        '',
        `Booking ID: ${bookingId}`,
        `Dates: ${startDate} → ${endDate}${Number.isFinite(dayCount) && dayCount > 0 ? ` (${dayCount} day${dayCount === 1 ? '' : 's'})` : ''}`,
        `Time: ${now}`,
        referer ? `Referer: ${referer}` : null,
        userAgent ? `User-Agent: ${userAgent}` : null,
        '',
        'Items:',
        itemLines.length ? itemLines.join('\n') : '- (none)',
        '',
        'Customer:',
        `Name: ${String(intake?.full_name || '')}`,
        `Phone: ${String(intake?.phone || '')}`,
        `Email: ${intakeEmail}`,
        `Address: ${String(intake?.address || '')}`,
        `Passport: ${String(intake?.passport_number || '')}`,
        `Contact apps: ${contactChannels.length ? contactChannels.join(', ') : String(intake?.contact_channels_none ? 'none' : '')}`,
        '',
        intake?.notes ? 'Notes:' : null,
        intake?.notes ? String(intake.notes) : null,
        '',
      ]
        .filter(Boolean)
        .join('\n'),
    });

    // Mark as notified ASAP to avoid duplicate admin emails (even if the renter email fails).
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ notified_at: now })
      .eq('id', bookingId);

    if (updateError) {
      res.status(500).json({ error: updateError.message });
      return;
    }

    // 2) Renter confirmation (best-effort)
    let renterEmailSent = false;
    const renterEmail = isEmail(intakeEmail) ? intakeEmail : null;

    if (renterEmail) {
      try {
        await sendMail({
          scope: 'BOOKING',
          to: renterEmail,
          subject: `Booking received — Reference ${bookingId}`,
          text: [
            'Thanks for your booking — we have received it.',
            '',
            `Booking reference: ${bookingId}`,
            `Dates: ${startDate} → ${endDate}${Number.isFinite(dayCount) && dayCount > 0 ? ` (${dayCount} day${dayCount === 1 ? '' : 's'})` : ''}`,
            '',
            'Items:',
            itemLines.length ? itemLines.join('\n') : '- (none)',
            '',
            'We will contact you shortly to confirm details.',
            '',
            'RiverCity Bike Rentals',
          ]
            .filter(Boolean)
            .join('\n'),
        });
        renterEmailSent = true;
      } catch {
        // Best-effort: admin notification already sent.
      }
    }

    res.status(200).json({ ok: true, renterEmailSent });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Internal error' });
  }
};
