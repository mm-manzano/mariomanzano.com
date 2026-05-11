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

  const handler = sirv(distDir, { single: true });
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(PORT, 'localhost', resolve));
  console.log(`   Server listening on ${BASE_URL}`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of routes) {
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });
      // Wait for React to render actual content into <main> before capture.
      // networkidle0 alone fires before hydration completes with Framer Motion.
      await page.waitForSelector('main > *', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 500));
      const html = await page.content();
      await page.close();

      const routeDir = route === '/' ? distDir : path.join(distDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
      console.log(`   ✓ ${route}`);
    } catch (e) {
      console.error(`   ✗ Error ${route}:`, e.message);
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
