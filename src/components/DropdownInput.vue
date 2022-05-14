<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { onClickOutside } from '@vueuse/core'

  interface Props {
    modelValue?: string | number | null
    placeholder: string
    type?: 'single' | 'multiple' | 'search'
    disabled?: boolean
    data: string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'single',
    disabled: false,
  })
  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  /**
   * Clear modelValue
   */
  const clearInput = () => {
    isEmpty.value = true
    emit('update:modelValue', '')
  }
  const isEmpty = ref(true)
  watch(
    () => props.modelValue,
    (value) => {
      if (value === '') {
        isEmpty.value = true
      } else {
        isEmpty.value = false
      }
    }
  )

  const dropdownInput = ref<HTMLElement | null>(null)
  const isShowDropdown = ref(false)
  onClickOutside(dropdownInput, () => (isShowDropdown.value = false))
  const handleSelect = (item: string) => {
    isShowDropdown.value = false
    emit('update:modelValue', item)
  }
</script>
<template>
  <div ref="dropdownInput" class="relative">
    <input
      class="h-full w-full appearance-none rounded-lg bg-gray-200 p-2 text-sm"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <section class="absolute inset-y-0 right-3 flex justify-end gap-2">
      <!-- Input Clear Icon -->
      <span
        class="flex items-center text-sm leading-5"
        :class="isEmpty ? 'hidden' : ''"
        @click="clearInput"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <span class="flex items-center gap-2">
        <!-- Search Icon -->
        <svg
          v-if="type === 'search'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <!-- Multiple Icon -->
        <svg
          v-if="type === 'multiple'"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          class="h-6 w-6 text-gray-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect fill="none" height="24" width="24" />
          <g>
            <path
              d="M22,8c0-0.55-0.45-1-1-1h-7c-0.55,0-1,0.45-1,1s0.45,1,1,1h7C21.55,9,22,8.55,22,8z M13,16c0,0.55,0.45,1,1,1h7 c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1h-7C13.45,15,13,15.45,13,16z M10.47,4.63c0.39,0.39,0.39,1.02,0,1.41l-4.23,4.25 c-0.39,0.39-1.02,0.39-1.42,0L2.7,8.16c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0l1.42,1.42l3.54-3.54 C9.45,4.25,10.09,4.25,10.47,4.63z M10.48,12.64c0.39,0.39,0.39,1.02,0,1.41l-4.23,4.25c-0.39,0.39-1.02,0.39-1.42,0L2.7,16.16 c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0l1.42,1.42l3.54-3.54C9.45,12.25,10.09,12.25,10.48,12.64L10.48,12.64z"
            />
          </g>
        </svg>

        <!-- Dropdown Icon -->
        <button @click="isShowDropdown = !isShowDropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 duration-200"
            :class="!isShowDropdown ? 'rotate-180' : 'transform-none'"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </span>
    </section>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform opacity-0 -translate-y-4"
      enter-to-class="opacity-100 transform translate-none"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 transform translate-none"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <section
        v-if="isShowDropdown"
        class="mt-1 flex w-full flex-col rounded-lg bg-gray-200 py-2"
      >
        <button
          v-for="item in data"
          :key="item"
          class="flex gap-2 p-2 hover:bg-gray-300"
          @click="handleSelect(item)"
        >
          <svg
            v-if="modelValue === item"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-orange-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <p :class="modelValue === item ? '' : 'pl-7'">{{ item }}</p>
        </button>
      </section>
    </Transition>
  </div>
</template>
