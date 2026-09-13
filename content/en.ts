import { site, navigation } from "@/data/site";
import { salesCapabilities, salesSystems, flagshipProof, flagshipWorkflow, flagshipCapabilities, flagshipSecondaryArtifacts } from "@/data/sales";
import { salesJourney, solarDomains } from "@/data/experience";

export const en = {
  name: site.name,
  meta: { title: `${site.name} | Sales & Business Development | B2B Sales & Sales Operations`, description: "Ahmed Hassan is a Sales & Business Development professional with experience in B2B sales, CRM, pipeline management, account development, sales operations and renewable-energy commercial systems." },
  contact: { label: "LET’S CONNECT", heading: "Looking for someone who can sell, build the sales process, and move opportunities forward?", description: "I’m open to Sales, Business Development and Commercial Growth opportunities where I can combine hands-on selling with CRM, pipeline development, account growth and structured sales execution.", talk: "Let’s Talk", email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp", phone: "Primary Mobile", secondaryPhone: "Secondary Mobile", links: "Direct contact", role: "Sales & Business Development" },
  nav: { items: navigation, main: "Main navigation", mobile: "Mobile navigation", open: "Open navigation", close: "Close navigation", home: "home", skip: "Skip to content", language: "Language", theme: "Theme", light: "Light", dark: "Dark", system: "System" },
  ui: {
    resume: "Download Resume", resumeUnavailable: "Download Resume — resume not yet available", resumeSoon: "Resume will be available soon.",
    inspect: "Inspect image", closeImage: "Close image preview", close: "Close", fit: "Fit image", zoom: "Zoom in", scrollHint: "Scroll or swipe to inspect the full image.", fitHint: "Full image view. Zoom in to inspect details.", imageRegion: "Scrollable image preview", gallery: "Solar PV proof visuals", selectedWork: "Selected work", realPreview: "Real project preview", required: "required",
  },
  hero: {
    eyebrow: "B2B Sales", eyebrowDetail: " · Sales Operations · Sales Leadership",
    before: "I Build ", accent: "B2B Sales Pipelines", after: " — And the Systems That Move Them Forward.",
    description: "Growth Manager leading Sales & Marketing at Innovation for Solar System, combining hands-on consultative selling with B2B prospecting, CRM, pipeline management, account development and solar-sales training.",
    explore: "Explore My Sales Work", talk: "Let’s Talk", approach: "THE APPROACH", steps: ["Prospect", "Qualify", "Develop", "Close", "Grow"], note: "Hands-on sales. Connected commercial systems.",
    portraitAlt: site.portrait.alt, portraitLabel: "PROFESSIONAL PORTRAIT", portraitPending: "Ahmed’s photograph, coming soon.", sector: "Renewable Energy / Solar", officialTitle: "Growth Manager", responsibility: "Sales & Marketing Lead", responsibilityHint: "Functional responsibility: leading Sales & Marketing", instructor: "Solar Sales Instructor",
    flow: "THE SALES SYSTEM", flowContext: "CRM / Pipeline", stages: ["Prospecting", "Qualification", "Opportunity", "Proposal", "Follow-Up", "Closing", "Account Growth"],
  },
  authority: { label: "SALES CAPABILITY", heading: "I Don’t Just Work the Sales Pipeline. ", accent: "I Build and Lead It.", description: "My experience combines hands-on consultative selling with B2B prospecting, CRM and pipeline development, account growth, sales operations, team coordination and practical solar-sales training.", capabilities: salesCapabilities },
  work: {
    label: "SELECTED SYSTEMS", heading: "BUILT, NOT JUST LEARNED.", description: "Real commercial systems designed and built to bring structure to sales execution.",
    projects: salesSystems, problem: "Problem", built: "What I Built", purpose: "Business Purpose", flagship: "FLAGSHIP BUILD", scope: "ONE CONNECTED WORKBOOK", proofLabel: "System proof points", proof: flagshipProof, capabilities: flagshipCapabilities, workflow: flagshipWorkflow, workflowHeading: "FROM CUSTOMER INPUT TO COMMERCIAL DECISION", stagesLabel: "Connected sales-engineering stages", stages: ["ENGINEERING", "COSTING", "QUOTATION", "FINANCIAL REVIEW"],
    assurance: [{ title: "Commercial control.", text: "The client-facing quotation is separated from internal purchase cost, margin and profit information." }, { title: "Built to be reviewed.", text: "Engineering alerts, dashboard summaries, a user guide and built-in formula test scenarios support review." }],
    intent: "Designed to reduce fragmentation, standardize proposal preparation and connect technical design with commercial decision-making.", tiersLabel: "Maintenance packages", tiers: ["Economic", "Advanced", "Premium"], primaryLabel: "Solar PV Engineering System", secondary: flagshipSecondaryArtifacts,
  },
  experience: { label: "EXPERIENCE", heading: "From Hands-On Selling to Building Sales Systems.", journey: salesJourney, solarLabel: "SOLAR DOMAIN", domains: solarDomains },
};
