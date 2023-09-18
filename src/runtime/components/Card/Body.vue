<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../../utils/types/types";
import json from "../../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  scroll: {
    type: Boolean,
    default: true,
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

const state = reactive({ customColor: "" });

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
  <div
    class="w-full p-6"
    :class="[props.className, props.scroll ? 'overflow-y-scroll ' : '']"
  >
    <slot />
  </div>
</template>
