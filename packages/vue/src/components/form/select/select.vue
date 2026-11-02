<template>
	<Popover
		placement="bottom"
		trigger="none"
		teleport-to="body"
		v-model:visible="open"
		keep-render="visible"
	>
		<template #reference>
			<div
				ref="button"
				:class="[
					'star-ui',
					'star-ui-select',
					'su-select',
					`star-ui-select--${multiple !== false ? 'multiple' : 'single'}`,
					`star-ui-size-${size}`,
					{ disabled, 'star-ui-select--open': open },
				]"
				@click="!disabled && (open = true)"
			>
				<div class="star-ui-select--content">
					<template v-if="filter">&#8203;</template>
					<template v-else-if="selectItem.length > 0">
						<template v-if="multiple !== false">
							<Tag
								v-for="item in selectItem"
								class="star-ui-select--multiple-tag"
								:size="size"
								theme="info"
							>
								<component :is="label" v-bind="item" />
							</Tag>
						</template>
						<component v-else :is="label" v-bind="selectItem[0]" />
					</template>
					<div class="star-ui-placeholder" v-else>{{ placeholder }}</div>
					<input
						v-model="filter"
						class="star-ui-select--filter"
						v-if="filterable"
						@focus="!disabled && (open = true)"
					/>
				</div>
				<div class="star-ui-select--append">
					<IconArrowDown class="star-ui-icon star-ui-select--dropdown-icon" />
				</div>
			</div>
		</template>
		<div
			:class="[
				'star-ui',
				'star-ui-select--dropdown',
				`star-ui-select--${multiple !== false ? 'multiple' : 'single'}`,
				`star-ui-select--${children ? 'tree' : 'list'}`,
			]"
			:style="{ width: buttonWidth ? `${buttonWidth}px` : '' }"
		>
			<TreeRaw
				:tree="tree.tree"
				:size="size"
				:label-render="label"
				:current-key="selectItem[0]?.itemKey"
				:should-item-show="shouldItemShow"
				:highlight-current="multiple === false"
				:show-checkbox="multiple !== false"
				:show-checkbox-mode="treeCheckboxMode"
				:item-handle="multiple === false ? 'none' : 'check'"
				@item-click="handleItemClick"
				@check-change="handleCheckChange"
				@update:current-key=""
			/>
		</div>
	</Popover>
</template>
<script setup lang="ts" generic="T, V, M extends boolean = false">
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from "vue";
import Popover from "../../data/popover/popover.vue";
import {
	Tree,
	TreeItemContext,
	TreeItemContextWithKey,
	TreeProp,
} from "../../data/tree/type.js";
import { SelectProp } from "./types";
import {
	getTreeKeyFn,
	getTreeLabelRender,
	toTree,
	traverseTree,
} from "../../data/tree/utils.js";
import { IconArrowDown } from "../../../icons/index.js";
import TreeRaw from "../../data/tree/tree-raw.vue";
import { Tag } from "../../data/index.js";

const {
	size = "medium",
	options,
	disabled,
	label: _label, // = "label" as unknown as TreeProp<T>["label"],
	itemKey,
	value,
	isValueEqual = (a, b) => a === b,
	children,
	multiple = false,
	placeholder = "Select...",
	filterable = true,
	treeCheckboxMode = "default",
} = defineProps<SelectProp<T, V, M>>();

const open = defineModel<boolean>("open", { default: false });
const modelValue = defineModel<M extends true ? V[] : V>();
const currentValue = computed(() =>
	Array.isArray(modelValue.value)
		? modelValue.value
		: modelValue.value
			? [modelValue.value]
			: [],
);
const valueFn = computed((): ((item: Tree<T>) => V) =>
	value
		? typeof value == "function"
			? ({ item }) => value(item)
			: ({ item }) => item[value] as V
		: (context) => context.itemKey as V,
);
const tree = computed(() => {
	return toTree(options, itemKey, children, treeCheckboxMode, (item) =>
		currentValue.value.some((i) => isValueEqual(valueFn.value(item), i)),
	);
});
const label = computed(() =>
	getTreeLabelRender(_label || ("label" as unknown as TreeProp<T>["label"])),
);
const selectItem = computed(() => {
	const map: Tree<T>[] = [];
	tree.value.map.forEach((v) => {
		if (v.selfChecked.value) {
			map.push(v);
		}
	});
	return map;
});

const refButton = useTemplateRef("button");
const buttonWidth = ref(0);
onMounted(() => {
	buttonWidth.value = refButton.value!.offsetWidth;
});

const filter = ref("");
watch(open, (v) => {
	if (!v) {
		filter.value = "";
	}
});
const filteredForShowValue = computed(() => {
	if (!filter.value) return null;
	const showNode = new Set<T>();
	traverseTree(options, children || (() => undefined), (context) => {
		const res = label.value(context as any);
		if (typeof res === "string") {
			if (res.includes(filter.value)) {
				context.items.forEach((i) => showNode.add(i));
			}
		}
	});
	return showNode;
});
function shouldItemShow({ item }: TreeItemContextWithKey<T>) {
	if (!filteredForShowValue.value) return true;
	return filteredForShowValue.value.has(item);
}

function handleItemClick(context: Tree<T>) {
	if (multiple === false) {
		(modelValue.value as V) = valueFn.value(context);
		open.value = false;
	}
}
function handleCheckChange({
	add,
	remove,
}: {
	add: Set<Tree<T>>;
	remove: Set<Tree<T>>;
}) {
	if (multiple !== false) {
		const addValue: V[] = [];
		const removeValue: V[] = [];
		add.forEach((i) => addValue.push(valueFn.value(i)));
		remove.forEach((i) => removeValue.push(valueFn.value(i)));
		(modelValue.value as V[]) = [
			...((modelValue.value as V[]) || []).filter(
				(i) => !removeValue.some((j) => isValueEqual(i, j)),
			),
			...addValue,
		];
	}
}
</script>
<style>
.star-ui-select {
	display: inline-flex;
	flex-direction: row;
	width: var(--star-ui-input-default-width);
	overflow: hidden;
	color: var(--star-ui-regular-text-color);
	border-color: var(--star-ui-border-color-base);
	--bg-color: transparent;
	background-color: var(--bg-color);
	position: relative;
	cursor: pointer;
}
.star-ui-select--multiple-tag {
	padding: 2px 5px;
	margin: -2px 0;
	border: 0;
}
.star-ui-select:hover {
	border-color: var(--star-ui-primary-color);
}
.star-ui-select--open {
	border-color: var(--star-ui-primary-color);
}
.star-ui-select.disabled {
	border-color: var(--star-ui-border-color-base);
	background-color: color-mix(var(--bg-color), var(--star-ui-disabled-color));
	cursor: not-allowed;
}
.star-ui-select--append {
	display: inline-flex;
	align-items: center;
}
.star-ui-select--dropdown-icon {
	transform: rotate(0);
	transition: all 0.2s;
}
.star-ui-select--open .star-ui-select--dropdown-icon {
	transform: rotate(180deg);
}
.star-ui-select--dropdown {
	max-height: 200px;
	overflow: auto;
	padding: var(--star-ui-default-padding);
}
.star-ui-select--dropdown.star-ui-select--list .star-ui-tree-expand-button {
	display: none;
}
.star-ui-select--dropdown.star-ui-select--single
	.star-ui-tree-item-label:hover {
	background-color: var(--star-ui-primary-color);
}

.star-ui-select--content {
	position: relative;
	flex: 1 1 0;
	display: flex;
	gap: var(--padding);
	flex-wrap: wrap;
}

.star-ui-select--filter {
	position: absolute;
	left: 0;
	top: 0;
	outline: none;
	border: none;
	background-color: transparent;
	width: 100%;
}
</style>
