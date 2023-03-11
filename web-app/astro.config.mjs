import node from "@astrojs/node";
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    server: {
      fs: {
        allow: [".."]
      }
    }
  },
  integrations: [solidJs()]
});