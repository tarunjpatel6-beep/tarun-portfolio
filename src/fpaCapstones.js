// FP&A Capstone Scenarios — real-world company cases
// Stages map to the 5 FP&A modules; run as full case or modular per-level.

export const FPA_CAPSTONES = [
  {
    id: "meridian",
    title: "Meridian Cloud",
    org: "B2B SaaS · ~$120M ARR",
    tag: "Subscription · High Growth",
    summary: "You're the FP&A analyst at a growing B2B software company. Walk the full cycle on one company: read the statements, build a driver-based forecast, run variance analysis on the quarter, assess the cash position, and make a capital allocation call.",
    aiContext: "Context: Meridian Cloud is a B2B SaaS company. Latest year: Revenue $120M, COGS $36M (70% gross margin), operating expenses $66M, operating income $18M, net income $13M, operating cash flow $28M, capex $4M, free cash flow $24M. SaaS bills annually upfront, creating deferred revenue (a working-capital cash tailwind). It's evaluating a $10M new product investment.",
    stages: [
      {
        id: "statements", moduleLabel: "Three Statements", title: "Read the Statements",
        brief: "Start by understanding the financial picture. Compute the key profitability and cash metrics, and reason about why cash differs from profit. Enter $ in $M, margins in %.",
        dataTitle: "LATEST FISCAL YEAR",
        data: [
          { label: "Revenue", value: "$120M" },
          { label: "COGS", value: "$36M" },
          { label: "Operating Expenses", value: "$66M" },
          { label: "Net Income", value: "$13M" },
          { label: "Operating Cash Flow", value: "$28M" },
          { label: "Capex", value: "$4M" },
        ],
        tasks: [
          { id: "mer-gm", type: "calc", prompt: "Calculate gross margin (%).", formula: "(Revenue − COGS) / Revenue", answer: 70, tolerance: 1, display: "70%", placeholder: "e.g. 70", explain: "Gross margin = (120 − 36) / 120 = 70%. High gross margins are characteristic of healthy SaaS." },
          { id: "mer-fcf", type: "calc", prompt: "Calculate free cash flow ($M).", formula: "Operating Cash Flow − Capex", answer: 24, tolerance: 1, display: "$24M", placeholder: "e.g. 24", explain: "FCF = 28 − 4 = $24M. Notably, FCF ($24M) exceeds net income ($13M) — typical of SaaS." },
          { id: "mer-cash", type: "mc", prompt: "Operating cash flow ($28M) exceeds net income ($13M). What's the most likely driver for a SaaS business?", options: ["The company is overstating profit", "Non-cash charges (D&A, stock-based comp) added back plus deferred revenue collected upfront", "It borrowed money", "An accounting error"], correct: 1, explain: "SaaS collects annual subscriptions upfront (deferred revenue — a cash inflow ahead of revenue recognition) and has large non-cash charges like stock-based comp. Both push operating cash flow above net income." },
        ],
      },
      {
        id: "budgeting", moduleLabel: "Budgeting & Forecasting", title: "Build the Forecast",
        brief: "Build next year's revenue forecast from operational drivers — not a flat growth rate.",
        dataTitle: "DRIVER INPUTS (NEXT YEAR)",
        data: [
          { label: "Beginning Customers", value: "10,000" },
          { label: "New Customers", value: "2,500" },
          { label: "Churned Customers", value: "800" },
          { label: "Avg Revenue / Customer", value: "$12,000/yr" },
        ],
        tasks: [
          { id: "mer-cust", type: "calc", prompt: "Calculate ending customer count.", formula: "Beginning + New − Churned", answer: 11700, tolerance: 50, display: "11,700", placeholder: "e.g. 11700", explain: "10,000 + 2,500 − 800 = 11,700 ending customers." },
          { id: "mer-rev", type: "calc", prompt: "Forecast next year's revenue ($M) using ending customers × ARPU.", formula: "Ending Customers × ARPU", answer: 140.4, tolerance: 2, display: "$140.4M", placeholder: "e.g. 140.4", explain: "11,700 × $12,000 = $140.4M. Building from drivers (customers, churn, ARPU) makes the forecast far more defensible and flexible than 'grow 17%.'" },
          { id: "mer-driver", type: "written", prompt: "Why is this driver-based approach better than forecasting 'revenue grows 17%'? Name one driver you'd want to flex in a downside scenario.", guidance: "Think about transparency and scenario flexibility.", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst understands the value of driver-based forecasting (transparency, scenario flexibility, links to operational reality) and named a sensible downside driver (e.g., higher churn, lower new-customer adds). Be specific.", modelAnswer: "A driver-based forecast exposes the assumptions behind the number — customer adds, churn, and ARPU — so leadership can see what has to be true and challenge it, rather than accepting an opaque 17%. It's also instantly flexible: for a downside case I'd flex the churn rate up (say from 800 to 1,400 churned) and reduce new-customer adds, then watch the revenue and cash impact ripple through. That turns the forecast from a static guess into a decision tool." },
        ],
      },
      {
        id: "variance", moduleLabel: "Variance & Performance", title: "Analyze the Quarter",
        brief: "Actuals are in. Decompose the revenue variance into price and volume effects. Enter $M (e.g., -8.4).",
        dataTitle: "PLAN vs. ACTUAL",
        data: [
          { label: "Plan: Customers", value: "11,700" },
          { label: "Plan: ARPU", value: "$12,000" },
          { label: "Actual: Customers", value: "11,000" },
          { label: "Actual: ARPU", value: "$13,000" },
        ],
        tasks: [
          { id: "mer-vol", type: "calc", prompt: "Calculate the volume variance ($M).", formula: "(Actual Units − Plan Units) × Plan Price", answer: -8.4, tolerance: 0.5, display: "-$8.4M", placeholder: "e.g. -8.4", explain: "(11,000 − 11,700) × $12,000 = −700 × 12,000 = −$8.4M. We acquired/retained fewer customers than planned." },
          { id: "mer-price", type: "calc", prompt: "Calculate the price variance ($M).", formula: "(Actual Price − Plan Price) × Actual Units", answer: 11, tolerance: 0.5, display: "+$11M", placeholder: "e.g. 11", explain: "($13,000 − $12,000) × 11,000 = $1,000 × 11,000 = +$11M. Higher ARPU more than offset the customer shortfall." },
          { id: "mer-pvm", type: "written", prompt: "Total revenue beat plan by $2.6M, yet customers missed. Interpret this for leadership — is it good news?", guidance: "A favorable total can hide a concerning driver mix.", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst sees that the favorable revenue is price-driven while volume (customers) missed — a potential churn/acquisition concern that price alone is masking. Be specific.", modelAnswer: "On the surface revenue beat by $2.6M, but the decomposition tells a more cautious story: the entire beat (and then some) came from a $11M favorable price/ARPU effect, while volume was $8.4M unfavorable — we have 700 fewer customers than planned. Price strength is masking a customer-acquisition or churn problem. I'd flag this to leadership as a quality-of-revenue concern: pricing power is real, but the shrinking customer base is a leading indicator of risk, and we can't raise price forever to compensate." },
        ],
      },
      {
        id: "workingcapital", moduleLabel: "Working Capital & Cash", title: "Assess the Cash Position",
        brief: "Evaluate how efficiently the business collects cash.",
        dataTitle: "BALANCE SHEET / FLOW DATA",
        data: [
          { label: "Accounts Receivable", value: "$18M" },
          { label: "Annual Revenue", value: "$143M" },
          { label: "Deferred Revenue", value: "$40M" },
          { label: "Free Cash Flow", value: "$24M" },
        ],
        tasks: [
          { id: "mer-dso", type: "calc", prompt: "Calculate Days Sales Outstanding (DSO), in days.", formula: "(AR / Revenue) × 365", answer: 46, tolerance: 3, display: "≈46 days", placeholder: "e.g. 46", explain: "(18 / 143) × 365 ≈ 46 days to collect. Reasonable; worth tracking the trend." },
          { id: "mer-defwrite", type: "written", prompt: "Meridian carries $40M of deferred revenue. Explain how that affects the cash position and why SaaS businesses are often cash-advantaged.", guidance: "Deferred revenue = cash collected before revenue is earned.", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst understands deferred revenue as upfront cash that funds operations (a negative-working-capital dynamic common to SaaS). Be specific.", modelAnswer: "Deferred revenue represents cash customers paid upfront for subscriptions not yet delivered — $40M of cash already in the bank ahead of recognition. This is effectively interest-free financing from customers: the business collects before it has to spend to deliver, which is why many SaaS companies run negative working capital and self-fund growth. It's a major reason Meridian's free cash flow ($24M) outpaces its net income ($13M), and it's a structural cash advantage I'd highlight to leadership." },
        ],
      },
      {
        id: "valuation", moduleLabel: "Valuation & Decisions", title: "Make the Capital Call",
        brief: "Leadership is weighing a $10M investment in a new product line. Run the NPV and make a recommendation. Discount rate 10%.",
        dataTitle: "PROJECT CASH FLOWS",
        data: [
          { label: "Upfront Investment", value: "$10M" },
          { label: "Year 1 Cash Flow", value: "$3M" },
          { label: "Year 2 Cash Flow", value: "$5M" },
          { label: "Year 3 Cash Flow", value: "$6M" },
          { label: "Discount Rate", value: "10%" },
        ],
        tasks: [
          { id: "mer-npv", type: "calc", prompt: "Calculate the NPV ($M). Discount each year at 10% and subtract the $10M investment.", formula: "Σ CFₜ/(1.1)ᵗ − 10", answer: 1.37, tolerance: 0.4, display: "≈$1.37M", placeholder: "e.g. 1.37", explain: "PV = 3/1.1 + 5/1.21 + 6/1.331 = 2.73 + 4.13 + 4.51 = $11.37M. NPV = 11.37 − 10 = +$1.37M." },
          { id: "mer-decide", type: "mc", prompt: "Based on the NPV, what's the decision?", options: ["Reject — it loses money", "Accept — positive NPV means it creates value above the 10% cost of capital", "Indifferent — NPV is zero", "Need IRR only to decide"], correct: 1, explain: "NPV is positive (+$1.37M), so the project returns more than the 10% hurdle and creates value. The decision rule: accept positive-NPV projects." },
          { id: "mer-rec", type: "written", prompt: "Write your recommendation to the CFO. Note the NPV, one risk to the assumptions, and one cost you should NOT include in the analysis.", guidance: "Think about sunk costs and sensitivity.", aiSystem: "You are the CFO. In 4-5 sentences evaluate whether the analyst recommended correctly (accept, +$1.37M NPV), flagged a sensible assumption risk, and correctly identified that sunk costs (e.g., prior R&D already spent) must be excluded. Coach on decisiveness.", modelAnswer: "Sample: 'Recommend proceeding — the project has a positive NPV of ~$1.37M at our 10% cost of capital, so it creates value. The NPV is modest, so it's sensitive to the cash-flow assumptions, particularly the Year 3 inflow; I'd stress-test a downside case before fully committing. Importantly, any R&D or market research already spent on this idea is a sunk cost and must be excluded from the decision — only the incremental future cash flows matter. Net: approve, but with a phased gate after Year 1 to confirm the ramp.'" },
        ],
      },
    ],
  },

  {
    id: "apex",
    title: "Apex Industrial",
    org: "Manufacturing · ~$200M Revenue",
    tag: "Hardware · Capital Intensive",
    summary: "You're the FP&A analyst at a hardware manufacturer — thin margins, heavy capex, and real working capital tied up in inventory. Work the full cycle and see how a capital-intensive business differs from software.",
    aiContext: "Context: Apex Industrial is a hardware manufacturer. Latest year: Revenue $200M, COGS $140M (30% gross margin), operating expenses $40M, operating income $20M, net income $13M, operating cash flow $18M, capex $12M, free cash flow $6M. It carries significant inventory ($35M) and is weighing a $15M automation investment. Capital-intensive with meaningful working capital tied up — the opposite cash profile of SaaS.",
    stages: [
      {
        id: "statements", moduleLabel: "Three Statements", title: "Read the Statements",
        brief: "Understand the profitability and cash profile of a capital-intensive manufacturer. Enter $ in $M, margins in %.",
        dataTitle: "LATEST FISCAL YEAR",
        data: [
          { label: "Revenue", value: "$200M" },
          { label: "COGS", value: "$140M" },
          { label: "Net Income", value: "$13M" },
          { label: "Operating Cash Flow", value: "$18M" },
          { label: "Capex", value: "$12M" },
          { label: "Inventory", value: "$35M" },
        ],
        tasks: [
          { id: "apex-gm", type: "calc", prompt: "Calculate gross margin (%).", formula: "(Revenue − COGS) / Revenue", answer: 30, tolerance: 1, display: "30%", placeholder: "e.g. 30", explain: "Gross margin = (200 − 140) / 200 = 30%. Far thinner than SaaS — typical of hardware manufacturing." },
          { id: "apex-fcf", type: "calc", prompt: "Calculate free cash flow ($M).", formula: "Operating Cash Flow − Capex", answer: 6, tolerance: 1, display: "$6M", placeholder: "e.g. 6", explain: "FCF = 18 − 12 = $6M. Heavy capex consumes most of operating cash flow — the capital-intensity drag." },
          { id: "apex-cash", type: "mc", prompt: "Net income is $13M but free cash flow is only $6M. What best explains the gap for a manufacturer?", options: ["Profit is overstated", "Heavy capex and cash tied up in inventory/receivables consume cash", "The company is hiding revenue", "Deferred revenue inflows"], correct: 1, explain: "Manufacturers sink cash into capex (equipment) and working capital (inventory and receivables). Unlike SaaS, there's no upfront customer cash — so FCF lands well below net income." },
        ],
      },
      {
        id: "budgeting", moduleLabel: "Budgeting & Forecasting", title: "Build the Forecast",
        brief: "Forecast revenue from unit and price drivers.",
        dataTitle: "DRIVER INPUTS (NEXT YEAR)",
        data: [
          { label: "Forecast Units", value: "540,000" },
          { label: "Forecast Price / Unit", value: "$410" },
          { label: "Current Units", value: "500,000" },
          { label: "Current Price", value: "$400" },
        ],
        tasks: [
          { id: "apex-rev", type: "calc", prompt: "Forecast next year's revenue ($M).", formula: "Units × Price", answer: 221.4, tolerance: 2, display: "$221.4M", placeholder: "e.g. 221.4", explain: "540,000 × $410 = $221.4M, up from $200M — a blend of ~8% volume growth and a 2.5% price increase." },
          { id: "apex-drv", type: "written", prompt: "Leadership wants to model a recession scenario. Which drivers would you flex, and in which direction?", guidance: "Think about what happens to volume and pricing power in a downturn.", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst identified sensible recession levers (lower volume, weaker pricing/discounting, possibly higher input costs) and understands scenario construction. Be specific.", modelAnswer: "In a recession I'd flex volume down materially — industrial demand is cyclical, so I might model units falling to 460,000–480,000 rather than growing. I'd also soften pricing, assuming discounting pressure pulls realized price below $410, and I'd consider input-cost inflation squeezing the already-thin 30% gross margin. Bundling these into a coherent downside scenario (not just flexing one variable) shows leadership the combined revenue and margin risk and informs decisions on capex timing and cost flexibility." },
        ],
      },
      {
        id: "variance", moduleLabel: "Variance & Performance", title: "Analyze the Quarter",
        brief: "Decompose the revenue miss into price and volume. Enter $M.",
        dataTitle: "PLAN vs. ACTUAL",
        data: [
          { label: "Plan: Units", value: "540,000" },
          { label: "Plan: Price", value: "$410" },
          { label: "Actual: Units", value: "520,000" },
          { label: "Actual: Price", value: "$420" },
        ],
        tasks: [
          { id: "apex-vol", type: "calc", prompt: "Calculate the volume variance ($M).", formula: "(Actual Units − Plan Units) × Plan Price", answer: -8.2, tolerance: 0.5, display: "-$8.2M", placeholder: "e.g. -8.2", explain: "(520,000 − 540,000) × $410 = −20,000 × 410 = −$8.2M. Volume came in below plan." },
          { id: "apex-price", type: "calc", prompt: "Calculate the price variance ($M).", formula: "(Actual Price − Plan Price) × Actual Units", answer: 5.2, tolerance: 0.5, display: "+$5.2M", placeholder: "e.g. 5.2", explain: "($420 − $410) × 520,000 = $10 × 520,000 = +$5.2M. Stronger pricing partially offset the volume miss." },
          { id: "apex-pvm", type: "written", prompt: "Revenue missed plan by $3.0M net. Explain the story to leadership and what you'd investigate.", guidance: "Volume down, price up — what does that combination suggest?", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst correctly read the volume shortfall (−$8.2M) partially offset by favorable price (+$5.2M) for a net −$3.0M miss, and proposed investigating demand softness. Be specific.", modelAnswer: "Revenue missed by $3.0M, driven by a $8.2M unfavorable volume variance partially offset by $5.2M of favorable price. We sold 20,000 fewer units than planned but realized $10 more per unit. That combination — falling volume with holding/rising price — can signal softening demand that we're partly masking with price, or a deliberate mix shift toward higher-value units. I'd investigate order intake and backlog trends to determine whether this is a demand problem (concerning) or an intentional premium-mix strategy (potentially fine), then adjust the forecast accordingly." },
        ],
      },
      {
        id: "workingcapital", moduleLabel: "Working Capital & Cash", title: "Assess the Cash Conversion Cycle",
        brief: "Manufacturers tie up real cash in operations. Compute the cash conversion cycle. Enter days.",
        dataTitle: "WORKING CAPITAL DATA",
        data: [
          { label: "Inventory", value: "$35M" },
          { label: "Accounts Receivable", value: "$30M" },
          { label: "Accounts Payable", value: "$20M" },
          { label: "Revenue", value: "$200M" },
          { label: "COGS", value: "$140M" },
        ],
        tasks: [
          { id: "apex-dio", type: "calc", prompt: "Calculate Days Inventory Outstanding (DIO).", formula: "(Inventory / COGS) × 365", answer: 91, tolerance: 4, display: "≈91 days", placeholder: "e.g. 91", explain: "(35 / 140) × 365 ≈ 91 days. Inventory sits ~3 months before it's sold." },
          { id: "apex-ccc", type: "calc", prompt: "Calculate the Cash Conversion Cycle (CCC), in days. (DSO = 55, DPO = 52 — use with your DIO.)", formula: "CCC = DIO + DSO − DPO", answer: 94, tolerance: 5, display: "≈94 days", placeholder: "e.g. 94", explain: "DIO 91 + DSO 55 − DPO 52 ≈ 94 days. Cash is tied up for ~3 months — the opposite of SaaS's negative cycle." },
          { id: "apex-cccwrite", type: "written", prompt: "The CCC is ~94 days. Name two specific levers to shorten it and one risk of each.", guidance: "Reference DSO, DIO, DPO and their real-world constraints.", aiSystem: "You are an FP&A director. In 3-4 sentences assess whether the analyst named credible levers (reduce DIO via leaner inventory, reduce DSO via faster collections, increase DPO via longer supplier terms) WITH their real-world risks (stockouts, customer friction, supplier strain). Be specific.", modelAnswer: "First, reduce DIO by tightening inventory through better demand planning or just-in-time — but the risk is stockouts and lost sales if we cut too lean in a demand upswing. Second, increase DPO by negotiating longer supplier payment terms, holding our cash longer — but that risks straining supplier relationships and forfeiting early-payment discounts. A third option is reducing DSO via tighter credit terms or early-pay incentives, at the risk of customer friction or discount cost. I'd model the cash released against each risk before acting." },
        ],
      },
      {
        id: "valuation", moduleLabel: "Valuation & Decisions", title: "Make the Capital Call",
        brief: "A $15M automation investment is on the table. Run the NPV at a 12% discount rate and recommend.",
        dataTitle: "PROJECT CASH FLOWS",
        data: [
          { label: "Upfront Investment", value: "$15M" },
          { label: "Year 1 Cash Flow", value: "$5M" },
          { label: "Year 2 Cash Flow", value: "$7M" },
          { label: "Year 3 Cash Flow", value: "$8M" },
          { label: "Discount Rate", value: "12%" },
        ],
        tasks: [
          { id: "apex-npv", type: "calc", prompt: "Calculate the NPV ($M). Discount at 12% and subtract the $15M.", formula: "Σ CFₜ/(1.12)ᵗ − 15", answer: 0.74, tolerance: 0.5, display: "≈$0.74M", placeholder: "e.g. 0.74", explain: "PV = 5/1.12 + 7/1.2544 + 8/1.4049 = 4.46 + 5.58 + 5.69 = $15.74M. NPV = 15.74 − 15 = +$0.74M — positive but thin." },
          { id: "apex-decide", type: "mc", prompt: "What's the decision, and what's the nuance?", options: ["Reject — NPV is negative", "Accept — NPV is positive (+$0.74M), though thin enough to scrutinize the assumptions", "Indifferent", "Cannot decide without payback period"], correct: 1, explain: "NPV is positive, so the rule says accept — but at only +$0.74M it's marginal, so the assumptions deserve a hard look and a sensitivity check before committing $15M." },
          { id: "apex-rec", type: "written", prompt: "Write your recommendation to the CFO. Address the thin NPV, sensitivity, and any non-financial/strategic factors.", guidance: "A marginal NPV calls for judgment beyond the number.", aiSystem: "You are the CFO. In 4-5 sentences evaluate whether the analyst recommended sensibly (accept but flag the thin margin), proposed sensitivity analysis, and considered strategic factors (e.g., automation's competitive/quality benefits beyond modeled cash flows). Coach on judgment.", modelAnswer: "Sample: 'The automation project has a positive but thin NPV of ~$0.74M at our 12% hurdle, so it technically clears the bar. Because the margin is so slim, I'd run sensitivity on the key assumptions — especially the Year 3 cash flow and the discount rate — since a small deterioration flips it negative. I'd also weigh strategic factors the model may understate: automation could improve quality, reduce long-term labor risk, and protect margin as wages rise, which may justify it even at a marginal NPV. Recommendation: proceed, but with a sensitivity review and a clear read on the strategic upside before releasing the full $15M.'" },
        ],
      },
    ],
  },
];
