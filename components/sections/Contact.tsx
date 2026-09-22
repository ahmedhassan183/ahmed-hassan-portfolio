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
        <div className="contact-lead">
          <h2 id="contact-heading" className="section-heading">{d.contact.heading}</h2>
          <div className="contact-content">
            <p>{d.contact.description}</p>
            <div className="contact-actions">
              <Button href={`mailto:${c.email}`}>{d.contact.talk}<Icon name="arrow" /></Button>
              <ResumeLink copy={d.ui} available={publicAssetExists(site.resumeUrl)} />
            </div>
          </div>
        </div>
        <nav className="contact-methods" aria-label={d.contact.links}>
          <a className="contact-method contact-method--priority" href={c.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="contact-method__label">{d.contact.whatsapp}</span>
            <strong>{d.contact.whatsappAction}</strong>
            <span className="contact-method__arrow" aria-hidden="true">↗</span>
          </a>
          <a className="contact-method contact-method--priority contact-phone" href={`tel:${c.phone}`}>
            <span className="contact-method__label">{d.contact.phone}</span>
            <strong><bdi>{c.phoneDisplay}</bdi></strong>
          </a>
          <a className="contact-method contact-method--compact" href={c.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="contact-method__label">{d.contact.linkedin}</span>
            <strong>{d.contact.linkedinValue}</strong>
            <span className="contact-method__arrow" aria-hidden="true">↗</span>
          </a>
          <a className="contact-method contact-method--compact" href={`mailto:${c.email}`}>
            <span className="contact-method__label">{d.contact.email}</span>
            <strong>{c.email}</strong>
          </a>
          <div className="contact-method contact-method--alternate">
            <span className="contact-method__label">{d.contact.secondaryPhone}</span>
            <a className="contact-phone" href={`tel:${c.secondaryPhone}`}><bdi>{c.secondaryPhoneDisplay}</bdi></a>
            <a className="contact-alternate-whatsapp" href={c.secondaryWhatsapp} target="_blank" rel="noopener noreferrer">{d.contact.whatsapp} · {d.contact.secondaryPhone}<span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </div>
    </Container>
  </section>;
}
