<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $dark } = useNuxtApp();

const state = reactive({ specialColor: "" });

const props = defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: null,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  warning: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: null,
  },
  tclass: {
    type: String,
    default: "",
  },
});

props.danger ? (state.specialColor = "red") : "";
props.warning ? (state.specialColor = "orange") : "";

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
let colorSchema: Color;

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}
</script>

<template>
  <div :class="isDark() ? 'dark' : ''">
    <button
      class="rounded-md border px-4 py-2 shadow duration-100 active:scale-95 active:shadow-none"
      :class="[
        colorSchema?.bg?.primary,
        colorSchema?.text?.primary,
        colorSchema?.border?.primary,
        colorSchema?.bg?.active,
        tclass,
      ]"
    >
      <slot />
    </button>
  </div>
</template>
