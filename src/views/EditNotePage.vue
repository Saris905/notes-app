<template>
  <div class="edit-note-page container">
    <div class="edit-note-page-header">
      <ReturnButton />
      <h1>Редактировать заметку</h1>
    </div>
    
    <div class="edit-note-title">
      <span>Заголовок</span>
      <NoteInput :value="note.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteInput from '@/components/ui/NoteInput.vue';
import ReturnButton from '@/components/ui/ReturnButton.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNotesStore } from '@/stores/NotesStore';

const route = useRoute();
const store = useNotesStore();

const noteId = Number(route.params?.id) - 1;
const note = computed(() => store.notes[noteId] || {});


</script>

<style lang="css">
.edit-note-page {
  padding: 0;
}

.edit-note-page-header {
  margin: 24px 0;
  display: flex;
}
</style>