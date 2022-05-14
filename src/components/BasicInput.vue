<script setup lang="ts">
  import { ref, watch } from 'vue'

  interface Props {
    modelValue?: string | number | null
    placeholder: string
    type?: 'text' | 'password' | 'email' | 'number'
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
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
  const toggleShowPassword = ref(false)
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
</script>
<template>
  <div class="relative">
    <input
      class="w-full appearance-none rounded-lg bg-gray-200 p-3 text-sm"
      :value="modelValue"
      :type="!toggleShowPassword ? type : 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <section class="absolute inset-y-0 right-3 flex justify-end gap-2">
      <!-- Slot -->
      <span class="flex items-center">
        <slot></slot>
      </span>
      <!-- Input Clear Icon -->
      <span
        class="flex items-center text-sm leading-5"
        :class="isEmpty || type === 'password' ? 'hidden' : ''"
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
      <!-- Password Toggle Icon -->
      <span
        class="flex items-center text-sm leading-5"
        :class="isEmpty || type !== 'password' ? ' hidden' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          :class="{
            hidden: toggleShowPassword,
            block: !toggleShowPassword,
          }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="toggleShowPassword = !toggleShowPassword"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          :class="{
            block: toggleShowPassword,
            hidden: !toggleShowPassword,
          }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="toggleShowPassword = !toggleShowPassword"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </span>
    </section>
  </div>
</template>
