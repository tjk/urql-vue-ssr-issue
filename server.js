const fs = require("fs")
const path = require("path")
const express = require("express")
const http = require("http")
const morgan = require("morgan")

const {
  NODE_ENV = "development",
  PORT = 80,
} = process.env
const root = process.cwd()
const resolve = p => path.resolve(__dirname, p)

;(async function() {
  let vite

  const app = express()

  const server = http.createServer(app)

  function startListening() {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`
      Server running at:

      > Local:    http://localhost:${PORT}\n`)
    })
  }

  process.on("unhandledRejection", err => {
    console.error("[unhandledRejection]", err)
  })
  const viteConfig = {
    clearScreen: false,
    root,
    logLevel: "info",
    server: {
      middlewareMode: true,
      hmr: {
        port: 24679,
      },
    },
  }
  console.log(viteConfig)
  vite = await require("vite").createServer(viteConfig)

  app.use(vite.middlewares)

  // move this up if we want all the asset files logged in dev
  app.use(morgan("dev"))

  // start loading before first request...
  let entryServer = await vite.ssrLoadModule("/src/entry-server.js")

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl

      let template = await fs.promises.readFile(resolve("index.html"), "utf-8")
      template = await vite.transformIndexHtml(url, template)

      let html, statusCode = 200
      entryServer = await vite.ssrLoadModule("/src/entry-server.js")

      ;({ html, statusCode } = await entryServer.render({
        indexHtmlTemplate: template,
        url,
      }))

      res
        .status(statusCode)
        .set({ "Content-Type": "text/html" })
        .end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.stack)
    }
  })

  startListening()
})()
