<template>
	<div :class="['star-ui','su-slider','star-ui-size-'+size,{'su-slider-moving':isHover}]">
		<div ref="bar" class="su-slider--inner-runway" @click="handleBarClick">
			<div class="su-slider--inner-button-wrapper" :style="{left:positionLeft+'%'}" @mousedown="handleMouseDown" @touchstart="handleTouchStart"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop, Emit } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-slider"
})
export default class SuSlider extends Vue {
	declare $refs:{
		bar:HTMLDivElement
	};
	private refBar:HTMLDivElement|null=null;

	mounted():void{
		this.refBar=this.$refs.bar;
	}
	beforeUnmount():void{
		this.removeEvent;
	}

	@Prop({
		type:String,
		default:"medium"
	})
	public readonly size!:string;

	@Prop({
		type:Number,
		default:0
	})
	readonly modelValue!:number;

	@Prop({
		type:Number,
		default:0
	})
	public readonly min!:number;

	@Prop({
		type:Number,
		default:100
	})
	public readonly max!:number;

	@Prop({
		type:Number,
		default:0
	})
	public readonly setp!:number;

	private moveStartValue=0;
	private get displayValue():number{
		let res=this.modelValue;
		if(this.refBar && this.dx){
			res=this.moveStartValue+this.dx/this.refBar.clientWidth*(this.max-this.min);
		}
		if(this.setp&&this.setp>0){
			res= Math.round((res-this.min)/this.setp)*this.setp;
		}
		if(res>this.max) res=this.max;
		else if(res<this.min) res=this.min;
		return res;
	}
	private get positionLeft():number{
		return (this.displayValue-this.min)*100/(this.max-this.min);
	}
	@Emit("update:modelValue")
	private updateEvent(value:number):number{
		return value;
	}

	private handleBarClick(ev:MouseEvent){
		if(ev.target&&ev.target==this.refBar){
			let res=this.min+ev.offsetX/this.refBar.clientWidth*(this.max-this.min);
			if(this.setp&&this.setp>0){
				res=Math.round((res-this.min)/this.setp)*this.setp;
			}
			this.updateEvent(res);
		}
	}

	private dx=0;
	private isHover=false;

	private handleMouseDown():void{
		window.addEventListener("mousemove",this.handleMouseMove);
		window.addEventListener("mouseup",this.handleMouseUp);
		window.addEventListener("blur",this.handleMouseUp);
		this.moveStartValue=this.modelValue;
		this.isHover=true;
	}
	private touchstartPoint:Touch|null=null;
	private handleTouchStart(ev:TouchEvent):void{
		window.addEventListener("touchmove",this.handleTouchMove,{ passive: false });
		window.addEventListener("touchend",this.handleMouseUp,{ passive: false });
		window.addEventListener("blur",this.handleMouseUp);
		this.touchstartPoint=ev.changedTouches[0];
		this.moveStartValue=this.modelValue;
		this.isHover=true;
	}
	private removeEvent():void{
		window.removeEventListener("mousemove",this.handleMouseMove);
		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("touchmove",this.handleTouchMove);
		window.removeEventListener("touchend",this.handleMouseUp);
		window.removeEventListener("blur",this.handleMouseUp);
	}
	private handleMouseMove(ev:MouseEvent):void{
		this.dx+=ev.movementX;
		this.updateEvent(this.displayValue);
	}
	private handleTouchMove(ev:TouchEvent):void{
		if(!this.touchstartPoint) return;
		ev.preventDefault();
		for(let i=0;i<ev.changedTouches.length;i++){
			if(ev.changedTouches[i].identifier==this.touchstartPoint.identifier){
				this.dx=ev.changedTouches[i].pageX-this.touchstartPoint.pageX;
				this.updateEvent(this.displayValue);
				break;
			}
		}
		// this.dx+=ev.movementX;
	}
	private handleMouseUp():void{
		this.updateEvent(this.displayValue);
		this.dx=0;
		this.removeEvent();
		this.isHover=false;

	}
}
</script>

<style>
.su-slider{
	padding: calc(var(--star-ui-input-medium-font-size) );
	user-select: none;
}
.su-slider--inner-runway{
	height: 4px;
	background-color: var(--star-ui-input-border-color);
	cursor: pointer;
}
.su-slider--inner-button-wrapper{
	width: var(--star-ui-input-medium-font-size);
	height: var(--star-ui-input-medium-font-size);
	border-radius: 50%;
	border: 1px solid var(--star-ui-base-color);
	display: inline-block;
	position: relative;
	margin-left: calc(2px - var(--star-ui-input-medium-font-size) / 2);
	top: calc(2px - var(--star-ui-input-medium-font-size) / 2);
	cursor: pointer;
	background-color: var(--star-ui-backgorund-color);
	background-image: radial-gradient(var(--star-ui-backgorund-color) 20%, var(--star-ui-base-color));
}
.su-slider .su-slider--inner-button-wrapper:hover,.su-slider.su-slider-moving .su-slider--inner-button-wrapper{
	/*background-color: var(--star-ui-base-color);*/
	background-image: radial-gradient(var(--star-ui-backgorund-color) 10%, var(--star-ui-base-color) 90%);
	transform: scale(1.2,1.2);
}
</style>
