import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkPreview } from "@/components/visuals/WorkPreview";
import type { Dictionary, Locale } from "@/content/types";
import { getGrowthCase, growthPath } from "@/content/growth";
import styles from "@/components/growth/Growth.module.css";
import { BidiText } from "@/components/ui/BidiText";
import { getSahara } from "@/content/sahara";

export function SupportingWork({ d, locale }: { d: Dictionary; locale: Locale }) {
  const growth = getGrowthCase(locale);
  const sahara = getSahara(locale);
  return (
    <section id="supporting" className="supporting-work portfolio-section" aria-labelledby="supporting-heading">
      <Container>
        <div className="supporting-intro">
          <SectionLabel>{d.work.supporting.label}</SectionLabel>
          <h2 id="supporting-heading">{d.work.supporting.heading}</h2>
          <p>{d.work.supporting.description}</p>
        </div>
        <div className="supporting-list">
          {d.work.supporting.items.map((item, index) => (
            <article className="supporting-entry" key={item.id} data-supporting-id={item.id}>
              <span className="supporting-number" aria-hidden="true"><bdi dir="ltr">0{index + 1}</bdi></span>
              <div className="supporting-copy">
                <div className="project-category">{item.id === "sahara-2026" ? sahara.category : item.id === "social-growth" ? growth.label : locale === "ar" ? "نظام تجاري داعم" : "COMMERCIAL OPERATING SYSTEM"}</div>
                <h3><BidiText>{item.title}</BidiText></h3>
                <p><BidiText>{item.description}</BidiText></p>
                <p className="supporting-status"><BidiText>{item.status}</BidiText></p>
                {item.id === "social-growth" && <><ul className={styles.chips}>{growth.chips.map(chip => <li key={chip}><BidiText>{chip}</BidiText></li>)}</ul><a className={styles.supportingCta} href={`/${locale}${growthPath}`}>{growth.cta}</a></>}
                {item.id === "sahara-2026" && <><ul className="proof-chips">{sahara.chips.map(chip => <li key={chip}>{chip}</li>)}</ul><details className="sahara-detail"><summary>{sahara.detail}</summary><ol className="sahara-journey">{sahara.stages.map(stage => <li key={stage.label}><strong>{stage.label}</strong><p><BidiText>{stage.detail}</BidiText></p></li>)}</ol><h4>{sahara.heading}</h4><dl className="sahara-companies">{sahara.companies.map(company => <div key={company.name}><dt><BidiText>{company.name}</BidiText></dt><dd>{company.context}</dd></div>)}</dl><p>{sahara.safety}</p></details></>}
                {item.id === "90-day-sales-execution" && <ul className="proof-chips"><li><bdi dir="ltr">90</bdi> {locale === "ar" ? "يومًا" : "days"}</li><li><bdi dir="ltr">13</bdi> {locale === "ar" ? "دورة عمل مخططة" : "planned sprints"}</li><li><bdi dir="ltr">CRM</bdi></li></ul>}
                {item.id === "growth-playbook" && <ul className="proof-chips">{(locale === "ar" ? ["تشخيص تجاري", "أولويات المبيعات", "التنفيذ"] : ["Business diagnosis", "Sales priorities", "Execution"]).map(chip => <li key={chip}>{chip}</li>)}</ul>}
              </div>
              {item.artifact && <div className="supporting-visual"><WorkPreview artifact={item.artifact} ui={d.ui} name={d.name} /></div>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
