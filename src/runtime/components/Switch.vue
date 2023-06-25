<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const emit = defineEmits(["switched"]);

const { $dark } = useNuxtApp();

const state = reactive({ switched: false });

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
  danger: {
    type: Boolean,
    default: false,
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

const colorSchema: Color = json["base"];
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
</script>

<template>
  <div :class="[isDark() ? 'dark' : '', width]">
    <button
      @click="switchButton()"
      class="flex w-12 items-center justify-between rounded-full font-semibold uppercase shadow-inner duration-100 focus:shadow-none active:shadow-none"
      :class="[
        classes,
        state.switched && !props.danger
          ? colorSchema?.bg?.success
          : 'bg-slate-300',
        state.switched && props.danger
          ? colorSchema?.bg?.danger
          : 'bg-slate-300',
        props.disabled ? ' cursor-not-allowed' : '',
      ]"
    >
      <div
        class="h-6 w-6 rounded-full border bg-slate-50 duration-100"
        :class="state.switched ? 'translate-x-full' : ''"
      ></div>
    </button>
  </div>
</template>
