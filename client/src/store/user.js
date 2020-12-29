import axios from "axios"
import router from "@/router"

export default {
  namespaced: true,

  state: {
    fullname: null,
    token: null
  },

  getters: {
    isAuthenticated(state) {
      return state.token && state.fullname ? true : false
    },
    userFullname(state) {
      return state.fullname
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_FULLNAME(state, fullname) {
      state.fullname = fullname
    }
  },

  actions: {
    async register({ commit }, user) {
      try {
        await axios.post("/register", user)
        const successMessage = {
          color: "bg-green-200",
          message:
            "You have successfully registered, please sign in to continue."
        }
        commit("SET_ALERT", successMessage, { root: true })
        setTimeout(() => router.push("/login"), 2500)
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    },
    async login({ commit }, user) {
      try {
        const { data } = await axios.post("/login", user)
        commit("SET_ALERT", null, { root: true })
        commit("SET_TOKEN", data.token)
        commit("SET_FULLNAME", data.fullname)
        router.push("/")
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    },
    logout({ commit }) {
      commit("SET_TOKEN", null)
      commit("SET_FULLNAME", null)
      router.push("/login")
    }
  }
}
