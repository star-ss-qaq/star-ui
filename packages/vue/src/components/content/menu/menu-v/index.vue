<template>
	<div :class="['star-ui', 'star-ui-menu', 'star-ui-menu-v']">
		<div>
			<span @click="handlePathClick(0)"><span class="star-ui-icon-font star-ui-icon-home" />&gt;</span>
			<span v-for="(item,index) in path" :key="`${index}-${item.path||'nopath'}`" @click="handlePathClick(index+1)">
				{{item.title}}&gt;
			</span>
		</div>
		<div v-for="item in current" :key="item.path" @click="handleItemClick(item)">
			<slot v-bind="item" />
		</div>
	</div>
</template>

<script lang="ts">
import { Register, Prop } from "@ui-root/reg";
import { Vue } from 'vue-class-component';
import { MenuItem } from "@ui-root/types";
import '@ui-root/global-style.css';

@Register({
	name: 'su-h-menu',
	internalOnly:true,
})
export default class SuHMenu extends Vue {
	@Prop({
		type: Array,
		required: true,
	})
	private menu!:MenuItem[];
	private path:MenuItem[]=[];
	private get current():MenuItem[]{
		if(this.path.length == 0){
			return this.menu;
		}
		const item = this.path[this.path.length-1];
		const res = [...(item.children || [])];
		if(item.path){
			res.unshift(item);
		}
		return res;
	}
	private handlePathClick(index:number){
		this.path = this.path.slice(0,index);
	}
	private handleItemClick(item:MenuItem, ev:MouseEvent){
		if(item.children && item.children.length > 0 && (this.path.length==0 || item!=this.path[this.path.length-1])){
			this.path.push(item);
		}
	}
}

</script>
<style>

</style>
