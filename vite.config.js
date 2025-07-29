import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import fs from 'fs';
import cssnano from 'cssnano';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    css: {
      postcss: {
        plugins: [
          SortCss({ sort: 'mobile-first' }),
          ...(command === 'build' ? [cssnano({ preset: 'default' })] : []),
        ],
      },
    },
    root: 'src',
    build: {
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
    plugins: [
      {
        name: 'critical-css-inject',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            const criticalCss = fs.readFileSync(
              './src/css/critical.css',
              'utf8'
            );
            return html.replace(
              '<!-- inject:critical -->',
              `<style>${criticalCss}</style>`
            );
          },
        },
      },
      injectHTML(),
      FullReload(['./src/**/*.html']),
    ],
    // optimizeDeps: {
    //   include: ['swiper', 'izitoast', 'modern-normalize'],
    // },
  };
});
