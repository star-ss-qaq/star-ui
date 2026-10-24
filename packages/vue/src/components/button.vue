<template>
	<button :class="['star-ui', 'su-container', 'star-ui-container', 'star-ui-button', 'star-ui-size-'+size]">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register, Prop } from "@ui-root/reg";

import "../global-style.css";

@Register({
	name:"su-button"
})
export default class SuButton extends Vue {
	@Prop({
		type:String,
		default:()=>{
			return "medium"
		}
	})
	size!:string;
}
</script>

<style>
.star-ui-button{
	border-width: 1px;
	cursor: pointer;
	background: var(--star-ui-backgorund-color);
	color: var(--star-ui-font-color);
}
</style>
