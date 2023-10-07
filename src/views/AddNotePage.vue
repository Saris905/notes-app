<template>
  <div class="add-note-page container">
    <h1>View of Add Note Page</h1>
    <ReturnButton />
    
    <div class="add-note-title">
      <span>Заголовок</span>
      <NoteInput value="test" />
    </div>

    <div class="add-note-title">
      <span>Заголовок</span>
      <NoteInput value="test" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteInput from '@/components/NoteInput.vue';
import ReturnButton from '@/components/ReturnButton.vue';

</script>

<style lang="css">
  .add-note-page {
    font-size: 30px;
    color: lightblue;
  }
</style>