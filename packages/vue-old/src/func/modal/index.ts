import { createVNode, render, VNode } from 'vue';
import { SuModal,SuModalConfirm,SuViewControl } from '@ui-root/main';

type PWidthClose = Promise<boolean>&{close: () => void};
export function confirm(title: string):PWidthClose{
	let vnode:VNode;
	const p:Promise<boolean>&{
		close?: () => void;
	} = new Promise<boolean>((resolve) => {
		const dom = document.createElement("div");
		vnode = createVNode(SuModalConfirm, {
			visible: true,
			title,
			onClose: () => {
				if(vnode.props) vnode.props.visible = false;
				render(null, dom);
				resolve(false);
			},
			onConfirm: () => {
				render(null, dom);
				resolve(true);
			}
		});
		
		render(createVNode(SuViewControl, {}, () => vnode), dom);
	});
	p.close = () => (vnode.component as any).proxy.close();
	return p as PWidthClose;
}
export function modal(slots:{
	title?: string|VNode|(() => VNode|string);
	body?: string|VNode|(() => VNode|string);
	footer?: string|VNode|(() => VNode|string);
}|VNode|string|(() => VNode|string), controlProp = {}, defalueShow = true){
	const sendSlots:Record<string, () => VNode|string> = {};
	if(typeof slots === 'function'){
		sendSlots.default = slots;
	} else if(typeof slots === 'string' || 'type' in slots) {
		sendSlots.default = () => slots;
	} else {
		const map = {
			body: 'defalut',
		}
		Object.keys(slots).forEach((key) => {
			const fn = typeof slots[key as keyof typeof slots];
			sendSlots[key in map ? map[key as keyof typeof map] : key] = typeof fn === "function" ? fn : () => fn;
		})
	}
	const dom = document.createElement("div");
	const vnode = createVNode(
		SuModal,
		{
			'onUpdate:visable': (value: boolean) => {
				if (value) {
					//
				} else {
					render(null, dom);
				}
			}
		},
		sendSlots,
	);
	render(createVNode(SuViewControl, controlProp, () => vnode), dom);

	if (defalueShow) {
		(vnode.component as any).proxy.show();
	}

	return {
		close: () => (vnode.component as any).proxy.close()
	};
}