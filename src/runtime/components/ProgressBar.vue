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

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}
</script>

<template>
  <div class="relative flex w-full">
    <progress
      class="relative [&::-moz-progress-bar]:bg-transparent [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-transparent"
      :id="props.id"
      :max="props.maxValue"
      :value="props.currentValue"
    ></progress>
    <div
      class="absolute flex items-center justify-end rounded-full px-2"
      :style="'width:' + props.currentValue + '%'"
      :class="[baseColorSchema?.text?.invert, colorSchema?.bg?.primary]"
    >
      <p class="text-xs">{{ props.currentValue }} %</p>
    </div>
  </div>
</template>
