<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>

<template>
   <NavBar />
  <main class="container mt-5 pt-5">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
