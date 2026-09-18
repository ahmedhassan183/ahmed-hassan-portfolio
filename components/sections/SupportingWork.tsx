import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkPreview } from "@/components/visuals/WorkPreview";
import type { Dictionary } from "@/content/types";

export function SupportingWork({ d }: { d: Dictionary }) {
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
            <article className="supporting-entry" key={item.id}>
              <span className="supporting-number" aria-hidden="true">0{index + 1}</span>
              <div className="supporting-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="supporting-status">{item.status}</p>
              </div>
              {item.artifact && <div className="supporting-visual"><WorkPreview artifact={item.artifact} ui={d.ui} name={d.name} /></div>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
