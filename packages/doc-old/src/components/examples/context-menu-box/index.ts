export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-context-menu-box",
			props: {
				menu:[{title: 'aa', children: [ {title: 'aa.1', click: () => console.log('aa.1 click')} ]}, {title: 'bb', click: () => console.log('bb click')}]
			},
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"div",
							slot:[
								{
									name:"default",
									data:[
										{
											isText:true,
											text:"触发菜单"
										}
									]
								}
							]
						}
					]
				}
			]
		}
	},
];