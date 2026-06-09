import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FPA_QUESTION_BANKS, getFPAQuestions } from "./fpaQuestions";
import { FPA_LESSON_CONTENT } from "./fpaContent";

// ─── Firebase (reuse existing app) ────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAxL5lDrrzJO_7L1zzbH37R6ArZuDiXHtU",
  authDomain: "finance-arena-ec4ff.firebaseapp.com",
  projectId: "finance-arena-ec4ff",
  storageBucket: "finance-arena-ec4ff.firebasestorage.app",
  messagingSenderId: "144073874887",
  appId: "1:144073874887:web:2a84bacbfb416261938de2",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const userDocId = (name, pin) => `${name.toLowerCase().trim().replace(/[^a-z0-9]/g, "")}-${pin}`;
const loadUser = async (name, pin) => {
  try { const snap = await getDoc(doc(db, "fpa-users", userDocId(name, pin))); return snap.exists() ? snap.data() : null; } catch { return null; }
};
const saveUser = async (name, pin, data) => {
  try { await setDoc(doc(db, "fpa-users", userDocId(name, pin)), data); } catch {}
};

// ─── Design tokens (violet identity for FP&A) ─────────────────────
const T = {
  bg: "#0a0a14", card: "#12121f", border: "#222236",
  accent: "#8b5cf6", accentGlow: "rgba(139,92,246,0.12)",
  gold: "#f59e0b", green: "#10b981", red: "#ef4444",
  text: "#e8e6f0", textDim: "#6b6b85", textMuted: "#4a4a60",
  font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace", display: "'Bebas Neue',cursive",
};

const MODULES = [
  { id: "statements", title: "The Three Statements", icon: "📑", desc: "Income statement, balance sheet, cash flow — and the linkages that make a model hold together", duration: "12 min" },
  { id: "budgeting", title: "Budgeting & Forecasting", icon: "📅", desc: "AOP vs. rolling forecast, driver-based modeling, scenario planning, and the behavioral traps", duration: "12 min" },
  { id: "variance", title: "Variance & Performance", icon: "📊", desc: "Price-volume-mix, flexible budgets, timing vs. permanent, and building bridges", duration: "13 min" },
  { id: "workingcapital", title: "Working Capital & Cash Flow", icon: "💧", desc: "The cash conversion cycle, DSO/DPO/DIO levers, and free cash flow", duration: "12 min" },
  { id: "valuation", title: "Valuation & Decisions", icon: "⚖️", desc: "Time value of money, NPV/IRR, unit economics, and allocating scarce capital", duration: "14 min" },
];

const btnStyle = (color, primary = false) => ({
  width: "100%", background: primary ? color : "transparent", color: primary ? "#fff" : color,
  border: primary ? "none" : `1px solid ${color}`, borderRadius: 10, padding: "14px",
  fontFamily: T.display, fontSize: 17, letterSpacing: 2, cursor: "pointer", transition: "all 0.2s",
});

const ProgressBar = ({ current, total }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
    <div style={{ flex: 1, height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(current / total) * 100}%`, background: T.accent, borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
    <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{current}/{total}</div>
  </div>
);

// ─── Rich Lesson Content Renderer ─────────────────────────────────
const calloutStyle = {
  key: { bg: "rgba(139,92,246,0.08)", border: "#8b5cf644", label: "📌 KEY CONCEPT", labelColor: T.accent },
  warning: { bg: "rgba(239,68,68,0.07)", border: "#ef444444", label: "⚠️ COMMON PITFALL", labelColor: T.red },
  insight: { bg: "rgba(245,158,11,0.07)", border: "#f59e0b44", label: "💡 FP&A INSIGHT", labelColor: T.gold },
};

function ContentBlock({ block }) {
  switch (block.type) {
    case "heading":
      return <h3 style={{ fontFamily: T.display, fontSize: 24, letterSpacing: 1.5, color: T.text, marginTop: 28, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${T.border}` }}>{block.text}</h3>;
    case "prose":
      return <p style={{ fontSize: 14.5, color: T.textDim, lineHeight: 1.8, marginBottom: 14 }}>{block.text}</p>;
    case "terms":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {block.items.map(t => (
            <div key={t.abbr} style={{ background: T.card, borderRadius: 10, padding: 15, borderLeft: `3px solid ${T.accent}` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontFamily: T.display, fontSize: 18, color: T.accent, letterSpacing: 1 }}>{t.abbr}</span>
                <span style={{ fontSize: 12, color: T.text, fontWeight: 600 }}>{t.full}</span>
              </div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      );
    case "callout": {
      const c = calloutStyle[block.variant] || calloutStyle.key;
      return (
        <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: T.mono, color: c.labelColor, letterSpacing: 1, marginBottom: 6 }}>{c.label}</div>
          {block.title && <div style={{ fontSize: 14, color: T.text, fontWeight: 600, marginBottom: 6 }}>{block.title}</div>}
          <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.7 }}>{block.body}</div>
        </div>
      );
    }
    case "table":
      return (
        <div style={{ background: T.card, borderRadius: 10, overflow: "hidden", marginBottom: 16, border: `1px solid ${T.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${block.headers.length}, 1fr)` }}>
            {block.headers.map((h, i) => (
              <div key={i} style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: 0.5, padding: "10px 12px", fontWeight: 700, background: T.bg }}>{h}</div>
            ))}
          </div>
          {block.rows.map((row, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${block.headers.length}, 1fr)`, borderTop: `1px solid ${T.border}` }}>
              {row.map((cell, ci) => (
                <div key={ci} style={{ fontSize: 12, color: ci === 0 ? T.text : T.textDim, padding: "10px 12px", lineHeight: 1.5, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      );
    case "example":
      return (
        <div style={{ background: "rgba(16,185,129,0.05)", border: `1px solid ${T.green}33`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: T.mono, color: T.green, letterSpacing: 1, marginBottom: 8 }}>🧮 WORKED EXAMPLE</div>
          {block.title && <div style={{ fontSize: 14, color: T.text, fontWeight: 600, marginBottom: 8 }}>{block.title}</div>}
          {block.intro && <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65, marginBottom: 10 }}>{block.intro}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            {block.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.green, background: "rgba(16,185,129,0.12)", borderRadius: 4, padding: "2px 7px", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6, fontFamily: T.mono }}>{step}</span>
              </div>
            ))}
          </div>
          {block.result && (
            <div style={{ background: T.bg, borderRadius: 8, padding: 12, borderLeft: `3px solid ${T.green}` }}>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.65 }}>{block.result}</div>
            </div>
          )}
        </div>
      );
    case "list":
      return (
        <ul style={{ marginBottom: 16, paddingLeft: 0, listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7, marginBottom: 8, paddingLeft: 20, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: T.accent }}>▸</span>{item}
            </li>
          ))}
        </ul>
      );
    default: return null;
  }
}

function RichLesson({ moduleId, onComplete }) {
  const content = FPA_LESSON_CONTENT[moduleId];
  if (!content) return null;
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: T.display, fontSize: 30, letterSpacing: 2, color: T.text, marginBottom: 6 }}>{content.title}</h2>
        <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6, fontStyle: "italic" }}>{content.subtitle}</p>
      </div>
      <div>{content.blocks.map((block, i) => <ContentBlock key={i} block={block} />)}</div>
      <div style={{ marginTop: 24, padding: 18, background: T.card, border: `1px solid ${T.accent}33`, borderRadius: 12, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: T.textDim, marginBottom: 12, lineHeight: 1.6 }}>Finished reading? Head to <span style={{ color: T.green }}>Practice</span> to drill the question bank, then take the <span style={{ color: T.gold }}>Final Exam</span> to earn mastery.</div>
        <button onClick={onComplete} style={btnStyle(T.accent, true)}>← Back to Module Menu</button>
      </div>
    </div>
  );
}

// ─── Practice Mode ────────────────────────────────────────────────
function PracticeMode({ moduleId, onBack }) {
  const [deck] = useState(() => getFPAQuestions(moduleId));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const q = deck[idx];
  const isLast = idx + 1 >= deck.length;

  const choose = (i) => { if (answered !== null) return; setAnswered(i); if (i === q.correct) setCorrectCount(c => c + 1); };
  const next = () => { if (isLast) { onBack(); return; } setIdx(i => i + 1); setAnswered(null); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1 }}>PRACTICE · {idx + 1}/{deck.length}</div>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{correctCount} correct</div>
      </div>
      <ProgressBar current={idx + 1} total={deck.length} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 22, marginBottom: 16 }}>
        <div style={{ fontSize: 16, color: T.text, lineHeight: 1.6, marginBottom: 18 }}>{q.q}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, i) => {
            let bg = "transparent", bdr = T.border, col = T.textDim;
            if (answered !== null) {
              if (i === q.correct) { bg = "rgba(16,185,129,0.12)"; bdr = T.green; col = T.green; }
              else if (i === answered) { bg = "rgba(239,68,68,0.12)"; bdr = T.red; col = T.red; }
            }
            return (
              <button key={i} onClick={() => choose(i)} style={{ background: bg, border: `1px solid ${bdr}`, color: col, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: answered !== null ? "default" : "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
                <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            );
          })}
        </div>
        {answered !== null && (
          <div style={{ background: answered === q.correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${answered === q.correct ? T.green : T.red}44`, borderRadius: 8, padding: 14, marginTop: 14 }}>
            <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{q.explain}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack} style={btnStyle(T.textMuted)}>← Exit Practice</button>
        {answered !== null && <button onClick={next} style={btnStyle(T.accent, true)}>{isLast ? "Finish" : "Next →"}</button>}
      </div>
    </div>
  );
}

// ─── Final Exam ───────────────────────────────────────────────────
function FinalExam({ moduleId, onComplete, onBack }) {
  const EXAM_SIZE = 10, PASS = 80;
  const [deck] = useState(() => getFPAQuestions(moduleId, EXAM_SIZE));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const q = deck[idx];
  const isLast = idx + 1 >= deck.length;

  const submit = () => {
    if (selected === null) return;
    const na = [...answers, { q, selected, correct: selected === q.correct }];
    setAnswers(na);
    if (isLast) setDone(true); else { setIdx(i => i + 1); setSelected(null); }
  };
  const score = Math.round((answers.filter(a => a.correct).length / deck.length) * 100);
  const passed = score >= PASS;

  if (done) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "30px 20px", background: passed ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${passed ? T.green : T.red}44`, borderRadius: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{passed ? "🎓" : "📚"}</div>
          <div style={{ fontFamily: T.display, fontSize: 30, color: passed ? T.green : T.red, letterSpacing: 2 }}>{passed ? "MODULE MASTERED" : "NOT YET — REVIEW & RETRY"}</div>
          <div style={{ fontFamily: T.display, fontSize: 52, color: T.text, margin: "8px 0" }}>{score}%</div>
          <div style={{ fontSize: 12, fontFamily: T.mono, color: T.textDim }}>{answers.filter(a => a.correct).length}/{deck.length} correct · {PASS}% to pass</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {answers.map((a, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${a.correct ? T.green + "33" : T.red + "33"}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: a.correct ? T.green : T.red, fontSize: 14 }}>{a.correct ? "✓" : "✗"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.text, lineHeight: 1.5, marginBottom: 4 }}>{a.q.q}</div>
                  {!a.correct && <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.5 }}>{a.q.explain}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onBack} style={btnStyle(T.textMuted)}>← Back</button>
          <button onClick={() => onComplete(score)} style={btnStyle(passed ? T.green : T.accent, true)}>{passed ? "Save Mastery ✓" : "Save & Retry Later"}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.gold, letterSpacing: 1 }}>FINAL EXAM · {idx + 1}/{deck.length}</div>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{PASS}% to pass</div>
      </div>
      <ProgressBar current={idx + 1} total={deck.length} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 22, marginBottom: 16 }}>
        <div style={{ fontSize: 16, color: T.text, lineHeight: 1.6, marginBottom: 18 }}>{q.q}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? T.accentGlow : "transparent", border: `1px solid ${selected === i ? T.accent : T.border}`, color: selected === i ? T.accent : T.textDim, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
              <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          ))}
        </div>
      </div>
      <button onClick={submit} disabled={selected === null} style={btnStyle(T.accent, true)}>{isLast ? "Submit Exam" : "Next Question →"}</button>
    </div>
  );
}

// ─── Knowledge Module Wrapper ─────────────────────────────────────
function KnowledgeModule({ moduleId, mastery, onComplete }) {
  const [mode, setMode] = useState("menu");
  const bankSize = (FPA_QUESTION_BANKS[moduleId] || []).length;
  if (mode === "learn") return <RichLesson moduleId={moduleId} onComplete={() => setMode("menu")} />;
  if (mode === "practice") return <PracticeMode moduleId={moduleId} onBack={() => setMode("menu")} />;
  if (mode === "exam") return <FinalExam moduleId={moduleId} onComplete={(s) => { onComplete(s); setMode("menu"); }} onBack={() => setMode("menu")} />;

  const card = (color) => ({ background: T.card, border: `1px solid ${color}33`, borderRadius: 12, padding: 18, cursor: "pointer", transition: "all 0.2s", width: "100%" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button onClick={() => setMode("learn")} style={card(T.accent)}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 26 }}>📖</div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontFamily: T.display, fontSize: 18, letterSpacing: 1, color: T.text }}>LEARN</div>
            <div style={{ fontSize: 12, color: T.textDim }}>Deep reference lesson with worked examples and key concepts</div>
          </div>
        </div>
      </button>
      <button onClick={() => setMode("practice")} style={card(T.green)}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 26 }}>🎯</div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontFamily: T.display, fontSize: 18, letterSpacing: 1, color: T.text }}>PRACTICE</div>
            <div style={{ fontSize: 12, color: T.textDim }}>Drill all {bankSize} questions with instant explanations — no scoring</div>
          </div>
        </div>
      </button>
      <button onClick={() => setMode("exam")} style={card(T.gold)}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 26 }}>🎓</div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontFamily: T.display, fontSize: 18, letterSpacing: 1, color: T.text }}>FINAL EXAM</div>
              {mastery > 0 && <span style={{ fontSize: 10, fontFamily: T.mono, color: mastery >= 80 ? T.green : T.gold, background: T.bg, padding: "2px 8px", borderRadius: 10 }}>Best: {mastery}%</span>}
            </div>
            <div style={{ fontSize: 12, color: T.textDim }}>10 random questions · 80% to earn mastery</div>
          </div>
        </div>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════
export default function FPAModule() {
  const [screen, setScreen] = useState("login");
  const [activeModule, setActiveModule] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [mastery, setMastery] = useState({});
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("fpa-user") || "null");
      if (saved?.name && saved?.pin) {
        setLoading(true);
        loadUser(saved.name, saved.pin).then(data => {
          setUser(saved);
          if (data) { setCompleted(new Set(data.completed || [])); setMastery(data.mastery || {}); }
          setScreen("hub"); setLoading(false);
        });
      }
    } catch {}
  }, []);

  const doLogin = async () => {
    if (!nameInput.trim() || pinInput.length !== 4) { setLoginError("Enter a name and 4-digit PIN."); return; }
    setLoading(true); setLoginError("");
    const u = { name: nameInput.trim(), pin: pinInput };
    const data = await loadUser(u.name, u.pin);
    setUser(u);
    if (data) { setCompleted(new Set(data.completed || [])); setMastery(data.mastery || {}); }
    try { localStorage.setItem("fpa-user", JSON.stringify(u)); } catch {}
    setScreen("hub"); setLoading(false);
  };

  const logout = () => {
    try { localStorage.removeItem("fpa-user"); } catch {}
    setUser(null); setCompleted(new Set()); setMastery({}); setNameInput(""); setPinInput(""); setScreen("login");
  };

  const persist = (nc, nm) => { if (user) saveUser(user.name, user.pin, { name: user.name, completed: Array.from(nc), mastery: nm, lastUpdated: Date.now() }); };

  const completeExam = (moduleId, score) => {
    const nm = { ...mastery, [moduleId]: Math.max(mastery[moduleId] || 0, score) };
    setMastery(nm);
    const nc = new Set(completed);
    if (score >= 80) nc.add(moduleId);
    setCompleted(nc); persist(nc, nm);
  };

  const overallMastery = MODULES.length ? Math.round(MODULES.reduce((s, m) => s + (mastery[m.id] || 0), 0) / MODULES.length) : 0;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, paddingTop: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "30px 20px", animation: "fadeIn 0.4s ease" }}>

        {screen === "login" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontFamily: T.mono, color: T.accent, letterSpacing: 3, marginBottom: 8 }}>FP&A TRACK</div>
              <h1 style={{ fontFamily: T.display, fontSize: 42, letterSpacing: 3, color: T.text, lineHeight: 1, marginBottom: 10 }}>FP&A FOUNDATIONS</h1>
              <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7 }}>
                A flagship course in corporate financial planning & analysis. Master the three statements, budgeting and forecasting, variance analysis, working capital, and valuation — the complete FP&A toolkit, industry-agnostic.
              </p>
            </div>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 14 }}>SIGN IN TO SAVE YOUR PROGRESS ACROSS DEVICES</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6 }}>Your Name</div>
                <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="e.g. Tarun Patel" maxLength={30}
                  style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "12px 14px", color: T.text, fontSize: 15, fontFamily: T.font, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6 }}>4-Digit PIN <span style={{ color: T.textMuted }}>(remember this to return to your progress)</span></div>
                <input value={pinInput} onChange={e => setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="• • • •" inputMode="numeric"
                  style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "12px 14px", color: T.text, fontSize: 18, fontFamily: T.mono, letterSpacing: 6, outline: "none", boxSizing: "border-box" }} />
              </div>
              {loginError && <div style={{ fontSize: 12, color: T.red, marginBottom: 12 }}>{loginError}</div>}
              <button onClick={doLogin} disabled={loading} style={btnStyle(T.accent, true)}>{loading ? "Loading..." : "Enter Course →"}</button>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 12, lineHeight: 1.5 }}>
                Your name + PIN saves progress across any device. The same login works across all Finance Lab courses.
              </div>
            </div>
          </div>
        )}

        {screen === "hub" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontFamily: T.mono, color: T.accent, letterSpacing: 3, marginBottom: 6 }}>FP&A TRACK</div>
                <h1 style={{ fontFamily: T.display, fontSize: 36, letterSpacing: 3, color: T.text, lineHeight: 1 }}>FP&A FOUNDATIONS</h1>
              </div>
              <button onClick={logout} style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textDim, borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: T.mono, flexShrink: 0 }}>Sign Out</button>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.accent}33`, borderRadius: 12, padding: 18, marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted, marginBottom: 2 }}>SIGNED IN AS</div>
                <div style={{ fontFamily: T.display, fontSize: 22, letterSpacing: 1, color: T.text }}>{user?.name}</div>
              </div>
              <div style={{ display: "flex", gap: 18, textAlign: "center" }}>
                <div>
                  <div style={{ fontFamily: T.display, fontSize: 26, color: T.accent }}>{completed.size}/{MODULES.length}</div>
                  <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>COMPLETE</div>
                </div>
                <div>
                  <div style={{ fontFamily: T.display, fontSize: 26, color: overallMastery >= 80 ? T.green : T.gold }}>{overallMastery}%</div>
                  <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>MASTERY</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MODULES.map((m, i) => {
                const done = completed.has(m.id);
                const locked = i > 0 && !completed.has(MODULES[i - 1].id) && !done;
                const mScore = mastery[m.id];
                return (
                  <button key={m.id} onClick={() => { if (!locked) { setActiveModule(m.id); setScreen("module"); } }}
                    style={{ background: done ? "rgba(16,185,129,0.06)" : T.card, border: `1px solid ${done ? T.green + "44" : locked ? T.border : T.accent + "22"}`, borderRadius: 12, padding: "16px 18px", cursor: locked ? "not-allowed" : "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", opacity: locked ? 0.5 : 1 }}>
                    <div style={{ fontSize: 26, width: 46, height: 46, background: done ? "rgba(16,185,129,0.12)" : T.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {done ? "✓" : locked ? "🔒" : m.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontFamily: T.display, letterSpacing: 1, color: done ? T.green : T.text }}>{m.title}</span>
                        {mScore > 0 && <span style={{ fontSize: 9, fontFamily: T.mono, color: mScore >= 80 ? T.green : T.gold, background: T.bg, padding: "1px 6px", borderRadius: 8 }}>{mScore}%</span>}
                      </div>
                      <div style={{ fontSize: 12, color: T.textDim, lineHeight: 1.4 }}>{m.desc}</div>
                    </div>
                    <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted, flexShrink: 0 }}>{m.duration}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {screen === "module" && activeModule && (
          <div>
            <button onClick={() => { setScreen("hub"); setActiveModule(null); }}
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textDim, borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: T.mono }}>
              ← Back to Modules
            </button>
            <div style={{ fontFamily: T.display, fontSize: 24, letterSpacing: 1, color: T.text, marginBottom: 16 }}>{MODULES.find(m => m.id === activeModule)?.title}</div>
            <KnowledgeModule moduleId={activeModule} mastery={mastery[activeModule] || 0} onComplete={(s) => completeExam(activeModule, s)} />
          </div>
        )}
      </div>
    </div>
  );
}
