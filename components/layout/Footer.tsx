import type { Dictionary } from "@/content/types";
import { site } from "@/data/site";
import { Container } from "./Container";

export function Footer({ d }: { d: Dictionary }) {
  return <footer className="site-footer"><Container className="footer-row">
    <div><p className="footer-name">{d.name}</p><p>{d.contact.role}</p></div>
    <div className="footer-links"><a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">{d.contact.linkedin}</a>{site.contact.email && <a href={`mailto:${site.contact.email}`}>{d.contact.email}</a>}</div>
    <small>© {new Date().getFullYear()} {d.name}</small>
  </Container></footer>;
}
