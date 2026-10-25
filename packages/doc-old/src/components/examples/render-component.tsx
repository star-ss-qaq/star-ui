import { Options, Vue } from 'vue-class-component';
import { VNode, h, resolveComponent } from "vue"


import { template, example } from "./type.d";

const HTMLEL = ["div","span","p"];

@Options({
	props: {
		example:{
			type:Object,
			required:true
		}
	}
})
export default class RenderComponent extends Vue {
	private example!:example;

	created():void{
		if(this.example.data){
			this.componentData=JSON.parse(JSON.stringify(this.example.data));
		}
		this.componentThis = new Proxy(this,{
			get:(obj, prop)=>{
				if(prop in obj.componentMethods){
					return obj.componentMethods[prop as string];
				}else if(prop in obj.componentData){
					return this.componentData[prop as string];
				}else if(obj.example.data&&(prop in obj.example.data)){
					return obj.example.data[prop as string];
				}else if(typeof prop === 'string' && prop.startsWith('$') && (prop in this)){
					return this[prop as keyof this];
				}else{
					return undefined;
				}
			},
			set:(obj, prop, value)=>{
				obj.componentData[prop as string]=value;
				return true;
			}
		}) as Vue;
	}
	//虚拟组件this
	private componentThis = {} as Vue;

	//虚拟组件方法
	public get componentMethods():IObj{
		const ret = {} as Record<string, (...reg: unknown[]) => unknown>;
		if (this.example.methods) {
			Object.keys(this.example.methods).forEach(key => {
				ret[key] = (this.example.methods as Record<string, (this: Vue, ...reg: unknown[]) => unknown>)[key].bind(this.componentThis)
			})
		}
		return ret;
	}
	//虚拟组件数据
	public componentData:IObj={};

	//解析表达式（仅限简单表达式）
	private analysis(expression:string,locaVar:Record<string, unknown>={}){
		// eslint-disable-next-line
		let data:any={
			...this.example.data,
			...this.componentData,
			...this.componentMethods,
			...locaVar,
		};
		expression.split(".").forEach((itemKey)=>{
			data=data[itemKey];
		})
		return data;
	}
	private tName(name: string):string{
		return name.replace(/-([a-z])/gi, function(a, k:string) {
			return k.toLocaleUpperCase();
		});
	}
	private renderComponent(item:template,locaVar:Record<string, unknown>={}):VNode{
		const props:IObj={};
		if(item.props){
			for(let key in item.props){
				let value=item.props[key];
				if(key.startsWith(":")||key.startsWith("v-bind:")){
					key=key.substr(key.indexOf(":")+1);
					if(typeof value == "string"){
						value=this.analysis(value, locaVar);
					}
				}else if(key.startsWith("@")){
					props["on-"+key.substr(1)]=this.componentMethods[value];
					key = this.tName("on-"+key.substr(1));
					value=this.componentMethods[value];
				}else if(key.startsWith("v-on:")){
					key = "on"+key.substr(5);
					value=this.componentMethods[value];
				}else if(key=="v-model"){
					key="modelValue";
					props["onUpdate:modelValue"]=(function(this:RenderComponent,value:string,inputValue:unknown){
											let data=this.componentData;
											const path=value.split(".");
											const last=path.pop();
											path.forEach((itemKey)=>{
												data=data[itemKey];
											});
											data[last as string]=inputValue;
										}).bind(this,value);
					value=this.analysis(value, locaVar);
				}
				console.log(key, value)
				props[key]=value;
			}
		}
		const solt:IObj={};
		if(item.slot){
			item.slot.forEach((s)=>{
				solt[s.name]=(props:unknown)=>{
					return s.data.map((template)=>{
						if(template.isText){
							return (template.text as string).replace(/\{\{(.+?)\}\}/g,(data,v)=>this.analysis(v, {
								...locaVar,
								[s.propName || '_soltProps']:props
							}));
						}
						return this.renderComponent(template,{
							...locaVar,
							props
						});
					});
				};
			});
		}
		let component=item.component;
		if(typeof component=="string" && HTMLEL.indexOf(component)==-1){
			component=resolveComponent(component);
			if(!component) component=item.component
		}
		return h(component,props,solt)
	}
	public render():VNode{
		const y = this.renderComponent(this.example.template);
		console.log(y)
		return y;
	}
}