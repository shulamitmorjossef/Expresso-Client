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
>>>>>>> c1e5636c452b9759670f3be271fc34ec42d8eeaa
  }
});
