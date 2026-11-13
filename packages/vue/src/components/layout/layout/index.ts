import LayoutRaw from "./layout.vue";
import LayoutMain from "./layout-main.vue";
import LayoutDividing from "./layout-dividing.vue";
import LayoutBlock from "./layout-block.vue";

export const Layout = Object.assign(LayoutRaw, {
	Main: LayoutMain,
	Dividing: LayoutDividing,
	Block: LayoutBlock,
});
