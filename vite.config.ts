import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import crypto from 'crypto';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'cloudinary-upload-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/upload', (req, res) => {
            // Enable CORS
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                let parsed: any = {};
                try {
                  parsed = JSON.parse(body);
                } catch {
                  parsed = {};
                }

                const file = parsed.file || parsed.image;
                if (!file) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Missing image file in request' }));
                  return;
                }

                const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || 'neaxuyc2';
                const apiKey = env.VITE_CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY || '668675622836194';
                const apiSecret = env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || 'COGEWZlmzszuVxbR0dVaI-EwUe8';

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
                res.setHeader('Content-Type', 'application/json');

                if (uploadRes.ok && data.secure_url) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({ url: data.secure_url }));
                } else {
                  console.error('Cloudinary dev error:', data);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: data.error?.message || 'Cloudinary upload failed' }));
                }
              } catch (err: any) {
                console.error('Upload middleware error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
