import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: The base must match your repository name for GitHub Pages to work
  base: '/fate-rpg-comptador-iniciativa-google-gemini/',
});