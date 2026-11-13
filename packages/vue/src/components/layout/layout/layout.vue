<template>
	<div :class="['star-ui', 'su-layout', `su-layout-${relDirection}`]">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useIsMobile } from "../../../context";

const { direction = "h" } = defineProps<{ direction?: "h" | "v" | "dyn" }>();
const isMobile = useIsMobile();
const relDirection = computed(() =>
	direction === "dyn" ? (isMobile.value ? "v" : "h") : direction,
);
</script>

<style>
.su-layout {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 0;
	overflow: hidden;
}
.su-layout-h {
	flex-direction: row;
}
.su-layout-v {
	flex-direction: column;
}
.su-layout > * {
	flex: 0 0 auto;
}
</style>
