<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "", open: false });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  open: {
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

let colorSchema: Color;
let baseColorSchema: Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

watch(
  () => props.open,
  (open) => {
    state.open = open;
  }
);
</script>

<template>
  <div v-if="state.open">
    <slot />
  </div>
</template>
