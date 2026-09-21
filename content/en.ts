import { site, navigation } from "@/data/site";
import { salesCapabilities, salesSystems, supportingWork, flagshipProof, flagshipWorkflow, flagshipCapabilities, flagshipSecondaryArtifacts } from "@/data/sales";
import { salesJourney, solarDomains } from "@/data/experience";

export const en = {
  name: site.name,
  meta: { title: `${site.name} | Growth & Business Development | B2B Sales & Sales Operations`, description: "Ahmed Hassan works in Growth & Business Development, combining consultative selling, B2B prospecting and account development with CRM and sales operations in renewable energy." },
  contact: { label: "LET’S CONNECT", heading: "Looking for someone who can develop B2B opportunities, sell directly and bring structure to the sales process?", description: "Open to Growth, Business Development and B2B Sales roles in renewable energy and beyond.", talk: "Contact Ahmed", email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp", phone: "Primary Mobile", secondaryPhone: "Secondary Mobile", links: "Direct contact", role: "Growth & Business Development" },
  nav: { items: navigation, main: "Main navigation", mobile: "Mobile navigation", open: "Open navigation", close: "Close navigation", home: "home", skip: "Skip to content", language: "Language", theme: "Theme", light: "Light", dark: "Dark", system: "System" },
  ui: {
    resume: "Download Resume", resumeUnavailable: "Download Resume — resume not yet available", resumeSoon: "Resume will be available soon.",
    inspect: "Inspect image", closeImage: "Close image preview", close: "Close", fit: "Fit image", zoom: "Zoom in", scrollHint: "Scroll or swipe to inspect the full image.", fitHint: "Full image view. Zoom in to inspect details.", imageRegion: "Scrollable image preview", gallery: "Solar PV proof visuals", selectedWork: "Selected work", realPreview: "Real project preview", required: "required",
  },
  hero: {
    eyebrow: "Growth & Business Development", eyebrowDetail: " · B2B Sales · Sales Operations",
    before: "I Develop ", accent: "B2B Opportunities", after: " — And Build the Sales Systems That Move Them Forward.",
    description: "Growth Manager at Innovation for Solar System, combining direct solar sales, field visits and agricultural partnership development with B2B prospecting, account growth, CRM and commercial systems.",
    explore: "Explore My Commercial Work", talk: "Contact Ahmed", approach: "THE APPROACH", steps: ["Prospect", "Qualify", "Develop", "Close", "Grow"], note: "Hands-on sales. Connected commercial systems.",
    portraitAlt: site.portrait.alt, portraitLabel: "PROFESSIONAL PORTRAIT", portraitPending: "Ahmed’s photograph, coming soon.", sector: "Renewable Energy / Solar", officialTitle: "Growth Manager", responsibility: "Sales & Marketing Lead", responsibilityHint: "Functional responsibility: leading Sales & Marketing", instructor: "Solar Sales Instructor",
    flow: "THE SALES SYSTEM", flowContext: "CRM / Pipeline", stages: ["Prospecting", "Qualification", "Opportunity", "Proposal", "Follow-Up", "Closing", "Account Growth"],
    proofLabel: "Commercial proof", proof: [{ value: "18", label: "Solar installation opportunities personally closed" }, { value: "120+", label: "Site surveys & customer visits" }, { value: "7 stations", label: "320 kW through Senour Agricultural Association" }],
  },
  authority: { label: "HOW I SELL & GROW", heading: "From the first conversation ", accent: "to the next opportunity.", description: "Direct selling, daily opportunity discipline and partner development, backed by the cases below.", capabilities: salesCapabilities },
  work: {
    label: "FLAGSHIP CASE STUDIES", heading: "BUILT, NOT JUST LEARNED.", description: "Three cases show business development, solar commercial decision-making and a structured after-sales product.",
    projects: salesSystems, problem: "Context / Problem", role: "My Role", built: "Action / System", adoption: "Live Use / Status", purpose: "Business Value", flagship: "FLAGSHIP CASE", scope: "ONE CONNECTED WORKBOOK", proofLabel: "System proof points", proof: flagshipProof, capabilities: flagshipCapabilities, workflow: flagshipWorkflow, workflowHeading: "FROM CUSTOMER INPUT TO COMMERCIAL DECISION", stagesLabel: "Connected sales-engineering stages", stages: ["ENGINEERING", "COSTING", "QUOTATION", "FINANCIAL REVIEW"],
    assurance: [{ title: "Commercial control.", text: "The client-facing quotation is separated from internal purchase cost, margin and profit information." }, { title: "Built to be reviewed.", text: "Engineering alerts, dashboard summaries, a user guide and built-in formula test scenarios support review." }],
    intent: "Designed for technical and commercial decision support; no customer adoption or sales result is attributed to this workbook.", tiersLabel: "Maintenance packages", tiers: ["Economic", "Advanced", "Premium"], primaryLabel: "Solar PV Engineering System", secondary: flagshipSecondaryArtifacts,
    marketProof: {
      processLabel: "SYSTEM EVIDENCE",
      process: "47 mapped market entries · 20 prioritized accounts · a CRM Ahmed updated daily for stages, follow-up dates and next actions.",
      channelLabel: "COMMERCIAL EVIDENCE",
      role: "Ahmed initiated and developed two agricultural-association relationships as Growth Manager.",
      model: "The association referral model connects interested members with Innovation for qualification, surveys, proposals and suitable projects.",
      sales: "In his wider Growth Manager work, Ahmed personally closed 18 solar installation opportunities and completed 120+ site surveys and customer visits. These results are not attributed to the market database.",
      senour: "Senour: 7 solar stations totaling 320 kW through the channel to date.",
      fayoum: "A second partnership in Fayoum covers an agricultural community of approximately 7,000 feddans, with opportunities in solar energy, irrigation and greenhouses.",
    },
    supporting: { label: "SUPPORTING WORK", heading: "Operating tools in brief.", description: "Current plans and field tools behind the work above.", items: supportingWork },
  },
  experience: {
    label: "EXPERIENCE", heading: "From Hands-On Selling to Growth & Business Development.", periods: [{ organization: "Kahla Optical", dates: "2021–2025" }, { organization: "Innovation for Solar System", dates: "2025–Present" }], journey: salesJourney,
    training: {
      label: "SALES ENABLEMENT & TALENT DEVELOPMENT",
      description: "Within the Growth Manager role, Ahmed designs and delivers practical Solar Sales training, assesses participants for commercial readiness and supports internal talent selection.",
      steps: [
        { label: "TRAIN", description: "Practical training in qualification, needs discovery, consultative selling, pricing, objections, negotiation and follow-up." },
        { label: "ASSESS", description: "Participant evaluation focused on commercial readiness and application of the sales process." },
        { label: "DEVELOP TALENT", description: "Selected two trainees who were hired into Innovation immediately after completing the program." },
      ],
      outcome: "2 trainees hired after course completion",
    },
    partnership: {
      label: "INDUSTRY–ACADEMIC PARTNERSHIP DEVELOPMENT",
      heading: "Applied Renewable-Energy Training Partnership",
      context: "Connect renewable-energy academic learning with supervised real-project cases from industry.",
      roleLabel: "ROLE", role: "Proposal & Partnership Development",
      developedLabel: "WHAT AHMED DEVELOPED", developed: "Formal applied-training proposal · official approval request · program structure · cooperation framework",
      modelLabel: "PROGRAM MODEL", model: ["Real Project Case", "Site Survey", "Analysis", "Preliminary Design", "Economic Review", "Report / Presentation"],
      outcomeLabel: "OUTCOME", outcome: "Formal cooperation established between Innovation and the Technological Institute.",
      statusLabel: "STATUS", status: "Partnership established. Applied execution and Pilot outcomes pending.",
    },
    solarLabel: "SOLAR / RENEWABLE ENERGY EXPERTISE", domains: solarDomains,
  },
};
