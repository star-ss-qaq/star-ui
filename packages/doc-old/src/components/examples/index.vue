<template>
	<div>
		<div v-for="example in list" :key="name+example.name" class="star-ui-container">
			<h4>{{example.name}}</h4>
			<su-v-layout class="example-main">
				<div class="star-ui-container">
					<render-component :example="example"></render-component>
				</div>
				<div>
					<show-code :example="example"></show-code>
				</div>
			</su-v-layout>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import showData from "./datas";
import RenderComponent from "./render-component"
import ShowCode from "./show-code.vue"

import { example } from "./type.d";


@Options({
	components:{
		RenderComponent,
		ShowCode
	},
	props: {
		name:{
			type:String,
			default:""
		},
	}
})
export default class Examples extends Vue {
	name!:string;
	get list():example[]{
		if(this.name in showData){
			return showData[this.name];
		}
		return [];
	}
	mounted(){
		console.log((this as any)._)
	}
}
</script>
<style scoped>
	.example-main{
		border-radius: 5px;
		border: 1px solid #AAA;
	}
</style>