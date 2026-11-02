<template>
	<TreeRaw
		:tree="tree.tree"
		:size="size"
		:current-key="currentKey"
		:highlight-current="highlightCurrent"
		:label-render="labelRender"
		:show-checkbox="showCheckbox"
		:should-item-show="shouldItemShow"
		v-model:expend-key="expendKey"
		@item-click="handleChildNodeClick"
		@expend="(expend, context) => emit('expend', expend, context.item)"
	/>
</template>

<script setup lang="ts" generic="T">
import { computed } from "vue";
import { TreeItemContextWithKey, TreeProp } from "./type";
import { getTreeLabelRender, toTree } from "./utils.js";
import TreeRaw from "./tree-raw.vue";

const {
	size = "medium",
	treeData,
	itemKey,
	label,
	highlightCurrent,
	children,
	shouldItemShow,
	showCheckbox,
	showCheckboxMode = "default",
} = defineProps<TreeProp<T>>();

const currentKey = defineModel<string | number>("current-key");
const expendKey = defineModel<(string | number)[]>("expend-key");
const checkedKey = defineModel<(string | number)[]>("checked-key");
const checkedKeySet = computed(() => new Set(checkedKey.value));
const slot = defineSlots<{ default(props: TreeItemContextWithKey<T>): any }>();
const labelRender = computed(
	() => (item) => (slot.default || getTreeLabelRender(label))(item),
);
const tree = computed(() => {
	return toTree(treeData, itemKey, children, showCheckboxMode, (item) =>
		checkedKeySet.value.has(item.itemKey),
	);
});

const emit = defineEmits<{
	(ev: "item-click", context: TreeItemContextWithKey<T>): void;
	(ev: "expend", expend: boolean, item: T): void;
}>();

function handleChildNodeClick(context: TreeItemContextWithKey<T>) {
	currentKey.value = context.itemKey;
	emit("item-click", context);
}
</script>
