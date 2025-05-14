import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   //open: true,
    open: 'https://expresso-client.onrender.com',

  }
});