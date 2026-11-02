<template>
	<div
		:class="['star-ui', 'su-switch', 'star-ui-switch', `star-ui-size-${size}`]"
	>
		<label>
			<input
				:disabled="disabled"
				ref="input"
				type="checkbox"
				:name="name"
				:checked="value"
				@change.capture="
					disabled ? (refInput!.checked = value) : (value = refInput!.checked)
				"
			/>
			<div><span></span></div>
		</label>
	</div>
</template>
<script setup lang="ts">
import { useTemplateRef } from "vue";
import { Size } from "../../../types";

const {
	size = "medium",
	name,
	disabled,
} = defineProps<{ size?: Size; name?: string; disabled?: boolean }>();
const value = defineModel<boolean>({ default: false });
const refInput = useTemplateRef("input");
</script>

<style>
.star-ui-switch {
	display: inline-block;
	--active-color: var(--star-ui-primary-color);
	border-color: transparent;
	position: relative;
	width: 2.8em;
}
.star-ui-switch::before {
	content: "\200B"; /* 零宽空格 */
}
.star-ui-switch label {
	display: contents;
	height: 100%;
}
.star-ui-switch input {
	display: none;
}
.star-ui-switch div {
	position: absolute;
	display: inline-block;
	width: 100%;
	height: calc(80%);
	top: 10%;
	border-radius: 1em;
	border: 1px solid var(--star-ui-border-color-base);
	transition: all 0.2s;
	cursor: pointer;
	--current-color: transparent;
	background-color: var(--current-color);
}
.star-ui-switch div span {
	position: absolute;
	display: inline-block;
	--padding: 2px;
	height: calc(100% - 2 * calc(var(--padding) + 1px));
	top: var(--padding);
	left: var(--padding);
	aspect-ratio: 1;
	border-radius: 50%;
	border: solid 1px var(--star-ui-border-color-base);
	background: var(--star-ui-background-color-primary);
	transition: all 0.2s;
}
.star-ui-switch input:checked + div {
	--current-color: var(--active-color);
}
.star-ui-switch input:checked + div span {
	transform: translateX(calc(2.8em - var(--padding) * 2 - 2px - 100%));
}
.star-ui-switch input:disabled + div {
	background-color: color-mix(
		in srgb,
		var(--current-color),
		var(--star-ui-disabled-color)
	);
	cursor: not-allowed;
}
/* .star-ui-switch input:disabled + div span {
	background-color: color-mix(
		in srgb,
		var(--star-ui-background-color-primary),
		var(--star-ui-disabled-color)
	);
} */
</style>
