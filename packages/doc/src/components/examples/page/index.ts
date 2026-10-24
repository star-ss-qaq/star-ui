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
		name: 'base',
		template: {
			component: 'div',
			slot: [
				{
					name: 'default',
					data: [
						{
							component: 'su-page',
							props: {
								title: '测试',
								":menu": "menu",
							},
							slot: [
								{
									name: 'default',
									data: [
										{
											isText: true,
											text: 'Hello! This is a page for test!',
										}
									]
								}
							]
						},
					],
				},
			],
			props: {
				style: "height:200px",
			},
		},
		data: {
			menu,
		},
	},
] as example[];