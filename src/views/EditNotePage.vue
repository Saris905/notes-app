<template>
  <div class="edit-note-page container">
    <div class="edit-note-page-header">
      <ReturnButton />
      <h1>Редактировать заметку</h1>
    </div>
    
    <NoteForm 
      :title="noteTitle"
      :todos="noteTodos"
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
import ReturnButton from '@/components/ui/ReturnButton.vue';

const route = useRoute();
const router = useRouter();
const store = useNotesStore();

const noteId = Number(route.params?.id);
const currentNote = computed(() => store.notes.find(({ id }) => id == noteId));
const noteTitle = computed(() => currentNote?.value?.title);
const noteTodos = computed(() => currentNote?.value?.todos);

const editCurrentNote = (note) => {
  store.editNote({
    id: currentNote.value?.id,
    createdDate: currentNote.value?.createdDate,
    ...note
  });
  router.go(-1);
}
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