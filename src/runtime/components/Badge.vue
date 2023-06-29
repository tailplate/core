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
</script>

<template>
  <div
    class="absolute z-50"
    :class="[
      isDark() ? 'dark' : '',
      props.slot ? '-right-2 -top-2' : '-right-1 -top-1',
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
