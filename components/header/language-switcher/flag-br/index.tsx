import type React from "react";
export function FlagBR(props: React.SVGProps<SVGSVGElement>): React.ReactNode {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}><path fill="#009b3a" d="M0 0h640v480H0z"/><path fill="#fedf00" d="m320 82 274 158-274 158L46 240z"/><circle cx="320" cy="240" r="106" fill="#002776"/><path stroke="#fff" strokeWidth="18" d="M228 276c38-34 94-43 147-23"/></svg>;
}
