import createMyApp from "./app.js"
import { renderToString } from "@vue/server-renderer"

export async function render({
  indexHtmlTemplate,
  url,
}) {
  const { app, router, urqlSsrExchange } = await createMyApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const appHtml = await renderToString(app, ctx)

  const urqlData = urqlSsrExchange.extractData()
  const combinedHeadTagsHtml = `<script>window.__urql__=JSON.parse(${JSON.stringify(
    JSON.stringify(urqlData)
  )});</script>`

  let html = indexHtmlTemplate
  html = html.replace("<!--title-->", "URQL ISSUE")
  html = html.replace("<!--head-tags-->", combinedHeadTagsHtml)
  html = html.replace("<!--app-html-->", appHtml)

  return { html, statusCode: 200 }
}
