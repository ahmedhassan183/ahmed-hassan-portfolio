"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/content/types";
import { Preferences } from "./Preferences";
import { Container } from "./Container";
import { ResumeLink } from "@/components/ui/ResumeLink";

export function Navbar({ d, locale, resumeAvailable }: { d: Pick<Dictionary, "name" | "nav" | "ui">; locale: Locale; resumeAvailable: boolean }) {
  const navigation = d.nav.items;
  const homePrefix = usePathname() === `/${locale}` ? "" : `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className={`site-header ${scrolled ? "is-scrolled" : ""}`} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <Container className="nav-bar">
        <a href={`${homePrefix}#top`} className="brand" aria-label={`${d.name}, ${d.nav.home}`} onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">AH<span>.</span></span>
          <span>{d.name}</span>
        </a>
        <nav aria-label={d.nav.main} className="desktop-nav">
          {navigation.map((item) => <a key={item.href} href={`${homePrefix}${item.href}`}>{item.label}</a>)}
        </nav>
        <div className="desktop-preferences"><Preferences copy={d.nav} locale={locale} /></div>
        <div className="desktop-resume"><ResumeLink compact copy={d.ui} available={resumeAvailable} /></div>
        <button ref={toggle} className={`menu-toggle ${open ? "is-open" : ""}`} aria-label={open ? d.nav.close : d.nav.open} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </Container>
      <nav id="mobile-navigation" aria-label={d.nav.mobile} className="mobile-nav" hidden={!open}>
        <Container>
          {navigation.map((item, index) => <a key={item.href} href={`${homePrefix}${item.href}`} onClick={() => setOpen(false)}><span className="nav-index" aria-hidden="true">0{index + 1}</span>{item.label}<span className="nav-arrow" aria-hidden="true">↗</span></a>)}
          <Preferences copy={d.nav} locale={locale} />
          <ResumeLink copy={d.ui} available={resumeAvailable} />
        </Container>
      </nav>
    </header>
  );
}
