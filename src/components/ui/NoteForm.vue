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
        :placeholder="`Задача ${index + 1}`"
        :key="task.id"
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

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000);
}

type Props = {
  note?: Note
}

const MIN_FIELDS_COUNT = 3;
const emptyTodo: TodoItem = {
  id: generateRandomId(),
  title: '',
  isFinished: false,
  createdDate: new Date().toISOString()
};

const props = withDefaults(defineProps<Props>(), {
  note: () => ({ 
    id: Math.floor(Math.random() * 10000),
    title: '',
    createdDate: new Date().toISOString(),
    todos: Array.from(Array(MIN_FIELDS_COUNT)).map((_, index) => ({
      id: index + 1,
      title: '',
      isFinished: false,
      createdDate: new Date().toISOString()
    }))
  }),
});

const emit = defineEmits(['submit']);

const error = ref('');
const localTitle = ref('');
const localTodos: Ref<TodoItem[]> = ref([]);

onMounted(() => {
  localTitle.value = props.note.title;
  localTodos.value = JSON.parse(JSON.stringify(props.note.todos));
});

const emptyFieldsCount = computed(() => localTodos.value.filter(t => !t.title).length);

watch(emptyFieldsCount, (count) => {
  if (!count) {
    localTodos.value.push({ ...emptyTodo, id: generateRandomId() }); 
    return;
  }

  if (localTodos.value.length < MIN_FIELDS_COUNT) {
    const delta = MIN_FIELDS_COUNT - localTodos.value.length;

    for (let i = 0; i < delta; i++) {
      localTodos.value.push({ ...emptyTodo, id: generateRandomId() });
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
    alert('Не заполнены обязательные поля');
    error.value = 'Обязательное поле';
    return;
  }

  const todos = localTodos.value.filter(t => t.title);
  const result: Note = {
    id: props.note.id,
    title: localTitle.value, 
    createdDate: props.note.createdDate,
    todos,
  }

  emit('submit', result)
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