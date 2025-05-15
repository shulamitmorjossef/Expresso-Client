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
   //open: true,
    open: 'https://expresso-client.onrender.com',
>>>>>>> f92e9f480081c33ce1dd9bc16668ea7ccb271e29

  }
});