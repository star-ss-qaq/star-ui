import { example } from "../type.d";

export default [
	{
		name:"base",
		data: {
			visible: false,
		},
		methods: {
			// eslint-disable-next-line
			handleShow(this: any) {
				this.visible = true;
			},
			// eslint-disable-next-line
			handleClose(this: any) {
				this.visible = false;
			},
		},
		template:{
			isText:false,
			component:"div",
			slot:[
				{
					name:"default",
					data:[
						{
							component:"su-button",
							props:{
								'@click': 'handleShow',
							},
							slot:[
								{
									name:"default",
									data:[
										{
											isText: true,
											text: 'open',
										}
									],
								},
							],
						},
						{
							component:"su-modal",
							props:{
								':visible':'visible',
								'@close': 'handleClose'
							},
							slot:[
								{
									name:"default",
									data:[
										{
											isText: true,
											text: 'hello'
										}
									],
								},
							],
						},
					]
				}
			],
		}
	},
] as example[];