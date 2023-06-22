<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $color } = useNuxtApp();
const { $dark } = useNuxtApp();

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
      class="rounded-md border px-4 py-2 text-lg shadow-sm duration-100 active:scale-95 active:shadow-none"
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
