<template>
  <div
    v-if="alert"
    class="mb-4 py-2 px-4 rounded-md font-medium text-sm md:text-base text-gray-900"
    :class="alert.color"
  >
    <p>{{ alert.message }}</p>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alert: {
      required: true
    }
  }
}
</script>
