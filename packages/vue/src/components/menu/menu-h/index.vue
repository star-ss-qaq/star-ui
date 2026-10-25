<template>
	<div :class="['star-ui', 'star-ui-menu', 'star-ui-menu-h']">
		<su-h-menu-item
			v-for="item in menu"
			:key="item.path"
			:item="item"
			childDirection="bottom"
		>
			<template v-slot="data">
				<div class="star-ui star-ui-menu--item star-ui-menu-h--item">
					<slot v-bind="data" />
				</div>
			</template>
		</su-h-menu-item>
	</div>
</template>
<script setup lang="ts">
import { MenuItem } from "../types";

const { menu } = defineProps<{ menu: MenuItem[] }>();
</script>
<style>
.star-ui-menu-h {
	display: flex;
	flex-direction: row;
	overflow: visible;
	position: relative;
	padding: 0;
	white-space: nowrap;
}
.star-ui-menu-h > .star-ui-menu-h--item-box > .star-ui-menu-h--item a {
	line-height: 2;
	border: solid 2px transparent;
	transition: border 0.5s;
	padding: 2px;
}
.star-ui-menu-h > .star-ui-menu-h--item-box:hover > .star-ui-menu-h--item a {
	border-bottom-color: var(--star-ui-base-color);
}
</style>
