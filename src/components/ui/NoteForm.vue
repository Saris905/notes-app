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
import { computed, withDefaults, onMounted, ref, watch } from 'vue';
import NoteInput from '@/components/ui/NoteInput.vue';

type Todo = {
  id: number,
  title: string,
};

interface Props {
  title?: string,
  todos?: Todo[],
}

const emit = defineEmits(['submitted']);
const props = withDefaults(defineProps<Props>(), {
  title: '',
  todos: () => [],
});

const todosWithEmptyFields = computed(() => localTodos.value.filter(t => !t.title).length);
const propsNotEmpty = computed(() => Boolean(props.todos.length && props.title));

const error = ref('');
const localTitle = ref('');
const localTodos = ref([{ id: 1, title: '' }, { id: 2, title: '' }, { id: 3, title: '' }]);

onMounted(() => {
  if (propsNotEmpty.value) {
    localTitle.value = props.title;
    localTodos.value = JSON.parse(JSON.stringify(props.todos));
  }
});

watch(todosWithEmptyFields, (length) => {
  if (!length) {
    const id = Math.floor(Math.random() * 100);
    localTodos.value.push({ id, title: '' }); 
  }
});

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
  emit('submitted', { title: localTitle, todos })
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