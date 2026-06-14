import { useState } from "react";
import CapstoneRunner from "./CapstoneRunner";
import { EVMS_CAPSTONES } from "./evmsCapstones";
import { FPA_CAPSTONES } from "./fpaCapstones";
import { BCA_CAPSTONES } from "./bcaCapstones";

const THEMES = {
  evms: {
    accent: "#00c2ff", accentGlow: "rgba(0,194,255,0.12)", bg: "#0a0e17", card: "#0d1420", border: "#1a2540",
    text: "#e2e8f0", textDim: "#64748b", textMuted: "#475569", green: "#10b981", red: "#ef4444", gold: "#f59e0b",
    font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace", display: "'Bebas Neue',cursive",
  },
  fpa: {
    accent: "#8b5cf6", accentGlow: "rgba(139,92,246,0.12)", bg: "#0a0a14", card: "#12121f", border: "#222236",
    text: "#e8e6f0", textDim: "#6b6b85", textMuted: "#4a4a60", green: "#10b981", red: "#ef4444", gold: "#f59e0b",
    font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace", display: "'Bebas Neue',cursive",
  },
  bca: {
    accent: "#3b82f6", accentGlow: "rgba(59,130,246,0.12)", bg: "#080d18", card: "#0f1626", border: "#1d2942",
    text: "#e6ecf7", textDim: "#6b7a96", textMuted: "#465268", green: "#10b981", red: "#ef4444", gold: "#f59e0b",
    font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace", display: "'Bebas Neue',cursive",
  },
};

export default function CapstoneHub() {
  const [trackKey, setTrackKey] = useState(null); // 'evms' | 'fpa'
  const [scenario, setScenario] = useState(null);
  const [stageIdx, setStageIdx] = useState(null); // null = full run; number = modular
  const [running, setRunning] = useState(false);

  const T = THEMES[trackKey] || THEMES.evms;
  const capstones = trackKey === "fpa" ? FPA_CAPSTONES : trackKey === "bca" ? BCA_CAPSTONES : EVMS_CAPSTONES;

  // ─── RUNNING ────────────────────────────────────────────────────
  if (running && scenario) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 80 }}>
        <style>{font}</style>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "30px 20px" }}>
          <CapstoneRunner scenario={scenario} theme={T} singleStageIndex={stageIdx}
            onExit={() => { setRunning(false); setScenario(null); setStageIdx(null); }} />
        </div>
      </div>
    );
  }

  // ─── TRACK PICK ─────────────────────────────────────────────────
  if (!trackKey) {
    return (
      <Wrap T={THEMES.evms}>
        <Head title="CAPSTONE PROJECTS" sub="Apply everything in a connected, real-world case. Choose a track — then run the full project end-to-end, or drill any single stage on its own." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <TrackCard accent="#00c2ff" icon="🛩️" eyebrow="DEFENSE FINANCE" title="EVMS CAPSTONES" desc="Run a defense program through a quarter: contract, metrics, EAC, funding, variance, and the executive brief." count={`${EVMS_CAPSTONES.length} scenarios`} onClick={() => setTrackKey("evms")} />
          <TrackCard accent="#8b5cf6" icon="📈" eyebrow="FP&A" title="FP&A CAPSTONES" desc="Run a company through the cycle: statements, forecast, variance, working capital, and a capital allocation call." count={`${FPA_CAPSTONES.length} scenarios`} onClick={() => setTrackKey("fpa")} />
          <TrackCard accent="#3b82f6" icon="✈️" eyebrow="AIRCRAFT CONTRACTS" title="AIRCRAFT CAPSTONES" desc="Run an aircraft deal end-to-end: order structure, pricing and escalation, negotiation and commitments, and revenue recognition at delivery." count={`${BCA_CAPSTONES.length} scenarios`} onClick={() => setTrackKey("bca")} />
        </div>
      </Wrap>
    );
  }

  // ─── SCENARIO PICK ──────────────────────────────────────────────
  if (!scenario) {
    return (
      <Wrap T={T}>
        <BackBtn T={T} onClick={() => setTrackKey(null)} label="All Capstones" />
        <Head title={trackKey === "fpa" ? "FP&A CAPSTONES" : "EVMS CAPSTONES"} sub="Pick a scenario to work through." accent={T.accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {capstones.map(c => (
            <button key={c.id} onClick={() => setScenario(c)}
              style={{ background: T.card, border: `1px solid ${T.accent}22`, borderRadius: 14, padding: 20, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.accent + "22"}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 6 }}>{c.tag}</div>
              <div style={{ fontFamily: T.display, fontSize: 26, letterSpacing: 1, color: T.text, lineHeight: 1, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted, marginBottom: 10 }}>{c.org}</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>{c.summary}</div>
            </button>
          ))}
        </div>
      </Wrap>
    );
  }

  // ─── MODE PICK (full vs modular) ────────────────────────────────
  return (
    <Wrap T={T}>
      <BackBtn T={T} onClick={() => setScenario(null)} label="Scenarios" />
      <Head title={scenario.title} sub={scenario.summary} accent={T.accent} />
      <button onClick={() => { setStageIdx(null); setRunning(true); }}
        style={{ background: T.accent, border: "none", borderRadius: 14, padding: 20, cursor: "pointer", textAlign: "left", width: "100%", marginBottom: 20 }}>
        <div style={{ fontFamily: T.display, fontSize: 22, letterSpacing: 1, color: "#fff", marginBottom: 4 }}>▶ RUN FULL CAPSTONE</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>All {scenario.stages.length} stages in sequence, ending with an AI executive debrief.</div>
      </button>
      <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted, letterSpacing: 1, marginBottom: 12 }}>OR DRILL A SINGLE STAGE (MODULAR)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {scenario.stages.map((s, i) => (
          <button key={s.id} onClick={() => { setStageIdx(i); setRunning(true); }}
            style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.accent + "66"}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
            <span style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, background: T.accentGlow, borderRadius: 6, padding: "4px 9px", flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{s.moduleLabel}</div>
            </div>
            <span style={{ color: T.accent, fontSize: 13 }}>→</span>
          </button>
        ))}
      </div>
    </Wrap>
  );
}

const font = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`;

function Wrap({ children, T }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, paddingTop: 80 }}>
      <style>{font}</style>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "30px 20px", animation: "fadeIn 0.4s ease" }}>{children}</div>
    </div>
  );
}
function Head({ title, sub, accent = "#94a3b8" }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 40, letterSpacing: 3, color: "#e2e8f0", lineHeight: 1, marginBottom: 10 }}>{title}</h1>
      <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{sub}</p>
    </div>
  );
}
function BackBtn({ T, onClick, label }) {
  return <button onClick={onClick} style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textDim, borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", marginBottom: 18, fontFamily: T.mono }}>← {label}</button>;
}
function TrackCard({ accent, icon, eyebrow, title, desc, count, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "#0d1420", border: `1px solid ${accent}33`, borderRadius: 16, padding: 24, cursor: "pointer", textAlign: "left", transition: "all 0.2s", minHeight: 230, display: "flex", flexDirection: "column" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = accent + "33"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ fontSize: 38, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: accent, letterSpacing: 2, marginBottom: 6 }}>{eyebrow}</div>
      <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, letterSpacing: 1.5, color: "#e2e8f0", marginBottom: 10, lineHeight: 1 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, flex: 1 }}>{desc}</div>
      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#475569", marginTop: 12 }}>{count} · ENTER →</div>
    </button>
  );
}
