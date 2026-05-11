import puppeteer from 'puppeteer';
import sirv from 'sirv';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const PORT = 5173;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  '/',
  '/about',
  '/contact',
  '/homeowner-guide',
  '/selling-process',
  '/es',
  '/es/acerca',
  '/es/contacto',
  '/es/guia-para-propietarios',
  '/es/proceso-de-venta',
];

async function prerender() {
  console.log('🎬 Starting Puppeteer prerender...');

  // Snapshot the current Vite-built shell before any writes. This guarantees
  // every route gets the same clean HTML with correct asset hashes, regardless
  // of stale subdirectory files left by previous prerender runs.
  const spaShell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // sirv handles real asset files; unknown paths fall through to the SPA shell.
  const assets = sirv(distDir);
  const server = http.createServer((req, res) => {
    assets(req, res, () => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(spaShell);
    });
  });
  await new Promise((resolve) => server.listen(PORT, 'localhost', resolve));
  console.log(`   Server listening on ${BASE_URL}`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });
      await page.waitForFunction(
        () => document.querySelector('#root')?.children.length > 0,
        { timeout: 15000 }
      );
      await new Promise((r) => setTimeout(r, 500));
      const html = await page.content();

      const routeDir = route === '/' ? distDir : path.join(distDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
      console.log(`   ✓ ${route}`);
    } catch (e) {
      console.error(`   ✗ Error ${route}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('📊 Prerendering complete.');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
