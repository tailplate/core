// @ts-nocheck
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import json from "./utils/colors.json";

export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.tailplate;

  return {
    provide: {
      color: json[options.color],
      baseColor: json["base"],
      dark: options.dark,
    },
  };
});
