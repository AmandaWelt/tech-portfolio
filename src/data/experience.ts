import type { ExperienceItem } from "../types/portfolio";

export const experienceSummary =
  "Senior product engineer and frontend team lead on Constellation's X2 payment platform (CSIPay Portal). Set direction and review standards while designing and building operator UI and contributing full stack on cross cutting payment initiatives. Partners with AccountD, ChargeD, TreasuryD, and gateway teams on API contracts and cross service defects. Previously shipped multi tenant SaaS and grounded LLM products end to end. TS/SCI clearance; background in intelligence analysis and digital design.";

export const experience: ExperienceItem[] = [
  {
    title: "Senior Engineer · Front End Team Lead",
    company: "Constellation Payments",
    period: "October 2025 - Present",
    description:
      "Team lead for CSIPay Portal (X2-Admin-PWA), the enterprise admin surface PayFac and operations staff use to run merchants, payments, balances, and reporting on the X2 platform. Hands on across complex money movement flows; sets frontend direction, review standards, and release quality for the group.",
    highlights: [
      "Directed merchant onboarding overhaul and activation checklist (transaction cost breakdown, financial display, and alerting filters) integrated with AccountD and onboarding services.",
      "Owned Payment History and transaction operations: server side date/time filters, advanced search, ACH/card detail surfaces, refunds, fee breakdowns, and balance detail pages used in daily ops.",
      "Shipped reporting and disbursement UI with product and QA through sandbox to production.",
      "Worked across service boundaries (portal, ChargeD, TreasuryD, AuthD), debugging ACH/token metadata, pagination, and API contract gaps with backend owners.",
      "Established frontend standards: typed API clients, form patterns, permission gates, and test coverage across a large TypeScript webpack codebase.",
      "Improved release velocity and quality through high volume PR review, coordination, and product partnership on BRDs and payment edge cases.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Funky Outer Space",
    period: "April 2023 - October 2025",
    description:
      "Owned full stack product delivery end to end across client engagements, including multi tenant SaaS and production LLM document Q&A.",
    highlights: [
      "Turned rough ideas into structured designs with tight feedback loops, same habits as product and UI collaboration.",
      "Built AI document Q&A with embeddings, pgvector retrieval, and citation backed streaming answers.",
      "Developed a reusable UI system and environment/observability practices for faster, safer releases.",
    ],
  },
  {
    title: "Tattoo Artist (Digital Design)",
    company: "Sacred Art Tattoo",
    period: "Feb 2021 - April 2024",
    description:
      "Custom digital artwork and client collaboration. Visual craft that carries directly into UI, layout, and product polish.",
    highlights: [
      "Turned rough ideas into structured designs with tight feedback loops, same habits as product and UI collaboration.",
      "Studied Computer Science during this period and transitioned into software engineering.",
    ],
  },
];
