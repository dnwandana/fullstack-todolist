<template>
  <div>
    <!-- Logout confirmation -->
    <Modal v-show="isModalVisible" @agree="agreeModal()" @close="closeModal()">
      <template v-slot:modal-title>Logout Confirmation</template>
      <template v-slot:modal-body
        >You will be returned to the login screen.</template
      >
      <template v-slot:btn-secondary>Cancel</template>
      <template v-slot:btn-primary>Logout</template>
    </Modal>
    <!-- Navbar -->
    <div class="py-6 shadow bg-gradient-to-r from-blue-800 to-indigo-800">
      <div class="px-5 md:px-32 lg:px-64 xl:px-96">
        <div class="flex items-center justify-between">
          <div>
            <div
              class="rounded text-sm md:text-base font-medium text-indigo-200 hover:text-indigo-50 focus:outline-none cursor-default"
            >
              Hello, {{ userFullname }}.
            </div>
          </div>
          <div class="space-x-1 md:space-x-2">
            <router-link
              @click="logout()"
              to="#"
              class="px-2 py-1 md:px-3 md:py-2 rounded text-sm md:text-base no-underline font-medium text-indigo-200 hover:text-indigo-900 hover:bg-indigo-300 focus:outline-none"
              >Logout</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"
import { useStore } from "vuex"
import { computed, ref } from "vue"

export default {
  name: "Navigation",
  components: {
    Modal
  },
  setup() {
    const store = useStore()

    const userFullname = computed(() => store.getters["user/userFullname"])

    const isModalVisible = ref(false)

    const logout = () => {
      isModalVisible.value = true
    }

    const agreeModal = () => {
      store.dispatch("user/logout")
    }

    const closeModal = () => {
      isModalVisible.value = false
    }

    return {
      userFullname,
      isModalVisible,
      logout,
      agreeModal,
      closeModal
    }
  }
}
</script>
