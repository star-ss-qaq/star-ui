<template>
	<div
		:class="[
			'star-ui',
			'su-view-control',
			'star-ui-view-control',
			`star-ui-view-control-${computedDeviceType}`,
			`su-view-control-${computedDeviceType}`,
		]"
	>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { provideIsMobile } from "../../../context";

type DeviceType = "mobile" | "pc";
const { deviceType, checkFunction } = defineProps<{
	deviceType?: DeviceType;
	checkFunction?: "ua" | "screen-width";
}>();
const computedDeviceType = computed(() => {
	if (deviceType) {
		return deviceType;
	}
	switch (checkFunction) {
		case "screen-width":
			if (window.innerWidth < 1000) {
				return "mobile";
			}
			return "pc";
		case "ua":
			if (navigator.userAgent.toLowerCase().indexOf("mobile")) {
				return "mobile";
			}
			return "pc";
	}
});
provideIsMobile(computed(() => computedDeviceType.value === "mobile"));
</script>

<style></style>
