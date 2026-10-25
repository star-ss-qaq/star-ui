import { example } from "../type.d";

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-h-layout",
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"div",
							props:{
								style:"height:100%;width:100px;"
							}
						},
						{
							isText:false,
							component:"su-v-line"
						},
						{
							isText:false,
							component:"su-main"
						},
						{
							isText:false,
							component:"su-v-line"
						},
						{
							isText:false,
							component:"div",
							props:{
								style:"height:100%;width:100px;"
							}
						}
					]
				}
			],
			props:{
				style:"width:100%;height:100px;"
			}
		}
	},
] as example[];