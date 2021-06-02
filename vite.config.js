import * as path from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
      template: {
        ssr: true,
      },
    }),
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
