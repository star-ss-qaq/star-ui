<template>
	<div class="star-ui star-ui-menu--item-box star-ui-menu-h--item-box">
		<!-- <div class="star-ui star-ui-menu--item star-ui-menu-h--item" @click="handleItemClick(item)">
			<slot v-bind="item" />
		</div> -->
		<slot v-bind="item" />
		<su-h-menu-child :menu="item.children || []" :itemComponent="selfClass" :direction="childDirection">
			<template v-slot="item">
				<slot v-bind="item" />
			</template>
		</su-h-menu-child>
	</div>
</template>

<script lang="ts">
import { Register, Prop, Emit } from "@ui-root/reg";
import { Vue } from "vue-class-component";
import SuHMenuChild from "./menu-h-child.vue";
import isFocus from "@ui-root/directives/is-focus";
import { MenuItem } from "@ui-root/types";
import '@ui-root/global-style.css';

@Register({
	name: 'su-h-menu-item',
	internalOnly: true,
	components:{
		SuHMenuChild,
	},
	directives:{
		isFocus,
	}
})
export default class SuHMenuItem extends Vue {
	isFocus=false;
	@Prop({
		type: Object,
	})
	private item!:MenuItem;
	private selfClass = SuHMenuItem;
	@Prop({
		type: String,
		default:'right',
	})
	private childDirection!:'right'|'bottom';
}
</script>
<style>
.star-ui-menu-h--item-box{
	height: 100%;
	overflow: visible;
	position: relative;
	padding: 0;
	transition: background-color 0.5s;
}
.star-ui-menu-h--item-box:hover{
	background-color: rgba(128,128,128,0.4);
}
.star-ui-menu-h--item{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center; 
	height: 100%;
	padding: 8px;
}
</style>
