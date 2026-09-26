import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'neaxuyc2';
    const apiKey = process.env.VITE_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '668675622836194';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'COGEWZlmzszuVxbR0dVaI-EwUe8';

    // Parse body (supports JSON or parsed body)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // Raw string
      }
    }

    const file = body?.file || body?.image;
    if (!file) {
      return res.status(400).json({ error: 'No file or image provided in request' });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'sraqua';
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    const formData = new URLSearchParams();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('folder', folder);
    formData.append('signature', signature);

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok || !data.secure_url) {
      console.error('Cloudinary API upload error:', data);
      return res.status(500).json({ error: data.error?.message || 'Failed to upload to Cloudinary' });
    }

    return res.status(200).json({
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    });
  } catch (error: any) {
    console.error('Upload handler exception:', error);
    return res.status(500).json({ error: error.message || 'Internal server error during upload' });
  }
}
