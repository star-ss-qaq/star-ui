<template>
	<component
		:is="menuComponent"
		:menu="menu"
		class="star-ui su-menu star-ui-menu"
	>
		<template v-slot="data">
			<div>
				<slot v-if="$slots['item']" v-bind="data" />
				<template v-else-if="data.path">
					<slot v-if="$slots['link']" v-bind="data"></slot>
					<a :href="data.path">
						<slot v-if="$slots['default']" v-bind="data"></slot>
						<template v-else>
							{{ data.title }}
						</template>
					</a>
				</template>
				<slot v-else-if="$slots['default']" v-bind="data"></slot>
				<template v-else>
					{{ data.title }}
				</template>
			</div>
		</template>
	</component>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { MenuItem } from "./types";
import MenuH from "./menu-h/index.vue";
import MenuV from "./menu-v/index.vue";

const { menu, direction } = defineProps<{
	menu: MenuItem[];
	direction: "h" | "v";
}>();

const menuComponent = computed(() => (direction === "h" ? MenuH : MenuV));
</script>
<style>
.star-ui-menu a {
	color: inherit;
	text-decoration: none;
}
</style>
