<script setup lang="ts">
  import { ref } from 'vue'
  import DropdownInput from './components/DropdownInput.vue'
  import Modal from './components/Modal.vue'
  // import AdjustIconButton from './components/buttons/AdjustIconButton.vue'

  // const selectedData = ref('')
  const selectedData = ref<string[]>([])
  const isOpen = ref(false)
  const dropdownData = ref<string[]>([
    'James Bond',
    'M',
    'Jinx',
    'Keck',
    'Lora',
    'Sam',
  ])
</script>

<template>
  <div class="flex h-screen flex-col">
    <DropdownInput
      v-model="selectedData"
      class="h-[60px] w-[400px]"
      placeholder="Please Enter here"
      type="single"
      :options="dropdownData"
      :max-list-height="20"
    >
    </DropdownInput>

    <h1 class="text-green-600">{{ selectedData }}</h1>
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
