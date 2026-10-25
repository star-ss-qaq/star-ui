export default {
	mounted(el:HTMLElement, cb:any){
		el.addEventListener("mousemove", () => {
			cb.value(true);
		});
		el.addEventListener("mouseout", () => {
			cb.value(false);
		});
	}
}