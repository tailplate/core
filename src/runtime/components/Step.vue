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
  <div
    class="relative flex items-center justify-end"
    :class="[props.step === 0 ? 'w-auto' : 'w-full']"
  >
    <div
      v-if="props.step !== 0"
      class="relative h-1 w-full overflow-hidden duration-300"
    >
      <div
        class="absolute h-full w-full duration-300"
        :class="[
          state.isActive ? '-right-[100%]' : 'right-0',
          baseColorSchema?.bg?.gray,
        ]"
      ></div>
      <div
        class="absolute h-full w-full duration-300"
        :class="[
          state.isActive ? 'left-0' : '-left-[100%]',
          colorSchema?.bg?.primary,
        ]"
      ></div>
    </div>
    <div
      class="flex min-h-[1rem] min-w-[1rem] shrink-0 grow-0 items-center justify-center rounded-full p-2 delay-150 duration-150"
      :class="[
        state.isActive ? colorSchema?.bg?.primary : baseColorSchema?.bg?.gray,
        state.isActive
          ? baseColorSchema?.text?.invert
          : baseColorSchema?.text?.primary,
      ]"
    >
      <slot />
    </div>
  </div>
</template>
