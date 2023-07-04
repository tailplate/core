<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

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

if (props.variant === "full") emit("avatar-full");
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    srcset=""
    class="h-12 w-12 object-cover"
    :class="[rounded()]"
  />
</template>
