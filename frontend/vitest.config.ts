import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ['@gravity-ui/uikit'],
  },
  test: {
    passWithNoTests: true,
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    testTimeout: 15000,
    setupFiles: './test-setup.ts',
    css: true,
  },
});
