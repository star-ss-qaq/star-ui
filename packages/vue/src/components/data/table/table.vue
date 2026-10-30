<template>
	<div class="star-ui su-table star-ui-table">
		<table class="star-ui star-ui-table--inner" rules="none" frame="void">
			<thead class="star-ui star-ui-table--inner-thead">
				<tr class="star-ui star-ui-table--inner-tr">
					<th
						v-for="item in columns"
						:key="item.key"
						class="star-ui star-ui-container star-ui-table--inner-th"
					>
						<slot
							v-if="$slots[`header_${item.key}`]"
							:name="`header_${item.key}`"
							:column="item"
						/>

						<template v-else-if="typeof item.header === 'string'">
							{{ item.header }}
						</template>
						<template v-else-if="!item.header">
							{{ item.key }}
						</template>
						<component v-else :is="item.header" :column="item" />
					</th>
				</tr>
			</thead>
			<tbody class="star-ui star-ui-table--inner-tbody">
				<tr
					v-for="(record, index) in data"
					:key="getRecordKey(record, index)"
					class="star-ui star-ui-table--inner-tr"
				>
					<td
						v-for="item in columns"
						:key="item.key"
						class="star-ui star-ui-container star-ui-table--inner-td"
					>
						<slot
							v-if="$slots[`render_${item.key}`]"
							:name="`render_${item.key}`"
							:record="record"
							:index="index"
							:column="item"
						/>
						<component
							v-if="item.render"
							:is="item.render"
							:record="record"
							:index="index"
							:column="item"
						/>
						<template v-else>{{ record[item.key] }}</template>
					</td>
				</tr>
				<slot></slot>
			</tbody>
		</table>
	</div>
</template>
<script setup lang="ts" generic="T">
import { computed } from "vue";
import { TableColumn } from "./types";
import { getObjectKeyFn, ObjectKeyProp } from "../../../utils";

const { data, columns, recordKey } = defineProps<{
	data: T[];
	columns: TableColumn<T>[];
	recordKey?: ObjectKeyProp<T>;
}>();
const getRecordKey = computed(
	() => getObjectKeyFn(recordKey) || ((record, index) => `record_${index}`),
);
</script>

<style>
.star-ui-table {
	width: 100%;
}
.star-ui-table--inner-thead {
	background-color: var(--star-ui-table-head-color);
}
.star-ui-table--inner-tr {
	border-bottom: 1px solid #e8eaec;
}
</style>
