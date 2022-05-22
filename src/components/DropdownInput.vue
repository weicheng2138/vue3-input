<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import {
    onClickOutside,
    useElementBounding,
    useWindowSize,
  } from '@vueuse/core'

  import ChevrondownIconButton from './buttons/ChevrondownIconButton.vue'

  // TODO maxListHeight is not really working
  interface Props {
    modelValue?: string | string[] | null
    placeholder: string
    type?: 'single' | 'multiple' | 'search'
    disabled?: boolean
    options: string[]
    maxListHeight?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'single',
    disabled: false,
    maxListHeight: 200,
  })
  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string | string[]): void
  }>()

  /**
   * Clear modelValue
   */
  const clearInput = () => {
    isEmpty.value = true
    if (props.type === 'multiple') {
      selectedArray.value = []
      emit('update:modelValue', [])
    }
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
        isShowDropdown.value = true
      }
    }
  )

  const dropdownInput = ref<HTMLElement | null>(null)
  const isShowDropdown = ref(false)
  const selectedArray = ref<string[]>([])
  onClickOutside(dropdownInput, () => (isShowDropdown.value = false))
  /**
   * handle selected Item
   * @param {String} item - Selected Item from dropdown.
   */
  const handleSelect = (item: string) => {
    if (props.type === 'multiple') {
      if (!selectedArray.value.includes(item)) {
        selectedArray.value.push(item)
      } else {
        const index = selectedArray.value.indexOf(item)
        if (index > -1) {
          selectedArray.value.splice(index, 1) // 2nd parameter means remove one item only
        }
      }

      emit('update:modelValue', selectedArray.value)
    } else {
      isShowDropdown.value = false
      emit('update:modelValue', item)
    }
  }

  /**
   * Deal with realtime filtering
   */
  const filteredOptions = computed(() => {
    if (props.type !== 'multiple' && typeof props.modelValue === 'string') {
      let lowerCaseOfModelValue = props.modelValue.toLowerCase()
      return props.options.filter((item) => {
        return item.toLowerCase().includes(lowerCaseOfModelValue)
      })
    }
    return props.options
  })

  /**
   * Return a complete tailwind string for dynamic class
   * You cannot assemble tailwind class in class tag
   * @returns  {string} Return completed tailwind class
   * @param {string} variable that going to be assembled
   * @param {number | string} variable that going to be assembled
   */
  // const getTailwindClassString = (
  //   tailwindClassHead: string,
  //   variable: string | number
  // ): string => {
  //   console.log(`${tailwindClassHead}-[${variable}px]`)
  //   return `${tailwindClassHead}-[${variable}px]`
  // }

  /**
   * Deal with dropdown out of box problem (below viewport)
   */
  const dropList = ref<HTMLElement | null>(null)
  const { bottom: dropListBottomYAxis } = useElementBounding(dropList)
  const { height: windowHeight } = useWindowSize()
  const isBelowWindow = () => {
    return dropListBottomYAxis.value > windowHeight.value
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
        <ChevrondownIconButton
          class="duration-200"
          :class="!isShowDropdown ? 'rotate-180' : 'transform-none'"
          @click="isShowDropdown = !isShowDropdown"
        />
      </span>
    </section>

    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <section
        v-if="isShowDropdown"
        ref="dropList"
        class="absolute my-1 flex max-h-[200px] w-full flex-col overflow-auto rounded-lg bg-gray-200 py-2"
        :class="isBelowWindow() ? ' bottom-[60px]' : ''"
      >
        <button
          v-for="item in filteredOptions"
          :key="item"
          class="flex gap-2 p-2 hover:bg-gray-300"
          @click="handleSelect(item)"
        >
          <svg
            v-if="!Array.isArray(modelValue)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            :class="
              modelValue === item ? 'text-orange-500' : 'text-transparent'
            "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-if="Array.isArray(modelValue)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            :class="
              modelValue.includes(item) ? 'text-blue-500' : 'text-transparent'
            "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <p>{{ item }}</p>
        </button>
      </section>
    </Transition>
  </div>
</template>
