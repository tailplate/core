<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String,
    default: "p",
  },
  className: {
    type: String,
    default: "",
  },
  invert: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <h1
      v-if="props.variant === 'h1'"
      :class="[props.className]"
      class="text-5xl font-bold text-slate-800 dark:text-slate-200"
    >
      <slot />
    </h1>
    <h2
      v-if="props.variant === 'h2'"
      :class="[props.className]"
      class="text-4xl font-bold text-slate-800 dark:text-slate-200"
    >
      <slot />
    </h2>
    <h3
      v-if="props.variant === 'h3'"
      :class="[props.className]"
      class="text-3xl font-bold text-slate-800 dark:text-slate-200"
    >
      <slot />
    </h3>
    <h4
      v-if="props.variant === 'h4'"
      :class="[props.className]"
      class="text-xl font-bold text-slate-800 dark:text-slate-200"
    >
      <slot />
    </h4>
    <h5
      v-if="props.variant === 'h5'"
      :class="[props.className]"
      class="text-base font-bold text-slate-800 dark:text-slate-200"
    >
      <slot />
    </h5>
    <p
      v-if="props.variant === 'lead'"
      :class="[props.className]"
      class="text-xl text-slate-500 dark:text-slate-400"
    >
      <slot />
    </p>
    <p
      v-if="props.variant === 'p'"
      :class="[
        props.className,
        props.invert
          ? 'text-slate-200 dark:text-slate-700'
          : 'text-slate-700 dark:text-slate-200',
      ]"
    >
      <slot />
    </p>
    <p
      v-if="props.variant === 'small'"
      :class="[
        props.className
          ? props.className
          : 'text-sm text-slate-700 dark:text-slate-200',
      ]"
    >
      <slot />
    </p>
    <p
      v-if="props.variant === 'xs'"
      :class="[
        props.className
          ? props.className
          : 'text-xs text-slate-700 dark:text-slate-200',
      ]"
    >
      <slot />
    </p>
  </div>
</template>
