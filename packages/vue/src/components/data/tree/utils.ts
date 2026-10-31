import { getObjectKeyFn } from "../../../utils";
import { TreeItemContext, TreeProp } from "./type";

function _traverseTree<T>(
	tree: T[] | undefined,
	getChildren: (prop: TreeItemContext<T>) => T[],
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
			_traverseTree(getChildren(context), getChildren, fn, indexes, items)
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
export function getTreeKeyFn<T>(itemKey: TreeProp<T>["itemKey"]) {
	return getObjectKeyFn(itemKey) || ((item, { indexes }) => indexes.join("."));
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
