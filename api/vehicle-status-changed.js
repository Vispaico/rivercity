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

const getExpectedSecret = () => {
  return (
    String(process.env.VEHICLE_WEBHOOK_SECRET || '').trim() ||
    String(process.env.BOOKING_WEBHOOK_SECRET || '').trim() ||
    ''
  );
};

const fmtMoney = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? `$${n}` : '';
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const expectedSecret = getExpectedSecret();
    const providedSecret = String(req.headers['x-webhook-secret'] || '').trim();
    if (!expectedSecret) {
      res.status(500).json({
        error: 'Server misconfigured (missing VEHICLE_WEBHOOK_SECRET or BOOKING_WEBHOOK_SECRET)',
      });
      return;
    }
    if (!providedSecret || providedSecret !== expectedSecret) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const body = await readJsonBody(req);
    const record = body?.record || body?.new || null;
    const oldRecord = body?.old_record || body?.old || body?.oldRecord || null;

    if (!record) {
      res.status(400).json({ error: 'Missing record' });
      return;
    }

    const ownerId = String(record.owner_user_id || '').trim();
    if (!ownerId) {
      res.status(200).json({ ok: true, skipped: true, reason: 'No owner_user_id' });
      return;
    }

    const newStatus = String(record.listing_status || '').trim();
    const oldStatus = String(oldRecord?.listing_status || '').trim();

    if (!newStatus || newStatus === oldStatus) {
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    const vehicleId = String(record.id || '').trim();
    const vehicleName = String(record.name || '').trim();
    const category = String(record.category || '').trim();
    const pricePerDay = record.price_per_day;
    const reason = String(record.rejection_reason || '').trim();

    const supabase = await getSupabaseAdmin();
    const { data: userRes, error: userErr } = await supabase.auth.admin.getUserById(ownerId);
    if (userErr) {
      res.status(500).json({ error: userErr.message });
      return;
    }
    const ownerEmail = String(userRes?.user?.email || '').trim();

    // Notify admin (you) when a vehicle is submitted.
    if (newStatus === 'submitted') {
      await sendMail({
        scope: 'CONTACT',
        subject: `Vehicle submitted for approval: ${vehicleName || vehicleId}`,
        text: [
          'A partner vehicle was submitted for approval.',
          '',
          `Vehicle: ${vehicleName}`,
          `Category: ${category}`,
          `Vehicle ID: ${vehicleId}`,
          `Owner user_id: ${ownerId}`,
          `Owner email: ${ownerEmail}`,
          record.image_url ? `Image URL: ${String(record.image_url)}` : null,
          record.description ? '' : null,
          record.description ? 'Description:' : null,
          record.description ? String(record.description) : null,
          '',
        ]
          .filter(Boolean)
          .join('\n'),
      });
    }

    // Notify owner when approved/rejected.
    if ((newStatus === 'approved' || newStatus === 'rejected') && ownerEmail) {
      const subject =
        newStatus === 'approved'
          ? `Your vehicle listing was approved: ${vehicleName || 'Vehicle'}`
          : `Your vehicle listing was rejected: ${vehicleName || 'Vehicle'}`;

      const lines = [
        'Your vehicle listing status has been updated.',
        '',
        `Vehicle: ${vehicleName}`,
        `Category: ${category}`,
        `Status: ${newStatus}`,
        vehicleId ? `Reference: ${vehicleId}` : null,
        newStatus === 'approved' && pricePerDay ? `Price/day: ${fmtMoney(pricePerDay)}` : null,
        newStatus === 'rejected' && reason ? '' : null,
        newStatus === 'rejected' && reason ? 'Reason:' : null,
        newStatus === 'rejected' && reason ? reason : null,
        '',
        'If you have questions, reply to this email.',
      ].filter(Boolean);

      await sendMail({
        scope: 'CONTACT',
        to: ownerEmail,
        subject,
        text: lines.join('\n'),
        replyTo: process.env.CONTACT_SMTP_USER || undefined,
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Internal error' });
  }
};
