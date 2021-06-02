export default [
  {
    path: "",
    component: () => import("@views/main.vue"),
  },
  {
    path: "/other",
    component: () => import("@views/other.vue"),
  },
]
