<template>
	<div
		:class="[
			'star-ui',
			'su-slider',
			`star-ui-size-${size}`,
			{ 'su-slider-moving': isMove, 'su-slider-disabled': disabled },
		]"
	>
		<div ref="bar" class="su-slider--inner-runway" @click="handleBarClick">
			<div
				class="su-slider--inner-button-wrapper"
				:style="{ left: `${positionLeft}%` }"
				@mousedown="handleDown"
			></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { Size } from "../../../types";
const {
	min = 0,
	max = 100,
	size = "medium",
	step = 0,
	disabled,
} = defineProps<{
	min?: number;
	max?: number;
	size?: Size;
	step?: number;
	disabled?: boolean;
}>();
const value = defineModel<number>({ default: 0 });
const refBar = useTemplateRef("bar");
const isMove = ref(false);
const displayValue = ref(value.value);
watch(value, () => {
	if (!isMove.value) displayValue.value = value.value;
});
watch(
	() => disabled,
	() => {
		if (isMove.value) {
			stopMove();
			displayValue.value = value.value;
		}
	},
);
const positionLeft = computed(
	() => ((displayValue.value - min) * 100) / (max - min),
);
function getNum(ev: MouseEvent) {
	const { left, right, width } = refBar.value!.getBoundingClientRect();
	if (ev.clientX < left) {
		return min;
	}
	if (ev.clientX > right) {
		return max;
	}

	let res = min + ((ev.clientX - left) / width) * (max - min);
	if (step && step > 0) {
		res = Math.round((res - min) / step) * step;
	}
	return res;
}
function handleBarClick(ev: MouseEvent) {
	if (disabled) return;
	value.value = getNum(ev);
}
function handleDown(ev: MouseEvent) {
	if (disabled) return;
	isMove.value = true;
	window.addEventListener("mousemove", handleMove);
	window.addEventListener("mouseup", handleUp);
	window.addEventListener("blur", handleUp);
}

function handleMove(ev: MouseEvent) {
	displayValue.value = getNum(ev);
}
function stopMove() {
	window.removeEventListener("mousemove", handleMove);
	window.removeEventListener("mouseup", handleUp);
	window.removeEventListener("blur", handleUp);
	isMove.value = false;
}
function handleUp() {
	stopMove();
	value.value = displayValue.value;
	nextTick(() => {
		if (value.value !== displayValue.value) {
			displayValue.value = value.value;
		}
	});
}
</script>

<style>
.su-slider {
	padding: calc(var(--star-ui-input-medium-font-size));
	user-select: none;
}
.su-slider--inner-runway {
	height: 4px;
	background-color: var(--star-ui-input-border-color);
	cursor: pointer;
}
.su-slider--inner-button-wrapper {
	width: var(--star-ui-input-medium-font-size);
	height: var(--star-ui-input-medium-font-size);
	border-radius: 50%;
	border: 1px solid var(--star-ui-border-color-base);
	display: inline-block;
	position: relative;
	margin-left: calc(2px - var(--star-ui-input-medium-font-size) / 2);
	top: calc(2px - var(--star-ui-input-medium-font-size) / 2);
	cursor: pointer;
	background-color: var(--star-ui-background-color-primary);
}
.su-slider .su-slider--inner-button-wrapper:hover,
.su-slider.su-slider-moving .su-slider--inner-button-wrapper {
	transform: scale(1.2, 1.2);
}
.su-slider-disabled .su-slider--inner-button-wrapper {
	background-color: color-mix(
		in srgb,
		var(--star-ui-background-color-primary),
		var(--star-ui-disabled-color)
	);
}
</style>
