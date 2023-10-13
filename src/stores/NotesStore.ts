import { defineStore } from "pinia";
import { Note } from '@/types/Note.type'

type State = {
  notes: Note[],
}

export const useNotesStore = defineStore('notesStore', {
  state: (): State => ({
     notes: [{
      id: 1,
      title: 'Купить продукты',
      createdDate: '2024-08-29T05:35:39.995Z',
      todos: [{
        id: 1,
        title: 'Хлеб',
        isFinished: true,
        createdDate: '2022-01-29T05:35:39.995Z',
      }, {
        id: 2,
        title: 'Молоко',
        isFinished: false,
        createdDate: '2022-03-29T05:35:39.995Z',
      }, {
        id: 3,
        title: 'Овощи',
        isFinished: true,
        createdDate: '2022-02-29T05:35:39.995Z',
      }, {
        id: 4,
        title: 'Мясо',
        isFinished: false,
        createdDate: '2022-04-29T05:35:39.995Z',
      }],
     }, {
      id: 2,
      title: 'Уборка',
      createdDate: '2025-08-29T05:35:39.995Z',
      todos: [{
        id: 1,
        title: 'Кухня',
        isFinished: true,
        createdDate: '2023-07-29T05:35:39.995Z',
      }, {
        id: 2,
        title: 'Ванная',
        isFinished: false,
        createdDate: '2023-08-29T05:35:39.995Z',
      }],
    }],
  }),

  getters: {
    sortedByDateNotes(): Note[] {
      return this.notes.sort((a, b) => {
        return new Date(a.createdDate).valueOf() - new Date(b.createdDate).valueOf();
      })
    },

    notesWithSortedTodos(): Note[] {
      return this.sortedByDateNotes.filter(({ todos }) => todos
      .sort((a, b) => {
          return new Date(a.createdDate).valueOf() - new Date(b.createdDate).valueOf();
      })
      .sort((x, y) => {
        return (x.isFinished === y.isFinished) 
        ? 0 : x.isFinished 
        ? 1 : -1;
      }))
    },
  },
  
  actions: {
    addNote(note: Note) {
      this.notes.push(note);
    },

    deleteNote(noteId: number) {
      this.notes = this.notes.filter(({ id }) => id !== noteId);
    },

    editNote(note: Note) {
      this.deleteNote(note.id);
      this.addNote(note);
    },

    toggleFinished(noteId: number, todoId: number) {
      const noteIndex = this.notes.findIndex(({ id }) => id === noteId);
      const note = this.notes[noteIndex];
      const todoIndex = note.todos.findIndex(({ id }) => id === todoId)
      note.todos[todoIndex].isFinished = !note.todos[todoIndex].isFinished;
    },
  }
})  