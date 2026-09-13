"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Dictionary, Locale } from "@/content/types";

type Theme = "light" | "dark" | "system";
function readTheme(): Theme {
  const value = document.documentElement.dataset.themePreference;
  return value === "light" || value === "dark" ? value : "system";
}
function subscribe(update: () => void) {
  window.addEventListener("portfolio-theme", update);
  return () => window.removeEventListener("portfolio-theme", update);
}
function applyTheme(value: Theme) {
  document.documentElement.dataset.themePreference = value;
  document.documentElement.dataset.theme = value === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : value;
  window.dispatchEvent(new Event("portfolio-theme"));
}

export function Preferences({ copy, locale }: { copy: Dictionary["nav"]; locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  useEffect(() => {
    // A recovered error boundary can mount the root without executing its
    // inline script. Restore the saved preference in that case as well.
    if (!document.documentElement.dataset.theme) {
      let saved: Theme = "system";
      try { const value = localStorage.getItem("portfolio-theme"); if (value === "light" || value === "dark") saved = value; } catch { /* System theme remains available. */ }
      applyTheme(saved);
    }
    const media = matchMedia("(prefers-color-scheme: dark)");
    const change = () => { if (readTheme() === "system") applyTheme("system"); };
    const storage = (event: StorageEvent) => {
      if (event.key === "portfolio-theme") applyTheme(event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system");
    };
    media.addEventListener("change", change);
    window.addEventListener("storage", storage);
    return () => { media.removeEventListener("change", change); window.removeEventListener("storage", storage); };
  }, []);

  return <div className="preferences">
    <label className="theme-control">
      <span aria-hidden="true">◐</span>
      <span className="sr-only">{copy.theme}</span>
      <select aria-label={copy.theme} value={theme} onChange={(event) => {
        const value = event.target.value as Theme;
        try { localStorage.setItem("portfolio-theme", value); } catch { /* Preference still works when storage is unavailable. */ }
        applyTheme(value);
      }}>
        <option value="system">{copy.system}</option><option value="light">{copy.light}</option><option value="dark">{copy.dark}</option>
      </select>
    </label>
    <div className="language-control" role="group" aria-label={copy.language} dir="ltr">
      {(["en", "ar"] as const).map((language) => <a key={language} href={`/${language}`} hrefLang={language} lang={language} aria-current={locale === language ? "page" : undefined} onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        document.cookie = `portfolio-locale=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
        if (locale === language) { event.preventDefault(); return; }
        try {
          sessionStorage.setItem("portfolio-view", JSON.stringify({ locale: language, closed: Array.from(document.querySelectorAll<HTMLDetailsElement>(".system-entry:not([open])")).map((entry) => entry.querySelector("summary")?.getAttribute("aria-controls")), tab: document.querySelector('[role="tab"][aria-selected="true"]')?.id }));
        } catch { /* Navigation does not depend on storage. */ }
        // A native document navigation runs the pre-paint theme script for the
        // new document language and direction, while retaining its section.
        event.currentTarget.href = `/${language}${window.location.hash}`;
      }}>{language.toUpperCase()}</a>)}
    </div>
  </div>;
}
