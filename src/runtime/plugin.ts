// @ts-nocheck
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import base from `./utils/colors/base.json`
import { Color } from "../utils/types/types";
import blue from `./utils/colors/blue.json`


export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.tailplate;
 
  return {
    provide: {
      color: color(),
      baseColor: base as Color,
      dark: options.dark,
    },
  };
});
