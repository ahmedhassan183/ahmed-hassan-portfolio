"use client";

import type { Dictionary, Locale } from "@/content/types";
import { useRef, useState, type ReactNode, type KeyboardEvent } from "react";

type GalleryItem = { path: string; label: string; panel: ReactNode };

export function ArtifactGallery({ items, ui, locale }: { items: GalleryItem[]; ui: Dictionary["ui"]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLAnchorElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    let next: number;
    const forward = locale === "ar" ? "ArrowLeft" : "ArrowRight";
    const backward = locale === "ar" ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward) next = (index + 1) % items.length;
    else if (event.key === backward) next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === " ") next = index;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className="artifact-gallery">
      <div className="artifact-gallery-panels">
        {items.map((item, index) => (
          <div key={item.path} id={`solar-artifact-panel-${index}`} role="tabpanel" aria-labelledby={`solar-artifact-tab-${index}`} tabIndex={0} hidden={active !== index} className="artifact-gallery-panel">
            {item.panel}
          </div>
        ))}
      </div>
      <div className="artifact-tabs" role="tablist" aria-label={ui.gallery}>
        {items.map((item, index) => (
          <a key={item.path} href={item.path} target="_blank" rel="noreferrer" role="tab" id={`solar-artifact-tab-${index}`} aria-controls={`solar-artifact-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            ref={(element) => { tabs.current[index] = element; }}
            onKeyDown={(event) => navigate(event, index)}
            onClick={(event) => { event.preventDefault(); setActive(index); }}>
            <span className="artifact-tab-index" aria-hidden="true">0{index + 1}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
      <noscript>
        <div className="artifact-direct-links">
          {items.map((item) => <a key={item.path} href={item.path} target="_blank" rel="noreferrer">{item.label} ↗</a>)}
        </div>
      </noscript>
    </div>
  );
}
