<template>
  <div>
    <div class="bg-white border rounded-md min-h-[300px]">
      <div class="bg-gray-100 py-3">
        <h3 class="text-center font-bold">{{ title }}</h3>
      </div>
      <div class="content p-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
})
</script>

<style scoped></style>
