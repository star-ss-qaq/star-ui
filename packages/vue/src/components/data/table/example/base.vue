<template>
	<Table :columns="columns" :data="data" />
</template>

<script lang="ts" setup>
import { Table, TableColumn } from "@thestarweb/ui";
const data = [
	{ field1: "1.1", field2: "1.2" },
	{ field1: "2.1", field2: "2.2" },
];
const columns: TableColumn<(typeof data)[number]>[] = [
	{ header: "字段1", key: "field1" },
	{ key: "field2" },
];
</script>
