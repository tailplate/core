<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const emit = defineEmits(["update:selected"]);

interface Radio {
  customColor: string;
  checked: number | null;
}

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
  options: {
    type: Object,
  },
  legendClassName: {
    type: String,
    default: null,
  },
});

const state: Radio = reactive({ customColor: "", checked: null });

let colorSchema: Color;
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const radioClicked = (index: number, item: object) => {
  state.checked = index;
  emit("update:selected", item);
};
</script>

<template>
  <div class="flex flex-col space-y-2" :class="baseColorSchema?.text?.primary">
    <legend
      :class="
        props.legendClassName ? props.legendClassName : 'text-base font-bold'
      "
    >
      {{ props.options?.legend }}
    </legend>
    <div class="flex flex-col space-y-2">
      <div
        v-for="(item, index) in props.options?.choices"
        :key="item.value"
        class="flex items-center space-x-2"
      >
        <div
          class="cursor-pointer rounded-full p-3 duration-200"
          :class="
            state.checked === index
              ? colorSchema?.bg?.hover
              : baseColorSchema?.bg?.hover
          "
          @click="radioClicked(index, item)"
        >
          <div
            class="relative flex h-5 w-5 cursor-pointer items-center rounded-full border bg-white p-0.5 shadow-inner"
            :class="baseColorSchema?.border?.inverted"
          >
            <input
              :class="state.checked === index ? 'bg-blue-500' : ''"
              type="radio"
              :name="props.options?.name"
              class="z-0 h-full w-full cursor-pointer appearance-none rounded-full"
              :id="item.value"
              :checked="state.checked === index"
            />
          </div>
        </div>
        <label class="cursor-pointer select-none" :for="item.value">{{
          item.label
        }}</label>
      </div>
    </div>
  </div>
</template>
