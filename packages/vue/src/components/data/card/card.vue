<template>
	<div class="star-ui su-card star-ui-card">
		<div
			v-if="title != '' || collapsible || $slots.title"
			class="star-ui star-ui-container star-ui-card--inner-head"
		>
			<div class="star-ui star-ui-card--inner-title">{{ title }}</div>
			<button
				v-if="collapsible"
				:class="[
					'star-ui',
					'star-ui-card--inner-button-collapsible',
					isCollapse ? 'show' : 'hidden',
				]"
				@click="isCollapse = !isCollapse"
			></button>
		</div>
		<div
			ref="body"
			class="star-ui star-ui-card--inner-body"
			:style="{ height: boxHeight }"
			@transitionend="handleTransitionEnd"
		>
			<div
				ref="bodyInner"
				class="star-ui star-ui-container star-ui-card--inner-body-inner"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";

const refBody = useTemplateRef("body");
const refBodyInner = useTemplateRef("bodyInner");
const { title, collapsible } = defineProps<{
	title?: string;
	collapsible?: boolean;
}>();
const isCollapse = defineModel<boolean>("isCollapse", { default: false });
const boxHeight = ref("auto");
watch(isCollapse, (v) => {
	if (refBodyInner.value) {
		const realHeight = refBodyInner.value.clientHeight;
		boxHeight.value = `${realHeight}px`;
		if (v) {
			setTimeout(() => (boxHeight.value = "0"), 0); //0秒定时器用于将两个高度设置都能被浏览器读取
		}
	} else {
		if (v) {
			boxHeight.value = "0";
		} else {
			boxHeight.value = "auto";
		}
	}
});
function handleTransitionEnd() {
	if (!isCollapse.value) {
		//动画播放完之后取消掉高度限制
		boxHeight.value = "auto";
	}
}
</script>

<style>
.star-ui-card {
	border: 1px solid var(--star-ui-border-color-base);
	border-radius: var(--star-ui-border-radius-base);
	display: flex;
	flex-direction: column;
}
.star-ui-card--inner-head {
	display: flex;
	flex-direction: row;
}
.star-ui-card--inner-title {
	flex-grow: 1;
}
.star-ui-card--inner-button-collapsible {
	width: 0;
	height: 0;
	margin: 2px;
	padding: 10px;
	/*background: #88f;*/
	border-radius: 50%;
	border: 1px solid var(--star-ui-primary-color);
	display: inline-block;
}
.star-ui-card--inner-button-collapsible:after {
	content: " ";
	width: 0;
	height: 0;
	padding: 0;
	/*margin-left: -5px !important;
	margin-top: -2.5px !important;*/
	left: 5px;
	top: 8px;
	position: absolute;
	border-color: var(--star-ui-primary-color);
	border-style: solid;
	border-right: solid 5px transparent;
	border-left: solid 5px transparent;
	transition: border-top-width 0.5s, border-bottom-width 0.5s;
}
.star-ui-card--inner-button-collapsible.hidden:after {
	/*border-bottom: solid 5px #ccf;*/
	border-bottom-width: 5px;
	border-top-width: 0;
}
.star-ui-card--inner-button-collapsible.show:after {
	/*border-top: solid 5px #ccf;*/
	border-top-width: 5px;
	border-bottom-width: 0;
}
.star-ui-card--inner-body {
	flex-grow: 1;
	overflow: hidden;
	transition: height 0.5s;
}
.star-ui-card--inner-body-inner {
	overflow: auto;
}
</style>
