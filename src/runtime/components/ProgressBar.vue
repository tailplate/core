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
  color: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: "progress",
  },
  className: {
    type: String,
    default: "",
  },
  maxValue: {
    type: Number,
    default: 100,
  },
  currentValue: {
    type: Number,
    default: 50,
  },
});

const state = reactive({ customColor: "", currentValue: props.currentValue });

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
  () => props.currentValue,
  (value) => {
    state.currentValue = value;
  }
);
</script>

<template>
  <div class="relative flex w-full" :class="props.className">
    <progress
      class="relative w-full [&::-moz-progress-bar]:bg-transparent [&::-webkit-progress-bar]:w-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-transparent"
      :id="props.id"
      :max="props.maxValue"
      :value="state.currentValue"
    ></progress>
    <div
      class="absolute flex w-full items-center justify-end rounded-full px-2 duration-100"
      :style="'width:' + state.currentValue + '%'"
      :class="[baseColorSchema?.text?.invert, colorSchema?.bg?.primary]"
    >
      <p class="font-mono text-xs font-bold">{{ state.currentValue }} %</p>
    </div>
  </div>
</template>
