<template>
	<div>
		<Button v-for="type in types" :type="type">button</Button>
	</div>
	<div>
		<Button v-for="type in types" :type="type" disabled>button</Button>
	</div>
</template>
<script setup lang="ts">
import { Button } from "@thestarweb/ui";
const types = [
	"primary",
	"success",
	"warning",
	"danger",
	"default",
	"info",
] as const;
</script>
<style scoped>
div {
	display: flex;
	gap: 5px;
}
div + div {
	margin-top: 5px;
}
</style>
