import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import nprogress from "nprogress"
import "@/assets/css/main.css"
import "nprogress/nprogress.css"

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

axios.interceptors.request.use(config => {
  nprogress.start()
  config.headers["Content-Type"] = "application/json"
  config.headers["Accept"] = "application/json"
  return config
})

axios.interceptors.response.use(
  response => {
    nprogress.done()
    return response.data
  },
  error => {
    nprogress.done()
    return Promise.reject(error.response.data)
  }
)

createApp(App)
  .use(store)
  .use(router)
  .mount("#app")
