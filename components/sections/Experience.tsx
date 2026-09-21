import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/content/types";

export function Experience({ d }: { d: Dictionary }) {
  const salesJourney = d.experience.journey;
  const solarDomains = d.experience.domains;
  const training = d.experience.training;
  const partnership = d.experience.partnership;
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
        <aside className="training-note evidence-block" aria-labelledby="training-heading">
          <div className="evidence-intro">
            <h3 id="training-heading">{training.label}</h3>
            <p>{training.description}</p>
          </div>
          <div className="enablement-steps">
            {training.steps.map((step) => <div key={step.label}><strong>{step.label}</strong><p>{step.description}</p></div>)}
          </div>
          <p className="enablement-outcome"><strong>{training.outcome}</strong></p>
        </aside>
        <aside className="partnership-evidence evidence-block" aria-labelledby="partnership-heading">
          <div className="evidence-intro">
            <p className="evidence-label">{partnership.label}</p>
            <h3 id="partnership-heading">{partnership.heading}</h3>
            <p>{partnership.context}</p>
          </div>
          <dl className="partnership-facts">
            <div><dt>{partnership.roleLabel}</dt><dd>{partnership.role}</dd></div>
            <div><dt>{partnership.developedLabel}</dt><dd>{partnership.developed}</dd></div>
            <div><dt>{partnership.outcomeLabel}</dt><dd>{partnership.outcome}</dd></div>
            <div><dt>{partnership.statusLabel}</dt><dd>{partnership.status}</dd></div>
          </dl>
          <div className="partnership-model">
            <p>{partnership.modelLabel}</p>
            <ol aria-label={partnership.modelLabel}>{partnership.model.map((stage) => <li key={stage}>{stage}</li>)}</ol>
          </div>
        </aside>
      </Container>
    </section>
  );
}
