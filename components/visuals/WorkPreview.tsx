import type { Dictionary } from "@/content/types";
import { AssetImage } from "@/components/visuals/AssetImage";
import { Icon } from "@/components/ui/Icon";
import { publicAssetExists } from "@/lib/public-assets";
import { ArtifactInspector } from "@/components/visuals/ArtifactInspector";

export type WorkArtifact = {
  path: string;
  type: string;
  label: string;
  alt: string;
};

export function WorkPreview({ artifact, ui, name }: { artifact: WorkArtifact; ui: Dictionary["ui"]; name: string }) {
  return (
    <figure className="work-preview" data-artifact={artifact.path.split("/").pop()}>
      <div className="work-preview-media">
          <AssetImage
            available={publicAssetExists(artifact.path)}
            src={artifact.path}
            alt={artifact.alt}
            fill
            sizes="(max-width: 480px) calc(100vw - 44px), (max-width: 899px) calc(100vw - 64px), (max-width: 1280px) 55vw, 690px"
            className="work-preview-image"
            fallback={
          <div className="work-preview-placeholder">
            <span className="work-preview-kind">{artifact.type}</span>
            <Icon name="execution" width="38" height="38" />
            <span className="work-preview-label">{artifact.label}</span>
            <span className="work-preview-status">{ui.realPreview}</span>
            <span className="work-preview-filename">{artifact.path.split("/").pop()} {ui.required}</span>
          </div>
            }
          />
      </div>
      <figcaption className="work-preview-caption">
        <span>{artifact.type}</span>
        <span>{name} · {ui.selectedWork}</span>
        {publicAssetExists(artifact.path) && <ArtifactInspector ui={ui} path={artifact.path} label={artifact.label} alt={artifact.alt} />}
      </figcaption>
    </figure>
  );
}
