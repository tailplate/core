<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $color } = useNuxtApp();

defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="m-1 rounded-sm px-4 py-2 text-white shadow-md duration-100 focus:shadow-none active:scale-95 active:shadow-none"
    :class="[$color.bg.primary]"
  >
    <slot />
  </button>
</template>
