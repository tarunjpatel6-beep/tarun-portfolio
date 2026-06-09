import { useState } from "react";

// ─── AI Coach ─────────────────────────────────────────────────────
const callAI = async (prompt, systemPrompt) => {
  try {
    const res = await fetch("/.netlify/functions/ai-proxy", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, systemPrompt }),
    });
    const data = await res.json();
    return data.text || "";
  } catch { return ""; }
};

const num = (v) => parseFloat(String(v).replace(/[$,%\s]/g, ""));

// ═══════════════════════════════════════════════════════════════════
// CAPSTONE RUNNER — drives a staged real-world scenario
// props: scenario, theme (T), onExit, singleStageIndex (optional, for modular mode)
// ═══════════════════════════════════════════════════════════════════
export default function CapstoneRunner({ scenario, theme: T, onExit, singleStageIndex = null }) {
  const isModular = singleStageIndex !== null;
  const [stageIdx, setStageIdx] = useState(isModular ? singleStageIndex : 0);
  const [responses, setResponses] = useState({}); // taskId -> { value, checked, correct }
  const [revealed, setRevealed] = useState({}); // taskId -> bool
  const [aiFeedback, setAiFeedback] = useState({}); // taskId -> text
  const [aiLoading, setAiLoading] = useState({});
  const [stageComplete, setStageComplete] = useState({});
  const [debrief, setDebrief] = useState(null);
  const [debriefLoading, setDebriefLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const stage = scenario.stages[stageIdx];
  const isLastStage = stageIdx + 1 >= scenario.stages.length;

  const setResp = (taskId, value) => setResponses(r => ({ ...r, [taskId]: { ...r[taskId], value } }));

  const checkCalc = (task) => {
    const val = num(responses[task.id]?.value);
    const correct = !isNaN(val) && Math.abs(val - task.answer) <= (task.tolerance ?? Math.abs(task.answer * 0.02));
    setResponses(r => ({ ...r, [task.id]: { ...r[task.id], checked: true, correct } }));
  };
  const checkMC = (task, i) => {
    setResponses(r => ({ ...r, [task.id]: { value: i, checked: true, correct: i === task.correct } }));
  };
  const coachWritten = async (task) => {
    const text = responses[task.id]?.value;
    if (!text?.trim()) return;
    setAiLoading(l => ({ ...l, [task.id]: true }));
    const ai = await callAI(
      `${scenario.aiContext}\n\nStage: ${stage.title}\nTask: ${task.prompt}\n\nThe analyst wrote:\n"${text}"\n\n${task.aiPrompt || "Evaluate their response."}`,
      task.aiSystem || "You are a senior finance leader coaching an analyst. Give concise, constructive feedback in 3-4 sentences: what's strong, what's missing, and one concrete improvement. Be direct and specific."
    );
    setAiFeedback(f => ({ ...f, [task.id]: ai }));
    setAiLoading(l => ({ ...l, [task.id]: false }));
  };

  const allTasksAddressed = stage.tasks.every(t => {
    const r = responses[t.id];
    if (t.type === "written") return (r?.value?.trim() || revealed[t.id]);
    return r?.checked || revealed[t.id];
  });

  const completeStage = () => {
    setStageComplete(s => ({ ...s, [stage.id]: true }));
    if (isModular || isLastStage) { runDebrief(); }
    else { setStageIdx(i => i + 1); }
  };

  const runDebrief = async () => {
    setFinished(true);
    setDebriefLoading(true);
    // Tally calc/mc performance
    const checkable = scenario.stages.flatMap(s => s.tasks).filter(t => t.type === "calc" || t.type === "mc");
    const correct = checkable.filter(t => responses[t.id]?.correct).length;
    const writtenSummary = scenario.stages.flatMap(s => s.tasks).filter(t => t.type === "written")
      .map(t => `Q: ${t.prompt}\nA: ${responses[t.id]?.value || "(skipped)"}`).join("\n\n");
    const ai = await callAI(
      `${scenario.aiContext}\n\nThe analyst completed ${isModular ? "a stage of" : "the full"} capstone "${scenario.title}". Quantitative score: ${correct}/${checkable.length} calculations/decisions correct.\n\nTheir written analysis across the case:\n${writtenSummary}`,
      "You are a senior finance executive delivering a final performance debrief on an analyst's capstone project. In about 5-6 sentences: (1) give an overall assessment and a letter grade (A-F), (2) highlight the strongest part of their work, (3) name the most important area to develop, (4) close with one piece of career-relevant advice. Be encouraging but honest, like a mentor who wants them to grow."
    );
    setDebrief({ text: ai, score: correct, total: checkable.length });
    setDebriefLoading(false);
  };

  // ─── FINISHED / DEBRIEF SCREEN ──────────────────────────────────
  if (finished) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "30px 20px", background: T.accentGlow, border: `1px solid ${T.accent}44`, borderRadius: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
          <div style={{ fontFamily: T.display, fontSize: 30, color: T.accent, letterSpacing: 2 }}>CAPSTONE COMPLETE</div>
          {debrief && <div style={{ fontFamily: T.display, fontSize: 44, color: T.text, margin: "6px 0" }}>{debrief.score}/{debrief.total}</div>}
          <div style={{ fontSize: 12, fontFamily: T.mono, color: T.textDim }}>QUANTITATIVE TASKS CORRECT</div>
        </div>
        {debriefLoading && <div style={{ textAlign: "center", padding: 20, color: T.textDim, fontFamily: T.mono, fontSize: 13 }}>🤖 Senior executive preparing your debrief...</div>}
        {debrief?.text && (
          <div style={{ background: T.accentGlow, border: `1px solid ${T.accent}33`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 10 }}>🤖 EXECUTIVE DEBRIEF</div>
            <div style={{ fontSize: 14, color: T.textDim, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{debrief.text}</div>
          </div>
        )}
        <button onClick={onExit} style={btn(T.accent, true, T)}>← Back to Capstones</button>
      </div>
    );
  }

  // ─── STAGE VIEW ─────────────────────────────────────────────────
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1 }}>
          {isModular ? "MODULAR STAGE" : `STAGE ${stageIdx + 1} OF ${scenario.stages.length}`}
        </div>
        <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted }}>{stage.moduleLabel}</div>
      </div>
      {!isModular && (
        <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
          {scenario.stages.map((s, i) => (
            <div key={s.id} style={{ flex: 1, height: 4, borderRadius: 2, background: i < stageIdx ? T.accent : i === stageIdx ? T.accent : T.border, opacity: i <= stageIdx ? 1 : 0.4 }} />
          ))}
        </div>
      )}

      <h2 style={{ fontFamily: T.display, fontSize: 28, letterSpacing: 1.5, color: T.text, marginBottom: 8 }}>{stage.title}</h2>
      <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7, marginBottom: 18 }}>{stage.brief}</p>

      {/* Data panel */}
      {stage.data && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
          {stage.dataTitle && <div style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, letterSpacing: 1, marginBottom: 12 }}>{stage.dataTitle}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {stage.data.map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", background: T.bg, borderRadius: 8, padding: "10px 12px" }}>
                <span style={{ fontSize: 12, color: T.textDim }}>{d.label}</span>
                <span style={{ fontSize: 13, color: T.text, fontWeight: 600, fontFamily: T.mono }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {stage.tasks.map((task, ti) => (
          <div key={task.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, background: T.accentGlow, borderRadius: 6, padding: "3px 8px", height: "fit-content", flexShrink: 0 }}>
                {task.type === "calc" ? "CALC" : task.type === "mc" ? "DECISION" : "ANALYSIS"}
              </span>
              <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>{task.prompt}</div>
            </div>

            {task.formula && <div style={{ fontSize: 11, fontFamily: T.mono, color: T.textMuted, marginBottom: 10, paddingLeft: 4 }}>Formula: {task.formula}</div>}

            {/* CALC */}
            {task.type === "calc" && (
              <div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={responses[task.id]?.value || ""} onChange={e => setResp(task.id, e.target.value)}
                    disabled={responses[task.id]?.checked} placeholder={task.placeholder || "Enter value"}
                    style={{ flex: 1, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "11px 13px", color: T.text, fontSize: 14, fontFamily: T.mono, outline: "none", boxSizing: "border-box" }} />
                  {!responses[task.id]?.checked && <button onClick={() => checkCalc(task)} style={btn(T.accent, true, T, true)}>Check</button>}
                </div>
                {responses[task.id]?.checked && (
                  <div style={{ marginTop: 10, padding: 12, borderRadius: 8, background: responses[task.id].correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${responses[task.id].correct ? T.green : T.red}44` }}>
                    <div style={{ fontSize: 13, color: responses[task.id].correct ? T.green : T.red, fontWeight: 600, marginBottom: 4 }}>
                      {responses[task.id].correct ? "✓ Correct" : `✗ Not quite — answer: ${task.display || task.answer}`}
                    </div>
                    {task.explain && <div style={{ fontSize: 12, color: T.textDim, lineHeight: 1.6 }}>{task.explain}</div>}
                  </div>
                )}
              </div>
            )}

            {/* MC */}
            {task.type === "mc" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {task.options.map((opt, i) => {
                  let bg = "transparent", bdr = T.border, col = T.textDim;
                  const r = responses[task.id];
                  if (r?.checked) {
                    if (i === task.correct) { bg = "rgba(16,185,129,0.12)"; bdr = T.green; col = T.green; }
                    else if (i === r.value) { bg = "rgba(239,68,68,0.12)"; bdr = T.red; col = T.red; }
                  }
                  return (
                    <button key={i} onClick={() => !r?.checked && checkMC(task, i)}
                      style={{ background: bg, border: `1px solid ${bdr}`, color: col, borderRadius: 8, padding: "11px 14px", textAlign: "left", fontSize: 13, cursor: r?.checked ? "default" : "pointer", lineHeight: 1.5 }}>
                      <span style={{ fontFamily: T.mono, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                    </button>
                  );
                })}
                {responses[task.id]?.checked && task.explain && (
                  <div style={{ marginTop: 4, padding: 12, borderRadius: 8, background: T.bg }}>
                    <div style={{ fontSize: 12, color: T.textDim, lineHeight: 1.6 }}>{task.explain}</div>
                  </div>
                )}
              </div>
            )}

            {/* WRITTEN */}
            {task.type === "written" && (
              <div>
                {task.guidance && <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8, lineHeight: 1.5 }}>{task.guidance}</div>}
                <textarea value={responses[task.id]?.value || ""} onChange={e => setResp(task.id, e.target.value)}
                  rows={5} placeholder="Write your analysis..."
                  style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 13, color: T.text, fontSize: 14, lineHeight: 1.7, fontFamily: T.font, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={() => coachWritten(task)} disabled={!responses[task.id]?.value?.trim() || aiLoading[task.id]} style={btn(T.accent, false, T, true)}>
                    {aiLoading[task.id] ? "Coaching..." : "🤖 Get AI Coaching"}
                  </button>
                  {!revealed[task.id] && <button onClick={() => setRevealed(r => ({ ...r, [task.id]: true }))} style={btn(T.textMuted, false, T, true)}>Reveal Model Answer</button>}
                </div>
                {aiFeedback[task.id] && (
                  <div style={{ marginTop: 10, background: T.accentGlow, border: `1px solid ${T.accent}33`, borderRadius: 8, padding: 13 }}>
                    <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, marginBottom: 6 }}>🤖 AI COACH</div>
                    <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiFeedback[task.id]}</div>
                  </div>
                )}
                {revealed[task.id] && task.modelAnswer && (
                  <div style={{ marginTop: 10, background: "rgba(16,185,129,0.06)", border: `1px solid ${T.green}33`, borderRadius: 8, padding: 13 }}>
                    <div style={{ fontSize: 10, fontFamily: T.mono, color: T.green, marginBottom: 6 }}>✓ MODEL ANSWER</div>
                    <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.7 }}>{task.modelAnswer}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stage nav */}
      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <button onClick={onExit} style={btn(T.textMuted, false, T)}>Exit</button>
        <button onClick={completeStage} disabled={!allTasksAddressed} style={btn(T.accent, true, T)}>
          {isModular ? "Finish & Get Debrief" : isLastStage ? "Complete Capstone →" : "Next Stage →"}
        </button>
      </div>
      {!allTasksAddressed && <div style={{ fontSize: 11, color: T.textMuted, textAlign: "center", marginTop: 8 }}>Address each task (check answers or reveal) to continue.</div>}
    </div>
  );
}

const btn = (color, primary, T, small) => ({
  background: primary ? color : "transparent", color: primary ? "#fff" : color,
  border: primary ? "none" : `1px solid ${color}`, borderRadius: small ? 8 : 10,
  padding: small ? "9px 14px" : "13px", fontFamily: small ? T.mono : T.display,
  fontSize: small ? 12 : 16, letterSpacing: small ? 0.5 : 2, cursor: "pointer",
  transition: "all 0.2s", flex: primary && !small ? 1 : "none", whiteSpace: "nowrap",
});
