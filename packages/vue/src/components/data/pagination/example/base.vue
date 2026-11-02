<template>
	<Pagination :total="23" :page-size="10" v-model:page="page" />
	<Pagination :total="233" :page-size="10" v-model:page="page" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import Pagination from "../pagination.vue";
const page = ref(1);
</script>
