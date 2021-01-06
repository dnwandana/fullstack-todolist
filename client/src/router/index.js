import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import store from "@/store"
import nprogress from "nprogress"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { requireAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (to.meta.requireAuth && !store.getters["user/isAuthenticated"]) {
    next({
      name: "Login"
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
