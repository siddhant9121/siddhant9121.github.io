import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /* Relative asset paths: works at username.github.io/ and at /repo-name/ */
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 8000, strictPort: true },
  preview: { port: 8000, strictPort: true },
});
