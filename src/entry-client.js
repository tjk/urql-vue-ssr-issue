import createMyApp from "./app.js"

;(async function() {
  const { app, router } = await createMyApp()
  const vuePrototype = app.config.globalProperties

  await router.isReady()

  // https://github.com/vuejs/vue-devtools/issues/1376#issuecomment-794544045
  const instance = app.mount("#app")
  app._container._vnode = instance.$.vnode
})()
