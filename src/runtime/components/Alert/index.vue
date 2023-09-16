<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../../utils/types/types";
import json from "../../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  dismiss: {
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

const state = reactive({ customColor: "", dismiss: props.dismiss });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

watch(
  () => props.dismiss,
  (dismiss) => {
    state.dismiss = dismiss;
  }
);
</script>

<template>
  <div
    :class="colorSchema?.bg?.primary"
    class="flex w-auto items-center space-x-4 rounded-lg p-4"
    v-if="!state.dismiss"
  >
    <slot />
  </div>
</template>
