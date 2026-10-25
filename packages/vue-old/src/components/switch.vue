<template>
	<div :class="['star-ui', 'su-switch','star-ui-switch','star-ui-size-'+size]">
		<label>
			<input ref="input" type="checkbox" :name="name" :checked="modelValue" @change="handeleChange"/>
			<div><span></span></div>
		</label>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Watch } from "vue-property-decorator";
import { Register, Prop, Emit } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-switch"
})
export default class SuInput extends Vue {
	declare $refs:{
		input:HTMLInputElement
	};
	@Prop({
		type:Boolean,
		default:true
	})
	modelValue!:boolean;
	@Prop({
		type:String,
		default:""
	})
	name!:string;
	@Prop({
		type:String,
		default:"medium"
	})
	size!:string;
	@Emit("update:modelValue")
	private handeleChange():boolean{
		const nowChecked = this.$refs.input.checked;
		this.$refs.input.checked = this.modelValue;
		return nowChecked;
	}
	@Watch("modelValue")
	private modelValueChange(newValue:boolean){
		this.$refs.input.checked = newValue;
	}
}
</script>

<style>
.star-ui-switch{
	--size: 20px;
	display: inline-block;
}
.star-ui-switch.star-ui-size-medium{
	--size: calc(var(--star-ui-input-medium-font-size) * 1.2);
}
.star-ui-switch.star-ui-size-mini{
	--size: calc(var(--star-ui-input-mini-font-size) * 1.2);
}
.star-ui-switch input{
	display: none;
}
.star-ui-switch div{
	width: calc(var(--size) * 2.5);
	height: var(--size);
	border: solid 1px var(--star-ui-base-color);
	border-radius: var(--size);
	overflow: hidden;
}
.star-ui-switch div span{
	display: inline-block;
	width: calc(var(--size) - 2px);
	height: calc(var(--size) - 2px);
	border-radius: 50%;
	border: solid 1px var(--star-ui-base-color);
	position: relative;
	background: var(--star-ui-backgorund-color);
	transition: margin-left 0.1s;
}
.star-ui-switch div span::before{
	content: "";
	width: 100px;
	height: 100px;
	background: var(--star-ui-base-color);
	position: absolute;
	right: 50%;
	top:-20px;
	z-index: -1;
}
.star-ui-switch input:checked+div span{
	margin-left: calc(var(--size) * 1.5);
}
</style>