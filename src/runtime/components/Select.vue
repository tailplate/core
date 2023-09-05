<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const { $color, $baseColor } = useNuxtApp();

interface ObjectList {
  label: string;
  value: string;
  selected?: boolean;
}

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  arrow: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: null,
  },
  className: {
    type: String,
    default: "",
  },
  list: {
    type: Array<ObjectList>,
    required: true,
  },
});

const state = reactive({ customColor: "", isSelected: 0, show: false });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

props.list.forEach((element, index) => {
  if (element.selected === true) {
    state.isSelected = index;
    return;
  }
});

/**
 * Change the selected item and hide it.
 *
 * @param {number} index - The index of the item to be selected.
 */
const changeItem = (index: number) => {
  state.isSelected = index;
  state.show = false;
};
</script>

<template>
  <div class="relative w-full">
    <button
      class="flex w-full cursor-pointer items-center justify-between space-x-6 rounded border py-2 pl-6 pr-2 duration-200"
      :class="[
        baseColorSchema?.bg?.primary,
        state.show
          ? baseColorSchema?.border?.secondary
          : baseColorSchema?.border?.primary,
      ]"
      @click="state.show = !state.show"
    >
      <p :class="baseColorSchema?.text?.secondary">
        {{ props.list[state.isSelected].label }}
      </p>
      <svg
        v-if="props.arrow"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4 duration-200"
        :class="[
          state.show ? 'rotate-180' : '',
          baseColorSchema?.text?.primary,
        ]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
    <div
      v-if="state.show"
      class="absolute mt-1 w-full rounded shadow-md"
      :class="baseColorSchema?.bg?.primary"
    >
      <div
        @click="changeItem(index)"
        class="m-1 cursor-pointer rounded px-6 py-1 duration-150"
        :class="[colorSchema?.bg?.hoverPrimary]"
        v-for="(item, index) in props.list"
        :key="item.value"
      >
        <p class="text-sm" :class="baseColorSchema?.text?.secondary">
          {{ item.label }}
        </p>
      </div>
    </div>
  </div>
</template>
