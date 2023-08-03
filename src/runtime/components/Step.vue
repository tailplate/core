<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: null,
    required: true,
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

const state = reactive({ customColor: "", isActive: false });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

if (props.step === 0) state.isActive = true;

watch(
  () => props.isActive,
  (active) => {
    state.isActive = active;
  }
);
</script>

<template>
  <div class="relative flex w-full items-center justify-end">
    <div
      v-if="props.step !== 0"
      class="h-1 w-full"
      :class="[state.isActive ? colorSchema?.bg?.primary : 'bg-slate-300']"
    ></div>
    <div
      class="h-4 w-4 rounded-full p-2"
      :class="[state.isActive ? colorSchema?.bg?.primary : 'bg-slate-300']"
    >
      <slot />
    </div>
  </div>
</template>
