import { computed, ComputedRef, inject, provide, Ref } from "vue";

export const SuViewCtrlInjectKeyIsMobile = Symbol(
	"SuViewCtrlInjectKeyIsMobile",
);
export function useIsMobile() {
	return inject<Ref<boolean> | ComputedRef<boolean>>(
		SuViewCtrlInjectKeyIsMobile,
		computed(() => false),
	);
}
export function pro(p: Ref<boolean> | ComputedRef<boolean>) {
	provide(SuViewCtrlInjectKeyIsMobile, p);
}
