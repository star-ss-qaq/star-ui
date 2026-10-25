interface slotType{
	name:string,
	data:template[],
	propName?:string
}
export interface template{
	isText?:boolean,
	component?:class,
	text?:string,
	slot?:slotType[],
	props?:IObj,
}
export interface example{
	name:string,
	template:template,
	data?:Record<string, unknown>,
	methods?:Record<string, (this: Vue, ...reg: unknown[]) => unknown>,
}