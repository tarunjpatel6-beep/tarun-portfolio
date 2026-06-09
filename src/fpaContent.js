// FP&A Training — Deep Flagship Reference Content
// Block types: heading, prose, terms, callout (key|warning|insight), table, example, list

export const FPA_LESSON_CONTENT = {
  // ════════════════════════════════════════════════════════════════
  statements: {
    title: "The Three Statements & How They Connect",
    subtitle: "The foundation of all financial analysis — and why a great forecast lives or dies on statement linkage",
    blocks: [
      { type: "heading", text: "Why This Is the Foundation" },
      { type: "prose", text: "Every model you build, every forecast you defend, and every variance you explain rests on a fluent understanding of the three core financial statements and the way they interlock. The income statement tells you whether the business made money. The balance sheet tells you what it owns and owes at a point in time. The cash flow statement reconciles the two and tells you whether profit actually turned into cash. Master the linkages and you can build a model that holds together; miss them and the model breaks the moment an assumption changes." },

      { type: "heading", text: "Statement 1: The Income Statement" },
      { type: "prose", text: "The income statement (P&L) measures performance over a period — a quarter or a year. It walks from revenue down to net income through a series of cost layers, each of which tells you something different about the business." },
      { type: "table", headers: ["Line", "What It Captures"], rows: [
        ["Revenue (Net Sales)", "Value of goods/services delivered in the period (accrual, not cash)"],
        ["− COGS", "Direct costs of producing what was sold"],
        ["= Gross Profit", "What's left to cover operating costs; gross margin = GP ÷ Revenue"],
        ["− SG&A, R&D", "Operating expenses not tied directly to units"],
        ["= Operating Income (EBIT)", "Profit from core operations, before financing and tax"],
        ["− Interest", "Cost of debt financing"],
        ["− Taxes", "Income taxes"],
        ["= Net Income", "The bottom line — flows to retained earnings"],
      ]},
      { type: "callout", variant: "key", title: "Accrual vs. Cash", body: "The income statement is built on accrual accounting: revenue is recognized when earned (delivered), and expenses when incurred (matched to revenue) — not when cash changes hands. This is the single most important reason profit ≠ cash, and why the cash flow statement exists." },

      { type: "heading", text: "Statement 2: The Balance Sheet" },
      { type: "prose", text: "The balance sheet is a snapshot at a single instant, governed by the identity that must always hold: Assets = Liabilities + Equity. Assets are what the company controls; liabilities and equity are how those assets were financed (by creditors or owners)." },
      { type: "terms", items: [
        { abbr: "ASSETS", full: "What the company owns/controls", desc: "Current assets (cash, accounts receivable, inventory) convert to cash within a year. Non-current assets (PP&E, intangibles, goodwill) are longer-lived." },
        { abbr: "LIABILITIES", full: "What the company owes", desc: "Current liabilities (accounts payable, accrued expenses, short-term debt) are due within a year. Long-term liabilities include long-term debt and deferred taxes." },
        { abbr: "EQUITY", full: "Owners' residual claim", desc: "Contributed capital (common stock, APIC) plus retained earnings (cumulative net income less dividends) less treasury stock. The residual after liabilities." },
      ]},
      { type: "callout", variant: "key", title: "It must always balance", body: "Every transaction has at least two effects that keep Assets = Liabilities + Equity intact. Buy inventory on credit: inventory (asset) up, accounts payable (liability) up. Earn profit: assets up, retained earnings (equity) up. If your model's balance sheet doesn't balance, a linkage is broken — the discipline is unforgiving, which is exactly why it's a powerful check." },

      { type: "heading", text: "Statement 3: The Cash Flow Statement" },
      { type: "prose", text: "The cash flow statement reconciles net income to the actual change in cash, organized into three sections. The indirect method — used by nearly all companies — starts at net income and adjusts for non-cash items and changes in working capital." },
      { type: "table", headers: ["Section", "Captures", "Examples"], rows: [
        ["Operating (CFO)", "Cash from core business", "Net income + D&A ± working-capital changes"],
        ["Investing (CFI)", "Cash for long-term assets", "Capex, acquisitions, asset sales"],
        ["Financing (CFF)", "Cash from capital providers", "Debt issued/repaid, equity, dividends"],
      ]},
      { type: "example", title: "Why depreciation gets added back", intro: "Suppose net income is $100, including a $20 depreciation expense and no other items:", steps: [
        "Net income = $100 (already reduced by the $20 depreciation)",
        "Depreciation used NO cash — it's an accounting allocation of a past purchase",
        "So in CFO we add the $20 back: cash from operations = $120",
      ], result: "Depreciation reduces taxable income (a benefit) without consuming cash in the period. The add-back corrects net income to a cash basis. The same logic applies to amortization, stock-based compensation, and other non-cash charges." },

      { type: "heading", text: "The Linkages — Where the Magic Happens" },
      { type: "prose", text: "The three statements are not independent reports — they are one integrated system. These connections are what make a 3-statement model work, and they are the most common thing interviewers and senior leaders probe." },
      { type: "list", items: [
        "Net income (income statement) flows into retained earnings (balance sheet equity) and is the starting line of the cash flow statement.",
        "Depreciation (income statement) is added back on the cash flow statement and reduces net PP&E on the balance sheet.",
        "Capex (cash flow investing) increases PP&E on the balance sheet.",
        "Changes in working capital accounts (balance sheet) drive the working-capital adjustments in operating cash flow.",
        "Ending cash on the cash flow statement equals the cash line on the balance sheet — the ultimate integrity check.",
        "Debt issued/repaid (cash flow financing) changes the debt balance on the balance sheet, which drives interest expense on the income statement.",
      ]},
      { type: "callout", variant: "insight", title: "The order of build", body: "When building a 3-statement model, you typically forecast the income statement first, then the balance sheet items you can drive (working capital, PP&E, debt), and the cash flow statement falls out last — it's derived entirely from changes in the other two. If you ever wonder 'where does cash come from?' the answer is always: the changes in the income statement and balance sheet." },

      { type: "heading", text: "Profit vs. Cash: The Defining Insight" },
      { type: "prose", text: "The most important practical takeaway is that a profitable company can run out of cash, and an unprofitable one can be cash-flush — at least temporarily. FP&A's job is to see both pictures at once." },
      { type: "example", title: "Profitable but cash-starved", intro: "A fast-growing distributor reports $5M net income but negative operating cash flow. Why?", steps: [
        "Revenue (and profit) grew 60% — great on the income statement",
        "But receivables ballooned: customers haven't paid yet (cash tied up)",
        "Inventory was built ahead of demand (more cash tied up)",
        "The cash to fund this growth went out the door before collections came in",
      ], result: "Growth consumed working capital faster than profit generated cash. This is why high-growth companies frequently need financing despite being profitable — and why FP&A always models the cash impact of growth, not just the P&L." },

      { type: "heading", text: "The FP&A Takeaway" },
      { type: "prose", text: "Fluency in the three statements and their linkages is the price of admission. Once you can see how an operating assumption ripples through profit, financial position, and cash simultaneously, you can build forecasts that are internally consistent, stress-test them with confidence, and explain to leadership not just whether the business is profitable, but whether it's healthy." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  budgeting: {
    title: "Budgeting & Forecasting",
    subtitle: "Building the plan, keeping the outlook current, and the methods that separate good FP&A from spreadsheet janitors",
    blocks: [
      { type: "heading", text: "Budget vs. Forecast vs. Plan" },
      { type: "prose", text: "These words get used loosely, but the distinction is fundamental to FP&A. Getting it right is the difference between a team that drives decisions and one that just reports numbers." },
      { type: "terms", items: [
        { abbr: "BUDGET / AOP", full: "Annual Operating Plan", desc: "The detailed, approved financial commitment for the upcoming fiscal year. It's the fixed target — set once, held as the measuring stick. Variances are measured against it." },
        { abbr: "FORECAST", full: "Latest Estimate", desc: "The current best view of where results will actually land, updated regularly. Unlike the budget, it changes as conditions change. It's about accuracy, not commitment." },
        { abbr: "PLAN / LRP", full: "Long-Range Plan", desc: "The multi-year strategic financial trajectory (often 3–5 years), connecting near-term budgets to long-term strategy and capital allocation." },
      ]},
      { type: "callout", variant: "key", title: "Why both budget and forecast matter", body: "The budget is the commitment leadership signed up for; the forecast is reality's latest answer. Tracking both lets FP&A say: 'We committed to X, we now expect Y, here's the gap and what we're doing about it.' A team that only has one of the two is flying with one eye closed." },

      { type: "heading", text: "Budgeting Approaches" },
      { type: "prose", text: "There's no single right way to build a budget — the method should fit the organization's maturity, volatility, and culture. Each approach has real trade-offs." },
      { type: "table", headers: ["Approach", "How It Works", "Trade-off"], rows: [
        ["Incremental", "Start from last year, adjust by a %", "Fast, but bakes in prior inefficiencies"],
        ["Zero-Based (ZBB)", "Justify every dollar from a zero base", "Rigorous, surfaces waste — but labor-intensive"],
        ["Top-Down", "Leadership sets targets that cascade down", "Strategically aligned, fast — but may miss ground truth"],
        ["Bottom-Up", "Units build detail that aggregates up", "Accurate detail — but slow and can miss strategy"],
        ["Driver-Based", "Model outputs from operational drivers", "Flexible, transparent — needs good driver data"],
      ]},
      { type: "callout", variant: "insight", title: "Most mature orgs blend", body: "The best practice is usually a counter-balanced loop: leadership sets top-down targets reflecting strategy and market reality, units build bottom-up detail, and the two are reconciled. Pure bottom-up sums to an unrealistic number; pure top-down ignores operational reality. The negotiation between them is where FP&A earns its seat." },

      { type: "heading", text: "Driver-Based Forecasting" },
      { type: "prose", text: "This is the single most important technique in modern FP&A. Instead of forecasting financial line items directly (e.g., 'revenue grows 8%'), you model the operational drivers that produce those financials. This makes the model transparent, defensible, and instantly flexible." },
      { type: "example", title: "Direct vs. driver-based revenue", intro: "Compare two ways to forecast revenue for a SaaS business:", steps: [
        "Direct (weak): 'Revenue = last year × 1.20'. Why 20%? Nobody can say.",
        "Driver-based (strong): Revenue = (Beginning customers + New − Churned) × Average revenue per customer",
        "Now you can flex: What if churn improves 1 point? What if ARPU rises with a price increase?",
      ], result: "The driver-based model answers 'what would have to be true' for the forecast to hold, and lets you run scenarios by changing the underlying drivers. It turns the forecast from a black box into a decision tool." },

      { type: "heading", text: "Rolling Forecasts" },
      { type: "prose", text: "A traditional annual budget grows stale the moment it's approved and creates perverse year-end behavior. A rolling forecast continuously maintains a fixed horizon — always projecting, say, the next 12 or 18 months — re-forecasting each period as actuals come in." },
      { type: "list", items: [
        "Keeps the outlook continuously current rather than anchored to a calendar that's increasingly irrelevant late in the year.",
        "Reduces 'use it or lose it' year-end spending, because there's no hard fiscal-year cliff in the planning horizon.",
        "Forces a regular re-examination of assumptions, improving forecast discipline over time.",
        "Pairs naturally with driver-based models, since you're updating drivers each cycle.",
      ]},
      { type: "callout", variant: "insight", title: "Beyond Budgeting", body: "The 'Beyond Budgeting' movement argues that rigid annual budgets do more harm than good — they're slow, encourage gaming, and disconnect from strategy. The proposed alternative: adaptive rolling forecasts, relative targets, and decentralized decision rights. You don't have to go all-in, but the critique is worth understanding." },

      { type: "heading", text: "Scenario Planning & Sensitivity Analysis" },
      { type: "prose", text: "A single-point forecast is almost always wrong. Sophisticated FP&A presents a range and helps leadership understand what drives it. Two distinct tools do this — and they're often confused." },
      { type: "terms", items: [
        { abbr: "SENSITIVITY", full: "Flex one variable", desc: "Hold everything constant and vary one driver (e.g., 'what if churn is 1 point higher?') to see its isolated impact. Answers: which assumptions matter most?" },
        { abbr: "SCENARIO", full: "Coherent sets of assumptions", desc: "Build internally-consistent cases — Base, Upside, Downside (or 'recession', 'price war') — changing multiple related drivers together. Answers: what does the world look like under different futures?" },
      ]},

      { type: "heading", text: "Behavioral Traps in Budgeting" },
      { type: "prose", text: "Budgets are built by people with incentives, and FP&A must see through the games." },
      { type: "list", items: [
        "Sandbagging: setting deliberately low targets to guarantee a beat. FP&A counters with benchmarking and stretch-but-credible targets.",
        "Hockey-stick forecasts: flat near-term performance with a miraculous back-half recovery that never arrives. Scrutinize the ramp.",
        "Use-it-or-lose-it: spending remaining budget at year-end to protect next year's allocation. Rolling forecasts and ZBB mitigate this.",
        "Padding: inflating cost estimates for cushion. Driver-based transparency makes padding visible.",
      ]},

      { type: "heading", text: "Measuring Forecast Quality" },
      { type: "prose", text: "Good FP&A treats forecasting as a discipline to be improved, not a one-shot guess. Track accuracy over time and look for systematic bias." },
      { type: "callout", variant: "key", title: "Bias vs. accuracy", body: "Accuracy (e.g., Mean Absolute Percent Error) measures how close you were. Bias measures whether you consistently err in one direction — always too optimistic, or always too low. Bias is more damaging than random error because it's a systematic flaw in the process. A forecast that's always 10% high is more fixable, and more dangerous if ignored, than one that's randomly off." },

      { type: "heading", text: "The FP&A Takeaway" },
      { type: "prose", text: "Budgeting sets the commitment; forecasting keeps leadership honest about reality. The methods you choose — driver-based, rolling, scenario-rich — determine whether FP&A is a backward-looking scorekeeper or a forward-looking partner that helps the business steer. Aim to be the latter." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  variance: {
    title: "Variance & Performance Analysis",
    subtitle: "Turning the gap between plan and reality into decision-useful insight — the core craft of FP&A",
    blocks: [
      { type: "heading", text: "What Variance Analysis Really Is" },
      { type: "prose", text: "Variance analysis is the discipline of explaining why actual results differ from a reference point — budget, prior year, or forecast — and translating that explanation into action. Anyone can compute a variance; the value FP&A adds is the 'so what.' A variance report without root cause and recommended action is just data." },
      { type: "callout", variant: "key", title: "Favorable is not the same as good", body: "A 'favorable' variance just means actual beat the reference directionally. A favorable cost variance achieved by cutting R&D, deferring maintenance, or skimping on quality can be deeply unfavorable for the business. Always interrogate the driver before celebrating the sign." },

      { type: "heading", text: "The Comparison Set" },
      { type: "prose", text: "The richest analysis triangulates a result against multiple reference points, because each answers a different question." },
      { type: "table", headers: ["Comparison", "Question It Answers"], rows: [
        ["Actual vs. Budget", "Did we hit the commitment we made?"],
        ["Actual vs. Prior Year", "Are we improving over time? (trend)"],
        ["Actual vs. Latest Forecast", "Did we land where we most recently expected?"],
        ["Actual vs. Flexible Budget", "Stripping out volume, was our rate/efficiency on plan?"],
      ]},

      { type: "heading", text: "Price-Volume-Mix: The Core Decomposition" },
      { type: "prose", text: "When revenue or margin misses, the first question is: was it price, volume, or mix? Each points to a completely different problem and a different owner. PVM analysis isolates the three." },
      { type: "terms", items: [
        { abbr: "VOLUME", full: "Quantity effect", desc: "Impact of selling more/fewer units than planned, holding price constant. Volume variance ≈ (Actual Units − Budget Units) × Budget Price (or budget margin)." },
        { abbr: "PRICE", full: "Rate effect", desc: "Impact of charging a different price than planned, holding volume constant. Price variance ≈ (Actual Price − Budget Price) × Actual Units." },
        { abbr: "MIX", full: "Composition effect", desc: "Impact of selling a different blend of products (with different margins) than planned. A shift toward higher-margin products is favorable mix even if total units are flat." },
      ]},
      { type: "example", title: "Why mix can fool you", intro: "Total revenue is exactly on budget, yet gross margin missed by 3 points. How?", steps: [
        "Total units and blended revenue hit plan — so volume and price look fine in aggregate",
        "But the mix shifted: more low-margin product sold, less high-margin product",
        "The margin-rich products under-sold; the margin-poor products over-sold",
      ], result: "Mix shift eroded margin even though the top line was 'on plan.' Without decomposing PVM, you'd never see it — you'd be staring at an on-budget revenue line wondering where the profit went. This is exactly the kind of insight that makes FP&A indispensable." },

      { type: "heading", text: "Cost Variances: Rate vs. Efficiency vs. Volume" },
      { type: "prose", text: "On the cost side, the flexible budget is the key tool. It restates the plan at actual volume, which lets you separate the three reasons costs differed from budget." },
      { type: "list", items: [
        "Volume variance: costs differed simply because output differed (more units → more variable cost). Often expected and benign.",
        "Rate (spending/price) variance: you paid a different price for inputs than planned (e.g., material cost inflation).",
        "Efficiency variance: you used more or fewer input units than the standard for the output achieved (e.g., labor hours per unit).",
      ]},
      { type: "callout", variant: "warning", title: "Don't confuse volume-driven cost growth with poor control", body: "If you sold 20% more units, your total variable costs should be up roughly 20% — that's not a cost problem, it's success. The flexible budget reveals whether cost-per-unit held. Reporting a raw unfavorable cost variance without flexing for volume is a classic rookie error that misleads leadership." },

      { type: "heading", text: "Timing vs. Permanent Variances" },
      { type: "prose", text: "A crucial distinction leadership relies on FP&A to make: is this variance a real change, or just timing?" },
      { type: "example", title: "The deferred-project trap", intro: "Marketing is $2M favorable to budget this quarter. Is that a win?", steps: [
        "Investigation reveals a planned campaign slipped from Q2 to Q3",
        "The $2M wasn't saved — it will be spent next quarter",
        "Reporting it as 'savings' would set a false expectation",
      ], result: "This is a timing variance — it reverses next period. FP&A flags it as timing, not a permanent reduction, so leadership doesn't bank a saving that's about to disappear. Mislabeling timing as permanent is one of the fastest ways to lose credibility." },

      { type: "heading", text: "Operating Leverage & the Cost Structure Read" },
      { type: "prose", text: "Variance analysis isn't just line-by-line — it reveals structural truths about the business. Watching how costs move relative to revenue exposes the operating leverage." },
      { type: "callout", variant: "insight", title: "When SG&A outpaces revenue", body: "If revenue grows 8% but SG&A grows 20%, operating margin is compressing and operating leverage is working against you — costs are scaling faster than the top line. Conversely, if revenue grows 8% and SG&A grows 2%, you're getting positive operating leverage: each revenue dollar drops more to the bottom line. FP&A should always frame variances in terms of what they reveal about the cost structure's scalability." },

      { type: "heading", text: "Currency & Other Non-Operational Noise" },
      { type: "prose", text: "For multinational businesses, reported results move with exchange rates even when nothing operational changes. FP&A isolates the real performance." },
      { type: "callout", variant: "key", title: "Constant currency", body: "Reporting results 'at constant currency' (holding FX rates fixed at a reference) strips out translation effects to reveal the underlying operational trend. A revenue line that looks flat in reported dollars might be up 7% in constant currency — a completely different story for leadership. Always separate operational performance from FX noise." },

      { type: "heading", text: "Communicating Variances: The Bridge" },
      { type: "prose", text: "The bridge (or 'walk') is FP&A's signature communication tool. It decomposes the change between two numbers into a sequence of labeled, quantified drivers — turning a confusing delta into a clear story." },
      { type: "example", title: "A revenue bridge", intro: "Walking prior-year revenue to current-year revenue:", steps: [
        "Prior Year Revenue: $100M",
        "+ Volume growth: +$8M",
        "+ Price increases: +$5M",
        "− Unfavorable mix: −$2M",
        "+ New product launch: +$4M",
        "− FX headwind: −$3M",
        "= Current Year Revenue: $112M",
      ], result: "Leadership instantly sees what moved the number and by how much. A bridge transforms 'revenue grew $12M' into a precise, actionable narrative — and it's the format executives expect from world-class FP&A." },

      { type: "heading", text: "The FP&A Takeaway" },
      { type: "prose", text: "Variance analysis is where FP&A proves its worth. The mechanics — PVM, flexible budgets, bridges, constant currency — are learnable. The craft is in synthesizing them into a tight narrative: what happened, why, the financial impact, whether it's timing or permanent, and what to do about it. Deliver that, and you stop reporting the past and start shaping the future." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  workingcapital: {
    title: "Working Capital & Cash Flow",
    subtitle: "Why cash is king, how operations tie it up, and the levers that free it",
    blocks: [
      { type: "heading", text: "Profit Pays the Ego, Cash Pays the Bills" },
      { type: "prose", text: "A business can survive a long time with thin profits but dies quickly without cash. Working capital management is the discipline of minimizing the cash trapped in day-to-day operations so it's available to invest, repay debt, or weather a downturn. For FP&A, it's where the balance sheet meets reality." },

      { type: "heading", text: "The Components of Working Capital" },
      { type: "prose", text: "Operating working capital is the cash tied up in the core operating cycle — primarily three accounts that finance must watch like a hawk." },
      { type: "terms", items: [
        { abbr: "AR", full: "Accounts Receivable", desc: "Money customers owe you for sales already made. Cash you've earned but not yet collected. The larger and slower-paying, the more cash is trapped." },
        { abbr: "INVENTORY", full: "Inventory", desc: "Cash tied up in raw materials, work-in-process, and finished goods sitting in the warehouse. It earns nothing until sold." },
        { abbr: "AP", full: "Accounts Payable", desc: "Money you owe suppliers. Unlike AR and inventory, payables are a SOURCE of cash — the longer you (reasonably) take to pay, the longer you hold cash." },
      ]},
      { type: "callout", variant: "key", title: "The working capital identity", body: "Operating Working Capital ≈ Accounts Receivable + Inventory − Accounts Payable. You want AR and inventory low (less cash trapped) and AP high (holding cash longer) — within the bounds of healthy customer and supplier relationships." },

      { type: "heading", text: "The Cash Conversion Cycle" },
      { type: "prose", text: "The cash conversion cycle (CCC) is the single most important working-capital metric. It measures, in days, how long cash is locked up in operations from the moment you pay for inventory until you collect from the customer." },
      { type: "example", title: "Building the CCC", intro: "The CCC combines three days-based ratios:", steps: [
        "DIO (Days Inventory Outstanding) = (Inventory ÷ COGS) × 365 — days inventory sits before selling",
        "DSO (Days Sales Outstanding) = (AR ÷ Revenue) × 365 — days to collect after a sale",
        "DPO (Days Payable Outstanding) = (AP ÷ COGS) × 365 — days you take to pay suppliers",
        "CCC = DIO + DSO − DPO",
      ], result: "Example: DIO 60 + DSO 45 − DPO 30 = 75-day cash conversion cycle. For 75 days, cash is tied up in operations before it comes back. Cut any component (faster inventory, faster collections, slower payments) and you release cash." },
      { type: "callout", variant: "insight", title: "Negative CCC is a superpower", body: "Some great businesses run a NEGATIVE cash conversion cycle — they collect from customers before they pay suppliers. Retailers and subscription businesses often do this: the customer pays upfront, but the supplier is paid in 30–60 days. The business effectively funds its growth with other people's money — no external financing needed for working capital." },

      { type: "heading", text: "The Levers — and Their Limits" },
      { type: "prose", text: "FP&A partners with operations to pull the three working-capital levers, but each has a real-world constraint." },
      { type: "table", headers: ["Lever", "Action", "The Catch"], rows: [
        ["Reduce DSO", "Collect faster: tighter terms, early-pay discounts, better collections", "Aggressive terms can lose customers; discounts cost margin"],
        ["Reduce DIO", "Hold less inventory: JIT, better demand planning", "Too lean risks stockouts and lost sales"],
        ["Increase DPO", "Pay suppliers slower: negotiate longer terms", "Strains suppliers; forfeits early-pay discounts"],
      ]},
      { type: "example", title: "The 2/10 net 30 trade-off", intro: "A supplier offers '2/10 net 30' — 2% discount if paid in 10 days, otherwise due in 30. Should you take it?", steps: [
        "Taking it: pay 20 days early to save 2%",
        "2% over 20 days annualizes to roughly 36%+ — an enormous implied return",
        "Skipping it to preserve cash only makes sense if your cost of capital exceeds that, or cash is genuinely scarce",
      ], result: "Early-payment discounts usually represent a very high implied return, so taking them is often correct — but it trades cash-now for margin. FP&A quantifies the trade-off rather than defaulting to 'always stretch payables.'" },

      { type: "heading", text: "From Working Capital to Free Cash Flow" },
      { type: "prose", text: "Working capital changes are a major driver of the gap between profit and cash, and therefore of free cash flow — the metric investors and boards care about most." },
      { type: "example", title: "Free Cash Flow build", intro: "FCF is the cash truly available after running and maintaining the business:", steps: [
        "Start: Operating Cash Flow (net income + D&A ± working capital changes)",
        "− Capital expenditures (the cash to maintain/grow the asset base)",
        "= Free Cash Flow",
      ], result: "FCF = Operating Cash Flow − Capex. A business can show strong net income but weak FCF if working capital is ballooning or capex is heavy. FCF is harder to manipulate than earnings, which is why it's a favorite of sophisticated analysts." },
      { type: "callout", variant: "warning", title: "The growth-cash paradox", body: "Fast-growing companies often have negative free cash flow despite being profitable, because growth front-loads working capital (more receivables, more inventory) and capex before the cash from that growth is collected. This isn't necessarily bad — it's the cost of growth — but FP&A must model it so the business doesn't get blindsided by a cash crunch in the middle of a boom." },

      { type: "heading", text: "Forecasting Working Capital" },
      { type: "prose", text: "In a forecast model, you don't guess working capital balances directly — you drive them from the operating forecast using the days-based ratios." },
      { type: "list", items: [
        "Forecast AR = DSO assumption × (forecasted revenue ÷ 365)",
        "Forecast Inventory = DIO assumption × (forecasted COGS ÷ 365)",
        "Forecast AP = DPO assumption × (forecasted COGS ÷ 365)",
        "Changes in these balances flow into the operating section of the forecasted cash flow statement — closing the loop on a 3-statement model.",
      ]},

      { type: "heading", text: "Liquidity Ratios" },
      { type: "prose", text: "Beyond the cycle, FP&A monitors point-in-time liquidity cushions." },
      { type: "terms", items: [
        { abbr: "Current Ratio", full: "Current Assets ÷ Current Liabilities", desc: "Can short-term assets cover short-term obligations? >1 is generally healthy, but a very high ratio can signal idle assets." },
        { abbr: "Quick Ratio", full: "(Current Assets − Inventory) ÷ Current Liabilities", desc: "A stricter test that excludes inventory (the least liquid current asset). Better gauge of immediate liquidity." },
      ]},

      { type: "heading", text: "The FP&A Takeaway" },
      { type: "prose", text: "Working capital is where profit becomes cash — or doesn't. Master the cash conversion cycle and its levers, and you can explain why a profitable business is cash-starved, find the trapped cash, and forecast liquidity with precision. In a downturn or a high-growth sprint, this is the analysis that keeps a company alive." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  valuation: {
    title: "Valuation & Decision Analysis",
    subtitle: "Time value of money, NPV/IRR, unit economics, and how FP&A allocates scarce capital to its highest use",
    blocks: [
      { type: "heading", text: "The Idea Underneath Everything: Time Value of Money" },
      { type: "prose", text: "A dollar today is worth more than a dollar tomorrow — because today's dollar can be invested to earn a return, and because the future is uncertain. Every valuation and capital-allocation tool in FP&A is built on this single principle. To compare cash flows across time, you must discount future cash to its present value." },
      { type: "callout", variant: "key", title: "Present value, in one line", body: "PV = Future Cash Flow ÷ (1 + discount rate)^number of periods. The discount rate reflects the return you require given risk and opportunity cost. Higher risk or higher opportunity cost → higher discount rate → lower present value of future cash." },

      { type: "heading", text: "Net Present Value (NPV)" },
      { type: "prose", text: "NPV is the gold-standard investment decision rule. It sums the present value of all future cash flows from a project and subtracts the upfront investment. The logic is airtight: if a project's discounted future cash exceeds its cost, it creates value." },
      { type: "example", title: "NPV in action", intro: "A project costs $100K today and returns $40K, $50K, and $60K over three years. Discount rate = 10%:", steps: [
        "PV Year 1 = $40K ÷ 1.10 = $36.4K",
        "PV Year 2 = $50K ÷ 1.10² = $41.3K",
        "PV Year 3 = $60K ÷ 1.10³ = $45.1K",
        "Sum of PVs = $122.8K; NPV = $122.8K − $100K = +$22.8K",
      ], result: "NPV is positive (+$22.8K), so the project creates value and should be accepted. The decision rule is simple: accept positive-NPV projects, reject negative-NPV ones. NPV is preferred above all other methods because it measures value creation in absolute dollars." },

      { type: "heading", text: "Internal Rate of Return (IRR)" },
      { type: "prose", text: "IRR is the discount rate at which a project's NPV equals zero — effectively the project's implied annualized return. You accept a project if its IRR exceeds your hurdle rate (often the WACC). IRR is intuitive and popular with executives because it's a single percentage, but it has traps." },
      { type: "callout", variant: "warning", title: "When IRR misleads", body: "For mutually exclusive projects of different sizes, IRR can favor the wrong one — a small project with a 40% IRR might create less total value than a large one with a 20% IRR. IRR can also produce multiple or nonsensical answers when cash flows change sign more than once. When NPV and IRR disagree, trust NPV — it measures absolute value created." },

      { type: "heading", text: "Payback & Discounted Payback" },
      { type: "prose", text: "Payback period — how long until cumulative cash flows recover the initial cost — is simple and intuitive, and useful as a liquidity/risk screen. But it has serious limitations." },
      { type: "list", items: [
        "It ignores the time value of money (simple payback) — though discounted payback fixes this partially.",
        "It ignores all cash flows after the payback point — so it can reject a hugely valuable long-horizon project.",
        "It's best used as a secondary risk filter, not a primary decision rule. NPV remains the anchor.",
      ]},

      { type: "heading", text: "The Discount Rate: WACC" },
      { type: "prose", text: "The discount rate you use matters enormously — and for firm-level decisions, it's usually the Weighted Average Cost of Capital. WACC blends the cost of the two sources of capital, weighted by how much of each the firm uses." },
      { type: "example", title: "WACC intuition", intro: "WACC weights the after-tax cost of debt and the cost of equity:", steps: [
        "WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 − Tax Rate))",
        "Debt is cheaper than equity (lower risk to the provider) and tax-deductible — hence the (1 − tax) term",
        "Equity is more expensive because shareholders bear residual risk",
      ], result: "WACC is the blended minimum return the firm must earn to satisfy all capital providers. Projects must clear this hurdle to create value. Note: a higher discount rate lowers NPV — so the choice of rate is itself a high-stakes assumption." },

      { type: "heading", text: "Decision Analysis: What Counts and What Doesn't" },
      { type: "prose", text: "Sound capital decisions hinge on using the right cash flows. Two errors sink more analyses than any math mistake: including costs that shouldn't count, and excluding costs that should." },
      { type: "terms", items: [
        { abbr: "INCREMENTAL", full: "Only what changes", desc: "Include only the cash flows that change as a direct result of the decision. If a cost happens with or without the project, it's irrelevant to the decision." },
        { abbr: "SUNK COST", full: "Already spent — ignore it", desc: "Money already incurred (e.g., past R&D, a prior feasibility study) is gone and must NOT influence the forward decision. The classic trap: 'we've already invested $5M, we can't stop now.' That $5M is irrelevant to whether the next dollar is worth spending." },
        { abbr: "OPPORTUNITY COST", full: "The forgone alternative — include it", desc: "Using a resource (cash, a building, a team) for one project means giving up its next-best use. That forgone value is a real economic cost and belongs in the analysis, even though no cash 'changes hands.'" },
      ]},
      { type: "callout", variant: "warning", title: "The sunk cost fallacy", body: "Throwing good money after bad because of what's already been spent is one of the most expensive cognitive biases in business. FP&A's job is to ruthlessly exclude sunk costs and force the decision to stand on its incremental, forward-looking merits alone." },

      { type: "heading", text: "Unit Economics" },
      { type: "prose", text: "Before scaling a business, you must know whether a single unit or customer is profitable. Unit economics zooms all the way in — and it's where many high-growth stories quietly fall apart." },
      { type: "terms", items: [
        { abbr: "Contribution Margin", full: "Revenue − Variable Costs (per unit)", desc: "What each unit contributes toward covering fixed costs and profit. If contribution margin is negative, you lose more money the more you sell — a fatal flaw." },
        { abbr: "LTV", full: "Customer Lifetime Value", desc: "The total contribution a customer generates over their entire relationship with the business." },
        { abbr: "CAC", full: "Customer Acquisition Cost", desc: "The fully-loaded cost to acquire one customer (sales + marketing ÷ customers acquired)." },
      ]},
      { type: "callout", variant: "insight", title: "The LTV:CAC rule of thumb", body: "A healthy business typically targets an LTV:CAC ratio of about 3:1 or higher — earning at least three times what it costs to acquire a customer. Below ~1:1, you lose money on every customer and scaling accelerates the losses. Above ~5:1, you may be under-investing in growth. FP&A uses this ratio to sanity-check whether a growth engine is actually economic." },

      { type: "heading", text: "Break-Even & Capital Rationing" },
      { type: "prose", text: "Two more workhorses round out the decision toolkit." },
      { type: "example", title: "Break-even", intro: "How many units must you sell to cover fixed costs?", steps: [
        "Break-Even Units = Fixed Costs ÷ Contribution Margin per Unit",
        "Example: $500K fixed costs ÷ $50 CM per unit = 10,000 units to break even",
      ], result: "Below break-even you lose money; above it, each additional unit drops its full contribution margin to profit. Essential for pricing, launch, and capacity decisions." },
      { type: "callout", variant: "insight", title: "Capital rationing & the profitability index", body: "When capital is limited (it always is), you can't fund every positive-NPV project. The Profitability Index (PI = PV of future cash flows ÷ initial investment) ranks projects by value created per dollar invested, helping FP&A maximize total value from a constrained budget. It's NPV's answer to 'which of these good projects do we fund first?'" },

      { type: "heading", text: "The FP&A Takeaway" },
      { type: "prose", text: "Valuation and decision analysis are how FP&A moves from reporting the past to shaping the future — deciding where the company's scarce capital should go. Anchor on time value of money, trust NPV, use the right (incremental, forward-looking) cash flows, and never let a sunk cost or a seductive IRR override the discipline. Do this well, and you become the person leadership trusts to put a dollar where it earns the most." },
    ],
  },
};
