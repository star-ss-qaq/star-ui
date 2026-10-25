import { example } from "../type.d";

export default [
	{
		name:"基本用法（base）",
		template:{
			isText:false,
			component:"su-table",
			props:{
				":columns":"columns",
				":data":"data"
			}
		},
		data:{
			columns:[
				{
					name:"field1",
					field:"field1"
				},
				{
					name:"field2",
					field:"field2"
				},
			],
			data:[
				{field1:"1.1",field2:"1.2"},
				{field1:"2.1",field2:"2.2"},
			]
		}
	}
] as example[];