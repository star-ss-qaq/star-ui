<template>
	<div class="star-ui su-v-line star-ui-v-line"></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-v-line",
	props: {
	}
})
export default class SuVLine extends Vue {
}
</script>

<style>
.star-ui-v-line{
	background-color:var(--star-ui-line-color);
	/*height:100%;*/
	width:var(--star-ui-line-width);
	min-width:var(--star-ui-line-width);
	max-width:var(--star-ui-line-width);
	flex:0 0 var(--star-ui-line-width);
	padding: 0;
}
</style>
