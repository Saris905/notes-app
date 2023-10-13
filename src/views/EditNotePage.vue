<template>
  <div class="edit-note-page container">
    <Header title="Редактировать заметку" />
    
    <NoteForm 
      :note="currentNote"
      @submitted="editCurrentNote"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/NotesStore';
/* Components */
import NoteForm from '@/components/ui/NoteForm.vue';
import Header from '@/components/Header.vue';
import { Note } from '@/types/Note.type'


const route = useRoute();
const router = useRouter();
const store = useNotesStore();

const noteId = Number(route.params?.id);
const currentNote = computed(() => store.notes.find(({ id }) => id == noteId));

const editCurrentNote = (note: Note) => {
  store.editNote(note);
  router.go(-1);
}
</script>

<style lang="css">
.edit-note-page {
  padding: 0;
}
</style>