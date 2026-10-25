<template>
	<su-modal :visible="visible" @close="close">
		<template v-slot:title>
			{{title}}
		</template>
		<template v-slot:footer>
			<su-button @click="confirm">确认</su-button>
			<su-button @click="close">取消</su-button>
		</template>
	</su-modal>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Register, Prop, Emit } from "@ui-root/reg";
import SuModal from "./modal.vue";
import {SuButton} from "@ui-root/main";

@Register({
	name:"su-modal-confirm",
	components:{
		SuModal,
		SuButton
	},
	hideInDoc: true,
})
export default class SuModalConfirm extends Vue {
	@Prop({
		type: String,
	})
	private readonly title!:string|undefined;
	@Prop({
		type: Boolean,
	})
	private readonly visible!:boolean|undefined;
	@Emit()
	private close(){
		return 1;
	}
	@Emit()
	private confirm(){
		return 1;
	}
}
</script>
