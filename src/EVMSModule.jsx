import { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { QUESTION_BANKS, getQuestions } from "./evmsQuestions";

// ─── Firebase (reuse existing app if already initialized) ─────────
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
  try {
    const snap = await getDoc(doc(db, "evms-users", userDocId(name, pin)));
    return snap.exists() ? snap.data() : null;
  } catch { return null; }
};
const saveUser = async (name, pin, data) => {
  try { await setDoc(doc(db, "evms-users", userDocId(name, pin)), data); } catch {}
};

// ─── AI Coach ─────────────────────────────────────────────────────
const callAI = async (prompt, systemPrompt) => {
  try {
    const res = await fetch("/.netlify/functions/ai-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, systemPrompt }),
    });
    const data = await res.json();
    return data.text || "";
  } catch { return ""; }
};

// ─── Design tokens ────────────────────────────────────────────────
const T = {
  bg: "#0a0e17", card: "#0d1420", cardHover: "#111b2e", border: "#1a2540",
  accent: "#00c2ff", accentGlow: "rgba(0,194,255,0.12)", accentDim: "#0891b2",
  gold: "#f59e0b", green: "#10b981", red: "#ef4444", orange: "#f97316",
  text: "#e2e8f0", textDim: "#64748b", textMuted: "#475569",
  font: "'DM Sans',sans-serif", mono: "'JetBrains Mono','SF Mono',monospace",
  display: "'Bebas Neue',cursive",
};

// ─── EVMS Data Generators ─────────────────────────────────────────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randF = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);

const generateControlAccount = (difficulty = 1) => {
  const names = [
    "CA-2140: Airframe Assembly", "CA-3210: Avionics Integration", "CA-1050: Software Development",
    "CA-4300: Ground Support Equipment", "CA-2600: Structural Test", "CA-1800: Systems Engineering",
    "CA-3500: Flight Test Support", "CA-2900: Propulsion Systems", "CA-4100: Training Systems",
    "CA-1200: Mission Planning Software", "CA-3800: EW Suite Integration", "CA-2300: Wiring & Harness",
  ];
  const bac = rand(800, 5000) * 10;
  const monthsComplete = rand(3, 10);
  const totalMonths = rand(12, 24);
  const plannedPct = Math.min(95, Math.round((monthsComplete / totalMonths) * 100 + rand(-5, 5)));
  const bcws = Math.round(bac * plannedPct / 100);

  let cpiTarget, spiTarget;
  if (difficulty === 1) { cpiTarget = randF(0.85, 1.15); spiTarget = randF(0.88, 1.12); }
  else if (difficulty === 2) { cpiTarget = randF(0.70, 1.20); spiTarget = randF(0.72, 1.18); }
  else { cpiTarget = randF(0.60, 1.30); spiTarget = randF(0.65, 1.25); }

  const bcwp = Math.round(bcws * spiTarget);
  const acwp = Math.round(bcwp / cpiTarget);

  return {
    name: names[rand(0, names.length - 1)],
    bac, bcws, bcwp, acwp, monthsComplete, totalMonths,
    cpi: +(bcwp / acwp).toFixed(3),
    spi: +(bcwp / bcws).toFixed(3),
    cv: bcwp - acwp,
    sv: bcwp - bcws,
  };
};

const EAC_METHODS = [
  { id: "cumCPI", name: "Cumulative CPI", formula: "BAC / CPI", calc: (bac, cpi) => Math.round(bac / cpi), desc: "Assumes future performance matches past cost efficiency" },
  { id: "cpiSpi", name: "CPI × SPI Composite", formula: "AC + (BAC - EV) / (CPI × SPI)", calc: (bac, cpi, spi, acwp, bcwp) => Math.round(acwp + (bac - bcwp) / (cpi * spi)), desc: "Accounts for both cost and schedule performance" },
  { id: "etc", name: "ETC-Based (Re-estimate)", formula: "AC + Bottom-Up ETC", calc: (bac, cpi, spi, acwp, bcwp) => Math.round(acwp + (bac - bcwp) / 1), desc: "Assumes remaining work will be completed at planned rates" },
  { id: "mgmt", name: "Management Estimate", formula: "AC + Management ETC", calc: (bac, cpi, spi, acwp, bcwp) => Math.round(acwp + (bac - bcwp) * randF(0.85, 1.15)), desc: "Based on PM judgment factoring known risks and opportunities" },
];

// ─── Module Definitions ───────────────────────────────────────────
const MODULES = [
  { id: "concepts", title: "EVMS for Finance", icon: "📐", desc: "Why finance owns this data — connecting earned value to financial performance and reporting", duration: "8 min", type: "lesson" },
  { id: "funding", title: "Funding, Budget & Cost", icon: "💰", desc: "Color of money, the funding pipeline, and why 'on budget' doesn't mean 'funded'", duration: "9 min", type: "lesson" },
  { id: "contracts", title: "Contract Types & Fee", icon: "📜", desc: "FFP, CPFF, CPIF, T&M — how risk and profitability change everything you do", duration: "9 min", type: "lesson" },
  { id: "metrics", title: "Metrics & Financial Impact", icon: "📊", desc: "Calculate CPI, SPI, CV, SV — then interpret what they mean for contract profitability", duration: "10 min", type: "exercise" },
  { id: "eac", title: "EAC & Financial Forecasting", icon: "🎯", desc: "How EAC methods drive forecast updates, revenue recognition, and profit adjustments", duration: "12 min", type: "exercise" },
  { id: "var", title: "Finance Variance Narrative", icon: "📝", desc: "Write variance analysis from the finance analyst's seat — connecting to financial statements", duration: "15 min", type: "scenario" },
  { id: "scenario", title: "Program Finance Review", icon: "🛩️", desc: "Run a financial health review across a portfolio — prioritize, escalate, and brief leadership", duration: "20 min", type: "scenario" },
];

// ═══════════════════════════════════════════════════════════════════
// MODULE 1: Core EVMS Concepts (Interactive Lesson)
// ═══════════════════════════════════════════════════════════════════
function ConceptsLesson({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const steps = [
    {
      title: "Why Finance Owns EVMS",
      content: "EVMS isn't just a project management tool — it's a financial measurement system. As a program finance analyst, EVMS data is the foundation of your forecast, your variance reporting, and your contract profitability analysis. Every EAC update, every revenue adjustment, every profit booking ties back to the earned value data flowing from the program.",
      highlight: "Engineering executes the work. Finance measures the financial health. EVMS is the bridge — it translates technical progress into dollars, and those dollars drive your financial statements.",
      visual: [
        { label: "FORECAST", sub: "EAC drives your financial outlook", color: T.accent },
        { label: "REVENUE", sub: "Earned value triggers recognition", color: T.gold },
        { label: "PROFIT", sub: "CPI trends signal margin risk", color: T.green },
      ],
    },
    {
      title: "The Three Values You Live By",
      content: "Every financial review, every variance report, and every EAC update you produce starts with these three numbers. As a finance analyst, you don't just calculate them — you interpret what they mean for the contract's financial position.",
      terms: [
        { abbr: "BCWS", full: "Budgeted Cost of Work Scheduled", aka: "Planned Value (PV)", desc: "The budgeted cost baseline — what was planned to be accomplished by now. This is your measuring stick for schedule performance and feeds into your funding profile analysis.", color: T.accent },
        { abbr: "BCWP", full: "Budgeted Cost of Work Performed", aka: "Earned Value (EV)", desc: "The budgeted value of work actually completed. For finance, this is critical — it drives percentage-of-completion revenue recognition and is the numerator in every performance ratio you track.", color: T.green },
        { abbr: "ACWP", full: "Actual Cost of Work Performed", aka: "Actual Cost (AC)", desc: "What was actually spent. This hits your cost pools, your actuals reporting, and when compared to BCWP, tells you whether the program is burning budget faster than it's earning value — the core of contract profitability.", color: T.red },
      ],
    },
    {
      title: "The Finance Analyst's Read",
      content: "The same data tells different stories depending on who's reading it. Here's how finance interprets the relationships — always connecting back to financial impact:",
      scenarios: [
        { condition: "BCWP > BCWS", meaning: "Revenue acceleration potential", detail: "More work completed than planned may allow earlier revenue recognition under POC", icon: "🟢" },
        { condition: "BCWP < BCWS", meaning: "Revenue and funding risk", detail: "Behind on work means revenue may slip and funding burn rate needs review", icon: "🔴" },
        { condition: "BCWP > ACWP", meaning: "Favorable contract margin", detail: "Earning value faster than spending — profit margin is expanding", icon: "🟢" },
        { condition: "BCWP < ACWP", meaning: "Margin erosion", detail: "Spending more than the value earned — contract profitability is at risk. EAC adjustment likely needed.", icon: "🔴" },
      ],
    },
    {
      title: "Quick Check",
      quiz: true,
      question: "A control account has BCWS = $500K, BCWP = $420K, ACWP = $480K. As the finance analyst, what do you flag?",
      options: [
        "No action needed — variances are within normal range",
        "Schedule slip only — cost is fine since ACWP < BCWS",
        "Margin compression — the program is behind schedule AND over budget, likely triggering an EAC increase and profit adjustment",
        "Revenue opportunity — accelerate recognition to close the gap",
      ],
      correct: 2,
      explanation: "BCWP ($420K) < BCWS ($500K) → behind schedule, impacting revenue recognition timing. BCWP ($420K) < ACWP ($480K) → over budget with a CPI of 0.875, signaling margin erosion. As the finance analyst, this combination likely requires an EAC increase, a profit adjustment, and a flag to program management. This is the kind of data that flows directly into your financial forecast and contract profitability review.",
    },
  ];

  const s = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div>
      <ProgressBar current={step + 1} total={steps.length} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>LESSON {step + 1} OF {steps.length}</div>
        <h2 style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 2, color: T.text, marginBottom: 16 }}>{s.title}</h2>
        <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.75, marginBottom: 16 }}>{s.content}</p>

        {s.highlight && (
          <div style={{ background: T.accentGlow, border: `1px solid ${T.accent}33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: T.accent, lineHeight: 1.6, fontWeight: 500 }}>{s.highlight}</p>
          </div>
        )}

        {s.visual && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {s.visual.map(v => (
              <div key={v.label} style={{ background: T.bg, borderRadius: 8, padding: 16, textAlign: "center", border: `1px solid ${v.color}33` }}>
                <div style={{ fontFamily: T.display, fontSize: 22, color: v.color, letterSpacing: 2 }}>{v.label}</div>
                <div style={{ fontSize: 12, color: T.textDim, marginTop: 6 }}>{v.sub}</div>
              </div>
            ))}
          </div>
        )}

        {s.terms && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {s.terms.map(t => (
              <div key={t.abbr} style={{ background: T.bg, borderRadius: 10, padding: 16, borderLeft: `4px solid ${t.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontFamily: T.display, fontSize: 24, color: t.color, letterSpacing: 2 }}>{t.abbr}</div>
                  <div style={{ fontSize: 10, fontFamily: T.mono, color: T.textMuted, background: T.card, padding: "3px 10px", borderRadius: 12 }}>{t.aka}</div>
                </div>
                <div style={{ fontSize: 13, color: T.text, fontWeight: 600, marginBottom: 4 }}>{t.full}</div>
                <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        )}

        {s.scenarios && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {s.scenarios.map((sc, i) => (
              <div key={i} style={{ background: T.bg, borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, fontFamily: T.mono, color: T.text, marginBottom: 6 }}>{sc.icon} {sc.condition}</div>
                <div style={{ fontSize: 14, color: T.text, fontWeight: 600, marginBottom: 4 }}>{sc.meaning}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{sc.detail}</div>
              </div>
            ))}
          </div>
        )}

        {s.quiz && (
          <div>
            <div style={{ background: T.bg, borderRadius: 10, padding: 16, marginBottom: 14, border: `1px dashed ${T.accent}44` }}>
              <div style={{ fontSize: 15, color: T.text, lineHeight: 1.6 }}>{s.question}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {s.options.map((opt, i) => {
                let bg = "transparent", bdr = T.border, col = T.textDim;
                if (quizAnswer !== null) {
                  if (i === s.correct) { bg = "rgba(16,185,129,0.12)"; bdr = T.green; col = T.green; }
                  else if (i === quizAnswer) { bg = "rgba(239,68,68,0.12)"; bdr = T.red; col = T.red; }
                }
                return (
                  <button key={i} onClick={() => quizAnswer === null && setQuizAnswer(i)}
                    style={{ background: bg, border: `1px solid ${bdr}`, color: col, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: quizAnswer !== null ? "default" : "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
                    <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
            {quizAnswer !== null && (
              <div style={{ background: quizAnswer === s.correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${quizAnswer === s.correct ? T.green : T.red}44`, borderRadius: 8, padding: 14, marginTop: 12 }}>
                <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{s.explanation}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {step > 0 && <button onClick={() => { setStep(s => s - 1); setQuizAnswer(null); }} style={btnStyle(T.textMuted)}>← Back</button>}
        <div style={{ flex: 1 }} />
        {s.quiz ? (
          quizAnswer !== null && <button onClick={() => onComplete()} style={btnStyle(T.accent, true)}>Complete Module ✓</button>
        ) : (
          <button onClick={() => setStep(s => s + 1)} style={btnStyle(T.accent, true)}>Continue →</button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE 2: Performance Metrics Calculator
// ═══════════════════════════════════════════════════════════════════
function MetricsExercise({ onComplete }) {
  const [round, setRound] = useState(0);
  const [ca] = useState(() => Array.from({ length: 5 }, (_, i) => generateControlAccount(i < 2 ? 1 : i < 4 ? 2 : 3)));
  const [answers, setAnswers] = useState({ cpi: "", spi: "", cv: "", sv: "" });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = ca[round];

  const checkAnswers = () => {
    const cpi = parseFloat(answers.cpi);
    const spi = parseFloat(answers.spi);
    const cv = parseFloat(answers.cv.replace(/[$,\s]/g, ""));
    const sv = parseFloat(answers.sv.replace(/[$,\s]/g, ""));

    let pts = 0;
    if (Math.abs(cpi - current.cpi) < 0.02) pts += 25;
    if (Math.abs(spi - current.spi) < 0.02) pts += 25;
    if (Math.abs(cv - current.cv) < current.bac * 0.01) pts += 25;
    if (Math.abs(sv - current.sv) < current.bac * 0.01) pts += 25;

    setScore(pts);
    setTotalScore(t => t + pts);
    setSubmitted(true);
  };

  const next = () => {
    if (round + 1 >= ca.length) { setDone(true); onComplete(); return; }
    setRound(r => r + 1);
    setAnswers({ cpi: "", spi: "", cv: "", sv: "" });
    setSubmitted(false);
    setScore(0);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>📊</div>
      <div style={{ fontFamily: T.display, fontSize: 32, color: T.accent, letterSpacing: 3 }}>METRICS MASTERED</div>
      <div style={{ fontFamily: T.display, fontSize: 48, color: T.text, margin: "10px 0" }}>{totalScore}/500</div>
      <div style={{ fontSize: 13, color: T.textDim, fontFamily: T.mono }}>POINTS EARNED</div>
    </div>
  );

  return (
    <div>
      <ProgressBar current={round + 1} total={ca.length} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 4 }}>CONTROL ACCOUNT</div>
            <div style={{ fontFamily: T.display, fontSize: 20, color: T.text, letterSpacing: 1 }}>{current.name}</div>
          </div>
          <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>Month {current.monthsComplete} of {current.totalMonths}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            ["BAC", `$${current.bac.toLocaleString()}`, T.textDim],
            ["BCWS (PV)", `$${current.bcws.toLocaleString()}`, T.accent],
            ["BCWP (EV)", `$${current.bcwp.toLocaleString()}`, T.green],
            ["ACWP (AC)", `$${current.acwp.toLocaleString()}`, T.red],
          ].map(([label, val, col]) => (
            <div key={label} style={{ background: T.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: col, fontFamily: T.mono }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 10 }}>CALCULATE:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["CPI", "cpi", "EV / AC", "e.g. 0.95"],
            ["SPI", "spi", "EV / PV", "e.g. 1.03"],
            ["CV ($)", "cv", "EV - AC", "e.g. -50000"],
            ["SV ($)", "sv", "EV - PV", "e.g. 25000"],
          ].map(([label, key, formula, placeholder]) => (
            <div key={key} style={{ background: T.bg, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 10, fontFamily: T.mono, color: T.textMuted }}>{formula}</span>
              </div>
              {submitted ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 14, color: T.text }}>{answers[key] || "—"}</span>
                  <span style={{ fontFamily: T.mono, fontSize: 14, color: Math.abs(parseFloat(answers[key]?.replace(/[$,\s]/g, "") || 0) - current[key]) < (key === "cpi" || key === "spi" ? 0.02 : current.bac * 0.01) ? T.green : T.red }}>
                    {key === "cpi" || key === "spi" ? current[key].toFixed(2) : `$${current[key].toLocaleString()}`}
                  </span>
                </div>
              ) : (
                <input value={answers[key]} onChange={e => setAnswers(a => ({ ...a, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: "100%", background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, padding: "8px 10px", color: T.text, fontSize: 14, fontFamily: T.mono, outline: "none", boxSizing: "border-box" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {submitted ? (
        <div>
          <div style={{ background: score === 100 ? "rgba(16,185,129,0.1)" : score >= 50 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${score === 100 ? T.green : score >= 50 ? T.gold : T.red}44`, borderRadius: 10, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontFamily: T.display, fontSize: 24, color: score === 100 ? T.green : score >= 50 ? T.gold : T.red, letterSpacing: 2 }}>
              {score === 100 ? "PERFECT" : score >= 50 ? "CLOSE" : "REVIEW NEEDED"}
            </div>
            <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>{score}/100 points</div>
          </div>
          <button onClick={next} style={btnStyle(T.accent, true)}>{round + 1 >= ca.length ? "Complete Module ✓" : "Next Control Account →"}</button>
        </div>
      ) : (
        <button onClick={checkAnswers} disabled={!answers.cpi || !answers.spi || !answers.cv || !answers.sv}
          style={btnStyle(T.accent, true)}>Check Answers</button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE 3: EAC Methods
// ═══════════════════════════════════════════════════════════════════
function EACExercise({ onComplete }) {
  const [ca] = useState(() => generateControlAccount(2));
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [userEAC, setUserEAC] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [phase, setPhase] = useState("learn"); // learn, practice

  if (phase === "learn") {
    return (
      <div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>EAC METHODS</div>
          <h2 style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 2, color: T.text, marginBottom: 12 }}>Estimate at Completion</h2>
          <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.75, marginBottom: 20 }}>
            EAC is where EVMS meets the financial forecast. As a finance analyst, your EAC isn't just a number — it drives your contract profitability outlook, your revenue recognition, and the profit adjustments that hit the financial statements. Picking the wrong method can overstate or understate margin by millions. The key components:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            <div style={{ background: T.bg, borderRadius: 8, padding: 14 }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, marginBottom: 6 }}>BAC</div>
              <div style={{ fontSize: 13, color: T.textDim }}>Budget at Completion — your total baseline budget</div>
            </div>
            <div style={{ background: T.bg, borderRadius: 8, padding: 14 }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.gold, marginBottom: 6 }}>VAC = BAC - EAC</div>
              <div style={{ fontSize: 13, color: T.textDim }}>Variance at Completion — projected overrun or underrun</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {EAC_METHODS.map((m, i) => (
              <div key={m.id} style={{ background: T.bg, borderRadius: 10, padding: 16, borderLeft: `4px solid ${[T.accent, T.gold, T.green, T.orange][i]}` }}>
                <div style={{ fontFamily: T.display, fontSize: 18, color: T.text, letterSpacing: 1, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 12, color: [T.accent, T.gold, T.green, T.orange][i], marginBottom: 6 }}>{m.formula}</div>
                <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setPhase("practice")} style={btnStyle(T.accent, true)}>Practice with Live Data →</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 4 }}>PROGRAM DATA</div>
            <div style={{ fontFamily: T.display, fontSize: 20, color: T.text, letterSpacing: 1 }}>{ca.name}</div>
          </div>
          <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>CPI: {ca.cpi.toFixed(2)} | SPI: {ca.spi.toFixed(2)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
          {[["BAC", ca.bac], ["BCWS", ca.bcws], ["BCWP", ca.bcwp], ["ACWP", ca.acwp]].map(([l, v]) => (
            <div key={l} style={{ background: T.bg, borderRadius: 6, padding: 10, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.mono }}>${v.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 10 }}>SELECT AN EAC METHOD:</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {EAC_METHODS.map((m, i) => (
          <button key={m.id} onClick={() => !submitted && setSelectedMethod(m.id)}
            style={{ background: selectedMethod === m.id ? T.accentGlow : T.bg, border: `1px solid ${selectedMethod === m.id ? T.accent : T.border}`, borderRadius: 8, padding: 12, cursor: submitted ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
            <div style={{ fontFamily: T.display, fontSize: 14, color: selectedMethod === m.id ? T.accent : T.text, letterSpacing: 1 }}>{m.name}</div>
            <div style={{ fontSize: 10, fontFamily: T.mono, color: T.textMuted }}>{m.formula}</div>
          </button>
        ))}
      </div>

      {selectedMethod && !submitted && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: T.text, marginBottom: 8 }}>Calculate the EAC using <span style={{ color: T.accent }}>{EAC_METHODS.find(m => m.id === selectedMethod)?.name}</span>:</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={userEAC} onChange={e => setUserEAC(e.target.value)} placeholder="e.g. 45000"
              style={{ flex: 1, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "12px 14px", color: T.text, fontSize: 15, fontFamily: T.mono, outline: "none" }} />
            <button onClick={async () => {
              setSubmitted(true);
              setLoadingAI(true);
              const method = EAC_METHODS.find(m => m.id === selectedMethod);
              const correctEAC = method.calc(ca.bac, ca.cpi, ca.spi, ca.acwp, ca.bcwp);
              try {
                const ai = await callAI(
                  `EVMS EAC exercise from a PROGRAM FINANCE perspective. Control account: ${ca.name}. BAC=$${ca.bac}, BCWS=$${ca.bcws}, BCWP=$${ca.bcwp}, ACWP=$${ca.acwp}. CPI=${ca.cpi}, SPI=${ca.spi}. Finance analyst used ${method.name} method and calculated EAC=$${userEAC}. Correct EAC=$${correctEAC}. VAC would be $${ca.bac - correctEAC}.`,
                  "You are a defense program finance director coaching an analyst on EAC. In 3 sentences: (1) evaluate their calculation, (2) explain when this EAC method is most appropriate and what it implies for the FINANCIAL FORECAST (a more conservative EAC method protects margin but may understate; an optimistic one risks a future profit write-down), (3) explain what this EAC and the resulting VAC signal for contract profitability and whether a profit adjustment or EAC change board would be triggered. Be direct and finance-focused."
                );
                setAiFeedback(ai);
              } catch {}
              setLoadingAI(false);
            }} style={btnStyle(T.accent, true)}>Calculate</button>
          </div>
        </div>
      )}

      {submitted && (
        <div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {EAC_METHODS.map((m, i) => {
                const val = m.calc(ca.bac, ca.cpi, ca.spi, ca.acwp, ca.bcwp);
                const vac = ca.bac - val;
                return (
                  <div key={m.id} style={{ background: T.bg, borderRadius: 8, padding: 12, border: selectedMethod === m.id ? `1px solid ${T.accent}` : "1px solid transparent" }}>
                    <div style={{ fontSize: 10, fontFamily: T.mono, color: T.textMuted, marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: T.mono }}>${val.toLocaleString()}</div>
                    <div style={{ fontSize: 11, fontFamily: T.mono, color: vac >= 0 ? T.green : T.red }}>VAC: ${vac.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {loadingAI && <div style={{ textAlign: "center", padding: 12, color: T.textDim, fontSize: 13, fontFamily: T.mono }}>🤖 AI Coach analyzing...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(0,194,255,0.06)", border: `1px solid ${T.accent}33`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, marginBottom: 6 }}>🤖 PROGRAM FINANCE COACH</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{aiFeedback}</div>
            </div>
          )}
          <button onClick={onComplete} style={btnStyle(T.accent, true)}>Complete Module ✓</button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE 4: Variance Analysis Writing
// ═══════════════════════════════════════════════════════════════════
function VarianceWriteUp({ onComplete }) {
  const [ca] = useState(() => generateControlAccount(2));
  const [narrative, setNarrative] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const submit = async () => {
    if (!narrative.trim()) return;
    setSubmitted(true);
    setLoadingAI(true);
    try {
      const ai = await callAI(
        `EVMS Variance Analysis exercise from a PROGRAM FINANCE ANALYST perspective. Control account: ${ca.name}. BAC=$${ca.bac}, BCWS=$${ca.bcws}, BCWP=$${ca.bcwp}, ACWP=$${ca.acwp}. CPI=${ca.cpi.toFixed(2)}, SPI=${ca.spi.toFixed(2)}. CV=$${ca.cv.toLocaleString()}, SV=$${ca.sv.toLocaleString()}. Month ${ca.monthsComplete} of ${ca.totalMonths}.\n\nThe finance analyst wrote this variance narrative:\n"${narrative}"\n\nEvaluate their variance write-up.`,
        "You are a senior Defense Program Finance Director reviewing a finance analyst's variance narrative. Score it out of 100 and provide feedback in this structure: (1) Score and one-line verdict (2) What they did well (3) What's missing — a strong FINANCE variance narrative should connect the operational variance to: contract profitability/margin impact, revenue recognition timing (percentage-of-completion), EAC movement and resulting profit adjustment, and what gets escalated to leadership and why. (4) A rewritten example showing how a strong finance analyst would frame this — emphasizing financial statement impact, not just the operational 'what happened.' Be constructive but demanding — precision in financial impact matters."
      );
      setAiFeedback(ai);
    } catch {}
    setLoadingAI(false);
  };

  const costStatus = ca.cv >= 0 ? "Under Budget" : "Over Budget";
  const schedStatus = ca.sv >= 0 ? "Ahead of Schedule" : "Behind Schedule";

  return (
    <div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>VARIANCE ANALYSIS REPORT</div>
        <div style={{ fontFamily: T.display, fontSize: 22, color: T.text, letterSpacing: 1, marginBottom: 14 }}>{ca.name}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[["BAC", ca.bac, T.textDim], ["BCWS", ca.bcws, T.accent], ["BCWP", ca.bcwp, T.green], ["ACWP", ca.acwp, T.red]].map(([l, v, c]) => (
            <div key={l} style={{ background: T.bg, borderRadius: 6, padding: 10, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: T.mono }}>${v.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[
            ["CPI", ca.cpi.toFixed(2), ca.cpi >= 1 ? T.green : T.red],
            ["SPI", ca.spi.toFixed(2), ca.spi >= 1 ? T.green : T.red],
            ["CV", `$${ca.cv.toLocaleString()}`, ca.cv >= 0 ? T.green : T.red],
            ["SV", `$${ca.sv.toLocaleString()}`, ca.sv >= 0 ? T.green : T.red],
          ].map(([l, v, c]) => (
            <div key={l} style={{ background: T.bg, borderRadius: 6, padding: 10, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: T.mono }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: ca.cv >= 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontFamily: T.mono, color: ca.cv >= 0 ? T.green : T.red }}>{costStatus}</div>
          </div>
          <div style={{ flex: 1, background: ca.sv >= 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontFamily: T.mono, color: ca.sv >= 0 ? T.green : T.red }}>{schedStatus}</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: T.text, marginBottom: 8, fontWeight: 600 }}>Write your variance narrative as the program finance analyst:</div>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 10, lineHeight: 1.6 }}>
          Address: root cause, financial impact (contract profitability, revenue timing, EAC movement), corrective action plan, and what you're flagging to program leadership. Write as if you're briefing the Finance Director.
        </div>
        <textarea value={narrative} onChange={e => setNarrative(e.target.value)} disabled={submitted}
          rows={8} placeholder="The cost variance on this control account is driven by..."
          style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14, color: T.text, fontSize: 14, lineHeight: 1.7, fontFamily: T.font, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
      </div>

      {submitted ? (
        <div>
          {loadingAI && <div style={{ textAlign: "center", padding: 16, color: T.textDim, fontSize: 13, fontFamily: T.mono }}>🤖 Senior PM reviewing your narrative...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(0,194,255,0.06)", border: `1px solid ${T.accent}33`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, marginBottom: 8 }}>🤖 PROGRAM FINANCE REVIEW</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{aiFeedback}</div>
            </div>
          )}
          <button onClick={onComplete} style={btnStyle(T.accent, true)}>Complete Module ✓</button>
        </div>
      ) : (
        <button onClick={submit} disabled={!narrative.trim()} style={btnStyle(T.accent, true)}>Submit for Review</button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE 5: CAM Simulation
// ═══════════════════════════════════════════════════════════════════
function CAMSimulation({ onComplete }) {
  const [accounts] = useState(() => Array.from({ length: 4 }, () => generateControlAccount(2)));
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalBCWP = accounts.reduce((s, a) => s + a.bcwp, 0);
  const totalACWP = accounts.reduce((s, a) => s + a.acwp, 0);
  const totalBCWS = accounts.reduce((s, a) => s + a.bcws, 0);
  const totalBAC = accounts.reduce((s, a) => s + a.bac, 0);
  const progCPI = +(totalBCWP / totalACWP).toFixed(3);
  const progSPI = +(totalBCWP / totalBCWS).toFixed(3);

  const submit = async () => {
    if (!action.trim() || selected === null) return;
    setSubmitted(true);
    setLoadingAI(true);
    const ca = accounts[selected];
    try {
      const ai = await callAI(
        `Program Finance Review simulation. The analyst is the FINANCE lead supporting a defense program with 4 control accounts. Program-level CPI=${progCPI}, SPI=${progSPI}. They flagged control account "${ca.name}" with CPI=${ca.cpi.toFixed(2)}, SPI=${ca.spi.toFixed(2)}, CV=$${ca.cv.toLocaleString()}, SV=$${ca.sv.toLocaleString()}, BAC=$${ca.bac.toLocaleString()}.\n\nTheir financial action plan:\n"${action}"\n\nAll control accounts:\n${accounts.map(a => `${a.name}: BAC=$${a.bac.toLocaleString()}, CPI=${a.cpi.toFixed(2)}, SPI=${a.spi.toFixed(2)}, CV=$${a.cv.toLocaleString()}`).join("\n")}`,
        "You are a Defense Program Finance Director evaluating a finance analyst's portfolio review. In 4-5 sentences: (1) Did they flag the right control account from a FINANCIAL RISK standpoint? The biggest financial risk isn't always the worst CPI — weigh dollar magnitude of the variance, EAC impact, and proximity to completion, not just the ratio. (2) Is their action plan grounded in financial impact (margin, EAC, revenue recognition) or is it too operational? (3) What financial analysis would you add? (4) How does this CA roll up into program-level profitability and the financial forecast? Be direct like a real Finance Director review."
      );
      setAiFeedback(ai);
    } catch {}
    setLoadingAI(false);
  };

  return (
    <div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>PROGRAM FINANCE REVIEW</div>
        <div style={{ fontFamily: T.display, fontSize: 22, color: T.text, letterSpacing: 1, marginBottom: 6 }}>Portfolio Health Dashboard</div>
        <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14 }}>You're the finance analyst supporting this program. Review the control account portfolio, identify the account posing the greatest financial risk, and write the action plan you'll brief to the Finance Director.</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[["Program CPI", progCPI.toFixed(2), progCPI >= 1 ? T.green : T.red], ["Program SPI", progSPI.toFixed(2), progSPI >= 1 ? T.green : T.red], ["Total BAC", `$${totalBAC.toLocaleString()}`, T.textDim]].map(([l, v, c]) => (
            <div key={l} style={{ background: T.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>{l}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: c, fontFamily: T.mono }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 10 }}>SELECT HIGHEST-RISK CONTROL ACCOUNT:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {accounts.map((a, i) => (
            <button key={i} onClick={() => !submitted && setSelected(i)} disabled={submitted}
              style={{ background: selected === i ? T.accentGlow : T.bg, border: `1px solid ${selected === i ? T.accent : T.border}`, borderRadius: 10, padding: 14, cursor: submitted ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: selected === i ? T.accent : T.text, fontWeight: 600 }}>{a.name}</span>
                <span style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>BAC: ${a.bac.toLocaleString()}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                {[["CPI", a.cpi.toFixed(2), a.cpi >= 1 ? T.green : T.red], ["SPI", a.spi.toFixed(2), a.spi >= 1 ? T.green : T.red], ["CV", `$${a.cv.toLocaleString()}`, a.cv >= 0 ? T.green : T.red], ["SV", `$${a.sv.toLocaleString()}`, a.sv >= 0 ? T.green : T.red]].map(([l, v, c]) => (
                  <div key={l}>
                    <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textMuted }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c, fontFamily: T.mono }}>{v}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && !submitted && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: T.text, marginBottom: 8, fontWeight: 600 }}>Write your financial action plan for {accounts[selected].name}:</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 10, lineHeight: 1.6 }}>
            Cover the financial impact (margin, EAC, revenue), what you recommend, and what you're escalating to the Finance Director.
          </div>
          <textarea value={action} onChange={e => setAction(e.target.value)} rows={5}
            placeholder="Recommended actions: 1) ... 2) ... 3) ..."
            style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14, color: T.text, fontSize: 14, lineHeight: 1.7, fontFamily: T.font, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
      )}

      {submitted ? (
        <div>
          {loadingAI && <div style={{ textAlign: "center", padding: 16, color: T.textDim, fontSize: 13, fontFamily: T.mono }}>🤖 Program Manager reviewing...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(0,194,255,0.06)", border: `1px solid ${T.accent}33`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, marginBottom: 8 }}>🤖 PROGRAM MANAGER REVIEW</div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{aiFeedback}</div>
            </div>
          )}
          <button onClick={onComplete} style={btnStyle(T.accent, true)}>Complete Module ✓</button>
        </div>
      ) : (
        selected !== null && <button onClick={submit} disabled={!action.trim()} style={btnStyle(T.accent, true)}>Submit Action Plan</button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE: Funding, Budget & Cost (Color of Money)
// ═══════════════════════════════════════════════════════════════════
function FundingLesson({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const steps = [
    {
      title: "Three Words People Confuse",
      content: "One of the most common mistakes new analysts make is treating budget, funding, and cost as the same thing. They're not — and on a defense program, mixing them up can mean you're 'on budget' but still about to run a program dry.",
      terms: [
        { abbr: "BUDGET", full: "Performance Measurement Baseline", aka: "What work should cost", desc: "The time-phased plan of what the scope of work is budgeted to cost. This is your EVMS baseline (the sum of all BCWS). It measures performance — am I earning value efficiently?", color: T.accent },
        { abbr: "FUNDING", full: "Authorized & Appropriated Dollars", aka: "Money you're allowed to spend", desc: "The dollars actually authorized on the contract. You can only spend what's been funded — regardless of budget. A fully-funded program and an incrementally-funded program are managed very differently.", color: T.gold },
        { abbr: "COST", full: "Actual Cost Incurred (ACWP)", aka: "What you've actually spent", desc: "The real dollars expended doing the work. Compared against budget it tells you efficiency (CPI); compared against funding it tells you whether you're about to hit a funding wall.", color: T.red },
      ],
    },
    {
      title: "Color of Money",
      content: "In defense, not all dollars are equal. Appropriated funds come in different 'colors,' each with its own rules and expiration. Spending the wrong color on the wrong work is an Anti-Deficiency Act violation — a serious compliance issue finance is responsible for preventing.",
      scenarios: [
        { condition: "RDT&E (3600)", meaning: "Research, Development, Test & Eval", detail: "Funds development work. 2-year availability. Used in EMD phases.", icon: "🔬" },
        { condition: "Procurement (3010)", meaning: "Production & Procurement", detail: "Funds buying production units. 3-year availability.", icon: "🏭" },
        { condition: "O&M (3400)", meaning: "Operations & Maintenance", detail: "Funds sustainment, services, day-to-day ops. 1-year availability.", icon: "🔧" },
        { condition: "Expired vs. Cancelled", meaning: "Time limits matter", detail: "Funds that expire can still pay prior obligations; cancelled funds are gone entirely.", icon: "⏳" },
      ],
    },
    {
      title: "The Funding Pipeline",
      content: "Money flows through stages before it becomes a cost. As a finance analyst, you track every stage — because a gap between funding and obligation, or obligation and expenditure, is where programs get into trouble.",
      terms: [
        { abbr: "AUTHORIZED", full: "Contract Ceiling / NTE", aka: "Maximum allowed", desc: "The not-to-exceed value of the contract — the legal ceiling on what can be spent.", color: T.accent },
        { abbr: "OBLIGATED", full: "Committed on Contract", aka: "Funds put on contract", desc: "Funding actually placed on the contract via mods. On incrementally-funded contracts, this is released in increments — and you manage to it carefully.", color: T.gold },
        { abbr: "EXPENDED", full: "Cost Incurred to Date", aka: "Actually spent", desc: "The cumulative ACWP. When expenditures approach obligations, you need more funding on contract — or work stops.", color: T.red },
      ],
    },
    {
      title: "Quick Check",
      quiz: true,
      question: "Your program has a CPI of 1.05 (under budget) but you've expended $48M against $50M of obligated funding, with 6 months of work remaining. What's the finance concern?",
      options: [
        "No concern — you're under budget, so you're in great shape",
        "Cost efficiency is good, but you're about to hit a funding wall — only $2M obligated remains for 6 months of work. You need a funding action regardless of strong CPI.",
        "You should slow spending to improve CPI further",
        "The CPI is wrong — it can't be above 1.0 if you're nearly out of funding",
      ],
      correct: 1,
      explanation: "This is the exact trap. CPI measures efficiency against BUDGET — and 1.05 is great. But funding is a separate constraint. With only $2M of obligated funding left and 6 months to go, the program will stop work unless more funding is placed on contract. A strong CPI doesn't save you from a funding shortfall. This is why finance tracks budget, funding, and cost as three distinct things.",
    },
  ];

  return <LessonRenderer steps={steps} step={step} setStep={setStep} quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} onComplete={onComplete} label="FUNDING & COST" />;
}

// ═══════════════════════════════════════════════════════════════════
// MODULE: Contract Types & Fee
// ═══════════════════════════════════════════════════════════════════
function ContractsLesson({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const steps = [
    {
      title: "Why Contract Type Drives Everything",
      content: "Before you analyze a single dollar, you need to know the contract type. It determines who carries the risk, how profit is earned, and how you forecast. The same cost overrun can be a disaster on one contract type and a non-event on another.",
      highlight: "Risk lives on a spectrum: on a Firm-Fixed-Price contract, the contractor owns all the cost risk. On a Cost-Plus contract, the government does. Where you sit on that spectrum changes how you manage the program's finances entirely.",
    },
    {
      title: "The Main Contract Types",
      content: "Each type allocates cost risk differently and pays profit differently. These four cover most of what you'll see in defense.",
      terms: [
        { abbr: "FFP", full: "Firm-Fixed-Price", aka: "Contractor owns all risk", desc: "One price, period. If costs run over, the contractor eats it — and an overrun directly erodes profit. If costs come in under, the contractor keeps the difference. CPI directly equals margin movement. Highest risk, highest reward.", color: T.red },
        { abbr: "CPFF", full: "Cost-Plus-Fixed-Fee", aka: "Government owns cost risk", desc: "Contractor is reimbursed for allowable costs plus a fixed fee dollar amount. The fee doesn't change with cost — so a cost overrun shrinks your fee percentage but not the fee dollars. Lower risk.", color: T.green },
        { abbr: "CPIF", full: "Cost-Plus-Incentive-Fee", aka: "Shared risk via share ratio", desc: "Reimbursed cost plus a fee that flexes with performance against a target cost, using a share ratio (e.g., 80/20). Beat target cost and you share the savings; overrun and you share the pain — up to a ceiling.", color: T.gold },
        { abbr: "T&M", full: "Time-and-Materials", aka: "Hourly + materials", desc: "Paid fixed hourly labor rates plus materials at cost. Common for services and sustainment. Risk sits mostly with the government, but labor rate management is critical for the contractor.", color: T.accent },
      ],
    },
    {
      title: "How Fee Actually Gets Earned",
      content: "Profit isn't automatic — especially on incentive and award-fee contracts. The fee you book is a finance judgment, and it moves with performance.",
      scenarios: [
        { condition: "Fixed Fee", meaning: "Set dollar amount", detail: "Doesn't move with cost. Booked as a percentage of completion.", icon: "💵" },
        { condition: "Incentive Fee", meaning: "Share-ratio driven", detail: "Moves with cost performance against target via the share line.", icon: "📈" },
        { condition: "Award Fee", meaning: "Subjective evaluation", detail: "Earned via periodic government scoring of performance. Finance estimates expected award fee %.", icon: "🏆" },
        { condition: "Fee on FFP", meaning: "Embedded in price", detail: "Margin = price minus cost. Every cost dollar saved is a profit dollar earned.", icon: "🎯" },
      ],
    },
    {
      title: "Quick Check",
      quiz: true,
      question: "A program is forecasting a $5M cost overrun. On which contract type does this overrun most directly destroy profit dollar-for-dollar?",
      options: [
        "CPFF — because the fee is fixed",
        "FFP — because the contractor owns all cost risk, so every overrun dollar comes straight out of margin",
        "CPIF — because the government shares the cost",
        "T&M — because materials are billed at cost",
      ],
      correct: 1,
      explanation: "On a Firm-Fixed-Price contract, the price is locked. Margin = Price − Cost. So a $5M overrun reduces profit by the full $5M — dollar-for-dollar. On CPFF the fee is fixed (overrun doesn't touch fee dollars), on CPIF the pain is shared via the share ratio, and on T&M materials pass through at cost. This is exactly why a finance analyst's response to a variance depends entirely on contract type — the same overrun is a margin emergency on FFP and a manageable event on CPFF.",
    },
  ];

  return <LessonRenderer steps={steps} step={step} setStep={setStep} quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} onComplete={onComplete} label="CONTRACT TYPES & FEE" />;
}

// ─── Reusable Lesson Renderer ─────────────────────────────────────
function LessonRenderer({ steps, step, setStep, quizAnswer, setQuizAnswer, onComplete, label }) {
  const s = steps[step];
  return (
    <div>
      <ProgressBar current={step + 1} total={steps.length} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>{label} — {step + 1}/{steps.length}</div>
        <h2 style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 2, color: T.text, marginBottom: 16 }}>{s.title}</h2>
        <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.75, marginBottom: 16 }}>{s.content}</p>

        {s.highlight && (
          <div style={{ background: T.accentGlow, border: `1px solid ${T.accent}33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: T.accent, lineHeight: 1.6, fontWeight: 500 }}>{s.highlight}</p>
          </div>
        )}

        {s.terms && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {s.terms.map(t => (
              <div key={t.abbr} style={{ background: T.bg, borderRadius: 10, padding: 16, borderLeft: `4px solid ${t.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontFamily: T.display, fontSize: 22, color: t.color, letterSpacing: 2 }}>{t.abbr}</div>
                  <div style={{ fontSize: 10, fontFamily: T.mono, color: T.textMuted, background: T.card, padding: "3px 10px", borderRadius: 12 }}>{t.aka}</div>
                </div>
                <div style={{ fontSize: 13, color: T.text, fontWeight: 600, marginBottom: 4 }}>{t.full}</div>
                <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        )}

        {s.scenarios && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {s.scenarios.map((sc, i) => (
              <div key={i} style={{ background: T.bg, borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, fontFamily: T.mono, color: T.text, marginBottom: 6 }}>{sc.icon} {sc.condition}</div>
                <div style={{ fontSize: 14, color: T.text, fontWeight: 600, marginBottom: 4 }}>{sc.meaning}</div>
                <div style={{ fontSize: 12, color: T.textDim, lineHeight: 1.5 }}>{sc.detail}</div>
              </div>
            ))}
          </div>
        )}

        {s.quiz && (
          <div>
            <div style={{ background: T.bg, borderRadius: 10, padding: 16, marginBottom: 14, border: `1px dashed ${T.accent}44` }}>
              <div style={{ fontSize: 15, color: T.text, lineHeight: 1.6 }}>{s.question}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {s.options.map((opt, i) => {
                let bg = "transparent", bdr = T.border, col = T.textDim;
                if (quizAnswer !== null) {
                  if (i === s.correct) { bg = "rgba(16,185,129,0.12)"; bdr = T.green; col = T.green; }
                  else if (i === quizAnswer) { bg = "rgba(239,68,68,0.12)"; bdr = T.red; col = T.red; }
                }
                return (
                  <button key={i} onClick={() => quizAnswer === null && setQuizAnswer(i)}
                    style={{ background: bg, border: `1px solid ${bdr}`, color: col, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: quizAnswer !== null ? "default" : "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
                    <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
            {quizAnswer !== null && (
              <div style={{ background: quizAnswer === s.correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${quizAnswer === s.correct ? T.green : T.red}44`, borderRadius: 8, padding: 14, marginTop: 12 }}>
                <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{s.explanation}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {step > 0 && <button onClick={() => { setStep(step - 1); setQuizAnswer(null); }} style={btnStyle(T.textMuted)}>← Back</button>}
        <div style={{ flex: 1 }} />
        {s.quiz ? (
          quizAnswer !== null && <button onClick={onComplete} style={btnStyle(T.accent, true)}>Complete Module ✓</button>
        ) : (
          <button onClick={() => setStep(step + 1)} style={btnStyle(T.accent, true)}>Continue →</button>
        )}
      </div>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────
const ProgressBar = ({ current, total }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
    <div style={{ flex: 1, height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(current / total) * 100}%`, background: T.accent, borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
    <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{current}/{total}</div>
  </div>
);

const btnStyle = (color, primary = false) => ({
  width: "100%", background: primary ? color : "transparent",
  color: primary ? "#000" : color, border: primary ? "none" : `1px solid ${color}`,
  borderRadius: 10, padding: "14px", fontFamily: T.display, fontSize: 17,
  letterSpacing: 2, cursor: "pointer", transition: "all 0.2s",
});

// ═══════════════════════════════════════════════════════════════════
// PRACTICE MODE — freely practice the full question bank, instant feedback
// ═══════════════════════════════════════════════════════════════════
function PracticeMode({ moduleId, onBack }) {
  const [deck] = useState(() => getQuestions(moduleId));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const q = deck[idx];
  const isLast = idx + 1 >= deck.length;

  const choose = (i) => {
    if (answered !== null) return;
    setAnswered(i);
    if (i === q.correct) setCorrectCount(c => c + 1);
  };
  const next = () => {
    if (isLast) { onBack(); return; }
    setIdx(i => i + 1); setAnswered(null);
  };

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
              <button key={i} onClick={() => choose(i)}
                style={{ background: bg, border: `1px solid ${bdr}`, color: col, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: answered !== null ? "default" : "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
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

// ═══════════════════════════════════════════════════════════════════
// FINAL EXAM — scored, 10 random questions, mastery threshold
// ═══════════════════════════════════════════════════════════════════
function FinalExam({ moduleId, onComplete, onBack }) {
  const EXAM_SIZE = 10;
  const PASS = 80;
  const [deck] = useState(() => getQuestions(moduleId, EXAM_SIZE));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const q = deck[idx];
  const isLast = idx + 1 >= deck.length;

  const submit = () => {
    if (selected === null) return;
    const newAnswers = [...answers, { q, selected, correct: selected === q.correct }];
    setAnswers(newAnswers);
    if (isLast) { setDone(true); }
    else { setIdx(i => i + 1); setSelected(null); }
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
          {passed ? (
            <button onClick={() => onComplete(score)} style={btnStyle(T.green, true)}>Save Mastery ✓</button>
          ) : (
            <button onClick={() => onComplete(score)} style={btnStyle(T.accent, true)}>Save & Retry Later</button>
          )}
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
            <button key={i} onClick={() => setSelected(i)}
              style={{ background: selected === i ? T.accentGlow : "transparent", border: `1px solid ${selected === i ? T.accent : T.border}`, color: selected === i ? T.accent : T.textDim, borderRadius: 8, padding: "12px 16px", textAlign: "left", fontSize: 13, cursor: "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
              <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          ))}
        </div>
      </div>
      <button onClick={submit} disabled={selected === null} style={btnStyle(T.accent, true)}>{isLast ? "Submit Exam" : "Next Question →"}</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// KNOWLEDGE MODULE WRAPPER — Learn / Practice / Exam sub-navigation
// ═══════════════════════════════════════════════════════════════════
function KnowledgeModule({ moduleId, LessonComponent, mastery, onComplete }) {
  const [mode, setMode] = useState("menu");
  const bankSize = (QUESTION_BANKS[moduleId] || []).length;

  if (mode === "learn") return <LessonComponent onComplete={() => setMode("menu")} />;
  if (mode === "practice") return <PracticeMode moduleId={moduleId} onBack={() => setMode("menu")} />;
  if (mode === "exam") return <FinalExam moduleId={moduleId} onComplete={(score) => { onComplete(score); setMode("menu"); }} onBack={() => setMode("menu")} />;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button onClick={() => setMode("learn")} style={modeCard(T.accent)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 26 }}>📖</div>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{ fontFamily: T.display, fontSize: 18, letterSpacing: 1, color: T.text }}>LEARN</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Work through the lesson with examples and concept checks</div>
            </div>
          </div>
        </button>
        <button onClick={() => setMode("practice")} style={modeCard(T.green)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 26 }}>🎯</div>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{ fontFamily: T.display, fontSize: 18, letterSpacing: 1, color: T.text }}>PRACTICE</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Drill all {bankSize} questions with instant explanations — no scoring</div>
            </div>
          </div>
        </button>
        <button onClick={() => setMode("exam")} style={modeCard(T.gold)}>
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
    </div>
  );
}

const modeCard = (color) => ({
  background: T.card, border: `1px solid ${color}33`, borderRadius: 12,
  padding: 18, cursor: "pointer", transition: "all 0.2s", width: "100%",
});

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════
export default function EVMSModule() {
  const [screen, setScreen] = useState("login");
  const [activeModule, setActiveModule] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [mastery, setMastery] = useState({});
  const [user, setUser] = useState(null); // { name, pin }
  const [nameInput, setNameInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Auto-login if remembered on this device
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("evms-user") || "null");
      if (saved?.name && saved?.pin) {
        setLoading(true);
        loadUser(saved.name, saved.pin).then(data => {
          setUser(saved);
          if (data) { setCompleted(new Set(data.completed || [])); setMastery(data.mastery || {}); }
          setScreen("hub");
          setLoading(false);
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
    try { localStorage.setItem("evms-user", JSON.stringify(u)); } catch {}
    setScreen("hub");
    setLoading(false);
  };

  const logout = () => {
    try { localStorage.removeItem("evms-user"); } catch {}
    setUser(null); setCompleted(new Set()); setMastery({});
    setNameInput(""); setPinInput(""); setScreen("login");
  };

  const persist = (newCompleted, newMastery) => {
    if (user) saveUser(user.name, user.pin, { name: user.name, completed: Array.from(newCompleted), mastery: newMastery, lastUpdated: Date.now() });
  };

  const completeModule = (moduleId) => {
    const nc = new Set(completed); nc.add(moduleId);
    setCompleted(nc); persist(nc, mastery);
    setScreen("hub"); setActiveModule(null);
  };

  const completeExam = (moduleId, score) => {
    const nm = { ...mastery, [moduleId]: Math.max(mastery[moduleId] || 0, score) };
    setMastery(nm);
    const nc = new Set(completed);
    if (score >= 80) nc.add(moduleId);
    setCompleted(nc);
    persist(nc, nm);
  };

  const KNOWLEDGE = { concepts: ConceptsLesson, funding: FundingLesson, contracts: ContractsLesson };

  const renderModule = () => {
    if (KNOWLEDGE[activeModule]) {
      return <KnowledgeModule moduleId={activeModule} LessonComponent={KNOWLEDGE[activeModule]} mastery={mastery[activeModule] || 0} onComplete={(score) => completeExam(activeModule, score)} />;
    }
    switch (activeModule) {
      case "metrics": return <MetricsExercise onComplete={() => completeModule("metrics")} />;
      case "eac": return <EACExercise onComplete={() => completeModule("eac")} />;
      case "var": return <VarianceWriteUp onComplete={() => completeModule("var")} />;
      case "scenario": return <CAMSimulation onComplete={() => completeModule("scenario")} />;
      default: return null;
    }
  };

  const overallMastery = Object.keys(KNOWLEDGE).length
    ? Math.round(Object.keys(KNOWLEDGE).reduce((s, k) => s + (mastery[k] || 0), 0) / Object.keys(KNOWLEDGE).length)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, paddingTop: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "30px 20px", animation: "fadeIn 0.4s ease" }}>

        {/* LOGIN */}
        {screen === "login" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontFamily: T.mono, color: T.accent, letterSpacing: 3, marginBottom: 8 }}>DEFENSE FINANCE TRACK</div>
              <h1 style={{ fontFamily: T.display, fontSize: 42, letterSpacing: 3, color: T.text, lineHeight: 1, marginBottom: 10 }}>EVMS FOUNDATIONS</h1>
              <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7 }}>
                A comprehensive program finance training course. Learn how earned value drives funding, contract profitability, EAC forecasting, and the financial reporting behind every major defense program.
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
                New here? Just pick a name and PIN — we'll create your profile. Returning? Enter the same name + PIN to pick up where you left off on any device.
              </div>
            </div>
          </div>
        )}

        {/* HUB */}
        {screen === "hub" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontFamily: T.mono, color: T.accent, letterSpacing: 3, marginBottom: 6 }}>DEFENSE FINANCE TRACK</div>
                <h1 style={{ fontFamily: T.display, fontSize: 36, letterSpacing: 3, color: T.text, lineHeight: 1 }}>EVMS FOUNDATIONS</h1>
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
                        <span style={{ fontSize: 9, fontFamily: T.mono, background: m.type === "lesson" ? T.accent : m.type === "exercise" ? T.gold : T.orange, color: "#000", borderRadius: 4, padding: "1px 6px", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{m.type}</span>
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

        {/* MODULE */}
        {screen === "module" && activeModule && (
          <div>
            <button onClick={() => { setScreen("hub"); setActiveModule(null); }}
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textDim, borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: T.mono }}>
              ← Back to Modules
            </button>
            <div style={{ fontFamily: T.display, fontSize: 24, letterSpacing: 1, color: T.text, marginBottom: 16 }}>{MODULES.find(m => m.id === activeModule)?.title}</div>
            {renderModule()}
          </div>
        )}
      </div>
    </div>
  );
}
