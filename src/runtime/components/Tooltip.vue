<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "", hover: false });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  content: {
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
</script>

<template>
  <div class="relative">
    <Transition>
      <p
        v-if="state.hover"
        class="absolute bottom-[120%] left-1/2 z-50 w-[12rem] -translate-x-[50%] rounded-md bg-slate-900 bg-opacity-80 p-4 text-center text-xs text-slate-100 shadow"
      >
        {{ props.content }}
      </p>
    </Transition>

    <div @mouseover="state.hover = true" @mouseleave="state.hover = false">
      <slot />
    </div>
  </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
