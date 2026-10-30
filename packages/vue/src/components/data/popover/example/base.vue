<template>
	<div class="popover-example-base">
		<Popover placement="right" mask-on-mobile ref="ref">
			<template #reference>
				<Button @click="handleClick">123</Button>
			</template>
			<div>12311</div>
			12345
			<div>22</div>
		</Popover>
	</div>
</template>
<script setup lang="ts">
import { Button, Popover } from "@thestarweb/ui";
import { useTemplateRef } from "vue";
const ref = useTemplateRef("ref");
function handleClick(ev) {
	console.log(ev);
}
</script>
<style>
.popover-example-base {
	position: relative;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
