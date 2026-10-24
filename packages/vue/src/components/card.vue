<template>
	<div class="star-ui su-card star-ui-card">
		<div v-if="title!=''||collapsible||this.$slots.title" class="star-ui star-ui-container star-ui-card--inner-head">
			<div class="star-ui star-ui-card--inner-title">{{title}}</div>
			<button v-if="collapsible" :class="['star-ui','star-ui-card--inner-button-collapsible',isCollaps?'show':'hidden']" @click="collapsChange"></button>
		</div>
		<div ref="body" class="star-ui star-ui-card--inner-body" @transitionend="handleTransitionEnd">
			<div ref="bodyInner" class="star-ui star-ui-container star-ui-card--inner-body-inner">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop, Register } from "@ui-root/reg";
import "../global-style.css";
import VLayout from "./layout-v.vue";
import HLayout from "./layout-h.vue";
import SuMain from "./layout-main.vue";


@Register({
	name:"su-card",
	components:{
		VLayout,
		HLayout,
		SuMain
	}
})
export default class SuCard extends Vue {
	declare $refs: {
		body:HTMLDivElement
		bodyInner:HTMLDivElement
	};
	@Prop({
		type:String,
		default:""
	})
	readonly title!:string;
	@Prop({
		type:Boolean,
		default:false
	})
	readonly collapsible!:boolean;
	isCollaps=false;
	collapsChange():void{
		const realHeight=this.$refs.bodyInner.clientHeight;
		if(this.isCollaps){
			this.$refs.body.style.height=realHeight+"px";
		}else{
			this.$refs.body.style.height=realHeight+"px";//需要先设置一个高度才能应用过渡动画
			setTimeout(()=>this.$refs.body.style.height="0",0);//0秒定时器用于将两个高度设置都能被浏览器读取
		}
		this.isCollaps=!this.isCollaps;
	}
	handleTransitionEnd():void{
		if(!this.isCollaps){
			//动画播放完之后取消掉高度限制
			this.$refs.body.style.height="";
		}
	}
}
</script>

<style>
.star-ui-card{
	border: 1px solid var(--star-ui-line-color);
	border-radius: var(--star-ui-border-radius);
	display: flex;
	flex-direction: column;
}
.star-ui-card--inner-head{
	display: flex;
	flex-direction: row;
}
.star-ui-card--inner-title{
	flex-grow: 1;
}
.star-ui-card--inner-button-collapsible{
	width: 0;
	height: 0;
	margin: 2px;
	padding: 10px;
	/*background: #88f;*/
	border-radius: 50%;
	border: 1px solid var(--star-ui-line-color);
	display: inline-block;
	float: right;
}
.star-ui-card--inner-button-collapsible:after{
	content: " ";
	width: 0;
	height: 0;
	padding: 0;
	/*margin-left: -5px !important;
	margin-top: -2.5px !important;*/
	left: 5px;
	top:8px;
	position: absolute;
	border-color: var(--star-ui-line-color);
	border-style: solid;
	border-right: solid 5px transparent;
	border-left: solid 5px transparent;
	transition: border-top-width 0.5s, border-bottom-width 0.5s;
}
.star-ui-card--inner-button-collapsible.hidden:after{
	/*border-bottom: solid 5px #ccf;*/
	border-bottom-width: 5px;
	border-top-width: 0;
}
.star-ui-card--inner-button-collapsible.show:after{
	/*border-top: solid 5px #ccf;*/
	border-top-width: 5px;
	border-bottom-width: 0;
}
.star-ui-card--inner-body{
	flex-grow: 1;
	overflow: hidden;
	transition: height 0.5s;
}
.star-ui-card--inner-body-inner{
	overflow: auto;
}
</style>
