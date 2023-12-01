import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  // server: {
    // https: {
      // key: fs.readFileSync('A:/Projects/Vixel/code/client/localhost.key'),
      // cert: fs.readFileSync('A:/Projects/Vixel/code/client/localhost.crt'),
    // },
  // },
})
