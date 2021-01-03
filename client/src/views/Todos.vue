<template>
  <!-- Card -->
  <div class="py-4 md:py-5 px-4 md:px-5 rounded shadow-md bg-white">
    <!-- Alert -->
    <Alert :alert="alert" />
    <!-- Form -->
    <Form
      @submit="addTodo()"
      :validation-schema="validationSchema"
      class="flex flex-col"
    >
      <div class="flex justify-between">
        <Field
          v-model="inputTodo"
          id="todo"
          name="Todo"
          as="input"
          type="text"
          class="font-medium text-sm md:text-base w-full rounded-l-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          class="px-2 md:px-3 shadow rounded-r-md bg-indigo-700 hover:bg-indigo-900 outline-none focus:outline-none"
        >
          <svg class="w-6 h-6 fill-current text-gray-100" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      <ErrorMessage
        v-if="true"
        name="Todo"
        class="font-medium text-sm md:text-base text-red-600"
      />
    </Form>
    <!-- Todo Lists -->
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
    <!-- Counter -->
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
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import { useStore } from "vuex"
import { computed, ref } from "vue"
import { Form, Field, ErrorMessage } from "vee-validate"
import { object, string } from "yup"

export default {
  components: {
    Alert,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore()

    store.dispatch("setAlert", null)

    store.dispatch("todos/fetchTodos")

    const inputTodo = ref("")

    const validationSchema = object().shape({
      Todo: string().required()
    })

    const todos = computed(() => store.getters["todos/allTodos"])

    const alert = computed(() => store.getters["getAlert"])

    const addTodo = () => {
      store.dispatch("todos/addTodo", inputTodo.value)
      inputTodo.value = ""
    }

    const updateTodo = id => store.dispatch("todos/updateTodo", id)

    const deleteTodo = id => store.dispatch("todos/deleteTodo", id)

    const totalTodos = computed(() => store.getters["todos/totalTodos"])
    const remainingTodos = computed(() => store.getters["todos/remainingTodos"])
    const completedTodos = computed(() => store.getters["todos/completedTodos"])

    return {
      inputTodo,
      validationSchema,
      todos,
      alert,
      addTodo,
      updateTodo,
      deleteTodo,
      totalTodos,
      remainingTodos,
      completedTodos
    }
  }
}
</script>
