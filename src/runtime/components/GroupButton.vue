<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $dark } = useNuxtApp();

const state = reactive({ specialColor: "" });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: null,
  },
});

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
let colorSchema: Color;

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

let width: string;
let isRounded: string;

props.rounded ? (isRounded = "rounded-full") : (isRounded = "rounded-md");
props.fullWidth ? (width = "w-full") : "";
</script>

<template>
  <div
    class="flex h-full divide-x overflow-hidden"
    :class="[
      isDark() ? 'dark' : '',
      width,
      colorSchema?.divide?.primary,
      isRounded,
    ]"
  >
    <slot></slot>
  </div>
</template>
