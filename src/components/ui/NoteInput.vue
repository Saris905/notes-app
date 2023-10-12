<template>
  <div class="note-input">
    <input 
      :value="props.modelValue" 
      :placeholder="placeholder" 
      @blur="emit('update:modelValue', $event)"
    >
    <span class="note-input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  error: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue', 'validate'])
</script>

<style lang="css">
  .note-input {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 6px;
  }

  .note-input input {
    width: 250px;
    padding: 5px;
  }

  .note-input-error {
    margin-top: 6px;
    font-size: 24px;
    color: red;
  }
</style>