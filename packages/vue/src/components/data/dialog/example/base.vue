<template>
	<Button @click="open = true">打开</Button>
	<Dialog v-model="open"> 你好<Select :options="[]" /> </Dialog>
</template>
<script setup lang="ts">
import { Button, Dialog, Select } from "@thestarweb/ui";
import { ref } from "vue";
const open = ref(false);
</script>
