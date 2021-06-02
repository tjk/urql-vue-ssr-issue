import { createRouter, createMemoryHistory, createWebHistory } from "vue-router"

import routes from "@/routes"

export default function createMyRouter() {
  const history = import.meta.env.SSR
    ? createMemoryHistory()
    : createWebHistory()
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) return { selector: to.hash }
      return savedPosition || { x: 0, y: 0 }
    },
  })
}
