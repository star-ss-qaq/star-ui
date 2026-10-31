import { Size } from "../../../types";
import { ObjectKeyProp } from "../../../utils";
import { TreeItemContext, TreeProp } from "../../data/tree/type";

export interface SelectProp<T, M extends boolean> {
	size?: Size;
	disabled?: boolean;
	label?: TreeProp<T>["label"];
	itemKey?: TreeProp<T>["itemKey"];
	/**
	 * item的value,不指定时和itemKey一致
	 */
	value?: keyof T | ((context: TreeItemContext<T>) => any);
	/**
	 * 判断两个value是否是相等的（仅设置value后）
	 */
	isValueEqual?: (a: any, b: any) => boolean;
	children?: TreeProp<T>["children"];
	options: T[];
	multiple?: M;
	placeholder?: string;
	filterable?: boolean;
}
