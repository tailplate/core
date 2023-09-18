<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../../utils/types/types";
import json from "../../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  row: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: null,
  },
  className: {
    type: String,
    default: "",
  },
});

const state = reactive({ customColor: props.color });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $baseColor as Color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}
</script>

<template>
  <div
    class="relative flex overflow-x-hidden rounded-lg border border-opacity-10 bg-clip-border shadow-lg"
    :class="[
      props.row ? 'flex-row' : 'flex-col',
      props.className,
      props.color
        ? colorSchema?.bg?.primary
        : 'bg-white dark:border-slate-600 dark:bg-slate-800',
      colorSchema?.border?.primary,
    ]"
  >
    <slot />
  </div>
</template>
