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
  variant: {
    type: String,
    default: "left",
  },
  className: {
    type: String,
    default: "",
  },
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

const close = () => {
  emit("close", { variant: props.variant });
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
    <Transition :duration="200" name="nested">
      <div
        class="fixed inset-0 z-50 h-full w-full"
        v-if="state.show && props.variant === 'left'"
      >
        <div
          class="hide items-left absolute inset-0 z-10 flex h-screen w-full bg-slate-800 bg-opacity-20"
        >
          <div class="inner z-20 flex h-full">
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="nested">
      <div
        class="fixed inset-0 z-50 h-screen w-full"
        v-if="state.show && props.variant === 'bottom'"
      >
        <div
          class="hide items-bottom absolute inset-0 z-10 flex h-screen w-full bg-slate-800 bg-opacity-20"
        >
          <div class="inner z-20 flex h-screen">
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="nested">
      <div
        class="fixed inset-0 z-50 h-screen w-full"
        v-if="state.show && props.variant === 'right'"
      >
        <div
          class="hide items-left absolute inset-0 z-10 flex h-screen w-full bg-slate-800 bg-opacity-20"
        >
          <div class="inner z-20 flex h-screen">
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="nested">
      <div
        class="fixed inset-0 z-50 h-screen w-full"
        v-if="state.show && props.variant === 'top'"
      >
        <div
          class="hide items-left absolute inset-0 z-10 flex h-screen w-full bg-slate-800 bg-opacity-20"
        >
          <div class="inner z-20 flex h-screen">
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.hide {
  backdrop-filter: blur(3px);
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.2s ease;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(-5rem);
}
</style>
