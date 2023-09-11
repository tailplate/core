<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

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
const baseColorSchema: Color = $baseColor as Color;

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
    <Transition :duration="200" name="left">
      <div
        class="fixed inset-0 z-50 h-screen w-auto"
        v-if="state.show && props.variant === 'left'"
      >
        <div
          class="hide absolute inset-0 z-10 flex h-screen w-auto bg-opacity-20 dark:bg-opacity-20"
          :class="baseColorSchema?.bg?.invert"
        >
          <div
            class="inner absolute left-0 z-20 h-screen rounded-md p-4 shadow"
            :class="baseColorSchema?.bg?.secondary"
          >
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="bottom">
      <div
        class="fixed inset-0 z-50 h-auto w-screen"
        v-if="state.show && props.variant === 'bottom'"
      >
        <div
          class="hide absolute inset-0 z-10 flex h-screen w-auto bg-opacity-20 dark:bg-opacity-20"
          :class="baseColorSchema?.bg?.invert"
        >
          <div
            class="inner absolute bottom-0 z-20 w-[100vw] rounded-md p-4 shadow"
            :class="baseColorSchema?.bg?.secondary"
          >
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="right">
      <div
        class="fixed inset-0 z-50 h-screen w-auto"
        v-if="state.show && props.variant === 'right'"
      >
        <div
          class="hide absolute inset-0 z-10 flex h-screen w-auto bg-opacity-20 dark:bg-opacity-20"
          :class="baseColorSchema?.bg?.invert"
        >
          <div
            class="inner absolute right-0 z-20 h-screen rounded-md p-4 shadow"
            :class="baseColorSchema?.bg?.secondary"
          >
            <slot></slot>
          </div>
          <div class="absolute z-10 h-full w-full" @click="close()"></div>
        </div>
      </div>
    </Transition>
    <Transition :duration="200" name="top">
      <div
        class="fixed inset-0 z-50 h-auto w-screen"
        v-if="state.show && props.variant === 'top'"
      >
        <div
          class="hide absolute inset-0 z-10 flex h-screen w-auto bg-opacity-20 dark:bg-opacity-20"
          :class="baseColorSchema?.bg?.invert"
        >
          <div
            class="inner absolute top-0 z-20 w-[100vw] rounded-md p-4 shadow"
            :class="baseColorSchema?.bg?.secondary"
          >
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
  backdrop-filter: blur(2px);
}

.left-enter-active .inner,
.left-leave-active .inner {
  transition: all 0.2s ease;
}

.left-enter-from .inner,
.left-leave-to .inner {
  transform: translateX(-5rem);
}

.bottom-enter-active .inner,
.bottom-leave-active .inner {
  transition: all 0.2s ease;
}

.bottom-enter-from .inner,
.bottom-leave-to .inner {
  transform: translateY(5rem);
}

.top-enter-active .inner,
.top-leave-active .inner {
  transition: all 0.2s ease;
}

.top-enter-from .inner,
.top-leave-to .inner {
  transform: translateY(-5rem);
}

.right-enter-active .inner,
.right-leave-active .inner {
  transition: all 0.2s ease;
}

.right-enter-from .inner,
.right-leave-to .inner {
  transform: translateX(5rem);
}
</style>
