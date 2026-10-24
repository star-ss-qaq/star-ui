import { Vue } from "vue-class-component";

export function getParentNodeByClass(node:HTMLElement,className:string):HTMLElement|null{
	let p:HTMLElement|null = node;
	while(p){
		if(p.className&&p.className.split(" ").indexOf(className)!=-1){
			return p;
		}
		p=p.parentElement;
	}
	return null;
}

export function isMobile(vue:Vue):boolean{
	const node = getParentNodeByClass(vue.$el,"su-view-control");
	if(node){
		// eslint-disable-next-line
		const ctrl = (node as any)._vue;
		if(ctrl){
			return ctrl.$isMobile;
		}
	}
	return false;
}