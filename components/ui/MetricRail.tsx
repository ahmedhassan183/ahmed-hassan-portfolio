import { BidiText } from "./BidiText";

export function MetricRail({ items, label }: { items: readonly { value: string; label: string }[]; label: string }) {
  return <dl className="metric-rail" aria-label={label}>{items.map(item => <div key={item.label}><dt><BidiText>{item.label}</BidiText></dt><dd><BidiText>{item.value}</BidiText></dd></div>)}</dl>;
}
