import { defineNuxtModule } from "@nuxt/kit";

import { join } from "pathe";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@tailplate/ui",
    configKey: "tailplate",
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
