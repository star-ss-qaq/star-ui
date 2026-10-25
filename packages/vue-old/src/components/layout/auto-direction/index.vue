<template>
	<div class="star-ui star-ui-auto-direction su-auto-direction">
		<slot />
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register } from "@ui-root/reg";
import "@ui-root/global-style.css";

@Register({
	name:"su-auto-direction",
})
export default class SuAutoDirection extends Vue {
}
</script>

<style>
.star-ui-auto-direction{
	display: flex;
	padding: 0;
	flex-direction: row;
}
.star-ui-view-control.star-ui-view-control-mobile .star-ui-auto-direction{
	flex-direction: column;
}
</style>
