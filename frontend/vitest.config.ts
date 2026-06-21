import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    testTimeout: 15000,
    setupFiles: './test-setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
