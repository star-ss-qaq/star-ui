<template>
	<teleport to="body" v-if="locVisable">
		<div class="star-ui-modal--mask">
			<div class="star-ui star-ui-modal su-modal">
				<div class="star-ui-modal--header">
					<div class="star-ui-modal--title">
						<slot name="title" />
						{{title}}
					</div>
					<i class="star-ui-icon-font star-ui-icon-close" @click="close"/>
				</div>
				<div class="star-ui-modal--body">
					<slot />
				</div>
				<div class="star-ui-modal--footer">
					<slot name="footer" />
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop, Emit } from "@ui-root/reg";
import "@ui-root/global-style.css";
import { SuViewCtrlInjectIsMobile } from '@ui-root/outher';

@Register({
	name:"su-modal",
	watch: {
		visible(v){
			console.log(v)
			if (typeof v !== 'undefined') {
				this.locVisable = v;
			}
		},
	},
})
export default class SuModalConfirm extends Vue {
	@Prop({
		type: Boolean,
		default: undefined
	})
	private readonly visible!:boolean|undefined;
	private locVisable = false;
	@Emit('update:visable')
	private updateVisable(visable:boolean):boolean{
		return visable;
	}
	@Emit()
	public close():void{
		if(typeof this.visible === 'undefined'){
			this.locVisable = false;
		}
		this.updateVisable(false);
	}
	public show():void{
		if(typeof this.visible === 'undefined'){
			this.locVisable = true;
		}
		this.updateVisable(true);
	}
	@Prop({
		type: String,
	})
	private readonly title!:string|undefined;
	created():void{
		if (typeof this.visible !== 'undefined') {
			this.locVisable = this.visible;
		}
	}
	@SuViewCtrlInjectIsMobile readonly isMobile!: boolean;
}
</script>

<style>
.star-ui-modal{
	background-color: var(--star-ui-backgorund-color);
	border-radius: var(--star-ui-border-radius);
}
.star-ui-modal--mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--star-ui-mask-color);
}
.star-ui-modal--header,
.star-ui-modal--body,
.star-ui-modal--footer{
	padding: var(--star-ui-default-padding);
}
.star-ui-modal--header{
	display: flex;
	flex-direction: row;
}
.star-ui-modal--title{
	flex: 1 1 0;
	overflow: hidden;
}
.star-ui-modal--header>i{
	flex: 0 0 auto;
	cursor: pointer;
}
</style>
