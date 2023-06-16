import { defineNuxtModule, createResolver, addPlugin } from "@nuxt/kit";
import { defu } from "defu";
import { join } from "pathe";

export interface ModuleOptions {
  color: String;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "tailplate",
    configKey: "tailplate",
  },
  defaults: {
    color: "blue",
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.css.push(resolve("./runtime/assets/css/main.css"));

    nuxt.options.runtimeConfig.public.tailplate = defu(
      nuxt.options.runtimeConfig.public.tailplate,
      {
        color: options.color,
      }
    );

    addPlugin(resolve("./runtime/plugin"));
  },
  hooks: {
    "components:dirs": (dirs) => {
      dirs.push({
        path: join(__dirname, "runtime/components"),
        prefix: "t",
      });
    },
  },
});
