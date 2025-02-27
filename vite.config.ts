import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/phonemes/',  // Replace with your repository name
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
