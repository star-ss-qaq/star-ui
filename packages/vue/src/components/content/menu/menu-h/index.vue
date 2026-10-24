<template>
	<div :class="['star-ui', 'star-ui-menu', 'star-ui-menu-h']">
		<su-h-menu-item v-for="item in menu" :key="item.path" :item="item" childDirection="bottom">
			<template v-slot="data">
				<div class="star-ui star-ui-menu--item star-ui-menu-h--item">
					<slot v-bind="data" />
				</div>
			</template>
		</su-h-menu-item>
	</div>
</template>

<script lang="ts">
import { Register, Prop } from "@ui-root/reg";
import { Vue } from 'vue-class-component';
import SuHMenuChild from "./menu-h-child.vue";
import SuHMenuItem from "./menu-h-item.vue";
import { MenuItem } from "@ui-root/types";
import '@ui-root/global-style.css';

@Register({
	name: 'su-h-menu',
	watch:{
		menu(this:SuHMenu){
			this.splitMenu();
		},
	},
	components:{
		SuHMenuChild,
		SuHMenuItem,
	},
	internalOnly:true,
})
export default class SuHMenu extends Vue {
	@Prop({
		type: Array,
		required: true,
	})
	private menu!:MenuItem[];
	private splitMenu(){
		this.displayItem=[...this.menu];
	}
	private displayItem:MenuItem[]=[];
	created():void{
		this.splitMenu();
	}
}

</script>
<style>
.star-ui-menu-h{
	display: flex;
	flex-direction: row;
	overflow: visible;
	position: relative;
	padding: 0;
	white-space: nowrap;
}
.star-ui-menu-h>.star-ui-menu-h--item-box>.star-ui-menu-h--item a{
	line-height: 2;
	border: solid 2px transparent;
	transition: border 0.5s;
	padding: 2px;
}
.star-ui-menu-h>.star-ui-menu-h--item-box:hover>.star-ui-menu-h--item a{
	border-bottom-color: var(--star-ui-base-color);
}
</style>
