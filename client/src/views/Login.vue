<template>
  <!-- Card -->
  <div class="py-4 md:py-5 px-4 md:px-5 rounded shadow-md bg-white">
    <!-- Card Title -->
    <h1 class="mb-6 font-medium text-xl md:text-2xl text-gray-900">
      Login Page
    </h1>
    <!-- Alert -->
    <Alert :alert="alert" />
    <!-- Form -->
    <Form
      @submit="login()"
      :validation-schema="validationSchema"
      class="flex flex-col"
    >
      <!-- Spacer -->
      <div class="space-y-4">
        <!-- Username -->
        <div>
          <label
            for="username"
            class="font-medium text-sm md:text-base text-gray-900"
          >
            Username
          </label>
          <Field
            v-model="user.username"
            id="username"
            name="Username"
            as="input"
            type="text"
            placeholder="johndoe"
            class="text-sm md:text-base w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <ErrorMessage
            v-if="true"
            name="Username"
            class="font-medium text-sm md:text-base text-red-600"
          />
        </div>
        <!-- Password -->
        <div>
          <label
            for="password"
            class="font-medium text-sm md:text-base text-gray-900"
          >
            Password
          </label>
          <div class="relative">
            <Field
              v-model="user.password"
              id="password"
              name="Password"
              as="input"
              :type="!showPassword ? 'password' : 'text'"
              placeholder="Password"
              class="text-sm md:text-base w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div class="absolute inset-y-2 right-3">
              <svg
                @click="viewPassword()"
                class="w-5 h-5 md:w-6 md:h-6 stroke-current text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g v-if="!showPassword">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </g>
                <g v-else>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </g>
              </svg>
            </div>
          </div>
          <ErrorMessage
            v-if="true"
            name="Password"
            class="font-medium text-sm md:text-base text-red-600"
          />
        </div>
      </div>
      <!-- Button -->
      <div class="mt-6 flex items-center justify-between">
        <button
          type="submit"
          class="py-2 px-3 rounded-md text-sm md:text-base text-white bg-blue-700 hover:bg-blue-800 outline-none focus:outline-none"
        >
          Sign In
        </button>
        <router-link
          to="/register"
          class="font-medium text-sm md:text-base no-underline text-indigo-600 hover:text-indigo-700"
          >Dont have an account?</router-link
        >
      </div>
    </Form>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue"
import { Form, Field, ErrorMessage } from "vee-validate"
import { object, string } from "yup"
import { computed, reactive, ref } from "vue"
import { useStore } from "vuex"

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

    const user = reactive({
      username: "",
      password: ""
    })

    const showPassword = ref(false)

    const validationSchema = object().shape({
      Username: string()
        .min(4)
        .max(20)
        .required(),
      Password: string()
        .min(6)
        .required()
    })

    const alert = computed(() => store.getters.getAlert)

    const viewPassword = () => (showPassword.value = !showPassword.value)

    const login = () => {
      store.dispatch("user/login", {
        username: user.username,
        password: user.password
      })
    }

    return {
      validationSchema,
      user,
      showPassword,
      alert,
      viewPassword,
      login
    }
  }
}
</script>
