<template>
	<div class="star-ui su-v-layout star-ui-v-layout">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-v-layout",
	props: {
	}
})
export default class SuVLayout extends Vue {
}
</script>

<style>
.star-ui-v-layout{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 0;
	overflow: hidden;
}
.star-ui-v-layout>*{
	flex:0 0 auto;
}
.star-ui-v-layout>.star-ui-main{
	height: 0;
}
</style>
