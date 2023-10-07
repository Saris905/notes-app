<template>
  <button class="return-button">
    <router-link to="/">&larr;</router-link>
  </button>
</template>

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