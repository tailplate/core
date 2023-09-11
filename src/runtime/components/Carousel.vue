<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const { $color, $baseColor } = useNuxtApp();

const state = reactive({
  customColor: "",
  moved: "",
  currentSlide: 1,
  calc: 0,
});

export interface Props {
  items: Array<{ src: string; alt: string; type?: string }>;
  dark?: boolean | null;
  color?: unknown | String | null;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dark: null,
  items: () => [
    {
      src: "https://placehold.co/800x400",
      alt: "placeholder",
      type: "image",
    },
  ],
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

const next = () => {
  if (state.currentSlide < props.items.length) {
    state.calc = state.currentSlide * 100;
    if (state.currentSlide < props.items.length + 1) state.currentSlide++;
    return (state.moved = `transform: translate(-${state.calc}%);`);
  }
};
const previous = () => {
  if (state.currentSlide <= props.items.length && state.currentSlide != 1) {
    state.calc = state.calc - 100;
    if (state.currentSlide > 1) state.currentSlide--;
    return (state.moved = `transform: translate(-${state.calc}%);`);
  }
};
</script>

<template>
  <div
    class="relative flex h-[600px] w-[800px] select-none flex-col items-center justify-end overflow-hidden rounded-lg"
  >
    <div
      class="absolute left-4 top-[50%] z-20 flex cursor-pointer items-center justify-center rounded-full p-1 text-white duration-200 hover:bg-slate-100 hover:bg-opacity-10"
      @click="previous()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
    <div
      class="absolute z-10 flex h-full w-full"
      :style="state.moved"
      style="transition-duration: 0.5s"
    >
      <div
        v-for="item in props.items"
        :key="item.src"
        class="relative h-full min-w-full"
      >
        <video
          v-if="item.type === 'video'"
          :src="item.src"
          autoplay
          muted
          loop
          class="absolute z-0 h-full w-full object-cover"
        ></video>
        <img
          v-else
          :src="item.src"
          :alt="item.alt"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
    <div
      class="absolute right-4 top-[50%] z-20 flex cursor-pointer items-center justify-center rounded-full p-1 text-white duration-200 hover:bg-slate-100 hover:bg-opacity-10"
      @click="next()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
    <div class="absolute bottom-4 z-20 flex space-x-2">
      <div
        v-for="(item, index) in props.items"
        :key="item.src"
        class="h-2 rounded-full bg-white duration-150"
        :class="
          state.currentSlide === index + 1
            ? 'w-8 opacity-100'
            : ' w-2 opacity-50'
        "
      ></div>
    </div>
  </div>
</template>
