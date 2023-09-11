<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const emit = defineEmits(["avatar-full"]);

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
  className: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "full",
  },
  alt: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "base",
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

const rounded = () => {
  if (props.variant === "squared") {
    return;
  } else if (props.variant === "rounded") {
    return "rounded-md";
  } else {
    return "rounded-full";
  }
};

const size = () => {
  if (props.size === "xs") {
    return "w-6 h-6";
  } else if (props.size === "sm") {
    return "w-8 h-8";
  } else if (props.size === "md") {
    return "w-12 h-12";
  } else if (props.size === "base") {
    return "w-12 h-12";
  } else if (props.size === "lg") {
    return "w-16 h-16";
  } else if (props.size === "xl") {
    return "w-20 h-20";
  } else if (props.size === "2xl") {
    return "w-24 h-24";
  } else {
    return "h-12 w-12";
  }
};

if (props.variant === "full") emit("avatar-full");
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    srcset=""
    class="object-cover"
    :class="[rounded(), size()]"
  />
</template>
