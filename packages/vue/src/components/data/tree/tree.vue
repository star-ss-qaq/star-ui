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
			:key="keyFn(item, [item], [index])"
			:size="size"
			:item="item"
			:index="index"
			:item-key-fn="keyFn"
			:children-fn="childrenFn"
			:current-key="currentKey"
			:expendKey="expendKeySet"
			@expend="handleExpend"
			@item-click="handleChildNodeClick"
		>
			<template #default="prop">
				<slot v-if="$slots.default" v-bind="prop"></slot>
				<template v-else>
					{{ (prop.item as any)[labelKey || "label"] }}
				</template>
			</template>
		</tree-item>
	</div>
</template>

<script setup lang="ts" generic="T">
import { computed } from "vue";
import treeItem from "./tree-item.vue";
import { Size } from "../../../types";
import {
	getObjectKeyFn,
	ObjectKeyProp,
	StringOrNumberValueKey,
} from "../../../utils";
import { ItemContext } from "./type";

export type MayChildrenKey<T> = {
	[k in keyof T]: T[k] extends T[] | undefined ? k : never;
}[keyof T];

const {
	size = "medium",
	treeData,
	itemKey,
	labelKey,
	highlightCurrent,
	children,
} = defineProps<{
	size?: Size;
	treeData: T[];
	itemKey?: ObjectKeyProp<T, [items: T[], indexes: number[]]>;
	labelKey?: StringOrNumberValueKey<T>;
	children?: MayChildrenKey<T> | ((item: T) => T[] | undefined);
	highlightCurrent?: boolean;
	itemClick?: "expend" | "select";
}>();
const keyFn = computed(
	() =>
		getObjectKeyFn(itemKey) || ((item, items, indexes) => indexes.join(".")),
);
const currentKey = defineModel<string | number>("current-key");
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
	(ev: "item-click", context: ItemContext<T>): void;
	(ev: "expend", expend: boolean, context: ItemContext<T>);
}>();
function handleExpend(context: ItemContext<T>) {
	const isExpend = expendKeySet.value.has(context.itemKey);
	if (isExpend) {
		expendKey.value = expendKey.value!.filter((i) => i !== context.itemKey);
	} else {
		expendKey.value = [...(expendKey.value || []), context.itemKey];
	}
	emit("expend", !isExpend, context);
}
function handleChildNodeClick(context: ItemContext<T>) {
	currentKey.value = context.itemKey;
	emit("item-click", context);
}
</script>

<style>
.star-ui-tree-highlight-current .star-ui-tree-current {
	background-color: var(--star-ui-primary-color);
}
</style>
