import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const p = join(process.cwd(), "../vue/src/main.ts");
export default defineConfig({
	resolve: {},
	plugins: [vue()],
	build: {
		lib: {
			entry: ["src/index.ts"],
			formats: ["es"],
			fileName: (f, name) => `${name}.js`,
		},
		outDir:'dist',
		rolldownOptions:{
			external:["vue"]
		}
	},
});
