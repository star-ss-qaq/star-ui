<template>
	<div :class="['star-ui', 'su-select','star-ui-select',{'is-focus':isFocused}]" @click="isFocused=!isFocused">
		<!-- 原生组件 -->
		<select :name="name" style="display: none"></select>
		<input v-if="false" type="text" :value="1" class="star-ui star-ui-select--inner">
		<!-- 内容显示 -->
		<div :class="['star-ui','star-ui-select--inner-content','star-ui-size-'+size]">{{this.showValue}}</div>
		<!-- 后缀 -->
		<div :class="['star-ui','start-ui-select--inner-suffix','star-ui-size-'+size]">
			<i class="star-ui-icon-font star-ui-icon-arrow-down"/>
		</div>
		<!-- 选项弹窗 -->
		<base-popper :from-item="$el" :visible="isFocused" @out-click="isFocused=false">
			<div :class="['star-ui','star-ui-select--pooper',pooperClass]" :style="{width:isMobile?'100%':(width+'px')}">
				<div class="star-ui star-ui-select--pooper-title" v-if="isMobile">请选择</div>
				<div :class="['star-ui','star-ui-select--pooper-item-list','star-ui-size-'+size]">

					<su-tree v-if="showAsTree" ref="tree" highlight-current :size="size" :treeData="options" :label="labelName" :value="valueName" :children="children" @node-click="haandleNodeClick"></su-tree>
					<div v-else v-for="item in valueMap" :key="item[0]" :class="['star-ui','star-ui-select--option','star-ui-size-'+size,'star-ui-container',{
						'star-ui-select--option-sel':item[0]==this.modelValue
					}]" @click="handleSelect(item[0])">{{item[1]}}</div>
				</div>
			</div>
		</base-popper>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import BasePopper from "./common/base-popper.vue";
import { Register, Emit, Prop } from "@ui-root/reg";
import { SuViewCtrlInjectIsMobile } from "@ui-root/outher";
import SuTree from "./tree/index.vue";


import "../global-style.css";

@Register({
	name:"su-select",
	components:{
		BasePopper,
		SuTree
	},
	watch:{
		isFocused(v){
			if(v){
				if(this.$el){
					if(this.$el.clientWidth){
						this.width=this.$el.clientWidth;
					}
				}
			}
		},
		modelValue(){
			this.updateTree();
		}
	}
})
export default class SuSelect extends Vue {
	mounted():void{
		this.updateTree();
	}
	declare $refs:{
		tree:SuTree
	};
	@Prop({
		type:[String,Number,Array],
		default:""
	})
	readonly modelValue!:string;
	@Prop({
		type:String,
		default:""
	})
	readonly name!:string;
	@Prop({
		type:String,
		default:"medium"
	})
	private size!:string;
	@Prop({
		type:Array,
		default:function(){return [];}
	})
	readonly options!:Record<string, unknown>[];
	@Prop({
		type:String,
		default:"value"
	})
	readonly valueName!:string;
	@Prop({
		type:String,
		default:"label"
	})
	readonly labelName!:string;
	@Prop({
		type:[String,Function],
		default:()=>{
			return "children"
		}
	})
	children!:string|((item:Record<string, unknown>)=>Record<string, unknown>[]);
	@Prop({
		type:Boolean,
		default:false
	})
	readonly showAsTree!:boolean;
	@Prop({
		type:String,
		default:""
	})
	readonly pooperClass!:string;
	isFocused=false;
	@SuViewCtrlInjectIsMobile readonly isMobile!: boolean;
	get valueMap():Map<string|number,string>{
		const map=new Map();
		if(this.showAsTree){
			let task:Record<string, unknown>[] = [];
			task.push(...this.options);
			while(task.length){
				const item = task.pop() as Record<string, unknown>;
				let itemValue:string|number|undefined;
				if(typeof this.valueName == "string"){
					itemValue = (item[this.valueName]) as string|number|undefined;
				// }else{
				// 	itemValue = this.value(this.current);
				}
				if(itemValue!=undefined){
					map.set(itemValue,(this.labelName in item)?item[this.labelName]:itemValue);
				}
				let children:Record<string, unknown>[]|undefined;
				if(typeof this.children == "string"){
					children = (item[this.children]) as Record<string, unknown>[]|undefined;
				}else{
					children = this.children(item);
				}
				children&&task.push(...children);
			}
		}else{
			this.options.map((item)=>{
				if(this.valueName in item){
					const value=item[this.valueName];
					const label=(this.labelName in item)?item[this.labelName]:value
					map.set(value,label);
				}
			});
		}
		return map;
	}
	get showValue():string{
		if(this.valueMap.has(this.modelValue)){
			return this.valueMap.get(this.modelValue) as string;
		}
		return this.modelValue;
	}
	private width=280;
	private updateTree(){
		if(this.modelValue&&this.showAsTree){
			this.$refs.tree.setCurrentByValue(this.modelValue);
		}
	}
	@Emit("update:modelValue")
	handleSelect(value:string):string{
		//this.$emit("update:modelValue",value);
		this.isFocused=false;
		return value;
	}
	@Emit("update:modelValue")
	haandleNodeClick(item:Record<string, unknown>,value:string|number|undefined):string|number|undefined{
		this.isFocused=false;
		this.$refs.tree.setCurrentByValue(this.modelValue);
		return value;
	}
}
</script>

<style>
/*基本样式*/
.star-ui-select{
	border: solid 1px var(--star-ui-input-border-color);
	border-radius: var(--star-ui-border-radius);
	display: inline-flex;
	flex-direction: row;
	width:var(--star-ui-input-default-width);
	cursor: pointer;
	color: var(--star-ui-regular-text-color);
	background: var(--star-ui-backgorund-color);
}
/*选中时样式*/
.star-ui-select:hover,.star-ui-select.is-focus{
	border: solid 1px var(--star-ui-base-color);
}
/*内容显示区域占用全部剩余空间*/
.star-ui-select--inner-content{
	flex:1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: left;
}
/*清除原生输入框的样式*/
.star-ui-select--inner,.star-ui-select--inner:hover,.star-ui-select--inner:active,.star-ui-select--inner:focus{
	border-width: 0px;
	outline: none;
	margin: 0;
	padding: 0;
}
/*弹出层样式*/
.star-ui-select--pooper{
	background: var(--star-ui-backgorund-color);
	border: solid 1px var(--star-ui-input-border-color);
	border-radius: var(--star-ui-border-radius);
	color: var(--star-ui-regular-text-color);
}
.star-ui-select--option{
	cursor: pointer;
}
/*选中选项样式*/
.star-ui-select--option-sel{
	background: var(--star-ui-base-color);
	color:var(--star-ui-backgorund-color);
}
/*选项的最大高度限制*/
.star-ui-select--pooper-item-list{
	overflow-x: hidden;
	overflow-y: auto;
	padding: 0;
}
.star-ui-select--pooper-item-list.star-ui-size-medium{
	max-height: calc(var(--star-ui-input-medium-font-size) * 15);
}
.star-ui-select--pooper-item-list.star-ui-size-mini{
	max-height: calc(var(--star-ui-input-mini-font-size) * 15);
}

/*移动样式*/
.star-ui-select--pooper-title{
	text-align: center;
	line-height: 2;
	font-weight: bold;
	padding: var(--star-ui-default-padding);
}
.star-ui-view-control-mobile .star-ui-select--pooper{
	width: 100%;
}
.star-ui-view-control.star-ui-view-control-mobile .star-ui-select--pooper{
	border-radius: 0;
	border-width: 0;
}
.star-ui-view-control.star-ui-view-control-mobile .star-ui-select--option{
	border-radius: 0;
	padding-left: 10px;
	border-left: 5px solid transparent;
	border-top: 1px solid var(--star-ui-input-border-color);
	line-height: 1.5;
}
.star-ui-view-control.star-ui-view-control-mobile .star-ui-select--option-sel{
	background: initial;
	color: var(--star-ui-base-color);
	border-left: 5px solid var(--star-ui-base-color);
}
.star-ui-view-control-mobile .star-ui-select--pooper-item-list.star-ui-size-medium{
	max-height: 50vh;
}
</style>
