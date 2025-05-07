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
>>>>>>> 4a5521234de40472b9c586c2d94b866ce3f7b4dd
  }
});
