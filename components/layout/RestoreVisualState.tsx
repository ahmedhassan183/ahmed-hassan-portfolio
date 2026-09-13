"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/content/types";

export function RestoreVisualState({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    try {
      const raw = sessionStorage.getItem("portfolio-view");
      if (!raw) return;
      const state = JSON.parse(raw);
      if (state.locale !== locale) return;
      sessionStorage.removeItem("portfolio-view");
      for (const entry of document.querySelectorAll<HTMLDetailsElement>(".system-entry")) {
        if (Array.isArray(state.closed) && state.closed.includes(entry.querySelector("summary")?.getAttribute("aria-controls"))) entry.open = false;
      }
      if (typeof state.tab === "string") document.getElementById(state.tab)?.click();
      if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
    } catch { /* Malformed or blocked storage must not affect page rendering. */ }
  }, [locale]);
  return null;
}
