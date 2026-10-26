<template>
	<button
		:class="[
			'star-ui',
			'su-container',
			'star-ui-container',
			'star-ui-button',
			type ? `star-ui-button-${type}` : '',
			`star-ui-size-${size}`,
		]"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>
<script setup lang="tsx">
import { Size } from "../../../types";
const {
	size = "medium",
	type = "default",
	disabled = false,
} = defineProps<{
	size?: Size;
	type?: "default" | "info" | "primary" | "success" | "warning" | "danger";
	disabled?: boolean;
}>();
</script>

<style>
.star-ui-button {
	cursor: pointer;
	--main-color: var(--star-ui-background-color-primary);
	--bg-color: var(--main-color);
	--text-color: var(--star-ui-text-color-in-dark);
	--border-color: var(--main-color);
	background: var(--bg-color);
	color: var(--text-color);
	border: 1px solid var(--main-color);
}

.star-ui-button-default {
	--main-color: var(--star-ui-text-color-primary);
	--bg-color: var(--star-ui-background-color-primary);
	--text-color: var(--star-ui-text-color-primary);
}

.star-ui-button-primary {
	--main-color: var(--star-ui-primary-color);
}
.star-ui-button-success {
	--main-color: var(--star-ui-success-color);
}
.star-ui-button-warning {
	--main-color: var(--star-ui-warning-color);
}
.star-ui-button-danger {
	--main-color: var(--star-ui-danger-color);
}
.star-ui-button:hover {
	background-color: hsl(
		from var(--bg-color) h calc(1.1 * s) calc(0.95 * l) / alpha
	);
	color: hsl(from var(--text-color) h calc(1.1 * s) calc(0.95 * l) / alpha);
	border-color: hsl(
		from var(--border-color) h calc(1.1 * s) calc(0.95 * l) / alpha
	);
}
.star-ui-button:active {
	background-color: hsl(from var(--bg-color) h calc(1.2 * s) l / alpha);
	color: hsl(from var(--text-color) h calc(1.2 * s) l / alpha);
	border-color: hsl(
		from var(--border-color) h calc(1.2 * s) calc(0.9 * l) / alpha
	);
}
.star-ui-button[disabled] {
	background-color: color-mix(
		in srgb,
		var(--bg-color),
		var(--star-ui-disabled-color)
	);
	color: color-mix(in srgb, var(--text-color), var(--star-ui-disabled-color));
	border-color: color-mix(
		in srgb,
		var(--border-color),
		var(--star-ui-disabled-color)
	);
	cursor: not-allowed;
}
</style>
