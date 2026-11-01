<template>
	<span
		:class="[
			'star-ui',
			'star-ui-tag',
			'su-tag',
			`star-ui-size-${size}`,
			`star-ui-color-bg-${theme}`,
			'star-ui-block-theme-apply-bg',
			'star-ui-block-theme-apply-text',
		]"
	>
		<slot></slot>
	</span>
</template>
<script setup lang="ts">
import { Size, ThemeColor } from "../../../types";

const { size = "medium", theme = "primary" } = defineProps<{
	size?: Size;
	theme?: ThemeColor;
}>();
</script>
<style>
.star-ui-tag {
	display: inline-block;
}
</style>
