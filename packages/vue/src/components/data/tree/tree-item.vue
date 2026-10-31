<template>
	<div
		v-if="
			!shouldItemShow ||
			shouldItemShow({
				item,
				index,
				itemKey: itemKey,
				items: items,
				indexes: indexes,
			})
		"
		:class="['star-ui', 'star-ui-tree-item']"
	>
		<div
			:class="[
				'star-ui-tree-item-label',
				'star-ui-size-' + size,
				{
					'star-ui-tree-current': currentKey === itemKey,
				},
			]"
		>
			<span
				:class="[
					'star-ui-tree-expand-button',
					children?.length
						? expendKey?.has(itemKey)
							? 'expend'
							: 'not-expend'
						: 'no-child',
				]"
				@click="handleExpend"
			>
				<IconArrowRight v-if="children?.length" class="star-ui-icon" />
			</span>
			<div @click="handleClick">
				<component
					:is="labelRender"
					:item="item"
					:index="index"
					:items="items"
					:indexes="indexes"
					:item-key="itemKey"
				/>
			</div>
		</div>
		<div class="star-ui-tree-item-child" v-if="expendKey.has(itemKey)">
			<tree-item
				v-for="(item, index) in children"
				:key="
					itemKeyFn(item, {
						item,
						index,
						items: items,
						indexes: indexes,
					})
				"
				v-bind="$props"
				:item="item"
				:index="index"
				:p-indexes="indexes"
				:p-items="items"
				@expend="(...prop) => emit('expend', ...prop)"
				@item-click="(...prop) => emit('item-click', ...prop)"
			>
				<template #="prop">
					<slot v-bind="prop"></slot>
				</template>
			</tree-item>
		</div>
	</div>
</template>
<script setup lang="ts" generic="T = any">
import { Size } from "../../../types";
import { computed } from "vue";
import { TreeItemContext, TreeItemContextWithKey } from "./type";
import { IconArrowRight } from "../../../icons";

const {
	item,
	index,
	size,
	itemKeyFn,
	childrenFn,
	currentKey,
	expendKey,
	pIndexes = [],
	pItems = [],
	labelRender,
} = defineProps<{
	item: T;
	index: number;
	size: Size;
	itemKeyFn: (item: T, context: TreeItemContext<T>) => string | number;
	childrenFn: (item: T) => T[] | undefined;
	currentKey?: string | number;
	expendKey: Set<string | number>;
	pIndexes?: number[];
	pItems?: T[];
	labelRender?: (context: TreeItemContextWithKey<T>) => any;
	shouldItemShow?: (context: TreeItemContextWithKey<T>) => boolean;
}>();
const indexes = computed(() => [...pIndexes, index]);
const items = computed(() => [...pItems, item]);
const itemKey = computed(() =>
	itemKeyFn(item, {
		item,
		index,
		items: items.value,
		indexes: indexes.value,
	}),
);
const children = computed(() => childrenFn(item));
const emit = defineEmits<{
	(ev: "item-click", context: TreeItemContextWithKey<T>): void;
	(ev: "expend", context: TreeItemContextWithKey<T>): void;
}>();
function handleClick() {
	emit("item-click", {
		item,
		index,
		itemKey: itemKey.value,
		items: items.value,
		indexes: indexes.value,
	});
}
function handleExpend() {
	emit("expend", {
		item,
		index,
		itemKey: itemKey.value,
		items: items.value,
		indexes: indexes.value,
	});
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
</style>
