const http = require('http');
const fs   = require('fs');
const path = require('path');

const MIME = {
  html: 'text/html',
  css:  'text/css',
  js:   'application/javascript',
  json: 'application/json',
  svg:  'image/svg+xml',
  ico:  'image/x-icon',
  png:  'image/png',
};

const ROOT = path.join(__dirname, '..');

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = filePath.split('.').pop();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(8080, () => {
  console.log('Dev server running at http://localhost:8080');
});
