<template>
  <div class="note">
    <div class="note-info">
      <h2 class="note-title" @click="showNote(props.note.id)">
        {{ orderNumber }} {{ props.note.title }}
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
      <div class="note-button-edit" @click="editNote(props.note.id)">
        &#9998;
      </div>
      <div class="note-button-delete" @click="$emit('on-delete', props.note.id)">
        &#215;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ToDoItem from './ToDoItem.vue';

const router = useRouter();
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },

  readonly: {
    type: Boolean,
    default: false,
  },

  previewLimit: {
    type: Number,
  },
});
const emit = defineEmits(['on-show', 'on-edit', 'on-delete', 'on-finished']);

const orderNumber = computed(() => props.note.order ? `${props.note.order}.` : '');
const computedTodos = computed(() => {
  return props.previewLimit 
    ? [...props.note.todos.slice(0, props.previewLimit)]
    : props.note.todos;
})

const editNote = (noteId: string) => {
  router.push(`/edit/${noteId}`);
};

const showNote = (noteId: string) => {
  router.push(`/view/${noteId}`);
};
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