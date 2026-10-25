<template>
	<div v-if="menu && menu.length>0" :class="['star-ui', 'star-ui-menu--chlild-box', 'star-ui-menu-h--chlild-box', `star-ui-menu-h--chlild-box-${direction}`]">
		<component :is="itemComponent" v-for="item in menu" :key="item.path" :item="item">
			<template v-slot="item">
				<slot v-bind="item" />
			</template>
		</component>
	</div>
</template>

<script lang="ts">
import { Register, Prop } from "@ui-root/reg";
import { Vue } from 'vue-class-component';
import { MenuItem } from "@ui-root/types";
import '@ui-root/global-style.css';

@Register({
	name: 'su-h-menu-child',
	internalOnly: true,
	components:{
		// SuHMenuItem,
	},
})
export default class SuHMenuChild extends Vue {
	@Prop({
		type: Array,
		required: true,
	})
	private menu!:MenuItem[];
	@Prop({})
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private itemComponent!:any;
	@Prop({
		type: String,
	})
	private direction!:'right'|'bottom';
}

</script>
<style>
.star-ui-menu-h--chlild-box{
	position: absolute;
	background-color: var(--star-ui-backgorund-color);
	opacity: 0;
	transition: opacity 0.5s;
	pointer-events: none;
}
*:hover>.star-ui-menu-h--chlild-box{
	display: block;
	opacity: 1;
	pointer-events: auto;
}
.star-ui-menu-h--chlild-box-right{
	left: 100%;
	top:0;
}
.star-ui-menu-h--chlild-box-left{
	right: 100%;
	top:0;
}
.star-ui-menu-h--chlild-box-bottom{
	left: 0;
	top:100%;
}
.star-ui-menu-h--chlild-box{
	border: solid 1px var(--star-ui-line-color);
}
.star-ui-menu-h--chlild-box>.star-ui-menu-h--item-box>.star-ui-menu-h--item{
	border-bottom: solid 1px var(--star-ui-line-color);
}
.star-ui-menu-h--chlild-box>.star-ui-menu-h--item-box:last-child>.star-ui-menu-h--item{
	border-bottom-width: 0;
}
</style>
