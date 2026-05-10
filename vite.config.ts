import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      return [
        '/', '/strategy-hub', '/home-value', '/net-sheet', '/sell-vs-rent',
        '/remodel-vs-sell', '/homeowner-guide', '/about', '/contact',
        '/privacy-policy', '/terms-of-service',
        '/es', '/es/strategy-hub', '/es/home-value', '/es/net-sheet',
        '/es/sell-vs-rent', '/es/remodel-vs-sell', '/es/guia-para-propietarios',
        '/es/acerca', '/es/contacto', '/es/consulta', '/es/privacy-policy',
        '/es/terms-of-service',
      ];
    },
  },
});
