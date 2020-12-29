<template>
  <div
    class="fixed left-0 top-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50"
  >
    <div
      class="w-full max-w-xs md:max-w-md bg-white rounded-md shadow-md divide-y border border-gray-300"
    >
      <header
        class="py-4 md:py-5 px-4 md:px-8 font-medium text-lg md:text-xl flex items-center justify-between"
      >
        <slot name="modal-title">
          Modal Title
        </slot>
        <button
          @click="close()"
          type="button"
          class="btn-close"
          aria-label="Close modal"
        >
          <svg
            class="w-5 h-5 stroke-current text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <body
        class="py-4 md:py-5 px-4 md:px-8 mb-4 font-normal text-base md:text-lg"
      >
        <slot name="modal-body">
          Modal body
        </slot>
      </body>
      <footer class="py-4 md:py-5 px-4 md:px-8">
        <div class="flex justify-end space-x-2 md:space-x-3">
          <button
            @click="close()"
            type="button"
            class="py-2 px-3 rounded-md text-sm md:text-base text-white bg-gray-500 hover:bg-gray-600 outline-none focus:outline-none"
          >
            <slot name="btn-secondary">
              Secondary
            </slot>
          </button>
          <button
            @click="agree()"
            type="button"
            class="py-2 px-3 rounded-md text-sm md:text-base text-white bg-blue-700 hover:bg-blue-800 outline-none focus:outline-none"
          >
            <slot name="btn-primary">
              Primary
            </slot>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoutModal",
  setup(props, { emit }) {
    const agree = () => {
      emit("agree")
    }

    const close = () => {
      emit("close")
    }

    return {
      agree,
      close
    }
  }
}
</script>
