//布局
export { default as SuHLayout } from "./components/layout-h.vue";
export { default as SuVLayout } from "./components/layout-v.vue";
export { default as SuMain } from "./components/layout-main.vue";
export { default as SuTable } from "./components/table.vue";
export { default as SuHLine } from "./components/line-h.vue";
export { default as SuVLine } from "./components/line-v.vue";
export { default as SuCard } from "./components/card.vue";
export { default as SuTree } from "./components/tree/index.vue";
//表单
export * from "./components/form";
export { default as SuInput } from "./components/input.vue";
export { default as SuSelect } from "./components/select.vue";
export { default as SuButton } from "./components/button.vue";
export { default as SuSwitch } from "./components/switch.vue";
export { default as SuSlider } from "./components/slider.vue";


export { default as SuCalendar } from "./components/calendar.vue";

export { default as SuViewControl } from "./components/view-control.vue";

export * from "./components/layout"
export * from "./components/content";

export * as func from "./func/index";

import { data } from "./reg";
export * from "./outher";

import { App, readonly } from "vue";

// eslint-disable-next-line
export const components:Record<string,any>={};
Object.keys(data).map((key) => {
	if(data[key].component&&!data[key].internalOnly){
		components[key]=data[key].component;
	}
});
export const allData = readonly(data);

const registComponents=function(app:App):void{
	Object.keys(data).map((key) => {
		if(data[key].component&&!data[key].internalOnly){
			app.component(components[key].__o.name,components[key]);
		}
	});
}
export const infos = readonly(data);
export default {
	...components,
	components,
	install(app:App):void{
		registComponents(app)
		app.config.globalProperties
	}
}