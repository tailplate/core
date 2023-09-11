<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const emit = defineEmits(["update:defaultValue"]);

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
  className: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: Number,
    default: 50,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const state = reactive({ customColor: "", currentValue: props.defaultValue });

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
  () => state.currentValue,
  (value: number) => {
    emit("update:defaultValue", state.currentValue);
    state.currentValue = value;
  }
);
</script>

<template>
  <div class="relative w-full">
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-[6px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
      :class="colorSchema.range?.primary"
      id="myRange"
      v-model="state.currentValue"
    />
  </div>
</template>
