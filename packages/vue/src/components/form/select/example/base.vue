<template>
	<Select :options="options" v-model="value" />
	<Select :options="options" v-model="value" disabled />
</template>
<script setup lang="ts">
import { Select } from "@thestarweb/ui";
import { ref, watch } from "vue";

const options = [
	{ label: "label1", value: "1" },
	{ label: "label2", value: "2" },
	{ label: "label3", value: "3" },
	{ label: "label4", value: "4" },
	{ label: "label5", value: "5" },
	{ label: "label6", value: "6" },
	{ label: "label7", value: "7" },
	{ label: "label8", value: "8" },
	{ label: "label9", value: "9" },
	{ label: "label10", value: "10" },
	{ label: "label11", value: "11" },
	{ label: "label12", value: "12" },
	{ label: "label13", value: "13" },
	{ label: "label14", value: "14" },
	{ label: "label15", value: "15" },
];
const value = ref<string>("");
watch(value, () => {
	console.log(value);
});
</script>
