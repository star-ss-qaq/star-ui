<template>
	<component :is="referenceRender" />

	<teleport
		v-if="popoverMount"
		:to="teleportTo"
		:disabled="!teleportTo || !selfMounted"
	>
		<div
			ref="root"
			:class="[
				'star-ui',
				'star-ui-popper',
				`star-ui-popper--position-${position}`,
				innerVisible ? 'visible' : 'hidden',
				renderAsMobile ? 'mobile' : 'pc',
				...localClass,
				className,
			]"
			:style="{ ...style }"
			@transitionend="handleTransitionEnd"
		>
			<div
				class="star-ui-popper-background"
				v-if="renderAsMobile && maskOnMobile"
			></div>
			<div ref="box" class="star-ui-popper-box">
				<slot></slot>
			</div>
		</div>
	</teleport>
</template>
<script lang="ts" setup>
import {
	cloneVNode,
	computed,
	CSSProperties,
	nextTick,
	onMounted,
	onUpdated,
	reactive,
	ref,
	shallowRef,
	useTemplateRef,
	watch,
} from "vue";
import { useIsMobile } from "../../../context";
import { Placement } from "./type";
import { placementHandleFn, placementMap } from "./utils";
import { getNewIndex } from "../../../utils";

const {
	referenceElement,
	className,
	updatePoseAt = "scroll",
	keepRender = "mounted",
	placement = "right",
	margin = 5,
	allowMobileStyle,
	maskOnMobile,
	trigger = "click",
	position = "absolute",
} = defineProps<{
	referenceElement?: Element | { value: Element } | null;
	className?: string | string[];
	updatePoseAt?: "open" | "scroll";
	teleportTo?: Element | string;
	keepRender?: "allways" | "mounted" | "visible";
	placement?: Placement;
	margin?: number;
	allowMobileStyle?: boolean;
	maskOnMobile?: boolean;
	trigger?: "click" | "none";
	position?: "fixed" | "absolute";
}>();
const visible = defineModel("visible");
const selfMounted = ref(false);
const popoverMount = ref(false);
const innerVisible = ref(false);
const isMobile = useIsMobile();
const renderAsMobile = computed(() => allowMobileStyle && isMobile.value);
onMounted(() => {
	selfMounted.value = true;
	if (keepRender === "allways") {
		popoverMount.value = true;
	}
});
watch([visible, selfMounted, () => keepRender], (_1, _2, onCleanup) => {
	if (selfMounted.value) {
		if (visible.value) {
			const t = () => {
				updatePos();
				innerVisible.value = true;
			};
			style.zIndex = getNewIndex();
			if (popoverMount.value) {
				t();
			} else {
				popoverMount.value = true;
				nextTick(t);
			}
			function click(ev: MouseEvent) {
				if (
					refNode.value === ev.target ||
					(refNode.value?.$el || refNode.value)?.contains(ev.target as any)
				) {
					return;
				}
				if (
					refPopoverBox.value === ev.target ||
					refPopoverBox.value?.contains(ev.target as any)
				) {
					return;
				}
				visible.value = false;
			}
			window.addEventListener("click", click);
			onCleanup(() => window.removeEventListener("click", click));
		} else {
			innerVisible.value = false;
		}
	}
});
function handleTransitionEnd() {
	if (!visible.value && keepRender === "visible") popoverMount.value = false;
}

const slots = defineSlots<{ reference?: any }>();
const refNode = shallowRef<any>();

const referenceRender = () => {
	if (slots.reference) {
		const res = slots.reference({});
		if (res.length !== 1) {
			console.warn(`期望1个子节点，但得到${res.length}个`);
		}
		const prop: any = {
			ref: (ref) => {
				refNode.value = ref;
				const rawRef = res[0].props?.ref;
				if (rawRef) {
					switch (typeof rawRef) {
						case "function":
							rawRef(ref);
							break;
						case "string":
							res[0].ctx.refs[rawRef] = ref;
							break;
						case "object":
							rawRef.value = ref;
							break;
					}
				}
			},
		};
		if (trigger === "click") {
			prop.onClick = (...prop) => {
				visible.value = true;
				return res[0].onClick?.(...prop);
			};
		}
		return cloneVNode(res[0], prop);
	}
	return null;
};

const relReferenceElement = computed(() => {
	if (referenceElement) {
		return referenceElement instanceof Element
			? referenceElement
			: referenceElement.value;
	}
	if (refNode.value) {
		if (refNode.value instanceof HTMLElement) {
			return refNode.value;
		}
		return refNode.value.$el;
	}
});

const refPopoverRoot = useTemplateRef("root");
const refPopoverBox = useTemplateRef("box");

const style = reactive<CSSProperties>({ zIndex: 100 });
const placementType = computed(() => placementMap[placement]);
const localClass = computed(() => {
	return [
		`placement-x-${placementType.value.x}`,
		`placement-y-${placementType.value.y}`,
	];
});
function updatePos() {
	if (
		!relReferenceElement.value ||
		!refPopoverRoot.value ||
		renderAsMobile.value
	) {
		return false;
	}
	const refBox = relReferenceElement.value.getBoundingClientRect();
	const selfBox = refPopoverRoot.value.getBoundingClientRect();
	const offsetBox =
		position === "fixed"
			? { top: 0, left: 0 }
			: !refPopoverRoot.value.offsetParent ||
				  (refPopoverRoot.value.offsetParent === document.body &&
						getComputedStyle(document.body).position === "static")
				? {
						top: -window.scrollY,
						left: -window.scrollX,
					}
				: refPopoverRoot.value.offsetParent.getBoundingClientRect();
	const { x, y } = placementType.value;
	const { style } = refPopoverRoot.value;
	style.top = placementHandleFn[y](
		refBox,
		selfBox,
		offsetBox,
		margin,
		"top",
		"height",
	);
	style.left = placementHandleFn[x](
		refBox,
		selfBox,
		offsetBox,
		margin,
		"left",
		"width",
	);
}
onUpdated((prop) => {
	updatePos();
});

watch(
	[() => updatePoseAt, visible, selfMounted, renderAsMobile],
	(v, old, onCleanup) => {
		if (!visible.value || !selfMounted.value || renderAsMobile.value) return;
		switch (updatePoseAt) {
			case "scroll":
				window.addEventListener("scroll", updatePos, true);
				onCleanup(() => window.removeEventListener("scroll", updatePos, true));
				break;
		}
	},
	{ immediate: true },
);
watch(relReferenceElement, () => {
	updatePos();
});
const emit = defineEmits<{ (name: "out-click", ev: MouseEvent): void }>();
</script>

<style>
.star-ui-popper {
	position: absolute;
	transition: all 0.2s;
	--backgraund-color: var(--star-ui-background-color-primary);
	--border-color: var(--star-ui-border-color-bold);
}
.star-ui-popper--position-fixed {
	position: fixed;
}
.star-ui-popper.hidden {
	pointer-events: none;
	opacity: 0;
}
.star-ui-popper.visible {
	opacity: 1;
}
.star-ui-popper.pc:before {
	content: "";
	pointer-events: none;
	border: 4px solid transparent;
	position: absolute;
}
.star-ui-popper.pc.placement-x-before:before {
	left: 100%;
	border-left-color: var(--border-color);
}
.star-ui-popper.pc.placement-x-start:before {
	left: calc(var(--reference-width, 10px) / 2);
	transform: translateX(-50%);
}
.star-ui-popper.pc.placement-x-center:before {
	left: 50%;
	transform: translateX(-50%);
}
.star-ui-popper.pc.placement-x-end:before {
	right: calc(var(--reference-width, 10px) / 2);
	transform: translateX(50%);
}
.star-ui-popper.pc.placement-x-after:before {
	right: 100%;
	border-right-color: var(--border-color);
}
.star-ui-popper.pc.placement-y-before:before {
	top: 100%;
	border-top-color: var(--border-color);
}
.star-ui-popper.pc.placement-y-start:before {
	top: calc(var(--reference-height, 10px) / 2);
	transform: translateY(-50%);
}
.star-ui-popper.pc.placement-y-center:before {
	top: 50%;
	transform: translateY(-50%);
}
.star-ui-popper.pc.placement-y-end:before {
	bottom: calc(var(--reference-height, 10px) / 2);
	transform: translateY(50%);
}
.star-ui-popper.pc.placement-y-after:before {
	bottom: 100%;
	border-bottom-color: var(--border-color);
}

.star-ui-popper-box {
	border-radius: var(--star-ui-border-radius-base);
	background: var(--backgraund-color);
	border: 1px solid var(--border-color);
}
.star-ui-popper.mobile .star-ui-popper-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	transition: all 0.2s;
}
.star-ui-popper.mobile.hidden .star-ui-popper-box {
	transform: translateY(100%);
}
.star-ui-popper.mobile.visible .star-ui-popper-box {
	transform: translateY(0);
}

.star-ui-popper-background {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
