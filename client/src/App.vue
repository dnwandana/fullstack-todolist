<template>
  <div
    class="flex flex-col min-h-screen max-w-screen-sm md:max-w-none mx-auto bg-gray-200"
  >
    <Navigation v-if="isAuthenticated" />
    <div
      class="py-4 px-5 md:px-32 lg:px-64 xl:px-96"
      :class="[
        isAuthenticated ? '' : 'min-h-screen flex flex-col justify-center'
      ]"
    >
      <router-view />
    </div>
    <div class="fixed bottom-0 right-0 mr-1">
      <a
        class="text-sm text-gray-900 hover:text-blue-500"
        href="//github.com/dnwandana"
        target="_blank"
        >@dnwandana</a
      >
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/layout/Navigation.vue"
import { useStore } from "vuex"
import { computed } from "vue"

export default {
  components: {
    Navigation
  },
  setup() {
    const store = useStore()

    const isAuthenticated = computed(
      () => store.getters["user/isAuthenticated"]
    )

    return {
      isAuthenticated
    }
  }
}
</script>
