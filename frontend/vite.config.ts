import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Force the ES module build of MUI icons (avoids the CJS default-import
      // interop bug that turns every icon into a plain object).
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: '@mui/icons-material/esm/$1',
      },
    ],
  },
  server: { port: 5173 },
});