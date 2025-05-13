import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    open: true,
    // open: 'https://expresso-client.onrender.com',
=======
   //  open: true,
    open: 'https://expresso-client.onrender.com',
>>>>>>> 6bbdfdcae0aa2d831ad982cd2e451e54d14de90f

  }
});