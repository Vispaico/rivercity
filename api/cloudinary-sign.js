import crypto from 'node:crypto';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { requireSupabaseUser } = require('./_lib/requireSupabaseUser.cjs');

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

const getEnv = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
};

const getCloudName = () => process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || getEnv('CLOUDINARY_CLOUD_NAME');
const getApiKey = () => process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY || getEnv('CLOUDINARY_API_KEY');

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    await requireSupabaseUser(req);

    const body = await readJsonBody(req);

    const folder = String(process.env.CLOUDINARY_VEHICLE_FOLDER || 'rvc/partner-vehicles');
    const requestedFolder = String(body?.folder || '').trim();

    if (requestedFolder && requestedFolder !== folder) {
      res.status(400).json({ error: 'Invalid folder' });
      return;
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const apiSecret = getEnv('CLOUDINARY_API_SECRET');

    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    res.status(200).json({
      cloudName: getCloudName(),
      apiKey: getApiKey(),
      folder,
      timestamp,
      signature,
    });
  } catch (err) {
    res.status(err?.statusCode || 500).json({ error: err?.message || 'Internal error' });
  }
};
