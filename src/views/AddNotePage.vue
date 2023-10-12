<template>
  <div class="add-note-page container">
    <div class="add-note-page-header">
      <ReturnButton />
      <h1>Добавить новую заметку</h1>
    </div>
    
    <NoteForm />
  </div>
</template>

<script setup lang="ts">
import NoteForm from '@/components/ui/NoteForm.vue';
import ReturnButton from '@/components/ui/ReturnButton.vue';

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