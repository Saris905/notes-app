<template>
  <div class="header">
    <ReturnButton />
    <h1>{{ props.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import ReturnButton from '@/components/ui/ReturnButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})
</script>

<style>
.header {
  margin: 24px 0;
  display: flex;
}
</style>