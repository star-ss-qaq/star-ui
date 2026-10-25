<template>
	<teleport to="body">
		<div ref="root" :class="['star-ui-base-popper', ...ctrlClass]" :style="{visibility: visible ? '' : 'hidden', ...baseStyle, ...style}">
			<div class="star-ui-popper-background" v-if="isMobile" @click="$emit('out-click')"></div>
			<slot></slot>
		</div>
	</teleport>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { SuViewCtrlInjectClassName, SuViewCtrlInjectIsMobile } from "@ui-root/outher";
import { Emit, Prop, Register } from "@ui-root/reg";

import "../../global-style.css";
let nowId=0;

@Register({
	name:"su-base-popper",
	internalOnly:true,
	props: {
		fromItem:{
			type:Object
		},
		style:{
			type:Object,
			default:function(){return {};}
		},
		updateType:{
			type:String,
			default:"v-sync"
		},
		visible:{
			type:Boolean,
			default:false
		}
	},
	watch:{
		visible(){
			this._updateVisible();
		},
		isMobile(){
			if(this.syncRequestId)cancelAnimationFrame(this.syncRequestId);
			this.updatePos();
		}
	},
	// inject: ['$suControl']
})
export default class SuButton extends Vue {
	declare $refs: {
		root:HTMLDivElement;
	};
	@Prop({
		type:Object
	})
	fromItem!:Vue|HTMLElement;
	private div!:HTMLDivElement;
	private id!:string;
	private updateType!:string;
	private visible!:boolean;
	@SuViewCtrlInjectIsMobile readonly isMobile!:false;
	mounted():void{
		window.addEventListener("click",this._clickCheck);
		this._updateVisible();
	}
	beforeUnmount():void{
		window.removeEventListener("click",this._clickCheck);
	}
	@Emit("out-click", (res:boolean)=>res)
	_clickCheck(ev:MouseEvent):boolean{
		var dom=ev.target;
		while(dom&&dom!=document){
			if(dom==this.$refs.root||(this.fromItem&&dom==((this.fromItem instanceof HTMLElement)?this.fromItem:this.fromItem.$el))){
				return false;
			}
			dom=(dom as HTMLElement).parentElement;
		}
		return true;
	}
	private syncRequestId!:number;
	_updateVisible():void{
		if(this.visible){
			this.updatePos();
		}else{
			if(this.syncRequestId)cancelAnimationFrame(this.syncRequestId);
		}
	}
	@SuViewCtrlInjectClassName
	readonly ctrlClass!:string[];
	// eslint-disable-next-line
	private baseStyle:Record<string, any>={};
	updatePos():void{
		if(this.fromItem){
			this.baseStyle={};
			let dom=(this.fromItem instanceof HTMLElement)?this.fromItem:this.fromItem.$el;
			if(this.isMobile){
				this.baseStyle.bottom="0";
				this.baseStyle.left="0";
				this.baseStyle.width="100%";
			}else{
				const height=dom.clientHeight;
				let top=0,left=0;
				while(dom&&dom!=document){
					top+=dom.offsetTop-dom.scrollTop;
					left+=dom.offsetLeft-dom.scrollLeft;
					dom=dom.offsetParent;
				}
				top+=height;
				this.baseStyle.top=top+"px";
				this.baseStyle.left=left+"px";
				if(this.updateType=="v-sync"){
					this.syncRequestId=requestAnimationFrame(this.updatePos);
				}
			}
		}
	}
}
</script>

<style>
.star-ui-base-popper{
	position: fixed;
}
.star-ui-popper-background{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,0.5);
}
</style>
