<template>
	<div class="star-ui su-h-line star-ui-h-line"></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-h-line",
	props: {
	}
})
export default class SuHLine extends Vue {
}
</script>

<style>
.star-ui-h-line{
	background-color:var(--star-ui-line-color);
	width:100%;
	height:var(--star-ui-line-width);
	min-height:var(--star-ui-line-width);
	max-height:var(--star-ui-line-width);
	flex:0 0 var(--star-ui-line-width);
	padding: 0;
}
</style>
