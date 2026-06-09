import { useState } from "react";
import EVMSModule from "./EVMSModule";
import FPAModule from "./FPAModule";

const T = {
  bg: "#070710", card: "#0e0e1a", border: "#1e1e32",
  cyan: "#00c2ff", violet: "#8b5cf6", text: "#e8e6f0", textDim: "#6b6b85", textMuted: "#4a4a60",
  font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace", display: "'Bebas Neue',cursive",
};

const TRACKS = [
  {
    id: "defense", accent: T.cyan, icon: "🛩️",
    eyebrow: "DEFENSE FINANCE TRACK",
    title: "EVMS FOUNDATIONS",
    desc: "Earned Value Management from the finance seat. Funding and color of money, contract types and fee, performance metrics, EAC forecasting, and the financial reporting behind every major defense program.",
    tags: ["7 Modules", "FAR / CAS / Appropriations", "Practice + Exams"],
  },
  {
    id: "fpa", accent: T.violet, icon: "📈",
    eyebrow: "FP&A TRACK",
    title: "FP&A FOUNDATIONS",
    desc: "Corporate financial planning & analysis, industry-agnostic. The three statements, budgeting and forecasting, variance analysis, working capital and cash flow, and valuation and decision analysis.",
    tags: ["5 Modules", "Flagship Depth", "Practice + Exams"],
  },
];

export default function FinanceLab() {
  const [track, setTrack] = useState(null);

  if (track === "defense") return <TrackShell onBack={() => setTrack(null)} accent={T.cyan}><EVMSModule /></TrackShell>;
  if (track === "fpa") return <TrackShell onBack={() => setTrack(null)} accent={T.violet}><FPAModule /></TrackShell>;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, paddingTop: 80 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.4s ease" }}>
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontFamily: T.mono, color: T.textDim, letterSpacing: 4, marginBottom: 10 }}>INTERACTIVE TRAINING</div>
          <h1 style={{ fontFamily: T.display, fontSize: 56, letterSpacing: 4, color: T.text, lineHeight: 0.95, marginBottom: 14 }}>FINANCE LAB</h1>
          <p style={{ fontSize: 15, color: T.textDim, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Hands-on finance training built from the ground up. Choose a track to learn the concepts, drill deep question banks, and earn mastery — with your progress saved across devices.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {TRACKS.map(tr => (
            <button key={tr.id} onClick={() => setTrack(tr.id)}
              style={{ background: T.card, border: `1px solid ${tr.accent}33`, borderRadius: 16, padding: 26, cursor: "pointer", textAlign: "left", transition: "all 0.2s", display: "flex", flexDirection: "column", minHeight: 280 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = tr.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = tr.accent + "33"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{tr.icon}</div>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: tr.accent, letterSpacing: 2, marginBottom: 6 }}>{tr.eyebrow}</div>
              <div style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 1.5, color: T.text, marginBottom: 10, lineHeight: 1 }}>{tr.title}</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{tr.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {tr.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: T.mono, color: T.textDim, background: T.bg, padding: "3px 9px", borderRadius: 10, border: `1px solid ${T.border}` }}>{t}</span>)}
              </div>
              <div style={{ fontFamily: T.display, fontSize: 16, letterSpacing: 2, color: tr.accent }}>ENTER TRACK →</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: "center", fontSize: 12, color: T.textMuted, lineHeight: 1.6 }}>
          More tracks in development — program finance, enterprise roll-up, and strategy & planning.
        </div>
      </div>
    </div>
  );
}

function TrackShell({ children, onBack, accent }) {
  return (
    <div style={{ position: "relative" }}>
      <button onClick={onBack}
        style={{ position: "fixed", top: 88, left: 16, zIndex: 50, background: "rgba(14,14,26,0.9)", backdropFilter: "blur(8px)", border: `1px solid ${accent}44`, color: accent, borderRadius: 8, padding: "8px 14px", fontSize: 11, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>
        ← ALL TRACKS
      </button>
      {children}
    </div>
  );
}
