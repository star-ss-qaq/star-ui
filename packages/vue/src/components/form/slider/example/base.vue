<template>
	<Slider />
	<Slider :step="10" />
	<Slider disabled />
</template>
<script setup lang="ts">
import { Slider } from "@thestarweb/ui";
</script>
