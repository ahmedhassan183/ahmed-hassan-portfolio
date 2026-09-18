import type { Dictionary } from "@/content/types";
import { site } from "@/data/site";
import { publicAssetExists } from "@/lib/public-assets";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Contact({ d }: { d: Dictionary }) {
  const c = site.contact;
  return <section id="contact" className="contact portfolio-section" aria-labelledby="contact-heading" tabIndex={-1}>
    <Container>
      <SectionLabel>{d.contact.label}</SectionLabel>
      <div className="contact-grid">
        <h2 id="contact-heading" className="section-heading">{d.contact.heading}</h2>
        <div className="contact-content">
          <p>{d.contact.description}</p>
          <div className="contact-actions">
            <Button href={`mailto:${c.email}`}>{d.contact.talk}<Icon name="arrow" /></Button>
            <ResumeLink copy={d.ui} available={publicAssetExists(site.resumeUrl)} />
          </div>
          <nav className="contact-links" aria-label={d.contact.links}>
            <a href={c.linkedin} target="_blank" rel="noopener noreferrer">{d.contact.linkedin}<span aria-hidden="true">↗</span></a>
            <a href={`mailto:${c.email}`}>{d.contact.email}</a>
            <a href={c.whatsapp} target="_blank" rel="noopener noreferrer">{d.contact.whatsapp}</a>
            <a className="contact-phone" href={`tel:${c.phone}`}><span>{d.contact.phone}</span><bdi>{c.phoneDisplay}</bdi></a>
            <a className="contact-phone" href={`tel:${c.secondaryPhone}`}><span>{d.contact.secondaryPhone}</span><bdi>{c.secondaryPhoneDisplay}</bdi></a>
            <a href={c.secondaryWhatsapp} target="_blank" rel="noopener noreferrer">{d.contact.whatsapp} · {d.contact.secondaryPhone}</a>
          </nav>
        </div>
      </div>
    </Container>
  </section>;
}
