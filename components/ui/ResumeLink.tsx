import type { Dictionary } from "@/content/types";
import { site } from "@/data/site";
import { Icon } from "./Icon";

export function ResumeLink({ compact = false, copy, available }: { compact?: boolean; copy: Dictionary["ui"]; available: boolean }) {
  const className = `button button--secondary resume-link ${compact ? "button--small" : ""}`;

  if (available) {
    return <a href={site.resumeUrl} className={className} download={site.resumeFilename}>{copy.resume} <Icon name="download" /></a>;
  }

  return (
    <span className="resume-control">
      <button type="button" className={className} aria-disabled="true" aria-label={copy.resumeUnavailable}>
        {copy.resume} <Icon name="download" />
      </button>
      <span className="resume-tooltip" role="tooltip">{copy.resumeSoon}</span>
    </span>
  );
}
