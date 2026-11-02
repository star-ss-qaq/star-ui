import { ComputedRef } from "vue";
import { Size } from "../../../types";
import { ObjectKeyProp, StringOrNumberValueKey } from "../../../utils";
export type TreeCheckboxMode = "default" | "leafOnly" | "raw";
export interface TreeItemContext<T> {
	item: T;
	index: number;
	items: T[];
	indexes: number[];
}
export interface TreeItemContextWithKey<T> extends TreeItemContext<T> {
	item: T;
	index: number;
	itemKey: string | number;
	items: T[];
	indexes: number[];
}
export interface Tree<T> extends TreeItemContextWithKey<T> {
	children?: Tree<T>[];
	parent?: Tree<T> | null;
	selfChecked: ComputedRef<boolean>;
	checked: ComputedRef<boolean>;
	indeterminate: ComputedRef<boolean>;
}
type MayChildrenKey<T> = {
	[k in keyof T]: T[k] extends T[] | undefined ? k : never;
}[keyof T];
export interface TreeProp<T> {
	size?: Size;
	treeData: T[];
	itemKey?: ObjectKeyProp<T, [context: TreeItemContext<T>]>;
	label?:
		| StringOrNumberValueKey<T>
		| ((context: TreeItemContextWithKey<T>) => any);
	children?: MayChildrenKey<T> | ((item: T) => T[] | undefined);
	highlightCurrent?: boolean;
	itemClick?: "expend" | "select";
	shouldItemShow?: (context: TreeItemContextWithKey<T>) => boolean;
	showCheckbox?: boolean;
	showCheckboxMode?: TreeCheckboxMode;
}
