<template>
	<div
		:class="['star-ui', 'su-input', 'star-ui-input', `star-ui-size-${size}`]"
	>
		<input
			type="text"
			ref="input"
			v-model="value"
			:name="name"
			:class="['star-ui', 'star-ui-input--inner']"
			:disabled="disabled"
		/>
	</div>
</template>
<script setup lang="ts">
import { Size } from "../../../types";

const {
	name,
	disabled,
	size = "medium",
} = defineProps<{
	name?: string;
	disabled?: boolean;
	size?: Size;
}>();

const value = defineModel({
	set(v) {
		if (disabled) {
			return value.value;
		}
		return v;
	},
});
</script>

<style>
.star-ui-input {
	display: inline-flex;
	flex-direction: row;
	width: var(--star-ui-input-default-width);
	overflow: hidden;
	color: var(--star-ui-regular-text-color);
}
.star-ui-input:hover {
	border-color: var(--star-ui-primary-color);
}
.star-ui-input:focus-within {
	border-color: var(--star-ui-primary-color);
}
.star-ui-input--inner,
.star-ui-input--inner:hover,
.star-ui-input--inner:active,
.star-ui-input--inner:focus {
	border-width: 0px;
	outline: none;
	margin: 0;
	flex: 1;
	color: unset;
	background: unset;
	width: 100%;
	font-size: inherit;
	line-height: inherit;
}
</style>
