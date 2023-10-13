<template>
  <div class="note">
    <div class="note-info">
      <h2 class="note-title">
        <router-link :to="`/view/${props.note.id}`">
          {{ props.order }} {{ props.note.title }}
        </router-link>
      </h2>

      <div class="note-todos">
        <ToDoItem 
          v-for="(todo, index) in computedTodos"
          :key="todo.title + index"
          :todo="todo"
          :readonly="readonly"
          @on-finished="$emit('on-finished', props.note.id, todo.id)"
        />
      </div>
    </div>

    <div class="note-buttons">
      <router-link 
        class="note-button-edit" 
        :to="`/edit/${props.note.id}`"
      >
        &#9998;
      </router-link>
      <div 
        class="note-button-delete" 
        @click="$emit('on-delete', props.note.id)"
      >
        &#215;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import { Note } from '@/types/Note.type';
import ToDoItem from './ToDoItem.vue';

type Props = {
  note: Note,
  readonly?: boolean,
  previewLimit?: number,
  order?: string,
}

const props = withDefaults(defineProps<Props>(), {
  note: () => ({ 
    title: '', 
    id: 0, 
    createdDate: '', 
    todos: []
  }),
  readonly: false,
  previewLimit: 0,
  order: '',
});

const emit = defineEmits(['on-delete', 'on-finished']);

const computedTodos = computed(() => {
  return Boolean(props.previewLimit) 
    ? props.note.todos.slice(0, props.previewLimit)
    : props.note.todos;
})
</script>

<style>
.note {
  display: flex;
  align-items: flex-start;
  margin-top: 12px;
  padding-bottom: 10px;
  color: white;
  border-bottom: 1px solid white;
  user-select: none;
}

.note-title {
  font-size: 20px;
  font-weight: bold;
}

.note-todos {
  margin-left: 30px;
}

.note-buttons {
  display: flex;
  margin-left: auto;
}

.note-button-edit,
.note-button-delete {
  font-size: 26px;
  margin-right: 10px;
  color: lightgray;
}

.note-button-edit:hover,
.note-button-delete:hover {
  color: white;
  transition: .2s color ease;
}

.note-button-edit,
.note-button-delete,
.note-title {
  cursor: pointer;
}
</style>