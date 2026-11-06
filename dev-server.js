const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const WORKER_HOST = 'wedding-r2-api.mubaraqsanusi908.workers.dev';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ics': 'text/calendar; charset=UTF-8',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  // 1. Proxy API routes to Cloudflare Worker (mimicking Vercel rewrites)
  if (req.url.startsWith('/api/')) {
    const proxyHeaders = { ...req.headers, host: WORKER_HOST };
    delete proxyHeaders['content-length'];

    const proxyReq = https.request({
      hostname: WORKER_HOST,
      port: 443,
      path: req.url,
      method: req.method,
      headers: proxyHeaders
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Proxy error to Cloudflare Worker', details: err.message }));
    });

    req.pipe(proxyReq);
    return;
  }

  // 2. Serve static files
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`✨ Royal Wedding E-Invite & Registration App running at:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`☁️  API Proxying to: https://${WORKER_HOST}`);
});
