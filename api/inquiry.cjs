const { sendMail } = require('./_lib/mailer.cjs');

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

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();
    const source = String(body?.source || '').trim();

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    if (!/.+@.+\..+/.test(email)) {
      res.status(400).json({ error: 'Invalid email' });
      return;
    }

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (message.length > 5000) {
      res.status(400).json({ error: 'Message too long' });
      return;
    }

    const referer = String(req.headers.referer || '');
    const userAgent = String(req.headers['user-agent'] || '');
    const now = new Date().toISOString();

    await sendMail({
      scope: 'CONTACT',
      subject: `New inquiry${source ? ` (${source})` : ''}`,
      replyTo: email,
      text: [
        'New inquiry received.',
        '',
        `From: ${email}`,
        `Time: ${now}`,
        referer ? `Referer: ${referer}` : null,
        userAgent ? `User-Agent: ${userAgent}` : null,
        '',
        'Message:',
        message,
        '',
      ]
        .filter(Boolean)
        .join('\n'),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Internal error' });
  }
};
