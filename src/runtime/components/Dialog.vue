<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors.json";

const emit = defineEmits(["close"]);

const { $color, $baseColor } = useNuxtApp();

const state = reactive({ customColor: "", show: false });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  show: {
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
let baseColorSchema: Color = $baseColor as Color;

if (props.color === null && state.customColor === "") {
  colorSchema = $color;
} else {
  state.customColor !== ""
    ? (colorSchema = json[state.customColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

const close = () => {
  emit("close");
};

watch(
  () => props.show,
  (show) => {
    state.show = show;
  }
);
</script>

<template>
  <div @wheel.prevent @touchmove.prevent @scroll.prevent>
    <div class="fixed inset-0 z-50 h-full w-full" v-if="state.show">
      <div
        class="hide absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-opacity-20 dark:bg-opacity-20"
        :class="baseColorSchema?.bg?.invert"
      >
        <div class="z-20 max-w-[90%] xl:max-w-[70%]">
          <slot></slot>
        </div>
        <div class="absolute z-10 h-full w-full" @click="close()"></div>
      </div>
    </div>
  </div>
</template>

<style>
.hide {
  backdrop-filter: blur(3px);
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  opacity: 0;
  transform: translateX(-5rem);
}
</style>
