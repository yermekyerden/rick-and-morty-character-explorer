import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const GITHUB_PAGES_BASE_PATH = '/rick-and-morty-character-explorer/';
const LOCAL_BASE_PATH = '/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? GITHUB_PAGES_BASE_PATH : LOCAL_BASE_PATH,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/main.tsx',
        'src/test/**',
        'src/types/**',
        'src/**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
}));
