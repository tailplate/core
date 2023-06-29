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
  slot: {
    type: Boolean,
    default: false,
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
      return "right-1 -top-2";
    } else if (position === "top-left") {
      return "-left-5 -top-2";
    } else if (position === "bottom-left") {
      return "-left-5 bottom-1";
    } else if (position === "bottom-right") {
      return "right-1 bottom-1";
    }
  } else {
    if (position === "top-right") {
      return "-right-1 -top-1";
    } else if (position === "top-left") {
      return "-left-4 -top-1";
    } else if (position === "bottom-left") {
      return "-left-4 -bottom-1";
    } else if (position === "bottom-right") {
      return "-right-1 -bottom-1";
    }
  }
};
</script>

<template>
  <div
    class="absolute z-50 flex h-3 w-3"
    :class="[
      isDark() ? 'dark' : '',
      position(props.slot, props.position),
      props.slot ? 'mx-2' : '',
    ]"
  >
    <div
      class="flex h-3 w-3 items-center justify-center rounded-full border text-xs font-normal"
      :class="[
        props.slot ? 'p-3' : '',
        props.border
          ? 'border-white dark:border-slate-900'
          : 'border-transparent',
        colorSchema?.bg?.primary,
        props.className,
      ]"
    >
      <div v-if="props.slot">
        <slot />
      </div>
    </div>
  </div>
</template>
