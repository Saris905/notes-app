<template>
  <div class="add-note-page container">
    <div class="add-note-page-header">
      <ReturnButton />
      <h1>Добавить новую заметку</h1>
    </div>
    
    <div class="add-note-title">
      <span>Заголовок</span>
      <NoteInput placeholder="Заголовок" :value="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NoteInput from '@/components/ui/NoteInput.vue';
import ReturnButton from '@/components/ui/ReturnButton.vue';

const title = ref('');
</script>

<style lang="css">
.add-note-page {
  padding: 0;
}

.add-note-page-header {
  margin: 24px 0;
  display: flex;
}
</style>