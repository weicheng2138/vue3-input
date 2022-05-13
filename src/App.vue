<script setup lang="ts">
  import { ref } from 'vue'
  import BasicInput from './components/BasicInput.vue'
  const form = ref('')
</script>

<template>
  <BasicInput v-model="form" placeholder="Please Enter here" type="password" />
  <h1>{{ form }}</h1>
</template>
