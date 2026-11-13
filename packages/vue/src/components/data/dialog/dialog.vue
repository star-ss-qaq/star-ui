<template>
	<teleport
		v-if="shouldMount"
		:to="teleportTo"
		:disabled="!teleportTo || !shouldMount"
	>
		<div
			:style="{ zIndex }"
			:class="[
				'start-ui',
				'star-ui-dialog--outer',
				'su-dialog--outer',
				shouldRender
					? 'star-ui-dialog--outer-show'
					: 'star-ui-dialog--outer-hidden',
			]"
			@transitionend="!isShow && (shouldMount = false)"
		>
			<div
				v-if="showMask"
				:class="['start-ui', 'star-ui-dialog--mask', 'su-dialog--mask']"
				@click="closeOnClickMask && (isShow = false)"
			></div>
			<div :class="['start-ui', 'star-ui-dialog', 'su-dialog']">
				<div
					v-if="title || showClose || $slots.header"
					:class="['start-ui', 'star-ui-dialog--header', 'su-dialog--header']"
				>
					<div>
						{{ title }}
						<slot name="header"></slot>
					</div>
					<span
						v-if="showClose"
						class="star-ui-dialog--close-icon"
						@click="isShow = false"
					>
						<icon-close />
					</span>
				</div>
				<div :class="['start-ui', 'star-ui-dialog--body', 'su-dialog--body']">
					<slot></slot>
				</div>
				<div
					v-if="$slots.footer"
					:class="['start-ui', 'star-ui-dialog--footer', 'su-dialog--footer']"
				>
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</teleport>
</template>
<script setup lang="ts">
import { CSSProperties, nextTick, reactive, ref, watch } from "vue";
import { getNewIndex } from "../../../utils";
import { IconClose } from "../../../icons";

const isShow = defineModel<boolean>({ default: false });
const {
	teleportTo = "body",
	showMask = true,
	closeOnClickMask = true,
	closeOnEsc = true,
	showClose = true,
	title,
} = defineProps<{
	teleportTo?: string | HTMLElement;
	showMask?: boolean;
	closeOnClickMask?: boolean;
	closeOnEsc?: boolean;
	showClose?: boolean;
	title?: string;
}>();
const zIndex = ref(100);
const shouldMount = ref(false);
const shouldRender = ref(false);
watch(isShow, (v) => {
	if (v) {
		show();
	} else {
		shouldRender.value = false;
	}
});
function show() {
	zIndex.value = getNewIndex();
	if (!shouldMount.value) {
		shouldMount.value = true;
		nextTick(() => (shouldRender.value = true));
	} else {
		shouldRender.value = true;
	}
}
</script>
<style>
.star-ui-dialog--outer {
	transition: all 0.1s;
	--dy: 0px;
}
.star-ui-dialog--outer-show {
	opacity: 1;
}
.star-ui-dialog--outer-hidden {
	opacity: 0;
	pointer-events: none;
	--dy: 120%;
}
.star-ui-dialog--mask {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
}
.star-ui-dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, calc(-50% + var(--dy)));
	border-radius: var(--star-ui-default-padding);
	background-color: var(--star-ui-background-color-primary);
	box-shadow: 0 0 5px #000;
	transition: all 0.1s;
}
.star-ui-dialog--header,
.star-ui-dialog--footer,
.star-ui-dialog--body {
	padding: var(--star-ui-default-padding);
}
.star-ui-dialog--header {
	display: flex;
	flex-direction: row;
}
.star-ui-dialog--header > div {
	flex: 1;
}
.star-ui-dialog--close-icon {
	cursor: pointer;
}
</style>
