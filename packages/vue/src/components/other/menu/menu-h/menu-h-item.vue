<template>
	<div class="star-ui star-ui-menu--item-box star-ui-menu-h--item-box">
		<slot v-bind="item" />
		<div
			v-if="item.children?.length"
			:class="[
				'star-ui',
				'star-ui-menu--child-box',
				'star-ui-menu-h--child-box',
				`star-ui-menu-h--child-box-${childDirection}`,
			]"
		>
			<MenuHItem v-for="item in item.children" :key="item.path" :item="item">
				<template v-slot="item">
					<slot v-bind="item" />
				</template>
			</MenuHItem>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MenuItem } from "../types.js";

const { item, childDirection = "right" } = defineProps<{
	item: MenuItem;
	childDirection?: "right" | "bottom";
}>();
</script>
<style>
.star-ui-menu-h--item-box {
	height: 100%;
	overflow: visible;
	position: relative;
	padding: 0;
	transition: background-color 0.5s;
}
.star-ui-menu-h--item-box:hover {
	background-color: rgba(128, 128, 128, 0.4);
}
.star-ui-menu-h--item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 8px;
}

.star-ui-menu-h--child-box {
	position: absolute;
	background-color: var(--star-ui-background-color);
	opacity: 0;
	transition: opacity 0.5s;
	pointer-events: none;
}
*:hover > .star-ui-menu-h--child-box {
	display: block;
	opacity: 1;
	pointer-events: auto;
}
.star-ui-menu-h--child-box-right {
	left: 100%;
	top: 0;
}
.star-ui-menu-h--child-box-left {
	right: 100%;
	top: 0;
}
.star-ui-menu-h--child-box-bottom {
	left: 0;
	top: 100%;
}
.star-ui-menu-h--child-box {
	border: solid 1px var(--star-ui-line-color);
}
.star-ui-menu-h--child-box > .star-ui-menu-h--item-box > .star-ui-menu-h--item {
	border-bottom: solid 1px var(--star-ui-line-color);
}
.star-ui-menu-h--child-box
	> .star-ui-menu-h--item-box:last-child
	> .star-ui-menu-h--item {
	border-bottom-width: 0;
}
</style>
