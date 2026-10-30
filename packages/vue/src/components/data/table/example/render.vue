<template>
	<Table :columns="columns" :data="data">
		<template #header_field1="prop">{{ prop }}</template>
		<template #render_field1="{ record }">
			template:{{ record.field1 }}
		</template>
	</Table>
</template>

<script lang="tsx" setup>
import { Table, TableColumn } from "@thestarweb/ui";
const data = [
	{ field1: "1.1", field2: "1.2" },
	{ field1: "2.1", field2: "2.2" },
];
const columns: TableColumn<(typeof data)[number]>[] = [
	{ header: "字段1", key: "field1" },
	{
		key: "field2",
		// TODO jsx配置接些有问题
		// header: (a) => <span>jsx渲染</span>,
	},
];
</script>
