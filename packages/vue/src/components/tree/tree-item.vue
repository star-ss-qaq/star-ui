<template>
	<div :class="['star-ui', 'star-ui-tree-item']">
		<div :class="[
			'star-ui-tree-item-label',
			'star-ui-size-'+size,
			{
				'star-ui-tree-current':(currentValue!=undefined&&currentValue==valueData) || item == current
			}
		]" @click="handleClick">
			<div v-for="n in deep" :key="n" class="star-ui-tree-deep-nbsp"></div>
			<span :class="[
				'star-ui-tree-expand-button',
				'star-ui-icon-font',
				childrenData.length>0?(isExpand?'star-ui-icon-arrow-down':'star-ui-icon-arrow-right'):''
			]" @click="isExpand=!isExpand"></span>
			{{labelData}}
		</div>
		<div v-if="isExpand">
			<tree-item v-for="(item, index) in childrenData" :key="index" :size="size" :deep="deep+1" :item="item" :label="label" :value="value" :children="children" :current="current" current-value="currentValue" @node-click="haandleChildNodeClick"></tree-item>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop } from "@ui-root/reg";
import treeItem from "./tree-item.vue" 


import "../../global-style.css";

@Register({
	name:"su-tree-item",
	components:{
		treeItem
	},
	internalOnly: true,
})
export default class SuTreeItem extends Vue {
	readonly isExpand=false;
	@Prop({
		type:Number,
		default:()=>{
			return 0;
		}
	})
	readonly deep!:number;
	@Prop({
		type:String,
		default:()=>{
			return "medium"
		}
	})
	readonly size!:string;
	@Prop({
		type:Object,
		default:()=>{
			return {}
		}
	})
	readonly item!:Record<string, unknown>;
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
		type:Object,
		default:()=>{
			return {}
		}
	})
	readonly current!:Record<string, unknown>;
	@Prop({
		type:[String,Number],
		default:()=>{
			return undefined
		}
	})
	readonly currentValue!:string|number|undefined;

	get labelData():string{
		if(typeof this.label == "string"){
			return (this.item[this.label]||"") as string;
		}
		return this.label(this.item);
	}
	get valueData():string|number|undefined{
		if(typeof this.value == "string"){
			return (this.item[this.value]||"") as string|number|undefined;
		}
		return this.value(this.item);
	}
	get childrenData():Record<string, unknown>[]{
		if(typeof this.children == "string"){
			return (this.item[this.children]||[]) as Record<string, unknown>[];
		}
		return this.children(this.item);
	}
	private handleClick(ev:MouseEvent):void{
		var classList = (ev.target as HTMLElement).className.split(" ");
		if(classList.indexOf("star-ui-icon-arrow-down")!=-1 || classList.indexOf("star-ui-icon-arrow-right")!=-1){
			return;
		}
		this.$emit("node-click",this.item,this.valueData,this);
	}
	haandleChildNodeClick(item:Record<string, unknown>,value:string|number|undefined,node:Record<string, unknown>):void{
		this.$emit("node-click",item,value,node);
	}
}
</script>

<style>
.star-ui-tree-item-label{
	cursor: pointer;
}
.star-ui-tree-highlight-current .star-ui-tree-current{
	background: var(--star-ui-base-color);
    color: var(--star-ui-backgorund-color);
}
.star-ui-tree-deep-nbsp{
	display: inline-block;
	height: 100%;
	width: var(--star-ui-input-medium-font-size);
}
.star-ui-size-mini .star-ui-tree-deep-nbsp{
	width: var(--star-ui-input-mini-font-size);
}
.star-ui-tree-expand-button{
	font-size: inherit;
}
.star-ui-tree-expand-button{
	width: var(--star-ui-input-medium-font-size);
	height: 100%;
	display: inline-block;
	cursor: pointer;
}
.star-ui-size-mini .star-ui-tree-expand-button{
	width: var(--star-ui-input-mini-font-size);
}
</style>
