import { computed } from "vue";
import { getObjectKeyFn } from "../../../utils";
import {
	Tree,
	TreeItemContext,
	TreeItemContextWithKey,
	TreeProp,
} from "./type";

export function toTree<T>(
	raw: T[],
	itemKey: TreeProp<T>["itemKey"],
	children: TreeProp<T>["children"],
	checkMode: TreeProp<T>["showCheckboxMode"] = "default",
	isItemChecked: (context: Tree<T>) => boolean,
) {
	const getKey = getTreeKeyFn(itemKey);
	const getChildren = getChildrenFn(children);
	const map = new Map<string | number, Tree<T>>();
	function _toTree(
		raw: T[],
		parent: Tree<T> | null = null,
		pIndexes: number[] = [],
		pItems: T[] = [],
	): Tree<T>[] {
		return raw.map((item, index) => {
			const indexes = [...pIndexes, index];
			const items = [...pItems, item];
			const current: Tree<T> = {
				item,
				index,
				indexes,
				items,
				itemKey: undefined as any,
				parent,
				selfChecked: computed(() => isItemChecked(current)),
				checked: computed(
					() =>
						current.selfChecked.value ||
						(checkMode === "leafOnly" &&
							childrenChecked.value.hasChecked &&
							!childrenChecked.value.hasUnChecked) ||
						(checkMode == "default" && current.parent?.checked.value) ||
						false,
				),
				indeterminate: computed(
					() =>
						childrenChecked.value.hasChecked &&
						childrenChecked.value.hasUnChecked,
				),
			};
			current.itemKey = getKey(item, current);
			map.set(current.itemKey, current);
			const children = getChildren(item, current);
			if (children) {
				current.children = _toTree(children, current, indexes, items);
			}
			const childrenChecked = computed(() => {
				let hasChecked = false;
				let hasUnChecked = false;
				current.children?.forEach((i) => {
					if (i.checked.value) {
						hasChecked = true;
					} else {
						hasUnChecked = true;
					}
				});
				return { hasChecked, hasUnChecked };
			});
			return Object.freeze(current);
		});
	}
	return {
		map,
		tree: _toTree(raw),
	};
}

function _traverseTree<T>(
	tree: T[] | undefined,
	getChildren: ((prop: TreeItemContext<T>) => T[]) | null | undefined,
	fn: (context: TreeItemContext<T>) => boolean | undefined | void,
	pIndexes: number[] = [],
	pItems: T[] = [],
) {
	return tree?.some((item, index) => {
		const indexes = [...pIndexes, index];
		const items = [...pItems, item];
		const context = { item, index, indexes, items };
		return (
			fn(context) ||
			(getChildren
				? _traverseTree(getChildren(context), getChildren, fn, indexes, items)
				: false)
		);
	});
}
export function traverseTree<T>(
	tree: T[],
	getChildren: TreeProp<T>["children"],
	fn: (context: TreeItemContext<T>) => boolean | undefined | void,
) {
	return _traverseTree(
		tree,
		typeof getChildren === "function"
			? ({ item }) => getChildren(item)
			: ({ item }) => (item as any)[getChildren || "children"],
		fn,
	);
}

export function getTreeKeyFn<T>(
	itemKey: TreeProp<T>["itemKey"],
): (item: T, context: TreeItemContext<T>) => number | string {
	return getObjectKeyFn(itemKey) || ((_, { indexes }) => indexes.join("."));
}
export function getChildrenFn<T>(
	c: TreeProp<T>["children"],
): (item: T, context: TreeItemContext<T>) => T[] | undefined | null {
	switch (typeof c) {
		case "string":
			return (item) => item[c] as any;
		case "function":
			return c;
	}
	return (item) => (item as any).children;
}

export function getTreeLabelRender<T>(render: TreeProp<T>["label"]) {
	if (typeof render === "function") {
		return render;
	}
	return ({ item }) => {
		return item[render || "label"];
	};
}

export function filertTree<T>(
	tree: T[],
	getChildren: TreeProp<T> | T,
	fn: (context: TreeItemContext<T>) => boolean,
) {
	//
}
