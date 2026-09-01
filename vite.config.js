import { defineConfig } from 'vite';
import { devHistoryPlugin } from './server/devMiddleware.js';

export default defineConfig({
  plugins: [devHistoryPlugin()],
});
