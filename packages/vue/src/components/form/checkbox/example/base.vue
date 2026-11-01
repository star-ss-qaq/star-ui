<template>
	<div>
		<CheckBox>未选择</CheckBox>
		<CheckBox model-value>选择</CheckBox>
		<CheckBox indeterminate>不确定/半选</CheckBox>
		<CheckBox disabled>禁用未选</CheckBox>
		<CheckBox model-value disabled>禁用已选</CheckBox>
		<CheckBox indeterminate disabled>不确定/半选</CheckBox>
	</div>
	<div>
		<CheckBox size="small">未选择</CheckBox>
		<CheckBox size="small" model-value>选择</CheckBox>
		<CheckBox size="small" indeterminate>不确定/半选</CheckBox>
		<CheckBox size="small" disabled>禁用未选</CheckBox>
		<CheckBox size="small" model-value disabled>禁用已选</CheckBox>
		<CheckBox size="small" indeterminate disabled>不确定/半选</CheckBox>
	</div>
</template>
<script setup lang="ts">
import { CheckBox } from "@thestarweb/ui";
</script>
