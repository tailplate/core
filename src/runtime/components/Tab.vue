<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const emit = defineEmits(["update:currentIndex"]);

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
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

const state = reactive({ customColor: "", isActive: props.active });

if (props.index === 0) {
  state.isActive = true;
}

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const updateCurrentIndex = () => {
  emit("update:currentIndex", props.index);
};

watch(
  () => props.active,
  (active: boolean) => {
    state.isActive = active;
  }
);
</script>

<template>
  <button
    @click="updateCurrentIndex()"
    class="flex items-center justify-center rounded px-4 py-2"
    :class="[
      state.isActive ? `${baseColorSchema?.bg?.primary} shadow` : '',
      props.className,
    ]"
  >
    <slot />
  </button>
</template>
