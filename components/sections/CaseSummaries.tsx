import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MetricRail } from "@/components/ui/MetricRail";
import { WorkPreview } from "@/components/visuals/WorkPreview";
import { BidiText } from "@/components/ui/BidiText";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { caseSlugs, casePath, summaryMetrics } from "@/content/cases";
import type { Dictionary, Locale } from "@/content/types";

export function CaseSummaries({ d, locale }: { d: Dictionary; locale: Locale }) {
  return <section id="systems" className="selected-systems portfolio-section" aria-labelledby="systems-heading" tabIndex={-1}><Container>
    <div className="section-intro"><div><SectionLabel>{d.work.label}</SectionLabel><h2 id="systems-heading" className="section-heading">{d.work.heading}</h2></div><p className="section-description">{d.work.description}</p></div>
    <RevealGroup className="case-summary-grid">{d.work.projects.map((system, index) => <article className={`case-summary-card system-entry--flagship${index === 1 ? " case-summary-card--solar" : ""}`} key={system.id} data-case-summary={system.id} data-reveal>
      <div className="case-summary-media"><WorkPreview artifact={system.artifact} ui={d.ui} name={d.name} /></div>
      <div className="case-summary-copy"><p className="case-kicker"><bdi dir="ltr">0{index + 1}</bdi><BidiText>{system.category}</BidiText></p>
        <h3><BidiText>{system.title}</BidiText></h3><p className="case-problem"><BidiText>{system.problem}</BidiText></p>
        <MetricRail items={summaryMetrics(index, d, locale)} label={d.work.proofLabel} />
        <p className="case-value"><BidiText>{system.purpose}</BidiText></p>
        <p className="case-status"><BidiText>{index === 0 ? (locale === "ar" ? "CRM مستخدم يوميًا" : "Live CRM · daily use") : index === 1 ? (locale === "ar" ? "نظام قائم · الاستخدام لدى العملاء غير موثق · بلا ماكرو" : "Working system · customer adoption unverified · no macros") : (locale === "ar" ? "منتج مصمّم تجاريًا · العقود والتجديدات غير موثقة" : "Commercially designed · contracts and renewals unverified")}</BidiText></p>
        <Button variant="secondary" href={`/${locale}${casePath(caseSlugs[index])}`}>{locale === "ar" ? "استعرض دراسة الحالة" : "Explore Case Study"}<span aria-hidden="true">↗</span></Button>
      </div>
    </article>)}</RevealGroup>
  </Container></section>;
}
