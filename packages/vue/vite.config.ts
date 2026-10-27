import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFile } from "fs/promises";
import { compileTemplate } from "vue/compiler-sfc";
const p = join(process.cwd(), "../vue/src/main.ts");
export default defineConfig({
	resolve: {},
	plugins: [
		vue(),
		{
			enforce: "pre",
			load: {
				filter: {
					id: /\.svg\?component$/,
				},
				async handler(id) {
					console.log(111);
					const [path, query] = id.split("?", 2);
					let svg = "";
					try {
						svg = await readFile(path, "utf-8");
					} catch (ex) {
						console.warn(
							"\n",
							`${id} couldn't be loaded by vite-svg-loader, fallback to default loader`,
						);

						return;
					}
					const { code } = compileTemplate({
						id: JSON.stringify(id),
						source: svg,
						filename: path,
						transformAssetUrls: false,
					});

					return `${code}\nexport default { render: render }`;
				},
			},
		},
	],
	build: {
		lib: {
			entry: ["src/index.ts"],
			formats: ["es"],
			fileName: (f, name) => `${name}.js`,
		},
		outDir: "dist",
		rolldownOptions: {
			external: /^[^\.\/\0]/,
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
	},
});
