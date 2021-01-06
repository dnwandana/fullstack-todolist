<template>
  <div
    class="mt-5 flex flex-col divide-y divide-indigo-300 max-h-80 overflow-y-auto rounded border border-indigo-300"
  >
    <div
      class="flex items-center justify-between px-3 py-3 font-medium text-sm md:text-base text-gray-700 hover:text-gray-900 bg-white hover:bg-indigo-100"
      v-for="todo in todos"
      :key="todo.id"
    >
      <label class="inline-flex items-center cursor-pointer" :for="todo.id">
        <input
          class="cursor-pointer"
          type="checkbox"
          :id="todo.id"
          :checked="todo.isdone"
          @change="updateTodo(todo.id)"
        />
        <span class="ml-2 md:ml-3">{{ todo.todo }}</span>
      </label>
      <div class="flex items-center">
        <svg
          v-if="todo.isdone"
          class="w-5 h-5 mr-2 stroke-current text-green-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          @click="deleteTodo(todo.id)"
          class="w-5 h-5 stroke-current text-red-600 hover:text-red-900 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"

export default {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const updateTodo = id => store.dispatch("todos/updateTodo", id)
    const deleteTodo = id => store.dispatch("todos/deleteTodo", id)

    return {
      updateTodo,
      deleteTodo
    }
  }
}
</script>
