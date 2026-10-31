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
			v-for="(item, index) in treeData"
			:key="keyFn(item, { item, index, items: [item], indexes: [index] })"
			:size="size"
			:item="item"
			:index="index"
			:item-key-fn="keyFn"
			:children-fn="childrenFn"
			:current-key="currentKey"
			:expendKey="expendKeySet"
			:label-render="labelRender"
			:should-item-show="shouldItemShow"
			@expend="handleExpend"
			@item-click="handleChildNodeClick"
		>
			<template #default="prop">
				<slot v-if="$slots.default" v-bind="prop"></slot>
				<template v-else>
					{{ (prop.item as any)[label || "label"] }}
				</template>
			</template>
		</tree-item>
	</div>
</template>

<script setup lang="ts" generic="T">
import { computed } from "vue";
import treeItem from "./tree-item.vue";
import { TreeItemContextWithKey, TreeProp } from "./type";
import { getTreeLabelRender, getTreeKeyFn } from "./utils.js";

const {
	size = "medium",
	treeData,
	itemKey,
	label,
	highlightCurrent,
	children,
	shouldItemShow,
} = defineProps<TreeProp<T>>();

const keyFn = computed(() => getTreeKeyFn(itemKey));
const currentKey = defineModel<string | number>("current-key");
const labelRender = computed(() => getTreeLabelRender(label));
const childrenFn = computed(() => {
	switch (typeof children) {
		case "function":
			return children;
		case "string":
			return (item) => item[children] as T[];
	}
	return (item) => (item as any)?.children as T[] | undefined;
});
const expendKey = defineModel<(string | number)[]>("expend-key");
const expendKeySet = computed(() => new Set(expendKey.value));

const emit = defineEmits<{
	(ev: "item-click", context: TreeItemContextWithKey<T>): void;
	(ev: "expend", expend: boolean, context: TreeItemContextWithKey<T>);
}>();
function handleExpend(context: TreeItemContextWithKey<T>) {
	const isExpend = expendKeySet.value.has(context.itemKey);
	if (isExpend) {
		expendKey.value = expendKey.value!.filter((i) => i !== context.itemKey);
	} else {
		expendKey.value = [...(expendKey.value || []), context.itemKey];
	}
	emit("expend", !isExpend, context);
}
function handleChildNodeClick(context: TreeItemContextWithKey<T>) {
	currentKey.value = context.itemKey;
	emit("item-click", context);
}
</script>

<style>
.star-ui-tree-highlight-current .star-ui-tree-current {
	background-color: var(--star-ui-primary-color);
}
</style>
