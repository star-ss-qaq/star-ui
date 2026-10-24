<template>
	<div>
		<pre>{{displayData}}</pre>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { example,template } from "./type.d";


@Options({
	components:{
	},
	props: {
		example:{
			type:Object,
			default:{}
		},
	}
})
export default class ShowCode extends Vue {
	private example!:example;
	private getTemplateStr(templ:template, indent:number, ex=""):string{
		let outStr = "\t".repeat(indent);
		if(templ.isText){
			return outStr + (templ.text || "") + "\n";
		}
		outStr += "<" + ex + templ.component;
		if(templ.props){
			for(let key in templ.props){
				outStr += " " + key + "=\"" + templ.props[key] + "\"";
			}
		}
		outStr += ">\n";
		if(templ.slot){
			templ.slot.forEach((slot) => {
				let showTem=false;
				let str=''
				if(slot.name!="default"||slot.propName){
					str=" #"+slot.name+(slot.propName?`="${slot.propName}"`:"");
					if(slot.data.length!=1||slot.data[0].isText){
						showTem=true
					}
				}
				if(showTem){
					outStr+="\t".repeat(indent+1) + `<template${str}>\n`;
				}
				slot.data.forEach((item) => {
					outStr += this.getTemplateStr(item,indent+(showTem?2:1),showTem?'':str);
				});
				if(showTem){
					outStr+="\t".repeat(indent+1) + `</template>\n`;
				}
			})
		}
		outStr += "\t".repeat(indent) + "</" + templ.component + ">\n";
		return outStr;
	}
	get displayData():string{
		let outStr = "<template>\n";
		outStr += this.getTemplateStr(this.example.template, 1)
		outStr += "</template>\n";

		if(this.example.data){
			outStr += `\n<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({})
export default class Example extends Vue {\n`;
			for(var i in this.example.data){
				outStr += "\t" + i + "=" + JSON.stringify(this.example.data[i]) + ";\n";
			}
			//outStr
			outStr += "}\n";
			outStr += "<" + "/script>\n";//绝了 连着写不仅我的提取引擎会有问题（但是可以改，并且不会覆盖到这里），vue的引擎也会在这里截断脚本 只能分开写了
		}
		return outStr;
	}
}
</script>
<style scoped>
div{
	padding: 10px;
	background: rgba(0,0,0,0.1);
	overflow: auto;
}
pre{
	margin: 0;
	padding: 0;
}
</style>