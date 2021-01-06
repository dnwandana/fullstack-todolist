<template>
  <!-- Card -->
  <div class="py-4 md:py-5 px-4 md:px-5 rounded shadow-md bg-white">
    <!-- Alert -->
    <Alert :alert="alert" />
    <!-- Form -->
    <TodoForm />
    <!-- Todo Lists -->
    <TodoItem :todos="this.todos" />
    <!-- Counter -->
    <TodoCounter />
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import TodoForm from "@/components/Todos/TodoForm.vue"
import TodoItem from "@/components/Todos/TodoItem.vue"
import TodoCounter from "@/components/Todos/TodoCounter.vue"
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  components: {
    Alert,
    TodoForm,
    TodoItem,
    TodoCounter
  },
  setup() {
    const store = useStore()

    store.dispatch("setAlert", null)
    store.dispatch("todos/fetchTodos")

    const todos = computed(() => store.getters["todos/allTodos"])
    const alert = computed(() => store.getters["getAlert"])

    return {
      todos,
      alert
    }
  }
}
</script>
