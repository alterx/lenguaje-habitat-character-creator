import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lenaguaje Hábitat',
        short_name: 'LH',
        start_url: '.',
        display: 'standalone',
        background_color: '#1a2e22',
        theme_color: '#1a2e22',
        description: 'Creador de personajes para Lengaje Hábitat.',
        icons: [
          {
            src: 'myn.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'myn.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      includeAssets: ['myn.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
