// Portfolio content supplied by Ahmed. These describe capabilities and systems,
// not measured outcomes or additional official job titles.
export const salesCapabilities = [
  {
    id: "sell",
    title: "SELL",
    icon: "strategy",
    description: "Hands-on experience working directly with customers from needs discovery through closing and follow-up.",
    skills: [
      "Consultative Selling", "Lead Qualification", "Customer Needs Discovery", "Product Recommendation",
      "Objection Handling", "Negotiation", "Follow-Up", "Closing",
    ],
  },
  {
    id: "build",
    title: "BUILD",
    icon: "pipeline",
    description: "Building the systems, workflows and commercial structure behind repeatable sales execution.",
    skills: [
      "CRM Design", "Pipeline Management", "Opportunity Stages", "Follow-Up Logic",
      "Account Development", "Sales Reporting", "Proposal Follow-Up", "Sales Process Design",
    ],
  },
  {
    id: "lead-train",
    title: "LEAD & TRAIN",
    icon: "crm",
    description: "Leading commercial activity and delivering practical sales training within the solar-energy sector.",
    skills: [
      "Sales & Marketing Leadership", "Sales Coordination", "Sales Reviews", "Sales Enablement",
      "Solar Sales Training", "Candidate Assessment", "Sales Talent Development",
    ],
  },
] as const;

export const salesSystems = [
  {
    id: "b2b-market-account-development",
    category: "B2B SALES SYSTEM",
    title: "B2B Market Intelligence & Account Development",
    description: "A structured market and prospecting system designed to organize target accounts, prioritize opportunities and turn broad B2B prospecting into focused account development.",
    problem: "No structured view of target companies, decision-makers and account priorities.",
    built: "A B2B market database combining account mapping, qualification, opportunity prioritization, contact planning and follow-up structure.",
    purpose: "Focus sales effort on the accounts with the strongest commercial potential.",
    artifact: {
      path: "/work/crm-market-system.webp",
      type: "WORKBOOK",
      label: "B2B Market Intelligence & Account Development",
      alt: "Sanitized view of Ahmed’s B2B market and CRM workbook",
    },
  },
  {
    id: "solar-pv-engineering",
    category: "SALES ENGINEERING · COMMERCIAL TOOL",
    title: "Solar PV Engineering, Costing & Quotation System",
    description: "An end-to-end Excel-based system connecting customer requirements, solar engineering, BOQ, costing, pricing, financial analysis and client-ready commercial proposals.",
    problem: "Solar proposals often require engineering calculations, costing and commercial preparation across disconnected sheets and manual processes.",
    built: "A connected Excel system that carries project inputs through technical design, quantity calculation, costing, pricing, commercial quotation and financial evaluation.",
    purpose: "Create a structured sales-engineering workflow and make proposal preparation more consistent, reviewable and commercially controlled.",
    artifact: {
      path: "/work/solar-pv-engineering-system.webp",
      type: "CONNECTED EXCEL SYSTEM",
      label: "Solar PV Engineering, Costing & Quotation System",
      alt: "Sanitized view of Ahmed’s Solar PV engineering, costing and quotation workbook",
    },
  },
  {
    id: "90-day-sales-execution",
    category: "SALES OPERATIONS",
    title: "90-Day Sales Execution Operating System",
    description: "A practical operating system translating commercial strategy into daily and weekly execution across sales, CRM, customer development and KPI reviews.",
    problem: "Strategy existed without a consistent execution cadence.",
    built: "A 90-day operating framework with clear ownership, daily activity, weekly reviews, CRM updates, sales follow-up and KPI tracking.",
    purpose: "Connect strategic goals with repeatable commercial execution.",
    artifact: {
      path: "/work/90-day-sales-system.webp",
      type: "OPERATING MANUAL",
      label: "90-Day Sales Execution Operating System",
      alt: "Sanitized excerpt from Ahmed’s 90-Day Execution Operating Manual",
    },
  },
  {
    id: "maintenance-revenue-product",
    category: "CUSTOMER GROWTH · RECURRING REVENUE",
    title: "Maintenance Revenue Product",
    description: "A structured annual maintenance product designed to turn after-sales service into a long-term customer relationship and recurring commercial offering.",
    problem: "Maintenance existed as an unstructured post-sale service.",
    built: "Three service tiers, service scope, SLA, emergency response structure, technical reporting, annual agreement and renewal journey.",
    purpose: "Support retention, account development and recurring revenue opportunities.",
    artifact: {
      path: "/work/maintenance-product.webp",
      type: "SERVICE PRODUCT",
      label: "Maintenance Revenue Product",
      alt: "Sanitized view of Ahmed’s annual maintenance agreement and three-tier service structure",
    },
  },
] as const;

// Supplied factual scope; these are not measured commercial outcomes.
export const flagshipProof = [
  { value: "40", label: "Interconnected Worksheets" },
  { value: "1,500+", label: "Formulas" },
  { value: "8", label: "Structured Data Tables" },
  { value: "4", label: "Charts" },
  { value: "No", label: "Macros" },
] as const;

export const flagshipWorkflow = ["Customer Input", "Engineering Design", "BOQ", "Costing", "Quotation", "Financial Analysis", "Dashboard"] as const;

export const flagshipCapabilities = [
  { title: "ENGINEERING", detail: "Customer inputs · load analysis · PV sizing · energy production · strings · inverters · irrigation · pumps & motors · VFD · batteries · DC / AC / motor cables · protection · grounding" },
  { title: "COMMERCIAL", detail: "BOQ · supplier cost · pricing · margin logic · client quotation" },
  { title: "FINANCIAL", detail: "Payback · NPV · IRR · LCOE · scenario analysis" },
  { title: "CONTROL & QA", detail: "Dashboard · engineering alerts · printable summary · user guide · formula test scenarios" },
] as const;

export const flagshipSecondaryArtifacts = [
  { path: "/work/solar-pv-dashboard.webp", type: "DASHBOARD", label: "Engineering & Commercial Dashboard", alt: "Sanitized dashboard from Ahmed’s Solar PV system" },
  { path: "/work/solar-pv-quotation.webp", type: "CLIENT QUOTATION", label: "Client Quotation Preview", alt: "Sanitized client-facing quotation from Ahmed’s Solar PV system, without private pricing" },
] as const;
