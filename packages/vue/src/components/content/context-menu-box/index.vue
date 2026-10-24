<template>
	<div class="star-ui su-context-menu-box star-ui-context-menu-box" @contextmenu="handleContextMenu">
		<slot />
	</div>
	<teleport to="body" v-if="isOpenMenu">
		<div ref="mask" :class="['su-context-menu--mask', 'star-ui-context-menu--mask', ...ctrlClass]" @click="handleMaskClick">
			<component :is="component" class="su-context-menu star-ui-context-menu" :style="isMobile ? '' : `top: ${currentY}px; left: ${currentX}px;`" :menu="currentMenu" :itemComponent="itemComponent">
				<template v-slot="data">
					<div class="su-context-menu--item star-ui-context-menu--item" @click="handleItemClick(data)">
						<span class="star-ui-context-menu--text">{{data.title}}</span>
						<span v-if="!data.click">&gt;</span>
					</div>
				</template>
			</component>
		</div>
	</teleport>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Register } from "@ui-root/reg";
import { SuViewCtrlInjectClassName, SuViewCtrlInjectIsMobile } from "@ui-root/outher";
import MenuBox from "../menu/menu-h/menu-h-child.vue";
import MenuBoxMobile from "../menu/menu-v/index.vue";
import MenuItem from "../menu/menu-h/menu-h-item.vue";
import "@ui-root/global-style.css";
import { ContextMenuItem } from "@ui-root/types";

@Register({
	name:"su-context-menu-box",
	components: {
		MenuBox,
		MenuBoxMobile,
	}
})
export default class SuMain extends Vue {
	private itemComponent = MenuItem;
	declare $refs:{
		mask:HTMLDivElement,
	};
	@SuViewCtrlInjectIsMobile readonly isMobile!:boolean;
	@SuViewCtrlInjectClassName readonly ctrlClass!:string[];
	private get component(){
		if(this.isMobile){
			return MenuBoxMobile;
		}
		return MenuBox;
	}
	@Prop({
		type: [Array, Function],
		required: true,
	})
	private menu!:ContextMenuItem[] | ((ev: MouseEvent) => ContextMenuItem[]);
	private isOpenMenu = false;
	private currentMenu: ContextMenuItem[] = [];
	private currentX = 0;
	private currentY = 0;
	private handleContextMenu(ev: MouseEvent){
		// ev.stopPropagation();
		ev.preventDefault();
		if(typeof this.menu === 'function'){
			this.currentMenu = this.menu(ev) || [];
		}else{
			this.currentMenu = this.menu || [];
		}
		// this.currentMenu=[{title: 'aa', children: [ {title: 'aa.1', click: () => console.log('aa.1 click')} ]}, {title: 'bb', click: () => console.log('bb click')}];
		this.currentX=ev.clientX;
		this.currentY=ev.clientY;
		this.isOpenMenu = true;
	}
	handleMaskClick(ev: MouseEvent){
		if (ev.target === this.$refs.mask) {
			this.isOpenMenu = false;
		}
	}
	handleItemClick(item: ContextMenuItem){
		if (item.click) {
			this.isOpenMenu = false;
			item.click();
		}
	}
}
</script>

<style>
	.star-ui-context-menu--mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.star-ui-context-menu{
		position: absolute;
		opacity: 1;
	}
	.star-ui-context-menu--item{
		min-width: 100px;
		padding: var(--star-ui-default-padding);
		cursor: pointer;
		display: flex;
		flex-direction: row;
	}
	.star-ui-context-menu--text{
		flex: 1;
	}
	.star-ui-view-control-mobile.star-ui-context-menu--mask{
		background: var(--star-ui-mask-color);
	}
	.star-ui-view-control-mobile .star-ui-context-menu{
		width: 100%;
		background-color: var(--star-ui-backgorund-color);
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>