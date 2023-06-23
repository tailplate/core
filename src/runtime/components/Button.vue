<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $dark } = useNuxtApp();

const state = reactive({ specialColor: "" });

const props = defineProps({
  variant: {
    type: String,
    default: "filled",
    validator(value: string) {
      return ["filled", "outlined", "text"].includes(value);
    },
  },
  dark: {
    type: Boolean,
    default: null,
  },
  rounded: {
    type: Boolean,
    default: false,
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

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
let colorSchema: Color;

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const checkVariants = (variant: string) => {
  if (variant === "outlined") {
    return [
      colorSchema?.bg?.base,
      colorSchema?.text?.primary,
      colorSchema?.border?.primary,
      colorSchema?.border?.focus,
      colorSchema?.ring?.focus,
      "shadow border",
      props.className,
    ];
  } else if (variant === "text") {
    return [
      colorSchema?.text?.primary,
      props.className,
      colorSchema?.bg?.hover,
    ];
  } else {
    return [
      colorSchema?.bg?.primary,
      colorSchema?.bg?.active,
      colorSchema?.bg?.focus,
      colorSchema?.text?.base,
      colorSchema?.border?.primary,
      colorSchema?.border?.focus,
      colorSchema?.shadow?.hover,
      "hover:shadow-lg shadow border",
      props.className,
    ];
  }
};

let classes = checkVariants(props.variant);

props.rounded ? (classes = [...classes, "rounded-full"]) : "";
</script>

<template>
  <div :class="isDark() ? 'dark' : ''">
    <button
      class="rounded-md px-4 py-2 uppercase duration-100 focus:shadow-none active:shadow-none"
      :class="classes"
    >
      <slot />
    </button>
  </div>
</template>
