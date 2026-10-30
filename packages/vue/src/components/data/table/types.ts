import { Component } from "vue";

export interface TableColumn<T> {
	header?: string | Component<{ column: TableColumn<T> }>;
	key: string;
	render?: Component<{ record: T; index: number; column: TableColumn<T> }>;
}
