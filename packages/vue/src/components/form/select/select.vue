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
					`star-ui-select--${multiple ? 'multiple' : 'single'}`,
					`star-ui-size-${size}`,
					{ disabled, 'star-ui-select--open': open },
				]"
				@click="!disabled && (open = true)"
			>
				<div class="star-ui-select--content">
					<template v-if="filter">&#8203;</template>
					<template v-else-if="selectItem.length > 0">
						<template v-if="multiple"></template>
						<component :is="label" v-bind="selectItem[0]" />
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
				`star-ui-select--${multiple ? 'multiple' : 'single'}`,
				`star-ui-select--${children ? 'tree' : 'list'}`,
			]"
			:style="{ width: buttonWidth ? `${buttonWidth}px` : '' }"
		>
			<Tree
				:tree-data="options"
				:label="label"
				:item-key="itemKey"
				:children="children || (() => undefined)"
				:current-key="heightlightKey"
				:should-item-show="shouldItemShow"
				highlight-current
				@item-click="handleItemClick"
				@update:current-key=""
			/>
		</div>
	</Popover>
</template>
<script setup lang="ts" generic="T, M extends boolean = false">
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import { Tree } from "../../data/index.js";
import Popover from "../../data/popover/popover.vue";
import {
	TreeItemContext,
	TreeItemContextWithKey,
	TreeProp,
} from "../../data/tree/type.js";
import { SelectProp } from "./types";
import {
	getTreeKeyFn,
	getTreeLabelRender,
	traverseTree,
} from "../../data/tree/utils.js";
import { IconArrowDown } from "../../../icons/index.js";

const {
	size = "medium",
	options,
	disabled,
	label: _label, // = "label" as unknown as TreeProp<T>["label"],
	itemKey: _itemKey,
	value,
	isValueEqual = (a, b) => a === b,
	children,
	multiple,
	placeholder = "Select...",
	filterable = true,
} = defineProps<SelectProp<T, M>>();
const open = defineModel<boolean>("open", { default: false });
const modelValue = defineModel<M extends true ? any[] : any>();
const itemKey = computed(
	() => _itemKey ?? ("value" as unknown as TreeProp<T>["itemKey"]),
);
const label = computed(() =>
	getTreeLabelRender(_label || ("label" as unknown as TreeProp<T>["label"])),
);
const getKey = computed(() => getTreeKeyFn(itemKey.value));
const selectItem = computed(() => {
	const values: any[] = multiple
		? modelValue.value || []
		: modelValue.value
			? [modelValue.value]
			: [];
	if (value) {
		const fn =
			typeof value == "function" ? value : (context) => context.item[value];
		const res: TreeItemContext<T>[] = [];
		traverseTree(options, children || (() => undefined), (i) => {
			const value = fn(i);
			if (values.some((i) => isValueEqual(i, value))) {
				res.push(i);
			}
		});
		return res.map((i) => ({ ...i, itemKey: getKey.value(i.item, i) }));
	}
	const res: TreeItemContextWithKey<T>[] = [];
	traverseTree(options, children || (() => undefined), (i) => {
		const value = getKey.value(i.item, i);
		if (values.includes(value)) {
			res.push({ ...i, itemKey: value });
		}
	});
	return res;
});
const heightlightKey = computed(() => {
	if (!multiple) {
		return selectItem.value[0]?.itemKey;
	}
	return undefined;
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
	console.log(filteredForShowValue.value);
	if (!filteredForShowValue.value) return true;
	return filteredForShowValue.value.has(item);
}

function handleItemClick(context: TreeItemContextWithKey<T>) {
	if (!multiple) {
		(modelValue.value as any) = context.itemKey;
		open.value = false;
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
.star-ui-select--dropdown .star-ui-tree-item-label:hover {
	background-color: var(--star-ui-primary-color);
}
.star-ui-select--content {
	position: relative;
	flex: 1 1 0;
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
