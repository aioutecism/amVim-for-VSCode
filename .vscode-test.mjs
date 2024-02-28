import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
    files: 'out/test/**/*.test.js',
    version: '1.75.0',
    mocha: {
        ui: 'tdd',
        timeout: 2500,
        retries: 3,
        color: true,
    },
});
