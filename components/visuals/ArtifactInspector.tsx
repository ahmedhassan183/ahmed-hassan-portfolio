"use client";

import type { Dictionary } from "@/content/types";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export function ArtifactInspector({ path, label, alt, ui }: { path: string; label: string; alt: string; ui: Dictionary["ui"] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function inspect() {
    setZoomed(window.matchMedia("(max-width: 899px)").matches);
    setOpen(true);
    dialog.current?.showModal();
    closeButton.current?.focus();
    if (viewport.current) viewport.current.scrollTo({ left: 0, top: 0, behavior: "instant" });
  }

  return (
    <>
      <a className="artifact-inspect" href={path} target="_blank" rel="noreferrer" ref={trigger} aria-haspopup="dialog" aria-label={`${ui.inspect}: ${label}`} onClick={(event) => { event.preventDefault(); inspect(); }}>
        {ui.inspect} <span aria-hidden="true">↗</span>
      </a>
      <dialog className="artifact-dialog" ref={dialog} aria-labelledby={titleId} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="artifact-dialog-toolbar">
          <h4 id={titleId}>{label}</h4>
          <div className="artifact-dialog-actions">
            <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? ui.fit : ui.zoom}</button>
            <button type="button" ref={closeButton} onClick={() => dialog.current?.close()} aria-label={ui.closeImage}>{ui.close} <span aria-hidden="true">×</span></button>
          </div>
        </div>
        <p className="artifact-inspection-hint">{zoomed ? ui.scrollHint : ui.fitHint}</p>
        <div className={`artifact-inspection-viewport${zoomed ? " is-zoomed" : ""}`} ref={viewport} tabIndex={0} role="region" aria-label={ui.imageRegion} dir="ltr">
          {open && <Image className="artifact-inspection-image" src={path} alt={alt} width={1600} height={1000} sizes={zoomed ? "1600px" : "100vw"} />}
        </div>
      </dialog>
    </>
  );
}
