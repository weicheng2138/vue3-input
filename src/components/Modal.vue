<script setup lang="ts">
  defineEmits(['close'])
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm"
  >
    <div class="rounded-md bg-slate-300 p-2">
      <section class="border-b border-slate-200">HEADER</section>
      <section>CONTENT</section>
      <section class="flex justify-between">
        <button @click="$emit('close')">Close</button>
      </section>
    </div>
  </div>
</template>
