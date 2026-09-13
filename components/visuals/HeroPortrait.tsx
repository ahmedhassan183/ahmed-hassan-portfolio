import { AssetImage } from "@/components/visuals/AssetImage";
import { publicAssetExists } from "@/lib/public-assets";
import type { Dictionary } from "@/content/types";
import { site } from "@/data/site";

export function HeroPortrait({ d }: { d: Dictionary }) {
  return (
    <figure className="portrait-frame" aria-labelledby="portrait-caption">
      <div className="portrait-media">
          <AssetImage
            available={publicAssetExists(site.portrait.src)}
            src={site.portrait.src}
            alt={d.hero.portraitAlt}
            fill
            sizes="(max-width: 480px) calc(100vw - 44px), (max-width: 899px) 480px, (max-width: 1280px) 40vw, 464px"
            className="portrait-image"
            style={{ objectPosition: site.portrait.objectPosition }}
            loading="eager"
            fallback={
          <div className="portrait-placeholder">
            <span className="portrait-placeholder-label">{d.hero.portraitLabel}</span>
            <span className="portrait-monogram" aria-hidden="true">AH<span>.</span></span>
            <span className="portrait-placeholder-note">{d.hero.portraitPending}</span>
            <span className="portrait-asset-filename">ahmed-hassan-hero.png {d.ui.required}</span>
          </div>
            }
          />
        <span className="portrait-sector">{d.hero.sector}</span>
      </div>
      <figcaption className="portrait-caption" id="portrait-caption">
        <span className="portrait-name">{d.name}</span>
        {/* Growth Manager is the official title; the second phrase describes responsibility. */}
        <span className="portrait-role">{d.hero.officialTitle} · <span title={d.hero.responsibilityHint}>{d.hero.responsibility}</span></span>
        <span className="portrait-badge">{d.hero.instructor}</span>
      </figcaption>
    </figure>
  );
}
