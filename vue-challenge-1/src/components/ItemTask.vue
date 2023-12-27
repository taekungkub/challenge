<template>
  <div class="border p-3 rounded-md mt-2 cursor-pointer text-center">
    <h6>{{ name }}</h6>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
})
</script>

<style scoped></style>
