import {
  defineNuxtModule,
  installModule,
  createResolver,
  addPlugin,
} from "@nuxt/kit";
import { defu } from "defu";
import { join } from "pathe";

export interface ModuleOptions {
  color: String;
  dark: Boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@tailplate/ui",
    configKey: "tailplate",
  },
  defaults: {
    color: "base",
    dark: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const runtimeDir = resolve("./runtime");

    nuxt.options.css.push(resolve("./runtime/assets/css/main.css"));

    nuxt.options.runtimeConfig.public.tailplate = defu(
      nuxt.options.runtimeConfig.public.tailplate,
      {
        color: options.color,
        dark: options.dark,
      }
    );

    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: {
        darkMode: "class",
        plugins: [
          require("@tailwindcss/forms")({ strategy: "class" }),
          require("@tailwindcss/aspect-ratio"),
          require("@tailwindcss/typography"),
          require("@tailwindcss/container-queries"),
        ],
        content: {
          files: [
            resolve(runtimeDir, "components/**/*.{vue,mjs,ts}"),
            resolve(runtimeDir, "*.{mjs,js,ts}"),
          ],
          transform: {
            vue: (content: any) => {
              return content.replaceAll(/(?:\r\n|\r|\n)/g, " ");
            },
          },
        },
      },
    });

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
