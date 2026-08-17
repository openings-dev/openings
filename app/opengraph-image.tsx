import { ImageResponse } from "next/og";

export const alt = "openings.dev — Technology jobs shared by public GitHub communities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const colors = {
  canvas: "#f5f3ef",
  paper: "#fffefa",
  ink: "#21302e",
  mutedInk: "#5e6663",
  line: "#ddd9d2",
  mint: "#b0ec9c",
  mintSoft: "#eaf9e4",
  mintDeep: "#2f6b3a",
};

function ResultPreview({ company, role, tags }: { company: string; role: string; tags: string }): React.ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, padding: "20px 22px", border: `1px solid ${colors.line}`, borderRadius: 18, background: colors.paper }}>
      <span style={{ color: colors.mintDeep, fontSize: 14, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>{company}</span>
      <span style={{ marginTop: 10, color: colors.ink, fontSize: 24, fontWeight: 700, letterSpacing: -0.6 }}>{role}</span>
      <span style={{ marginTop: 18, color: colors.mutedInk, fontSize: 15 }}>{tags}</span>
    </div>
  );
}

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: colors.canvas, color: colors.ink, padding: "54px 62px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", display: "flex", width: 330, height: 330, right: -110, top: -150, borderRadius: 999, background: colors.mint }} />
      <div style={{ position: "absolute", display: "flex", width: 180, height: 180, right: 72, top: -82, borderRadius: 999, border: `1px solid ${colors.ink}` }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 12, background: colors.ink }}>
            <span style={{ color: colors.mint, fontSize: 25, fontWeight: 800 }}>o</span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1.2 }}>openings.dev</span>
        </div>
        <span style={{ padding: "9px 15px", border: `1px solid ${colors.ink}`, borderRadius: 999, color: colors.ink, fontSize: 13, fontWeight: 700, letterSpacing: 1.1 }}>OPEN SOURCE · PUBLIC DATA</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 46 }}>
        <span style={{ maxWidth: 850, fontSize: 67, lineHeight: 1.02, fontWeight: 800, letterSpacing: -3.8 }}>Find tech jobs where communities already gather.</span>
        <span style={{ marginTop: 18, maxWidth: 760, color: colors.mutedInk, fontSize: 22, lineHeight: 1.35 }}>Open roles shared through public GitHub communities, linked back to the original source.</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: 34, height: 62, border: `1px solid ${colors.ink}`, borderRadius: 15, background: colors.paper, overflow: "hidden" }}>
        <span style={{ display: "flex", alignItems: "center", flex: 1, height: "100%", padding: "0 22px", color: colors.mutedInk, fontSize: 18 }}>Frontend engineer, React, or Brazil</span>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch", padding: "0 28px", background: colors.mint, color: colors.ink, fontSize: 17, fontWeight: 800 }}>Search jobs</span>
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
        <ResultPreview company="Community signal" role="Senior Frontend Engineer" tags="React · TypeScript · Remote" />
        <ResultPreview company="Original source" role="Platform Engineer" tags="Go · Kubernetes · Brazil" />
        <div style={{ display: "flex", flexDirection: "column", width: 250, padding: "20px 22px", borderRadius: 18, background: colors.ink, color: colors.paper }}>
          <span style={{ color: colors.mint, fontSize: 14, fontWeight: 700, letterSpacing: 1.1 }}>OPENINGS.DEV</span>
          <span style={{ marginTop: 10, fontSize: 24, lineHeight: 1.12, fontWeight: 700 }}>A clearer path to the original listing.</span>
        </div>
      </div>
    </div>,
    size,
  );
}
