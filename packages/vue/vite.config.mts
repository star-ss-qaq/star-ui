import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFile } from "fs/promises";
import { compileTemplate } from "vue/compiler-sfc";
import dts from "unplugin-dts/vite";

const p = join(process.cwd(), "../vue/src/main.ts");
export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		vue({}),
		{
			name: "svg-loader",
			enforce: "pre",
			load: {
				filter: {
					id: /\.svg\?component$/,
				},
				async handler(id) {
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
					this.addWatchFile(path);
					return `${code}\nexport default { render: render }`;
				},
			},
		},
		dts({
			// include: ["./src/**/*/vue", "./src/**/*/ts"],
			exclude: ["./dist/**", "**/example/**"],
		}),
	],
	build: {
		lib: {
			entry: ["src/index.ts"],
			formats: ["es"],
			name: "starUi",
			cssFileName: "style",
		},
		outDir: "dist",
		rolldownOptions: {
			/**
			 * 非.和\0开头，过滤掉虚拟模块和线路路径引用，非/开头过滤unix绝对路径（模块解析后可能会变成绝对路径）
			 * 第二个位非/和:，解决Windows下的绝对路径
			 */
			external: /^[^\.\/\0][^\/:]/,
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
	},
});
