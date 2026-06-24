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
      name: 'paul-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './PaulApp': './src/App.tsx',
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