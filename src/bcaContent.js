// BCA Commercial Airplanes Contracts — deep lesson content
// Export: BCA_LESSON_CONTENT keyed by moduleId
// NOTE: Commercial aircraft pricing, escalation coefficients, discount levels,
// and pre-delivery payment schedules are confidential and contract-specific.
// All numeric examples below are ILLUSTRATIVE and rounded to teach mechanics —
// they are not actual Boeing figures. Review before sharing publicly.

export const BCA_LESSON_CONTENT = {
  // ════════════════════════════════════════════════════════════════
  market: {
    title: "The Commercial Aviation Market",
    subtitle: "Who buys aircraft, how the duopoly works, and the order-to-delivery machine that drives every contract.",
    blocks: [
      { type: "prose", text: "Before you can record a single contractual commitment, you have to understand the market that produces it. Commercial aircraft sales are unlike almost any other product: a handful of manufacturers sell multi-decade, multi-billion-dollar assets to a small, sophisticated set of buyers, under contracts negotiated over months or years and performed over a decade or more. The finance function sits in the middle of that machine." },

      { type: "heading", text: "The duopoly and its customers" },
      { type: "prose", text: "Large commercial jets are effectively a duopoly: Boeing and Airbus dominate aircraft above ~130 seats, with regional players (Embraer, and emerging entrants like COMAC) below that. Because there are only two real options for most fleets, every campaign is intensely competitive, and customers know it. That competitive structure is the single most important backdrop to BCA deal strategy — it shapes pricing, concessions, and the leverage on both sides." },
      { type: "terms", items: [
        { abbr: "OEM", full: "Original Equipment Manufacturer", desc: "The aircraft maker — Boeing Commercial Airplanes (BCA) or Airbus. Sells airframes; engines come from separate makers (GE, Rolls-Royce, Pratt & Whitney, CFM) and may be bought by the airline or bundled." },
        { abbr: "Airlines", full: "Operating carriers", desc: "Buy aircraft to fly routes. Range from global flag carriers to low-cost carriers (LCCs). Driven by fleet planning, route economics, and financing access." },
        { abbr: "Lessors", full: "Leasing companies", desc: "Buy aircraft to lease to airlines (AerCap, Air Lease, SMBC, Avolon). Now a huge share of orders — they provide airlines flexibility and off-balance-sheet fleet, and they place large speculative orders." },
      ] },
      { type: "callout", variant: "insight", title: "Lessors changed the game", body: "Leasing companies now account for a large fraction of the global order book. They buy in bulk, negotiate hard on price, and resell delivery slots. For a contracts analyst, a lessor deal looks different from an airline deal — different credit profile, different financing needs, and often different commitment structures." },

      { type: "heading", text: "Order to delivery: the core cycle" },
      { type: "prose", text: "An aircraft sale moves through distinct stages, and each stage means something different financially. A signed order is a binding commitment, but cash and revenue arrive years later at delivery. Understanding where a deal sits in this cycle tells you what's been promised, what's been collected, and what's been earned." },
      { type: "list", items: [
        "Campaign / negotiation — the OEM competes for the deal; nothing is booked.",
        "Firm order — a binding Purchase Agreement is signed; the order enters backlog. Pre-delivery payments begin.",
        "Backlog — the order sits as a future obligation to build and deliver; can span years.",
        "Production & pre-delivery — the aircraft is built; the customer makes scheduled pre-delivery payments (PDPs).",
        "Delivery — title and risk transfer to the customer, the balance is paid, and revenue is recognized.",
      ] },
      { type: "terms", items: [
        { abbr: "Backlog", full: "Unfilled firm orders", desc: "The dollar value (and unit count) of firm orders not yet delivered. A key disclosed metric — it represents future revenue under contract. Often expressed as years of production." },
        { abbr: "Book-to-bill", full: "Orders ÷ Deliveries", desc: "Net new orders divided by deliveries in a period. Above 1.0 means backlog is growing; below 1.0 means it's shrinking. A health indicator for the franchise." },
        { abbr: "Skyline", full: "The delivery stream", desc: "The forward schedule of which aircraft deliver to which customer in which slot. Managing the skyline — slots, swaps, deferrals — is central to contracts and production planning." },
      ] },
      { type: "callout", variant: "key", title: "An order is not revenue", body: "A firm order is a binding commitment and goes into backlog, but it is NOT revenue and produces almost no immediate cash beyond the deposit. Revenue is recognized at delivery, often years later. Confusing 'orders' with 'sales/revenue' is the most common conceptual error for people new to BCA." },

      { type: "heading", text: "The product families" },
      { type: "prose", text: "Deals are organized around aircraft families, and the family matters for price, delivery timing, and strategic positioning. Broadly, narrowbodies (single-aisle, like the 737 family) serve high-volume short/medium-haul routes; widebodies (twin-aisle, like the 777 and 787) serve long-haul and high-capacity routes. Narrowbodies sell in huge volumes at lower unit prices; widebodies sell in smaller numbers at much higher unit prices. The economics, lead times, and negotiation dynamics differ accordingly." },
      { type: "callout", variant: "warning", title: "Don't reason about a widebody deal like a narrowbody deal", body: "A 200-unit narrowbody order from an LCC and a 20-unit widebody order from a flag carrier can have similar headline value but completely different unit pricing, concession structures, delivery cadence, and financing needs. Always anchor on the family and customer type before interpreting a deal." },

      { type: "heading", text: "Where finance sits" },
      { type: "prose", text: "Contracts finance is the bridge between the commercial deal and the financial systems. When a deal is signed, finance must translate dense legal terms — base prices, escalation formulas, payment schedules, concessions, options, financing commitments — into accurate entries in the systems that drive backlog reporting, revenue recognition, cash forecasting, and disclosure. Errors here ripple into earnings and investor reporting, which is exactly why the role demands rigor." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  dealstrategy: {
    title: "Sales Campaigns & Deal Strategy",
    subtitle: "How a campaign is won — competitive dynamics, customer economics, the deal desk, and the handoff to contracts.",
    blocks: [
      { type: "prose", text: "A commercial aircraft campaign is a high-stakes, months-to-years sales process where Boeing and Airbus compete for a customer's fleet decision. Winning isn't just about the lowest price — it's about matching the customer's network economics, financing needs, delivery timing, and risk tolerance better than the competitor. Understanding deal strategy lets a contracts analyst see why the terms ended up the way they did." },

      { type: "heading", text: "The campaign lifecycle" },
      { type: "list", items: [
        "Capture / qualification — identify the opportunity, the customer's fleet plan, and the competitive situation.",
        "RFP & positioning — the customer issues requirements; the OEM positions its aircraft against the rival's on economics and capability.",
        "Offer & negotiation — price, delivery slots, concessions, financing, and product support are negotiated, often in multiple rounds.",
        "Selection & MOU/LOI — the customer selects; a non-binding memorandum or letter of intent may precede the binding contract.",
        "Definitive agreement — the binding Purchase Agreement is executed and the order is announced and booked into backlog.",
      ] },

      { type: "heading", text: "What the customer is actually buying" },
      { type: "prose", text: "Airlines don't buy aircraft for their own sake — they buy seat-mile economics. The decision turns on how an aircraft performs on the customer's specific routes: fuel burn, range, payload, maintenance cost, commonality with the existing fleet (shared pilot type ratings and spares), and residual value. A strong campaign translates the aircraft's capabilities into the customer's network and balance sheet." },
      { type: "terms", items: [
        { abbr: "CASM", full: "Cost per Available Seat Mile", desc: "The airline's cost to fly one seat one mile. Aircraft choice directly drives CASM through fuel burn, capacity, and maintenance — the core economic argument in a campaign." },
        { abbr: "Commonality", full: "Fleet commonality", desc: "Shared systems, cockpits, and type ratings across a family reduce training, spares, and crewing costs. A powerful lock-in: a 737 operator faces switching costs to move to Airbus." },
        { abbr: "Fleet planning", full: "Customer fleet strategy", desc: "The airline's multi-year plan for growth, replacement, and route mix. The OEM's job is to map its products and delivery slots onto that plan." },
      ] },
      { type: "callout", variant: "insight", title: "Switching costs are leverage — both ways", body: "An existing Boeing operator has real switching costs (training, spares, commonality), which is leverage for the OEM. But a credible threat to switch to Airbus is the customer's leverage. Most campaigns are a negotiation around exactly how much that incumbency is worth in price and concessions." },

      { type: "heading", text: "The competitive offer: more than price" },
      { type: "prose", text: "Because it's a duopoly, the rival's offer is always in the room. Sales teams compete across multiple dimensions, trading among them to assemble a winning package without simply giving away price. The art is to concede on what's cheap to the OEM but valuable to the customer." },
      { type: "list", items: [
        "Price and concessions (credit memos, discounts off list).",
        "Delivery slots — timing can be worth more than price to a growing airline.",
        "Financing support — backstop commitments, lease arrangements, or help securing financing.",
        "Product support — spares, training, tooling, and entry-into-service support credits.",
        "Performance guarantees — committing to fuel burn, range, payload, dispatch reliability.",
        "Flexibility — options, purchase rights, conversion rights between models, and reschedule rights.",
      ] },
      { type: "callout", variant: "key", title: "The deal desk and ATO", body: "Major deals are structured and approved through a disciplined process — pricing analysis, profitability review, and internal authorization (an Authority to Offer / Authorization to Proceed) before terms are committed. Finance is integral: it models the deal's economics and commitments so leadership approves with eyes open." },

      { type: "heading", text: "Profitability: campaign vs. program lens" },
      { type: "prose", text: "A single deal's profitability isn't judged in isolation. A steeply discounted launch order might be accepted because it anchors a new model, fills early production slots, or wins a strategic customer — value that accrues at the program level over hundreds of future units. Deal strategy constantly trades near-term margin for long-term franchise position." },
      { type: "callout", variant: "warning", title: "Beware the headline order value", body: "Announced orders are typically quoted at list prices, which can be dramatically higher than actual transaction prices after concessions. The disclosed backlog and the real economics are based on negotiated prices, not list. Never take a press-release dollar figure as the deal's true value." },

      { type: "heading", text: "The handoff to contracts" },
      { type: "prose", text: "When a campaign closes, the commercial intent must become a precise, executable contract — and then accurate entries in the financial systems. This is where your rotation lives: ensuring the negotiated base prices, escalation provisions, payment schedules, concessions, options, and any financing commitments are captured correctly, so backlog, revenue, and cash all reflect reality. A great deal poorly recorded becomes a reporting and audit problem." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  purchaseagreement: {
    title: "The Aircraft Purchase Agreement",
    subtitle: "The anatomy of the contract — the definitive agreement, letter agreements, exhibits, and the firm/option/right structure.",
    blocks: [
      { type: "prose", text: "The Aircraft Purchase Agreement (often just 'the PA') is the binding contract governing the sale. It is not one document but a layered set: a core agreement plus exhibits and a stack of letter agreements that carry the commercially sensitive terms. Reading a PA correctly — knowing what lives where — is a core contracts-finance skill." },

      { type: "heading", text: "The document architecture" },
      { type: "terms", items: [
        { abbr: "PA", full: "Purchase Agreement", desc: "The core binding contract: parties, aircraft model(s) and quantities, delivery schedule, base prices, payment terms, warranties, and the framework for everything else." },
        { abbr: "LA", full: "Letter Agreement", desc: "Supplemental agreements attached to the PA that carry specific terms — often the confidential commercial ones (concessions, special pricing, financing, performance guarantees). 'Business considerations' letters are typically the most sensitive." },
        { abbr: "Exhibit / Spec", full: "Aircraft Configuration & Specification", desc: "Defines exactly what's being built — the detailed aircraft specification, configuration, and any customer options to the standard build." },
      ] },
      { type: "callout", variant: "insight", title: "The sensitive terms hide in the letter agreements", body: "The headline PA can look standard; the real economics — discounts, credits, escalation tweaks, financing, guarantees — usually sit in letter agreements. When you reconcile a deal to the systems, the LAs are where the money is. Read them carefully." },

      { type: "heading", text: "Firm orders vs. options vs. rights" },
      { type: "prose", text: "Not all 'orders' are equal. The contract distinguishes between firm commitments and various flexibility instruments, and the distinction is critical for backlog, revenue, and disclosure — only firm orders are backlog." },
      { type: "table", headers: ["Instrument", "What it is", "Counts as backlog?"], rows: [
        ["Firm order", "Binding commitment to buy specific aircraft at agreed terms and slots", "Yes"],
        ["Option", "Right (not obligation) to buy more at pre-agreed price/terms, with a defined exercise window and reserved or priority slots", "No — until exercised"],
        ["Purchase right", "Weaker than an option — right to buy if slots are available, often without firm pre-agreed slots", "No"],
        ["Rolling option", "Option whose delivery slot advances over time as firm deliveries occur", "No — until converted to firm"],
      ] },
      { type: "callout", variant: "key", title: "Only firm orders are backlog", body: "Options and purchase rights are flexibility for the customer, not commitments to buy. They are NOT counted in firm backlog and produce no revenue until exercised and converted to firm orders. Miscounting options as backlog overstates a core disclosed metric — a serious error." },
      { type: "terms", items: [
        { abbr: "Conversion rights", full: "Model/variant conversion", desc: "The right to convert an order from one model to another within a family (e.g., a smaller variant to a larger one) within limits — valuable flexibility that affects pricing and slots." },
        { abbr: "Reschedule rights", full: "Delivery reschedule", desc: "Contractual ability to move delivery dates within bounds. Deferrals and accelerations affect the skyline, cash timing, and sometimes price escalation." },
      ] },

      { type: "heading", text: "Key commercial provisions to find" },
      { type: "list", items: [
        "Aircraft, quantities, and the delivery schedule (the slots).",
        "Base price per aircraft and the escalation provision (covered in the Pricing module).",
        "Advance payment / pre-delivery payment schedule (the deposit ladder).",
        "Concessions and credit memos — discounts, often delivered as credits applied at or before delivery.",
        "Performance guarantees and remedies (weight, range, fuel burn, reliability) and what happens if they're missed.",
        "Buyer-Furnished vs. Seller-Furnished Equipment (BFE/SFE) responsibilities.",
        "Termination, default, and excusable-delay provisions and their financial consequences.",
        "Product support: spares, training, and entry-into-service commitments.",
      ] },
      { type: "terms", items: [
        { abbr: "BFE", full: "Buyer-Furnished Equipment", desc: "Items the customer selects and supplies for installation — often seats, galleys, and in-flight entertainment. Procurement and timing risk sits partly with the buyer; late BFE can disrupt the build." },
        { abbr: "SFE", full: "Seller-Furnished Equipment", desc: "Equipment the OEM provides as part of the aircraft. The buyer/seller split affects price, responsibility, and delivery readiness." },
      ] },

      { type: "heading", text: "Why structure drives the financials" },
      { type: "prose", text: "Every element above maps to a financial treatment: firm quantities and prices drive backlog; the payment schedule drives cash and contract-liability accounting; concessions reduce transaction price; performance guarantees and termination rights create contingencies. The contracts-finance job is to read the structure precisely and ensure each element lands correctly in the systems. The next modules take the most financially consequential pieces — pricing, negotiation terms, commitments, and revenue — in depth." },
      { type: "callout", variant: "warning", title: "A misread structure is a misstatement", body: "Treating an option as firm, missing a concession buried in a letter agreement, or mis-scheduling a deferral doesn't just create a planning error — it can misstate backlog, revenue timing, or cash forecasts that feed external reporting. Precision in reading the PA is a control, not a nicety." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  pricing: {
    title: "Pricing & Escalation",
    subtitle: "List vs. net price, the escalation formula, concessions and credit memos, and the pre-delivery payment ladder.",
    blocks: [
      { type: "prose", text: "Pricing is where the deal's economics become numbers in a contract — and where contracts finance earns its keep. An aircraft price is not a single figure: there is a published list price almost no one pays, a negotiated net price after concessions, and an escalation mechanism that adjusts the price between contract signing and delivery years later. Getting all three right is essential to recording the deal correctly." },

      { type: "heading", text: "List price vs. transaction price" },
      { type: "prose", text: "OEMs publish list prices, but actual transaction prices are negotiated far below list and are confidential. Concessions — discounts and credits — bridge the gap. The disclosed backlog and the revenue you eventually recognize are based on negotiated net prices, never list. The list price is mostly a reference point and a marketing anchor." },
      { type: "terms", items: [
        { abbr: "List price", full: "Published reference price", desc: "The OEM's catalog price. Rarely the price actually paid; used for reference and headline order announcements. Heavily discounted in practice." },
        { abbr: "Net price", full: "Negotiated transaction price", desc: "List price less concessions and credits. The real economic price that drives backlog value and revenue. Confidential." },
        { abbr: "Concession", full: "Price discount / credit", desc: "Value given to win the deal — often delivered as credit memos applied to the price (or to spares, training, etc.) rather than a lower headline price." },
      ] },
      { type: "callout", variant: "warning", title: "Never reconcile to list", body: "If you tie a deal's recorded value to list prices, you will dramatically overstate it. Concessions and credit memos can move the effective price far below list. Always work from the negotiated net price in the letter agreements." },

      { type: "heading", text: "Escalation: pricing across time" },
      { type: "prose", text: "Aircraft are priced years before they're built. To handle inflation in labor and materials between contract signing and delivery, prices are stated as a base price in a base economic period, then adjusted to delivery-period dollars by an escalation formula tied to published economic indices. The customer agrees to a formula, not a fixed final price — so the delivered price moves with the indices." },
      { type: "callout", variant: "key", title: "The escalation formula, conceptually", body: "Escalated Price = Base Price × Escalation Factor. The Escalation Factor is a weighted blend of a labor index (historically a U.S. aerospace Employment Cost Index) and a materials index (a producer price index), each measured relative to its base-period value, with agreed weightings. As the indices rise between base period and delivery, the factor rises above 1.0 and the delivered price increases." },
      { type: "example", title: "Illustrative escalation (not actual coefficients)", intro: "Suppose a base price of $50.0M in base-period dollars, with a formula weighted 65% labor / 35% materials.", steps: [
        "Labor index moved from 100.0 (base) to 112.0 at delivery → ratio 1.120",
        "Materials index moved from 100.0 (base) to 108.0 at delivery → ratio 1.080",
        "Escalation Factor = 0.65 x 1.120 + 0.35 x 1.080 = 0.728 + 0.378 = 1.106",
        "Escalated Price = $50.0M x 1.106 = $55.3M",
      ], result: "The delivered price is ~$55.3M — about $5.3M above the base price purely from escalation. Real formulas use specific indices, lags, and coefficients defined in the contract; this only shows the mechanic." },
      { type: "callout", variant: "insight", title: "Escalation is a forecasting and risk item", body: "Because the final price depends on future index values, finance must forecast escalation to project revenue and watch the exposure. Customers sometimes negotiate escalation caps or fixed-price arrangements that shift index risk back to the OEM — a term you must capture, because it changes how you forecast and recognize price." },

      { type: "heading", text: "Concessions and credit memos" },
      { type: "prose", text: "Rather than simply lowering the headline price, OEMs often grant value through credit memos — credits the customer can apply at or before delivery (against the aircraft price, spares, training, or other goods/services). Economically these are price reductions, and under revenue accounting they reduce the transaction price. Tracking each concession, its trigger, and its application is a core recording task." },
      { type: "callout", variant: "warning", title: "Concessions reduce revenue — record them where they belong", body: "A credit memo applied against the aircraft reduces the aircraft's transaction price; one applied against future spares or services may allocate elsewhere. Mis-recording concessions distorts both the aircraft margin and the timing of revenue. This is exactly the kind of complex commitment the rotation focuses on getting right." },

      { type: "heading", text: "The pre-delivery payment (PDP) ladder" },
      { type: "prose", text: "Customers don't pay everything at delivery. They make pre-delivery payments (also called advance payments) on a schedule — a deposit at signing, then installments at defined milestones before delivery — with the balance due at delivery. PDPs partially fund production and signal commitment. The OEM holds this customer cash in advance of delivering anything." },
      { type: "example", title: "Illustrative PDP schedule (not actual terms)", intro: "On a $55M delivered-price aircraft, a simplified deposit ladder building to ~30% before delivery might look like:", steps: [
        "At signing: 1% = $0.55M",
        "24 months before delivery: +4% = $2.2M",
        "21 / 18 / 12 / 9 / 6 months before: staged installments summing to ~25%",
        "Cumulative pre-delivery: ~30% = ~$16.5M collected before delivery",
        "At delivery: remaining ~70% = ~$38.5M",
      ], result: "By delivery the customer has paid in full; ~30% arrived in advance as PDPs. Actual percentages and milestones are contract-specific and confidential." },
      { type: "callout", variant: "key", title: "PDPs are NOT revenue — they're a liability", body: "Cash received before delivery is not earned. It is recorded as a contract liability (advance payments / deferred) until control of the aircraft transfers at delivery. Treating PDP cash as revenue is a classic and serious error. The Revenue Recognition module covers this in depth." },

      { type: "heading", text: "Putting price together" },
      { type: "prose", text: "The price you ultimately record and recognize is: base price, escalated to the delivery period via the contractual formula, reduced by applicable concessions/credits, with PDP cash carried as a liability until delivery. Each piece lives in a different place in the contract and must be captured precisely so backlog value, revenue, and cash forecasts all reconcile." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  negotiation: {
    title: "Negotiation & Commercial Terms",
    subtitle: "The levers, the trade-offs, performance guarantees and remedies, and the terms that protect both sides.",
    blocks: [
      { type: "prose", text: "Negotiation is where price meets everything else. In a duopoly with a sophisticated buyer, the winning package is rarely the cheapest — it's the best-assembled trade across price, timing, flexibility, financing, support, and risk. A contracts analyst who understands the levers can read why a deal is structured as it is and anticipate where the financial commitments sit." },

      { type: "heading", text: "The negotiation levers" },
      { type: "prose", text: "Each lever has a different cost to the OEM and a different value to the customer. The skill is conceding on items cheap to give but valuable to receive, and holding firm where the OEM's cost is high." },
      { type: "list", items: [
        "Price and concessions — the most visible lever, but often the last resort because it directly hits margin.",
        "Delivery slots — earlier slots can be worth more than price to an airline racing to grow or replace aging aircraft.",
        "Flexibility — options, purchase rights, conversion and reschedule rights let the customer manage uncertainty.",
        "Financing support — backstop commitments or help arranging financing can clinch a deal for a credit-constrained buyer.",
        "Product support — spares packages, training, tooling, and entry-into-service credits.",
        "Performance guarantees — committing to capability metrics, with remedies if missed.",
      ] },
      { type: "callout", variant: "insight", title: "Trade non-price value first", body: "A delivery-slot swap, a training credit, or added option flexibility may cost the OEM little but be highly valued by the customer. Skilled negotiators exhaust these before touching headline price, protecting margin while still building a winning package." },

      { type: "heading", text: "Performance guarantees and remedies" },
      { type: "prose", text: "Customers buy promised capability, so contracts include performance guarantees — commitments on metrics like operating empty weight, range, payload, fuel burn, and dispatch reliability. If the delivered aircraft misses a guarantee, the contract specifies remedies, which can range from price credits to, in severe cases, rejection rights. These guarantees are real financial exposures the OEM carries." },
      { type: "terms", items: [
        { abbr: "Perf. guarantee", full: "Performance guarantee", desc: "A contractual commitment that the aircraft will meet specified capability metrics. Missing them triggers remedies — usually compensation, occasionally rejection rights." },
        { abbr: "Liquidated damages", full: "LDs", desc: "Pre-agreed amounts payable for defined breaches — most commonly late delivery beyond an excusable-delay window. They cap and quantify the OEM's exposure for that breach." },
        { abbr: "Excusable delay", full: "Excusable-delay clause", desc: "Defines delays that don't trigger penalties (e.g., force majeure, certain customer-caused delays). The boundary between excusable and inexcusable delay is heavily negotiated and financially significant." },
      ] },
      { type: "callout", variant: "warning", title: "Guarantees and LDs are contingent liabilities", body: "Performance shortfalls and late deliveries can create real obligations to pay credits or liquidated damages. These contingencies must be identified at contracting and tracked, because they may require accrual and disclosure if they become probable and estimable." },

      { type: "heading", text: "Protective and pricing-related clauses" },
      { type: "terms", items: [
        { abbr: "MFC clause", full: "Most-Favored-Customer", desc: "A commitment that the customer won't receive worse terms than comparable customers on comparable deals. Powerful for the buyer and a constraint the OEM must honor across deals — mis-tracking it can create cross-deal liabilities." },
        { abbr: "Escalation cap", full: "Escalation cap / fixed price", desc: "Limits how much the escalation formula can raise the price, shifting index risk to the OEM. Changes how finance forecasts and recognizes price." },
        { abbr: "Termination / default", full: "Termination provisions", desc: "Define each party's rights and consequences on default — including treatment of PDPs already paid, remarketing of the aircraft, and damages." },
      ] },

      { type: "heading", text: "Termination and the fate of PDPs" },
      { type: "prose", text: "If a customer defaults or a deal terminates, the contract governs what happens to pre-delivery payments, the delivery slot, and damages. Depending on terms and cause, PDPs may be forfeited, refundable, or offset against damages, and the OEM may remarket the slot or aircraft. These outcomes have direct financial-statement consequences, so the termination terms must be understood when the commitment is recorded — not discovered later." },
      { type: "callout", variant: "key", title: "Capture the terms, not just the price", body: "The negotiated price is only part of the deal. Performance guarantees, LDs, MFC clauses, escalation caps, flexibility instruments, and termination rights all carry financial consequences and must be captured in the systems and surfaced for accounting and disclosure. The rotation is fundamentally about translating these complex terms into accurate records." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  commitments: {
    title: "Contractual Commitments & Customer Financing",
    subtitle: "Backstop financing, residual value and asset guarantees, trade-ins, contingent liabilities, and recording them right.",
    blocks: [
      { type: "prose", text: "Selling an aircraft can mean taking on obligations far beyond building and delivering it. To win deals, OEMs sometimes commit to help the customer finance the purchase or to protect the aircraft's future value. These commitments can create contingent liabilities that don't show as debt but represent real risk — and accurately identifying, recording, and disclosing them is precisely the heart of this rotation." },

      { type: "heading", text: "Why financing commitments exist" },
      { type: "prose", text: "Aircraft are enormously expensive, and not every customer can readily finance a large order, especially weaker-credit airlines or in tight financing markets. To close deals, the OEM may stand behind the customer's financing in various ways. These are competitive tools — but each one is a promise that can cost money later." },
      { type: "terms", items: [
        { abbr: "Backstop financing", full: "Financing commitment", desc: "A commitment to provide or arrange financing if the customer can't secure it on their own by delivery. It de-risks the deal for the customer and creates a contingent funding obligation for the OEM." },
        { abbr: "RVG", full: "Residual Value Guarantee", desc: "A promise that an aircraft will be worth at least a set value at a future date. If market value falls below the guaranteed level, the OEM pays the shortfall — exposure to used-aircraft values." },
        { abbr: "AVG", full: "Asset Value Guarantee", desc: "Similar to an RVG — a guarantee of an asset's value at a point in time, protecting the customer or financier against value decline." },
        { abbr: "Trade-in", full: "Trade-in commitment", desc: "Agreeing to take the customer's existing aircraft in trade, often at a set value. The OEM bears the risk of remarketing that used aircraft at or above the trade-in value." },
      ] },
      { type: "callout", variant: "insight", title: "These commitments win deals — and carry tails", body: "Backstops, RVGs, and trade-ins can be decisive in a campaign, but they create exposures that can persist for years after delivery and depend on uncertain future market values. Finance must quantify and track them long after the sale is booked." },

      { type: "heading", text: "Contingent liabilities and how they behave" },
      { type: "prose", text: "Many of these commitments are contingent — they only cost money if certain conditions occur (the customer can't finance, values fall below a guarantee, a trade-in can't be remarketed at value). Accounting for contingencies depends on likelihood and estimability: some are disclosed, some are accrued, and the classification can change as conditions evolve." },
      { type: "table", headers: ["Likelihood", "Estimable?", "Typical treatment"], rows: [
        ["Probable", "Reasonably estimable", "Accrue a liability and expense"],
        ["Probable", "Not estimable", "Disclose; accrue when estimable"],
        ["Reasonably possible", "Either", "Disclose the nature and range"],
        ["Remote", "Either", "Generally no accrual or disclosure"],
      ] },
      { type: "callout", variant: "warning", title: "A commitment unrecorded is a future surprise", body: "If a financing or value guarantee isn't captured when the deal is signed, it can surface later as an unanticipated charge or a disclosure gap. Identifying these at contracting and recording them in the systems — with their triggers and exposure — is the control that prevents nasty surprises. This is the rotation's core mandate." },

      { type: "heading", text: "Recording commitments in the financial systems" },
      { type: "prose", text: "The practical task: when a deal closes, translate every commitment — firm order value, payment schedule, concessions, performance guarantees/LDs, MFC obligations, and any financing or value guarantees — into accurate, complete entries in the BCA financial systems. These records feed backlog, revenue recognition, cash forecasting, contingency tracking, and disclosure. The rotation explicitly targets an enhanced approach to doing this efficiently and accurately, including new tools and process improvements." },
      { type: "list", items: [
        "Firm orders → backlog value and units (net negotiated price, escalated).",
        "PDP schedule → expected cash inflows and contract-liability build-up.",
        "Concessions/credits → reductions to transaction price, recorded where they apply.",
        "Performance guarantees / LDs → contingency tracking; accrual if probable and estimable.",
        "Financing commitments / RVGs / trade-ins → contingent liability identification, exposure quantification, and disclosure.",
        "Options / rights → tracked separately from firm backlog; not revenue until exercised.",
      ] },
      { type: "callout", variant: "key", title: "Accuracy and completeness are the whole game", body: "The financial integrity of backlog, revenue, cash, and disclosure all depend on these records being accurate AND complete. A missed commitment or a mis-keyed price doesn't stay local — it flows into reported results. Efficient, well-controlled recording of complex commitments is both the rotation's purpose and a genuine enterprise risk control." },

      { type: "heading", text: "Disclosure obligations" },
      { type: "prose", text: "Several of these items must be disclosed externally: firm backlog, purchase and other contractual obligations, and material financing commitments and guarantees. Investors and regulators rely on these disclosures to understand future revenue and off-balance-sheet exposure. The accuracy of disclosure traces directly back to how well commitments were recorded at the source — which is where you sit." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  revrec: {
    title: "Revenue Recognition & Delivery",
    subtitle: "ASC 606 for aircraft — performance obligations, control transfer at delivery, contract liabilities, and variable consideration.",
    blocks: [
      { type: "prose", text: "All the contract terms eventually resolve into one question: when and how much revenue does Boeing recognize? For commercial aircraft, the answer is governed by ASC 606, and it hinges on a single moment — the transfer of control at delivery. Everything before that is a build-up of obligations and advance cash; everything is earned at the point control passes." },

      { type: "heading", text: "The five-step model, applied to aircraft" },
      { type: "list", items: [
        "1. Identify the contract — the executed Purchase Agreement and its letter agreements.",
        "2. Identify performance obligations — typically each aircraft is a distinct obligation; spares, training, and support may be separate obligations.",
        "3. Determine the transaction price — net negotiated price, escalated, less concessions; estimate variable consideration.",
        "4. Allocate the price to the obligations — across aircraft and any distinct goods/services.",
        "5. Recognize revenue as/when obligations are satisfied — for an aircraft, at the point in time control transfers (delivery).",
      ] },

      { type: "heading", text: "Point-in-time recognition at delivery" },
      { type: "prose", text: "An aircraft sale is recognized at a point in time, not over time — Boeing recognizes the aircraft's revenue when control transfers to the customer, which generally occurs at delivery: the customer accepts the aircraft, title and risk pass, and the customer can direct its use and obtain its benefits. Until that moment, no aircraft revenue is recognized, regardless of how much has been built or paid." },
      { type: "callout", variant: "key", title: "Control transfer is the trigger", body: "Indicators of control transfer include the customer's acceptance, transfer of legal title, transfer of physical possession, transfer of risks and rewards, and a present right to payment. For aircraft these align at delivery — so delivery is the revenue event. Production progress and PDP cash do not create revenue." },

      { type: "heading", text: "Contract liabilities: the PDP build-up" },
      { type: "prose", text: "Pre-delivery payments are cash received before the performance obligation is satisfied, so they are recorded as a contract liability (advance payments / deferred revenue) on the balance sheet — not revenue. As each aircraft delivers, the related advance payments are applied against the now-recognized revenue and the liability is relieved. This is why a healthy order book can sit alongside large advance-payment liabilities." },
      { type: "callout", variant: "warning", title: "Cash in does not equal revenue", body: "It is entirely normal to hold large amounts of customer cash (PDPs) as a liability while recognizing zero revenue on those aircraft. Anyone who equates advance-payment cash with earnings will misread the financials. Revenue waits for delivery." },

      { type: "heading", text: "Variable consideration: escalation and concessions" },
      { type: "prose", text: "The transaction price isn't fully fixed at signing — escalation moves it with indices, and some concessions or credits depend on future events. ASC 606 requires estimating this variable consideration and including it in the transaction price, but constrained so that a significant reversal of recognized revenue is not probable. Finance must estimate escalation and the effect of concessions to set the price recognized at delivery." },
      { type: "terms", items: [
        { abbr: "Variable consideration", full: "Uncertain price elements", desc: "Parts of the price that depend on future outcomes — escalation indices, certain concessions, performance credits. Estimated and constrained under ASC 606." },
        { abbr: "Constraint", full: "Revenue constraint", desc: "Variable consideration is included only to the extent it's highly probable a significant reversal won't occur — a guardrail against recognizing uncertain amounts too early." },
        { abbr: "SFC", full: "Significant Financing Component", desc: "When the timing of payments versus delivery provides one party meaningful financing, ASC 606 may require adjusting revenue for the time value of money. Long PDP-to-delivery gaps make this an assessment point." },
      ] },

      { type: "heading", text: "Options, material rights, and warranties" },
      { type: "prose", text: "Options and purchase rights generally aren't performance obligations until exercised — but if an option was effectively sold at a discount (a 'material right'), some consideration may be allocated to it. Warranties also matter: an assurance-type warranty (the aircraft meets spec) is a cost accrual, while a service-type warranty (extra services sold) can be a separate performance obligation. These distinctions affect how and when revenue is recognized." },
      { type: "callout", variant: "insight", title: "The contract terms drive the accounting", body: "Whether an option carries a material right, whether a concession is variable consideration, whether there's a significant financing component — all of it traces back to the negotiated terms. This is why accurate recording of the deal (the previous modules) is the foundation revenue recognition is built on." },

      { type: "heading", text: "Delivery, title, and the close of the deal" },
      { type: "prose", text: "At delivery, the aircraft is accepted, title transfers, the final payment is received, advance-payment liabilities are relieved, and revenue and cost of sales are recognized. Deferrals, accelerations, and cancellations before delivery reshape the skyline and the timing of all of this. The contracts-finance role ensures that when each aircraft delivers, the systems recognize exactly the right revenue, at the right time, net of the right concessions and escalation — closing the loop from campaign to recognized earnings." },
      { type: "callout", variant: "key", title: "From commitment to earnings", body: "The full arc: a campaign is won, a Purchase Agreement captures the terms, commitments are recorded accurately, PDPs build as contract liabilities, and at delivery control transfers and revenue is recognized at the negotiated, escalated, concession-adjusted price. Every module in this track is a link in that chain — and finance owns the integrity of the whole chain." },
    ],
  },
};
