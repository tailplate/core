<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const emit = defineEmits(["switched"]);

const { $dark, $color } = useNuxtApp();

const state = reactive({ switched: false, specialColor: "" });

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
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  active: {
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

let colorSchema: Color;

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);

let classes: Array<String> = [];
let width: string;

props.size === "sm" ? (classes = [...classes, "px-4 py-2 text-xs "]) : "";
props.size === "md" ? (classes = [...classes, " text-xs"]) : "";
props.size === "lg" ? (classes = [...classes, "px-7 py-4 text-sm"]) : "";
props.active ? (state.switched = true) : "";

const switchButton = () => {
  if (!props.disabled) state.switched = !state.switched;
  if (!props.disabled) emit("switched", { bool: state.switched, id: props.id });
};

const applyColor = () => {
  if (state.switched) {
    return colorSchema?.bg?.primary;
  } else if (isDark() && !props.disabled) {
    return "bg-slate-600";
  } else if (isDark() && props.disabled) {
    return "bg-slate-700";
  } else {
    return "bg-slate-300";
  }
};
</script>

<template>
  <div :class="[isDark() ? 'dark' : '', width]">
    <button @click="switchButton()" class="flex items-center space-x-4">
      <div
        class="flex w-10 items-center justify-between rounded-full font-semibold uppercase shadow-inner duration-100 focus:shadow-none active:shadow-none"
        :class="[
          classes,
          applyColor(),
          props.disabled ? ' cursor-not-allowed ' : '',
        ]"
      >
        <div
          class="h-5 w-5 rounded-full duration-100"
          :class="[
            state.switched ? '0 translate-x-full' : '',
            props.disabled && !isDark() ? 'bg-white opacity-70' : 'bg-white',
            props.disabled && isDark() && !props.active
              ? 'bg-slate-500 opacity-70'
              : 'bg-white',
            props.disabled && isDark() && props.active
              ? 'bg-white opacity-70'
              : 'bg-white',
          ]"
        ></div>
      </div>
      <slot />
    </button>
  </div>
</template>