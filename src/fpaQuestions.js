// FP&A Question Banks — practice + graded exams
// Answer positions rotated A/B/C/D; distractor order shuffled.

export const FPA_QUESTION_BANKS = {
  "statements": [
    {
      "q": "Which financial statement shows a company's performance over a period of time rather than at a point in time?",
      "options": [
        "Income Statement",
        "None — all are point-in-time",
        "Balance Sheet",
        "Statement of Shareholders' Equity (snapshot)"
      ],
      "correct": 0,
      "explain": "The income statement (and cash flow statement) covers a period. The balance sheet is a point-in-time snapshot."
    },
    {
      "q": "The fundamental accounting equation is:",
      "options": [
        "Equity = Assets + Liabilities",
        "Assets = Liabilities + Equity",
        "Revenue = Assets − Liabilities",
        "Assets = Revenue − Expenses"
      ],
      "correct": 1,
      "explain": "Assets = Liabilities + Equity. The balance sheet must always balance on this identity."
    },
    {
      "q": "Net income from the income statement flows into the balance sheet through:",
      "options": [
        "Goodwill",
        "Accounts receivable",
        "Retained earnings within equity",
        "Cash directly"
      ],
      "correct": 2,
      "explain": "Net income (less dividends) increases retained earnings, the link between the income statement and the equity section of the balance sheet."
    },
    {
      "q": "Why can a profitable company still run out of cash?",
      "options": [
        "Profit and cash are the same",
        "Only if it commits fraud",
        "It can't happen",
        "Accrual accounting recognizes revenue/expense independent of cash timing; working capital and capex consume cash"
      ],
      "correct": 3,
      "explain": "Under accrual accounting, net income ≠ cash. Receivables, inventory builds, and capex can consume cash even while the income statement shows profit."
    },
    {
      "q": "The indirect method cash flow statement starts with:",
      "options": [
        "Net income, then adjusts for non-cash items and working capital changes",
        "Operating expenses",
        "Ending cash balance",
        "Total revenue"
      ],
      "correct": 0,
      "explain": "The indirect method begins with net income and reconciles to cash by adding back non-cash charges and adjusting for working capital movements."
    },
    {
      "q": "Depreciation expense on the cash flow statement (indirect method) is:",
      "options": [
        "Ignored",
        "Added back to net income because it's a non-cash expense",
        "Subtracted as a cash outflow",
        "Shown as financing activity"
      ],
      "correct": 1,
      "explain": "Depreciation reduced net income but used no cash, so it's added back in the operating section."
    },
    {
      "q": "An increase in accounts receivable is reflected on the cash flow statement as a:",
      "options": [
        "Source of cash",
        "Financing inflow",
        "Use of cash (subtracted)",
        "Non-event"
      ],
      "correct": 2,
      "explain": "A rise in AR means revenue was booked but cash not yet collected — a use of cash in the operating section."
    },
    {
      "q": "Purchasing equipment (capex) appears in which section of the cash flow statement?",
      "options": [
        "Operating",
        "Financing",
        "Equity",
        "Investing"
      ],
      "correct": 3,
      "explain": "Capital expenditures are investing activities."
    },
    {
      "q": "Issuing debt or paying dividends appears in which cash flow section?",
      "options": [
        "Financing",
        "Operating",
        "Investing",
        "Operating and investing"
      ],
      "correct": 0,
      "explain": "Raising/repaying debt and paying dividends are financing activities."
    },
    {
      "q": "The three statements are linked such that ending cash on the cash flow statement equals:",
      "options": [
        "Total equity",
        "The cash line on the balance sheet",
        "Net income",
        "Retained earnings"
      ],
      "correct": 1,
      "explain": "The cash flow statement reconciles to the cash balance reported on the balance sheet — a key integrity check."
    },
    {
      "q": "Gross profit equals:",
      "options": [
        "Net income + Interest",
        "Revenue − Operating Expenses",
        "Revenue − COGS",
        "Revenue − COGS − SG&A − Taxes"
      ],
      "correct": 2,
      "explain": "Gross profit = Revenue − Cost of Goods Sold. Operating expenses are subtracted further down to reach operating income."
    },
    {
      "q": "Operating income (EBIT) is best described as:",
      "options": [
        "Net income plus dividends",
        "Gross profit minus taxes only",
        "Profit before any expenses",
        "Earnings from core operations before interest and taxes"
      ],
      "correct": 3,
      "explain": "EBIT = earnings before interest and taxes — the profit from core operations regardless of financing structure."
    },
    {
      "q": "If a company records $1M of revenue on credit (not yet collected), the immediate effect is:",
      "options": [
        "Accounts receivable +$1M and revenue +$1M",
        "No effect until collection",
        "Inventory −$1M",
        "Cash +$1M"
      ],
      "correct": 0,
      "explain": "Accrual accounting recognizes the revenue and creates a receivable; cash is unaffected until collection."
    },
    {
      "q": "EBITDA differs from operating income (EBIT) by:",
      "options": [
        "Subtracting interest",
        "Adding back depreciation and amortization",
        "Adding taxes",
        "Nothing — they're identical"
      ],
      "correct": 1,
      "explain": "EBITDA = EBIT + Depreciation + Amortization, removing non-cash D&A to approximate operating cash generation."
    },
    {
      "q": "Working capital on the balance sheet equals:",
      "options": [
        "Equity − debt",
        "Total assets − total liabilities",
        "Current assets − current liabilities",
        "Cash + inventory"
      ],
      "correct": 2,
      "explain": "Working capital = current assets − current liabilities, a measure of short-term liquidity."
    },
    {
      "q": "A deferred revenue (unearned revenue) liability arises when:",
      "options": [
        "The company delivers before billing",
        "Debt is issued",
        "Depreciation is recorded",
        "A customer pays before the company delivers the good/service"
      ],
      "correct": 3,
      "explain": "Cash received before performance creates a liability (deferred revenue) until the obligation is satisfied."
    },
    {
      "q": "Which is a non-cash expense that appears on the income statement?",
      "options": [
        "Depreciation & amortization",
        "Interest paid in cash",
        "Salaries paid",
        "Rent paid in cash"
      ],
      "correct": 0,
      "explain": "D&A reduces income but involves no cash outflow in the period — the classic non-cash expense."
    },
    {
      "q": "Free Cash Flow (FCF) is commonly calculated as:",
      "options": [
        "Net income + dividends",
        "Operating cash flow − capital expenditures",
        "Revenue − COGS",
        "EBITDA − taxes"
      ],
      "correct": 1,
      "explain": "FCF = Operating Cash Flow − Capex, the cash available after maintaining/growing the asset base."
    },
    {
      "q": "When building a 3-statement model, which statement is typically built last because it's derived from the other two?",
      "options": [
        "Income statement",
        "Balance sheet",
        "Cash flow statement",
        "They're built simultaneously and independently"
      ],
      "correct": 2,
      "explain": "The cash flow statement is derived from changes in the income statement and balance sheet — it's the reconciling output."
    },
    {
      "q": "A company buys $500K of inventory on credit. The immediate balance sheet effect is:",
      "options": [
        "Revenue +$500K",
        "Equity −$500K",
        "Cash −$500K, inventory +$500K",
        "Inventory +$500K, accounts payable +$500K"
      ],
      "correct": 3,
      "explain": "Buying on credit raises inventory (asset) and accounts payable (liability) — no cash moves yet, and the equation stays balanced."
    },
    {
      "q": "Why do FP&A analysts care about the linkage between the three statements?",
      "options": [
        "Forecasts must be internally consistent — a revenue change ripples through cash, working capital, and the balance sheet",
        "Only auditors need it",
        "It's only an accounting concern",
        "Linkage doesn't affect forecasting"
      ],
      "correct": 0,
      "explain": "A credible forecast model links all three statements so that operational assumptions flow consistently into profit, cash, and financial position."
    }
  ],
  "budgeting": [
    {
      "q": "The annual operating plan (AOP) is best described as:",
      "options": [
        "A daily cash report",
        "The detailed financial plan for the upcoming fiscal year",
        "A long-range 10-year vision",
        "The audited financials"
      ],
      "correct": 1,
      "explain": "The AOP (or annual budget) is the detailed, approved financial plan for the next fiscal year against which performance is measured."
    },
    {
      "q": "A rolling forecast differs from a traditional annual budget because it:",
      "options": [
        "Never changes",
        "Ignores actuals",
        "Continuously extends a fixed number of periods forward as time passes",
        "Is only done once a year"
      ],
      "correct": 2,
      "explain": "A rolling forecast always maintains a constant horizon (e.g., always 12 months out), updating as each period closes — more responsive than a static annual budget."
    },
    {
      "q": "Driver-based forecasting means:",
      "options": [
        "Forecasting purely from last year + a flat %",
        "Only the CFO drives the forecast",
        "Forecasting cash only",
        "Building the forecast from operational drivers (units, price, headcount) rather than just financial line items"
      ],
      "correct": 3,
      "explain": "Driver-based models tie financial outcomes to underlying business drivers, making the forecast more accurate and easier to flex."
    },
    {
      "q": "Top-down budgeting is characterized by:",
      "options": [
        "Leadership setting targets that cascade down to units",
        "No leadership involvement",
        "Departments building budgets from scratch",
        "Only bottom-up inputs"
      ],
      "correct": 0,
      "explain": "Top-down starts with executive targets that flow down. Bottom-up aggregates detailed estimates from the operating units up."
    },
    {
      "q": "Zero-based budgeting (ZBB) requires:",
      "options": [
        "Carrying forward last year's budget with an inflation bump",
        "Justifying every expense from a zero base each cycle",
        "Ignoring all prior data",
        "Budgeting only capex"
      ],
      "correct": 1,
      "explain": "ZBB builds each budget from zero, requiring justification of all spend rather than incrementing the prior year."
    },
    {
      "q": "Incremental budgeting's main weakness is:",
      "options": [
        "It takes too long",
        "It requires too much detail",
        "It can perpetuate inefficiencies by baking in prior-year spend",
        "It ignores revenue"
      ],
      "correct": 2,
      "explain": "By starting from last year's base, incremental budgeting risks carrying forward waste that's never re-examined."
    },
    {
      "q": "A flexible budget adjusts for:",
      "options": [
        "Only the CEO's preferences",
        "Only headcount",
        "Nothing — it's fixed",
        "Actual activity/volume levels, so variances isolate efficiency vs. volume"
      ],
      "correct": 3,
      "explain": "A flexible budget recalculates the plan at actual volume, separating volume-driven variances from rate/efficiency variances."
    },
    {
      "q": "The primary purpose of a forecast (vs. a budget) is to:",
      "options": [
        "Provide the latest expectation of where results will land",
        "Set the fixed performance target",
        "Allocate blame",
        "Replace actuals"
      ],
      "correct": 0,
      "explain": "A budget is the fixed target; a forecast is the current best estimate of the outcome, updated as conditions change."
    },
    {
      "q": "Sandbagging in budgeting refers to:",
      "options": [
        "Cutting all costs",
        "Deliberately setting easily-achievable (low) targets to ensure they're beaten",
        "Building flood defenses",
        "Aggressively stretching targets"
      ],
      "correct": 1,
      "explain": "Sandbagging is setting conservative targets to guarantee favorable variances — a behavioral risk FP&A must guard against."
    },
    {
      "q": "Which is a key advantage of rolling forecasts over annual budgets?",
      "options": [
        "They guarantee accuracy",
        "They require less data",
        "They reduce the 'use it or lose it' year-end spending behavior and stay current",
        "They eliminate the need for actuals"
      ],
      "correct": 2,
      "explain": "Because the horizon always rolls forward, they discourage fiscal-year-end gaming and keep the outlook continuously fresh."
    },
    {
      "q": "A 'bridge' (or walk) in FP&A is used to:",
      "options": [
        "Calculate taxes",
        "Connect two buildings",
        "Hide variances",
        "Explain the movement from one figure to another via discrete drivers (e.g., Budget to Forecast)"
      ],
      "correct": 3,
      "explain": "A bridge/walk decomposes the change between two numbers into labeled drivers — a core FP&A communication tool."
    },
    {
      "q": "Sensitivity analysis in a forecast model examines:",
      "options": [
        "How outputs change as one key assumption varies",
        "How sensitive the CEO is",
        "The tax rate only",
        "Only historical data"
      ],
      "correct": 0,
      "explain": "Sensitivity analysis flexes one driver at a time to see its impact on outputs — revealing which assumptions matter most."
    },
    {
      "q": "Scenario planning differs from sensitivity analysis because it:",
      "options": [
        "Is the same thing",
        "Models coherent sets of assumptions (e.g., recession case) changing multiple drivers together",
        "Changes only one variable",
        "Only looks at the base case"
      ],
      "correct": 1,
      "explain": "Scenarios bundle multiple interrelated assumptions into coherent cases (base/upside/downside); sensitivity flexes one variable in isolation."
    },
    {
      "q": "The 'plan vs. actual vs. forecast' framework helps FP&A by:",
      "options": [
        "Eliminating budgets",
        "Forecasting cash only",
        "Comparing the original target, the latest expectation, and reality to drive insight and accountability",
        "Replacing the general ledger"
      ],
      "correct": 2,
      "explain": "Tracking all three lets FP&A explain where results stand against both the commitment (plan) and the latest view (forecast)."
    },
    {
      "q": "A capacity-driven cost in a driver-based model would be:",
      "options": [
        "Hourly wages",
        "Raw materials per unit",
        "Sales commissions",
        "A factory lease that's fixed until a capacity threshold is crossed (step cost)"
      ],
      "correct": 3,
      "explain": "Step/capacity costs stay fixed within a range then jump — modeling them requires capacity thresholds, not simple per-unit scaling."
    },
    {
      "q": "Beyond Budgeting philosophy advocates for:",
      "options": [
        "Replacing rigid annual budgets with adaptive, continuous management processes",
        "Larger annual budgets",
        "Eliminating all planning",
        "Budgeting only once per decade"
      ],
      "correct": 0,
      "explain": "Beyond Budgeting promotes adaptive targets, rolling forecasts, and decentralized decision-making over fixed annual budgets."
    },
    {
      "q": "A good forecast accuracy metric is:",
      "options": [
        "The CEO's gut feel",
        "Mean Absolute Percent Error (MAPE) or forecast bias tracking",
        "Always 100% — forecasts must be exact",
        "Net income only"
      ],
      "correct": 1,
      "explain": "MAPE and bias metrics quantify forecast quality over time, helping FP&A improve the process — perfection isn't the goal, calibration is."
    },
    {
      "q": "In a driver-based revenue forecast, revenue is typically modeled as:",
      "options": [
        "Last year × inflation",
        "A single lump sum",
        "Volume × Price (often by product/segment)",
        "Costs × margin"
      ],
      "correct": 2,
      "explain": "Driver-based revenue = units × average price, often segmented, so changes in volume or price can be modeled explicitly."
    },
    {
      "q": "The main risk of an overly detailed, bottom-up-only budget is:",
      "options": [
        "It's too accurate",
        "It ignores all detail",
        "It's always too low",
        "It can be slow, miss strategic priorities, and aggregate to an unrealistic total"
      ],
      "correct": 3,
      "explain": "Pure bottom-up can be time-consuming and may sum to a number disconnected from strategic/market reality — which is why most orgs blend top-down and bottom-up."
    },
    {
      "q": "A reforecast is typically triggered by:",
      "options": [
        "A material change in business conditions or a scheduled cadence (e.g., quarterly)",
        "Only the auditors",
        "Nothing ever changes it",
        "The end of the company"
      ],
      "correct": 0,
      "explain": "Reforecasts update the outlook on a regular cadence and when material events (demand shifts, cost shocks) make the prior view stale."
    }
  ],
  "variance": [
    {
      "q": "A favorable variance always means:",
      "options": [
        "Costs increased",
        "Actual was better than plan on that line — but it still requires root-cause understanding",
        "The company performed well in every sense",
        "Revenue increased"
      ],
      "correct": 1,
      "explain": "Favorable means actual beat plan directionally, but a favorable cost variance from under-delivering or cutting quality may be bad. Always investigate the driver."
    },
    {
      "q": "Price-Volume-Mix analysis decomposes a revenue variance into:",
      "options": [
        "Two components",
        "Tax effects",
        "Three components: how much you sold, what you charged, and what product mix you sold",
        "Only price"
      ],
      "correct": 2,
      "explain": "PVM isolates volume (units), price (rate per unit), and mix (shift among products with different margins) — each needs a different management response."
    },
    {
      "q": "The volume variance measures the impact of:",
      "options": [
        "Tax changes",
        "Product mix shifts",
        "Selling at different prices",
        "Selling more or fewer units than planned, holding price constant"
      ],
      "correct": 3,
      "explain": "Volume variance = (actual units − budget units) × budgeted price/margin, isolating the quantity effect."
    },
    {
      "q": "The price variance measures the impact of:",
      "options": [
        "Charging a different price than planned, holding volume constant",
        "Headcount",
        "Currency only",
        "Selling different quantities"
      ],
      "correct": 0,
      "explain": "Price variance = (actual price − budget price) × actual units, isolating the rate effect."
    },
    {
      "q": "A favorable mix variance occurs when:",
      "options": [
        "Costs rise",
        "The sales mix shifts toward higher-margin products",
        "Total units fall",
        "Prices drop"
      ],
      "correct": 1,
      "explain": "Mix variance is favorable when the proportion of higher-margin products in the sales mix increases, lifting blended margin."
    },
    {
      "q": "When comparing actual results, the most insightful FP&A comparison set is:",
      "options": [
        "Budget only",
        "Actual only",
        "Actual vs. Budget vs. Prior Year vs. Latest Forecast",
        "Prior year only"
      ],
      "correct": 2,
      "explain": "Triangulating against budget (the commitment), prior year (the trend), and forecast (the latest view) reveals the fullest story."
    },
    {
      "q": "A spending (rate) variance on a cost line isolates:",
      "options": [
        "Volume effects",
        "Revenue effects",
        "Tax effects",
        "The difference between actual and expected cost per unit of activity"
      ],
      "correct": 3,
      "explain": "Spending/rate variance compares actual cost to the flexible-budget cost at actual volume, isolating price/efficiency from volume."
    },
    {
      "q": "An efficiency variance measures:",
      "options": [
        "Whether you used more or fewer input units than the standard for the output achieved",
        "Currency moves",
        "Whether you paid the right price for inputs",
        "Revenue mix"
      ],
      "correct": 0,
      "explain": "Efficiency variance = (actual input quantity − standard quantity for actual output) × standard rate, isolating usage efficiency."
    },
    {
      "q": "Gross margin expanded 200bps YoY but the company raised prices 5%. A sharp analyst checks whether:",
      "options": [
        "Taxes changed",
        "Volume declined as customers resisted the price increase, offsetting the margin gain",
        "The margin is real",
        "The CEO approved it"
      ],
      "correct": 1,
      "explain": "Price-driven margin expansion can mask volume loss — the analyst decomposes via PVM to confirm the gain isn't hollow."
    },
    {
      "q": "The flexible budget variance is the difference between:",
      "options": [
        "Budget and prior year",
        "Cash and accrual",
        "Actual results and the flexible budget (budget flexed to actual volume)",
        "Forecast and plan"
      ],
      "correct": 2,
      "explain": "The flexible budget restates the plan at actual volume, so the remaining variance reflects price and efficiency, not volume."
    },
    {
      "q": "FX (currency) variance matters in variance analysis because:",
      "options": [
        "It only affects taxes",
        "It never matters",
        "It's the same as volume",
        "Translating foreign results at different rates changes reported figures independent of operational performance"
      ],
      "correct": 3,
      "explain": "Currency movement changes reported numbers without any operational change — FP&A often reports results 'at constant currency' to isolate true performance."
    },
    {
      "q": "A common pitfall in variance reporting is:",
      "options": [
        "Listing variances without explaining the 'why' (root cause) or the action",
        "Using bridges",
        "Comparing to forecast",
        "Explaining drivers"
      ],
      "correct": 0,
      "explain": "Reporting numbers without root cause and recommended action is just data, not analysis. FP&A adds value with the 'so what.'"
    },
    {
      "q": "If SG&A grows 20% while revenue grows 8%, the at-risk metric is:",
      "options": [
        "Tax rate",
        "Operating leverage (operating income growing slower than, or shrinking relative to, revenue)",
        "Gross margin",
        "Inventory"
      ],
      "correct": 1,
      "explain": "SG&A outpacing revenue erodes operating leverage — costs are scaling faster than the top line, compressing operating margin."
    },
    {
      "q": "Operating leverage describes:",
      "options": [
        "The dividend payout",
        "The amount of debt",
        "How fixed costs amplify the effect of revenue changes on operating income",
        "The tax shield"
      ],
      "correct": 2,
      "explain": "High operating leverage (large fixed-cost base) means small revenue changes drive proportionally larger operating income swings."
    },
    {
      "q": "A YoY 'walk' from prior-year revenue to current-year revenue would include drivers like:",
      "options": [
        "Only taxes",
        "Only total revenue",
        "Cash flow items",
        "Volume, price, mix, new products, FX, and acquisitions"
      ],
      "correct": 3,
      "explain": "A revenue walk attributes the YoY change to discrete, labeled drivers so leadership understands what moved the number."
    },
    {
      "q": "When a cost variance is favorable because a project was delayed (spend didn't happen yet), the correct framing is:",
      "options": [
        "Timing — the spend is likely to occur later, not a true reduction",
        "An efficiency win",
        "A volume gain",
        "A permanent savings"
      ],
      "correct": 0,
      "explain": "Timing variances reverse in future periods. Calling deferred spend a 'savings' misleads leadership — FP&A flags it as timing."
    },
    {
      "q": "Constant-currency reporting is used to:",
      "options": [
        "Replace GAAP",
        "Show operational performance by removing the effect of exchange rate movements",
        "Avoid taxes",
        "Inflate revenue"
      ],
      "correct": 1,
      "explain": "By holding FX rates constant, analysts reveal the underlying operational trend without currency noise."
    },
    {
      "q": "A negative cost variance (actual > budget) driven by higher volume is best explained as:",
      "options": [
        "A pricing error",
        "Poor cost control",
        "Largely volume-driven — more output naturally costs more; check unit economics held",
        "Fraud"
      ],
      "correct": 2,
      "explain": "If you produced/sold more, higher total variable cost is expected. The real question is whether cost-per-unit stayed in line — a flexible budget reveals this."
    },
    {
      "q": "The most valuable output of variance analysis for leadership is:",
      "options": [
        "A blame assignment",
        "A long list of numbers",
        "The raw ledger",
        "A concise narrative: what happened, why, the financial impact, and the recommended action"
      ],
      "correct": 3,
      "explain": "Leadership needs the synthesized story and a recommendation — the decision-useful 'so what,' not a data dump."
    },
    {
      "q": "Decomposing a margin decline, you find price held but input costs rose. This points to:",
      "options": [
        "A cost/efficiency problem (input inflation or usage), not a pricing problem",
        "A volume problem",
        "A tax problem",
        "A mix problem"
      ],
      "correct": 0,
      "explain": "Stable price with rising input cost isolates the issue to the cost side — input price inflation or efficiency loss — directing the right corrective action."
    }
  ],
  "workingcapital": [
    {
      "q": "The cash conversion cycle (CCC) measures:",
      "options": [
        "Revenue growth",
        "The days it takes to convert investments in inventory and receivables into cash, net of payables",
        "Total profit",
        "The tax rate"
      ],
      "correct": 1,
      "explain": "CCC = DIO + DSO − DPO. It's the number of days cash is tied up in operations before being recovered."
    },
    {
      "q": "Days Sales Outstanding (DSO) measures:",
      "options": [
        "How fast inventory sells",
        "How long you take to pay suppliers",
        "The average number of days to collect receivables after a sale",
        "Profit per day"
      ],
      "correct": 2,
      "explain": "DSO = (Accounts Receivable ÷ Revenue) × days. Lower DSO means faster collections and better cash flow."
    },
    {
      "q": "Days Payable Outstanding (DPO) measures:",
      "options": [
        "Days of cash on hand",
        "Collection speed",
        "Inventory turns",
        "The average days the company takes to pay its suppliers"
      ],
      "correct": 3,
      "explain": "DPO = (Accounts Payable ÷ COGS) × days. Higher DPO means you hold cash longer — favorable for working capital, within reason."
    },
    {
      "q": "Days Inventory Outstanding (DIO) measures:",
      "options": [
        "The average days inventory is held before being sold",
        "Days to pay suppliers",
        "Days to collect cash",
        "Days of payroll"
      ],
      "correct": 0,
      "explain": "DIO = (Inventory ÷ COGS) × days. Lower DIO means inventory moves faster, freeing up cash."
    },
    {
      "q": "To shorten the cash conversion cycle, a company could:",
      "options": [
        "Decrease DPO",
        "Reduce DSO, reduce DIO, and/or increase DPO",
        "Build more inventory",
        "Increase DSO"
      ],
      "correct": 1,
      "explain": "Collect faster (lower DSO), turn inventory faster (lower DIO), and pay suppliers slower (higher DPO) — all reduce the CCC."
    },
    {
      "q": "A rising DSO trend most likely signals:",
      "options": [
        "Faster collections",
        "Higher inventory",
        "Slower collections — possible credit/collection issues or customer stress",
        "Lower revenue"
      ],
      "correct": 2,
      "explain": "Climbing DSO means customers are paying more slowly, pressuring cash and possibly signaling collection or credit-quality problems."
    },
    {
      "q": "Free Cash Flow is most precisely defined as:",
      "options": [
        "EBITDA",
        "Revenue minus costs",
        "Net income",
        "Operating cash flow minus capital expenditures"
      ],
      "correct": 3,
      "explain": "FCF = Operating Cash Flow − Capex. It's the cash truly available to repay debt, pay dividends, or reinvest."
    },
    {
      "q": "A company with strong net income but weak operating cash flow likely has:",
      "options": [
        "Deteriorating working capital (e.g., ballooning receivables or inventory)",
        "No issues",
        "Low debt",
        "Too much cash"
      ],
      "correct": 0,
      "explain": "If profit isn't converting to cash, working capital is usually the culprit — receivables or inventory growing faster than collections."
    },
    {
      "q": "Why does a fast-growing company often have negative free cash flow despite being profitable?",
      "options": [
        "It pays too few taxes",
        "Growth consumes cash via working capital builds and capex ahead of collections",
        "It's unprofitable",
        "It has no customers"
      ],
      "correct": 1,
      "explain": "Rapid growth front-loads cash needs — inventory, receivables, and capacity investment — before the cash from that growth is collected."
    },
    {
      "q": "The quick ratio (acid test) differs from the current ratio by:",
      "options": [
        "Ignoring liabilities",
        "Using net income",
        "Excluding inventory (and prepaids) from current assets",
        "Including more assets"
      ],
      "correct": 2,
      "explain": "Quick ratio = (Current Assets − Inventory) ÷ Current Liabilities, a stricter liquidity test that excludes less-liquid inventory."
    },
    {
      "q": "An increase in accounts payable is, for cash flow, a:",
      "options": [
        "Financing outflow",
        "Non-cash item",
        "Use of cash",
        "Source of cash (you're holding cash longer by deferring payment)"
      ],
      "correct": 3,
      "explain": "Growing payables means you've recorded expenses/purchases but not yet paid — preserving cash, a source in the operating section."
    },
    {
      "q": "Negotiating extended payment terms with suppliers (higher DPO) improves working capital but risks:",
      "options": [
        "Damaging supplier relationships or losing early-payment discounts",
        "Lower revenue",
        "Nothing",
        "Higher taxes"
      ],
      "correct": 0,
      "explain": "Stretching payables helps cash but can strain suppliers and forfeit early-pay discounts — a balance FP&A weighs."
    },
    {
      "q": "A company offers customers a 2/10 net 30 discount. This is designed to:",
      "options": [
        "Defer revenue",
        "Accelerate collections (reduce DSO) by incentivizing early payment",
        "Raise prices",
        "Increase DSO"
      ],
      "correct": 1,
      "explain": "2/10 net 30 (2% off if paid in 10 days, else due in 30) incentivizes faster payment, reducing DSO and improving cash flow."
    },
    {
      "q": "Working capital intensity tends to be highest in which type of business?",
      "options": [
        "A service firm with no inventory",
        "A subscription software company collecting cash upfront",
        "A manufacturer holding inventory and extending customer credit",
        "A company paid in advance"
      ],
      "correct": 2,
      "explain": "Inventory-heavy manufacturers that also extend credit tie up the most cash in working capital; upfront-paid software has negative working capital."
    },
    {
      "q": "Negative working capital (current liabilities > current assets) is:",
      "options": [
        "Illegal",
        "Impossible",
        "Always a crisis",
        "Sometimes a sign of strength — e.g., businesses collecting cash before paying suppliers"
      ],
      "correct": 3,
      "explain": "Some strong businesses (e.g., retailers, subscriptions) run negative working capital by collecting from customers before paying suppliers — effectively financing operations with others' cash."
    },
    {
      "q": "Inventory turnover is calculated as:",
      "options": [
        "COGS ÷ Average Inventory",
        "Inventory ÷ COGS",
        "Net income ÷ Inventory",
        "Revenue ÷ Inventory"
      ],
      "correct": 0,
      "explain": "Inventory turnover = COGS ÷ Average Inventory. Higher turnover means inventory is sold and replenished more frequently."
    },
    {
      "q": "A sudden drop in DPO (paying suppliers faster) would:",
      "options": [
        "Improve cash position",
        "Consume cash and lengthen the cash conversion cycle",
        "Increase revenue",
        "Have no effect"
      ],
      "correct": 1,
      "explain": "Paying faster uses cash sooner, reducing DPO and lengthening the CCC — the opposite of a working-capital improvement."
    },
    {
      "q": "For FP&A forecasting, working capital is often projected using:",
      "options": [
        "Random guesses",
        "The tax rate",
        "Days-based ratios (DSO, DPO, DIO) applied to forecasted revenue/COGS",
        "Net income only"
      ],
      "correct": 2,
      "explain": "Forecasting AR via DSO, inventory via DIO, and AP via DPO links the balance sheet to the revenue/COGS forecast consistently."
    },
    {
      "q": "The biggest reason cash flow can diverge from EBITDA is:",
      "options": [
        "They never diverge",
        "Cash flow ignores revenue",
        "EBITDA includes cash",
        "Working capital changes, capex, interest, and taxes are excluded from EBITDA"
      ],
      "correct": 3,
      "explain": "EBITDA omits working-capital swings, capex, interest, and taxes — all of which hit actual cash. Hence EBITDA ≠ cash flow."
    },
    {
      "q": "A working capital 'release' of cash typically comes from:",
      "options": [
        "Reducing receivables/inventory or extending payables — shrinking the cash tied up in operations",
        "Paying dividends",
        "Building inventory",
        "Buying equipment"
      ],
      "correct": 0,
      "explain": "Freeing cash from working capital means collecting faster, holding less inventory, or paying slower — each releases trapped cash."
    }
  ],
  "valuation": [
    {
      "q": "Net Present Value (NPV) represents:",
      "options": [
        "Annual profit",
        "The present value of future cash flows minus the initial investment",
        "Total undiscounted cash flows",
        "The payback period"
      ],
      "correct": 1,
      "explain": "NPV discounts all future cash flows to today and subtracts the upfront cost. NPV > 0 means the project creates value."
    },
    {
      "q": "The decision rule for NPV is:",
      "options": [
        "Accept if NPV < 0",
        "Accept the lowest NPV",
        "Accept if NPV > 0 (it adds value)",
        "NPV doesn't drive decisions"
      ],
      "correct": 2,
      "explain": "A positive NPV means the investment returns more than the cost of capital — it creates shareholder value."
    },
    {
      "q": "Internal Rate of Return (IRR) is:",
      "options": [
        "Always equal to the WACC",
        "The payback period",
        "The risk-free rate",
        "The discount rate at which NPV equals zero"
      ],
      "correct": 3,
      "explain": "IRR is the discount rate that sets NPV to zero — the project's implied annualized return. Accept if IRR > the hurdle rate."
    },
    {
      "q": "When NPV and IRR conflict for mutually exclusive projects, you should generally rely on:",
      "options": [
        "NPV — it measures absolute value created",
        "Payback",
        "IRR",
        "A coin flip"
      ],
      "correct": 0,
      "explain": "NPV is the more reliable rule because it measures absolute dollar value added; IRR can mislead with different scales or non-conventional cash flows."
    },
    {
      "q": "The payback period measures:",
      "options": [
        "Total project profit",
        "How long until cumulative cash flows recover the initial investment",
        "The tax shield",
        "The discount rate"
      ],
      "correct": 1,
      "explain": "Payback is the time to recoup the upfront cost. Simple but ignores the time value of money and cash flows after payback."
    },
    {
      "q": "The main weakness of the simple payback period is that it:",
      "options": [
        "Always rejects good projects",
        "Requires a discount rate",
        "Ignores the time value of money and cash flows beyond the payback point",
        "Is too complex"
      ],
      "correct": 2,
      "explain": "Payback ignores discounting and any cash earned after the cutoff — so it can reject high-NPV long-horizon projects."
    },
    {
      "q": "WACC (Weighted Average Cost of Capital) is used as:",
      "options": [
        "The inflation rate",
        "The tax rate",
        "The growth rate",
        "The discount rate reflecting the blended required return of debt and equity"
      ],
      "correct": 3,
      "explain": "WACC blends the after-tax cost of debt and cost of equity by their capital weights — the standard discount rate for firm-level cash flows."
    },
    {
      "q": "Increasing the discount rate, all else equal, will:",
      "options": [
        "Decrease NPV (future cash flows are worth less today)",
        "Increase the payback period only",
        "Not affect NPV",
        "Increase NPV"
      ],
      "correct": 0,
      "explain": "A higher discount rate reduces the present value of future cash flows, lowering NPV."
    },
    {
      "q": "Unit economics analysis focuses on:",
      "options": [
        "The balance sheet only",
        "The profitability of a single unit/customer (e.g., contribution margin per unit, LTV vs. CAC)",
        "The tax return",
        "Total company profit"
      ],
      "correct": 1,
      "explain": "Unit economics examines the profit dynamics of one unit or customer — essential for scaling decisions (e.g., is each customer profitable?)."
    },
    {
      "q": "Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratio is healthy when it's roughly:",
      "options": [
        "Exactly 1:1",
        "Negative",
        "3:1 or higher (you earn well more than you spend to acquire)",
        "Below 1"
      ],
      "correct": 2,
      "explain": "A common benchmark is LTV:CAC of 3:1 — earning at least three times the acquisition cost over the customer's life indicates sustainable unit economics."
    },
    {
      "q": "Contribution margin equals:",
      "options": [
        "Net income",
        "Revenue − fixed costs",
        "Revenue − all costs",
        "Revenue − variable costs"
      ],
      "correct": 3,
      "explain": "Contribution margin = Revenue − Variable Costs. It's what's left to cover fixed costs and contribute to profit."
    },
    {
      "q": "The break-even point in units is calculated as:",
      "options": [
        "Fixed Costs ÷ Contribution Margin per Unit",
        "Fixed Costs ÷ Price",
        "Variable Costs ÷ Price",
        "Revenue ÷ Fixed Costs"
      ],
      "correct": 0,
      "explain": "Break-even units = Fixed Costs ÷ Contribution Margin per Unit — the volume at which total contribution covers fixed costs."
    },
    {
      "q": "A terminal value in a DCF captures:",
      "options": [
        "The tax liability",
        "The value of all cash flows beyond the explicit forecast period",
        "The initial investment",
        "The first year's cash flow"
      ],
      "correct": 1,
      "explain": "Terminal value estimates the business's value past the forecast horizon, often via a perpetuity growth or exit-multiple method — usually a large share of total DCF value."
    },
    {
      "q": "Capital rationing refers to:",
      "options": [
        "Unlimited investment funds",
        "Issuing unlimited equity",
        "Allocating limited capital across competing positive-NPV projects",
        "Cutting all capex"
      ],
      "correct": 2,
      "explain": "When capital is constrained, firms can't fund every good project, so FP&A ranks and selects to maximize total value created per dollar."
    },
    {
      "q": "The profitability index (PI) is useful for:",
      "options": [
        "Calculating taxes",
        "Setting prices",
        "Measuring liquidity",
        "Ranking projects by value created per dollar invested (PV of cash flows ÷ initial investment)"
      ],
      "correct": 3,
      "explain": "PI = PV of future cash flows ÷ initial investment. Under capital rationing, ranking by PI helps maximize value per scarce dollar."
    },
    {
      "q": "A sunk cost should be treated in a decision analysis as:",
      "options": [
        "Irrelevant — it's already incurred and shouldn't influence the forward decision",
        "A future cash flow",
        "Added to NPV",
        "A key factor to recover"
      ],
      "correct": 0,
      "explain": "Sunk costs are unrecoverable and must be excluded — only incremental future cash flows matter to the decision."
    },
    {
      "q": "Incremental cash flows for a project analysis include:",
      "options": [
        "Allocated corporate overhead that won't change",
        "Only the cash flows that change as a direct result of the decision",
        "Past R&D",
        "Sunk costs"
      ],
      "correct": 1,
      "explain": "Only incremental (differential) cash flows — those that actually change because of the project — belong in the analysis."
    },
    {
      "q": "Opportunity cost should be:",
      "options": [
        "Added to revenue",
        "Treated as a sunk cost",
        "Included — the value of the next-best forgone alternative is a real economic cost",
        "Ignored"
      ],
      "correct": 2,
      "explain": "Using a resource for one project means forgoing its best alternative use; that forgone value is a legitimate cost in the analysis."
    },
    {
      "q": "A higher perpetuity growth rate in a terminal value calculation will:",
      "options": [
        "Have no effect",
        "Only change taxes",
        "Lower the terminal value",
        "Raise the terminal value (and total DCF value)"
      ],
      "correct": 3,
      "explain": "Terminal value (Gordon growth) = CF × (1+g) ÷ (WACC − g). A higher g shrinks the denominator and raises terminal value — so it's a sensitive, scrutinized assumption."
    },
    {
      "q": "The fundamental principle linking all these tools is:",
      "options": [
        "A dollar today is worth more than a dollar tomorrow (time value of money)",
        "Ignore risk",
        "Cash doesn't matter",
        "Accounting profit is everything"
      ],
      "correct": 0,
      "explain": "Time value of money underpins NPV, IRR, DCF, and discounting generally — future cash must be discounted to compare it to today's dollars."
    }
  ]
};

export const getFPAQuestions = (moduleId, count) => {
  const bank = FPA_QUESTION_BANKS[moduleId] || [];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
};
