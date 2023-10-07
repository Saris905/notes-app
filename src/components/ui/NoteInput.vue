<template>
  <div class="note-input">
    <input 
      v-model="computedValue" 
      :placeholder="placeholder" 
      :readonly="readonly" 
      type="text"
    >
    <span class="node-input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  readonly: {
    type:Boolean,
    default: false,
  }
});

const currentValue = ref('');
const error = ref('');

const computedValue = computed({
  get() {
    return currentValue.value || props.value;
  },

  set(val: string) {
    currentValue.value = val;
  },
});
</script>

<style lang="css">
  .note-input {
    padding: 0;
    margin-top: 10px;
  }

  .note-input input {
    width: 250px;
    padding: 5px;
  }

  .note-inpur-error {
    font-size: 24px;
    color: red;
  }
</style>