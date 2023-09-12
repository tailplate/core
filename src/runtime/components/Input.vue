<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

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
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "Label",
  },
});

const state = reactive({ customColor: "" });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}
</script>

<template>
  <div class="relative flex w-full min-w-[200px] flex-col space-y-2">
    <label>
      <t-typo variant="p">{{ props.label }}</t-typo>
    </label>
    <input
      class="h-10 appearance-none rounded border bg-transparent px-2 py-1 text-slate-900 outline-1 ring ring-transparent focus:border-transparent focus:outline-none dark:text-slate-100"
      :class="[
        colorSchema?.ring?.focusPrimary,
        baseColorSchema?.border?.primary,
      ]"
      :placeholder="props.placeholder"
    />
  </div>
</template>
