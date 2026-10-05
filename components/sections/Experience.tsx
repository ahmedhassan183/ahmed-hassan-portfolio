import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary, Locale } from "@/content/types";
import { BidiIsolate, BidiText } from "@/components/ui/BidiText";
import { Button } from "@/components/ui/Button";
import { getPartnershipCase, partnershipPath } from "@/content/partnership";
import styles from "@/components/partnership/Partnership.module.css";
import { MetricRail } from "@/components/ui/MetricRail";

export function Experience({ d, locale }: { d: Dictionary; locale: Locale }) {
  const salesJourney = d.experience.journey;
  const solarDomains = d.experience.domains;
  const training = d.experience.training;
  const partnership = d.experience.partnership;
  const c = getPartnershipCase(locale);
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
                <details className="journey-full-detail"><summary>{locale === "ar" ? "تفاصيل المسؤولية" : "Role detail"}</summary><p className="journey-focus-desktop"><BidiText>{step.focus}</BidiText></p></details>
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
          <details className="enablement-details"><summary>{locale === "ar" ? "منهج التدريب والتقييم" : "Training & assessment approach"}</summary><div className="enablement-steps">
            {training.steps.map((step) => <div key={step.label}><strong>{step.label}</strong><p><span className="enablement-copy-desktop"><BidiText>{step.description}</BidiText></span><span className="enablement-copy-mobile"><BidiText>{step.mobileDescription}</BidiText></span></p></div>)}
          </div></details>
          <ol className="compact-process enablement-process" aria-label={training.label}>{(locale === "ar" ? ["تدريب", "تقييم", "اختيار", "توظيف"] : ["TRAIN", "ASSESS", "SELECT", "HIRE"]).map(step => <li key={step}>{step}</li>)}</ol>
          <p className="enablement-outcome"><strong>{training.outcome}</strong></p>
        </aside>
        <aside className="partnership-evidence evidence-block" aria-labelledby="partnership-heading">
          <div className="evidence-intro">
            <p className="evidence-label">{partnership.label}</p>
            <h3 id="partnership-heading">{partnership.heading}</h3>
            <p className={styles.snapshotSummary}><BidiText>{c.snapshot.summary}</BidiText></p>
          </div>
          <div className={styles.snapshotFacts}>
            <p><strong>{c.snapshot.signed}</strong></p>
            <p><BidiText>{c.snapshot.execution}</BidiText></p>
          </div>
          <MetricRail label={partnership.statusLabel} items={[
            { value: locale === "ar" ? "موقّع" : "SIGNED", label: locale === "ar" ? "بروتوكول تعاون" : "Cooperation protocol" },
            { value: locale === "ar" ? "5 أكتوبر 2026" : "5 Oct 2026", label: locale === "ar" ? "بدء التنفيذ الميداني" : "Field execution started" },
            { value: "10", label: locale === "ar" ? "طلاب · النشاط الميداني #01 مكتمل" : "Students · completed field activity #01" },
          ]} />
          <Button className={`partnership-cta ${styles.snapshotCta}`} variant="secondary" href={`/${locale}${partnershipPath}`}>{c.snapshot.cta}</Button>
        </aside>
      </Container>
    </section>
  );
}
