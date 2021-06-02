import * as path from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { minify } from "html-minifier-terser"

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
      template: {
        ssr: true,
      },
    }),
    {
      name: "process-index-html",
      enforce: "post",
      transformIndexHtml(html) {
        return minify(html, { collapseWhitespace: true })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@plugins": path.resolve(__dirname, "src/plugins"),
      "@views": path.resolve(__dirname, "src/views"),
    },
  },
})

console.log(JSON.stringify(config, null, 2))

export default config
