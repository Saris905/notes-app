<template>
  <button 
    class="return-button"
    @click="goBack"
  >
    &larr;
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style>
  .return-button {
    display: block;
    height: 30px;
    width: 50px;
    margin-right: 30px;
  }

  .return-button a {
    display: block;
    font-weight: bold;
    color: black;
    text-decoration: none;
  }
</style>