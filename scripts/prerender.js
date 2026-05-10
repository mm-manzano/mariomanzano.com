import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { createReadStream } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url ));
const distDir = path.join(__dirname, '..', 'dist');

const routes = [
  '/', '/strategy-hub', '/home-value', '/net-sheet', '/sell-vs-rent',
  '/remodel-vs-sell', '/homeowner-guide', '/about', '/contact',
  '/privacy-policy', '/terms-of-service',
  '/es', '/es/strategy-hub', '/es/home-value', '/es/net-sheet',
  '/es/sell-vs-rent', '/es/remodel-vs-sell', '/es/guia-para-propietarios',
  '/es/acerca', '/es/contacto', '/es/consulta', '/es/privacy-policy',
  '/es/terms-of-service',
];

const PORT = 8888;
const BASE_URL = `http://0.0.0.0:${PORT}`;

function createServer( ) {
  return http.createServer((req, res ) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }
    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    res.writeHead(200, { 'Content-Type': contentType });
    createReadStream(filePath).pipe(res);
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res ) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function prerender() {
  console.log('🎬 Starting prerendering...');
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, '0.0.0.0', resolve));
  for (const route of routes) {
    try {
      const html = await fetchUrl(`${BASE_URL}${route}`);
      const routePath = route === '/' ? distDir : path.join(distDir, route);
      fs.mkdirSync(routePath, { recursive: true });
      fs.writeFileSync(path.join(routePath, 'index.html'), html, 'utf-8');
      console.log(`   ✓ Saved: ${route}`);
    } catch (e) { console.error(`   ✗ Error ${route}:`, e.message); }
  }
  server.close();
  console.log('📊 Prerendering complete.');
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
