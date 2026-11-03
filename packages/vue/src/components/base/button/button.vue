<template>
	<component
		:is="dynComp.tag"
		v-bind="dynComp.prop"
		:class="[
			'star-ui',
			'su-container',
			'star-ui-container',
			'star-ui-button',
			`star-ui-color-bg-${theme}`,
			`star-ui-size-${size}`,
		]"
	>
		<slot></slot>
	</component>
</template>
<script setup lang="tsx">
import { computed } from "vue";
import { Size, ThemeColor } from "../../../types";
const {
	size = "medium",
	theme = "default",
	disabled = false,
	href,
} = defineProps<{
	size?: Size;
	theme?: "default" | ThemeColor;
	disabled?: boolean;
	href?: string;
}>();
const dynComp = computed(() => {
	if (href && !disabled) {
		return { tag: "a", prop: { href } };
	}
	return { tag: "button", prop: { disabled } };
});
</script>

<style>
.star-ui-button {
	cursor: pointer;
	--main-color: var(--star-ui-background-color-primary);
	--button-bg-color: var(--bg-color);
	--button-text-color: var(--text-color);
	--button-border-color: var(--bg-color, var(--star-ui-border-color-bold));
	background: var(--button-bg-color);
	color: var(--button-text-color);
	border-color: var(--button-border-color);
	text-align: center;
}
a.star-ui-button {
	text-decoration: none;
}
.star-ui-button.star-ui-color-bg-default {
	--button-border-color: var(--star-ui-border-color-bold);
}

.star-ui-button:hover {
	background-color: hsl(
		from var(--button-bg-color) h calc(1.1 * s) calc(0.95 * l) / alpha
	);
	color: hsl(
		from var(--button-text-color) h calc(1.1 * s) calc(0.95 * l) / alpha
	);
	border-color: hsl(
		from var(--button-border-color) h calc(1.1 * s) calc(0.95 * l) / alpha
	);
}
.star-ui-button:active {
	background-color: hsl(from var(--button-bg-color) h calc(1.2 * s) l / alpha);
	color: hsl(from var(--button-text-color) h calc(1.2 * s) l / alpha);
	border-color: hsl(
		from var(--button-border-color) h calc(1.2 * s) calc(0.9 * l) / alpha
	);
}
.star-ui-button[disabled] {
	background-color: color-mix(
		in srgb,
		var(--button-bg-color),
		var(--star-ui-disabled-color)
	);
	color: color-mix(
		in srgb,
		var(--button-text-color),
		var(--star-ui-disabled-color)
	);
	border-color: color-mix(
		in srgb,
		var(--button-border-color),
		var(--star-ui-disabled-color)
	);
	cursor: not-allowed;
}
</style>
