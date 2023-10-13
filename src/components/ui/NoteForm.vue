<template>
  <div class="note-form">
    <div class="note-form-field">
      <span>Заголовок</span>
      <NoteInput 
        :model-value="localTitle"
        placeholder="Заголовок"
        :error="error"
        @update:model-value="updateTitle($event.target.value)"
      />
    </div>

    <div class="note-form-field">
      <span>Задачи</span>
      <NoteInput 
        v-for="(task, index) in localTodos"
        :model-value="task.title"
        :key="task.title + index"
        @update:model-value="updateTodoInput(task.id, $event.target.value)"
      />
    </div>

    <button 
      class="note-form-button"
      @click="submit"
    >
      Сохранить
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch, withDefaults } from 'vue';
import { TodoItem } from '@/types/TodoItem.type';
import { Note } from '@/types/Note.type';
import NoteInput from '@/components/ui/NoteInput.vue';

type Props = {
  note?: Note
}

const emit = defineEmits(['submitted']);

const props = withDefaults(defineProps<Props>(), {
  note: () => ({ 
    id: Math.floor(Math.random() * 100),
    title: '',
    createdDate: new Date().toISOString(),
    todos: [{},{},{}].map((_, index) => ({
      id: index + 1,
      title: '',
      isFinished: false,
      createdDate: new Date().toISOString()
    }))
  }),
});

const todosWithEmptyFields = computed(() => localTodos.value.filter(t => !t.title).length);

const error = ref('');
const localTitle = ref('');
const localTodos: Ref<TodoItem[]> = ref([]);

onMounted(() => {
  localTitle.value = props.note.title;
  localTodos.value = JSON.parse(JSON.stringify(props.note.todos));
});

watch(todosWithEmptyFields, (length) => {
  const defaultTodo: TodoItem = {
    id: Date.now(),
    title: '',
    isFinished: false,
    createdDate: new Date().toISOString()
  };

  if (!length) {
    localTodos.value.push({ ...defaultTodo }); 
    return;
  }

  if (localTodos.value.length < 3) {
    const delta = 3 - localTodos.value.length;
    for (let i = 0; i < delta; i++ ) {
      localTodos.value.push({ ...defaultTodo, id: Date.now() + i });
    }
  }
}, { immediate: true });

const updateTitle = (value: string) => {
  if (value) error.value = '';
  localTitle.value = value;
};

const updateTodoInput = (taskId: number, value: string) => {
  const task = localTodos.value.find((todo) => todo.id === taskId);
  if (task?.id) task.title = value;
};

const submit = () => {
  if (!localTitle.value) {
    error.value = 'Обязательное поле';
    return;
  }

  const todos = localTodos.value.filter(t => t.title);
  const result: Note = {
    id: props.note.id,
    title: localTitle.value, 
    createdDate: props.note.createdDate,
    todos: todos,
  }

  emit('submitted', result)
}
</script>

<style>
.note-form {
  padding: 10px;
}

.note-form-field {
  margin-top: 12px;
}

.note-form-button {
  height: 30px;
  margin-top: 20px;
}

.note-form-field span {
  font-size: 12px;
}
</style>