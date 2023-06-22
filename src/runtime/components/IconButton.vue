<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $color, $dark } = useNuxtApp();

const props = defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: null,
  },
  tclass: {
    type: String,
    default: "",
  },
});

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
</script>

<template>
  <div :class="isDark() ? 'dark' : ''">
    <button
      class="flex items-center justify-center rounded-md border p-2 shadow duration-100 active:scale-95 active:shadow-none"
      :class="[
        $color?.bg?.primary,
        $color?.text?.primary,
        $color?.border?.primary,
        $color?.bg?.active,
        props?.tclass,
      ]"
    >
      <slot />
    </button>
  </div>
</template>
