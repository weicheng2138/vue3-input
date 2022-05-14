<script setup lang="ts">
  import { ref } from 'vue'
  import BasicInput from './components/BasicInput.vue'
  import Modal from './components/Modal.vue'
  import AdjustIconButton from './components/buttons/AdjustIconButton.vue'

  const form = ref('')
  const isOpen = ref(false)
</script>

<template>
  <div class="">
    <BasicInput v-model="form" placeholder="Please Enter here" type="password">
      <AdjustIconButton @click="isOpen = true" @keyup.esc="isOpen = false" />
    </BasicInput>

    <h1>{{ form }}</h1>
    <Teleport to="body">
      <Modal
        v-if="isOpen"
        tabindex="0"
        @close="isOpen = false"
        @keyup.esc="isOpen = false"
      />
    </Teleport>
  </div>
</template>
