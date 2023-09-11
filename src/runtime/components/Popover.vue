<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const { $color, $baseColor } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
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

const state = reactive({ customColor: "", show: props.show });

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
  () => props.show,
  (show) => {
    state.show = show;
  }
);
</script>

<template>
  <div class="relative">
    <Transition>
      <p
        v-if="state.show"
        class="absolute bottom-[120%] left-1/2 z-50 min-w-[20rem] -translate-x-[50%] rounded-md border bg-opacity-80 p-4 text-center text-xs shadow"
        :class="[
          baseColorSchema?.bg?.primary,
          baseColorSchema?.text?.primary,
          baseColorSchema?.border?.primary,
        ]"
      >
        {{ props.content }}
      </p>
    </Transition>

    <div>
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
