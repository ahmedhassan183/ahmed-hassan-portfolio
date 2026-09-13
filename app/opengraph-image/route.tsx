import { ImageResponse } from "next/og";


const size = { width: 1200, height: 630 };
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f8fafc", color: "#0b1630", padding: "66px 78px", borderTop: "9px solid #2563eb" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 25 }}><span style={{ fontWeight: 700 }}>AH<span style={{ color: "#2563eb" }}>.</span></span><span style={{ fontSize: 18, color: "#53657d", letterSpacing: 3 }}>SALES / SYSTEMS / EXECUTION</span></div>
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}><div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -3 }}>Ahmed Hassan</div><div style={{ fontSize: 43, color: "#1d4ed8", marginTop: 18 }}>Sales &amp; Business Development</div></div>
    <div style={{ display: "flex", borderTop: "1px solid #cbd5e1", paddingTop: 27, fontSize: 23, color: "#475569" }}>B2B Sales · CRM · Sales Operations · Renewable Energy</div>
  </div>, size);
}
