import { Size } from "../../../types";
import { ObjectKeyProp } from "../../../utils";
import {
	TreeCheckboxMode,
	TreeItemContext,
	TreeProp,
} from "../../data/tree/type";

export type ValueKey<T, V> = {
	[k in keyof T]: T[k] extends V ? k : never;
}[keyof T];

export interface SelectProp<T, V, M extends boolean> {
	size?: Size;
	disabled?: boolean;
	label?: TreeProp<T>["label"];
	itemKey?: TreeProp<T>["itemKey"];
	/**
	 * item的value,不指定时和itemKey一致
	 */
	value?: ValueKey<T, V> | ((item: T) => V);
	/**
	 * 判断两个value是否是相等的（仅设置value后）
	 */
	isValueEqual?: (a: V, b: V) => boolean;
	children?: TreeProp<T>["children"];
	options: T[];
	multiple?: M;
	placeholder?: string;
	filterable?: boolean;
	treeCheckboxMode?: TreeCheckboxMode;
}
