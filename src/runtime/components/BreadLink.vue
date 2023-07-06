<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "" });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  current: {
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
  separator: {
    type: String,
    default: "/",
  },
});

let colorSchema: Color;
let baseColorSchema: Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}
</script>

<template>
  <div
    class="flex items-center space-x-2"
    :class="[
      props.current
        ? 'font-bold text-slate-600 dark:text-slate-400'
        : ' text-slate-400 dark:text-slate-500',
    ]"
  >
    <div class="duration-150" :class="colorSchema?.text?.hover">
      <slot />
    </div>
    <p class="" v-if="!props.current">{{ props.separator }}</p>
  </div>
</template>
