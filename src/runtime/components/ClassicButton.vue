<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $color } = useNuxtApp();

defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div :class="dark ? 'dark' : ''">
    <button
      class="m-1 rounded-md border px-4 py-2 shadow-md duration-100 active:scale-95 active:shadow-none"
      :class="[
        $color.bg.primary,
        $color.text.primary,
        $color.border.primary,
        $color.bg.active,
      ]"
    >
      <slot />
    </button>
  </div>
</template>
