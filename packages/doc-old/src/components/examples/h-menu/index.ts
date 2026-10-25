import { example } from "../type.d";

const menu = [
	{
		path:'#1',
		title:'菜单1',
		children:[
			{
				path:'#1-1',
				title:'菜单1-1',
			},
			{
				path:'#1-2',
				title:'菜单1-2',
				children:[
					{
						path:'#1-2-1',
						title:'菜单1-2-1',
					},
					{
						path:'#1-2-2',
						title:'菜单1-2-2',
					},
				]
			},
		]
	},
	{
		path:'#2',
		title:'菜单2',
	},
];

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-menu",
			props:{
				style:"width:100%;height:40px;",
				":menu": "menu",
			}
		},
		data:{
			menu,
		},
	},
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-menu",
			props:{
				":menu": "menu",
				"direction": "v",
			}
		},
		data:{
			menu,
		},
	},
] as example[];
