<template>
	<label
		:class="[
			'star-ui',
			'star-ui-checkbox',
			'su-checkbox',
			`star-ui-size-${size}`,
			{ disabled },
		]"
	>
		<input
			ref="input"
			:checked="value"
			type="checkbox"
			:disabled="disabled"
			@change.capture="
				disabled || (value = refInput!.checked);
				refInput!.checked = value;
			"
		/>
		<span
			:class="[
				'star-ui',
				'star-ui-checkbox--inner',
				{ [`star-ui-checkbox--inne-indeterminate`]: indeterminate },
			]"
		></span>
		<slot></slot>
	</label>
</template>
<script setup lang="ts">
import { useTemplateRef } from "vue";
import { Size } from "../../../types";

const {
	size = "medium",
	disabled = false,
	indeterminate = false,
} = defineProps<{
	size?: Size;
	disabled?: boolean;
	indeterminate?: boolean;
}>();
const value = defineModel<boolean>({ default: false });
const refInput = useTemplateRef("input");
</script>
<style>
.star-ui-checkbox {
	cursor: pointer;
	display: inline-flex;
	gap: var(--star-ui-default-padding);
	align-items: center;
}
.star-ui-checkbox > input {
	display: none;
}
.star-ui-checkbox--inner {
	width: 1em;
	height: 1em;
	--unchecked-background-color: transparent;
	--checked-background-color: var(--star-ui-primary-color);
	--checked-icon-color: var(--star-ui-background-color-primary);
	display: inline-block;
	position: relative;
	border-radius: inherit;
	border: inherit;
	border-color: var(--star-ui-border-color-base);
	--bg-color: var(--unchecked-background-color);
	background-color: var(--bg-color);
}
input:checked + .star-ui-checkbox--inner,
.star-ui-checkbox--inne-indeterminate {
	--bg-color: var(--checked-background-color);
}
.star-ui-checkbox--inner:after {
	content: "";
	display: inline-block;
	position: absolute;
	border: 0 solid var(--checked-icon-color);
	top: 50%;
	left: 50%;
}
input:checked + .star-ui-checkbox--inner:after {
	transform: translate(-50%, -70%) rotate(-45deg);
	width: 0.5em;
	height: 0.15em;
	border-bottom-width: 2px;
	border-left-width: 2px;
}
.star-ui-checkbox--inne-indeterminate:after {
	transform: translate(-50%, -50%);
	width: 0.6em;
	height: 0;
	border-bottom-width: 2px;
}
.star-ui-checkbox.disabled {
	cursor: not-allowed;
}
.star-ui-checkbox.disabled .star-ui-checkbox--inner {
	background-color: color-mix(var(--bg-color), var(--star-ui-disabled-color));
}
</style>
