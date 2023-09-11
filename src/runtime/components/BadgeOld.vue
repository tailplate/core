<script setup lang="ts">
import { useNuxtApp } from "#app";
import { reactive, useSlots, onMounted, watch } from "vue";
import { Color } from "../utils/types/types";
import json from "../utils/colors/colors.json";

const { $color } = useNuxtApp();

const slots = useSlots();

const state = reactive({ specialColor: "", fullRounded: false });

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  border: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "red",
  },
  position: {
    type: String,
    default: "top-right",
  },
  className: {
    type: String,
    default: "",
  },
});

let colorSchema: Color;

if (props.color === null && state.specialColor === "") {
  colorSchema = $color;
} else {
  state.specialColor !== ""
    ? (colorSchema = json[state.specialColor as keyof typeof json])
    : (colorSchema = json[props.color as keyof typeof json]);
}

watch(
  () => props.color,
  (color) => {
    if (color === null && state.specialColor === "") {
      colorSchema = $color;
    } else {
      state.specialColor !== ""
        ? (colorSchema = json[state.specialColor as keyof typeof json])
        : (colorSchema = json[props.color as keyof typeof json]);
    }
  }
);

const callbackFull = () => {
  state.fullRounded = true;
};

const checkAvatar = () => {
  if (slots?.default) {
    // @ts-expect-error
    if (slots?.default()[0].type.__name === "Avatar") {
      if (slots.default()[0].props?.variant) {
        state.fullRounded = false;
      } else {
        state.fullRounded = true;
      }
    }
  } else {
    state.fullRounded = false;
  }
};

onMounted(() => {
  checkAvatar();
});

const position = (slot: Boolean, position: String) => {
  if (slot && !state.fullRounded) {
    if (position === "top-right") {
      return "-right-2 -top-2";
    } else if (position === "top-left") {
      return "-left-2 -top-2";
    } else if (position === "bottom-left") {
      return "-left-2 -bottom-2";
    } else if (position === "bottom-right") {
      return "-right-2 -bottom-2";
    }
  } else if (state.fullRounded) {
    if (position === "top-right") {
      return "-right-0 -top-0";
    } else if (position === "top-left") {
      return "-left-0 -top-0";
    } else if (position === "bottom-left") {
      return "-left-0 -bottom-0";
    } else if (position === "bottom-right") {
      return "-right-0 -bottom-0";
    }
  } else {
    if (position === "top-right") {
      return "-right-1 -top-1";
    } else if (position === "top-left") {
      return "-left-1 -top-1";
    } else if (position === "bottom-left") {
      return "-left-1 -bottom-1";
    } else if (position === "bottom-right") {
      return "-right-1 -bottom-1";
    }
  }
};
</script>

<template>
  <div class="relative flex" :class="[!!props.content ? 'mx-2' : '']">
    <div
      class="absolute z-50 flex h-3 w-3 items-center justify-center rounded-full border text-xs font-normal"
      :class="[
        !!props.content ? 'p-3' : '',
        props.border
          ? 'border-2 border-white dark:border-slate-900'
          : 'border-transparent',
        position(!!props.content, props.position),
        colorSchema?.bg?.primary,
        colorSchema?.text?.base,
        props.className,
      ]"
    >
      <p>{{ props.content }}</p>
    </div>
    <div class="z-0" @avatar-full="callbackFull">
      <slot />
    </div>
  </div>
</template>
