<template>
  <div class="note">
    <div class="note-info">
      <h2 class="note-title" @click="$emit('on-show', props.note.id)">
        {{ order }} {{ props.note.title }}
      </h2>

      <div class="note-todos">
        <ToDoItem 
          v-for="(todo, index) in note.todos"
          :key="todo.title + index"
          :todo="todo"
          :readonly="readonly"
          @on-finished="$emit('on-finished', props.note.id, todo.id)"
        />
      </div>
    </div>

    <div class="note-buttons">
      <div class="note-button-edit" @click="$emit('on-edit', props.note.id)">
        &#9998;
      </div>
      <div class="note-button-delete" @click="$emit('on-delete', props.note.id)">
        &#215;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue';
import { computed } from 'vue';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },

  readonly: {
    type: Boolean,
    default: false,
  }
});

const order = computed(() => props.note.order ? `${props.note.order}.` : '');
const emit = defineEmits(['on-show', 'on-edit', 'on-delete', 'on-finished']);
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