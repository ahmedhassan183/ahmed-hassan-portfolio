import { getGrowthCase, growthPath } from "@/content/growth";
import type { Locale } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BidiText } from "@/components/ui/BidiText";
import { MetricRail } from "@/components/ui/MetricRail";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function GrowthFeature({ locale }: { locale: Locale }) {
  const c = getGrowthCase(locale);
  return <section id="growth-feature" className="growth-feature portfolio-section" aria-labelledby="growth-feature-heading"><Container>
    <div className="executive-feature">
      <div className="feature-intro"><SectionLabel>{c.label}</SectionLabel><h2 id="growth-feature-heading"><BidiText>{c.title}</BidiText></h2><Button href={`/${locale}${growthPath}`}>{c.cta}</Button></div>
      <div className="feature-evidence"><MetricRail items={[c.scale[1], c.scale[0], c.scale[2], c.scale[3]]} label={c.scaleHeading} />
        <ol className="compact-process" aria-label={c.commercialLabel}>{c.commercial.map(stage => <li key={stage}><BidiText>{stage}</BidiText></li>)}</ol>
        <div className="feature-status"><p><span>{c.statuses[2].label}</span><strong>{c.statuses[2].value}</strong></p><p><span>{c.statuses[3].label}</span><strong>{c.statuses[3].value}</strong></p></div>
      </div>
    </div>
  </Container></section>;
}
