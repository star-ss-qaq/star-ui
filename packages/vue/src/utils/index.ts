export * from "./z-index";
export type StringOrNumberValueKey<T> = {
	[k in keyof T]: T[k] extends string | number ? k : never;
}[keyof T];
export type ObjectKeyProp<T, P extends any[] = [index: number]> =
	| StringOrNumberValueKey<T>
	| ((data: T, ...prop: P) => string | number);
export function getObjectKeyFn<T, P extends any[] = [index: number]>(
	recordKey?: ObjectKeyProp<T, P> | undefined,
) {
	switch (typeof recordKey) {
		case "string":
			return (record: T) => record[recordKey] as string | number;
		case "function":
			return recordKey;
	}
}
