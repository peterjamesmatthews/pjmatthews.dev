import path from "node:path";
import { fileURLToPath } from "node:url";

import { globSync } from "glob";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	root: "src",
	server: { fs: { allow: ["../.."] } },
	plugins: [solidPlugin()],
	build: {
		rollupOptions: {
			// adapted from https://rollupjs.org/configuration-options/#input:~:text=Object.fromEntries,%5D)%0A%09)%2C
			input: Object.fromEntries(
				globSync("src/**/*.html").map((file) => [
					// This remove `src/` as well as the file extension from each
					// file, so e.g. src/nested/foo.js becomes nested/foo
					path.relative(
						"src",
						file.slice(0, file.length - path.extname(file).length)
					),
					// This expands the relative paths to absolute paths, so e.g.
					// src/nested/foo becomes /project/src/nested/foo.js
					fileURLToPath(new URL(file, import.meta.url)),
				])
			),
		},
	},
});
