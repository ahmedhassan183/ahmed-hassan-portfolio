import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { getGrowthCase, growthReviews } from "@/content/growth";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BidiText } from "@/components/ui/BidiText";
import { Button } from "@/components/ui/Button";
import styles from "./Growth.module.css";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className={styles.section} aria-labelledby={id}><h2 id={id}><BidiText>{title}</BidiText></h2>{children}</section>;
}
function Flow({ stages, label }: { stages: string[]; label: string }) {
  return <ol className={styles.flow} aria-label={label}>{stages.map((stage, index) => <li key={stage}><bdi dir="ltr" className={styles.number}>{String(index + 1).padStart(2, "0")}</bdi><span><BidiText>{stage}</BidiText></span>{index < stages.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}</li>)}</ol>;
}
export function GrowthCase({ locale }: { locale: Locale }) {
  const c = getGrowthCase(locale), reviews = growthReviews[locale];
  return <main id="main" tabIndex={-1} className={`growth-case ${styles.page}`}><Container>
    <header className={styles.hero}>
      <a className={styles.back} href={`/${locale}#supporting`}>{c.back}</a>
      <SectionLabel>{c.label}</SectionLabel><h1><BidiText>{c.title}</BidiText></h1>
      <p className={styles.company}><bdi dir="ltr">{c.company}</bdi></p><p className={styles.summary}><BidiText>{c.summary}</BidiText></p>
      <p className={styles.pending}>{c.statuses[3].label} · {c.statuses[3].value}</p>
    </header>
    <div className={styles.split}>
      <Section id="growth-challenge" title={c.challengeHeading}><p><BidiText>{c.challenge}</BidiText></p></Section>
      <Section id="growth-role" title={c.roleHeading}><p className={styles.role}>{c.role}</p><ul>{c.responsibilities.map(item => <li key={item}><BidiText>{item}</BidiText></li>)}</ul></Section>
    </div>
    <Section id="growth-scale" title={c.scaleHeading}>
      <dl className={styles.scale} data-growth-scale>{c.scale.map(metric => <div key={metric.label}><dt><BidiText>{metric.label}</BidiText></dt><dd><BidiText>{metric.value}</BidiText></dd></div>)}</dl>
      <details className={styles.details}><summary>{c.sheetsHeading}</summary><ul className={styles.tags}>{c.sheets.map(sheet => <li key={sheet}><BidiText>{sheet}</BidiText></li>)}</ul></details>
    </Section>
    <Section id="growth-funnel" title={c.funnelHeading}><p>{c.funnelNote}</p><div className={styles.funnel} data-growth-funnel><h3>{c.attentionLabel}</h3><Flow stages={c.attention} label={c.attentionLabel} /><h3>{c.commercialLabel}</h3><Flow stages={c.commercial} label={c.commercialLabel} /></div></Section>
    <Section id="growth-segments" title={c.segmentsHeading}><p><BidiText>{c.segmentNote}</BidiText></p><div className={styles.grid}>{c.segments.map(segment => <article key={segment.label}><SectionLabel><BidiText>{segment.label}</BidiText></SectionLabel><h3><BidiText>{segment.title}</BidiText></h3></article>)}</div></Section>
    <Section id="growth-architecture" title={c.architectureHeading}>
      <h3>{c.pillarsHeading}</h3><ul className={styles.tags}>{c.pillars.map(pillar => <li key={pillar}><BidiText>{pillar}</BidiText></li>)}</ul>
      <h3><BidiText>{c.offersHeading}</BidiText></h3><dl className={styles.offers}>{c.offers.map(offer => <div key={offer.segment}><dt><BidiText>{offer.segment}</BidiText></dt><dd><strong><BidiText>{offer.offer}</BidiText></strong><p><BidiText>{offer.input}</BidiText></p></dd></div>)}</dl>
    </Section>
    <Section id="growth-production" title={c.productionHeading}><Flow stages={c.production} label={c.productionHeading} /><p><BidiText>{c.productionNote}</BidiText></p><aside className={styles.validation}><h3>{c.validationHeading}</h3><p><BidiText>{c.validation}</BidiText></p></aside></Section>
    <Section id="growth-leads" title={c.leadHeading}><Flow stages={c.lead} label={c.leadHeading} /><p><BidiText>{c.leadNote}</BidiText></p></Section>
    <Section id="growth-kpis" title={c.kpiHeading}><p>{c.kpiNote}</p><div className={styles.grid} data-growth-kpis>{c.kpis.map(layer => <article key={layer.title}><h3>{layer.title}</h3><p><BidiText>{layer.metrics}</BidiText></p></article>)}</div></Section>
    <Section id="growth-testing" title={c.testingHeading}><p className={styles.rule}>{c.testingRule}</p><p><BidiText>{c.testingVariables}</BidiText></p><Flow stages={c.testing} label={c.testingHeading} /><p>{c.testingNote}</p></Section>
    <Section id="growth-handoff" title={c.handoffHeading}><p data-growth-handoff>{c.handoff}</p><div className={styles.governance}>{[[c.sprintHeading, c.sprint], [c.proofHeading, c.proof], [c.reviewHeading, c.review]].map(([heading, copy]) => <details className={styles.details} key={heading}><summary><BidiText>{heading}</BidiText></summary><p><BidiText>{copy}</BidiText></p></details>)}</div></Section>
    <Section id="growth-status" title={c.statusHeading}><dl className={styles.status} data-growth-status>{c.statuses.map(status => <div key={status.label}><dt>{status.label}</dt><dd>{status.value}</dd></div>)}</dl></Section>
    {reviews.length > 0 && <Section id="growth-results" title={c.resultsHeading}>{reviews.map(review => <article key={review.period} data-growth-review={review.period}><h3>{review.summary}</h3><dl>{review.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></article>)}</Section>}
    <div className={styles.actions}><Button href={`/${locale}#contact`}>{c.contact}</Button><Button href={`/${locale}#supporting`} variant="secondary">{c.back}</Button></div>
  </Container></main>;
}
