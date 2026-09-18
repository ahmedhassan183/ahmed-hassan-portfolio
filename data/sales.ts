// Portfolio content supplied or approved by Ahmed. System specifications and
// commercial outcomes are kept distinct; Growth Manager is the official title.
export const salesCapabilities = [
  {
    id: "sell",
    title: "SELL",
    icon: "strategy",
    description: "Closed 18 solar installation opportunities and completed 120+ site surveys and customer visits, building on consultative retail sales experience.",
    skills: [
      "Consultative Selling", "B2B Prospecting", "Needs Discovery & Qualification", "Product Recommendation",
      "Objection Handling", "Proposals", "Negotiation", "Follow-Up", "Retail Sales Closing", "Customer Relationships",
    ],
  },
  {
    id: "build",
    title: "BUILD",
    icon: "pipeline",
    description: "Built and maintained a live CRM with daily updates to opportunities, follow-up dates and next actions, alongside market intelligence and sales workflows.",
    skills: [
      "CRM", "Pipeline Structure", "Opportunity Stages", "Next-Action Logic",
      "Account Mapping", "Sales Reporting", "Proposal Follow-Up", "Commercial Workflows",
    ],
  },
  {
    id: "grow",
    title: "GROW",
    icon: "crm",
    description: "Opened two agricultural-association relationships and developed customer channels, supported by account follow-up and after-sales service workflows.",
    skills: [
      "Account Development", "Customer Success", "Retention Workflows",
      "Recurring-Service Design", "Referral Workflows", "Maintenance Lifecycle",
    ],
  },
] as const;

export const salesSystems = [
  {
    id: "b2b-market-account-development",
    category: "BUSINESS DEVELOPMENT · LIVE CRM",
    title: "B2B Market Intelligence, CRM & Agricultural Channel Development",
    description: "Mapped target markets, prioritized accounts and used a live CRM for daily opportunity follow-up. Agricultural-association results are adjacent channel-development evidence, not outcomes attributed to the market map.",
    problem: "B2B opportunities and follow-up needed a clear account-priority view.",
    role: "As Growth Manager, Ahmed handled account development, agricultural partnerships, field-commercial activity and opportunity tracking.",
    built: "Mapped the market, prioritized accounts, organized CRM stages and next actions, and opened agricultural-association relationships.",
    adoption: "Ahmed used and updated the CRM daily during live commercial work. Team-wide adoption is not claimed.",
    purpose: "Keep account priorities, opportunities and follow-up dates visible while developing agricultural channels.",
    artifact: {
      path: "/work/crm-market-system.webp",
      type: "WORKBOOK",
      label: "B2B Market Intelligence, CRM & Agricultural Channel Development",
      alt: "Sanitized view of Ahmed’s B2B market and CRM workbook",
    },
  },
  {
    id: "solar-pv-engineering",
    category: "SALES ENGINEERING · COMMERCIAL TOOL",
    title: "Solar PV Engineering, Costing & Quotation System",
    description: "An end-to-end Excel-based system connecting customer requirements, solar engineering, BOQ, costing, pricing, financial analysis and client-ready commercial proposals.",
    problem: "Solar proposals often require engineering calculations, costing and commercial preparation across disconnected sheets and manual processes.",
    role: "Ahmed designed and built the Excel system, linking technical inputs to costing, pricing and client quotation outputs.",
    built: "Connected customer inputs, engineering design, BOQ, costing, pricing, quotation, financial analysis and a review dashboard in one workbook.",
    adoption: "A working system and demo outputs are documented. Real-customer or company-wide adoption has not been verified.",
    purpose: "Connect solar engineering, costing and commercial decision-making in one controlled workflow.",
    artifact: {
      path: "/work/solar-pv-engineering-system.webp",
      type: "CONNECTED EXCEL SYSTEM",
      label: "Solar PV Engineering, Costing & Quotation System",
      alt: "Sanitized view of Ahmed’s Solar PV engineering, costing and quotation workbook",
    },
  },
  {
    id: "maintenance-revenue-product",
    category: "CUSTOMER LIFECYCLE · SERVICE PRODUCT",
    title: "Maintenance & Recurring Revenue Product",
    description: "An annual service offering designed to keep the customer relationship active after solar installation.",
    problem: "Post-installation care needed a defined service scope, response model and renewal path.",
    role: "Ahmed designed the service tiers, SLA, annual agreement, reporting and renewal journey.",
    built: "Economic, Advanced and Premium levels defining service scope, visit frequency, cleaning, inspection and maintenance, emergency-response priorities and reports.",
    adoption: "Product and service system developed for commercial use. Signed contracts and customer adoption have not been verified.",
    purpose: "Create a structured post-sale relationship and recurring-service opportunity.",
    artifact: {
      path: "/work/maintenance-product.webp",
      type: "SERVICE PRODUCT",
      label: "Maintenance & Recurring Revenue Product",
      alt: "Sanitized view of Ahmed’s annual maintenance agreement and three-tier service structure",
    },
  },
] as const;

export const supportingWork = [
  {
    id: "90-day-sales-execution",
    title: "90-Day Sales Execution Operating System",
    description: "Connected strategy to daily and weekly activity, CRM updates, KPI reviews and management follow-up across 13 planned sprints.",
    status: "Operating framework; sprint completion and team adoption are not documented.",
    artifact: { path: "/work/90-day-sales-system.webp", type: "OPERATING MANUAL", label: "90-Day Sales Execution Operating System", alt: "Sanitized excerpt from Ahmed’s 90-Day Execution Operating Manual" },
  },
  {
    id: "sahara-2026",
    title: "Sahara 2026 Field Execution System",
    description: "Pre-event plan for 20 prioritized accounts across associations, irrigation, pumps, greenhouses, farms and solar partners, with qualification, CRM capture, same-day follow-up and next-step rules.",
    status: "Current business-development preparation; event targets are not achieved results.",
    artifact: null,
  },
  {
    id: "growth-playbook",
    title: "Strategic & Commercial Growth Playbook",
    description: "Connected business diagnosis with commercial priorities, CRM, marketing, customer success, SOPs, governance, KPIs and execution planning.",
    status: "Planning framework; no commercial outcome attributed to the document.",
    artifact: null,
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

export const flagshipWorkflow = ["Customer Input", "Engineering Design", "BOQ", "Costing", "Pricing", "Client Quotation", "Financial Analysis", "Dashboard"] as const;

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
