import type { Dictionary } from "@/content/types";
import type { CSSProperties } from "react";

export function CommercialFlow({ copy }: { copy: Dictionary["hero"] }) {
  const stages = copy.stages;
  return (
    <figure className="commercial-flow" aria-labelledby="flow-title">
      <figcaption className="flow-heading" id="flow-title"><span className="section-marker" aria-hidden="true" />{copy.flow}<span className="flow-context"><bdi>{copy.flowContext}</bdi></span></figcaption>
      <div className="flow-canvas">
        <ol className="flow-stages">
          {stages.map((stage, index) => (
            <li className={`flow-stage ${index === stages.length - 1 ? "flow-stage--outcome" : ""}`} key={stage} style={{ "--stage": index } as CSSProperties}>
              <div className="flow-node">
                <span className="node-marker" aria-hidden="true">0{index + 1}</span>
                <span className="node-title">{stage}</span>
              </div>
              {index < stages.length - 1 && <span className="flow-connector" aria-hidden="true"><span /></span>}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
