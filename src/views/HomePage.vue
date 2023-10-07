<template>
  <div class="home-page container">
    <div class="home-page-header">
      <button class="home-page-button">
        <router-link to="/add">Добавить заметку</router-link>
      </button>  
      <h1 class="home-page-title">Мои заметки</h1>
    </div>
    
    <TransitionGroup name="list">
      <Note 
        v-for="(note, index) in notesStore.notesWithSortedTodos"
        :note="{ ...note, order: index + 1 }"
        :key="note.id"
        readonly
        @on-show="showNote"
        @on-edit="editNote"
        @on-delete="deleteNote"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/NotesStore';
import Note from '@/components/Note.vue'
import { useRouter } from 'vue-router';
  
  const notesStore = useNotesStore();
  const router = useRouter();

  const editNote = () => {
    console.log('editNote');
  };

  const deleteNote = (noteId: number) => {
    const confirmation = window.confirm('Уверены, что хотите удалить заметку?');
    if (confirmation) notesStore.deleteNote(noteId);
  };

  const showNote = (noteId: number | string) => {
    router.push(`/view/${noteId}`);
  };
</script>

<style lang="css">
  .home-page {
    color: white;
  }

  .home-page-header {
    display: flex;
    margin: 24px 0;
  }

  .home-page-button {
    height: 30px;
    margin-right: 60px;
    padding: 0 10px;
  }
  
  .home-page-button a {
    display: block;
    color: black;
    text-decoration: none;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>