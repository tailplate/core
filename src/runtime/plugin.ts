// @ts-nocheck
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import json from "./utils/colors.json";
import { Color } from "../utils/types/types";

export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.tailplate;

  return {
    provide: {
      color: json[options.color],
      baseColor: json["base"] as Color,
      dark: options.dark,
    },
  };
});
