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
  border: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "red",
  },
  position: {
    type: String,
    default: "top-right",
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

const position = (slot: Boolean, position: String) => {
  if (slot) {
    if (position === "top-right") {
      return "-right-2 -top-2";
    } else if (position === "top-left") {
      return "-left-2 -top-2";
    } else if (position === "bottom-left") {
      return "-left-2 -bottom-2";
    } else if (position === "bottom-right") {
      return "-right-2 -bottom-2";
    }
  } else {
    if (position === "top-right") {
      return "-right-1 -top-1";
    } else if (position === "top-left") {
      return "-left-1 -top-1";
    } else if (position === "bottom-left") {
      return "-left-1 -bottom-1";
    } else if (position === "bottom-right") {
      return "-right-1 -bottom-1";
    }
  }
};
</script>

<template>
  <div
    class="relative flex"
    :class="[isDark() ? 'dark' : '', !!props.content ? 'mx-2' : '']"
  >
    <div
      class="absolute z-50 flex h-3 w-3 items-center justify-center rounded-full border text-xs font-normal"
      :class="[
        !!props.content ? 'p-3' : '',
        props.border
          ? 'border-2 border-white dark:border-slate-900'
          : 'border-transparent',
        position(!!props.content, props.position),
        colorSchema?.bg?.primary,
        colorSchema?.text?.base,
        props.className,
      ]"
    >
      <p>{{ props.content }}</p>
    </div>
    <div class="z-0">
      <slot />
    </div>
  </div>
</template>
