import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/content/types";

export function Experience({ d }: { d: Dictionary }) {
  const salesJourney = d.experience.journey;
  const solarDomains = d.experience.domains;
  return (
    <section id="experience" className="experience portfolio-section" aria-labelledby="experience-heading" tabIndex={-1}>
      <Container>
        <div className="experience-intro">
          <SectionLabel>{d.experience.label}</SectionLabel>
          <h2 id="experience-heading" className="section-heading">{d.experience.heading}</h2>
          <p className="experience-periods"><span><bdi>{d.experience.periods[0].organization}</bdi> · <bdi>{d.experience.periods[0].dates}</bdi></span><span aria-hidden="true">→</span><span><bdi>{d.experience.periods[1].organization}</bdi> · <bdi>{d.experience.periods[1].dates}</bdi></span></p>
        </div>
        <ol className="sales-journey">
          {salesJourney.map((step, index) => (
            <li key={step.title} className={index > 2 ? "journey-step journey-step--solar" : "journey-step"}>
              <span className="journey-number" aria-hidden="true">0{index + 1}</span>
              <div className="journey-role">
                <h3>{step.title}</h3>
                <p>{step.organization}</p>
              </div>
              <div className="journey-focus">
                {"responsibility" in step && <p className="journey-responsibility">{step.responsibility}</p>}
                <p>{step.focus}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="solar-domain" aria-labelledby="solar-domain-heading">
          <h3 id="solar-domain-heading">{d.experience.solarLabel}</h3>
          <ul>{solarDomains.map((domain) => <li key={domain}>{domain}</li>)}</ul>
        </aside>
        <aside className="training-note" aria-label={d.experience.training.label}>
          <h3>{d.experience.training.label}</h3>
          <p>{d.experience.training.description}</p>
        </aside>
      </Container>
    </section>
  );
}
