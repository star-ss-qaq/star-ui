import { createCommentVNode as e, createElementBlock as t, createElementVNode as n, createSlots as r, createVNode as i, defineComponent as a, guardReactiveProps as o, normalizeProps as s, openBlock as c, ref as l, renderSlot as u, resolveComponent as d, withCtx as f } from "vue";
// src/components/page/index.vue?vue&type=script&setup=true&lang.ts
var p = { class: "star-ui su-page" }, m = { class: "su-ui su-page--header" }, h = {
	key: 1,
	class: "su-page--menu-box"
}, g = { class: "su-ui su-page--main" }, _ = /* @__PURE__ */ a({
	__name: "index",
	props: { menu: {} },
	setup(a) {
		return l(!1), (l, _) => {
			let v = d("su-menu");
			return c(), t("div", p, [
				n("header", m, [
					e("", !0),
					u(l.$slots, "header"),
					(c(), t("div", h, [i(v, {
						menu: a.menu,
						direction: "h"
					}, r({ _: 2 }, [l.$slots.menu ? {
						name: "default",
						fn: f((e) => [u(l.$slots, "menu", s(o(e)))]),
						key: "0"
					} : l.$slots["menu-text"] ? {
						name: "menu-text",
						fn: f((e) => [u(l.$slots, "text", s(o(e)))]),
						key: "1"
					} : void 0]), 1032, ["menu"])]))
				]),
				n("main", g, [u(l.$slots, "default")]),
				e("", !0)
			]);
		};
	}
});
export { _ as Page };
