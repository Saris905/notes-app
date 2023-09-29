<template>
  <div class="home-page container">
    <button class="home-page-button">
      <router-link to="/add">Add new note</router-link>
    </button>
      
    <h1 class="home-page-title">My notes</h1>
    
    <TransitionGroup name="list">
      <Note 
        v-for="note in notesStore.sortedNotes"
        :note="note"
        :key="note.id"
        @on-show="showNote"
        @on-edit="editNote"
        @on-delete="deleteNote"
        @on-finished="toggleFinished"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
  import { useNotesStore } from '@/stores/NotesStore';
  import Note from '@/components/Note.vue'
  
  const notesStore = useNotesStore();

  const editNote = () => {
    console.log('editNote');
  };

  const deleteNote = (noteId: number) => {
    // тут добавить подтверждение через prompt
    notesStore.deleteNote(noteId);
  };

  const showNote = (noteId: number) => {
    console.log('showNote', noteId);
  };

  const toggleFinished = (noteId: number) => {
    notesStore.toggleFinished(noteId);
  };
</script>

<style lang="css">
  .container {
    margin: 0 auto;
    max-width: 600px;
  }

  .home-page {
    color: white;
  }

  .home-page-title {
    font-size: 30px;
    text-align: center;
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