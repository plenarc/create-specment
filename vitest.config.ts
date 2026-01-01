import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    testTimeout: 30000, // 統合テスト用にタイムアウトを延長
    hookTimeout: 30000,
    watch: false, // デフォルトでwatchモードを無効化
    typecheck: {
      tsconfig: './tsconfig.test.json'
    }
  },
});
