<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $dark } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
});

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
</script>

<template>
  <div :class="[isDark() ? 'dark' : '']">
    <slot></slot>
  </div>
</template>
