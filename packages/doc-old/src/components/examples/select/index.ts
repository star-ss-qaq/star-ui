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
							component:"su-select",
							props:{
								"v-model": "data",
								":options": "options",
							}
						}
					]	
				}
			]
		},
		data:{
			options:[
				{label:"label1",value:"1"},
				{label:"label2",value:"2"},
				{label:"label3",value:"3"},
				{label:"label4",value:"4"},
				{label:"label5",value:"5"},
				{label:"label6",value:"6"},
				{label:"label7",value:"7"},
				{label:"label8",value:"8"},
				{label:"label9",value:"9"},
				{label:"label10",value:"10"},
				{label:"label11",value:"11"},
				{label:"label12",value:"12"},
				{label:"label13",value:"13"},
				{label:"label14",value:"14"},
				{label:"label15",value:"15"},
			],
			data:"2"
		}
	},
	{
		name:"小尺寸",
		template:{
			isText:false,
			component:"div",
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"su-select",
							props:{
								"v-model": "data",
								":options": "options",
								"size":"mini"
							}
						}
					]	
				}
			]
		},
		data:{
			options:[
				{label:"label1",value:"1"},
				{label:"label2",value:"2"},
			],
			data:"2"
		}
	},
	{
		name:"树状显示",
		template:{
			isText:false,
			component:"div",
			slot:[
				{
					name:"default",
					data:[
						{
							isText:false,
							component:"su-select",
							props:{
								"v-model": "data",
								":options": "options",
								"size":"mini",
								"showAsTree":true
							}
						}
					]	
				}
			]
		},
		data:{
			options:[
				{
					label:"label 1",
					value:"1",
					children:[
						{label:"label 1-1",value:"1-1"},
						{label:"label 1-2",value:"1-2"},
						{label:"label 1-3",value:"1-3"},
						{label:"label 1-4",value:"1-4"},
					]
				},
				{label:"label 2",value:"2"},
				{label:"label 3",value:"3"},
				{label:"label 4",value:"4"},
				{label:"label 5",value:"5"},
				{label:"label 6",value:"6"},
				{label:"label 7",value:"7"},
				{
					label:"label 8",
					value:"8",
					children:[
						{label:"label 8-1",value:"8-1"},
						{
							label:"label 8-2",
							value:"8-2",
							children:[
								{label:"label 8-2-1",value:"8-2-1"},
								{label:"label 8-2-2",value:"8-2-2"},
							]
						},
						{label:"label 8-3",value:"8-3"},
						{label:"label 8-4",value:"8-4"},
						{label:"label 8-5",value:"8-5"},
					]
				},
				{label:"label 9",value:"9"},
			],
			data:"2"
		}
	}
] as example[];