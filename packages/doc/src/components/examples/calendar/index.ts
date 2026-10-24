import { example } from "../type.d";

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-calendar"
		}
	},
	{
		name:"自定义默认显示时间",
		template:{
			isText:false,
			component:"su-calendar",
			props:{
				displayMonth:"2015-09"
			}
		}
	},
	{
		name:"自定义起始星期",
		template:{
			isText:false,
			component:"su-calendar",
			props:{
				weekOffect:1
			}
		}
	},
	{
		name:"插槽自定义渲染内容",
		template:{
			isText:false,
			component:"su-calendar",
			slot:[
				{
					name: 'default',
					propName: 'day',
					data: [
						{
							isText: true,
							text: '{{day.display}}/{{day.week}}',
						},
					]
				}
			]
		}
	},
] as example[];