import { join } from "path";
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
const p = join(process.cwd(), "../vue/src/main.ts",)
export default defineConfig({
	resolve: {
		alias: {
      // "@thestarweb/ui":"./src/src/main.ts",
      "@/*": "./src/*",
    },
	},
  plugins:[
    vue(),
    {name:'aa', resolveId(id){
      if(id==='@thestarweb/ui'){
        console.log(11111,p)
        return p;
      }
      if(id.startsWith('@/')){
        return join(process.cwd(), 'src', id.substring(2))
      }
    }}
  ]
});
