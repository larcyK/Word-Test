import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Word Test App",
        short_name: "Word Test",
        description: "Word Test App",
 
        icons: [
          {
            src: "images/icon-192x192.png",
            type: "image/png",
            sizes: "192x192"
          },
        ],
        start_url: "index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        lang: "ja"
      }
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: './docs',
  },
  base: 'Word-Test',
});
