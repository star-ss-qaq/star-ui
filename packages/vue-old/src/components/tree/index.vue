<template>
	<div :class="[
		'star-ui',
		'su-tree',
		'star-ui-tree',
		{
			'star-ui-tree-highlight-current':highlightCurrent
		}
	]">
		<tree-item v-for="(item, index) in treeData" :key="index" :size="size" :item="item" :label="label" :value="value" :children="children" :current="current" current-value="currentValue" @node-click="haandleChildNodeClick"></tree-item>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop } from "@ui-root/reg";
import treeItem from "./tree-item.vue"


import "../../global-style.css";

@Register({
	name:"su-tree",
	components:{
		treeItem
	}
})
export default class SuTree extends Vue {
	@Prop({
		type:String,
		default:()=>{
			return "medium"
		}
	})
	readonly size!:string;
	@Prop({
		type:Array,
		default:()=>{
			return []
		}
	})
	readonly treeData!:Record<string, unknown>[];
	@Prop({
		type:[String,Function],
		default:()=>{
			return "label"
		}
	})
	readonly label!:string|((item:Record<string, unknown>)=>string);
	@Prop({
		type:[String,Function],
		default:()=>{
			return "value"
		}
	})
	readonly value!:string|((item:Record<string, unknown>)=>string|number);
	@Prop({
		type:[String,Function],
		default:()=>{
			return "children"
		}
	})
	readonly children!:string|((item:Record<string, unknown>)=>Record<string, unknown>[]);
	@Prop({
		type:Boolean,
		default:()=>{
			return false
		}
	})
	readonly highlightCurrent!:boolean;

	private current:Record<string, unknown>={};
	private get currentValue():string|number|undefined{
		if(typeof this.value == "string"){
			return (this.current[this.value]) as string|number|undefined;
		}
		return this.value(this.current);
	}
	public setCurrent(current:Record<string, unknown>):void{
		this.current=current;
	}
	public setCurrentByValue(value:string|number):Record<string, unknown>|null{
		let task:Record<string, unknown>[] = [];
		task.push(...this.treeData);
		while(task.length){
			const item = task.pop() as Record<string, unknown>;
			let itemValue:string|number|undefined;
			if(typeof this.value == "string"){
				itemValue = (item[this.value]) as string|number|undefined;
			}else{
				itemValue = this.value(item);
			}
			if(value == itemValue){
				this.current = item;
				return item;
			}
			let children:Record<string, unknown>[]|undefined;
			if(typeof this.children == "string"){
				children = (item[this.children]) as Record<string, unknown>[]|undefined;
			}else{
				children = this.children(item);
			}
			children&&task.push(...children);
		}
		this.current={};
		return null;
	}
	haandleChildNodeClick(item:Record<string, unknown>,value:string|number|undefined,node:Record<string, unknown>):void{
		this.current=item;
		this.$emit("node-click",item,value,node);
	}
}
</script>

<style>
</style>
