import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ─── FIREBASE CONFIG ──────────────────────────────────────────────
// REPLACE these values with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAxL5lDrrzJO_7L1zzbH37R6ArZuDiXHtU",
  authDomain: "finance-arena-ec4ff.firebaseapp.com",
  projectId: "finance-arena-ec4ff",
  storageBucket: "finance-arena-ec4ff.firebasestorage.app",
  messagingSenderId: "144073874887",
  appId: "1:144073874887:web:2a84bacbfb416261938de2",
  measurementId: "G-WPW00WD13B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Firebase Storage ─────────────────────────────────────────────
const LB_KEY = "finance-arena-leaderboard";

// Admin: change this to your own secret. Unlock by clicking the
// "N PLAYERS RANKED" text 5 times on the leaderboard, then entering this.
// NOTE: this is light obscurity, not real security — anyone inspecting the
// site's code could find it. It only hides the delete UI from casual visitors.
const ADMIN_PASS = "tp-arena-admin-2026";

const safeGet = async () => {
  try {
    const snap = await getDoc(doc(db, "arena", LB_KEY));
    return snap.exists() ? snap.data().players : null;
  } catch { return null; }
};

const safeSet = async (data) => {
  try {
    await setDoc(doc(db, "arena", LB_KEY), { players: data });
  } catch {}
};

// ─── AI helper (via Netlify function) ─────────────────────────────
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

// ─── Ranks ────────────────────────────────────────────────────────
const RANKS = [
  { name: "Intern", min: 0, color: "#6b7280", icon: "📋" },
  { name: "Analyst", min: 300, color: "#3b82f6", icon: "📊" },
  { name: "Sr. Analyst", min: 800, color: "#8b5cf6", icon: "📈" },
  { name: "FP&A Manager", min: 1800, color: "#f59e0b", icon: "💼" },
  { name: "Finance Director", min: 3500, color: "#ef4444", icon: "🎯" },
  { name: "VP Finance", min: 6000, color: "#10b981", icon: "⚡" },
  { name: "CFO", min: 12000, color: "#f97316", icon: "👔" },
];
const getRank = xp => [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];

// ─── Question Banks ───────────────────────────────────────────────
const VARIANCE_POOL = [
  { cat: "Revenue", budget: 5000, actual: 5400, isFavorable: true },
  { cat: "COGS", budget: 2200, actual: 2600, isFavorable: false },
  { cat: "R&D Spend", budget: 800, actual: 720, isFavorable: true },
  { cat: "SG&A", budget: 1100, actual: 1350, isFavorable: false },
  { cat: "Gross Margin", budget: 2800, actual: 2600, isFavorable: false },
  { cat: "Operating Income", budget: 900, actual: 1050, isFavorable: true },
  { cat: "Headcount Costs", budget: 3400, actual: 3100, isFavorable: true },
  { cat: "CapEx", budget: 1500, actual: 1800, isFavorable: false },
  { cat: "Revenue", budget: 8000, actual: 7600, isFavorable: false },
  { cat: "EBITDA", budget: 2100, actual: 2400, isFavorable: true },
  { cat: "Contract Revenue", budget: 12000, actual: 13200, isFavorable: true },
  { cat: "Material Costs", budget: 4500, actual: 4100, isFavorable: true },
  { cat: "Overhead", budget: 600, actual: 720, isFavorable: false },
  { cat: "Gross Profit", budget: 3200, actual: 3500, isFavorable: true },
  { cat: "SG&A", budget: 900, actual: 780, isFavorable: true },
  { cat: "Program Revenue", budget: 22000, actual: 21100, isFavorable: false },
  { cat: "OpEx", budget: 5500, actual: 6200, isFavorable: false },
  { cat: "Net Revenue", budget: 9800, actual: 10400, isFavorable: true },
  { cat: "R&D Spend", budget: 1400, actual: 1600, isFavorable: false },
  { cat: "Contribution Margin", budget: 4100, actual: 3800, isFavorable: false },
  { cat: "Labor Variance", budget: 2800, actual: 2500, isFavorable: true },
  { cat: "Service Revenue", budget: 7200, actual: 7900, isFavorable: true },
  { cat: "Supply Chain Cost", budget: 3300, actual: 3700, isFavorable: false },
  { cat: "Depreciation", budget: 400, actual: 350, isFavorable: true },
  { cat: "Product Revenue", budget: 18000, actual: 17200, isFavorable: false },
  { cat: "IT Costs", budget: 550, actual: 610, isFavorable: false },
  { cat: "EBIT", budget: 1800, actual: 2100, isFavorable: true },
  { cat: "Net Income", budget: 1200, actual: 1050, isFavorable: false },
  { cat: "Free Cash Flow", budget: 3000, actual: 3400, isFavorable: true },
  { cat: "Working Capital", budget: 5000, actual: 4600, isFavorable: true },
];

const BUDGET_POOL = [
  { company: "TechCorp Q3", revenue: 50000, cogs: 18000, rd: 8000, sga: 7000, da: 3000, question: "Operating Income?", solve: (r,c,rd,s) => r-c-rd-s, hint: "Revenue − COGS − R&D − SG&A" },
  { company: "RetailCo FY", revenue: 120000, cogs: 80000, rd: 2000, sga: 15000, da: 4000, question: "Gross Profit?", solve: (r,c) => r-c, hint: "Revenue − COGS" },
  { company: "ManuCo H1", revenue: 85000, cogs: 52000, rd: 5000, sga: 11000, da: 3500, question: "Gross Margin %?", solve: (r,c) => +((r-c)/r*100).toFixed(1), hint: "(Gross Profit ÷ Revenue) × 100", isPercent: true },
  { company: "SaaS Inc Q4", revenue: 32000, cogs: 8000, rd: 9000, sga: 6000, da: 1200, question: "EBITDA?", solve: (r,c,rd,s,da) => r-c-rd-s+da, hint: "Operating Income + D&A" },
  { company: "AeroDiv FY", revenue: 200000, cogs: 145000, rd: 12000, sga: 18000, da: 8000, question: "Operating Margin %?", solve: (r,c,rd,s) => +((r-c-rd-s)/r*100).toFixed(1), hint: "(Op Income ÷ Revenue) × 100", isPercent: true },
  { company: "HealthCo Q2", revenue: 44000, cogs: 27000, rd: 3500, sga: 5500, da: 2000, question: "EBIT?", solve: (r,c,rd,s) => r-c-rd-s, hint: "Same as Operating Income here" },
  { company: "ConsultFirm", revenue: 15000, cogs: 6000, rd: 0, sga: 4000, da: 500, question: "Gross Profit Margin %?", solve: (r,c) => +((r-c)/r*100).toFixed(1), hint: "(Revenue − COGS) ÷ Revenue × 100", isPercent: true },
  { company: "LogisticsCo", revenue: 78000, cogs: 58000, rd: 2000, sga: 9000, da: 3000, question: "Net Operating Income?", solve: (r,c,rd,s) => r-c-rd-s, hint: "Revenue − All OpEx" },
  { company: "FinTech Q1", revenue: 21000, cogs: 5500, rd: 7000, sga: 3500, da: 800, question: "R&D as % of Revenue?", solve: () => +(7000/21000*100).toFixed(1), hint: "R&D ÷ Revenue × 100", isPercent: true },
  { company: "DefenseCo FY", revenue: 310000, cogs: 225000, rd: 18000, sga: 22000, da: 12000, question: "EBITDA Margin %?", solve: (r,c,rd,s,da) => +((r-c-rd-s+da)/r*100).toFixed(1), hint: "EBITDA ÷ Revenue × 100", isPercent: true },
  { company: "EdTech H2", revenue: 9000, cogs: 2700, rd: 2500, sga: 1800, da: 400, question: "Contribution Margin?", solve: (r,c) => r-c, hint: "Revenue − Variable Costs (COGS)" },
  { company: "BioPharm Q3", revenue: 63000, cogs: 24000, rd: 21000, sga: 8000, da: 5000, question: "Operating Cash Proxy (EBITDA)?", solve: (r,c,rd,s,da) => r-c-rd-s+da, hint: "Op Income + D&A" },
];

const CFO_POOL = [
  { q: "Revenue grew 12% YoY but operating income fell 8%. Most likely culprit?", options: ["Tax rate increase", "Cost structure outpaced revenue growth", "Share buyback program", "One-time FX hedging gain"], correct: 1, explain: "When revenue grows but operating income shrinks, cost growth is outpacing revenue — classic margin compression." },
  { q: "A BU is 15% over headcount budget but 20% under revenue plan. How do you frame this?", options: ["Purely unfavorable — over on costs", "Mixed — needs deeper cost vs. output analysis", "Favorable — revenue delta offsets headcount", "Neutral — variances cancel out"], correct: 1, explain: "Over on investment AND under on output is a double miss. The BU is paying more to produce less — escalation-worthy." },
  { q: "Free Cash Flow is negative but Net Income is positive. Most likely cause?", options: ["Revenue recognition timing shift", "Non-cash D&A charges", "Large CapEx or working capital build", "Deferred tax benefit"], correct: 2, explain: "FCF = NI + D&A − CapEx − ΔWC. A big CapEx cycle or inventory build pulls FCF below NI even when earnings look clean." },
  { q: "Which metric best compares operational efficiency across BUs with different capital structures?", options: ["EPS", "Net Income Margin", "EBITDA Margin", "Return on Equity"], correct: 2, explain: "EBITDA strips interest (capital structure) and D&A (non-cash), making it the standard cross-BU efficiency yardstick." },
  { q: "A manager says 'we beat plan on revenue.' Your first follow-up?", options: ["Great, let's celebrate!", "Was it volume, price, or mix?", "Did COGS also come in over?", "Both B and C"], correct: 3, explain: "Revenue beats need decomposition (volume/price/mix) AND cost validation. A revenue beat with eroding margin isn't a win." },
  { q: "Contract revenue is $5M favorable but cost-to-complete estimates jumped $8M. Net position is?", options: ["Favorable — revenue beat dominates", "Unfavorable — cost overrun exceeds revenue upside", "Neutral — offset each other", "Depends on GAAP vs. cash"], correct: 1, explain: "Revenue variance of +$5M vs cost estimate increase of $8M = net $3M unfavorable. Always look through to bottom-line impact." },
  { q: "Your top line looks great but DSO (Days Sales Outstanding) has climbed from 45 to 68 days. You should flag:", options: ["Nothing — revenue is strong", "Potential collection risk and cash flow pressure", "A one-time accounting adjustment", "An ERP system error"], correct: 1, explain: "Rising DSO means customers are paying slower. Revenue is being recognized but cash isn't arriving — a liquidity red flag." },
  { q: "CFO asks why Q3 EPS beat consensus but the stock dropped 4% post-earnings. Most likely reason?", options: ["Market was irrational", "Guidance cut or forward outlook was weak", "Share count changed", "Auditor changed"], correct: 1, explain: "Markets price the future, not the past. A Q3 beat paired with weak Q4 guidance signals the beat may not be sustainable." },
  { q: "Which of these is NOT a driver of working capital improvement?", options: ["Faster collections (lower DSO)", "Slower payments to suppliers (higher DPO)", "Reducing inventory days", "Increasing CapEx spend"], correct: 3, explain: "CapEx is a long-term investment, not a working capital line. WC = Current Assets − Current Liabilities. CapEx lives on the balance sheet." },
  { q: "A program has a $10M EAC overrun. The PM says 'we'll recover it in the next phase.' Correct FP&A response?", options: ["Accept it and update the forecast", "Recognize the overrun now per cost accounting standards", "Flag it as a risk item only", "Wait for the phase to complete"], correct: 1, explain: "EAC overruns must be recognized when known — you can't defer known losses. Percentage-of-completion accounting requires current-period adjustment." },
  { q: "Revenue per employee drops 18% in a quarter. The most actionable interpretation is:", options: ["Hire freeze immediately", "Productivity or revenue-per-head analysis by function", "Layoffs are the only lever", "Ignore — it's a single quarter"], correct: 1, explain: "One quarter of declining revenue/employee warrants analysis, not panic. Identify whether it's a hiring surge, revenue miss, or mix shift before acting." },
  { q: "What does a negative book-to-bill ratio signal for a defense contractor?", options: ["Strong backlog health", "New orders trailing revenue — backlog depletion risk", "Improved cash conversion", "Cost overrun on existing contracts"], correct: 1, explain: "Book-to-bill < 1 means you're burning backlog faster than you're replenishing it — a leading indicator of future revenue pressure." },
  { q: "COGS variance is $3M unfavorable. You need to present root cause. Best framework?", options: ["Just report the number", "Volume, rate (price), and efficiency decomposition", "Blame supply chain", "Compare to last year only"], correct: 1, explain: "The standard decomposition is Volume Variance + Rate Variance + Efficiency Variance. This isolates whether the driver is output, input price, or process." },
  { q: "Gross margin expanded 200bps YoY but the business just raised prices 5%. What should concern you?", options: ["Nothing — margin expansion is good", "Volume may have declined to offset the margin expansion", "Tax implications of margin", "Auditor review needed"], correct: 1, explain: "Price-driven margin expansion can mask volume loss. If customers pushed back on the 5% increase, revenue mix or unit volume may have eroded." },
  { q: "If SG&A grows 20% but revenue only grows 8%, which ratio is most at risk?", options: ["Gross margin", "Operating leverage ratio", "Return on assets", "Current ratio"], correct: 1, explain: "Operating leverage = % change in Op Income / % change in Revenue. SG&A growing 2.5x revenue growth destroys operating leverage and compresses margins." },
];

const FORECAST_POOL = [
  { company: "CloudSoft Inc", base: { revenue: 100000, cogs: 40000, rd: 15000, sga: 18000 }, targets: { grossMargin: 60, opMargin: 20 } },
  { company: "AeroSystems", base: { revenue: 250000, cogs: 175000, rd: 12000, sga: 22000 }, targets: { grossMargin: 30, opMargin: 10 } },
  { company: "RetailMax Co", base: { revenue: 80000, cogs: 56000, rd: 1000, sga: 12000 }, targets: { grossMargin: 30, opMargin: 10 } },
  { company: "BioMetrics Ltd", base: { revenue: 45000, cogs: 14000, rd: 16000, sga: 8000 }, targets: { grossMargin: 70, opMargin: 18 } },
  { company: "FinServ Group", base: { revenue: 60000, cogs: 18000, rd: 5000, sga: 14000 }, targets: { grossMargin: 70, opMargin: 35 } },
];

const SPEED_POOL = [
  { q: "Depreciation is a cash expense.", answer: false, explain: "Depreciation is a non-cash charge — it reduces taxable income but no cash actually leaves the business." },
  { q: "A company can have positive net income and negative free cash flow.", answer: true, explain: "Yes — large CapEx or working capital builds can make FCF negative even with positive earnings." },
  { q: "Higher DSO is always better for a company.", answer: false, explain: "Higher DSO means slower customer payments — that's worse. Lower DSO = faster cash collection = better." },
  { q: "EBITDA always equals operating cash flow.", answer: false, explain: "EBITDA is an approximation. Operating cash flow also includes working capital changes and taxes." },
  { q: "Gross margin % can be higher than operating margin %.", answer: true, explain: "Yes — operating margin subtracts R&D and SG&A from gross profit, so it's always equal to or lower." },
  { q: "A favorable variance always means the company performed well.", answer: false, explain: "Context matters. A favorable COGS variance achieved by cutting quality could be very unfavorable long-term." },
  { q: "Book value of equity equals market cap.", answer: false, explain: "Book value is historical cost minus depreciation. Market cap reflects future expectations — usually much higher for healthy companies." },
  { q: "Revenue recognition and cash receipt always happen at the same time.", answer: false, explain: "Under accrual accounting, revenue is recognized when earned, not when cash arrives — hence accounts receivable." },
  { q: "Operating leverage means fixed costs amplify profit swings relative to revenue changes.", answer: true, explain: "Correct. High fixed cost bases mean a small revenue increase drives a proportionally larger profit increase — and vice versa." },
  { q: "Net Income is always the most important metric for FP&A analysis.", answer: false, explain: "FP&A focuses on cash flow, EBITDA, and operational metrics. Net income can be distorted by non-cash items and accounting choices." },
  { q: "Working capital = current assets minus current liabilities.", answer: true, explain: "Correct by definition. Positive working capital means a company can cover short-term obligations with short-term assets." },
  { q: "A DPO of 90 days is always better than 30 days for cash flow.", answer: true, explain: "Holding onto cash longer (paying suppliers later) is better for your working capital position — assuming it doesn't harm supplier relationships." },
  { q: "Price-volume-mix analysis breaks down revenue variance into three components.", answer: true, explain: "Exactly. Volume = how many units, Price = what you charged, Mix = which products were sold. Each requires a different response." },
  { q: "Amortization applies to tangible assets like equipment.", answer: false, explain: "Amortization applies to intangible assets (patents, software, goodwill). Depreciation applies to tangible assets." },
  { q: "An increase in accounts payable is a use of cash on the cash flow statement.", answer: false, explain: "An increase in AP is a source of cash — you owe more to suppliers but haven't paid yet, so cash is preserved." },
  { q: "EPS can increase even when net income decreases.", answer: true, explain: "If share count decreases (via buybacks) faster than net income falls, EPS can still rise. This is why buybacks can flatter EPS." },
  { q: "A high current ratio always signals financial strength.", answer: false, explain: "A very high current ratio can signal poor asset utilization — excess cash or inventory that isn't being deployed effectively." },
  { q: "IRR and NPV always lead to the same capital allocation decision.", answer: false, explain: "They can conflict for mutually exclusive projects. NPV is generally considered the more reliable decision metric." },
  { q: "Percentage-of-completion accounting requires recognizing revenue as work is performed.", answer: true, explain: "Correct — POC is standard for long-term contracts. Revenue and costs are recognized proportionally to work completed." },
  { q: "Contribution margin = Revenue minus variable costs only.", answer: true, explain: "Exactly. CM ignores fixed costs — it shows how much each dollar of revenue contributes to covering fixed costs and profit." },
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// ─── GAME 1: Variance Blitz ────────────────────────────────────────
function VarianceBlitz({ onScore }) {
  const [deck] = useState(() => shuffle(VARIANCE_POOL).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (done || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); handleAnswer(null, true); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, feedback, done]);

  const handleAnswer = (ans, timeout = false) => {
    clearInterval(timerRef.current);
    const item = deck[idx];
    const correct = !timeout && ans === item.isFavorable;
    const pts = correct ? Math.round(Math.max(10, timeLeft * 15) * (1 + Math.min(streak, 5) * 0.15)) : 0;
    const newStreak = correct ? streak + 1 : 0;
    const newTotal = total + pts;
    setStreak(newStreak); setTotal(newTotal);
    setFeedback({ correct, pts, streak: newStreak, timeout });
    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 >= deck.length) { setDone(true); onScore(newTotal); }
      else { setIdx(i => i + 1); setTimeLeft(8); }
    }, 1400);
  };

  if (done) return <GameOver icon="⚡" title="Blitz Complete" xp={total} />;
  const item = deck[idx];
  const pct = ((item.actual - item.budget) / item.budget * 100).toFixed(1);
  const diff = item.actual - item.budget;

  return (
    <div>
      <TopBar left={`Round ${idx + 1}/10`} right={`XP: ${total}`} streak={streak} />
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 12, padding: 20, marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginBottom: 6 }}>CLASSIFY THIS VARIANCE</div>
        <div style={{ fontSize: 24, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1, marginBottom: 16 }}>{item.cat}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[["BUDGET", `$${item.budget.toLocaleString()}`, "#9ca3af"], ["ACTUAL", `$${item.actual.toLocaleString()}`, "#fff"], ["VAR", `${diff > 0 ? "+" : ""}$${diff.toLocaleString()} (${diff > 0 ? "+" : ""}${pct}%)`, diff > 0 ? "#10b981" : "#ef4444"]].map(([l, v, c]) => (
            <div key={l} style={{ background: "#161b22", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 9, color: "#6b7280", fontFamily: "monospace", marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: c }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <TimerBar timeLeft={timeLeft} max={8} />
      {feedback ? (
        <FeedbackBanner correct={feedback.correct} pts={feedback.pts} streak={feedback.streak}
          msg={feedback.timeout ? "⏰ Time's up!" : feedback.correct ? (feedback.streak > 2 ? `🔥 ${feedback.streak}x Streak!` : "✓ Correct!") : `✗ It was ${item.isFavorable ? "Favorable" : "Unfavorable"}`} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[["✅ FAVORABLE", true, "#10b981"], ["❌ UNFAVORABLE", false, "#ef4444"]].map(([label, val, col]) => (
            <GameBtn key={label} label={label} color={col} onClick={() => handleAnswer(val)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── GAME 2: Budget Puzzle ─────────────────────────────────────────
function BudgetPuzzle({ onScore }) {
  const [deck] = useState(() => shuffle(BUDGET_POOL).slice(0, 4));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const s = deck[idx];
  const correct = s ? s.solve(s.revenue, s.cogs, s.rd, s.sga, s.da) : 0;

  const submit = async () => {
    const val = parseFloat(input.replace(/[$,%\s]/g, ""));
    if (isNaN(val)) return;
    const tolerance = s.isPercent ? 0.5 : correct * 0.02;
    const isCorrect = Math.abs(val - correct) <= tolerance;
    const pts = isCorrect ? 150 : Math.abs(val - correct) / Math.abs(correct) < 0.1 ? 75 : 0;
    const newScore = score + pts;
    setScore(newScore);
    setFeedback({ correct: isCorrect, pts, val, correct_val: correct });
    setLoadingAI(true);
    try {
      const aiText = await callAI(
        `The question was: "${s.question}" for ${s.company}. Numbers: Revenue $${s.revenue}, COGS $${s.cogs}, R&D $${s.rd}, SGA $${s.sga}, DA $${s.da}. The correct answer is ${correct}${s.isPercent ? "%" : ""}. The student answered ${val}${s.isPercent ? "%" : ""}. ${isCorrect ? "They got it right." : "They got it wrong."}`,
        "You are a sharp, encouraging finance coach. In 2 sentences max: briefly explain the correct formula and give one pro tip for remembering it. Be direct and punchy. No fluff."
      );
      setAiFeedback(aiText);
    } catch { setAiFeedback(null); }
    setLoadingAI(false);
  };

  const next = () => {
    setFeedback(null); setAiFeedback(null); setInput("");
    if (idx + 1 >= deck.length) { setDone(true); onScore(score); }
    else setIdx(i => i + 1);
  };

  if (done) return <GameOver icon="🧩" title="Puzzle Solved" xp={score} />;
  if (!s) return null;

  return (
    <div>
      <TopBar left={`Scenario ${idx + 1}/${deck.length}`} right={`XP: ${score}`} />
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginBottom: 6 }}>{s.company} — ($000s)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[["Revenue", s.revenue], ["COGS", s.cogs], ["R&D", s.rd], ["SG&A", s.sga], ["D&A", s.da]].map(([k, v]) => (
            <div key={k} style={{ background: "#161b22", borderRadius: 6, padding: "9px 12px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: 13 }}>{k}</span>
              <span style={{ color: "#fff", fontFamily: "monospace", fontWeight: 700 }}>${v.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#f97316", marginBottom: 4 }}>{s.question}</div>
        <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>Hint: {s.hint}</div>
      </div>
      {feedback ? (
        <div>
          <FeedbackBanner correct={feedback.correct} pts={feedback.pts}
            msg={feedback.correct ? "✓ Correct!" : `✗ Answer: ${feedback.correct_val}${s.isPercent ? "%" : ""}`} />
          {loadingAI && <div style={{ textAlign: "center", padding: 12, color: "#6b7280", fontSize: 13, fontFamily: "monospace" }}>🤖 AI Coach analyzing...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 10, padding: 14, marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "#f97316", fontFamily: "monospace", marginBottom: 6 }}>🤖 AI COACH</div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>{aiFeedback}</div>
            </div>
          )}
          <button onClick={next} style={{ width: "100%", marginTop: 12, background: "#f97316", color: "#000", border: "none", borderRadius: 10, padding: "14px", fontFamily: "'Bebas Neue',cursive", fontSize: 17, letterSpacing: 1, cursor: "pointer" }}>
            {idx + 1 >= deck.length ? "FINISH →" : "NEXT SCENARIO →"}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && input && submit()}
            placeholder={s.isPercent ? "e.g. 38.5" : "e.g. 14,000"}
            style={{ flex: 1, background: "#161b22", border: "1px solid #374151", borderRadius: 8, padding: "13px 15px", color: "#fff", fontSize: 15, fontFamily: "monospace", outline: "none" }} />
          <button onClick={submit} disabled={!input} style={{ background: "#f97316", color: "#000", border: "none", borderRadius: 8, padding: "13px 22px", fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue',cursive", letterSpacing: 1, fontSize: 15 }}>GO</button>
        </div>
      )}
    </div>
  );
}

// ─── GAME 3: CFO Hot Seat ──────────────────────────────────────────
function CFOHotSeat({ onScore }) {
  const [deck] = useState(() => shuffle(CFO_POOL).slice(0, 5));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = async (i) => {
    if (selected !== null) return;
    setSelected(i);
    const q = deck[idx];
    const correct = i === q.correct;
    const pts = correct ? 200 : 0;
    const newScore = score + pts;
    setScore(newScore);
    setLoadingAI(true);
    try {
      const aiText = await callAI(
        `CFO interview question: "${q.q}". Correct answer: "${q.options[q.correct]}". Student chose: "${q.options[i]}". ${correct ? "They got it right." : "They got it wrong."}`,
        "You are a senior finance executive giving quick debrief. In 2-3 sentences: reinforce why the correct answer is right, and what the wrong answer signals about analytical gaps. Be sharp and direct like a real CFO would be."
      );
      setAiFeedback(aiText);
    } catch { setAiFeedback(null); }
    setLoadingAI(false);
  };

  const next = () => {
    setSelected(null); setAiFeedback(null);
    if (idx + 1 >= deck.length) { setDone(true); onScore(score); }
    else setIdx(i => i + 1);
  };

  if (done) return <GameOver icon="🎯" title="Hot Seat Survived" xp={score} />;
  const q = deck[idx];

  return (
    <div>
      <TopBar left={`Q ${idx + 1}/${deck.length}`} right={`XP: ${score}`} />
      <div style={{ background: "#0d1117", border: "1px dashed #f9741633", borderRadius: 12, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#f97316", fontFamily: "monospace", marginBottom: 8 }}>👔 CFO ASKS:</div>
        <div style={{ fontSize: 15, color: "#fff", lineHeight: 1.65 }}>{q.q}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {q.options.map((opt, i) => {
          let bg = "transparent", border = "#374151", col = "#d1d5db";
          if (selected !== null) {
            if (i === q.correct) { bg = "rgba(16,185,129,0.12)"; border = "#10b981"; col = "#10b981"; }
            else if (i === selected) { bg = "rgba(239,68,68,0.12)"; border = "#ef4444"; col = "#ef4444"; }
          }
          return (
            <button key={i} onClick={() => choose(i)} disabled={selected !== null}
              style={{ background: bg, border: `1.5px solid ${border}`, color: col, borderRadius: 10, padding: "13px 15px", textAlign: "left", fontSize: 13, cursor: selected !== null ? "default" : "pointer", lineHeight: 1.5, transition: "all 0.2s" }}>
              <span style={{ fontFamily: "monospace", marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div>
          <div style={{ background: "#161b22", borderRadius: 8, padding: "11px 14px", fontSize: 13, color: "#9ca3af", lineHeight: 1.55, marginBottom: 10 }}>
            <span style={{ color: "#f97316", fontWeight: 700 }}>CONTEXT: </span>{q.explain}
          </div>
          {loadingAI && <div style={{ textAlign: "center", padding: 10, color: "#6b7280", fontSize: 13 }}>🤖 Executive debrief loading...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#f97316", fontFamily: "monospace", marginBottom: 5 }}>🤖 EXECUTIVE DEBRIEF</div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>{aiFeedback}</div>
            </div>
          )}
          <button onClick={next} style={{ width: "100%", background: "#f97316", color: "#000", border: "none", borderRadius: 10, padding: "13px", fontFamily: "'Bebas Neue',cursive", fontSize: 16, letterSpacing: 1, cursor: "pointer" }}>
            {idx + 1 >= deck.length ? "FINISH →" : "NEXT QUESTION →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── GAME 4: Forecast Frenzy ──────────────────────────────────────
function ForecastFrenzy({ onScore }) {
  const [scenario] = useState(() => FORECAST_POOL[Math.floor(Math.random() * FORECAST_POOL.length)]);
  const [assumptions, setAssumptions] = useState({ revenueGrowth: 8, cogsRate: 45, rdRate: 12, sgaRate: 15 });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const project = () => {
    const rev = scenario.base.revenue * (1 + assumptions.revenueGrowth / 100);
    const cogs = rev * (assumptions.cogsRate / 100);
    const rd = rev * (assumptions.rdRate / 100);
    const sga = rev * (assumptions.sgaRate / 100);
    const gp = rev - cogs;
    const oi = gp - rd - sga;
    return { revenue: Math.round(rev), grossProfit: Math.round(gp), opIncome: Math.round(oi),
      grossMargin: +((gp / rev) * 100).toFixed(1), opMargin: +((oi / rev) * 100).toFixed(1) };
  };

  const submitForecast = async () => {
    const p = project();
    const gmDiff = Math.abs(p.grossMargin - scenario.targets.grossMargin);
    const omDiff = Math.abs(p.opMargin - scenario.targets.opMargin);
    const pts = Math.round(Math.max(0, 300 - gmDiff * 25 - omDiff * 25));
    setScore(pts); setSubmitted(true); onScore(pts);
    setLoadingAI(true);
    try {
      const aiText = await callAI(
        `Company: ${scenario.company}. Target: Gross Margin ${scenario.targets.grossMargin}%, Op Margin ${scenario.targets.opMargin}%. Student forecast: Gross Margin ${p.grossMargin}%, Op Margin ${p.opMargin}%. Assumptions used: Revenue Growth ${assumptions.revenueGrowth}%, COGS ${assumptions.cogsRate}%, R&D ${assumptions.rdRate}%, SGA ${assumptions.sgaRate}%.`,
        "You are an FP&A coach reviewing a forecast model. In 3 sentences: comment on which assumptions most affected the margin miss/hit, and give one specific insight about the company's cost structure implied by the targets. Be analytical and concrete."
      );
      setAiFeedback(aiText);
    } catch { setAiFeedback(null); }
    setLoadingAI(false);
  };

  const p = project();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1, color: "#fff" }}>{scenario.company}</div>
        <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>FORECAST FRENZY</div>
      </div>
      <div style={{ background: "#0d1117", border: "1px solid #f9741622", borderRadius: 10, padding: 14, marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["Target Gross Margin", `${scenario.targets.grossMargin}%`], ["Target Op Margin", `${scenario.targets.opMargin}%`]].map(([k, v]) => (
          <div key={k} style={{ background: "#161b22", borderRadius: 6, padding: "8px 12px" }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace" }}>{k}</div>
            <div style={{ color: "#f97316", fontWeight: 700, fontFamily: "monospace", fontSize: 16 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        {[["revenueGrowth", "Revenue Growth", 1, 25, "%"], ["cogsRate", "COGS % of Rev", 25, 70, "%"], ["rdRate", "R&D % of Rev", 2, 30, "%"], ["sgaRate", "SG&A % of Rev", 5, 35, "%"]].map(([key, label, min, max, unit]) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: "#d1d5db" }}>{label}</span>
              <span style={{ fontFamily: "monospace", color: "#f97316", fontWeight: 700, fontSize: 14 }}>{assumptions[key]}{unit}</span>
            </div>
            <input type="range" min={min} max={max} step="0.5" value={assumptions[key]}
              onChange={e => setAssumptions(a => ({ ...a, [key]: +e.target.value }))}
              disabled={submitted} style={{ width: "100%", accentColor: "#f97316" }} />
          </div>
        ))}
      </div>
      <div style={{ background: "#161b22", borderRadius: 10, padding: 14, marginBottom: 16 }}>
        {[["Revenue", `$${p.revenue.toLocaleString()}`, "#fff"], ["Gross Profit", `$${p.grossProfit.toLocaleString()}`, "#10b981"],
          ["Gross Margin", `${p.grossMargin}%`, Math.abs(p.grossMargin - scenario.targets.grossMargin) < 1 ? "#10b981" : "#f97316"],
          ["Op Income", `$${p.opIncome.toLocaleString()}`, p.opIncome > 0 ? "#10b981" : "#ef4444"],
          ["Op Margin", `${p.opMargin}%`, Math.abs(p.opMargin - scenario.targets.opMargin) < 1 ? "#10b981" : "#f97316"],
        ].map(([k, v, c]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #1f2937" }}>
            <span style={{ color: "#9ca3af", fontSize: 13 }}>{k}</span>
            <span style={{ fontFamily: "monospace", color: c, fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
      {submitted ? (
        <div>
          <div style={{ textAlign: "center", padding: 16, background: "rgba(249,115,22,0.08)", border: "1px solid #f9741644", borderRadius: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 24, fontFamily: "'Bebas Neue',cursive", color: "#f97316", letterSpacing: 2 }}>FORECAST LOCKED</div>
            <div style={{ fontSize: 40, color: "#fff", fontFamily: "'Bebas Neue',cursive" }}>+{score} XP</div>
          </div>
          {loadingAI && <div style={{ textAlign: "center", padding: 10, color: "#6b7280", fontSize: 13 }}>🤖 Analyzing your model...</div>}
          {aiFeedback && (
            <div style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: "#f97316", fontFamily: "monospace", marginBottom: 5 }}>🤖 MODEL REVIEW</div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>{aiFeedback}</div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={submitForecast} style={{ width: "100%", background: "linear-gradient(135deg, #f97316, #ef4444)", color: "#fff", border: "none", borderRadius: 10, padding: 15, fontFamily: "'Bebas Neue',cursive", fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>
          LOCK IN FORECAST ⚡
        </button>
      )}
    </div>
  );
}

// ─── GAME 5: Speed Round ──────────────────────────────────────────
function SpeedRound({ onScore }) {
  const [deck] = useState(() => shuffle(SPEED_POOL).slice(0, 12));
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (done || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); handleAnswer(null, true); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, feedback, done]);

  const handleAnswer = (ans, timeout = false) => {
    clearInterval(timerRef.current);
    const item = deck[idx];
    const correct = !timeout && ans === item.answer;
    const pts = correct ? Math.round(Math.max(10, timeLeft * 12) * (1 + Math.min(streak, 5) * 0.2)) : 0;
    const newStreak = correct ? streak + 1 : 0;
    const newTotal = total + pts;
    setStreak(newStreak); setTotal(newTotal);
    setFeedback({ correct, pts, item, timeout });
    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 >= deck.length) { setDone(true); onScore(newTotal); }
      else { setIdx(i => i + 1); setTimeLeft(6); }
    }, 1800);
  };

  if (done) return <GameOver icon="⚡" title="Speed Round Done" xp={total} />;
  const item = deck[idx];

  return (
    <div>
      <TopBar left={`${idx + 1}/12`} right={`XP: ${total}`} streak={streak} />
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 12, padding: 22, marginBottom: 18, minHeight: 80 }}>
        <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginBottom: 8 }}>TRUE OR FALSE?</div>
        <div style={{ fontSize: 16, color: "#fff", lineHeight: 1.65 }}>{item.q}</div>
      </div>
      <TimerBar timeLeft={timeLeft} max={6} />
      {feedback ? (
        <div>
          <FeedbackBanner correct={feedback.correct} pts={feedback.pts}
            msg={feedback.timeout ? "⏰ Time's up!" : feedback.correct ? "✓ Correct!" : `✗ It was ${feedback.item.answer ? "TRUE" : "FALSE"}`} />
          <div style={{ background: "#161b22", borderRadius: 8, padding: "10px 14px", marginTop: 10, fontSize: 13, color: "#9ca3af", lineHeight: 1.55 }}>
            {feedback.item.explain}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <GameBtn label="✓ TRUE" color="#10b981" onClick={() => handleAnswer(true)} />
          <GameBtn label="✗ FALSE" color="#ef4444" onClick={() => handleAnswer(false)} />
        </div>
      )}
    </div>
  );
}

// ─── Shared UI ─────────────────────────────────────────────────────
const TopBar = ({ left, right, streak }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
    <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{left}</div>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {streak > 1 && <span style={{ background: "#f97316", color: "#000", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>🔥 {streak}x</span>}
      <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{right}</div>
    </div>
  </div>
);

const TimerBar = ({ timeLeft, max }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
    <div style={{ flex: 1, height: 5, background: "#1f2937", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(timeLeft / max) * 100}%`, background: timeLeft <= 2 ? "#ef4444" : "#f97316", borderRadius: 3, transition: "width 1s linear" }} />
    </div>
    <div style={{ fontSize: 14, fontFamily: "monospace", color: timeLeft <= 2 ? "#ef4444" : "#fff", width: 18, textAlign: "right" }}>{timeLeft}</div>
  </div>
);

const FeedbackBanner = ({ correct, pts, msg }) => (
  <div style={{ background: correct ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${correct ? "#10b981" : "#ef4444"}`, borderRadius: 10, padding: "14px 18px", textAlign: "center" }}>
    <div style={{ fontSize: 17, fontWeight: 700, color: correct ? "#10b981" : "#ef4444" }}>{msg}</div>
    {pts > 0 && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>+{pts} XP</div>}
  </div>
);

const GameBtn = ({ label, color, onClick }) => (
  <button onClick={onClick} style={{ background: "transparent", border: `2px solid ${color}`, color, borderRadius: 10, padding: "17px 10px", fontSize: 15, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1, cursor: "pointer", transition: "all 0.15s" }}
    onMouseEnter={e => e.currentTarget.style.background = color + "20"}
    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
    {label}
  </button>
);

const GameOver = ({ icon, title, xp }) => (
  <div style={{ textAlign: "center", padding: "44px 20px" }}>
    <div style={{ fontSize: 52, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 26, fontFamily: "'Bebas Neue',cursive", color: "#f97316", letterSpacing: 2 }}>{title}</div>
    <div style={{ fontSize: 52, fontFamily: "'Bebas Neue',cursive", color: "#fff", margin: "10px 0" }}>{xp.toLocaleString()} XP</div>
    <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>SAVED TO LEADERBOARD</div>
  </div>
);

// ─── Games config ─────────────────────────────────────────────────
const GAMES = [
  { id: "variance", title: "Variance Blitz", icon: "⚡", desc: "10 timed rounds. Classify variances. Streak multiplier.", maxXP: 1200, color: "#3b82f6", badge: "HOT" },
  { id: "budget", title: "Budget Puzzle", icon: "🧩", desc: "Calculate missing P&L line items. AI coach explains every answer.", maxXP: 600, color: "#8b5cf6", badge: "AI" },
  { id: "cfohot", title: "CFO Hot Seat", icon: "🎯", desc: "5 senior-level questions. AI executive debrief after each.", maxXP: 1000, color: "#ef4444", badge: "AI" },
  { id: "forecast", title: "Forecast Frenzy", icon: "📊", desc: "Dial assumptions to hit margin targets. AI model review.", maxXP: 300, color: "#10b981", badge: "AI" },
  { id: "speed", title: "Speed Round", icon: "⚡", desc: "True/False finance fundamentals. 6 seconds. No mercy.", maxXP: 900, color: "#f59e0b", badge: "NEW" },
];

// ─── MAIN ─────────────────────────────────────────────────────────
export default function FinanceArena() {
  const [screen, setScreen] = useState("splash");
  const [player, setPlayer] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [sessionXP, setSessionXP] = useState(0);
  const [notif, setNotif] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);

  useEffect(() => { loadLeaderboard(); }, []);

  const loadLeaderboard = async () => {
    const d = await safeGet();
    if (d) setLeaderboard(d);
  };

  const tapTitle = () => {
    const n = titleClicks + 1;
    setTitleClicks(n);
    if (n >= 5) {
      setTitleClicks(0);
      const entry = window.prompt("Admin passphrase:");
      if (entry === ADMIN_PASS) { setAdmin(true); showNotif("Admin mode on — delete buttons enabled.", "#10b981"); }
      else if (entry !== null) { showNotif("Incorrect passphrase.", "#ef4444"); }
    }
  };

  const removePlayer = async (name) => {
    if (!window.confirm(`Remove "${name}" from the leaderboard? This can't be undone.`)) return;
    const nb = leaderboard.filter(p => p.name !== name);
    setLeaderboard(nb);
    await safeSet(nb);
    showNotif(`Removed "${name}".`, "#10b981");
  };

  const showNotif = (msg, color = "#f97316") => {
    setNotif({ msg, color });
    setTimeout(() => setNotif(null), 3500);
  };

  const joinArena = async () => {
    if (!nameInput.trim()) return;
    const name = nameInput.trim().slice(0, 20);
    const existing = leaderboard.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setPlayer(existing); setScreen("hub");
      showNotif(`Welcome back, ${name}!`, "#3b82f6");
    } else {
      const np = { name, xp: 0, gamesPlayed: 0, joined: Date.now() };
      setPlayer(np);
      const nb = [...leaderboard, np].sort((a, b) => b.xp - a.xp).slice(0, 100);
      setLeaderboard(nb); await safeSet(nb);
      setScreen("hub");
      showNotif(`Welcome to the Arena, ${name}!`);
    }
  };

  const handleGameScore = async (xp) => {
    const earned = Math.round(xp);
    setSessionXP(s => s + earned);
    if (!player) return;
    const oldRank = getRank(player.xp);
    const updated = { ...player, xp: player.xp + earned, gamesPlayed: player.gamesPlayed + 1 };
    const newRank = getRank(updated.xp);
    setPlayer(updated);
    const nb = leaderboard.map(p => p.name === player.name ? updated : p);
    if (!nb.find(p => p.name === player.name)) nb.push(updated);
    const sorted = nb.sort((a, b) => b.xp - a.xp).slice(0, 100);
    setLeaderboard(sorted); await safeSet(sorted);
    if (newRank.name !== oldRank.name) {
      showNotif(`🎉 RANK UP: ${newRank.icon} ${newRank.name}!`, newRank.color);
    } else {
      showNotif(`+${earned} XP earned!`);
    }
  };

  const rank = player ? getRank(player.xp) : null;
  const playerPos = leaderboard.findIndex(p => p.name === player?.name) + 1;
  const nextRank = rank ? RANKS.find(r => r.min > (player?.xp || 0)) : null;
  const xpPct = rank && nextRank ? ((player.xp - rank.min) / (nextRank.min - rank.min) * 100) : 100;

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#fff", fontFamily: "'DM Sans',sans-serif", position: "relative", paddingTop: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        *{box-sizing:border-box;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes rankUp{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
        .gc:hover{transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,0,0,0.4)}
        .gc{transition:all 0.2s}
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      {notif && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 1000, background: notif.color, color: notif.color === "#f97316" || notif.color === "#10b981" || notif.color === "#f59e0b" ? "#000" : "#fff", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 14, animation: "slideIn 0.3s ease", boxShadow: `0 4px 24px ${notif.color}55` }}>
          {notif.msg}
        </div>
      )}

      {screen === "splash" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.6s ease" }}>
          <div style={{ fontSize: 12, fontFamily: "monospace", color: "#f97316", letterSpacing: 4, marginBottom: 14, animation: "pulse 2s infinite" }}>► SYSTEM READY</div>
          <div style={{ fontSize: 70, fontFamily: "'Bebas Neue',cursive", letterSpacing: 4, lineHeight: 0.95, textAlign: "center", marginBottom: 10 }}>
            <span style={{ color: "#fff" }}>FINANCE</span><br />
            <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>ARENA</span>
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 36, textAlign: "center", maxWidth: 260, lineHeight: 1.65 }}>
            5 gamified FP&A challenges. AI coaching. Global leaderboard.
          </div>
          <div style={{ width: "100%", maxWidth: 320, background: "#0d1117", border: "1px solid #1f2937", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace", marginBottom: 8, letterSpacing: 1 }}>ENTER YOUR NAME</div>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && nameInput.trim() && joinArena()}
              placeholder="e.g. TarunP" maxLength={20}
              style={{ width: "100%", background: "#161b22", border: "1px solid #374151", borderRadius: 8, padding: "13px 15px", color: "#fff", fontSize: 16, fontFamily: "monospace", outline: "none", marginBottom: 10 }} />
            <button onClick={joinArena} disabled={!nameInput.trim()}
              style={{ width: "100%", background: nameInput.trim() ? "#f97316" : "#1f2937", color: nameInput.trim() ? "#000" : "#4b5563", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',cursive", fontSize: 19, letterSpacing: 2, cursor: nameInput.trim() ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
              ENTER THE ARENA →
            </button>
          </div>
          <button onClick={() => setScreen("leaderboard")} style={{ marginTop: 18, background: "transparent", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
            View Leaderboard
          </button>

          <div style={{ marginTop: 40, maxWidth: 380, width: "100%" }}>
            <div style={{ fontSize: 14, fontFamily: "'Bebas Neue',cursive", letterSpacing: 2, color: "#f97316", marginBottom: 14, textAlign: "center" }}>HOW IT WORKS</div>
            <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 12, padding: 20, fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
              <p style={{ marginBottom: 12 }}>Play 5 FP&A challenges — from variance classification to CFO-level scenario questions — each with AI-powered coaching that breaks down every answer.</p>
              <p style={{ marginBottom: 12 }}>Earn XP based on accuracy, speed, and streak multipliers. Your total XP determines your rank, from <span style={{ color: "#6b7280" }}>📋 Intern</span> all the way to <span style={{ color: "#f97316" }}>👔 CFO</span>.</p>
              <p style={{ marginBottom: 0 }}>The leaderboard is live — anyone who plays competes on the same board. Enter your name and see where you stack up.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
              {[["📋 Intern", "0 XP", "#6b7280"], ["📊 Analyst", "300 XP", "#3b82f6"], ["📈 Sr. Analyst", "800 XP", "#8b5cf6"], ["💼 FP&A Mgr", "1,800 XP", "#f59e0b"], ["🎯 Director", "3,500 XP", "#ef4444"], ["⚡ VP Finance", "6,000 XP", "#10b981"], ["👔 CFO", "12,000 XP", "#f97316"]].map(([rank, xp, col]) => (
                <div key={rank} style={{ background: "#0d1117", border: `1px solid ${col}22`, borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#d1d5db" }}>{rank}</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: col }}>{xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "hub" && player && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "22px 18px", animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 20, fontFamily: "'Bebas Neue',cursive", letterSpacing: 2 }}>FINANCE ARENA</div>
              <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace" }}>GAME HUB</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setScreen("leaderboard")} style={{ background: "#161b22", border: "1px solid #374151", color: "#d1d5db", borderRadius: 8, padding: "7px 13px", fontSize: 12, cursor: "pointer" }}>🏆</button>
              <button onClick={() => setScreen("splash")} style={{ background: "#161b22", border: "1px solid #374151", color: "#d1d5db", borderRadius: 8, padding: "7px 13px", fontSize: 12, cursor: "pointer" }}>⏎</button>
            </div>
          </div>

          <div style={{ background: "#0d1117", border: `1px solid ${rank.color}44`, borderRadius: 14, padding: 18, marginBottom: 22, animation: "rankUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace", marginBottom: 4 }}>PLAYER</div>
                <div style={{ fontSize: 22, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1 }}>{player.name}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: rank.color + "18", color: rank.color, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700, marginTop: 5 }}>
                  {rank.icon} {rank.name}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 34, fontFamily: "'Bebas Neue',cursive", color: rank.color, lineHeight: 1 }}>{player.xp.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace" }}>XP</div>
                {playerPos > 0 && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>#{playerPos} Global</div>}
              </div>
            </div>
            {nextRank && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#4b5563", fontFamily: "monospace", marginBottom: 5 }}>
                  <span>{rank.name}</span><span>{nextRank.icon} {nextRank.name} @ {nextRank.min.toLocaleString()} XP</span>
                </div>
                <div style={{ height: 4, background: "#1f2937", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${Math.min(100, xpPct)}%`, background: rank.color, borderRadius: 2, transition: "width 0.8s ease" }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace", letterSpacing: 1, marginBottom: 12 }}>SELECT MODE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {GAMES.map(g => (
              <div key={g.id} className="gc" onClick={() => { setActiveGame(g.id); setScreen("game"); }}
                style={{ background: "#0d1117", border: `1px solid ${g.color}28`, borderRadius: 12, padding: "15px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28, width: 48, height: 48, background: g.color + "12", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{g.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <span style={{ fontSize: 16, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1 }}>{g.title}</span>
                    {g.badge && <span style={{ fontSize: 9, background: g.color, color: "#000", borderRadius: 4, padding: "1px 6px", fontWeight: 700, letterSpacing: 0.5 }}>{g.badge}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>{g.desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontFamily: "'Bebas Neue',cursive", color: g.color }}>{g.maxXP}</div>
                  <div style={{ fontSize: 9, color: "#4b5563", fontFamily: "monospace" }}>MAX XP</div>
                </div>
              </div>
            ))}
          </div>

          {sessionXP > 0 && (
            <div style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 10, padding: "11px 16px", textAlign: "center", fontSize: 13, color: "#f97316" }}>
              Session total: +{sessionXP.toLocaleString()} XP ⚡
            </div>
          )}
        </div>
      )}

      {screen === "game" && activeGame && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "22px 18px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <button onClick={() => setScreen("hub")} style={{ background: "#161b22", border: "1px solid #374151", color: "#d1d5db", borderRadius: 8, padding: "8px 13px", fontSize: 12, cursor: "pointer" }}>← HUB</button>
            <div>
              <div style={{ fontSize: 17, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1 }}>{GAMES.find(g => g.id === activeGame)?.title}</div>
              <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace" }}>{player?.name?.toUpperCase()}</div>
            </div>
          </div>
          {activeGame === "variance" && <VarianceBlitz onScore={handleGameScore} />}
          {activeGame === "budget" && <BudgetPuzzle onScore={handleGameScore} />}
          {activeGame === "cfohot" && <CFOHotSeat onScore={handleGameScore} />}
          {activeGame === "forecast" && <ForecastFrenzy onScore={handleGameScore} />}
          {activeGame === "speed" && <SpeedRound onScore={handleGameScore} />}
        </div>
      )}

      {screen === "leaderboard" && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "22px 18px", animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 28, fontFamily: "'Bebas Neue',cursive", letterSpacing: 3 }}>LEADERBOARD</div>
              <div onClick={tapTitle} style={{ fontSize: 10, color: admin ? "#10b981" : "#6b7280", fontFamily: "monospace", cursor: "default", userSelect: "none" }}>{leaderboard.length} PLAYERS RANKED{admin ? " · ADMIN" : ""}</div>
            </div>
            <button onClick={() => setScreen(player ? "hub" : "splash")} style={{ background: "#161b22", border: "1px solid #374151", color: "#d1d5db", borderRadius: 8, padding: "8px 13px", fontSize: 12, cursor: "pointer" }}>
              {player ? "← HUB" : "← BACK"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
            {RANKS.map(r => (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 4, background: r.color + "15", borderRadius: 20, padding: "3px 10px" }}>
                <span style={{ fontSize: 11 }}>{r.icon}</span>
                <span style={{ fontSize: 10, color: r.color, fontWeight: 700 }}>{r.name}</span>
              </div>
            ))}
          </div>
          {leaderboard.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#4b5563" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🏆</div>
              <div style={{ fontFamily: "monospace", fontSize: 13 }}>No players yet.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leaderboard.slice(0, 25).map((p, i) => {
                const r = getRank(p.xp);
                const isMe = p.name === player?.name;
                return (
                  <div key={p.name} style={{ background: isMe ? "rgba(249,115,22,0.08)" : "#0d1117", border: `1px solid ${isMe ? "#f97316" : "#1f2937"}`, borderRadius: 10, padding: "12px 15px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 26, textAlign: "center", fontSize: i < 3 ? 18 : 13, color: ["#f59e0b","#9ca3af","#cd7f32","#4b5563"][Math.min(i,3)], fontFamily: "monospace", fontWeight: 700, flexShrink: 0 }}>
                      {i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}
                    </div>
                    <div style={{ fontSize: 16 }}>{r.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: isMe ? "#f97316" : "#fff" }}>{p.name}{isMe && <span style={{ fontSize: 10, color: "#f97316", marginLeft: 6 }}>YOU</span>}</div>
                      <div style={{ fontSize: 11, color: r.color }}>{r.name} · {p.gamesPlayed} games</div>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 18, color: i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7f32" : "#6b7280" }}>
                      {p.xp.toLocaleString()}
                    </div>
                    {admin && (
                      <button onClick={() => removePlayer(p.name)} title="Remove entry"
                        style={{ background: "transparent", border: "1px solid #ef444455", color: "#ef4444", borderRadius: 6, padding: "4px 9px", fontSize: 12, cursor: "pointer", flexShrink: 0 }}>
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {!player && (
            <button onClick={() => setScreen("splash")} style={{ width: "100%", marginTop: 20, background: "#f97316", color: "#000", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',cursive", fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>
              JOIN THE ARENA →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
