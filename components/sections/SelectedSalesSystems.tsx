import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary, Locale } from "@/content/types";
import { WorkPreview } from "@/components/visuals/WorkPreview";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { ArtifactGallery } from "@/components/visuals/ArtifactGallery";

function FlagshipScope({ d }: { d: Dictionary }) {
  const flagshipCapabilities = d.work.capabilities;
  return (
    <div className="flagship-scope">
      <p className="flagship-scope-label">{d.work.scope}</p>
      <div className="flagship-capabilities">
        {flagshipCapabilities.map((group) => (
          <div key={group.title}><h4>{group.title}</h4><p>{group.detail}</p></div>
        ))}
      </div>
    </div>
  );
}

export function SelectedSalesSystems({ d, locale }: { d: Dictionary; locale: Locale }) {
  const salesSystems = d.work.projects;
  const flagshipProof = d.work.proof;
  const flagshipWorkflow = d.work.workflow;
  const flagshipSecondaryArtifacts = d.work.secondary;
  return (
    <section id="systems" className="selected-systems portfolio-section" aria-labelledby="systems-heading" tabIndex={-1}>
      <Container>
        <div className="section-intro">
          <div>
            <SectionLabel>{d.work.label}</SectionLabel>
            <h2 id="systems-heading" className="section-heading">{d.work.heading}</h2>
          </div>
          <p className="section-description">{d.work.description}</p>
        </div>
        <RevealGroup className="systems-list">
          {salesSystems.map((system, index) => {
            const solar = system.id === "solar-pv-engineering";
            return (
            <details className={`system-entry system-entry--flagship${solar ? " system-entry--solar" : ""}`} key={system.id} data-reveal open>
              <summary className="system-summary" aria-controls={`${system.id}-details`}>
                <h3>
                  <span className="system-number" aria-hidden="true">0{index + 1}</span>
                  <span className="system-heading-content">
                    <span className="system-category">{system.category}<span className="flagship-badge">{d.work.flagship}</span></span>
                    <span className="system-title">{system.title}</span>
                  </span>
                  <span className="system-toggle" aria-hidden="true"><span /><span /></span>
                </h3>
              </summary>
              <div className="system-body" id={`${system.id}-details`}>
                <p className="system-description">{system.description}</p>
                {solar && (
                  <ul className="flagship-proof" aria-label={d.work.proofLabel}>
                    {flagshipProof.map((proof) => <li key={proof.label}><strong><bdi>{proof.value}</bdi></strong><span>{proof.label}</span></li>)}
                  </ul>
                )}
                <div className="system-details">
                  <div className="system-visual">
                    {solar ? (
                      <ArtifactGallery ui={d.ui} locale={locale} items={[
                        { path: system.artifact.path, label: d.work.primaryLabel, panel: <WorkPreview artifact={system.artifact} ui={d.ui} name={d.name} /> },
                        ...flagshipSecondaryArtifacts.map((artifact) => ({ path: artifact.path, label: artifact.label, panel: <WorkPreview artifact={artifact} ui={d.ui} name={d.name} /> })),
                      ]} />
                    ) : <WorkPreview artifact={system.artifact} ui={d.ui} name={d.name} />}
                  </div>
                  {solar && <FlagshipScope d={d} />}
                <dl className="system-fields">
                  <div className="system-problem"><dt>{d.work.problem}</dt><dd>{system.problem}</dd></div>
                  <div className="system-role"><dt>{d.work.role}</dt><dd>{system.role}</dd></div>
                  <div className="system-built"><dt>{d.work.built}</dt><dd>{system.built}</dd></div>
                  <div className="system-adoption"><dt>{d.work.adoption}</dt><dd>{system.adoption}</dd></div>
                  <div className="system-purpose"><dt>{d.work.purpose}</dt><dd>{system.purpose}</dd></div>
                </dl>
                </div>
                {system.id === "b2b-market-account-development" && (
                  <aside className="market-evidence">
                    <div>
                      <h4>{d.work.marketProof.processLabel}</h4>
                      <p>{d.work.marketProof.process}</p>
                    </div>
                    <div>
                      <h4>{d.work.marketProof.channelLabel}</h4>
                      <p>{d.work.marketProof.role}</p>
                      <p>{d.work.marketProof.model}</p>
                      <p>{d.work.marketProof.sales}</p>
                      <p><strong>{d.work.marketProof.senour}</strong></p>
                      <p>{d.work.marketProof.fayoum}</p>
                    </div>
                  </aside>
                )}
                {solar && (
                  <div className="flagship-workflow">
                    <h4>{d.work.workflowHeading}</h4>
                    <ol className="engineering-workflow">{flagshipWorkflow.map((stage) => <li key={stage}>{stage}</li>)}</ol>
                    <ol className="build-progress" aria-label={d.work.stagesLabel} data-reveal>
                      {d.work.stages.map((stage, index) => <li key={stage} style={{ "--step": index } as React.CSSProperties}><span aria-hidden="true">0{index + 1}</span>{stage}</li>)}
                    </ol>
                    <div className="flagship-assurance">
                      {d.work.assurance.map((item) => <p key={item.title}><strong>{item.title}</strong> {item.text}</p>)}
                    </div>
                    <p className="flagship-intent">{d.work.intent}</p>
                  </div>
                )}
                {system.id === "maintenance-revenue-product" && <ul className="maintenance-tiers" aria-label={d.work.tiersLabel}>{d.work.tiers.map((tier) => <li key={tier}>{tier}</li>)}</ul>}
              </div>
            </details>
          );})}
        </RevealGroup>
        <div className="supporting-work" aria-labelledby="supporting-heading">
          <div className="supporting-intro">
            <SectionLabel>{d.work.supporting.label}</SectionLabel>
            <h3 id="supporting-heading">{d.work.supporting.heading}</h3>
            <p>{d.work.supporting.description}</p>
          </div>
          <div className="supporting-list">
            {d.work.supporting.items.map((item, index) => (
              <article className="supporting-entry" key={item.id}>
                <span className="supporting-number" aria-hidden="true">0{index + 1}</span>
                <div className="supporting-copy">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p className="supporting-status">{item.status}</p>
                </div>
                {item.artifact && <div className="supporting-visual"><WorkPreview artifact={item.artifact} ui={d.ui} name={d.name} /></div>}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
