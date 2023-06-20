<template>
  <div
    class="flex h-screen items-center justify-center p-12 duration-100"
    :class="state.dark ? 'bg-slate-900' : ''"
  >
    <t-classic-button :dark="state.dark" @click="darkMode">
      Dark Mode
    </t-classic-button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({ dark: true });

const darkMode = () => (state.dark = !state.dark);
</script>
