<template>
	<component
		:is="menuComponent"
		:menu="menu"
		class="star-ui su-menu star-ui-menu"
	>
		<template v-slot="data">
			<div @click="handleItemClick(data)">
				<slot v-if="$slots['default']" v-bind="data" />
				<component
					v-else
					:is="displayComponent"
					:[useedKey]="data.path || '#'"
					@click.prevent
				>
					<slot v-if="$slots['menu-text']" name="menu-text" v-bind="data" />
					<template v-else>
						{{ data.title }}
					</template>
				</component>
			</div>
		</template>
	</component>
</template>
<script lang="ts" setup>
defineProps<{}>();
</script>
