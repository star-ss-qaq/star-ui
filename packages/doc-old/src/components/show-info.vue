<template>
	<div v-if="component">
		<h1 class="star-ui-container">{{$t("components.types."+component.__o.name+".name")}}{{component.__o.name}}</h1>
		<h5 class="star-ui-container">{{$t("components.types."+component.__o.name+".description")}}</h5>
		<su-h-line/>
		<div class="star-ui-container">
			<h2>例子</h2>
			<examples :name="component.__o.name"></examples>
		</div>
		<su-h-line/>
		<div class="star-ui-container">
			<h2>参数列表</h2>
			<su-table :columns="column" :data="propsList">
			</su-table>
		</div>
	</div>
	<not-fount v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Examples from "./examples/index.vue";
import NotFount from './errors/404.vue';
import { data } from "@/../ui/src/reg";
import {components} from "@thestarweb/ui";


type PropInof={
	field:string,
	type:string,
	default:string,
	description:string,
	name:string,
}

@Options({
	name:"su-button",
	components:{
		Examples,
		NotFount,
	}
})
export default class SuButton extends Vue {
	// eslint-disable-next-line
	public get component():any{
		for(let i in components){
			if(components[i].__o.name==this.$route.params.name){
				return components[i];
			}
		}
		return null;
	}
	public column=[
		//{name:"名称"},
		{
			name:"字段",
			field:"field"
		},
		{
			name:"名称",
			field:"name"
		},
		{
			name:"类型",
			field:"type"
		},
		{
			name:"默认值",
			field:"default"
		},
		{
			name:"描述",
			field:"description"
		},
	];
	// eslint-disable-next-line
	private getType(type:any):string{
		if(type==null){
			return "null";
		}else if(typeof type=="function"){
			return type.name;
		}else if(typeof type=="undefined"){
			return "-";
		}else{
			if(type instanceof Array){
				// eslint-disable-next-line
				return type.map((item:any)=>this.getType(item)).join("|")
			}else{
				return type.toString();
			}
		}
	}
	public get propsList():PropInof[]{
		// eslint-disable-next-line
		const props = {
			...this.component.__o.props,
			...(data[this.component.__o.name]||{}).props
		};
		var list=[];
		if(props){
			for(const name of Object.keys(props)){
				const item=props[name];
				list.push({
					field:name,
					type:this.getType(item.type),
					default:typeof item.default=="function"?item.default():item.default,
					description:this.$t("components.types."+this.component.__o.name+".props."+name+".description"),
					name:this.$t("components.types."+this.component.__o.name+".props."+name+".name"),
				});
			}
		}
		return list;
	}
}
</script>

<style scoped>
</style>
