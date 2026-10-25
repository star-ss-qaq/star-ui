import { example } from "../type.d";

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"div",
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"su-slider",
							props:{
								"v-model":"value"
							}
						},
						{
							isText:true,
							text:"{{value}}"
						}
					]
				}
			]
		},
		data:{
			value:20
		}
	},
] as example[];