<template>
	<div :class="`star-ui su-form-item star-ui-form-item star-ui-col-${col} star-ui-form--label-align-${labelAlign||pLabelAlign}`">
		<div ref="labelDiv" class="start-ui star-ui-container star-ui-form-item--label" :style="labelStyle">
			{{label}}
			<slot name="label"></slot>
		</div>
		<div class="start-ui star-ui-container star-ui-form-item--content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Inject } from "vue-property-decorator";
import { Register, Prop } from "@ui-root/reg";
import { TypeFormLabelAlign } from "@ui-root/outher";
import { Bus } from "./form.vue";

import "@ui-root/global-style.css";

export const InjectLabelWidth = Symbol('InjectLabelWidth');
export const InjectLabelAlign = Symbol('InjectLabelAlign');
export const InjectEventBus = Symbol('InjectEventBus');

@Register({
	name:"su-form-item",
	hideInDoc:true,
	watch:{
		label(this:SuButton){
			this.bus&&this.bus.labelUpdate(this);
		}
	}
})
export default class SuButton extends Vue {
	declare $refs: {
		labelDiv: HTMLDivElement
	};
	@Prop({
		type:String,
		default:()=>{
			return 'label';
		}
	})
	readonly label!:string;
	@Prop({
		type:[String, Number],
	})
	readonly labelWidth!:string|number|undefined;
	@Inject({from:InjectLabelWidth,default:undefined})
	readonly pLabelWidth!:string|number|undefined;
	@Prop({
		autoType: "FormLabelAlign",
	})
	readonly labelAlign!:TypeFormLabelAlign;
	@Inject({from:InjectLabelAlign,default:"right"})
	readonly pLabelAlign!:TypeFormLabelAlign;
	@Prop({
		type:Number,
		default:()=>{
			return 24;
		}
	})
	readonly col!:number;
	private get labelStyle():Record<string, unknown>{
		const ret:Record<string, unknown>={};
		const labelWidth = this.labelWidth || this.pLabelWidth;
		if(labelWidth){
			ret.width=typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
		}
		return ret;
	}
	@Inject({from:InjectEventBus})
	readonly bus!:Bus|undefined;
	created(){
		if(this.bus){
			this.bus.addItem(this);
		}
	}
	beforeUnmount(){
		if(this.bus){
			this.bus.removeItem(this);
		}
	}
}
</script>

<style>
.star-ui-form-item{
	display: flex;
	flex-direction: row;
	align-items: center;
	overflow: hidden;
}
.star-ui-form-item--label{
	overflow: hidden;
	box-sizing: border-box;
}
.star-ui-form-item--content{
	flex: 1;
}
.star-ui-form-item--content>.star-ui-select,.star-ui-form-item--content>.star-ui-input{
	width: 100%;
}

.star-ui-form--label-align-left .star-ui-form-item--label, .star-ui-form--label-align-top .star-ui-form-item--label{
	text-align: left;
}
.star-ui-form--label-align-right .star-ui-form-item--label{
	text-align: right;
}
.star-ui-form-item.star-ui-form--label-align-top{
	flex-direction: column;
	align-items: stretch;
}
</style>
