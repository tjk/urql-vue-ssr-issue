import { createSSRApp } from "vue"

import App from "@/src/app.vue"
import createMyRouter from "@/src/router"
import { createUrqlClient } from "@plugins/urql"

const isServer = import.meta.env.SSR
const isClient = !isServer

export default async function createMyApp(opts = {}, rootComponent = App) {
  const app = createSSRApp(rootComponent)
  const vuePrototype = app.config.globalProperties

  if (import.meta.env.DEV) {
    app.config.errorHandler = (err, vm, info) => {
      console.error("[vue:errorHandler]", err, vm, info)
    }
  }

  // XXX https://github.com/posva/vite-tailwind-starter/blob/master/src/main.js
  const router = createMyRouter()
  app.use(router)

  const urql = await createUrqlClient()
  app.provide("$urql", urql)
  vuePrototype.$urql = urql

  return {
    app,
    router,
    urqlSsrExchange: urql._ssrExchange,
  }
}
