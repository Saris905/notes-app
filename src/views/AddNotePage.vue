<template>
  <div class="add-note-page container">
    <Header title="Добавить новую заметку" />
    
    <NoteForm 
      @submitted="createNewNote"
    />
  </div>
</template>

<script setup lang="ts">
import { Note } from '@/types/Note.type'
import { useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/NotesStore';
import NoteForm from '@/components/ui/NoteForm.vue';
import Header from '@/components/Header.vue';

const store = useNotesStore();
const router = useRouter();

const createNewNote = (note: Note) => {
  store.createNote(note);
  router.push({ path: '/' })
}
</script>

<style lang="css">
.add-note-page {
  padding: 0;
}
</style>