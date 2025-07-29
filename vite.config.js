import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import fs from 'fs';
import cssnano from 'cssnano';
import path from 'path';

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
        input: {
          main: './src/index.html',
          styles: './src/css/index.css',
        },
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
            return '[name].[hash].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.html')) {
              return '[name].[ext]';
            }
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/index.[hash].css';
            }
            return 'assets/[name].[hash][extname]';
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
      {
        name: 'async-css-inject',
        writeBundle() {
          // This runs after the bundle is written
          const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
          const assetsDir = path.join(process.cwd(), 'dist', 'assets');

          if (fs.existsSync(htmlPath) && fs.existsSync(assetsDir)) {
            let html = fs.readFileSync(htmlPath, 'utf8');

            // Find the CSS file with hash
            const files = fs.readdirSync(assetsDir);
            const cssFile = files.find(
              file => file.startsWith('index.') && file.endsWith('.css')
            );

            if (cssFile) {
              const cssPath = `/development-hell-02/assets/${cssFile}`;
              const asyncCssLink = `
    <link
      rel="stylesheet"
      href="${cssPath}"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link rel="stylesheet" href="${cssPath}" />
    </noscript>`;

              // Replace the placeholder or add the link
              if (html.includes('/development-hell-02/assets/index.css')) {
                html = html.replace(
                  /href="\/development-hell-02\/assets\/index\.css"/g,
                  `href="${cssPath}"`
                );
              } else {
                html = html.replace('</head>', `${asyncCssLink}\n  </head>`);
              }

              fs.writeFileSync(htmlPath, html);
            }
          }
        },
        transformIndexHtml: {
          order: 'post',
          handler(html, { path }) {
            const isDev = command === 'serve';
            let cssPath;

            if (isDev) {
              cssPath = './css/index.css';
            } else {
              // For production, use a placeholder that will be replaced later
              cssPath = '/development-hell-02/assets/index.css';
            }

            const asyncCssLink = `
    <link
      rel="stylesheet"
      href="${cssPath}"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link rel="stylesheet" href="${cssPath}" />
    </noscript>`;
            return html.replace('</head>', `${asyncCssLink}\n  </head>`);
          },
        },
      },
      {
        name: 'copy-cache-files',
        writeBundle() {
          // Copy cache configuration files to dist
          const cacheFiles = ['.htaccess', '_headers', '_redirects'];
          cacheFiles.forEach(file => {
            const sourcePath = path.join(process.cwd(), 'public', file);
            const destPath = path.join(process.cwd(), 'dist', file);
            if (fs.existsSync(sourcePath)) {
              fs.copyFileSync(sourcePath, destPath);
            }
          });
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
