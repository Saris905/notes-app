<template>
  <div class="view-note-page container">
    <div class="view-note-page-header">
      <ReturnButton />
      <h1>Страница просмотра заметки</h1>
    </div>
    
    <Note 
      :note="note"
      @on-finished="toggleFinished"
    />
  </div>
</template>

<script setup lang="ts">
import Note from '@/components/Note.vue'
import ReturnButton from '@/components/ReturnButton.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNotesStore } from '@/stores/NotesStore';

const route = useRoute();
const store = useNotesStore();

const noteId = Number(route.params?.id) - 1;
const note = computed(() => store.notes[noteId] || {});

const toggleFinished = (noteId: number, todoId: number) => {
    store.toggleFinished(noteId, todoId);
  };
</script>

<style lang="css">
.view-note-page {
  padding: 0 20px;
}

.view-note-page-header {
  margin: 24px 0;
  display: flex;
}
</style>