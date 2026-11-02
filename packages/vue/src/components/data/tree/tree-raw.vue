<template>
	<div
		:class="[
			'star-ui',
			'su-tree',
			'star-ui-tree',
			{
				'star-ui-tree-highlight-current': highlightCurrent,
			},
		]"
	>
		<tree-item
			v-for="(item, index) in tree"
			:key="item.itemKey"
			:size="size"
			:item="item"
			:current-key="currentKey"
			:expendKey="expendKeySet"
			:label-render="labelRender"
			:should-item-show="shouldItemShow"
			:show-checkbox="showCheckbox"
			@expend="handleExpend"
			@check="handleCheck"
			@item-click="handleItemClick"
		>
		</tree-item>
	</div>
</template>
<script setup lang="ts" generic="T">
import { computed } from "vue";
import { Size } from "../../../types";
import TreeItem from "./tree-item.vue";
import { TreeCheckboxMode, Tree } from "./type";

const expendKey = defineModel<(string | number)[]>("expend-key");
const expendKeySet = computed(() => new Set(expendKey.value));

const {
	tree,
	size,
	highlightCurrent,
	labelRender,
	showCheckboxMode = "default",
	itemHandle = "expend",
} = defineProps<{
	tree: Tree<T>[];
	size: Size;
	highlightCurrent?: boolean;
	currentKey?: Tree<T>["itemKey"];
	labelRender: (item: Tree<T>) => any;
	shouldItemShow?: (item: Tree<T>) => boolean;
	showCheckbox?: boolean;
	showCheckboxMode?: TreeCheckboxMode;
	itemHandle?: "expend" | "none" | "check";
}>();

const emit = defineEmits<{
	(ev: "item-click", item: Tree<T>): void;
	(ev: "expend", expend: boolean, item: Tree<T>): void;
	(
		ev: "check-change",
		changed: { add: Set<Tree<T>>; remove: Set<Tree<T>> },
	): void;
}>();

function handleExpend(context: Tree<T>) {
	const isExpend = expendKeySet.value.has(context.itemKey);
	if (isExpend) {
		expendKey.value = expendKey.value!.filter((i) => i !== context.itemKey);
	} else {
		expendKey.value = [...(expendKey.value || []), context.itemKey];
	}
	emit("expend", !isExpend, context);
}
function handleCheck(item: Tree<T>) {
	const add = new Set<Tree<T>>();
	const remove = new Set<Tree<T>>();

	const newValue = !item.checked.value;
	switch (showCheckboxMode) {
		case "default":
			if (newValue) {
				let head = item;
				while (
					head.parent &&
					head.parent.children!.every(
						(i) => i === head || i.checked.value === newValue,
					)
				) {
					head = head.parent;
				}

				function removeAllChild(item: Tree<T>) {
					if (!item.checked && !item.indeterminate) return;
					item.children?.forEach((i) => {
						if (i.selfChecked) remove.add(i);
						removeAllChild(i);
					});
				}
				removeAllChild(head);
				add.add(head);
			} else {
				let p = item;
				while (p.checked.value) {
					if (p.selfChecked.value) remove.add(p);
					if (!p.parent) break;
					p.parent.children!.forEach((i) => {
						if (i !== p && !p.selfChecked.value) add.add(i);
					});
					p = p.parent;
				}
			}
			break;
		case "leafOnly":
			const to = newValue ? add : remove;
			function addForSubTree(item: Tree<T>) {
				if (item.checked.value === newValue) return;
				if (!item.children) to.add(item);
				item.children?.forEach((i) => {
					addForSubTree(i);
				});
			}
			addForSubTree(item);
			break;
		case "raw":
			(newValue ? add : remove).add(item);
			break;
	}
	emit("check-change", { add, remove });
}
function handleItemClick(item: Tree<T>) {
	switch (itemHandle) {
		case "check":
			handleCheck(item);
			break;
		case "expend":
			handleExpend(item);
			break;
	}
	emit("item-click", item);
}
</script>

<style>
.star-ui-tree-highlight-current .star-ui-tree-current {
	background-color: var(--star-ui-primary-color);
}
</style>
