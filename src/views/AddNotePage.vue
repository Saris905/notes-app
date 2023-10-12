<template>
  <div class="add-note-page container">
    <div class="add-note-page-header">
      <ReturnButton />
      <h1>Добавить новую заметку</h1>
    </div>
    
    <NoteForm 
      @submitted="createNewNote"
    />
  </div>
</template>

<script setup lang="ts">
import NoteForm from '@/components/ui/NoteForm.vue';
import ReturnButton from '@/components/ui/ReturnButton.vue';
import { useNotesStore } from '@/stores/NotesStore';
import { useRouter } from 'vue-router';

type newNote = {
  id: number,
  title: string,
}

const store = useNotesStore();
const router = useRouter();

const createNewNote = (note: newNote) => {
  store.createNote(note);
  router.push({ path: '/' })
}
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