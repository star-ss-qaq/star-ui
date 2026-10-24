<template>
	<div>
		<div class="title">Star UI</div>
		<div class="info">{{$t("home.info")}}</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
})
export default class Home extends Vue {
}
</script>
<style scoped>
	@keyframes color-change {
		0%{color: #800}
		10%{color: #440}
		20%{color: #080}
		40%{color: #044}
		60%{color: #008}
		80%{color: #404}
		100%{color: #800}
	}
	.title{
		font-size: 10vw;
		text-align: center;
		animation:color-change 20s infinite;
		margin-top: calc(40vh - 5vw);
	}
	.info{
		padding: 20px;
	}
</style>