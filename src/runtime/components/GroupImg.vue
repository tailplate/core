<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "" });

export interface Props {
  sources: string[];
  dark?: boolean | null;
  color?: unknown | String | null;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dark: null,
  sources: () => ["https://placehold.co/800x400"],
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
</script>

<template>
  <div class="flex h-96 overflow-hidden rounded-lg">
    <div v-for="item in props.sources" :key="item" class="h-full w-full">
      <img :src="item" alt="" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
