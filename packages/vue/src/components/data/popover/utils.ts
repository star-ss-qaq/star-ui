import { Placement } from "./type";

export const placementHandleFn = {
	before(refBox, selfBox, offsetBox, margin, d1, d2) {
		return `${refBox[d1] - selfBox[d2] - margin - offsetBox[d1]}px`;
	},
	start(refBox, selfBox, offsetBox, margin, d1, d2) {
		return `${refBox[d1] - offsetBox[d1]}px`;
	},
	center(refBox, selfBox, offsetBox, margin, d1, d2) {
		return `${refBox[d1] + refBox[d2] / 2 - selfBox[d2] / 2 - offsetBox[d1]}px`;
	},
	end(refBox, selfBox, offsetBox, margin, d1, d2) {
		return `${refBox[d1] + refBox[d2] - selfBox[d2] - offsetBox[d1]}px`;
	},
	after(refBox, selfBox, offsetBox, margin, d1, d2) {
		return `${refBox[d1] + refBox[d2] + margin - offsetBox[d1]}px`;
	},
} satisfies Record<
	string,
	(
		refBox,
		selfBox,
		offsetBox,
		margin: number,
		d1: "top" | "left",
		d2: "width" | "height",
	) => any
>;

export const placementMap: Record<
	Placement,
	{ x: keyof typeof placementHandleFn; y: keyof typeof placementHandleFn }
> = {
	top: {
		x: "center",
		y: "before",
	},
	"top-start": {
		x: "start",
		y: "before",
	},
	"top-end": {
		x: "end",
		y: "before",
	},
	bottom: {
		x: "center",
		y: "after",
	},
	"bottom-start": {
		x: "start",
		y: "after",
	},
	"bottom-end": {
		x: "end",
		y: "after",
	},
	left: {
		x: "before",
		y: "center",
	},
	"left-start": {
		x: "before",
		y: "start",
	},
	"left-end": {
		x: "before",
		y: "end",
	},
	right: {
		x: "after",
		y: "center",
	},
	"right-start": {
		x: "after",
		y: "start",
	},
	"right-end": {
		x: "after",
		y: "end",
	},
};
