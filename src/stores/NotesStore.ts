import { defineStore } from "pinia";

interface State {
  notes: Note[],
}

interface Note {
  id: number,
  title: string,
  createdDate: string,
  todos: TodoItem[],
}

interface TodoItem {
  id: number,
  title: string,
  isFinished: boolean,
  createdDate: string,
}

export const useNotesStore = defineStore('notesStore', {
  state: (): State => ({
     notes: [{
      id: 1,
      title: 'Купить продукты',
      // new Date().toISOString
      createdDate: '2022-08-29T05:35:39.995Z',
      todos: [{
        id: 1,
        title: 'Хлеб',
        isFinished: true,
        createdDate: '2023-08-29T05:35:39.995Z',
      }, {
        id: 2,
        title: 'Молоко',
        isFinished: false,
        createdDate: '2023-08-29T05:35:39.995Z',
      }, {
        id: 3,
        title: 'Овощи',
        isFinished: true,
        createdDate: '2023-08-29T05:35:39.995Z',
      }, {
        id: 4,
        title: 'Мясо',
        isFinished: false,
        createdDate: '2023-08-29T05:35:39.995Z',
      }],
     }, {
      id: 2,
      title: 'Уборка',
      createdDate: '2023-08-29T05:35:39.995Z',
      todos: [{
        id: 1,
        title: 'Кухня',
        isFinished: true,
        createdDate: '2023-08-29T05:35:39.995Z',
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
    deleteNote(noteId: number) {
      this.notes = this.notes.filter(({ id }) => id !== noteId);
    },

    toggleFinished(noteId: number, todoId: number) {
      const noteIndex = this.notes.findIndex(({ id }) => id === noteId);
      const note = this.notes[noteIndex];
      const todoIndex = note.todos.findIndex(({ id }) => id === todoId)
      note.todos[todoIndex].isFinished = !note.todos[todoIndex].isFinished;
    }
  }
})  