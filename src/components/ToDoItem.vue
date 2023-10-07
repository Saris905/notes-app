<template>
  <div :class="['to-do-item', { finished: props.todo.isFinished, readonly: props.readonly }]">
    <div class="to-do-item-complete" @click="$emit('on-finished')">
      <input 
        type="checkbox" 
        :disabled="props.readonly" 
        :checked="props.todo.isFinished"
      >
      <span class="checkbox-icon">✓</span>
    </div>

    <h2 class="to-do-item-title">
      {{ props.todo.title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },

  readonly: {
    type: Boolean,
    required: false,
  }
});

const emit = defineEmits(['on-finished']);
</script>

<style>
.to-do-item {
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding-bottom: 10px;
  color: white;
  font-weight: normal;
  user-select: none;
}

.to-do-item.finished {
  color: gray;
  text-decoration: line-through;
}

.to-do-item.readonly {
  pointer-events: none;
}

.to-do-item-title {
  font-size: 20px;
}

.to-do-item-complete {
  position: relative;
  display: inline-flex;
  margin-right: 20px;
  cursor: pointer;
}

.checkbox-icon {
  position: absolute;
  top: 0;
  margin-left: 2px;
  font-size: 20px;
  color: black;
  transform: scale(0);
  transition: .2s transform ease;
}

input {
  appearance: none;
  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: #fff;
  transition: .2s ease background-color, .2s ease border-color;
}

input:checked ~ .checkbox-icon {
  transform: scale(1);
}

input:checked {
  background-color: gray;
  border-color: gray;
}

input:disabled {
  background-color: gray;
}
</style>