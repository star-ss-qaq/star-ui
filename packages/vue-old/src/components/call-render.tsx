import { Vue } from 'vue-class-component';
import { Prop, Register } from "../reg";

@Register({
    name:'call-render',
	internalOnly: true,
})
export default class CallRender extends Vue {
	@Prop({
		type:Function,
	})
    // eslint-disable-next-line
	func!:(...arg:any[])=>any;
	@Prop({
		type:Array,
	})
    // eslint-disable-next-line
	args!:any[];
	render(){
		return this.func(...this.args);
	}
}