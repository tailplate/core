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

const isDark = () => (props.dark === null ? $dark : props.dark);
</script>

<template>
  <div :class="isDark() ? 'dark' : ''">
    <button
      class="m-1 rounded-sm border px-2 py-1 text-xs shadow-sm duration-100 active:scale-95 active:shadow-none"
      :class="[
        $color.bg.primary,
        $color.text.primary,
        $color.border.primary,
        $color.bg.active,
        tclass,
      ]"
    >
      <slot />
    </button>
  </div>
</template>
