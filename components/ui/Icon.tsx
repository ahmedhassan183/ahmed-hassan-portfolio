import type { SVGProps } from "react";

type IconName = "arrow" | "download" | "strategy" | "crm" | "pipeline" | "execution" | "growth";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" /></>,
  strategy: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="m12 12 7-7m-1-3v4h4" /></>,
  crm: <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="M6 16c0-3 6-3 6 0m3-7h3m-3 4h3" /></>,
  pipeline: <><path d="M5 5h14M7 12h10M9 19h6M12 5v14" /><circle cx="5" cy="5" r="1" /><circle cx="19" cy="5" r="1" /></>,
  execution: <><rect x="5" y="4" width="14" height="17" rx="3" /><path d="M9 3h6v3H9zm0 11 2 2 4-5" /></>,
  growth: <><path d="M4 18V6m0 12h16M7 14l5-5 4 2 4-6m-5 0h5v5" /></>,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
