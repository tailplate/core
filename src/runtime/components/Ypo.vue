<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $dark } = useNuxtApp();

const props = defineProps({
  dark: {
    type: Boolean,
    default: null,
  },
  variant: {
    type: String,
    default: "p",
  },
  className: {
    type: String,
    default: "",
  },
});

const isDark: () => Boolean = () => (props.dark === null ? $dark : props.dark);
</script>

<template>
  <div :class="[isDark() ? 'dark' : '']">
    <h1
      v-if="props.variant === 'h1'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-5xl font-bold"
    >
      <slot />
    </h1>
    <h2
      v-if="props.variant === 'h2'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-4xl font-bold"
    >
      <slot />
    </h2>
    <h3
      v-if="props.variant === 'h3'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-3xl font-bold"
    >
      <slot />
    </h3>
    <h4
      v-if="props.variant === 'h4'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-xl font-bold"
    >
      <slot />
    </h4>
    <h5
      v-if="props.variant === 'h5'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-base font-bold"
    >
      <slot />
    </h5>
    <p
      v-if="props.variant === 'lead'"
      :class="[isDark() ? 'text-slate-400' : 'text-slate-500', props.className]"
      class="text-xl"
    >
      <slot />
    </p>
    <p
      v-if="props.variant === 'p'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class=""
    >
      <slot />
    </p>
    <p
      v-if="props.variant === 'small'"
      :class="[isDark() ? 'text-slate-300' : 'text-slate-800', props.className]"
      class="text-sm"
    >
      <slot />
    </p>
  </div>
</template>
