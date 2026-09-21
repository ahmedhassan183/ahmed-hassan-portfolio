import { Fragment } from "react";
import type { Dictionary } from "@/content/types";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { CommercialFlow } from "@/components/visuals/CommercialFlow";
import { HeroPortrait } from "@/components/visuals/HeroPortrait";
import { publicAssetExists } from "@/lib/public-assets";
import { site } from "@/data/site";

const delay = (value: number) => ({ "--delay": `${value}ms` }) as CSSProperties;

export function Hero({ d }: { d: Dictionary }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-content">
            <p className="eyebrow entrance" style={delay(60)}><span className="section-marker" aria-hidden="true" />{d.hero.eyebrow}<span className="eyebrow-detail">{d.hero.eyebrowDetail}</span></p>
            <h1 id="hero-heading" className="entrance" style={delay(120)}>{d.hero.before}<span className="headline-accent">{d.hero.accent}</span>{d.hero.after}</h1>
            <p className="hero-description entrance" style={delay(200)}>{d.hero.description}</p>
            <div className="hero-actions entrance" style={delay(280)}>
              <Button href="#sales">{d.hero.explore} <Icon name="arrow" /></Button>
              <ResumeLink copy={d.ui} available={publicAssetExists(site.resumeUrl)} />
            </div>
            <a className="talk-link entrance" style={delay(340)} href="#contact">{d.hero.talk} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-visual entrance" style={delay(400)}>
            <HeroPortrait d={d} />
            <CommercialFlow copy={d.hero} />
          </div>
        </div>
        <div className="hero-baseline entrance" style={delay(460)}>
          <span className="baseline-label">{d.hero.approach}</span>
          <p>{d.hero.steps.map((step, index) => <Fragment key={step}>{index > 0 && <> <span aria-hidden="true">→</span> </>}{step}</Fragment>)}</p>
          <span className="baseline-note">{d.hero.note}</span>
        </div>
        <ul className="commercial-proof" aria-label={d.hero.proofLabel}>
          {d.hero.proof.map((item) => <li key={item.value}><strong><bdi>{item.value}</bdi></strong><span>{item.label}</span></li>)}
        </ul>
      </Container>
    </section>
  );
}
