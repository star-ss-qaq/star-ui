<template>
	<div :class="['star-ui', 'su-input','star-ui-input',{'is-focus':isFocused}]">
		<input type="text" ref="input" :value="modelValue" :name="name" :class="['star-ui','star-ui-input--inner','star-ui-size-'+size]" @input.stop="handleInput" @focus="handleFocus" @blur="handleBlur">
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop, Emit } from "@ui-root/reg";
import "../global-style.css";

@Register({
	name:"su-input"
})
export default class SuInput extends Vue {
	@Prop({
		type:[String,Number],
		default:""
	})
	modelValue!:string|number;
	declare $refs:{
		input:HTMLInputElement,
	};
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
	isFocused=false;
	@Emit("update:modelValue")
	emitInput(data:string):string{
		return data;
	}
	handleInput(event:InputEvent):void{
		if(event.target){
			var target=event.target as HTMLInputElement;
			this.$emit("update:modelValue",target.value);
			this.emitInput(target.value)
			this.$nextTick(()=>target.value=(this.modelValue as string));//数字会自动转换成字符串
			// return target.value;
		}
		// return "";
	}
	@Emit("focus")
	private  handleFocus():void{
		this.isFocused=true;
	}
	@Emit("blur")
	private handleBlur():void{
		this.isFocused=false;
	}
	public focus():void{
		this.$refs.input.focus();
	}
	public blur():void{
		this.$refs.input.blur();
	}
}
</script>

<style>
.star-ui-input{
	display: inline-flex;
	border: solid 1px var(--star-ui-input-border-color);
	border-radius: var(--star-ui-border-radius);
	flex-direction: row;
	width:var(--star-ui-input-default-width);
	overflow: hidden;
	color: var(--star-ui-regular-text-color);
	background: var(--star-ui-backgorund-color);
}
.star-ui-input:hover,.star-ui-input.is-focus{
	border: solid 1px var(--star-ui-base-color);
}
.star-ui-input--inner,.star-ui-input--inner:hover,.star-ui-input--inner:active,.star-ui-input--inner:focus{
	border-width: 0px;
	outline: none;
	margin: 0;
	flex:1;
	color: unset;
	background: unset;
	width: 100%;
}
</style>
