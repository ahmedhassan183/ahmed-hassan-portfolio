import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/content/types";

export function SalesAuthority({ d }: { d: Dictionary }) {
  const salesCapabilities = d.authority.capabilities;
  return (
    <section id="sales" className="sales-authority portfolio-section" aria-labelledby="sales-heading" tabIndex={-1}>
      <Container>
        <div className="section-intro">
          <div>
            <SectionLabel>{d.authority.label}</SectionLabel>
            <h2 id="sales-heading" className="section-heading">{d.authority.heading}<span>{d.authority.accent}</span></h2>
          </div>
          <p className="section-description">{d.authority.description}</p>
        </div>
        <div className="capability-grid">
          {salesCapabilities.map((capability, index) => (
            <article className="capability-block" key={capability.id} aria-labelledby={`capability-${capability.id}`}>
              <div className="capability-heading">
                <h3 id={`capability-${capability.id}`}>{capability.title}</h3>
                <Icon name={capability.icon} width="25" height="25" />
              </div>
              <p className="capability-description">{capability.description}</p>
              <ul className="capability-skills">
                {capability.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
              {index < salesCapabilities.length - 1 && <span className="capability-connector" aria-hidden="true"><Icon name="arrow" width="17" height="17" /></span>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
