import { createStore } from "vuex"
import user from "./user"
import todos from "./todos"

export default createStore({
  state: {
    alert: null
  },

  getters: {
    getAlert(state) {
      return state.alert
    }
  },

  mutations: {
    SET_ALERT(state, objAlert) {
      state.alert = objAlert
    }
  },

  actions: {
    setAlert({ commit }, objAlert) {
      commit("SET_ALERT", objAlert)
    }
  },

  modules: {
    user,
    todos
  }
})
