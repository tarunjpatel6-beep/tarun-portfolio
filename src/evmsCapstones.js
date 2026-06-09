// EVMS Capstone Scenarios — real-world defense program cases
// Each stage maps to a module/level so it works as a full case or modular per-level.

export const EVMS_CAPSTONES = [
  {
    id: "raptor",
    title: "Raptor II Avionics Modernization",
    org: "Advanced Combat Systems Division",
    tag: "CPIF · Development · Incrementally Funded",
    summary: "You're the program finance analyst on a cost-plus-incentive-fee avionics development program. It's mid-execution and the numbers are starting to slip. Work the full cycle: read the contract, measure performance, build the EAC, assess funding, and brief leadership.",
    aiContext: "Context: Raptor II Avionics Modernization is a CPIF development program. Target Cost $200M, Target Fee $16M (8%), 80/20 share ratio (govt/contractor), min fee $8M, max fee $24M. Funded with RDT&E (3600) appropriations, incrementally funded with $150M obligated to date. Current status: BCWS $125M, BCWP $110M, ACWP $122M (so CPI 0.90, SPI 0.88, CV -$12M, SV -$15M). Cumulative-CPI EAC ≈ $221.8M, VAC ≈ -$21.8M. Only $28M of obligated funding remains against ~$100M cost-to-complete.",
    stages: [
      {
        id: "setup", moduleLabel: "Contracts · Funding", title: "Contract & Funding Setup",
        brief: "Before touching the performance data, ground yourself in the contract. The structure determines how risk and fee behave, and the appropriation determines what you're allowed to spend.",
        dataTitle: "CONTRACT FACTS",
        data: [
          { label: "Contract Type", value: "CPIF" },
          { label: "Target Cost", value: "$200M" },
          { label: "Target Fee", value: "$16M (8%)" },
          { label: "Share Ratio (Gov/Ctr)", value: "80 / 20" },
          { label: "Phase", value: "EMD (Development)" },
          { label: "Obligated Funding", value: "$150M" },
        ],
        tasks: [
          { id: "raptor-ct", type: "mc", prompt: "On this CPIF contract, who bears cost overrun risk between target cost and the point where fee bottoms out?", options: ["The contractor bears 100%", "It's shared between government and contractor via the 80/20 share ratio", "The government bears 100% with no contractor impact", "Risk only applies after delivery"], correct: 1, explain: "On CPIF, overruns/underruns are shared per the share ratio. Here, for each dollar over target cost, the government absorbs 80¢ and the contractor's fee drops by 20¢ — until the minimum fee floor is reached." },
          { id: "raptor-color", type: "mc", prompt: "This is engineering & manufacturing development work. Which appropriation (color of money) should fund it?", options: ["O&M (3400)", "Procurement (3010)", "RDT&E (3600)", "MILCON"], correct: 2, explain: "Development work is funded with RDT&E (3600) appropriations, which carry a 2-year period of availability. Using procurement money here would be a Purpose Statute violation." },
          { id: "raptor-share", type: "written", prompt: "Explain what the 80/20 share ratio means for the contractor's fee if the program overruns its target cost — and why that matters to you as the finance analyst.", guidance: "Connect the share mechanics to the fee forecast and profitability.", aiSystem: "You are a defense program finance director coaching an analyst on CPIF mechanics. In 3-4 sentences, assess whether they correctly explained the share ratio's effect on fee and its financial significance. Be specific and constructive.", modelAnswer: "Under the 80/20 share, every dollar of cost over target reduces the contractor's earned fee by 20 cents (the government covers 80 cents of the overrun), until fee hits the $8M minimum. As finance, this means an overrun erodes our fee/profit forecast in a predictable, quantifiable way — I'd revise the expected fee down as the EAC rises above target cost, and flag when we're approaching the minimum-fee floor where all further overrun is government-funded but yields us no additional fee." },
        ],
      },
      {
        id: "metrics", moduleLabel: "Performance Metrics", title: "Measure Performance",
        brief: "The latest cost data is in. Calculate the four core performance indicators. Enter dollar figures in $M (e.g., -12 for negative $12M).",
        dataTitle: "STATUS — CURRENT PERIOD",
        data: [
          { label: "BAC (= Target Cost)", value: "$200M" },
          { label: "BCWS (PV)", value: "$125M" },
          { label: "BCWP (EV)", value: "$110M" },
          { label: "ACWP (AC)", value: "$122M" },
        ],
        tasks: [
          { id: "raptor-cpi", type: "calc", prompt: "Calculate CPI.", formula: "CPI = BCWP / ACWP", answer: 0.90, tolerance: 0.02, placeholder: "e.g. 0.95", explain: "CPI = 110 / 122 = 0.90. Below 1.0 means cost overrun — we're earning $0.90 of value per dollar spent." },
          { id: "raptor-spi", type: "calc", prompt: "Calculate SPI.", formula: "SPI = BCWP / BCWS", answer: 0.88, tolerance: 0.02, placeholder: "e.g. 0.95", explain: "SPI = 110 / 125 = 0.88. Below 1.0 means behind schedule — less work accomplished than planned." },
          { id: "raptor-cv", type: "calc", prompt: "Calculate Cost Variance (CV) in $M.", formula: "CV = BCWP − ACWP", answer: -12, tolerance: 0.5, display: "-$12M", placeholder: "e.g. -12", explain: "CV = 110 − 122 = −$12M. Unfavorable — the work performed cost $12M more than its budgeted value." },
          { id: "raptor-sv", type: "calc", prompt: "Calculate Schedule Variance (SV) in $M.", formula: "SV = BCWP − BCWS", answer: -15, tolerance: 0.5, display: "-$15M", placeholder: "e.g. -15", explain: "SV = 110 − 125 = −$15M. Unfavorable — $15M of planned work hasn't been earned yet." },
        ],
      },
      {
        id: "eac", moduleLabel: "EAC · Funding", title: "Forecast & Funding Position",
        brief: "Now project where this program lands and check whether you can even fund it to completion. Enter $M.",
        dataTitle: "INPUTS",
        data: [
          { label: "BAC", value: "$200M" },
          { label: "CPI", value: "0.90" },
          { label: "ACWP to date", value: "$122M" },
          { label: "Obligated Funding", value: "$150M" },
        ],
        tasks: [
          { id: "raptor-eac", type: "calc", prompt: "Calculate the EAC using the cumulative CPI method, in $M.", formula: "EAC = BAC / CPI", answer: 221.8, tolerance: 4, display: "≈$222M", placeholder: "e.g. 222", explain: "EAC = 200 / 0.90 = ~$222M. If current cost efficiency holds, the program finishes ~$22M over the $200M target." },
          { id: "raptor-vac", type: "calc", prompt: "Calculate the Variance at Completion (VAC), in $M.", formula: "VAC = BAC − EAC", answer: -22, tolerance: 4, display: "≈-$22M", placeholder: "e.g. -22", explain: "VAC = 200 − 222 = ~−$22M projected overrun against target cost — which under the share ratio erodes fee and signals a profit adjustment." },
          { id: "raptor-fund", type: "calc", prompt: "How much obligated funding remains? ($M)", formula: "Obligated − ACWP", answer: 28, tolerance: 1, display: "$28M", placeholder: "e.g. 28", explain: "150 − 122 = $28M remaining. But cost-to-complete is roughly EAC − ACWP = 222 − 122 = ~$100M. You have $28M of funding for ~$100M of remaining work — a major funding shortfall." },
          { id: "raptor-fundwrite", type: "written", prompt: "Assess the funding position. What's the issue, and what action do you take?", guidance: "Compare funding remaining to cost-to-complete. Reference the incremental funding situation.", aiSystem: "You are a program finance director. In 3-4 sentences, assess whether the analyst correctly identified the funding gap (≈$28M funding vs ≈$100M cost-to-complete) and proposed an appropriate action (funding action / LOF notification). Be specific.", modelAnswer: "Although cost efficiency is the headline problem, the more urgent issue is funding: only ~$28M of obligated funding remains against ~$100M of cost-to-complete. The program will hit a funding wall long before completion. I'd initiate a funding action immediately to get additional RDT&E dollars on contract, and ensure we issue the Limitation of Funds notification (FAR 52.232-22) as we approach the funding threshold so we're not performing work at risk of non-payment." },
        ],
      },
      {
        id: "var", moduleLabel: "Variance Narrative", title: "Write the Variance Analysis",
        brief: "Document the variance for the program review — from the finance seat. Connect the operational variance to financial impact.",
        tasks: [
          { id: "raptor-var", type: "written", prompt: "Write a variance narrative for this control account. Cover root cause framing, financial impact (fee/margin, EAC), and what you're flagging.", guidance: "Write as if briefing the Finance Director. Address CV, SV, the EAC movement, the fee impact under the share ratio, and the funding concern.", aiSystem: "You are a senior defense program Finance Director reviewing a finance analyst's variance narrative. Score it out of 100 and give feedback in 4-5 sentences: what's strong, what's missing (a strong finance narrative ties the variance to fee/margin impact, EAC movement, and the funding gap), and a brief example of a stronger framing. Be constructive but demanding.", modelAnswer: "Sample: 'The control account is $12M over budget (CPI 0.90) and $15M behind schedule (SPI 0.88), driven by [root cause]. At current efficiency the cumulative-CPI EAC is ~$222M, a ~$22M overrun against the $200M target cost. Under the 80/20 share, this reduces earned fee by roughly $4.4M (20% of the overrun), pressuring program margin. Compounding this, only $28M of obligated funding remains against ~$100M cost-to-complete, so a funding action is required now. Recommend re-baselining the ETC, a funding action, and an EAC review board.'" },
        ],
      },
      {
        id: "brief", moduleLabel: "Executive Brief", title: "Brief Leadership",
        brief: "Final step: synthesize everything into a crisp recommendation for the VP of Finance. This is where analysis becomes decision.",
        tasks: [
          { id: "raptor-brief", type: "written", prompt: "Write your executive recommendation. In a few sentences, give leadership the situation, the financial impact, and your recommended actions in priority order.", guidance: "Lead with the headline. Be decisive. Prioritize the funding action vs. the cost/fee issues.", aiSystem: "You are the VP of Finance receiving an analyst's executive brief. In 4-5 sentences, evaluate whether it leads with the right headline, quantifies financial impact, and prioritizes actions correctly (the funding gap is the most time-sensitive). Coach them on executive communication. Be direct.", modelAnswer: "Sample: 'Raptor II is trending ~$22M over target cost (EAC ~$222M, CPI 0.90) and is behind schedule. The cost overrun reduces our earned fee by ~$4.4M under the share ratio. The most urgent issue is funding: $28M remains against ~$100M to complete — we will stop work without action. Recommend, in priority: (1) initiate an immediate funding action and issue the LOF notification; (2) convene an EAC review board to validate the forecast and corrective-action plan; (3) book the projected fee reduction in the financial forecast this cycle.'" },
        ],
      },
    ],
  },

  {
    id: "sentinel",
    title: "Sentinel Ground Station Production",
    org: "Integrated Systems Group",
    tag: "FFP · Production · Fully Funded",
    summary: "You support a firm-fixed-price production program. On FFP, every cost dollar is a profit dollar — and the trend is heading the wrong way. Work the case and quantify just how exposed the margin is.",
    aiContext: "Context: Sentinel Ground Station Production is an FFP contract. Contract price $80M, negotiated target cost $72M (implied profit $8M, 10% margin). Funded with Procurement (3010) appropriations, fully funded ($80M obligated). BAC = $72M. Current status: BCWS $40M, BCWP $38M, ACWP $42M (CPI 0.905, SPI 0.95, CV -$4M, SV -$2M). Cumulative-CPI EAC ≈ $79.6M, VAC ≈ -$7.6M. On FFP the price is fixed, so projected profit collapses from $8M to roughly $0.4M.",
    stages: [
      {
        id: "setup", moduleLabel: "Contracts · Funding", title: "Contract & Funding Setup",
        brief: "Anchor on the contract type — on FFP it changes everything about how you read a variance.",
        dataTitle: "CONTRACT FACTS",
        data: [
          { label: "Contract Type", value: "FFP" },
          { label: "Contract Price", value: "$80M" },
          { label: "Target Cost", value: "$72M" },
          { label: "Implied Profit", value: "$8M (10%)" },
          { label: "Phase", value: "Production" },
          { label: "Funding", value: "Fully funded ($80M)" },
        ],
        tasks: [
          { id: "sent-ct", type: "mc", prompt: "On this FFP contract, who bears the cost overrun risk?", options: ["The government bears 100%", "Shared 50/50", "The contractor bears 100% — every overrun dollar comes from profit", "No one until delivery"], correct: 2, explain: "On FFP, the price is locked at $80M. Margin = Price − Cost, so every dollar of overrun comes straight out of the contractor's $8M profit. Maximum risk, maximum reward." },
          { id: "sent-color", type: "mc", prompt: "This is production of end items. Which appropriation funds it?", options: ["RDT&E (3600)", "Procurement (3010)", "O&M (3400)", "It doesn't need funding — it's FFP"], correct: 1, explain: "Production/procurement of end items is funded with Procurement (3010) appropriations, 3-year availability, and per the full funding policy the whole unit cost is funded in the buy year." },
          { id: "sent-write", type: "written", prompt: "Explain why a cost overrun on this FFP contract is more financially dangerous than the same overrun would be on a cost-plus contract.", guidance: "Think about who absorbs the cost and what happens to profit.", aiSystem: "You are a program finance director. In 3-4 sentences assess whether the analyst correctly explained that FFP overruns hit profit dollar-for-dollar (vs. cost-plus where the government reimburses cost). Be specific.", modelAnswer: "On FFP, the price is fixed, so the contractor absorbs 100% of any overrun directly out of profit — a $4M overrun is a $4M profit hit. On a cost-plus contract, the government reimburses allowable costs and the fee is either fixed or only partially affected, so the same overrun barely dents (CPFF) or only shares (CPIF) the contractor's fee. That's why an FFP EAC approaching the contract price is a margin emergency — and can tip into a recognized loss." },
        ],
      },
      {
        id: "metrics", moduleLabel: "Performance Metrics", title: "Measure Performance",
        brief: "Compute the indicators. Enter $M (e.g., -4 for negative $4M).",
        dataTitle: "STATUS — CURRENT PERIOD",
        data: [
          { label: "BAC (= Target Cost)", value: "$72M" },
          { label: "BCWS (PV)", value: "$40M" },
          { label: "BCWP (EV)", value: "$38M" },
          { label: "ACWP (AC)", value: "$42M" },
        ],
        tasks: [
          { id: "sent-cpi", type: "calc", prompt: "Calculate CPI.", formula: "CPI = BCWP / ACWP", answer: 0.905, tolerance: 0.02, placeholder: "e.g. 0.95", explain: "CPI = 38 / 42 = 0.905. Over budget — and on FFP that directly compresses margin." },
          { id: "sent-spi", type: "calc", prompt: "Calculate SPI.", formula: "SPI = BCWP / BCWS", answer: 0.95, tolerance: 0.02, placeholder: "e.g. 0.95", explain: "SPI = 38 / 40 = 0.95. Modestly behind schedule." },
          { id: "sent-cv", type: "calc", prompt: "Calculate Cost Variance (CV), $M.", formula: "CV = BCWP − ACWP", answer: -4, tolerance: 0.5, display: "-$4M", placeholder: "e.g. -4", explain: "CV = 38 − 42 = −$4M. On FFP, that's a direct $4M hit to projected profit." },
          { id: "sent-sv", type: "calc", prompt: "Calculate Schedule Variance (SV), $M.", formula: "SV = BCWP − BCWS", answer: -2, tolerance: 0.5, display: "-$2M", placeholder: "e.g. -2", explain: "SV = 38 − 40 = −$2M. Slightly behind plan." },
        ],
      },
      {
        id: "eac", moduleLabel: "EAC · Profitability", title: "Forecast & Margin Impact",
        brief: "Project the cost at completion and translate it into the bottom line. Enter $M.",
        dataTitle: "INPUTS",
        data: [
          { label: "BAC (Target Cost)", value: "$72M" },
          { label: "CPI", value: "0.905" },
          { label: "Contract Price", value: "$80M" },
          { label: "Planned Profit", value: "$8M" },
        ],
        tasks: [
          { id: "sent-eac", type: "calc", prompt: "Calculate EAC (cumulative CPI method), $M.", formula: "EAC = BAC / CPI", answer: 79.6, tolerance: 1.5, display: "≈$79.6M", placeholder: "e.g. 79.6", explain: "EAC = 72 / 0.905 = ~$79.6M. The cost is projected to nearly consume the entire $80M contract price." },
          { id: "sent-profit", type: "calc", prompt: "At that EAC, what is the projected profit? ($M) — remember price is fixed at $80M.", formula: "Profit = Price − EAC", answer: 0.4, tolerance: 0.6, display: "≈$0.4M", placeholder: "e.g. 0.4", explain: "Profit = 80 − 79.6 = ~$0.4M, versus the planned $8M. The overrun has nearly wiped out the margin — a collapse from 10% to ~0.5%." },
          { id: "sent-margin", type: "written", prompt: "The projected profit fell from $8M to ~$0.4M. Explain what this means and what you'd watch for next.", guidance: "Think about loss recognition risk if the trend continues.", aiSystem: "You are a finance director. In 3-4 sentences, assess whether the analyst grasped the margin collapse and the loss-recognition risk (if EAC exceeds the $80M price, GAAP requires immediate recognition of the full estimated loss). Be specific.", modelAnswer: "The overrun has compressed projected margin from 10% to roughly 0.5% — the program is now barely profitable. The critical thing to watch is whether the EAC continues rising toward or past the $80M contract price: the moment the forecast shows a loss, GAAP (ASC 606 loss provisions) requires recognizing the entire estimated loss immediately, not spreading it. I'd tighten the EAC review cadence, pressure-test the ETC, and prepare leadership for a potential forward-loss booking." },
        ],
      },
      {
        id: "var", moduleLabel: "Variance Narrative", title: "Write the Variance Analysis",
        brief: "Document the variance with the FFP profit lens front and center.",
        tasks: [
          { id: "sent-var", type: "written", prompt: "Write the variance narrative. Emphasize the profit/margin impact unique to FFP and the loss-recognition risk.", guidance: "Brief the Finance Director: CV/SV, EAC, the margin collapse, and the loss-recognition trigger.", aiSystem: "You are a senior Finance Director. Score the narrative out of 100 and give 4-5 sentences of feedback: a strong FFP narrative quantifies the profit hit, flags the loss-recognition risk if EAC exceeds price, and recommends action. Be constructive but demanding.", modelAnswer: "Sample: 'Sentinel is $4M over budget (CPI 0.905) and modestly behind schedule. On this FFP contract the overrun hits profit dollar-for-dollar: the cumulative-CPI EAC of ~$79.6M cuts projected profit from $8M to ~$0.4M, collapsing margin from 10% to ~0.5%. The key risk is loss recognition — if the EAC crosses the $80M price, we must book the full estimated loss immediately. Recommend an urgent ETC re-estimate, a corrective-action plan on the cost drivers, and preparing leadership for a potential forward-loss provision.'" },
        ],
      },
      {
        id: "brief", moduleLabel: "Executive Brief", title: "Brief Leadership",
        brief: "Synthesize into a recommendation for the VP of Finance.",
        tasks: [
          { id: "sent-brief", type: "written", prompt: "Write your executive recommendation: situation, financial impact, and prioritized actions.", guidance: "Lead with the margin collapse and loss-recognition risk. Be decisive.", aiSystem: "You are the VP of Finance. In 4-5 sentences evaluate whether the brief leads with the margin/loss headline, quantifies impact, and prioritizes the right actions. Coach on executive communication.", modelAnswer: "Sample: 'Sentinel's cost overrun has collapsed projected profit from $8M to ~$0.4M (EAC ~$79.6M against an $80M fixed price). If the trend continues past $80M, we face an immediate forward-loss recognition. Recommend, in priority: (1) urgent ETC re-estimate and corrective-action plan on the cost drivers; (2) tighten EAC review cadence to monthly; (3) prepare a potential forward-loss provision and brief the controller now so there are no surprises at quarter close.'" },
        ],
      },
    ],
  },
];
