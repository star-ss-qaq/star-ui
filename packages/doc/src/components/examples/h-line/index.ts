import { example } from "../type.d";

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-v-layout",
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"div",
							props:{
								style:"width:100%;height:20px;"
							}
						},
						{
							isText:false,
							component:"su-h-line"
						},
						{
							isText:false,
							component:"div",
							props:{
								style:"width:100%;height:20px;"
							}
						}
					]
				}
			],
			props:{
				style:"width:100%;"
			}
		}
	},
] as example[];