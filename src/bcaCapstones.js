// Commercial Aircraft Contracts Capstone Scenarios
// Stages map to the track's modules; run as full case or modular per-stage.
// NOTE: All prices, escalation coefficients, concessions, and PDP percentages
// are ILLUSTRATIVE teaching figures — not actual figures from any manufacturer.

export const BCA_CAPSTONES = [
  {
    id: "paccrown",
    title: "Pacific Crown Airways — Widebody Campaign",
    org: "Flag Carrier · Long-Haul Fleet Renewal",
    tag: "Widebody · Firm + Options · Escalation",
    summary: "You support a widebody campaign with a national flag carrier renewing its long-haul fleet. Work the full deal: read the order structure, price it with escalation, handle the negotiation and commitments, and recognize revenue at delivery.",
    stages: [
      {
        id: "setup", moduleLabel: "Market · Deal · PA", title: "Deal Structure",
        brief: "The campaign closed. Before pricing anything, ground yourself in the order structure and what counts as a commitment.",
        dataTitle: "DEAL FACTS",
        data: [
          { label: "Customer", value: "Flag carrier" },
          { label: "Firm aircraft", value: "20 widebodies" },
          { label: "Options", value: "10" },
          { label: "Base price / aircraft", value: "$180M" },
          { label: "Phase", value: "Long-haul renewal" },
          { label: "Delivery", value: "Staged over 5 yrs" },
        ],
        tasks: [
          { id: "pc-backlog", type: "mc", prompt: "The deal is 20 firm aircraft plus 10 options. How many units enter firm backlog?", options: ["30 — all of them", "20 — only the firm aircraft", "10 — only the options", "0 — nothing until delivery"], correct: 1, explain: "Only firm orders are backlog. The 10 options are flexibility, not commitments to buy, and are not backlog until exercised and converted to firm." },
          { id: "pc-buying", type: "mc", prompt: "As a flag carrier buying long-haul widebodies, what is the customer fundamentally purchasing?", options: ["The lowest list price", "Seat-mile economics on its long-haul network — fuel burn, range, payload, reliability", "Maximum escalation", "Speculative resale value"], correct: 1, explain: "Airlines buy route economics tailored to their network, not list price. For long-haul widebodies, range, payload, and fuel burn drive the decision." },
          { id: "pc-options", type: "written", prompt: "How should the 10 options be handled in the financial systems, and why does it matter for reporting?", guidance: "Think about backlog, revenue, and disclosure.", modelAnswer: "The 10 options must be tracked separately from firm backlog — they are a right, not an obligation, so they are not backlog and produce no revenue until exercised and converted to firm orders. Recording them as firm would overstate backlog, a core disclosed metric, and misrepresent committed future revenue. They should be captured with their pricing/terms and exercise window so that if exercised, they convert cleanly into firm orders." },
        ],
      },
      {
        id: "pricing", moduleLabel: "Pricing & Escalation", title: "Price the Deal",
        brief: "Translate the base price into a delivery-period price using the escalation formula, then compute the pre-delivery payment. Enter $M (or the factor as a decimal).",
        dataTitle: "PRICING INPUTS",
        data: [
          { label: "Base price / aircraft", value: "$180M" },
          { label: "Formula weighting", value: "60% labor / 40% materials" },
          { label: "Labor index (base→del.)", value: "100 → 115 (1.15)" },
          { label: "Materials index", value: "100 → 105 (1.05)" },
          { label: "PDP (pre-delivery)", value: "30% of price" },
        ],
        tasks: [
          { id: "pc-factor", type: "calc", prompt: "Calculate the escalation factor.", formula: "0.60 × labor ratio + 0.40 × materials ratio", answer: 1.11, tolerance: 0.01, display: "1.11", placeholder: "e.g. 1.11", explain: "0.60 × 1.15 + 0.40 × 1.05 = 0.69 + 0.42 = 1.11. The blended index movement raises the price ~11% above base." },
          { id: "pc-price", type: "calc", prompt: "Calculate the escalated delivery price per aircraft ($M).", formula: "Base Price × Escalation Factor", answer: 199.8, tolerance: 2, display: "$199.8M", placeholder: "e.g. 199.8", explain: "$180M × 1.11 = $199.8M. Escalation added ~$19.8M per aircraft purely from index movement between base period and delivery." },
          { id: "pc-pdp", type: "calc", prompt: "Calculate the pre-delivery payments collected before delivery, per aircraft ($M).", formula: "30% × escalated price", answer: 59.94, tolerance: 1.5, display: "≈$59.9M", placeholder: "e.g. 59.9", explain: "0.30 × $199.8M = ~$59.9M collected as PDPs before delivery — recorded as a contract liability, NOT revenue, until the aircraft delivers." },
        ],
      },
      {
        id: "negotiate", moduleLabel: "Negotiation · Commitments", title: "Terms & Commitments",
        brief: "The customer is pushing on terms beyond price. Read the financial consequences.",
        tasks: [
          { id: "pc-cap", type: "mc", prompt: "The customer demands an escalation cap limiting how much the formula can raise the price. What does that do?", options: ["Nothing financial", "Shifts index/inflation risk from the customer to the OEM, changing how price is forecast", "Eliminates the base price", "Increases the customer's risk"], correct: 1, explain: "A cap protects the customer from index increases and transfers that risk to the OEM, which changes how finance forecasts and recognizes the delivered price." },
          { id: "pc-rvg", type: "mc", prompt: "To win, the OEM offers a residual value guarantee on the widebodies. What kind of exposure is that?", options: ["A discount with no future risk", "A contingent liability — the OEM pays if future aircraft values fall below the guaranteed level", "Immediate revenue", "A pre-delivery payment"], correct: 1, explain: "An RVG is a contingent liability tied to uncertain future used-aircraft values; it must be identified, quantified, tracked, and disclosed." },
          { id: "pc-lever", type: "written", prompt: "The customer wants both earlier delivery slots AND a headline price cut. As the deal team, what would you trade first and why?", guidance: "Think about which levers are cheap to the OEM but valuable to the customer.", modelAnswer: "Trade non-price levers first — earlier or rearranged delivery slots, product-support credits (spares, training, entry-into-service support), or added option/flexibility — because these are often valuable to the customer while costing the OEM relatively little, and they protect headline margin. A delivery-slot solution may itself satisfy much of what the customer wants. Only after exhausting these would I concede on price, since a headline discount hits margin directly and can set a most-favored-customer precedent across other deals." },
        ],
      },
      {
        id: "revrec", moduleLabel: "Revenue Recognition", title: "Deliver & Recognize",
        brief: "The first aircraft is ready to deliver. Close the loop on revenue. Enter $M.",
        dataTitle: "AT FIRST DELIVERY",
        data: [
          { label: "Escalated price", value: "$199.8M" },
          { label: "PDPs already collected", value: "$59.9M" },
          { label: "Control transfer", value: "At delivery" },
        ],
        tasks: [
          { id: "pc-when", type: "mc", prompt: "When is revenue on the aircraft recognized?", options: ["At order signing", "As PDPs are received", "At a point in time when control transfers — at delivery", "Spread evenly over production"], correct: 2, explain: "Under ASC 606, aircraft revenue is point-in-time: recognized when control transfers (acceptance, title, risk, possession, right to payment) — at delivery." },
          { id: "pc-rev", type: "calc", prompt: "How much revenue is recognized when the first aircraft delivers ($M)?", formula: "The full escalated transaction price", answer: 199.8, tolerance: 2, display: "$199.8M", placeholder: "e.g. 199.8", explain: "The full escalated price of $199.8M is recognized at delivery. The PDPs were carried as a contract liability and are now relieved against the recognized revenue." },
          { id: "pc-cash", type: "calc", prompt: "How much additional cash is collected at delivery ($M), given PDPs were already paid?", formula: "Escalated price − PDPs collected", answer: 139.86, tolerance: 2, display: "≈$139.9M", placeholder: "e.g. 139.9", explain: "$199.8M − $59.9M = ~$139.9M due at delivery. The customer paid ~30% in advance; the remaining ~70% arrives at delivery." },
          { id: "pc-liab", type: "written", prompt: "Explain how the PDPs were treated on the balance sheet from signing through delivery.", guidance: "Trace the contract liability.", modelAnswer: "From the time PDPs were received, they were recorded as a contract liability (advance payments / deferred revenue) — cash collected before the performance obligation was satisfied, so not revenue. The liability built up as each installment was paid. At delivery, when control transferred and revenue was recognized, the accumulated PDP liability was relieved (applied against the now-recognized revenue), and the remaining balance was collected in cash. At no point before delivery did the PDPs hit the income statement as revenue." },
        ],
      },
    ],
  },

  {
    id: "skylease",
    title: "SkyLease Global — Narrowbody Bulk Order",
    org: "Leasing Company · Speculative Order",
    tag: "Narrowbody · Bulk · Concessions",
    summary: "You support a large narrowbody order from a leasing company. Lessors buy in bulk, negotiate hard, and structure deals differently from airlines. Work the case: structure, pricing with a bulk concession, terms, and recognition.",
    stages: [
      {
        id: "setup", moduleLabel: "Market · Deal · PA", title: "Deal Structure",
        brief: "A lessor deal looks different from an airline deal. Start with the structure.",
        dataTitle: "DEAL FACTS",
        data: [
          { label: "Customer", value: "Leasing company" },
          { label: "Firm aircraft", value: "100 narrowbodies" },
          { label: "Purchase rights", value: "50" },
          { label: "Base price / aircraft", value: "$50M" },
          { label: "Profile", value: "Bulk / speculative" },
          { label: "Delivery", value: "Staged multi-year" },
        ],
        tasks: [
          { id: "sl-backlog", type: "mc", prompt: "The order is 100 firm plus 50 purchase rights. How many units are firm backlog?", options: ["150", "100", "50", "0"], correct: 1, explain: "Only the 100 firm aircraft are backlog. Purchase rights are weaker than options — a right to buy if slots are available — and are not backlog until converted to firm." },
          { id: "sl-lessor", type: "mc", prompt: "How does a leasing company differ from an airline as a customer?", options: ["It flies the aircraft itself", "It buys in bulk to lease out, resells slots, and has a different credit/negotiation profile", "It never negotiates price", "It cannot place firm orders"], correct: 1, explain: "Lessors buy in bulk to lease to airlines, often reselling delivery slots, and negotiate hard — a different profile from an operating airline." },
          { id: "sl-why", type: "written", prompt: "Why might a lessor's bulk deal carry deeper concessions and different terms than a single airline's order?", guidance: "Think volume, competition, and the lessor's business model.", modelAnswer: "A lessor placing a large bulk order brings volume that fills many production slots at once, which is valuable to the OEM and gives the lessor leverage to negotiate deeper per-unit concessions. Lessors are repeat, sophisticated buyers who play both OEMs against each other and resell slots, so pricing is sharp. Terms also differ because the lessor isn't the operator — performance guarantees, configuration flexibility, and financing/credit arrangements are structured around leasing the aircraft on to airlines rather than operating them, which changes what each side values." },
        ],
      },
      {
        id: "pricing", moduleLabel: "Pricing · Concessions", title: "Price with Concessions",
        brief: "Escalate the base price, then apply the bulk concession to get the net price. Enter $M (factor as decimal).",
        dataTitle: "PRICING INPUTS",
        data: [
          { label: "Base price / aircraft", value: "$50M" },
          { label: "Formula weighting", value: "65% labor / 35% materials" },
          { label: "Labor index", value: "100 → 112 (1.12)" },
          { label: "Materials index", value: "100 → 108 (1.08)" },
          { label: "Bulk concession", value: "20% off escalated" },
        ],
        tasks: [
          { id: "sl-factor", type: "calc", prompt: "Calculate the escalation factor.", formula: "0.65 × labor ratio + 0.35 × materials ratio", answer: 1.106, tolerance: 0.01, display: "1.106", placeholder: "e.g. 1.106", explain: "0.65 × 1.12 + 0.35 × 1.08 = 0.728 + 0.378 = 1.106." },
          { id: "sl-esc", type: "calc", prompt: "Calculate the escalated price per aircraft before concession ($M).", formula: "Base × Escalation Factor", answer: 55.3, tolerance: 1, display: "$55.3M", placeholder: "e.g. 55.3", explain: "$50M × 1.106 = $55.3M before any concession." },
          { id: "sl-net", type: "calc", prompt: "Apply the 20% bulk concession. What is the net price per aircraft ($M)?", formula: "Escalated × (1 − 0.20)", answer: 44.24, tolerance: 1, display: "≈$44.24M", placeholder: "e.g. 44.24", explain: "$55.3M × 0.80 = ~$44.24M net. The concession is economically a price reduction and lowers the transaction price recorded and recognized." },
        ],
      },
      {
        id: "negotiate", moduleLabel: "Negotiation · Commitments", title: "Terms & Commitments",
        brief: "Lessor deals lean heavily on financing and cross-deal protections. Read the consequences.",
        tasks: [
          { id: "sl-backstop", type: "mc", prompt: "The lessor asks for backstop financing. What is it?", options: ["A discount", "A commitment to provide or arrange financing if the customer can't secure it by delivery", "A performance guarantee", "An escalation cap"], correct: 1, explain: "Backstop financing de-risks the deal for the customer and creates a contingent funding obligation for the OEM if the customer can't finance independently." },
          { id: "sl-mfc", type: "mc", prompt: "The lessor demands a most-favored-customer (MFC) clause. What does it commit the OEM to?", options: ["Always charging list price", "Not giving the lessor worse terms than comparable customers on comparable deals", "Free aircraft", "Capping escalation"], correct: 1, explain: "An MFC clause protects the lessor's relative terms and constrains the OEM across deals — mis-tracking it can create cross-deal liabilities." },
          { id: "sl-risk", type: "written", prompt: "With both a deep bulk concession and an MFC clause in play, what cross-deal risk must finance track, and why?", guidance: "Think about precedent across the customer base.", modelAnswer: "The combination means the steep price granted here can ripple across the customer base: an MFC clause obligates the OEM not to give comparable customers better terms, so a deep concession in this deal can set a precedent that either constrains future pricing or triggers obligations to extend similar terms to MFC-protected customers. Finance must track exactly which customers hold MFC protections, what terms were granted where, and ensure the commitment is recorded so the company doesn't inadvertently breach an MFC clause or under-reserve for its cross-deal consequences." },
        ],
      },
      {
        id: "revrec", moduleLabel: "Revenue Recognition", title: "Deliver & Recognize",
        brief: "Deliveries begin. Apply point-in-time recognition and handle the purchase rights. Enter $M.",
        dataTitle: "RECOGNITION INPUTS",
        data: [
          { label: "Net price / aircraft", value: "$44.24M" },
          { label: "Aircraft delivered (Yr 1)", value: "10" },
          { label: "Purchase rights", value: "50 (unexercised)" },
        ],
        tasks: [
          { id: "sl-rights", type: "mc", prompt: "Do the 50 unexercised purchase rights generate revenue or backlog now?", options: ["Yes — full revenue now", "Yes — backlog only", "No — neither, until exercised and converted to firm", "Only the financing portion"], correct: 2, explain: "Purchase rights are flexibility, not commitments. They produce no revenue and are not firm backlog until exercised and converted to firm orders." },
          { id: "sl-rev", type: "calc", prompt: "If 10 aircraft deliver in Year 1, how much revenue is recognized ($M)?", formula: "Units delivered × net price", answer: 442.4, tolerance: 5, display: "$442.4M", placeholder: "e.g. 442.4", explain: "10 × $44.24M = $442.4M recognized at the point each aircraft's control transfers at delivery — the net, escalated, concession-adjusted price." },
          { id: "sl-why", type: "written", prompt: "Explain why the 50 purchase rights sit outside both backlog and revenue, and how you'd record them.", guidance: "Contrast a right with a firm commitment.", modelAnswer: "A purchase right is only a right to buy (often subject to slot availability), not an obligation, so there is no enforceable commitment to deliver and nothing earned — it fails to qualify as firm backlog and produces no revenue until the customer exercises it and it converts to a firm order. I'd record the 50 rights separately from firm backlog, capturing their pricing basis, conditions, and any exercise window, so they're visible for planning but never counted as committed revenue. Only upon exercise would they move into firm backlog and, ultimately, be recognized as revenue at delivery." },
        ],
      },
    ],
  },
];
