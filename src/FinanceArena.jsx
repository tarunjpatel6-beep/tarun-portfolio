import { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FPA_QUESTION_BANKS } from "./fpaQuestions";
import { QUESTION_BANKS as EVMS_QUESTION_BANKS } from "./evmsQuestions";
import { BCA_QUESTION_BANKS } from "./bcaQuestions";
import { loadVisibility, TRAINING_ADMIN_PASS } from "./trainingConfig";

// ─── Firebase ─────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAxL5lDrrzJO_7L1zzbH37R6ArZuDiXHtU",
  authDomain: "finance-arena-ec4ff.firebaseapp.com",
  projectId: "finance-arena-ec4ff",
  storageBucket: "finance-arena-ec4ff.firebasestorage.app",
  messagingSenderId: "144073874887",
  appId: "1:144073874887:web:2a84bacbfb416261938de2",
  measurementId: "G-WPW00WD13B",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadBoard = async (key) => {
  try { const snap = await getDoc(doc(db, "arena", key)); return snap.exists() ? (snap.data().players || []) : []; } catch { return []; }
};
const saveBoard = async (key, players) => {
  try { await setDoc(doc(db, "arena", key), { players }); } catch {}
};

const flatten = (banks) => Object.values(banks).flat();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── Domains ──────────────────────────────────────────────────────
const DOMAINS = [
  { id: "fpa", label: "FP&A", tag: "Financial Planning & Analysis", accent: "#8b5cf6", icon: "📈", lbKey: "finance-arena-leaderboard", pool: flatten(FPA_QUESTION_BANKS) },
  { id: "evms", label: "EVMS", tag: "Defense Program Finance", accent: "#00c2ff", icon: "🛩️", lbKey: "arena-evms", pool: flatten(EVMS_QUESTION_BANKS) },
  { id: "bca", label: "Aircraft Contracts", tag: "Commercial Aircraft Deals", accent: "#3b82f6", icon: "✈️", lbKey: "arena-bca", pool: flatten(BCA_QUESTION_BANKS) },
];
const domainById = (id) => DOMAINS.find(d => d.id === id);

const RANKS = [
  { name: "Intern", min: 0, color: "#6b7280", icon: "📋" },
  { name: "Analyst", min: 300, color: "#3b82f6", icon: "📊" },
  { name: "Sr. Analyst", min: 800, color: "#8b5cf6", icon: "📈" },
  { name: "Manager", min: 1800, color: "#f59e0b", icon: "💼" },
  { name: "Director", min: 3500, color: "#ef4444", icon: "🎯" },
  { name: "VP Finance", min: 6000, color: "#10b981", icon: "⚡" },
  { name: "CFO", min: 12000, color: "#f97316", icon: "👔" },
];
const getRank = (xp) => [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];

const GAMES = [
  { id: "speed", title: "Speed Round", icon: "⚡", desc: "60 seconds. Answer as many as you can. Streaks boost your score.", color: "#f97316" },
  { id: "streak", title: "Streak Blitz", icon: "🔥", desc: "One life. Each correct answer is worth more — miss once and it's over.", color: "#ef4444" },
  { id: "gauntlet", title: "The Gauntlet", icon: "🎓", desc: "10 questions, no timer. Learn from explanations as you go.", color: "#10b981" },
];

// ═══════════════════════════════════════════════════════════════════
// GAMES (all bank-driven, work for any domain)
// ═══════════════════════════════════════════════════════════════════
const optBtn = (state, accent) => {
  let bg = "rgba(255,255,255,0.03)", bd = "#2a2a3a", col = "#cbd5e1";
  if (state === "correct") { bg = "rgba(16,185,129,0.15)"; bd = "#10b981"; col = "#10b981"; }
  if (state === "wrong") { bg = "rgba(239,68,68,0.15)"; bd = "#ef4444"; col = "#ef4444"; }
  return { background: bg, border: `1px solid ${bd}`, color: col, borderRadius: 10, padding: "13px 16px", textAlign: "left", fontSize: 14, lineHeight: 1.5, cursor: state ? "default" : "pointer", transition: "all .15s", width: "100%" };
};
const resultBox = (accent) => ({ textAlign: "center", padding: "34px 20px", background: `${accent}14`, border: `1px solid ${accent}44`, borderRadius: 16, marginBottom: 18 });
const primaryBtn = (accent) => ({ background: accent, border: "none", color: "#fff", borderRadius: 12, padding: "14px 22px", fontFamily: "'Bebas Neue',cursive", fontSize: 18, letterSpacing: 2, cursor: "pointer" });
const ghostBtn = { background: "transparent", border: "1px solid #3a3a4a", color: "#94a3b8", borderRadius: 12, padding: "14px 22px", fontFamily: "'Bebas Neue',cursive", fontSize: 16, letterSpacing: 2, cursor: "pointer" };

function SpeedRound({ pool, accent, onScore, onExit }) {
  const DURATION = 60;
  const [deck] = useState(() => shuffle(pool));
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const tRef = useRef(null);

  useEffect(() => {
    tRef.current = setInterval(() => setTime(t => { if (t <= 1) { clearInterval(tRef.current); setDone(true); return 0; } return t - 1; }), 1000);
    return () => clearInterval(tRef.current);
  }, []);

  const q = deck[idx % deck.length];
  const pick = (i) => {
    if (picked !== null || done) return;
    setPicked(i);
    if (i === q.correct) { const ns = streak + 1; setStreak(ns); setCorrect(c => c + 1); setScore(s => s + 100 + Math.min(ns, 6) * 15); }
    else setStreak(0);
    setTimeout(() => { setPicked(null); setIdx(n => n + 1); }, 450);
  };

  if (done) return (
    <div>
      <div style={resultBox(accent)}>
        <div style={{ fontSize: 46 }}>⚡</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: accent, letterSpacing: 2 }}>TIME!</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 56, color: "#fff" }}>{score}</div>
        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{correct} CORRECT · {score} XP EARNED</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onExit} style={ghostBtn}>Exit</button>
        <button onClick={() => onScore(score)} style={{ ...primaryBtn(accent), flex: 1 }}>Collect XP →</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: "#94a3b8" }}>🔥 {streak} streak · {score} XP</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 30, color: time <= 10 ? "#ef4444" : accent }}>{time}s</div>
      </div>
      <div style={{ height: 4, background: "#1e1e2a", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(time / DURATION) * 100}%`, background: time <= 10 ? "#ef4444" : accent, transition: "width 1s linear" }} />
      </div>
      <div style={{ fontSize: 16, color: "#fff", lineHeight: 1.6, marginBottom: 18, fontWeight: 600 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {q.options.map((o, i) => {
          const st = picked === null ? null : i === q.correct ? "correct" : i === picked ? "wrong" : null;
          return <button key={i} onClick={() => pick(i)} style={optBtn(st, accent)}><span style={{ fontFamily: "monospace", opacity: .5, marginRight: 8 }}>{String.fromCharCode(65 + i)}</span>{o}</button>;
        })}
      </div>
      <button onClick={onExit} style={{ ...ghostBtn, marginTop: 18, width: "100%" }}>Quit Game</button>
    </div>
  );
}

function StreakBlitz({ pool, accent, onScore, onExit }) {
  const [deck] = useState(() => shuffle(pool));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState(null);
  const [dead, setDead] = useState(false);
  const q = deck[idx % deck.length];
  const nextVal = 100 + streak * 50;

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) {
      const ns = streak + 1;
      setTimeout(() => { setScore(s => s + nextVal); setStreak(ns); setPicked(null); setIdx(n => n + 1); }, 650);
    } else {
      setTimeout(() => setDead(true), 900);
    }
  };

  if (dead) return (
    <div>
      <div style={resultBox(accent)}>
        <div style={{ fontSize: 46 }}>🔥</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: "#ef4444", letterSpacing: 2 }}>STREAK ENDED</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 56, color: "#fff" }}>{score}</div>
        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>BEST STREAK: {streak} · {score} XP EARNED</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onExit} style={ghostBtn}>Exit</button>
        <button onClick={() => onScore(score)} style={{ ...primaryBtn(accent), flex: 1 }}>Collect XP →</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, color: accent }}>🔥 {streak}</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: "#94a3b8" }}>{score} XP · next +{nextVal}</div>
      </div>
      <div style={{ fontSize: 16, color: "#fff", lineHeight: 1.6, marginBottom: 18, fontWeight: 600 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {q.options.map((o, i) => {
          const st = picked === null ? null : i === q.correct ? "correct" : i === picked ? "wrong" : null;
          return <button key={i} onClick={() => pick(i)} style={optBtn(st, accent)}><span style={{ fontFamily: "monospace", opacity: .5, marginRight: 8 }}>{String.fromCharCode(65 + i)}</span>{o}</button>;
        })}
      </div>
      {picked !== null && q.explain && <div style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 13, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{q.explain}</div>}
      <button onClick={onExit} style={{ ...ghostBtn, marginTop: 18, width: "100%" }}>Quit Game</button>
    </div>
  );
}

function Gauntlet({ pool, accent, onScore, onExit }) {
  const TOTAL = 10;
  const [deck] = useState(() => shuffle(pool).slice(0, TOTAL));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = deck[idx];

  const pick = (i) => { if (picked !== null) return; setPicked(i); if (i === q.correct) setCorrect(c => c + 1); };
  const next = () => { if (idx + 1 >= deck.length) setDone(true); else { setIdx(i => i + 1); setPicked(null); } };
  const score = Math.round((correct / deck.length) * 1000);

  if (done) return (
    <div>
      <div style={resultBox(accent)}>
        <div style={{ fontSize: 46 }}>🎓</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: accent, letterSpacing: 2 }}>GAUNTLET COMPLETE</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 56, color: "#fff" }}>{correct}/{deck.length}</div>
        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{score} XP EARNED</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onExit} style={ghostBtn}>Exit</button>
        <button onClick={() => onScore(score)} style={{ ...primaryBtn(accent), flex: 1 }}>Collect XP →</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: accent }}>QUESTION {idx + 1}/{deck.length}</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>{correct} correct</div>
      </div>
      <div style={{ height: 4, background: "#1e1e2a", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((idx) / deck.length) * 100}%`, background: accent, transition: "width .4s" }} />
      </div>
      <div style={{ fontSize: 16, color: "#fff", lineHeight: 1.6, marginBottom: 18, fontWeight: 600 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {q.options.map((o, i) => {
          const st = picked === null ? null : i === q.correct ? "correct" : i === picked ? "wrong" : null;
          return <button key={i} onClick={() => pick(i)} style={optBtn(st, accent)}><span style={{ fontFamily: "monospace", opacity: .5, marginRight: 8 }}>{String.fromCharCode(65 + i)}</span>{o}</button>;
        })}
      </div>
      {picked !== null && (
        <>
          {q.explain && <div style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 13, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{q.explain}</div>}
          <button onClick={next} style={{ ...primaryBtn(accent), width: "100%", marginTop: 14 }}>{idx + 1 >= deck.length ? "See Results" : "Next →"}</button>
        </>
      )}
      <button onClick={onExit} style={{ ...ghostBtn, marginTop: 12, width: "100%" }}>Quit Game</button>
    </div>
  );
}

// ─── Layout wrapper (module-level so it never remounts on re-render) ──
function Wrap({ children, max = 600, notif }) {
  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#e8e6f0", fontFamily: "'DM Sans',sans-serif", paddingTop: 80 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1}}`}</style>
      {notif && <div style={{ position: "fixed", top: 90, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: notif.color, color: "#fff", padding: "10px 22px", borderRadius: 30, fontSize: 14, fontWeight: 600, boxShadow: "0 6px 20px rgba(0,0,0,.4)" }}>{notif.msg}</div>}
      <div style={{ maxWidth: max, margin: "0 auto", padding: "30px 20px", animation: "fadeIn .4s ease" }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════
export default function FinanceArena() {
  const [screen, setScreen] = useState("lobby"); // lobby | hub | game | board | hof
  const [domainId, setDomainId] = useState(null);
  const [playerName, setPlayerName] = useState(() => { try { return localStorage.getItem("arena-name") || ""; } catch { return ""; } });
  const [nameInput, setNameInput] = useState("");
  const [board, setBoard] = useState([]);
  const [allBoards, setAllBoards] = useState(null);
  const [game, setGame] = useState(null);
  const [notif, setNotif] = useState(null);
  const [hidden, setHidden] = useState({});
  const [admin, setAdmin] = useState(false);
  const [taps, setTaps] = useState(0);
  const [loading, setLoading] = useState(false);

  const domain = domainById(domainId);

  useEffect(() => { loadVisibility().then(setHidden); }, []);

  const showNotif = (msg, color = "#f97316") => { setNotif({ msg, color }); setTimeout(() => setNotif(null), 2600); };

  const enterDomain = async (id) => {
    setDomainId(id); setLoading(true);
    const b = await loadBoard(domainById(id).lbKey);
    setBoard(b); setLoading(false); setScreen("hub");
  };

  const playerXP = () => { const e = board.find(p => p.name.toLowerCase() === playerName.toLowerCase()); return e ? e.xp : 0; };

  const saveName = () => {
    const n = nameInput.trim();
    if (n.length < 2) { showNotif("Enter a name (2+ characters).", "#ef4444"); return; }
    setPlayerName(n); try { localStorage.setItem("arena-name", n); } catch {}
  };

  const handleScore = async (xp) => {
    const key = domain.lbKey;
    let nb = [...board];
    const i = nb.findIndex(p => p.name.toLowerCase() === playerName.toLowerCase());
    if (i >= 0) nb[i] = { ...nb[i], xp: nb[i].xp + xp, games: (nb[i].games || 0) + 1 };
    else nb.push({ name: playerName, xp, games: 1 });
    nb.sort((a, b) => b.xp - a.xp);
    nb = nb.slice(0, 200);
    setBoard(nb); await saveBoard(key, nb);
    setScreen("hub");
    showNotif(`+${xp} XP earned!`, domain.accent);
  };

  const openHallOfFame = async () => {
    setLoading(true);
    const results = await Promise.all(DOMAINS.map(d => loadBoard(d.lbKey).then(players => ({ d, players }))));
    const map = {};
    results.forEach(({ d, players }) => players.forEach(p => {
      const k = p.name.toLowerCase();
      if (!map[k]) map[k] = { name: p.name, xp: 0, domains: [] };
      map[k].xp += p.xp;
      if (!map[k].domains.includes(d.id)) map[k].domains.push(d.id);
    }));
    setAllBoards(Object.values(map).sort((a, b) => b.xp - a.xp).slice(0, 100));
    setLoading(false); setScreen("hof");
  };

  const tapTrigger = () => {
    const n = taps + 1; setTaps(n);
    if (n >= 5) { setTaps(0); const e = window.prompt("Admin passphrase:"); if (e === TRAINING_ADMIN_PASS) { setAdmin(true); showNotif("Admin mode on.", "#10b981"); } else if (e !== null) showNotif("Incorrect passphrase.", "#ef4444"); }
  };

  const removePlayer = async (name) => {
    if (!window.confirm(`Remove "${name}" from the ${domain.label} board?`)) return;
    const nb = board.filter(p => p.name !== name);
    setBoard(nb); await saveBoard(domain.lbKey, nb);
    showNotif(`Removed "${name}".`, "#10b981");
  };

  const visibleDomains = DOMAINS.filter(d => !hidden[`arena:${d.id}`]);

  // ─── LOBBY ──────────────────────────────────────────────────────
  if (screen === "lobby") {
    if (!playerName) {
      return (
        <Wrap notif={notif}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div onClick={tapTrigger} style={{ fontSize: 12, fontFamily: "monospace", color: admin ? "#10b981" : "#f97316", letterSpacing: 4, marginBottom: 8, userSelect: "none" }}>GAMIFIED FINANCE{admin ? " · ADMIN" : ""}</div>
            <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 60, letterSpacing: 4, margin: 0, lineHeight: .9 }}>FINANCE ARENA</h1>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "12px auto 0" }}>Test your finance knowledge across multiple domains, climb the ranks from Intern to CFO, and compete on the leaderboards.</p>
          </div>
          <div style={{ background: "#11111c", border: "1px solid #22222e", borderRadius: 14, padding: 24, maxWidth: 380, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#f97316", letterSpacing: 1, marginBottom: 12 }}>ENTER A NAME TO COMPETE</div>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && saveName()} placeholder="Your name or handle" maxLength={24}
              style={{ width: "100%", background: "#080810", border: "1px solid #2a2a3a", borderRadius: 10, padding: "13px 15px", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 12 }} />
            <button onClick={saveName} style={{ ...primaryBtn("#f97316"), width: "100%" }}>Enter Arena →</button>
            <div style={{ fontSize: 11, color: "#555", marginTop: 10, lineHeight: 1.5 }}>Your name is shown on public leaderboards. Pick something you're happy to be seen.</div>
          </div>
        </Wrap>
      );
    }
    return (
      <Wrap notif={notif} max={720}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div onClick={tapTrigger} style={{ fontSize: 12, fontFamily: "monospace", color: admin ? "#10b981" : "#f97316", letterSpacing: 4, marginBottom: 8, userSelect: "none" }}>WELCOME, {playerName.toUpperCase()}{admin ? " · ADMIN" : ""}</div>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 52, letterSpacing: 4, margin: 0, lineHeight: .9 }}>CHOOSE YOUR ARENA</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 10 }}>Each arena has its own questions and leaderboard. Your XP across all of them adds up in the Hall of Fame.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {visibleDomains.map(d => (
            <button key={d.id} onClick={() => enterDomain(d.id)} style={{ background: "#11111c", border: `1px solid ${d.accent}33`, borderRadius: 16, padding: 22, cursor: "pointer", textAlign: "left", transition: "all .2s", display: "flex", flexDirection: "column", minHeight: 200 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = d.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = d.accent + "33"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{d.icon}</div>
              <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, letterSpacing: 1, color: d.accent, lineHeight: 1 }}>{d.label}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, flex: 1 }}>{d.tag}</div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#555", marginTop: 10 }}>{d.pool.length} QUESTIONS · ENTER →</div>
            </button>
          ))}
        </div>
        {visibleDomains.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 30 }}>No arenas are currently available.</div>}
        <button onClick={openHallOfFame} style={{ width: "100%", marginTop: 16, background: "linear-gradient(135deg,#1a1207,#11111c)", border: "1px solid #f59e0b44", borderRadius: 14, padding: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>🏆</span>
          <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, letterSpacing: 2, color: "#f59e0b" }}>HALL OF FAME — ALL DOMAINS COMBINED</span>
        </button>
        <button onClick={() => { setPlayerName(""); setNameInput(""); try { localStorage.removeItem("arena-name"); } catch {} }} style={{ display: "block", margin: "16px auto 0", background: "none", border: "none", color: "#555", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>change name</button>
      </Wrap>
    );
  }

  // ─── HUB ────────────────────────────────────────────────────────
  if (screen === "hub" && domain) {
    if (loading) return <Wrap notif={notif}><div style={{ textAlign: "center", padding: 50, color: "#555", fontFamily: "monospace" }}>Loading {domain.label} arena…</div></Wrap>;
    const xp = playerXP();
    const rank = getRank(xp);
    const next = RANKS.find(r => r.min > xp);
    const pct = next ? Math.round(((xp - rank.min) / (next.min - rank.min)) * 100) : 100;
    const pos = board.findIndex(p => p.name.toLowerCase() === playerName.toLowerCase()) + 1;
    return (
      <Wrap notif={notif}>
        <button onClick={() => setScreen("lobby")} style={{ background: "#11111c", border: "1px solid #22222e", color: "#94a3b8", borderRadius: 8, padding: "7px 13px", fontSize: 11, cursor: "pointer", fontFamily: "monospace", marginBottom: 18 }}>← All Arenas</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>{domain.icon}</span>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 38, letterSpacing: 2, margin: 0, color: domain.accent }}>{domain.label} ARENA</h1>
        </div>

        <div style={{ background: "#11111c", border: `1px solid ${domain.accent}33`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 30 }}>{rank.icon}</span>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, letterSpacing: 1, color: rank.color }}>{rank.name}</div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>{xp.toLocaleString()} XP{pos > 0 ? ` · #${pos} here` : ""}</div>
              </div>
            </div>
            {next && <div style={{ textAlign: "right", fontSize: 10, fontFamily: "monospace", color: "#555" }}>NEXT: {next.name}<br />{(next.min - xp).toLocaleString()} XP TO GO</div>}
          </div>
          <div style={{ height: 6, background: "#1e1e2a", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: rank.color, transition: "width .5s" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {GAMES.map(g => (
            <button key={g.id} onClick={() => { setGame(g.id); setScreen("game"); }} style={{ background: "#11111c", border: `1px solid ${g.color}33`, borderRadius: 12, padding: 16, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = g.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = g.color + "33"}>
              <span style={{ fontSize: 26 }}>{g.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 19, letterSpacing: 1, color: "#fff" }}>{g.title}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>{g.desc}</div>
              </div>
              <span style={{ color: g.color, fontSize: 18 }}>▸</span>
            </button>
          ))}
        </div>

        <LeaderboardPanel board={board} accent={domain.accent} title={`${domain.label} LEADERBOARD`} playerName={playerName} admin={admin} onTap={tapTrigger} onRemove={removePlayer} limit={8} />
        <button onClick={openHallOfFame} style={{ ...ghostBtn, width: "100%", marginTop: 12 }}>🏆 View Hall of Fame</button>
      </Wrap>
    );
  }

  // ─── GAME ───────────────────────────────────────────────────────
  if (screen === "game" && domain) {
    const props = { pool: domain.pool, accent: domain.accent, onScore: handleScore, onExit: () => setScreen("hub") };
    return (
      <Wrap notif={notif}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: domain.accent, letterSpacing: 2, marginBottom: 16 }}>{domain.label.toUpperCase()} · {GAMES.find(g => g.id === game)?.title.toUpperCase()}</div>
        {game === "speed" && <SpeedRound {...props} />}
        {game === "streak" && <StreakBlitz {...props} />}
        {game === "gauntlet" && <Gauntlet {...props} />}
      </Wrap>
    );
  }

  // ─── HALL OF FAME ───────────────────────────────────────────────
  if (screen === "hof") {
    if (loading || !allBoards) return <Wrap notif={notif}><div style={{ textAlign: "center", padding: 50, color: "#555", fontFamily: "monospace" }}>Tallying all domains…</div></Wrap>;
    return (
      <Wrap notif={notif}>
        <button onClick={() => setScreen("lobby")} style={{ background: "#11111c", border: "1px solid #22222e", color: "#94a3b8", borderRadius: 8, padding: "7px 13px", fontSize: 11, cursor: "pointer", fontFamily: "monospace", marginBottom: 18 }}>← All Arenas</button>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 40 }}>🏆</div>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 44, letterSpacing: 3, margin: 0, color: "#f59e0b" }}>HALL OF FAME</h1>
          <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 6 }}>Total XP across every arena. Dots show which domains each player has competed in.</p>
        </div>
        <div style={{ background: "#11111c", border: "1px solid #f59e0b33", borderRadius: 14, padding: 16 }}>
          {allBoards.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 20 }}>No scores yet. Be the first!</div>}
          {allBoards.map((p, i) => {
            const me = p.name.toLowerCase() === playerName.toLowerCase();
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderBottom: i < allBoards.length - 1 ? "1px solid #1c1c28" : "none", background: me ? "rgba(245,158,11,0.06)" : "transparent", borderRadius: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 20, width: 30, color: i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7f32" : "#555" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: me ? "#f59e0b" : "#e8e6f0", fontWeight: me ? 700 : 500 }}>{p.name}{me ? " (you)" : ""}</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                    {DOMAINS.map(d => <span key={d.id} title={d.label} style={{ width: 8, height: 8, borderRadius: "50%", background: p.domains.includes(d.id) ? d.accent : "#22222e" }} />)}
                  </div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 20, color: getRank(p.xp).color }}>{p.xp.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </Wrap>
    );
  }

  return <Wrap notif={notif}><div style={{ textAlign: "center", padding: 50 }}><button onClick={() => setScreen("lobby")} style={primaryBtn("#f97316")}>Back to Arenas</button></div></Wrap>;
}

// ─── Leaderboard panel ────────────────────────────────────────────
function LeaderboardPanel({ board, accent, title, playerName, admin, onTap, onRemove, limit = 8 }) {
  const shown = board.slice(0, limit);
  return (
    <div style={{ background: "#11111c", border: `1px solid ${accent}22`, borderRadius: 14, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 18, letterSpacing: 1, color: accent }}>{title}</div>
        <div onClick={onTap} style={{ fontSize: 10, color: admin ? "#10b981" : "#555", fontFamily: "monospace", userSelect: "none", cursor: "default" }}>{board.length} RANKED{admin ? " · ADMIN" : ""}</div>
      </div>
      {shown.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 16, fontSize: 13 }}>No scores yet — play a game to get on the board!</div>}
      {shown.map((p, i) => {
        const me = p.name.toLowerCase() === playerName.toLowerCase();
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px", borderBottom: i < shown.length - 1 ? "1px solid #1c1c28" : "none", background: me ? `${accent}10` : "transparent", borderRadius: 6 }}>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 17, width: 26, color: i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7f32" : "#555" }}>{i + 1}</div>
            <div style={{ flex: 1, fontSize: 13, color: me ? accent : "#cbd5e1", fontWeight: me ? 700 : 500 }}>{p.name}{me ? " (you)" : ""}</div>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 17, color: getRank(p.xp).color }}>{p.xp.toLocaleString()}</div>
            {admin && <button onClick={() => onRemove(p.name)} title="Remove" style={{ background: "transparent", border: "1px solid #ef444455", color: "#ef4444", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>✕</button>}
          </div>
        );
      })}
    </div>
  );
}
