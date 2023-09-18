<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const emit = defineEmits(["toggled"]);

const { $color } = useNuxtApp();

const props = defineProps({
  disabled: {
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
  aria: {
    type: String,
    default: "Checkbox",
  },
  id: {
    type: String,
    default: null,
  },
  className: {
    type: String,
    default: "",
  },
});

const state = reactive({ specialColor: "", checkboxValue: props.active });

let colorSchema: Color;
const baseColor: Color = json["base"];

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const toggle = () => {
  if (!props.disabled) state.checkboxValue = !state.checkboxValue;
  if (!props.disabled)
    emit("toggled", { bool: state.checkboxValue, id: props.id });
};

const applyColor = () => {
  if (!props.disabled) {
    return [
      colorSchema?.text?.base,
      "border-slate-300",
      colorSchema?.bg?.checked,
      colorSchema?.border?.checked,
      props.className,
      "cursor-pointer",
    ];
  } else {
    return "cursor-not-allowed bg-gray-300 border-gray-500 bg-gray-300 opacity-40";
  }
};

const groupHover = () => {
  if (props.disabled) {
    return;
  } else {
    return state.checkboxValue ? colorSchema?.bg?.hover : baseColor?.bg?.hover;
  }
};
</script>

<template>
  <div
    class="flex select-none items-center space-x-2"
    @click="props.disabled ? '' : toggle()"
    :class="[
      baseColor?.text?.primary,
      props.disabled
        ? 'cursor-not-allowed text-slate-400 opacity-70 dark:text-slate-400'
        : 'cursor-pointer',
    ]"
  >
    <div
      class="relative flex items-center justify-center rounded-full p-3 duration-200"
      :class="[groupHover()]"
    >
      <input
        type="checkbox"
        :aria-label="props.aria"
        v-model="state.checkboxValue"
        class="z-10 h-5 w-5 appearance-none rounded border bg-white shadow-inner outline-none"
        :class="[applyColor()]"
      />
      <svg
        v-if="state.checkboxValue && !props.disabled"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="currentColor"
        class="absolute z-20 h-3 w-3 font-bold"
        :class="colorSchema?.text?.base"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
