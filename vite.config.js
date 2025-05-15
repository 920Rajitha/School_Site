import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base to your repo name path
export default defineConfig({
  base: '/School_Site/',
  plugins: [react()],
});
