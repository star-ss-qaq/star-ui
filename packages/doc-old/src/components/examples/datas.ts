import SuHLayout from "./h-layout";
import SuVLayout from "./v-layout";
import SuAutoDirection from "./auto-direction";
import SuMain from "./main";
import SuHLine from "./h-line";
import SuVLine from "./v-line";
import SuCard from "./card";
import SuInput from "./input";
import SuSlider from "./slider"

import SuForm from './form/form'
import SuSelect from "./select";
import SuSwitch from "./switch";
import SuButton from "./button";
import SuTable from "./table";
import SuTree from "./tree";
import SuCalendar from "./calendar";
import SuHMenu from "./h-menu";
import SuContextMenuBox from './context-menu-box';
import SuPage from './page';
import SuModal from './modal'

import SuViewControl from "./view-control";
import { example } from "./type.d";

interface ExamplesObj {
	[key: string]: example[],
}

export default {
	"su-h-layout":SuHLayout,
	"su-v-layout":SuVLayout,
	"su-auto-direction":SuAutoDirection,
	"su-main":SuMain,
	"su-h-line":SuHLine,
	"su-v-line":SuVLine,
	"su-card":SuCard,
	"su-input":SuInput,
	"su-slider":SuSlider,
	"su-form":SuForm,
	"su-select":SuSelect,
	"su-button":SuButton,
	"su-switch":SuSwitch,
	"su-table":SuTable,
	"su-tree":SuTree,
	"su-calendar":SuCalendar,
	"su-view-control":SuViewControl,
	"su-menu":SuHMenu,
	"su-context-menu-box":SuContextMenuBox,
	"su-page":SuPage,
	"su-modal":SuModal
}as ExamplesObj;
