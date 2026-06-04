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
  // English
  '/',
  '/strategy-hub',
  '/home-value',
  '/sell-vs-rent',
  '/remodel-vs-sell',
  '/net-sheet',
  '/homeowner-guide',
  '/about',
  '/contact',
  '/links',
  '/seller-strategy',
  // Spanish
  '/es',
  '/es/strategy-hub',
  '/es/home-value',
  '/es/sell-vs-rent',
  '/es/remodel-vs-sell',
  '/es/net-sheet',
  '/es/guia-para-propietarios',
  '/es/acerca',
  '/es/contacto',
  '/es/presentacion-vendedores',
  // Legal
  '/privacy-policy',
  '/terms-of-service',
  '/es/privacy-policy',
  '/es/terms-of-service',
];

// Third-party domains that inject scripts into the live DOM at runtime.
// Blocking them keeps page.content() clean and ensures #root is empty
// before React renders, so waitForFunction is a real signal not a no-op.
const BLOCKED_DOMAINS = [
  'google-analytics.com',
  'googletagmanager.com',
  'googleadservices.com',
  'doubleclick.net',
  'facebook.net',
  'fbcdn.net',
  'connect.facebook.com',
  'analytics.google.com',
  'hotjar.com',
  'clarity.ms',
];

function isBlocked(url) {
  return BLOCKED_DOMAINS.some((d) => url.includes(d));
}

async function prerender() {
  console.log('🎬 Starting Puppeteer prerender...');

  const spaShell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

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
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (isBlocked(req.url())) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });

      await page.waitForFunction(
        () => document.querySelector('#root > div') !== null,
        { timeout: 15000 }
      );
      await new Promise((r) => setTimeout(r, 500));
      let html = await page.content();

      html = html.replace(/<script\s[^>]*id="manus-runtime"[\s\S]*?<\/script>/i, '');
      html = html.replace(/<div\s[^>]*id="manus-previewer-root"[^>]*>[\s\S]*?<\/div>/i, '');

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
