import { Inject } from "vue-property-decorator";

export const SuViewCtrlInjectKeyIsMobile=Symbol('SuViewCtrlInjectKeyIsMobile');
export const SuViewCtrlInjectIsMobile = Inject({from:SuViewCtrlInjectKeyIsMobile,default:false});
export const SuViewCtrlInjectKeyClassName=Symbol('SuViewCtrlInjectKeyClassName');
export const SuViewCtrlInjectClassName = Inject({from:SuViewCtrlInjectKeyClassName,default:[]});

export type TypeFormLabelAlign = 'left'|'right'|'top'|undefined;
