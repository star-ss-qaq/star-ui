<template>
	<div
		v-if="!shouldItemShow || shouldItemShow(item)"
		:class="['star-ui', 'star-ui-tree-item']"
	>
		<div
			:class="[
				'star-ui-tree-item-label',
				'star-ui-size-' + size,
				{
					'star-ui-tree-current': currentKey === item.itemKey,
				},
			]"
			@click="handleClick"
		>
			<span
				:class="[
					'star-ui-tree-expand-button',
					item.children?.length
						? expendKey?.has(item.itemKey)
							? 'expend'
							: 'not-expend'
						: 'no-child',
				]"
				@click.stop="handleExpend"
			>
				<IconArrowRight v-if="item.children?.length" class="star-ui-icon" />
			</span>
			<CheckBox
				v-if="showCheckbox"
				:model-value="item.checked.value"
				:indeterminate="item.indeterminate.value"
				:size="size"
				class="star-ui-tree--checkbox"
				@update:model-value=""
				@mousedown.prevent.stop="emit('check', item)"
			/>
			<div>
				<component :is="labelRender" v-bind="item" />
			</div>
		</div>
		<div class="star-ui-tree-item-child" v-if="expendKey.has(item.itemKey)">
			<tree-item
				v-for="subItem in item.children"
				:key="subItem.itemKey"
				v-bind="$props"
				:item="subItem"
				@expend="(...prop) => emit('expend', ...prop)"
				@check="(...prop) => emit('check', ...prop)"
				@item-click="(...prop) => emit('item-click', ...prop)"
			>
			</tree-item>
		</div>
	</div>
</template>
<script setup lang="ts" generic="T = any">
import { Size } from "../../../types";
import { Tree } from "./type";
import { IconArrowRight } from "../../../icons";
import { CheckBox } from "../../form";

const { item, size, currentKey, expendKey, labelRender, showCheckbox } =
	defineProps<{
		item: Tree<T>;
		size: Size;
		currentKey?: string | number;
		expendKey: Set<string | number>;
		labelRender: (item: Tree<T>) => any;
		shouldItemShow?: (item: Tree<T>) => boolean;
		showCheckbox?: boolean;
	}>();

const emit = defineEmits<{
	(ev: "item-click", item: Tree<T>): void;
	(ev: "expend", item: Tree<T>): void;
	(ev: "check", item: Tree<T>): void;
}>();
function handleClick() {
	emit("item-click", item);
}
function handleExpend() {
	emit("expend", item);
}
</script>

<style>
.star-ui-tree-item-label {
	display: flex;
	flex-direction: row;
}
.star-ui-tree-item-label > div {
	cursor: pointer;
	flex: 1 1 0;
}
.star-ui-tree-item-child {
	margin-left: 1em;
}

.star-ui-tree-expand-button {
	font-size: inherit;
	transition: all 0.2s;
	width: 1em;
	height: 100%;
	display: inline-block;
	cursor: pointer;
	transform: rotate(0deg);
}
.star-ui-tree-expand-button.expend {
	transform: rotate(90deg);
}
.star-ui-tree-expand-button.no-child {
	opacity: 0;
	cursor: initial;
	pointer-events: none;
}
.star-ui-tree--checkbox {
	padding: 0;
	margin-right: 0.2em;
}
</style>
