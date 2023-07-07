<script setup lang="ts">
import { reactive } from "vue";

const darkMode = () => (state.dark = !state.dark);

const state = reactive({
  dark: false,
});
</script>

<template>
  <t-dark
    :dark="state.dark"
    :class="state.dark ? 'bg-slate-900' : 'bg-white'"
    class="flex h-screen items-center justify-center"
  >
    <t-icon-button @click="darkMode" className="ml-auto top-6 right-6 fixed">
      <svg
        v-if="!state.dark"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </t-icon-button>
    <div class="grid grid-cols-1 gap-12">
      <t-breadcrumbs>
        <t-bread-link>
          <a href="#">Home</a>
        </t-bread-link>
        <t-bread-link>
          <a href="#">Documentation</a>
        </t-bread-link>
        <t-bread-link current>
          <a href="#">Breadcrumbs</a>
        </t-bread-link>
      </t-breadcrumbs>
      <t-breadcrumbs>
        <t-bread-link>
          <a href="#"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-4 w-4"
            >
              <path
                fill-rule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clip-rule="evenodd"
              /></svg
          ></a>
        </t-bread-link>
        <t-bread-link>
          <a href="#">Documentation</a>
        </t-bread-link>
        <t-bread-link current>
          <a href="#">Breadcrumbs</a>
        </t-bread-link>
      </t-breadcrumbs>
      <t-breadcrumbs>
        <t-bread-link separator="-">
          <a href="#">Home</a>
        </t-bread-link>
        <t-bread-link separator="-">
          <a href="#">Documentation</a>
        </t-bread-link>
        <t-bread-link current>
          <a href="#">Breadcrumbs</a>
        </t-bread-link>
      </t-breadcrumbs>
    </div>
  </t-dark>
</template>
