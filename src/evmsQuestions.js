// EVMS Question Banks — practice + graded exams
// Answer positions rotated A/B/C/D; distractor order shuffled.

export const QUESTION_BANKS = {
  "concepts": [
    {
      "q": "What is the primary reason a program finance analyst — not just the project manager — cares about EVMS data?",
      "options": [
        "It drives the financial forecast, revenue recognition, and contract profitability",
        "It's required for status meetings",
        "It replaces the general ledger",
        "It tracks engineering headcount"
      ],
      "correct": 0,
      "explain": "EVMS data is the foundation of the financial forecast, percentage-of-completion revenue, and profitability analysis. Finance owns the financial interpretation of the earned value data."
    },
    {
      "q": "BCWS represents:",
      "options": [
        "The contract ceiling",
        "The budgeted cost of work planned to be done by now",
        "What you actually spent",
        "The value of work completed"
      ],
      "correct": 1,
      "explain": "BCWS (Planned Value) is the time-phased budget — what was planned to be accomplished by the reporting date."
    },
    {
      "q": "BCWP is also known as:",
      "options": [
        "Actual Cost",
        "Planned Value",
        "Earned Value",
        "Budget at Completion"
      ],
      "correct": 2,
      "explain": "BCWP is Earned Value (EV) — the budgeted value of the work actually completed."
    },
    {
      "q": "Which value drives percentage-of-completion revenue recognition most directly?",
      "options": [
        "ACWP",
        "BCWS",
        "BAC",
        "BCWP"
      ],
      "correct": 3,
      "explain": "BCWP (earned value) measures the work actually performed, which is the basis for recognizing revenue under percentage-of-completion."
    },
    {
      "q": "If BCWP > ACWP, the contract is:",
      "options": [
        "Showing favorable cost performance (expanding margin)",
        "Behind schedule",
        "Over budget",
        "Out of funding"
      ],
      "correct": 0,
      "explain": "Earning more value than you've spent means favorable cost performance — margin is expanding. CPI > 1.0."
    },
    {
      "q": "A CPI of 0.875 means:",
      "options": [
        "You're ahead of schedule",
        "You're getting $0.875 of value for every $1.00 spent",
        "You're 87.5% complete",
        "The contract is 87.5% funded"
      ],
      "correct": 1,
      "explain": "CPI = BCWP/ACWP. 0.875 means for every dollar spent, you earned only $0.875 of budgeted value — a cost overrun condition."
    },
    {
      "q": "When BCWP < BCWS, what's the finance concern?",
      "options": [
        "The contract is overfunded",
        "Margin is expanding",
        "Revenue recognition may slip and funding burn needs review",
        "Nothing — this is ideal"
      ],
      "correct": 2,
      "explain": "Behind-schedule performance (negative SV) can delay revenue recognition and signals the funding burn rate needs review."
    },
    {
      "q": "Schedule Variance (SV) is calculated as:",
      "options": [
        "BCWP - ACWP",
        "BAC - EAC",
        "BCWS - ACWP",
        "BCWP - BCWS"
      ],
      "correct": 3,
      "explain": "SV = BCWP - BCWS (Earned Value minus Planned Value). Positive = ahead of schedule."
    },
    {
      "q": "Cost Variance (CV) is calculated as:",
      "options": [
        "BCWP - ACWP",
        "EAC - BAC",
        "BCWS - ACWP",
        "BCWP - BCWS"
      ],
      "correct": 0,
      "explain": "CV = BCWP - ACWP (Earned Value minus Actual Cost). Negative = over budget."
    },
    {
      "q": "A program shows SPI = 1.10 and CPI = 0.90. The best finance interpretation is:",
      "options": [
        "Healthy on both dimensions",
        "Ahead of schedule but over budget — possibly spending too fast to accelerate",
        "Behind schedule and under budget",
        "Data error — these can't coexist"
      ],
      "correct": 1,
      "explain": "SPI > 1 means ahead of schedule; CPI < 1 means over budget. This often signals the team is accelerating schedule by spending inefficiently — a margin risk worth investigating."
    },
    {
      "q": "Why is earned value measured in budgeted dollars rather than actual dollars?",
      "options": [
        "To inflate revenue",
        "So performance can be compared against the baseline objectively",
        "To match the general ledger",
        "Because actuals aren't available"
      ],
      "correct": 1,
      "explain": "Measuring earned value in budgeted dollars lets you compare what you accomplished against what you planned — an apples-to-apples performance measure independent of actual spend."
    },
    {
      "q": "The sum of all BCWS across the program equals:",
      "options": [
        "The contract ceiling",
        "Total actual cost",
        "The Performance Measurement Baseline (BAC)",
        "The EAC"
      ],
      "correct": 2,
      "explain": "The cumulative time-phased BCWS sums to the BAC — the Performance Measurement Baseline."
    },
    {
      "q": "Which scenario most likely triggers an EAC increase and profit adjustment?",
      "options": [
        "CPI = 1.10, SPI = 0.95",
        "CPI = 1.0, SPI = 1.0",
        "CPI = 1.05, SPI = 1.02",
        "CPI = 0.85, SPI = 0.88"
      ],
      "correct": 3,
      "explain": "Both metrics below 1.0 (over budget AND behind schedule) is the strongest signal that the EAC should rise and a profit adjustment may be needed."
    },
    {
      "q": "Management Reserve (MR) is:",
      "options": [
        "Budget held outside the PMB for in-scope unknowns, controlled by the PM",
        "Profit set aside for shareholders",
        "The same as contingency funding",
        "Part of the Performance Measurement Baseline"
      ],
      "correct": 0,
      "explain": "MR is budget held outside the PMB (but inside the contract budget base) for in-scope risk, controlled by the program manager — not part of any control account's BCWS."
    },
    {
      "q": "The 'BCWP' a CAM claims should be supported by:",
      "options": [
        "The PM's opinion",
        "An objective earned value technique (milestones, % complete, units)",
        "The funding profile",
        "The actual cost incurred"
      ],
      "correct": 1,
      "explain": "Earned value must be claimed via objective measurement methods, not by matching actual cost — that would mask true performance."
    },
    {
      "q": "If a finance analyst sees ACWP rising rapidly while BCWP stays flat, this indicates:",
      "options": [
        "Revenue is accelerating",
        "Strong cost performance",
        "Work is being paid for but value isn't being earned — efficiency problem",
        "The program is ahead of schedule"
      ],
      "correct": 2,
      "explain": "Spending without earning value is a classic efficiency red flag — costs are accumulating but the work isn't progressing proportionally."
    },
    {
      "q": "Why might a program with CPI = 1.0 still concern finance?",
      "options": [
        "CPI of 1.0 means failure",
        "It never would",
        "It indicates fraud",
        "CPI ignores funding constraints, schedule position, and EAC risk on remaining work"
      ],
      "correct": 3,
      "explain": "CPI = 1.0 means cost-efficient to date, but says nothing about funding adequacy, schedule, or risk in the remaining work — all of which finance must assess."
    },
    {
      "q": "The TCPI (To-Complete Performance Index) tells you:",
      "options": [
        "The cost efficiency required on remaining work to hit a target",
        "The schedule variance",
        "Past cost efficiency",
        "The contract fee"
      ],
      "correct": 0,
      "explain": "TCPI = (BAC - BCWP)/(BAC - ACWP) or to EAC. It tells you the efficiency needed on remaining work to meet the target — a forward-looking feasibility check."
    },
    {
      "q": "A finance analyst's variance narrative should primarily connect the variance to:",
      "options": [
        "The PM's calendar",
        "Financial impact: margin, revenue timing, EAC movement",
        "Engineering staffing",
        "The cafeteria budget"
      ],
      "correct": 1,
      "explain": "Finance narratives translate operational variances into financial consequences — margin, revenue recognition, and EAC/profit impact."
    },
    {
      "q": "Which best describes the relationship between EVMS and the financial statements?",
      "options": [
        "They are unrelated",
        "EVMS only matters for taxes",
        "EVMS earned value and EAC feed revenue recognition and profit booking that flow to the financials",
        "EVMS replaces the income statement"
      ],
      "correct": 2,
      "explain": "Earned value and EAC drive percentage-of-completion revenue and profit adjustments that ultimately roll into the financial statements."
    },
    {
      "q": "A negative cost variance on a Firm-Fixed-Price contract directly reduces:",
      "options": [
        "Government funding",
        "Earned value",
        "The contract ceiling",
        "Contractor profit/margin"
      ],
      "correct": 3,
      "explain": "On FFP, price is fixed, so any cost overrun (negative CV) comes straight out of contractor margin."
    },
    {
      "q": "The 'Estimate to Complete' (ETC) represents:",
      "options": [
        "The forecasted cost of the remaining work",
        "The total budget",
        "The fee earned",
        "What's already been spent"
      ],
      "correct": 0,
      "explain": "ETC is the forecast cost of work remaining. EAC = ACWP + ETC."
    }
  ],
  "funding": [
    {
      "q": "What's the key difference between budget and funding on a defense program?",
      "options": [
        "Budget is set by Congress",
        "Budget measures what work should cost; funding is the dollars authorized to actually spend",
        "Funding is always larger than budget",
        "They're identical"
      ],
      "correct": 1,
      "explain": "Budget (the PMB) measures performance; funding is the authorized money you can actually obligate and spend. You can be on-budget but out of funding."
    },
    {
      "q": "RDT&E appropriations (3600) typically fund:",
      "options": [
        "Production units",
        "Day-to-day operations",
        "Research, development, test, and evaluation work",
        "Military salaries"
      ],
      "correct": 2,
      "explain": "RDT&E (color 3600) funds development-phase work and has a 2-year period of availability."
    },
    {
      "q": "Procurement appropriations (3010) have a period of availability of:",
      "options": [
        "1 year",
        "2 years",
        "5 years",
        "3 years"
      ],
      "correct": 3,
      "explain": "Procurement funds (3010) are available for 3 years and fund production and procurement of units."
    },
    {
      "q": "O&M funds (3400) are characterized by:",
      "options": [
        "1-year availability, funding sustainment and operations",
        "No expiration",
        "5-year availability",
        "Funding only R&D"
      ],
      "correct": 0,
      "explain": "O&M (3400) is 1-year money funding operations, maintenance, and services — the shortest availability of the common colors."
    },
    {
      "q": "Spending RDT&E money on production work would be:",
      "options": [
        "A budget transfer",
        "A potential Anti-Deficiency Act / color-of-money violation",
        "Standard practice",
        "Encouraged for efficiency"
      ],
      "correct": 1,
      "explain": "Using the wrong color of money for the wrong purpose can violate appropriations law (ADA) — a serious compliance issue finance must prevent."
    },
    {
      "q": "On an incrementally-funded contract, the finance analyst must manage closely to:",
      "options": [
        "The contract ceiling only",
        "The overhead rate",
        "Obligated funding released in increments",
        "The fee pool"
      ],
      "correct": 2,
      "explain": "Incremental funding means dollars are placed on contract in increments; you manage expenditures against obligated funding to avoid stopping work."
    },
    {
      "q": "'Obligated' funds are best described as:",
      "options": [
        "Money spent",
        "The contract ceiling",
        "Forecasted cost",
        "Funding legally committed/placed on the contract"
      ],
      "correct": 3,
      "explain": "Obligation is the act of legally committing funds on the contract (via mods); it precedes expenditure."
    },
    {
      "q": "When expenditures approach obligated funding with work remaining, the analyst should:",
      "options": [
        "Initiate a funding action to get more on contract before work stops",
        "Stop tracking",
        "Lower the EAC",
        "Increase the fee"
      ],
      "correct": 0,
      "explain": "Approaching the obligated funding limit means a funding action is needed — otherwise work must stop regardless of budget status."
    },
    {
      "q": "A program with CPI = 1.08 but only $1M of obligated funding left for $4M of remaining work faces:",
      "options": [
        "A schedule problem only",
        "A funding shortfall despite excellent cost efficiency",
        "No problem — strong CPI",
        "An overfunding situation"
      ],
      "correct": 1,
      "explain": "CPI measures efficiency against budget, not funding. Strong CPI doesn't help if there's insufficient funding on contract to finish the work."
    },
    {
      "q": "The 'Limitation of Funds' clause (LOF) is relevant to which contract situation?",
      "options": [
        "Commercial item buys",
        "Grant agreements",
        "Cost-type incrementally funded contracts",
        "Firm-fixed-price fully funded"
      ],
      "correct": 2,
      "explain": "The LOF clause governs cost-type incrementally-funded contracts — the contractor isn't obligated to continue beyond funded amounts and must notify the government as funds deplete."
    },
    {
      "q": "Expired funds (past period of availability) can:",
      "options": [
        "Be converted to profit",
        "Never be used for anything",
        "Be freely reprogrammed",
        "Still liquidate valid prior-year obligations but not fund new ones"
      ],
      "correct": 3,
      "explain": "Expired funds can still pay (liquidate) obligations made during their availability period but cannot fund new requirements."
    },
    {
      "q": "Cancelled funds (typically 5 years after expiration) are:",
      "options": [
        "Gone entirely — no longer available for any purpose",
        "Converted to O&M",
        "The same as expired funds",
        "Available for new obligations"
      ],
      "correct": 0,
      "explain": "Once funds are cancelled they're permanently unavailable — even valid prior obligations can no longer be paid from them."
    },
    {
      "q": "The 'funding profile' on a program represents:",
      "options": [
        "The fee curve",
        "The time-phased plan of when funding will be available",
        "The overhead rate schedule",
        "The PM's resume"
      ],
      "correct": 1,
      "explain": "A funding profile is the time-phased expectation of funding availability — critical for planning spend rates and avoiding funding gaps."
    },
    {
      "q": "Why might finance recommend slowing burn rate even when CPI is strong?",
      "options": [
        "To reduce earned value",
        "To avoid earning too much revenue",
        "To stay within available funding until the next increment arrives",
        "To lower the fee"
      ],
      "correct": 2,
      "explain": "If the next funding increment is delayed, managing burn rate prevents hitting a funding wall — independent of cost efficiency."
    },
    {
      "q": "The 'color of money' concept primarily exists because:",
      "options": [
        "Contractors prefer it",
        "Of accounting aesthetics",
        "It simplifies billing",
        "Congress appropriates funds for specific purposes with specific time limits"
      ],
      "correct": 3,
      "explain": "Appropriations law requires funds be used for their appropriated purpose within their availability period — the basis of color-of-money rules."
    },
    {
      "q": "Authorized funding (contract ceiling) vs obligated funding — the difference is:",
      "options": [
        "Ceiling is the max allowed; obligated is what's actually been placed on contract",
        "Nothing",
        "Ceiling is the fee",
        "Obligated is always higher"
      ],
      "correct": 0,
      "explain": "The ceiling (NTE) is the legal maximum; obligated funds are what's actually committed on contract, which may be less on incrementally-funded efforts."
    },
    {
      "q": "A spending plan that exceeds the funding profile timeline signals:",
      "options": [
        "Strong performance",
        "A potential funding gap requiring a funding action or rephasing",
        "Lower costs",
        "Higher fee"
      ],
      "correct": 1,
      "explain": "If planned spend outpaces funding availability, you'll hit a gap — requiring either more funding sooner or a rephasing of work."
    },
    {
      "q": "Which is NOT a typical responsibility of program finance regarding funding?",
      "options": [
        "Initiating funding actions",
        "Forecasting when funding runs out",
        "Approving the appropriations bill in Congress",
        "Tracking obligations vs expenditures"
      ],
      "correct": 2,
      "explain": "Finance tracks and forecasts funding and initiates actions, but does not approve appropriations — that's Congress."
    },
    {
      "q": "An 'unfunded' but in-scope requirement on an incrementally-funded contract should be:",
      "options": [
        "Ignored",
        "Billed as profit",
        "Charged to overhead",
        "Flagged — work may need to pause until funding is placed"
      ],
      "correct": 3,
      "explain": "In-scope work without funding on contract can't proceed under LOF — finance flags the gap so funding can be secured."
    },
    {
      "q": "The relationship 'Authorized ≥ Obligated ≥ Expended' should generally hold because:",
      "options": [
        "You can't commit more than authorized, or spend more than committed",
        "It's arbitrary",
        "Expended is always highest",
        "Obligated equals fee"
      ],
      "correct": 0,
      "explain": "Logically you can't obligate beyond the ceiling, nor expend beyond what's been obligated — this hierarchy is a fundamental control."
    },
    {
      "q": "Why does finance track expenditure rate against funding even on a fully-funded FFP contract?",
      "options": [
        "To set the fee",
        "To manage cash flow and billing/progress payment timing",
        "FFP has no funding",
        "It's irrelevant on FFP"
      ],
      "correct": 1,
      "explain": "Even fully funded, expenditure timing affects cash flow, billing, and progress payments — finance manages the cash position, not just the budget."
    }
  ],
  "contracts": [
    {
      "q": "On a Firm-Fixed-Price (FFP) contract, who bears the cost overrun risk?",
      "options": [
        "Shared 50/50",
        "The government",
        "The contractor — entirely",
        "Neither"
      ],
      "correct": 2,
      "explain": "On FFP, the price is fixed, so the contractor absorbs 100% of cost overruns — and keeps 100% of underruns."
    },
    {
      "q": "On a Cost-Plus-Fixed-Fee (CPFF) contract, a cost overrun affects fee how?",
      "options": [
        "Fee increases",
        "Fee doubles",
        "Fee is eliminated",
        "Fee dollars stay fixed, but fee as a % of cost shrinks"
      ],
      "correct": 3,
      "explain": "The fee is a fixed dollar amount on CPFF — it doesn't change with cost, so an overrun lowers the effective fee percentage but not the fee dollars."
    },
    {
      "q": "A CPIF contract uses a share ratio (e.g., 80/20) to:",
      "options": [
        "Share cost overruns/underruns between government and contractor",
        "Allocate overhead",
        "Split equity",
        "Determine the schedule"
      ],
      "correct": 0,
      "explain": "The share ratio splits the difference between target cost and actual cost between government and contractor — incentivizing cost control."
    },
    {
      "q": "Which contract type generally carries the HIGHEST risk for the contractor?",
      "options": [
        "CPFF",
        "FFP",
        "Cost-reimbursable",
        "CPIF"
      ],
      "correct": 1,
      "explain": "FFP puts all cost risk on the contractor — the highest risk (and highest potential reward) structure."
    },
    {
      "q": "Time-and-Materials (T&M) contracts pay the contractor:",
      "options": [
        "Only for completed milestones",
        "Cost plus a percentage",
        "Fixed hourly labor rates plus materials at cost",
        "A fixed lump sum"
      ],
      "correct": 2,
      "explain": "T&M pays negotiated fixed hourly rates for labor plus materials at cost — common for services where scope is uncertain."
    },
    {
      "q": "A $5M cost overrun is MOST damaging to profit on which contract type?",
      "options": [
        "CPIF",
        "T&M",
        "CPFF",
        "FFP"
      ],
      "correct": 3,
      "explain": "On FFP, every overrun dollar reduces margin dollar-for-dollar since price is fixed. On cost-types, the impact is shared or limited."
    },
    {
      "q": "Award Fee is earned based on:",
      "options": [
        "Periodic subjective government evaluation of performance",
        "A fixed formula",
        "Cost underruns only",
        "The share ratio"
      ],
      "correct": 0,
      "explain": "Award fee is determined by the government's periodic subjective assessment against criteria — finance estimates the expected award fee percentage."
    },
    {
      "q": "On a CPIF contract, the 'point of total assumption' concept is most analogous to which FPIF feature?",
      "options": [
        "The fixed fee",
        "The share ratio reaching the ceiling where the contractor bears all further cost",
        "The award fee board",
        "The funding profile"
      ],
      "correct": 1,
      "explain": "In FPIF, the Point of Total Assumption is where the contractor begins absorbing 100% of further overruns — beyond the share line, similar in spirit to CPIF ceilings."
    },
    {
      "q": "For revenue recognition, FFP contracts typically use:",
      "options": [
        "Completed contract always",
        "Cash basis only",
        "Percentage-of-completion based on earned value/cost progress",
        "No revenue until delivery"
      ],
      "correct": 2,
      "explain": "FFP development contracts commonly recognize revenue via percentage-of-completion, tied to cost or earned value progress."
    },
    {
      "q": "Why does finance need to know contract type BEFORE reacting to a variance?",
      "options": [
        "To pick the color of money",
        "To set the schedule",
        "It doesn't matter",
        "The same overrun has totally different profit impact across types"
      ],
      "correct": 3,
      "explain": "A given overrun is a margin emergency on FFP but a manageable, shared, or fee-neutral event on cost-types — the response depends entirely on type."
    },
    {
      "q": "Cost-reimbursable contracts require the contractor to:",
      "options": [
        "Only incur allowable, allocable, reasonable costs per FAR",
        "Guarantee a fixed price",
        "Ignore cost controls",
        "Pay overruns from profit"
      ],
      "correct": 0,
      "explain": "On cost-type contracts, the government reimburses allowable, allocable, and reasonable costs — cost accounting compliance (FAR/CAS) is critical."
    },
    {
      "q": "An incentive fee contract with an 80/20 share ratio: if costs come in $1M under target, the contractor's fee increases by:",
      "options": [
        "$800K",
        "$200K",
        "$1M",
        "$0"
      ],
      "correct": 1,
      "explain": "With an 80/20 government/contractor share, a $1M underrun gives the contractor 20% = $200K additional fee."
    },
    {
      "q": "Which contract type best protects contractor margin when scope/requirements are highly uncertain?",
      "options": [
        "FFP with EPA",
        "FFP",
        "Cost-type (CPFF/CPIF)",
        "Fixed-price level-of-effort"
      ],
      "correct": 2,
      "explain": "When requirements are uncertain, cost-type contracts shift cost risk to the government, protecting the contractor from absorbing unknown overruns."
    },
    {
      "q": "On FFP, a cost underrun of $2M means:",
      "options": [
        "The government keeps it",
        "It's split via share ratio",
        "It reduces the fee",
        "The contractor keeps it as additional profit"
      ],
      "correct": 3,
      "explain": "On FFP the price is fixed, so a $2M underrun flows entirely to the contractor as additional profit."
    },
    {
      "q": "The fee on a CPFF contract is typically expressed as:",
      "options": [
        "A fixed dollar amount negotiated upfront",
        "An award board decision",
        "A percentage of actual cost",
        "A share of underruns"
      ],
      "correct": 0,
      "explain": "CPFF fee is a fixed negotiated dollar amount — it does not vary with actual cost incurred."
    },
    {
      "q": "From a finance forecasting view, which contract type makes profit hardest to predict?",
      "options": [
        "T&M",
        "Award-fee contracts (subjective scoring)",
        "FFP",
        "CPFF"
      ],
      "correct": 1,
      "explain": "Award-fee profit depends on subjective periodic government evaluations, making the earned fee — and thus profit — harder to forecast precisely."
    },
    {
      "q": "Under percentage-of-completion, if a contract becomes a forecasted loss, finance must:",
      "options": [
        "Defer the loss to delivery",
        "Ignore it until closeout",
        "Recognize the entire estimated loss immediately",
        "Spread it over remaining periods"
      ],
      "correct": 2,
      "explain": "GAAP requires recognizing the full estimated loss on a contract as soon as it's known — losses cannot be deferred."
    },
    {
      "q": "An FPIF (Fixed-Price-Incentive-Firm) contract differs from FFP by:",
      "options": [
        "Having no price",
        "Being cost-reimbursable",
        "Having no fee",
        "Including a target cost, target profit, ceiling price, and share ratio"
      ],
      "correct": 3,
      "explain": "FPIF blends fixed-price structure with incentives — a target cost/profit, a ceiling price, and a share ratio up to the point of total assumption."
    },
    {
      "q": "Why is labor rate management especially critical on T&M contracts?",
      "options": [
        "Profit depends on the spread between billed rates and actual labor cost",
        "It isn't",
        "Rates are set by the government",
        "T&M has no labor"
      ],
      "correct": 0,
      "explain": "On T&M, the contractor's margin comes from the difference between the fixed billing rates and the actual cost of labor — rate management drives profitability."
    },
    {
      "q": "When a finance analyst sees a deteriorating EAC on an FFP contract approaching the contract value, the urgent concern is:",
      "options": [
        "More fee",
        "The contract heading toward a loss position requiring immediate recognition",
        "Schedule acceleration",
        "Funding color"
      ],
      "correct": 1,
      "explain": "On FFP, if EAC approaches or exceeds contract value, the program is heading to a loss — which must be recognized immediately under GAAP."
    }
  ]
};

export const getQuestions = (moduleId, count) => {
  const bank = QUESTION_BANKS[moduleId] || [];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
};
