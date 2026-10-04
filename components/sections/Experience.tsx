import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/content/types";
import { BidiIsolate, BidiText } from "@/components/ui/BidiText";

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
          <p className="experience-periods"><span><BidiIsolate>{d.experience.periods[0].organization}</BidiIsolate> · <BidiIsolate>{d.experience.periods[0].dates}</BidiIsolate></span><span aria-hidden="true">→</span><span><BidiIsolate>{d.experience.periods[1].organization}</BidiIsolate> · <BidiIsolate>{d.experience.periods[1].dates}</BidiIsolate></span></p>
        </div>
        <ol className="sales-journey">
          {salesJourney.map((step, index) => (
            <li key={step.title} className={index > 2 ? "journey-step journey-step--solar" : "journey-step"}>
              <span className="journey-number" aria-hidden="true"><bdi dir="ltr">0{index + 1}</bdi></span>
              <div className="journey-role">
                <h3><BidiText>{step.title}</BidiText></h3>
                <p><BidiText>{step.organization}</BidiText></p>
              </div>
              <div className="journey-focus">
                {"responsibility" in step && <p className="journey-responsibility"><BidiText>{step.responsibility}</BidiText></p>}
                <p className="journey-focus-desktop"><BidiText>{step.focus}</BidiText></p>
                {"mobileEvidence" in step && (
                  <div className="journey-focus-mobile">
                    <p className="journey-mobile-summary"><BidiText>{step.mobileSummary}</BidiText></p>
                    <ul className="journey-evidence-list">
                      {step.mobileEvidence.map((evidence) => (
                        <li key={evidence.label}>
                          <strong>{evidence.label}</strong>
                          <span><BidiText>{evidence.detail}</BidiText></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <p><BidiText>{training.description}</BidiText></p>
          </div>
          <div className="enablement-steps">
            {training.steps.map((step) => <div key={step.label}><strong>{step.label}</strong><p><span className="enablement-copy-desktop"><BidiText>{step.description}</BidiText></span><span className="enablement-copy-mobile"><BidiText>{step.mobileDescription}</BidiText></span></p></div>)}
          </div>
          <p className="enablement-outcome"><strong>{training.outcome}</strong></p>
        </aside>
        <aside className="partnership-evidence evidence-block" aria-labelledby="partnership-heading">
          <div className="evidence-intro">
            <p className="evidence-label">{partnership.label}</p>
            <h3 id="partnership-heading">{partnership.heading}</h3>
            <p><BidiText>{partnership.context}</BidiText></p>
          </div>
          <div className="partnership-model partnership-journey">
            <p>{partnership.journeyLabel}</p>
            <ol aria-label={partnership.journeyLabel}>{partnership.mobileSequence.map((stage) => <li key={stage.label}>{stage.label}</li>)}</ol>
          </div>
          <dl className="partnership-facts">
            <div><dt>{partnership.roleLabel}</dt><dd>{partnership.role}</dd></div>
            <div><dt>{partnership.developedLabel}</dt><dd><BidiText>{partnership.developed}</BidiText></dd></div>
            <div><dt>{partnership.outcomeLabel}</dt><dd><BidiText>{partnership.outcome}</BidiText></dd></div>
            <div><dt>{partnership.statusLabel}</dt><dd><BidiText>{partnership.status}</BidiText></dd></div>
          </dl>
          <div className="partnership-model">
            <p>{partnership.modelLabel}</p>
            <ol aria-label={partnership.modelLabel}>{partnership.model.map((stage) => <li key={stage}>{stage}</li>)}</ol>
          </div>
          <div className="partnership-mobile">
            <ol className="partnership-sequence">
              {partnership.mobileSequence.map((stage) => <li key={stage.label}><strong>{stage.label}</strong><span><BidiText>{stage.detail}</BidiText></span></li>)}
            </ol>
            <dl className="partnership-mobile-secondary">
              <div><dt>{partnership.modelLabel}</dt><dd><BidiText>{partnership.mobileModel}</BidiText></dd></div>
              <div><dt>{partnership.statusLabel}</dt><dd><BidiText>{partnership.status}</BidiText></dd></div>
            </dl>
            <ol className="partnership-model-compact" aria-label={partnership.modelLabel}>{partnership.model.map((stage) => <li key={stage}>{stage}</li>)}</ol>
          </div>
          <div className="partnership-next">
            <h4>{partnership.nextLabel}</h4>
            <ul>{partnership.next.map((item) => <li key={item.label}><strong>{item.label}</strong><p><BidiText>{item.detail}</BidiText></p></li>)}</ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
