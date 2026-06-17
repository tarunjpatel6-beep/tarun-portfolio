import { useState, useEffect } from "react";
import EVMSModule from "./EVMSModule";
import FPAModule from "./FPAModule";
import BCAModule from "./BCAModule";
import CapstoneHub from "./CapstoneHub";
import { loadVisibility, saveVisibility, TRAINING_ADMIN_PASS, TRAINING_CATALOG } from "./trainingConfig";

const T = {
  bg: "#070710", card: "#0e0e1a", border: "#1e1e32",
  cyan: "#00c2ff", violet: "#8b5cf6", blue: "#3b82f6", text: "#e8e6f0", textDim: "#6b6b85", textMuted: "#4a4a60",
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
  {
    id: "bca", accent: T.blue, icon: "✈️",
    eyebrow: "AIRCRAFT CONTRACTS TRACK",
    title: "AIRCRAFT CONTRACTS",
    desc: "Commercial aircraft & aerospace airline contracts, ground-up. The market and duopoly, sales campaigns and deal strategy, the Purchase Agreement, pricing and escalation, negotiation, contractual commitments and financing, and revenue recognition at delivery.",
    tags: ["7 Modules", "Deal Strategy + ASC 606", "Practice + Exams"],
  },
];

export default function FinanceLab() {
  const [track, setTrack] = useState(null);
  const [hidden, setHidden] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [taps, setTaps] = useState(0);

  useEffect(() => { loadVisibility().then(h => { setHidden(h); setLoaded(true); }); }, []);

  const tapEyebrow = () => {
    const n = taps + 1; setTaps(n);
    if (n >= 5) {
      setTaps(0);
      const entry = window.prompt("Admin passphrase:");
      if (entry === TRAINING_ADMIN_PASS) { setAdmin(true); setAdminOpen(true); }
      else if (entry !== null) window.alert("Incorrect passphrase.");
    }
  };

  const toggle = async (key) => {
    const nh = { ...hidden };
    if (nh[key]) delete nh[key]; else nh[key] = true;
    setHidden(nh);
    await saveVisibility(nh);
  };

  if (track === "defense") return <TrackShell onBack={() => setTrack(null)} accent={T.cyan}><EVMSModule /></TrackShell>;
  if (track === "fpa") return <TrackShell onBack={() => setTrack(null)} accent={T.violet}><FPAModule /></TrackShell>;
  if (track === "bca") return <TrackShell onBack={() => setTrack(null)} accent={T.blue}><BCAModule /></TrackShell>;
  if (track === "capstone") return <TrackShell onBack={() => setTrack(null)} accent="#f59e0b"><CapstoneHub /></TrackShell>;

  const visibleTracks = TRACKS.filter(tr => admin || !hidden[`track:${tr.id}`]);
  const capstoneHidden = hidden["section:capstone"];
  const showCapstone = admin || !capstoneHidden;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, paddingTop: 80 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {adminOpen && <AdminPanel hidden={hidden} toggle={toggle} onClose={() => setAdminOpen(false)} />}

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.4s ease" }}>
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div onClick={tapEyebrow} style={{ fontSize: 12, fontFamily: T.mono, color: admin ? "#10b981" : T.textDim, letterSpacing: 4, marginBottom: 10, cursor: "default", userSelect: "none" }}>INTERACTIVE TRAINING{admin ? " · ADMIN" : ""}</div>
          <h1 style={{ fontFamily: T.display, fontSize: 56, letterSpacing: 4, color: T.text, lineHeight: 0.95, marginBottom: 14 }}>FINANCE LAB</h1>
          <p style={{ fontSize: 15, color: T.textDim, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Hands-on finance training built from the ground up. Choose a track to learn the concepts, drill deep question banks, and earn mastery — with your progress saved across devices.
          </p>
          {admin && <button onClick={() => setAdminOpen(true)} style={{ marginTop: 14, background: "#10b98122", border: "1px solid #10b981", color: "#10b981", borderRadius: 8, padding: "7px 16px", fontSize: 11, fontFamily: T.mono, letterSpacing: 1, cursor: "pointer" }}>⚙ MANAGE VISIBILITY</button>}
        </div>

        {!loaded ? (
          <div style={{ textAlign: "center", padding: 40, color: T.textMuted, fontFamily: T.mono, fontSize: 13 }}>Loading tracks…</div>
        ) : (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {visibleTracks.map(tr => {
            const trackHidden = hidden[`track:${tr.id}`];
            return (
            <button key={tr.id} onClick={() => setTrack(tr.id)}
              style={{ background: T.card, border: `1px solid ${tr.accent}33`, borderRadius: 16, padding: 26, cursor: "pointer", textAlign: "left", transition: "all 0.2s", display: "flex", flexDirection: "column", minHeight: 280, opacity: trackHidden ? 0.5 : 1, position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = tr.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = tr.accent + "33"; e.currentTarget.style.transform = "translateY(0)"; }}>
              {admin && trackHidden && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontFamily: T.mono, color: "#ef4444", background: "#ef444422", padding: "2px 7px", borderRadius: 8 }}>HIDDEN</div>}
              <div style={{ fontSize: 40, marginBottom: 16 }}>{tr.icon}</div>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: tr.accent, letterSpacing: 2, marginBottom: 6 }}>{tr.eyebrow}</div>
              <div style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 1.5, color: T.text, marginBottom: 10, lineHeight: 1 }}>{tr.title}</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{tr.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {tr.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: T.mono, color: T.textDim, background: T.bg, padding: "3px 9px", borderRadius: 10, border: `1px solid ${T.border}` }}>{t}</span>)}
              </div>
              <div style={{ fontFamily: T.display, fontSize: 16, letterSpacing: 2, color: tr.accent }}>ENTER TRACK →</div>
            </button>
          );})}
        </div>

        {showCapstone && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setTrack("capstone")}
            style={{ width: "100%", background: "linear-gradient(135deg, #1a1207, #0e0e1a)", border: "1px solid #f59e0b44", borderRadius: 16, padding: 24, cursor: "pointer", textAlign: "left", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 20, opacity: capstoneHidden ? 0.5 : 1, position: "relative" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#f59e0b44"; e.currentTarget.style.transform = "translateY(0)"; }}>
            {admin && capstoneHidden && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontFamily: T.mono, color: "#ef4444", background: "#ef444422", padding: "2px 7px", borderRadius: 8 }}>HIDDEN</div>}
            <div style={{ fontSize: 44, flexShrink: 0 }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: "#f59e0b", letterSpacing: 2, marginBottom: 6 }}>CAPSTONE PROJECTS</div>
              <div style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 1.5, color: T.text, marginBottom: 8, lineHeight: 1 }}>APPLY IT ALL — REAL-WORLD CASES</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>Work a connected scenario end-to-end — a defense program, a company, or an aircraft deal — applying every concept from the tracks. Calculations checked, model answers, and a results debrief. Run the full case or drill any single stage.</div>
            </div>
            <div style={{ fontFamily: T.display, fontSize: 16, letterSpacing: 2, color: "#f59e0b", flexShrink: 0 }}>ENTER →</div>
          </button>
        </div>
        )}

        <div style={{ marginTop: 28, textAlign: "center", fontSize: 12, color: T.textMuted, lineHeight: 1.6 }}>
          More tracks in development — program finance, enterprise roll-up, and strategy & planning.
        </div>
        </>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ hidden, toggle, onClose }) {
  const Row = ({ k, label }) => {
    const isHidden = !!hidden[k];
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e1e32" }}>
        <span style={{ fontSize: 13, color: "#e8e6f0" }}>{label}</span>
        <button onClick={() => toggle(k)}
          style={{ background: isHidden ? "#ef444422" : "#10b98122", border: `1px solid ${isHidden ? "#ef4444" : "#10b981"}`, color: isHidden ? "#ef4444" : "#10b981", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, cursor: "pointer", minWidth: 90 }}>
          {isHidden ? "HIDDEN" : "VISIBLE"}
        </button>
      </div>
    );
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "80px 16px", overflowY: "auto" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0e0e1a", border: "1px solid #2a2a40", borderRadius: 16, padding: 24, maxWidth: 460, width: "100%", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, letterSpacing: 2, color: "#10b981" }}>VISIBILITY ADMIN</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b6b85", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: "#6b6b85", marginBottom: 18, lineHeight: 1.5 }}>Toggle anything visible or hidden. Changes save instantly and apply to all visitors.</div>

        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6", letterSpacing: 2, marginBottom: 4 }}>TRAINING TRACKS</div>
        {TRAINING_CATALOG.tracks.map(t => <Row key={t.key} k={t.key} label={t.label} />)}

        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#f59e0b", letterSpacing: 2, margin: "18px 0 4px" }}>CAPSTONE</div>
        <Row k={TRAINING_CATALOG.capstoneSection.key} label={TRAINING_CATALOG.capstoneSection.label} />
        {TRAINING_CATALOG.capstones.map(c => <Row key={c.key} k={c.key} label={c.label} />)}

        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#f97316", letterSpacing: 2, margin: "18px 0 4px" }}>ARENAS</div>
        {TRAINING_CATALOG.arenas.map(a => <Row key={a.key} k={a.key} label={a.label} />)}

        <button onClick={onClose} style={{ width: "100%", marginTop: 20, background: "#10b981", border: "none", color: "#fff", borderRadius: 10, padding: 12, fontFamily: "'Bebas Neue',cursive", fontSize: 16, letterSpacing: 2, cursor: "pointer" }}>DONE</button>
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
