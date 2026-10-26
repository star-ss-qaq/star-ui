<template>
	<div class="star-ui su-page">
		<header class="su-ui su-page--header">
			<span
				v-if="isMobile"
				class="star-ui-icon-font star-ui-icon-menu su-page--mobile-menu-open"
				@click="isOpenMenu = true"
			>
				<IconMenu class="star-ui-icon" />
			</span>
			<slot name="header"></slot>
			<div v-if="!isMobile" class="su-page--menu-box">
				<Menu :menu="menu" direction="h">
					<template v-if="$slots['menu']" v-slot="item">
						<slot name="menu" v-bind="item" />
					</template>
					<template v-else-if="$slots['menu-text']" v-slot:menu-text="item">
						<slot name="text" v-bind="item" />
					</template>
				</Menu>
			</div>
		</header>
		<main class="su-ui su-page--main">
			<slot></slot>
		</main>
		<div
			v-if="isMobile"
			:class="[
				'su-ui',
				'su-page--mobile-menu-box',
				isOpenMenu
					? 'su-page--mobile-menu-box-open'
					: 'su-page--mobile-menu-close',
			]"
			@click="isOpenMenu = false"
		>
			<Menu :menu="menu" direction="v" @click.stop>
				<template v-if="$slots['menu']" v-slot="item">
					<slot name="menu" v-bind="item" />
				</template>
				<template v-else-if="$slots['menu-text']" v-slot:menu-text="item">
					<slot name="text" v-bind="item" />
				</template>
			</Menu>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useIsMobile } from "../../../context";
import { Menu, MenuItem } from "../../other";
import { IconMenu } from "../../../icons";
const { menu } = defineProps<{ menu: MenuItem[] }>();
const isMobile = useIsMobile();
const isOpenMenu = ref(false);
</script>
<style>
.su-page {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.su-page--header {
	display: flex;
	flex-direction: row;
	background: #000;
	color: #e6eaf0;
	align-items: center;
}
.su-page--header > h1 {
	font-size: 20px;
	line-height: 22px;
	padding: 0 20px;
}
.su-page--menu-box {
	flex: 1;
	height: 100%;
	z-index: 999999;
}
.su-page--menu-box .star-ui-menu-h--child-box {
	color: var(--star-ui-text-color-primary);
}
.su-page--menu-box .su-menu {
	height: 100%;
}
.su-page--mobile-menu-open {
	margin-left: 15px;
	font-size: 20px;
}
.su-page--mobile-menu-box {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 0.5s;
	background-color: rgba(128, 128, 128, 0.5);
}
.su-page--mobile-menu-close {
	pointer-events: none;
	opacity: 0;
}
.su-page--mobile-menu-box .star-ui-menu-v {
	margin-left: 0;
	transition: margin-left 0.5s;
	background-color: var(--star-ui-background-color-primary);
	width: 80%;
	height: 100%;
	border-right: solid 1px var(--star-ui-line-color);
}
.su-page--mobile-menu-close .star-ui-menu-v {
	margin-left: -100%;
}
.su-page--main {
	overflow: auto;
	flex: 1;
}
</style>
