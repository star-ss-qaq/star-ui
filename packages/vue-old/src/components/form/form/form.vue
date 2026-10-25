<template>
	<form :class="`star-ui su-form star-ui-form ${allowAotoMobile?'star-ui-form--auto-mobile':''}`">
		<slot></slot>
	</form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register, Prop } from "@ui-root/reg";
import type { TypeFormLabelAlign } from "@ui-root/outher";
import { Provide } from "vue-property-decorator";
import Item, { InjectEventBus, InjectLabelAlign, InjectLabelWidth } from "./form-item.vue";

import "@ui-root/global-style.css";

export interface Bus{
	addItem:(item:Item)=>void,
	removeItem:(item:Item)=>void,
	labelUpdate:(item:Item)=>void,
}

@Register({
	name:"su-form",
})
export default class SuButton extends Vue {
	@Prop({
		autoType: "FormLabelAlign",
		default:()=>{
			return "right"
		}
	})
	@Provide({to:InjectLabelAlign,reactive:true})
	readonly labelAlign!:TypeFormLabelAlign;
	@Prop({
		type: Number
	})
	readonly labelWidth!:number|undefined;
	@Prop({
		type: Boolean,
		default:()=>{
			return true
		}
	})
	readonly allowAotoMobile!:boolean;
	@Provide({to:InjectEventBus,reactive:true})
	private bus:Bus|undefined;
	private items=new Set<Item>();
	private addItem(item:Item):void{
		this.items.add(item);
		this.$nextTick(this.updateLabelWidth);
	}
	private removeItem(item:Item):void{
		this.items.delete(item);
		this.$nextTick(this.updateLabelWidth);
	}
	private updateLabelWidth(){
		if(!this.isLoaded) return;
		if(typeof this.labelWidth === 'undefined'){
			this.sendLabelWidth = undefined;
		}else if(this.labelWidth === 0){
			this.sendLabelWidth=undefined;
			this.$nextTick(() => {
				let maxWidth = 0;
				this.items.forEach((item => {
					if((item.labelAlign||this.labelAlign) === 'top'){
						return;
					}
					const width = item.$refs.labelDiv.offsetWidth;
					if(width>maxWidth){
						maxWidth=width;
					}
				}));
				this.sendLabelWidth=maxWidth;
			})
		}else{
			this.sendLabelWidth=this.labelWidth;
		}
	}
	private isLoaded=false;
	@Provide({to:InjectLabelWidth,reactive:true})
	private sendLabelWidth:number|undefined=0;
	created(){
		this.bus={
			addItem: this.addItem,
			removeItem: this.removeItem,
			labelUpdate: this.updateLabelWidth,
		}
	}
	mounted(){
		this.$nextTick(() => {
			this.isLoaded=true;
			this.updateLabelWidth();
		});
	}
	beforeUnmount(){
		this.isLoaded=false;
	}
}
</script>
<style>
.star-ui-form{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.star-ui-view-control.star-ui-view-control-mobile .star-ui-form--auto-mobile>.star-ui-form-item{
	width: 100%;
}
</style>
