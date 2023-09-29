import { defineStore } from "pinia";

interface State {
  notes: Note[],
  activeTab: number,
}

interface Note {
  id: number,
  title: string,
  description: string,
  isFinished: boolean,
  createdDate: string,
}

export const useNotesStore = defineStore('notesStore', {
  state: (): State => ({
     notes: [{
      id: 1,
      title: 'Note 1',
      description: 'Some detail about Note 1',
      isFinished: true,
      // new Date().toISOString
      createdDate: '2023-08-29T05:35:39.995Z',
     }, {
      id: 2,
      title: 'Note 2',
      description: 'Some more detail about Note 2. Some more detail about Note 2',
      isFinished: false,
      createdDate: '2023-09-29T06:35:39.995Z',
     }, {
      id: 3,
      title: 'Note 3',
      description: 'Some more detail about Note 3. Some more detail about Note 3',
      isFinished: true,
      createdDate: '2022-10-20T07:20:39.995Z',
     }, {
      id: 4,
      title: 'Note 4',
      description: 'Some more detail about Note 4. Some more detail about Note 4',
      isFinished: false,
      createdDate: '2021-11-10T07:21:39.995Z',
     }, {
      id: 5,
      title: 'Note 5',
      description: 'Some more detail about Note 5. Some more detail about Note 5',
      isFinished: true,
      createdDate: '2020-12-19T07:35:39.995Z',
     }],
     activeTab: 1,
  }),

  getters: {
    uncompletedNotes(): Note[] {
      return this.notes.filter(({ isFinished }) => !isFinished);
    },

    sortedNotes(): Note[] {
      return [...this.notes.sort((a, b) => {
        return new Date(a.createdDate).valueOf() - new Date(b.createdDate).valueOf();
      })];
    }
  },
  
  actions: {
    setActiveTab(id: number) {
      this.activeTab = id;
    },

    deleteNote(noteId: number) {
      this.notes = this.notes.filter(({ id }) => id !== noteId);
    },

    toggleFinished(noteId: number) {
      const note = this.notes.findIndex(({ id }) => id === noteId);
      this.notes[note].isFinished = !this.notes[note].isFinished;
    }
  }
})  