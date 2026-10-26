<template>
	<div :class="['star-ui', 'star-ui-menu', 'star-ui-menu-v']">
		<div>
			<span @click="handlePathClick(0)"
				><IconHome class="star-ui-icon" />&gt;</span
			>
			<span
				v-for="(item, index) in path"
				:key="`${index}-${item.path || 'nopath'}`"
				@click="handlePathClick(index + 1)"
			>
				{{ item.title }}&gt;
			</span>
		</div>
		<div
			v-for="item in current"
			:key="item.path"
			@click="handleItemClick(item)"
		>
			<slot v-bind="item" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { MenuItem } from "../types";
import { IconHome } from "../../../../icons";
const { menu } = defineProps<{ menu: MenuItem[] }>();
const path = shallowRef<MenuItem[]>([]);
const current = computed(() => {
	if (path.value.length == 0) {
		return menu;
	}
	const item = path.value[path.value.length - 1];
	const res = [...(item.children || [])];
	if (item.path) {
		res.unshift(item);
	}
	return res;
});
function handlePathClick(index: number) {
	path.value = path.value.slice(0, index);
}
function handleItemClick(item: MenuItem) {
	if (
		item.children &&
		item.children.length > 0 &&
		(path.value.length == 0 || item != path.value[path.value.length - 1])
	) {
		path.value.push(item);
	}
}
</script>

<style></style>
