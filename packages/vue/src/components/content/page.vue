<template>
	<div class="star-ui su-page">
		<header class="su-ui su-page--header">
			<span v-if="isMobile" class="star-ui-icon-font star-ui-icon-menu su-page--mobile-menu-open"  @click="isOpenMenu=true" />
			<h1 v-if="title">{{title}}</h1>
			<img v-if="logo" :src="logo" alt="logo" />
			<slot name="header"></slot>
			<div v-if="!isMobile" class="su-page--menu-box">
				<su-menu :menu="menu" direction="h">
					<template v-if="$slots['menu']" v-slot="item">
						<slot name="menu" v-bind="item" />
					</template>
					<template v-else-if="$slots['menu-text']" v-slot:menu-text="item">
						<slot name="text" v-bind="item" />
					</template>
				</su-menu>
			</div>
		</header>
		<main class="su-ui su-page--main">
			<slot></slot>
		</main>
		<div v-if="isMobile" :class="['su-ui', 'su-page--mobile-menu-box', isOpenMenu ? 'su-page--mobile-menu-box-open' : 'su-page--mobile-menu-close']" @click="isOpenMenu=false">
			<su-menu :menu="menu" direction="v" @click.stop>
				<template v-if="$slots['menu']" v-slot="item">
					<slot name="menu" v-bind="item" />
				</template>
				<template v-else-if="$slots['menu-text']" v-slot:menu-text="item">
					<slot name="text" v-bind="item" />
				</template>
			</su-menu>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Register } from "@ui-root/reg";
import { SuViewCtrlInjectIsMobile } from "@ui-root/outher";
import { SuMenu } from "@ui-root/main";
import { MenuItem } from "@ui-root/types";
import "@ui-root/global-style.css";

@Register({
	name:"su-page",
	components: {
		SuMenu,
	}
})
export default class SuMain extends Vue {
	@SuViewCtrlInjectIsMobile readonly isMobile!:boolean;
	@Prop({
		type: String,
		default: '',
	})
	private title!:string;
	@Prop({
		type: String,
		default: '',
	})
	private logo!:string;
	@Prop({
		type: Array,
		default: '',
	})
	private menu!:MenuItem[];
	private isOpenMenu = false;
}
</script>

<style>
.su-page{
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.su-page--header{
	display: flex;
	flex-direction: row;
	background: #000;
	color: #e6eaf0;
	align-items: center;
}
.su-page--header>h1{
	font-size: 20px;
	line-height: 22px;
	padding: 0 20px;
}
.su-page--menu-box{
	flex: 1;
	height: 100%;
	z-index: 999999;
}
.su-page--menu-box .star-ui-menu-h--chlild-box{
	color: var(--star-ui-font-color);
}
.su-page--menu-box .su-menu{
	height: 100%;
}
.su-page--mobile-menu-open{
  margin-left: 15px;
  font-size: 20px;
}
.su-page--mobile-menu-box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 0.5s;
	background-color: rgba(128, 128, 128, 0.5);
}
.su-page--mobile-menu-close{
	pointer-events: none;
	opacity: 0;
}
.su-page--mobile-menu-box .star-ui-menu-v{
	margin-left: 0;
	transition: margin-left 0.5s;
	background-color: var(--star-ui-backgorund-color);
	width: 80%;
	height: 100%;
	border-right: solid 1px var(--star-ui-line-color);
}
.su-page--mobile-menu-close .star-ui-menu-v{
	margin-left: -100%;
}
.su-page--main{
	overflow: auto;
	flex: 1;
}
</style>
