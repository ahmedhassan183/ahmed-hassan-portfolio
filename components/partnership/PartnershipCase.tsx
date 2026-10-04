import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BidiText } from "@/components/ui/BidiText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPartnershipCase, type PartnershipActivity } from "@/content/partnership";
import type { Dictionary, Locale } from "@/content/types";
import styles from "./Partnership.module.css";

type CaseContent = ReturnType<typeof getPartnershipCase>;
export function ActivityRecord({ activity, c }: { activity: PartnershipActivity; c: CaseContent }) {
  const completed = activity.status === "completed";
  return <article className={styles.activity} data-activity-status={activity.status} aria-labelledby={`activity-${activity.kind}-${activity.number}`}>
    <p className={styles.kicker}>{completed && activity.kind === "field" ? c.firstFieldHeading : `${completed ? c.completedLabel : c.scheduledLabel} · ${c.activityKinds[activity.kind]}`} <bdi dir="ltr">#{activity.number}</bdi></p>
    <h4 id={`activity-${activity.kind}-${activity.number}`}><BidiText>{activity.title}</BidiText></h4>
    <dl className={styles.activityFacts}>
      <div><dt>{c.dateLabel}</dt><dd><time dateTime={activity.date}><BidiText>{activity.dateLabel}</BidiText></time></dd></div>
      {activity.participants && <div><dt>{completed ? c.completedParticipantsLabel : c.participantsLabel}</dt><dd><BidiText>{activity.participants}</BidiText></dd></div>}
      <div><dt>{c.locationLabel}</dt><dd><BidiText>{activity.locationType}</BidiText></dd></div>
      <div><dt>{c.stageLabel}</dt><dd><BidiText>{activity.projectStage}</BidiText></dd></div>
    </dl>
    <p className={styles.activityNarrative}><BidiText>{activity.narrative}</BidiText></p>
    <p className={styles.activityObjective}><strong>{c.objectiveLabel}</strong><BidiText>{activity.objective}</BidiText></p>
    {completed && <p className={styles.activityOutcome}><strong>{c.outcomeLabel}</strong><BidiText>{activity.outcome}</BidiText></p>}
    {activity.photos.length > 0 && <div className={styles.gallery}>
      {activity.photos.map(photo => <figure key={photo.src}><a href={photo.src} target="_blank" rel="noopener noreferrer"><Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes="(max-width: 767px) 100vw, 50vw" /></a>{photo.caption && <figcaption><BidiText>{photo.caption}</BidiText></figcaption>}</figure>)}
    </div>}
  </article>;
}

export function PartnershipCase({ d, locale }: { d: Dictionary; locale: Locale }) {
  const c = getPartnershipCase(locale), p = d.experience.partnership;
  const completed = c.activities.filter(a => a.status === "completed"), upcoming = c.activities.filter(a => a.status === "scheduled");
  return <main id="main" tabIndex={-1} className={`partnership-case ${styles.page}`}>
    <Container>
      <header className={styles.hero}>
        <a className={styles.back} href={`/${locale}#partnership-heading`}>{c.back}</a>
        <SectionLabel>{c.label}</SectionLabel>
        <h1>{c.title}</h1>
        <p className={styles.subtitle}><BidiText>{c.subtitle}</BidiText></p>
        <p className={styles.direction}>{c.direction}</p>
        <p className={`case-summary ${styles.summary}`}><BidiText>{c.summary}</BidiText></p>
        <div className={styles.status}><span>{p.outcomeLabel}</span><strong><BidiText>{p.outcome}</BidiText></strong></div>
      </header>
      <div className={styles.overview}>
        <section className={styles.role} data-case-role aria-labelledby="case-role-heading">
          <h2 id="case-role-heading">{c.roleHeading}</h2>
          <p><BidiText>{p.role}</BidiText></p>
          <ul>{c.roles.map(role => <li key={role}><BidiText>{role}</BidiText></li>)}</ul>
          <p><BidiText>{p.developed}</BidiText></p>
        </section>
        <section aria-labelledby="case-journey-heading">
          <h2 id="case-journey-heading">{c.journeyHeading}</h2>
          <ol className={styles.timeline} data-case-timeline>{c.timeline.map((stage, i) => <li key={stage.title}>
            <bdi dir="ltr" className={styles.number}>{String(i + 1).padStart(2, "0")}</bdi>
            <div><h3>{stage.title.split(/(#\d+)/).map((part, index) => /^#\d+$/.test(part) ? <bdi dir="ltr" key={index}>{part}</bdi> : <BidiText key={index}>{part}</BidiText>)}</h3><p><BidiText>{stage.detail}</BidiText></p></div>
          </li>)}</ol>
        </section>
      </div>
      <section className={styles.record} id="execution-record" aria-labelledby="execution-record-heading">
        <SectionLabel>{p.statusLabel}</SectionLabel>
        <h2 id="execution-record-heading">{c.recordHeading}</h2>
        <p className="case-execution-summary"><BidiText>{c.executionSummary}</BidiText></p>
        <section data-record="completed" className={styles.recordGroup} aria-labelledby="completed-heading">
          <h3 id="completed-heading">{c.completedHeading}</h3>
          {completed.length ? completed.map(activity => <ActivityRecord key={`${activity.kind}-${activity.number}`} activity={activity} c={c} />) : <p className={styles.empty}>{c.completedEmpty}</p>}
        </section>
        <section data-record="upcoming" className={styles.recordGroup} aria-labelledby="upcoming-heading">
          <h3 id="upcoming-heading">{c.upcomingHeading}</h3>
          {upcoming.map(activity => <ActivityRecord key={`${activity.kind}-${activity.number}`} activity={activity} c={c} />)}
          <h3 className={styles.streamsHeading}>{c.streamsHeading}</h3>
          <div className={styles.streams}>{p.next.slice(1).map(item => <article className="case-execution-stream" key={item.label}>
            <p className={styles.kicker}>{item.status}</p><h4>{item.label}</h4><p><BidiText>{item.detail}</BidiText></p>
          </article>)}</div>
        </section>
      </section>
      <section className={styles.value} aria-labelledby="case-value-heading">
        <h2 id="case-value-heading">{c.valueHeading}</h2>
        <ul>{c.values.map(value => <li key={value}>{value}</li>)}</ul>
        <p className={styles.scopeLabel}>{p.modelLabel}</p><ul className={styles.scope} data-case-scope>{p.model.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      <div className={styles.actions}><Button href={`/${locale}#contact`}>{c.contact}</Button><Button variant="secondary" href={`/${locale}#partnership-heading`}>{c.back}</Button></div>
    </Container>
  </main>;
}
