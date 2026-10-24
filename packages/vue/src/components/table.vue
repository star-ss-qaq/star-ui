<template>
	<div class="star-ui su-table star-ui-table">
		<table class="star-ui star-ui-table--inner" rules="none" frame="void">
			<thead class="star-ui star-ui-table--inner-thead">
				<tr class="star-ui star-ui-table--inner-tr">
					<th v-for="item in columns" :key="item.name+item.key" class="star-ui star-ui-container star-ui-table--inner-th">{{item.name}}</th>
				</tr>
			</thead>
			<tbody class="star-ui star-ui-table--inner-tbody">
				<tr v-for="(row,index) in data" :key="index" class="star-ui star-ui-table--inner-tr">
					<td v-for="item in columns" :key="item.name+item.key" class="star-ui star-ui-container star-ui-table--inner-td">{{row[item.field]}}</td>
				</tr>
				<slot></slot>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop } from "@ui-root/reg";
import "../global-style.css";


@Register({
	name:"su-table",
	props: {
		data:{
			type:Array,
			default:()=>[]
		}
	}
})
export default class SuTable extends Vue {
	// @Prop({
	// 	type:Array,
	// 	default:()=>[]
	// })
	// data!:any[];
	@Prop({
		type:Array,
		default:()=>[]
	})
	// eslint-disable-next-line
	columns!:any[];
}
</script>

<style>
.star-ui-tabl{
	width: 100%;
}
.star-ui-table--inner-thead{
	background-color: var(--star-ui-table-head-color);
}
.star-ui-table--inner-tr{
	border-bottom: 1px solid #e8eaec;
}
</style>
