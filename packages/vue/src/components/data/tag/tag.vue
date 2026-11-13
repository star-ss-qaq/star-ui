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
		<span>
			<slot></slot>
		</span>
		<IconClose
			class="star-ui-tag--close"
			v-if="closeable"
			@click="emit('close')"
		/>
	</span>
</template>
<script setup lang="ts">
import { IconClose } from "../../../icons";
import { Size, ThemeColor } from "../../../types";

const {
	size = "medium",
	theme = "primary",
	closeable,
} = defineProps<{
	size?: Size;
	theme?: ThemeColor;
	closeable?: boolean;
}>();
const emit = defineEmits<{ (ev: "close"): void }>();
</script>
<style>
.star-ui-tag {
	display: inline-flex;
	align-items: center;
	gap: var(--star-ui-default-padding);
}
.star-ui-tag--close {
	cursor: pointer;
}
</style>
