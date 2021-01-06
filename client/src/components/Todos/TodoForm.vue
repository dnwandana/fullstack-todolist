<template>
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
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import { object, string } from "yup"
import { ref } from "vue"
import { useStore } from "vuex"

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore()
    const inputTodo = ref("")
    const validationSchema = object().shape({
      Todo: string().required()
    })

    const addTodo = () => {
      store.dispatch("todos/addTodo", inputTodo.value)
      inputTodo.value = ""
    }

    return {
      inputTodo,
      validationSchema,
      addTodo
    }
  }
}
</script>
