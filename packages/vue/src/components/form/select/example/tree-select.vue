<template>
	<Select :options="data" item-key="value" children="children" />
</template>
<script setup lang="ts">
import { Select } from "@thestarweb/ui";
const data = [
	{
		label: "label 1",
		value: "1",
		children: [
			{ label: "label 1-1", value: "1-1" },
			{ label: "label 1-2", value: "1-2" },
			{ label: "label 1-3", value: "1-3" },
			{ label: "label 1-4", value: "1-4" },
		],
	},
	{ label: "label 2", value: "2" },
	{ label: "label 3", value: "3" },
	{ label: "label 4", value: "4" },
	{ label: "label 5", value: "5" },
	{ label: "label 6", value: "6" },
	{ label: "label 7", value: "7" },
	{
		label: "label 8",
		value: "8",
		children: [
			{ label: "label 8-1", value: "8-1" },
			{
				label: "label 8-2",
				value: "8-2",
				children: [
					{ label: "label 8-2-1", value: "8-2-1" },
					{ label: "label 8-2-2", value: "8-2-2" },
				],
			},
			{ label: "label 8-3", value: "8-3" },
			{ label: "label 8-4", value: "8-4" },
			{ label: "label 8-5", value: "8-5" },
		],
	},
	{ label: "label 9", value: "9" },
];
</script>
