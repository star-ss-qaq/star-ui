<template>
	<div :class="['star-ui', className]">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

import { Register, Prop } from "@ui-root/reg";
import { SuViewCtrlInjectKeyClassName, SuViewCtrlInjectKeyIsMobile } from "@ui-root/outher";
import { Provide } from "vue-property-decorator";
import "../global-style.css";

type DeviceType='auto'|'mobile'|'pc';


@Register({
	name:"su-view-control",
})
export default class SuViewControl extends Vue {
	mounted():void{
		this.$el._vue = this;
	}
	@Prop({
		type: String,
		default: "auto",
		validator: function(value:string) {
			return ['mobile', 'pc', 'auto'].indexOf(value) !== -1
		}
	})
	deviceType!:DeviceType;
	@Prop({
		type: String,
		default: "ua",
		validator: function(value:string) {
			return ['ua','screen-width'].indexOf(value) !== -1
		}
	})
	checkFunction!:'ua'|'screen-width';
	private windowWidth = 0;
	private windowHeight = 0;
	public checkWindowSize():void{
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
	}
	@Provide({to:SuViewCtrlInjectKeyIsMobile,reactive:true})
	public get $isMobile():boolean{
		switch (this.deviceType) {
			case "mobile":
				return true;
			case "pc":
				return false;
		}
		switch (this.checkFunction) {
			case "ua":
				return navigator.userAgent.toLowerCase().indexOf("mobile")!=-1;
			case "screen-width":
				return this.windowWidth < 1000;
		}
		return false;
	}
	@Provide({to:SuViewCtrlInjectKeyClassName,reactive:true})
	public get className():string[]{
		return [
			'su-view-control',
			'star-ui-view-control',
			`star-ui-view-control-${this.$isMobile?'mobile':'pc'}`,
			`su-view-control-${this.$isMobile?'mobile':'pc'}`
		];
	}
	beforeMount(){
		this.checkWindowSize();
		window.addEventListener("resize", this.checkWindowSize);
	}
	beforeUnmount(){
		window.removeEventListener("resize", this.checkWindowSize);
	}
}
</script>

<style>
</style>
