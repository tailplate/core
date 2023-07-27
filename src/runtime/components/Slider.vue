<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

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
  <div class="slidecontainer">
    <input
      type="range"
      min="1"
      max="100"
      class="slider"
      id="myRange"
      v-model="state.currentValue"
    />
  </div>
</template>
