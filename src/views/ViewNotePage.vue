<template>
  <div class="view-note-page container">
    <div class="view-note-page-header">
      <ReturnButton />
      <h1>Страница просмотра заметки</h1>
    </div>
    
    <Note 
      :note="note"
      @on-finished="toggleFinished"
      @on-delete="deleteNote"
    />
  </div>
</template>

<script setup lang="ts">
import Note from '@/components/Note.vue'
import ReturnButton from '@/components/ui/ReturnButton.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/NotesStore';

const route = useRoute();
const router = useRouter();
const store = useNotesStore();

const noteId = Number(route.params?.id);
const note = computed(() => store.notes.find(({ id }) => id == noteId) || {});

const toggleFinished = (noteId: number, todoId: number) => {
  store.toggleFinished(noteId, todoId);
};

const deleteNote = async (noteId: number) => {
  const confirmation = window.confirm('Уверены, что хотите удалить заметку?');
  if (confirmation) await store.deleteNote(noteId);
  await router.replace({ path: '/' });
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