import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => ({
  base:
    mode === 'development'
      ? 'http://localhost:5174/'   // 👈 absolute URL in dev
      : '/paul-mfe/',      // 👈 GitHub Pages in prod

  plugins: [
    react(),
    federation({
      name: 'oes-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './OESApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],

  server: {
    host: true,
    port: 5174,
    cors: true,
  },

  preview: {
    host: true,
    port: 5174,
  },

  build: {
    sourcemap: 'hidden',
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  },
}));