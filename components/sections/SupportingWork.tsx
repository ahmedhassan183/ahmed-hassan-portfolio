import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkPreview } from "@/components/visuals/WorkPreview";
import type { Dictionary, Locale } from "@/content/types";
import { getGrowthCase, growthPath } from "@/content/growth";
import styles from "@/components/growth/Growth.module.css";
import { BidiText } from "@/components/ui/BidiText";

export function SupportingWork({ d, locale }: { d: Dictionary; locale: Locale }) {
  const growth = getGrowthCase(locale);
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
                <h3><BidiText>{item.title}</BidiText></h3>
                <p><BidiText>{item.description}</BidiText></p>
                <p className="supporting-status"><BidiText>{item.status}</BidiText></p>
                {item.id === "social-growth" && <><ul className={styles.chips}>{growth.chips.map(chip => <li key={chip}><BidiText>{chip}</BidiText></li>)}</ul><a className={styles.supportingCta} href={`/${locale}${growthPath}`}>{growth.cta}</a></>}
              </div>
              {item.artifact && <div className="supporting-visual"><WorkPreview artifact={item.artifact} ui={d.ui} name={d.name} /></div>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
