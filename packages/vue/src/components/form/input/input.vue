<template>
	<div
		:class="[
			'star-ui',
			'su-input',
			'star-ui-input',
			`star-ui-size-${size}`,
			{ disabled },
		]"
	>
		<div class="star-ui-input--content">
			<input
				v-bind="$attrs"
				:id="`sf_input_${id}`"
				:type="type"
				ref="input"
				v-model="value"
				:name="name"
				:class="['star-ui', 'star-ui-input--inner']"
				:disabled="disabled"
			/>
			<div class="star-ui-placeholder" v-if="!value">{{ placeholder }}</div>
		</div>
		<div class="star-ui-input--append">
			<IconClear
				class="star-ui-input--clear-icon"
				v-if="clearable && value && !disabled"
				@click="value = ''"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useId } from "vue";
import { IconClear } from "../../../icons";
import { Size } from "../../../types";

const {
	name,
	disabled,
	size = "medium",
	placeholder = "input...",
	clearable = true,
	type = "text",
} = defineProps<{
	name?: string;
	disabled?: boolean;
	size?: Size;
	placeholder?: string;
	clearable?: boolean;
	type?: "text" | "password";
}>();

const id = useId();

const value = defineModel<string>({
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
	border-color: var(--star-ui-border-color-base);
	--bg-color: transparent;
	background-color: var(--bg-color);
}
.star-ui-input:hover {
	border-color: var(--star-ui-primary-color);
}
.star-ui-input:focus-within {
	border-color: var(--star-ui-primary-color);
}
.star-ui-input--content {
	position: relative;
	display: inline-flex;
	flex-direction: row;
	flex: 1 1 0;
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
.star-ui-input.disabled {
	border-color: var(--star-ui-border-color-base);
	background-color: color-mix(var(--bg-color), var(--star-ui-disabled-color));
	cursor: not-allowed;
}
.star-ui-input.disabled .star-ui-input--inner {
	cursor: not-allowed;
}
.star-ui-input .star-ui-placeholder {
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
}
.star-ui-input--clear-icon {
	display: none;
	cursor: pointer;
}
.star-ui-input:hover .star-ui-input--clear-icon,
.star-ui-input:focus-within .star-ui-input--clear-icon {
	display: inline-block;
}
</style>
