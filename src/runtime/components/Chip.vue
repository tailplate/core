<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "" });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "filled",
    validator(value: string) {
      return ["filled", "outlined", "text"].includes(value);
    },
  },
  className: {
    type: String,
    default: "",
  },
});

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const checkVariants = (variant: string) => {
  if (variant === "outlined") {
    return [
      colorSchema?.text?.primary,
      colorSchema?.border?.primary,
      "border",
      props.className,
    ];
  } else if (variant === "text") {
    return [colorSchema?.text?.primary, props.className];
  } else {
    return [
      colorSchema?.bg?.primary,
      baseColorSchema?.text?.invert,
      colorSchema?.border?.primary,
      "border ",
      props.className,
    ];
  }
};

let classes = checkVariants(props.variant);
</script>

<template>
  <div class="select-none rounded px-2 py-1 text-xs uppercase" :class="classes">
    <slot />
  </div>
</template>
