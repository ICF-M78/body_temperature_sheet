import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 为解决 顶层await问题
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    base: '/bts/',
    build: {
        outDir: '../doc/bts',
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        open: true,
        port: 8080,
        proxy: {
            '^/dev': {
                target: 'http://192.168.12.86:7070/',
                changeOrigin: true,
                rewrite: path => path.replace(/^dev/, ''),
            },
        },
    },
    plugins: [
        vue(),
        // 为解决 顶层await问题
        topLevelAwait({
            promiseExportName: '__tla',
            promiseImportName: i => `__tla_${i}`,
        }),
    ],
});
