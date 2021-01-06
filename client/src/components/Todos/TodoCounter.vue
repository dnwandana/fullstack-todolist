<template>
  <div class="mt-4 flex items-center justify-between">
    <p class="font-medium text-base md:text-lg text-gray-900">
      Total Tasks: {{ totalTodos }}
    </p>
    <div
      class="flex flex-col text-right font-medium text-sm md:text-base text-gray-900"
    >
      <span>Remaining: {{ remainingTodos }}</span>
      <span>Completed: {{ completedTodos }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore()
    const totalTodos = computed(() => store.getters["todos/totalTodos"])
    const remainingTodos = computed(() => store.getters["todos/remainingTodos"])
    const completedTodos = computed(() => store.getters["todos/completedTodos"])

    return {
      totalTodos,
      remainingTodos,
      completedTodos
    }
  }
}
</script>
