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
  size: {
    type: String,
    default: "md",
    validator(value: string) {
      return ["sm", "md", "lg"].includes(value);
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
  group: {
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
      colorSchema?.text?.primary,
      props.group ? "" : colorSchema?.border?.primary,
      props.group ? "" : colorSchema?.border?.focus,
      colorSchema?.ring?.focus,
      props.group ? "" : "border",
      props.className,
    ];
  } else if (variant === "text") {
    return [
      colorSchema?.text?.primary,
      props.className,
      colorSchema?.bg?.hover,
      colorSchema?.bg?.focusLight,
    ];
  } else {
    return [
      colorSchema?.bg?.primary,
      colorSchema?.bg?.active,
      colorSchema?.bg?.focus,
      colorSchema?.text?.base,
      props.group ? "" : colorSchema?.border?.primary,
      props.group ? "" : colorSchema?.border?.focus,
      colorSchema?.shadow?.hover,
      " ",
      props.group
        ? "hover:shadow-[0_20px_15px_-15px_rgba(0,0,0,0.1)]"
        : "border hover:shadow-lg ",
      props.className,
    ];
  }
};

let classes = checkVariants(props.variant);
let width: string;
let groupClass: string = "";

props.rounded ? (classes = [...classes, "rounded-full"]) : "";
props.size === "sm" ? (classes = [...classes, "p-1 text-xs "]) : "";
props.size === "md" ? (classes = [...classes, "p-2 text-xs"]) : "";
props.size === "lg" ? (classes = [...classes, "p-3 text-sm"]) : "";
props.fullWidth ? (width = "w-full") : "";
props.group ? "" : (groupClass = "rounded-md active:scale-95 ");
</script>

<template>
  <div :class="[isDark() ? 'dark' : '', width]">
    <button
      class="flex items-center justify-between space-x-3 font-semibold uppercase duration-100 focus:shadow-none active:shadow-none"
      :class="[classes, width, groupClass]"
    >
      <slot />
    </button>
  </div>
</template>
