import type React from "react";
export function FlagUS(props: React.SVGProps<SVGSVGElement>): React.ReactNode {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h254v258H0z"/><marker id="us-star" markerHeight="30" markerWidth="30"><g transform="scale(.0285)"><path fill="#fff" d="m146 54 36 111h117L204 234l36 111-94-69-95 69 36-111-95-69h117z"/></g></marker><path fill="none" markerMid="url(#us-star)" d="M16 35h237m-208 30h208m-237 29h237m-208 30h208m-237 29h237m-208 29h208m-237 30h237m-208 30h208m-237 29h237"/></svg>;
}
