<template>
  <div :class="['note', { finished: props.note.isFinished }]">
    <div class="note-complete" @click="$emit('on-finished', props.note.id)">
      <input type="checkbox" :checked="props.note.isFinished">
      <span class="checkbox-icon">✓</span>
    </div>

    <div class="note-info">
      <h2 class="note-title" @click="$emit('on-show')">
        {{ props.note.id }}. {{ props.note.title }}
      </h2>
      <div class="note-description">
        {{ props.note.description }}
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
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['on-show', 'on-edit', 'on-delete', 'on-finished']);
</script>

<style>
.note {
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding-bottom: 10px;
  color: white;
  border-bottom: 1px solid white;
}

.note.finished,
.note.finished .note-button-edit,
.note.finished .note-button-delete {
  color: gray;
  border-bottom: 1px solid gray;
  text-decoration: line-through;
}

.note-title {
  font-size: 20px;
  font-weight: bold;
}

.note-description {
  margin-top: 10px;
  font-size: 14px;
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
.note-complete input,
.note-title {
  cursor: pointer;
}

.note-complete {
  position: relative;
  display: inline-flex;
  margin-right: 20px;
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
</style>