// EVMS Finance Training — Deep Reference Content
// Comprehensive lesson content with FAR / CAS / appropriations law detail.
// Block types: heading, prose, terms, callout, table, example, list

export const LESSON_CONTENT = {
  // ════════════════════════════════════════════════════════════════
  concepts: {
    title: "EVMS for Finance",
    subtitle: "The measurement system behind every major defense program — and why finance owns its outputs",
    blocks: [
      { type: "heading", text: "What EVMS Actually Is" },
      { type: "prose", text: "Earned Value Management (EVM) is a disciplined methodology that integrates the technical scope, schedule, and cost of a program into a single measurement framework. An Earned Value Management System (EVMS) is the set of processes, tools, and controls a contractor uses to do this. On defense programs it is not optional — it is a contractual and regulatory requirement, and the financial outputs flow directly into revenue recognition, profitability, and the financial statements." },
      { type: "prose", text: "For a program finance analyst, EVMS is the engine room. Every Estimate at Completion you defend, every revenue figure you book under percentage-of-completion, and every variance you escalate traces back to the earned value data. Engineering executes the work; finance translates that execution into dollars and tells leadership what it means." },

      { type: "callout", variant: "reg", title: "The Governing Standard: EIA-748", body: "The national standard for EVMS is ANSI/EIA-748 (currently maintained by SAE International). It defines 32 guidelines organized into five process areas: (1) Organization, (2) Planning, Scheduling & Budgeting, (3) Accounting Considerations, (4) Analysis & Management Reports, and (5) Revisions & Data Maintenance. A contractor's system must be compliant with all 32 guidelines to be validated." },

      { type: "heading", text: "When EVMS Is Required" },
      { type: "prose", text: "The DoD imposes EVMS through DFARS 252.234-7001 (Notice of EVMS) and 252.234-7002 (Earned Value Management System). Applicability is tied to contract dollar value and type:" },
      { type: "table", headers: ["Contract Value", "Requirement"], rows: [
        ["≥ $20M", "EVMS compliant with EIA-748 (32 guidelines) is required"],
        ["≥ $100M", "EVMS must be formally validated/accepted by the cognizant agency (DCMA)"],
        ["< $20M", "EVMS application is a risk-based decision by the program office"],
      ]},
      { type: "callout", variant: "insight", title: "Why the thresholds matter to finance", body: "On a validated program, the integrity of your EVMS data is subject to DCMA surveillance. A system deficiency (a Corrective Action Request, or CAR) can jeopardize billings and draw intense scrutiny. Finance often leads or supports the corrective action response — which is exactly the kind of cross-functional financial governance work that defines the role." },

      { type: "heading", text: "The Architecture: WBS, OBS, and Control Accounts" },
      { type: "prose", text: "EVMS is built on a structured decomposition of the work. Understanding this hierarchy is essential because it's where budget, responsibility, and cost collection all intersect." },
      { type: "terms", items: [
        { abbr: "WBS", full: "Work Breakdown Structure", desc: "A product-oriented hierarchical decomposition of the total scope. For defense, MIL-STD-881 prescribes standard WBS templates by commodity (aircraft, missile, ship systems, etc.)." },
        { abbr: "OBS", full: "Organizational Breakdown Structure", desc: "The hierarchy of who is responsible for performing the work — the organizational mirror of the WBS." },
        { abbr: "CA", full: "Control Account", desc: "The intersection of a WBS element and an OBS element. This is the fundamental management control point where budget, actual cost, and earned value are measured. Each CA has a single Control Account Manager (CAM)." },
        { abbr: "WP / PP", full: "Work Package / Planning Package", desc: "Within a control account, near-term work is detail-planned into Work Packages; far-term work is held in Planning Packages until it can be detailed (rolling wave planning)." },
      ]},
      { type: "callout", variant: "reg", title: "The Control Account is the unit of measure", body: "Per EIA-748, the control account is where cost, schedule, and technical scope converge. The CAM is accountable for performance. Finance partners with CAMs to analyze variances and build EACs — but the data integrity starts at the CA level." },

      { type: "heading", text: "The Performance Measurement Baseline" },
      { type: "prose", text: "The Performance Measurement Baseline (PMB) is the time-phased budget plan against which performance is measured. It is the sum of all control account budgets plus any undistributed budget — but it specifically excludes Management Reserve." },
      { type: "example", title: "How the budget rolls up", intro: "The total contract budget breaks down as follows:", steps: [
        "Contract Budget Base (CBB) = Total allocated budget for the contract scope",
        "CBB = Performance Measurement Baseline (PMB) + Management Reserve (MR)",
        "PMB = Distributed Budget (all control accounts) + Undistributed Budget (UB)",
        "Each Control Account = sum of its Work Packages + Planning Packages",
      ], result: "MR sits outside the PMB — it is budget for in-scope unknowns held by the PM. This is why earning into MR or using it to mask overruns is a serious EVMS integrity violation." },

      { type: "heading", text: "The Three Core Values" },
      { type: "prose", text: "Every analysis starts with three measurements taken at a point in time. Master the vocabulary — both the traditional ACWP/BCWP/BCWS terms and the modern PV/EV/AC terms are used interchangeably in industry." },
      { type: "terms", items: [
        { abbr: "BCWS / PV", full: "Budgeted Cost of Work Scheduled (Planned Value)", desc: "The time-phased budget — the dollar value of work planned to be completed by the status date. The cumulative BCWS curve is your baseline 'S-curve.'" },
        { abbr: "BCWP / EV", full: "Budgeted Cost of Work Performed (Earned Value)", desc: "The budgeted value of work actually completed. Claimed using objective earned value techniques (milestones, percent-complete, units complete, apportioned effort, or level-of-effort)." },
        { abbr: "ACWP / AC", full: "Actual Cost of Work Performed (Actual Cost)", desc: "The actual cost incurred for the completed work, drawn from the accounting system. Must be collected at the control account level per EIA-748 accounting guidelines." },
      ]},
      { type: "callout", variant: "warning", title: "Common mistake: claiming EV to match AC", body: "Earned value must be claimed based on actual physical progress using a pre-defined technique — never reverse-engineered to match the actual cost. Doing so destroys the entire purpose of the system and is a reportable integrity issue." },

      { type: "heading", text: "Earned Value Techniques (EVTs)" },
      { type: "prose", text: "How you claim BCWP depends on the nature of the work. Choosing the right technique is an EVMS design decision with real financial consequences for how smoothly performance is reported." },
      { type: "table", headers: ["Technique", "Best For", "How EV Is Claimed"], rows: [
        ["0/100", "Short-duration discrete tasks", "0% until complete, then 100%"],
        ["50/50", "Short work packages spanning 2 periods", "50% at start, 50% at completion"],
        ["Milestone (weighted)", "Discrete work with measurable milestones", "Pre-assigned value as each milestone completes"],
        ["Percent Complete", "Longer discrete tasks", "CAM's objective % estimate each period"],
        ["Units Complete", "Repetitive/production work", "EV per unit × units completed"],
        ["Apportioned Effort", "Work tied to a discrete base (e.g., QA)", "Proportional to its base activity's EV"],
        ["Level of Effort (LOE)", "Support work with no measurable output", "EV = PV automatically (no schedule variance)"],
      ]},
      { type: "callout", variant: "warning", title: "Watch your LOE", body: "Level-of-Effort work always earns its planned value, so it never shows a schedule variance and can mask true performance if overused. Excessive LOE is a classic EVMS surveillance finding. Finance should scrutinize the LOE percentage in the baseline." },

      { type: "heading", text: "From Earned Value to the Financial Statements" },
      { type: "prose", text: "This is the bridge that makes EVMS a finance discipline, not just a PM tool. Under ASC 606 (Revenue from Contracts with Customers), most long-term defense contracts recognize revenue over time, and the most common measure of progress is an input method — typically cost-to-cost (cost incurred to date ÷ total estimated cost)." },
      { type: "example", title: "Earned value drives revenue", intro: "Consider a $100M firm-fixed-price contract, EAC of $90M total cost, with $45M of cost incurred to date:", steps: [
        "Percent complete (cost-to-cost) = $45M ÷ $90M = 50%",
        "Revenue recognized to date = 50% × $100M contract value = $50M",
        "Estimated gross profit = $100M − $90M = $10M; recognized to date = 50% × $10M = $5M",
      ], result: "The EAC you build from EVMS data directly determines the percent complete, which directly determines revenue and profit. A deteriorating EAC doesn't just signal a program problem — it forces a revenue and profit re-measurement." },
      { type: "callout", variant: "reg", title: "Loss recognition is immediate", body: "Under ASC 606 / ASC 605-35 (loss provisions), if your EAC indicates the contract will be unprofitable, the entire estimated loss must be recognized immediately — not spread over the remaining performance period. This is why a finance analyst's EAC discipline directly protects the integrity of the income statement." },

      { type: "heading", text: "The Bottom Line for Finance" },
      { type: "prose", text: "EVMS gives you an objective, auditable measure of how a program is performing against its plan — and that measure is the input to your forecast, your revenue, and your profitability analysis. When you can read the data fluently, you stop being a scorekeeper and become the person who sees financial risk before it hits the statements." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  funding: {
    title: "Funding, Budget & Cost",
    subtitle: "Appropriations law, the color of money, and why a program can be on-budget and still run dry",
    blocks: [
      { type: "heading", text: "Three Words People Confuse" },
      { type: "prose", text: "Budget, funding, and cost are three distinct concepts, and conflating them is the fastest way to mismanage a program's finances. Budget is a performance measure. Funding is a legal authorization to spend. Cost is what you've actually incurred. You can have a great budget position and still be unable to spend a dollar because you have no funding on contract." },
      { type: "terms", items: [
        { abbr: "BUDGET", full: "Performance Measurement Baseline", desc: "The time-phased plan of what the work should cost (the sum of all BCWS). It answers: am I earning value efficiently? It is an internal performance yardstick." },
        { abbr: "FUNDING", full: "Appropriated & Obligated Dollars", desc: "The dollars Congress appropriated and the government obligated on the contract. It answers: am I legally authorized to spend, and how much room is left?" },
        { abbr: "COST", full: "Actual Cost Incurred (ACWP)", desc: "Real dollars expended. Compared to budget it gives CPI; compared to funding it tells you how close you are to a funding wall." },
      ]},

      { type: "heading", text: "The Foundation: Appropriations Law" },
      { type: "prose", text: "Federal money is governed by appropriations law, built on three fundamental tests that every obligation must pass — often summarized as Purpose, Time, and Amount. Finance is the guardian of these rules on a program." },
      { type: "terms", items: [
        { abbr: "PURPOSE", full: "The Purpose Statute — 31 U.S.C. § 1301(a)", desc: "Appropriations may be used only for the purposes for which they were appropriated. Using RDT&E money for procurement work violates this." },
        { abbr: "TIME", full: "The Bona Fide Needs Rule — 31 U.S.C. § 1502(a)", desc: "Funds may only be obligated to meet a legitimate need arising in the period of availability of the appropriation. You can't use this year's money for next year's need (with narrow exceptions)." },
        { abbr: "AMOUNT", full: "The Anti-Deficiency Act — 31 U.S.C. § 1341", desc: "You may not obligate or expend in excess of (or in advance of) available appropriations. ADA violations are serious — they carry administrative and even criminal penalties and must be formally reported." },
      ]},
      { type: "callout", variant: "warning", title: "The Anti-Deficiency Act is not theoretical", body: "ADA violations must be reported to the President, Congress, and the Comptroller General. For a contractor, causing the government to violate the ADA — for instance by performing unfunded work and expecting payment — creates serious problems. This is why the Limitation of Funds clause exists." },

      { type: "heading", text: "The Color of Money" },
      { type: "prose", text: "Appropriations come in 'colors,' each with a specific purpose and a specific period of availability (the window during which the funds can be newly obligated). Mixing colors improperly is a Purpose Statute violation." },
      { type: "table", headers: ["Appropriation", "Common Code", "Availability", "Funds"], rows: [
        ["RDT&E", "3600", "2 years", "Development, prototyping, test & evaluation"],
        ["Procurement (e.g., Aircraft)", "3010", "3 years", "Production and procurement of end items"],
        ["Operations & Maintenance", "3400", "1 year", "Sustainment, services, day-to-day operations"],
        ["Shipbuilding (SCN)", "1611", "5 years", "Ship construction"],
        ["Military Construction", "—", "5 years", "Facilities and infrastructure"],
      ]},
      { type: "callout", variant: "insight", title: "Why development vs. production matters", body: "A program transitioning from EMD (Engineering & Manufacturing Development, funded by RDT&E) to production (funded by Procurement) is a color-of-money inflection point. Finance must ensure work is charged to the correct appropriation as the program crosses that line — a frequent audit focus." },

      { type: "heading", text: "The Life Cycle of an Appropriation" },
      { type: "prose", text: "Money doesn't just appear and disappear — it moves through defined phases, and what you can do with it changes at each phase." },
      { type: "terms", items: [
        { abbr: "CURRENT", full: "Period of Availability", desc: "The appropriation can be obligated for new requirements (e.g., a 2-year RDT&E appropriation during its 2 fiscal years)." },
        { abbr: "EXPIRED", full: "5 Years After Availability Ends", desc: "No new obligations allowed, but the funds remain available to liquidate (pay) and adjust valid obligations made during the current period. The account retains its 'color' and fiscal-year identity." },
        { abbr: "CANCELLED", full: "After the 5-Year Expired Period", desc: "The account is closed and funds are returned to Treasury. They are permanently unavailable — even valid prior obligations can no longer be paid from them (must use current-year funds within limits)." },
      ]},

      { type: "heading", text: "The Funding Pipeline" },
      { type: "prose", text: "Within a contract, money flows through stages from authorization to outlay. Tracking the gaps between these stages is core finance work." },
      { type: "terms", items: [
        { abbr: "COMMITMENT", full: "Administrative Reservation", desc: "An internal reservation of funds in anticipation of an obligation. Not yet a legal liability." },
        { abbr: "OBLIGATION", full: "Legal Liability Created", desc: "A definite commitment (signing the contract or a mod) that creates a legal liability for the government to pay. This is the figure that matters most for managing to funding." },
        { abbr: "EXPENDITURE", full: "Cost Incurred", desc: "Goods/services received and cost incurred — the ACWP. The contractor performs and incurs cost against obligated funds." },
        { abbr: "OUTLAY", full: "Cash Disbursed", desc: "The government actually pays the invoice. The final stage." },
      ]},
      { type: "callout", variant: "reg", title: "Full Funding vs. Incremental Funding", body: "DoD policy generally requires procurement to be 'fully funded' — the entire cost of a usable end item is funded in the year of the buy (so you don't field half an aircraft). RDT&E and services, by contrast, are commonly incrementally funded — obligated in increments over time, governed by the Limitation of Funds clause (FAR 52.232-22) on cost-type contracts and Limitation of Cost (FAR 52.232-20) on fully-funded cost contracts." },

      { type: "heading", text: "Managing to Funding: The Funding Wall" },
      { type: "prose", text: "On an incrementally-funded contract, the single most important thing finance tracks is the relationship between cumulative expenditures and obligated funding. When expenditures approach the obligated amount, work must stop unless more funding is placed on contract — regardless of how efficient the program is." },
      { type: "example", title: "The on-budget, out-of-funding trap", intro: "A program is performing well: CPI = 1.08 (8% under budget). But:", steps: [
        "Obligated funding on contract: $50M",
        "Cumulative expenditures (ACWP): $48M",
        "Remaining work to complete: ~$4M of effort, 6 months left",
        "Funding remaining: $50M − $48M = only $2M",
      ], result: "Despite excellent cost efficiency, the program will hit a funding wall in roughly 3 months. The CPI is irrelevant to this problem. Finance must initiate a funding action now — and under the Limitation of Funds clause, the contractor is not obligated to continue work beyond the funded amount and must formally notify the government as funds deplete (typically at 75%/85% notification points)." },
      { type: "callout", variant: "insight", title: "The LOF notification is a finance trigger", body: "FAR 52.232-22 requires the contractor to notify the government in writing when expended/obligated costs will reach a specified percentage of funding (commonly 75%, with an estimate of additional funds needed). Missing this notification can mean performing work at risk of non-payment. Finance owns the tracking that drives this notification." },

      { type: "heading", text: "Reprogramming" },
      { type: "prose", text: "Sometimes funds need to move between purposes. Reprogramming moves funds within an appropriation; transfers move between appropriations and require specific statutory authority. Both have dollar thresholds above which Congressional notification or approval is required (below-threshold reprogramming, or BTR, can be done with less oversight). Finance supports these actions with the analysis that justifies them." },
      { type: "callout", variant: "warning", title: "The bottom line", body: "A program's financial health has two independent dimensions: efficiency (am I getting value for my spend — CPI) and liquidity (do I have funding to keep going). A strong CPI never rescues a funding shortfall. Track both, always." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  contracts: {
    title: "Contract Types & Fee",
    subtitle: "FAR Part 16 contract structures, risk allocation, and how profit actually gets earned",
    blocks: [
      { type: "heading", text: "Why Contract Type Drives Everything" },
      { type: "prose", text: "Before you analyze a single dollar of variance, you must know the contract type. It determines who bears cost risk, how profit is earned, how revenue is recognized, and how you forecast. The exact same $5M cost overrun is a margin catastrophe on one contract type and a near non-event on another. FAR Part 16 governs the selection and structure of contract types." },
      { type: "callout", variant: "reg", title: "FAR 16.103 — Selecting Contract Type", body: "The objective is to negotiate a contract type and price (or estimated cost and fee) that places a reasonable degree of cost responsibility on the contractor. As uncertainty about performance costs decreases, the preference shifts toward fixed-price. Early development = cost-type; mature production = fixed-price. The contract type reflects where the program sits on the risk curve." },

      { type: "heading", text: "The Risk Spectrum" },
      { type: "prose", text: "Contract types exist on a continuum of cost risk. At one end, the contractor bears all of it; at the other, the government does. Where a contract sits determines the entire financial management posture." },
      { type: "table", headers: ["Type", "FAR Cite", "Cost Risk Bearer", "Fee Mechanism"], rows: [
        ["FFP — Firm Fixed Price", "16.202", "Contractor (100%)", "Embedded in price (Price − Cost = Profit)"],
        ["FPIF — Fixed Price Incentive (Firm)", "16.204 / 16.403", "Shared to PTA, then contractor", "Target profit adjusted by share ratio"],
        ["FPEPA — FP w/ Economic Price Adj.", "16.203", "Contractor, w/ adjustment for named risks", "Embedded, adjustable for cost indices"],
        ["CPIF — Cost Plus Incentive Fee", "16.405-1", "Government (shared via ratio)", "Fee flexes with cost vs. target"],
        ["CPAF — Cost Plus Award Fee", "16.405-2", "Government", "Base fee + subjective award fee"],
        ["CPFF — Cost Plus Fixed Fee", "16.306", "Government (100%)", "Fixed dollar fee, invariant to cost"],
        ["T&M / LH", "16.601", "Mostly government", "Profit embedded in fixed labor rates"],
      ]},

      { type: "heading", text: "Firm-Fixed-Price (FFP)" },
      { type: "prose", text: "The contractor agrees to deliver for a fixed price. If costs run over, the contractor absorbs every dollar; if they come in under, the contractor keeps every dollar. This is maximum risk and maximum reward. On FFP, your CPI translates almost directly into margin movement — there is no government backstop." },
      { type: "example", title: "FFP profit is dollar-for-dollar", intro: "A $100M FFP contract negotiated with $90M target cost (implied $10M profit):", steps: [
        "If actual cost = $90M → profit = $10M (10% margin), as planned",
        "If actual cost = $95M → profit = $5M — the $5M overrun came straight out of margin",
        "If actual cost = $85M → profit = $15M — the $5M underrun is pure additional profit",
      ], result: "On FFP, every dollar of cost variance is a dollar of profit variance. This is why an FFP overrun trending toward the contract value is a five-alarm fire for finance — and why loss recognition rules bite hardest here." },

      { type: "heading", text: "Fixed-Price-Incentive-Firm (FPIF)" },
      { type: "prose", text: "FPIF softens FFP's risk by sharing cost overruns and underruns between government and contractor — up to a point. It's defined by a target cost, target profit, ceiling price, and a share ratio. The most important concept finance must master here is the Point of Total Assumption." },
      { type: "terms", items: [
        { abbr: "Target Cost", full: "Negotiated expected cost", desc: "The baseline cost estimate both parties agree to." },
        { abbr: "Target Profit", full: "Profit at target cost", desc: "The profit earned if actual cost equals target cost." },
        { abbr: "Ceiling Price", full: "Maximum the government pays", desc: "The absolute cap. Beyond this, the contractor bears 100% of additional cost." },
        { abbr: "Share Ratio", full: "e.g., 80/20", desc: "How over/underruns are split (government share / contractor share) between target and the ceiling." },
      ]},
      { type: "example", title: "The Point of Total Assumption (PTA)", intro: "The PTA is the cost at which the contractor begins bearing 100% of further cost. Formula:", steps: [
        "PTA = Target Cost + (Ceiling Price − Target Price) ÷ Government Share Ratio",
        "Example: Target Cost $100M, Target Profit $10M (Target Price $110M), Ceiling Price $120M, 80/20 share",
        "PTA = $100M + ($120M − $110M) ÷ 0.80 = $100M + $12.5M = $112.5M",
      ], result: "Once actual cost reaches $112.5M, the contractor absorbs every additional dollar — the contract effectively behaves like FFP beyond the PTA. Finance watches the EAC against the PTA closely: crossing it changes the entire risk profile of the program." },

      { type: "heading", text: "Cost-Reimbursement Contracts" },
      { type: "prose", text: "On cost-type contracts (CPFF, CPIF, CPAF), the government reimburses the contractor's allowable costs and pays a fee. The cost risk sits largely with the government — but this comes with heavy compliance obligations." },
      { type: "callout", variant: "reg", title: "FAR 31 — Allowable, Allocable, Reasonable", body: "On cost-reimbursement contracts, costs are only reimbursed if they are allowable (not prohibited by FAR Part 31), allocable (benefit the contract), and reasonable (what a prudent businessperson would pay). FAR 16.301-3 also requires the contractor to have an adequate accounting system capable of accumulating costs — a prerequisite that finance and DCAA care deeply about." },
      { type: "terms", items: [
        { abbr: "CPFF", full: "Cost Plus Fixed Fee", desc: "Reimbursed cost + a fixed dollar fee. The fee does NOT change with actual cost. An overrun shrinks the effective fee percentage but not the fee dollars. Lowest contractor risk, lowest fee." },
        { abbr: "CPIF", full: "Cost Plus Incentive Fee", desc: "Reimbursed cost + a fee that flexes with cost performance against a target, via a share ratio, between a minimum and maximum fee. Rewards cost control." },
        { abbr: "CPAF", full: "Cost Plus Award Fee", desc: "Reimbursed cost + a (usually small) base fee + an award fee pool earned through periodic subjective government evaluation against criteria in an Award Fee Plan." },
      ]},

      { type: "heading", text: "Time-and-Materials (T&M)" },
      { type: "prose", text: "T&M pays fixed hourly labor rates (which include the contractor's wrap of overhead, G&A, and profit) plus materials at cost. It's used when the scope can't be estimated with confidence — common in services and sustainment. FAR 16.601 calls it the least preferred contract type because the contractor has limited cost-control incentive. For finance, profitability hinges on the spread between the negotiated billing rates and the actual loaded cost of labor." },

      { type: "heading", text: "How Fee & Profit Actually Get Determined" },
      { type: "prose", text: "Profit isn't arbitrary — for negotiated contracts the government uses a structured approach. Finance must understand both how fee is set and how it's earned over the life of the contract." },
      { type: "callout", variant: "reg", title: "DFARS 215.404-71 — Weighted Guidelines", body: "DoD uses the Weighted Guidelines method to develop a structured profit objective, assigning values for performance risk, contract type risk, working capital, and facilities investment (cost efficiency factor). This is how the government builds its profit position going into negotiation — knowing it helps finance anticipate the achievable margin." },
      { type: "table", headers: ["Fee Type", "How It's Earned", "Forecasting Difficulty"], rows: [
        ["Fixed Fee (CPFF)", "Booked proportional to % complete", "Low — fee dollars are known"],
        ["Incentive Fee (CPIF/FPIF)", "Flexes with cost vs. target via share ratio", "Medium — depends on EAC vs. target"],
        ["Award Fee (CPAF)", "Subjective periodic government scoring", "High — finance estimates expected award %"],
        ["FFP Margin", "Price − Cost; every cost dollar saved is profit", "Directly tied to EAC accuracy"],
      ]},

      { type: "heading", text: "Two More Regulatory Anchors" },
      { type: "terms", items: [
        { abbr: "TINA / Truthful Data", full: "Truthful Cost or Pricing Data (formerly TINA) — 10 U.S.C. § 3702", desc: "For negotiated contracts above the threshold (currently $2M), contractors must submit certified cost or pricing data. Defective pricing can lead to government recovery. A major compliance consideration in pricing and negotiation." },
        { abbr: "CAS", full: "Cost Accounting Standards — 48 CFR 9904", desc: "CAS-covered contracts require consistent, disclosed cost accounting practices (via a Disclosure Statement for full CAS coverage). Changing a practice can trigger a cost-impact analysis. CAS governs how costs are measured, assigned, and allocated — the bedrock of cost-type contract accounting." },
      ]},

      { type: "heading", text: "The Finance Takeaway" },
      { type: "prose", text: "Contract type is the lens through which every other number must be read. The same variance, the same EAC movement, the same funding position means something completely different on FFP versus CPFF. Before you react to any program data, anchor on the contract type — it tells you who owns the risk and how the dollars will flow to the bottom line." },
    ],
  },
};
