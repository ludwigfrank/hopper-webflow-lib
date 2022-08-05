import { defineConfig } from 'vite'
import { resolve } from 'path'

const baseConfig = {
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: './src/main.js',
        // lootbox: './src/lootbox.js',
        /* 'plugins/modals': './src/plugins/modals.ts',
        'plugins/utils': './src/plugins/utils.ts',
        'plugins/deals': './src/plugins/deals.ts',
        'plugins/share': './src/plugins/share.ts',
        'plugins/raffle': './src/plugins/raffle.ts',
        'plugins/hero': './src/plugins/hero.ts',
        'plugins/dealExtension': './src/plugins/dealExtension.ts', */
      },
      output: {
        // manualChunks: {},
        // format: 'umd',
        entryFileNames: 'main.js',
        esModule: true,
        compact: true,
        globals: {
          jquery: '$',
          gsap: 'gsap',
          clipboard: 'Clipboard',
        },
      },
      external: ['jquery', 'gsap', 'clipboard'],
    },
  },
}

const libraryConfig = {
  build: {
    lib: {
      // entry: resolve(__dirname, 'lib/main.js'),
      name: 'HopperWebflow',
      // the proper extensions will be added
      fileName: 'hopper-webflow',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['jquery', 'gsap'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: '$',
          gsap: 'gsap',
        },
      },
    },
  },
}

// vite.config.js
export default defineConfig({
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  ...baseConfig,
})
