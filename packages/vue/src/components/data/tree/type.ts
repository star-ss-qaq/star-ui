export interface ItemContext<T> {
	item: T;
	index: number;
	itemKey: string | number;
	items: T[];
	indexes: number[];
}
