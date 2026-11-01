<template>
	<div>
		<Button v-for="theme in themes" :theme="theme">button</Button>
	</div>
	<div>
		<Button v-for="theme in themes" :theme="theme" disabled>button</Button>
	</div>
</template>
<script setup lang="ts">
import { Button } from "@thestarweb/ui";
const themes = [
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
