const nodemailer = require('nodemailer');

const getEnv = (name, { optional = false } = {}) => {
  const v = process.env[name];
  if (!v && !optional) throw new Error(`Missing required env var: ${name}`);
  return v;
};

const getScopedEnv = (scope, name, { optional = false } = {}) => {
  if (!scope) return getEnv(name, { optional });
  const scopedName = `${scope}_${name}`;
  const v = process.env[scopedName];
  if (v !== undefined && v !== '') return v;
  return getEnv(name, { optional });
};

const transportByScope = new Map();

const parseBool = (v) => {
  if (v === undefined || v === null) return null;
  const s = String(v).trim().toLowerCase();
  if (!s) return null;
  return ['true', '1', 'yes', 'on'].includes(s);
};

const getTransport = (scope) => {
  const key = scope || '__default__';
  const cached = transportByScope.get(key);
  if (cached) return cached;

  const host = getScopedEnv(scope, 'SMTP_HOST');
  const port = Number(getScopedEnv(scope, 'SMTP_PORT'));

  const secureOverride = parseBool(getScopedEnv(scope, 'SMTP_SECURE', { optional: true }));
  const secure = secureOverride === null ? port === 465 : secureOverride;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getScopedEnv(scope, 'SMTP_USER'),
      pass: getScopedEnv(scope, 'SMTP_PASS'),
    },
  });

  transportByScope.set(key, transport);
  return transport;
};

const safeStr = (v) => {
  if (v === null || v === undefined) return '';
  return String(v);
};

const sendMail = async ({ scope, subject, text, replyTo, to: toOverride } = {}) => {
  const from = getScopedEnv(scope, 'MAIL_FROM');
  const to = toOverride || getScopedEnv(scope, 'MAIL_TO');

  const transport = getTransport(scope);

  await transport.sendMail({
    from,
    to,
    subject: safeStr(subject).slice(0, 200),
    text: safeStr(text).slice(0, 10000),
    replyTo: replyTo ? safeStr(replyTo).slice(0, 320) : undefined,
  });
};

module.exports = {
  sendMail,
};
