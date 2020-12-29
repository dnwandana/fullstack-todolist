import axios from "axios"
import user from "@/store/user"

export default {
  namespaced: true,

  state: {
    todos: []
  },

  getters: {
    allTodos(state) {
      return state.todos
    },
    totalTodos(state) {
      return state.todos.length
    },
    remainingTodos(state) {
      return state.todos.filter(todo => !todo.isdone).length
    },
    completedTodos(state) {
      return state.todos.filter(todo => todo.isdone).length
    }
  },

  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo)
    },
    UPDATE_TODO(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      if (index !== -1) {
        state.todos.splice(index, 1, todo)
      }
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    }
  },

  actions: {
    async fetchTodos({ commit }) {
      try {
        const { data } = await axios.get("/todos", {
          headers: {
            Authorization: `Bearer ${user.state.token}`
          }
        })
        commit("SET_ALERT", null, { root: true })
        commit("SET_TODOS", data.todos)
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    },
    async addTodo({ commit }, todo) {
      try {
        const { data } = await axios.post(
          "/todos",
          { todo: todo },
          {
            headers: {
              Authorization: `Bearer ${user.state.token}`
            }
          }
        )
        commit("SET_ALERT", null, { root: true })
        commit("ADD_TODO", data.todo)
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    },
    async updateTodo({ commit }, id) {
      try {
        const { data } = await axios.patch(`/todos/${id}`, null, {
          headers: {
            Authorization: `Bearer ${user.state.token}`
          }
        })
        commit("SET_ALERT", null, { root: true })
        commit("UPDATE_TODO", data.todo)
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    },
    async deleteTodo({ commit }, id) {
      try {
        await axios.delete(`/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${user.state.token}`
          }
        })
        commit("SET_ALERT", null, { root: true })
        commit("DELETE_TODO", id)
      } catch ({ error }) {
        const errorMessage = {
          color: "bg-yellow-200",
          message: `Error: ${error.message}`
        }
        commit("SET_ALERT", errorMessage, { root: true })
      }
    }
  }
}
