<template>
	<div :class="['star-ui', 'star-ui-pagination', 'su-pagination']">
		<Button :disabled="page <= 1" :href="getUrl(1)" @click="page = 1">
			&lt;&lt;
		</Button>
		<Button :disabled="page <= 1" :href="getUrl(page - 1)" @click="page--">
			&lt;
		</Button>
		<Button
			class="star-ui-pagination--button"
			v-if="showRange[0] > 0"
			:href="getUrl(1)"
			@click="page = 1"
		>
			1
		</Button>
		<span v-if="showRange[0] > 1">...</span>
		<Button
			class="star-ui-pagination--button"
			v-for="i in showRange[1]"
			:theme="showRange[0] + i === page ? 'primary' : 'default'"
			:href="getUrl(showRange[0] + i)"
			@click="page = showRange[0] + i"
		>
			{{ showRange[0] + i }}
		</Button>
		<span v-if="showRange[0] + showRange[1] + 1 < maxPage">...</span>
		<Button
			class="star-ui-pagination--button"
			v-if="showRange[0] + showRange[1] < maxPage"
			:href="getUrl(maxPage)"
			@click="page = maxPage"
		>
			{{ maxPage }}
		</Button>
		<Button
			:disabled="page >= maxPage"
			:href="getUrl(page + 1)"
			@click="page++"
		>
			&gt;
		</Button>
		<Button
			:disabled="page >= maxPage"
			:href="getUrl(maxPage)"
			@click="page = maxPage"
		>
			&gt;&gt;
		</Button>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { Size } from "../../../types";
import { Button } from "../../base/button";

const {
	total,
	size = "medium",
	pagerCont = 5,
	url,
} = defineProps<{
	total: number;
	size?: Size;
	pagerCont?: number;
	url?: string | ((page: number, pageSize: number) => string);
}>();
const pageSize = defineModel<number>("pageSize", { required: true });
const page = defineModel<number>("page", { required: true });
const maxPage = computed(() => Math.max(1, Math.ceil(total / pageSize.value)));
function getUrl(page) {
	if (url) {
		if (typeof url === "string") {
			return url
				.replace(
					/:(?:pageSize|page-size|page_size)((\W|$))/,
					`${pageSize.value}$1`,
				)
				.replace(/:page(\W|$)/, `${page}$1`);
		}
		return url(page, pageSize.value);
	}
}
const showRange = computed(() => {
	if (maxPage.value <= pagerCont) {
		return [0, maxPage.value];
	}
	const t = Math.ceil(pagerCont / 2);
	if (page.value < t) {
		return [0, pagerCont];
	}
	if (page.value > maxPage.value - t) {
		return [maxPage.value - pagerCont, pagerCont];
	}
	return [page.value - t, pagerCont];
});
</script>
<style>
.star-ui-pagination {
	display: flex;
	flex-direction: row;
	gap: var(--star-ui-default-padding);
}
.star-ui-pagination--button {
	width: 2em;
}
</style>
