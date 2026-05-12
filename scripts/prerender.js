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
      // Block analytics/tracking requests so they don't inject extra scripts
      // into the DOM that would pollute page.content() output.
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (isBlocked(req.url())) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });

      // Wait for the app <div> inside #root — the Sonner notifications mount as
      // <section> and are always present; the real app shell mounts as <div>.
      // This distinguishes a genuine React render from stale prerendered DOM.
      await page.waitForFunction(
        () => document.querySelector('#root > div') !== null,
        { timeout: 15000 }
      );
      await new Promise((r) => setTimeout(r, 500));
      let html = await page.content();

      // Strip the manus-runtime inline bundle — it's a Manus platform dev tool
      // injected by vite-plugin-manus-runtime and must not appear in Vercel output.
      // The real production bundle is assets/index-*.js referenced via <script type="module">.
      html = html.replace(/<script\s[^>]*id="manus-runtime"[\s\S]*?<\/script>/i, '');

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
