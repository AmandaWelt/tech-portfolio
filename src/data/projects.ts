import type { Project, ProjectSystemExplorer, SystemExplorerLayer } from "../types/portfolio";
import chatbot1 from "../Assets/snookie2.png";
import chatbot2 from "../Assets/snookie3.png";
import chatbot3 from "../Assets/snookie4.png";
import fitnessImg from "../Assets/fitness1.png";
import fitness2 from "../Assets/fitness2.png";
import cardSiteImg from "../Assets/cardSiteImg.png";
import cardSite1 from "../Assets/cardSite1.png";
import cardSite2 from "../Assets/cardSite2.png";
import cardSite3 from "../Assets/cardSite3.png";
import cardSite4 from "../Assets/cardsite4.png";

const se = (intro: string | undefined, layers: SystemExplorerLayer[]): ProjectSystemExplorer => ({
  enabled: true,
  intro,
  layers,
});

export const projects: Project[] = [
{
    slug: "aiugment",
    tagline: "Five trained AI agents in one project workspace, plan, spec, and ship without re briefing every session.",
    title: "Aiugment",
    description:
      "An AI agent workspace for software delivery. Five Bedrock powered specialists, project manager, analyst, developer, reviewer, and security, share one project record with requirements, tasks, diagrams, and GitHub pull requests. Chat is the control plane; SDLC artifacts live in Postgres, not ephemeral threads.",
    problem:
      "One generalist chatbot wears every hat in delivery. Goals blur into code suggestions, requirements never become tasks, and six hundred line diffs land on files nobody scoped. Context rots every session because there is no project memory and no real handoffs between planning, spec, implementation, and review.",
    solution:
      "A project workspace where each agent owns one job and shares the same record. Users describe what they are building in chat; specialists hand off via @mentions and @delegate, persist requirements and tasks, open scoped PRs on feature branches, and leave an audit trail from intake to merge.",
    myRole:
      "Product engineering on a team build, owned the React workspace SPA and Astro marketing site end to end (UI, UX, frontend architecture). Partner with backend and agent engineers on Flask API contracts, reconnectable SSE for @dev runs, AgentCore integration, and GitHub/Jira handoffs.",
    architecture: [
      "React 18 + TypeScript + MUI workspace SPA (Vite build embedded in Flask static); Astro 5 marketing site with homepage narrative from structured content.",
      "Flask API + SQLAlchemy + PostgreSQL for workspaces, projects, chat, requirements, tasks, milestones, diagrams, and billing.",
      "Five Amazon Bedrock AgentCore runtimes (@pm, @analyst, @dev, @reviewer, @security) with server side @delegate chaining and GitHub/Jira integrations.",
    ],
    technicalDecisions: [
      "Chat defaults to @pm as intake coordinator; specialists invoked explicitly or via ordered @delegate expansion.",
      "Long @dev streams show status lines, not full code deltas, while reconnectable SSE handles multi minute implementation runs.",
      "Requirements, tasks, and PR links persisted per project_id so handoffs survive sessions and onboarding reads the record, not chat history.",
      "Plan entitlements gate @dev, Auto Mode scheduler, reviewer, and security passes without fragmenting the workspace UX.",
      "Schema authority in a dedicated migrations repo; 100% backend and 90% frontend coverage gates in CI.",
    ],
    features: [
      "Five role specialized agents: PM intake, analyst specs, developer PRs, reviewer drift checks, security pass",
      "Project workspace: requirements with acceptance criteria, tasks, milestones, draw.io diagrams, OpenAPI artifacts",
      "Chat control plane with @mentions, @delegate handoffs, and reconnectable streaming for @dev",
      "GitHub and Bitbucket integration, scoped tasks open feature branch PRs with traceable task links",
      "Jira Cloud sync, compliance report exports (SOC 2, PCI, FedRAMP mappings), and PM daily digest email",
      "Multi workspace tenancy, team invites, billing with plan tiers from free planning through enterprise SSO",
    ],
    tech: [
      "React",
      "TypeScript",
      "Material UI",
      "Astro",
      "Flask",
      "PostgreSQL",
      "Amazon Bedrock AgentCore",
      "GitHub API",
      "Vite",
      "OpenTelemetry",
    ],
    impact: [
      "Early teams report onboarding from specs and tasks without constant code pairing, project record replaces walkthrough docs.",
      "Async handoffs: features specced and branched during meetings without re explaining architecture every session.",
      "Decisions traceable from requirements through PRs, not buried in Slack threads or lost chat context.",
    ],
    impactMetric: "5 specialists · persisted SDLC trail · GitHub PR handoffs · compliance ready exports.",
    lessonsLearned: [
      "Planning artifacts belong in the database, not lost when the chat scrolls away.",
      "Role clarity and explicit handoffs beat one overloaded generalist prompt chain.",
      "Scoped implementation runs and PR traceability reduce review thrash on large, unscoped diffs.",
    ],
    role: "Product engineering · team · workspace UI & frontend",
    status: "Production",
    link: "https://aiugment.ai",
    image: "/aiugment.png",
    imageAlt: "Aiugment AI agent workspace",
    backdrop: "aiugment-rain",
    systemExplorer: se(
      "Flask/Postgres workspace API + React/MUI SPA with five Bedrock AgentCore specialists; Astro marketing site shares the same product narrative.",
      [
        {
          id: "ui",
          label: "UI",
          headline: "MUI workspace shell, chat as control plane",
          bullets: [
            "WorkspacePage.tsx: tabbed shell (chat, requirements, tasks, diagrams, settings) keyed by workspace_id + project_id in URL search params.",
            "Streaming chat uses role specific typing captions and status lines, not full code deltas, during multi minute @dev runs.",
            "Lazy loaded SchedulePanel, ReportsPanel, WorkspaceDiagramsPanel; product tour tied to data-product-tour selectors.",
            "aiugment-static: Astro 5 homepage with five slide sections driven by content.ts and AgentCard.astro.",
          ],
        },
        {
          id: "state",
          label: "State / data",
          headline: "Project scoped Postgres, not chat only memory",
          bullets: [
            "models.py: Workspace, Project, Requirement, Task, Milestone, ProjectDiagram, ChatStreamJob/Event, all tenancy scoped.",
            "Frontend merges server chat with transient typing rows; stream reconnect sessions in localStorage (workspaceStreamSession).",
            "Chat drafts per project (workspaceChatDrafts); requirements/tasks polled and merged server side.",
            "plan_entitlements.py gates @dev, @reviewer, @security, and design attachment size without forking the shell.",
          ],
        },
        {
          id: "api",
          label: "API / integration",
          headline: "Flask /api, AgentCore invoke, GitHub/Jira/billing",
          bullets: [
            "routes/api.py: chat_send + reconnectable chat_stream; CSRF-exempt JSON for workspaces, projects, billing, onboarding.",
            "chat_stream_jobs.py: DB-backed SSE jobs with 45-minute stale job cutoff; events replayed on reconnect.",
            "OpenTelemetry trace propagation to AgentCore; token usage parsed from Bedrock stream events (token_usage.py).",
            "GitHub PAT encrypted per project; Jira OAuth via jira_sync.py; compliance CSV export (SOC 2, PCI, FedRAMP mappings).",
          ],
        },
        {
          id: "logic",
          label: "Business logic",
          headline: "@mention routing, @delegate chains, SDLC orchestration",
          bullets: [
            "chat_routing.py: no @mention defaults to @pm; explicit @pm|analyst|dev|reviewer|security prefixes.",
            "chat_delegation.py: @delegate blocks parsed from assistant replies (max 5); analyst delegates only on explicit lines.",
            "Analyst produces requirements/tasks/diagrams; @dev opens feature branch PRs with task links; reviewer/security validate scope.",
            "Billing webhooks (payment_webhooks.py); PM daily digest email for async handoffs.",
          ],
        },
        {
          id: "metrics",
          label: "Metrics / impact",
          headline: "Quality gates and traceability",
          bullets: [
            "pytest --cov-fail-under=85 on app/config/run (pyproject.toml); frontend vitest coverage in CI.",
            "Audit trail: requirements to tasks to pr_url on Task rows; compliance_report maps controls to artifacts.",
            "Token usage persisted per message (MessageTokenMeta UI, profile Usage page aggregates).",
            "Onboarding reads project record, not scrollback, for context that survives sessions.",
          ],
        },
        {
          id: "lessons",
          label: "Lessons",
          headline: "Specialists + persisted artifacts beat one thread",
          bullets: [
            "Status line streaming keeps the control plane readable; full diffs belong in PRs, not chat bubbles.",
            "Reconnectable SSE jobs prevent lost progress on tab reload during long AgentCore invocations.",
            "Explicit @delegate parsing prevents accidental handoffs when models mention @pm in prose.",
            "Marketing five slide narrative and workspace tour share one story: context rot, role clarity, scoped handoffs.",
          ],
        },
      ],
    ),
  },
  {
    slug: "constellation-csi-pay",
    tagline: "Enterprise PayFac operations, merchant onboarding, payment history, ACH, treasury, and reporting at scale.",
    title: "Constellation Payments · CSI Pay Portal",
    description:
      "The admin portal for Constellation Payments' X2 platform. PayFac staff and merchant operators use it daily to onboard merchants, run card and ACH transactions, configure fees and payout schedules, investigate payment history, reconcile disbursements, and generate reports, backed by fine grained RBAC across 15+ microservices.",
    problem:
      "PayFac operators were blocked by fragmented merchant go live, unreliable high traffic payment history search, broken ACH refunds in production, fee display inaccuracies, and payout reconciliation gaps. Money movement workflows needed a single trusted surface where accuracy, permissions, and cross service coordination could not fail silently.",
    solution:
      "Led delivery on the CSI Pay Admin Portal (X2-Admin-PWA) while shipping coordinated changes across ChargeD, TreasuryD, AuthD, AccountD, RiskD, and FundingD. Structured merchant activation gates, server side payment search, cents accurate fee management, ACH refund restoration, and treasury reconciliation APIs, each tied to permissions, tests, and production hotfix discipline.",
    myRole:
      "Frontend team lead on a multi engineer platform, designed and built operator UI across X2-Admin-PWA (~680 modules) and contributed full stack on cross cutting initiatives (API contracts, AuthD migrations, ChargeD query layers). Work closely with backend, product, and QA on PayFac money movement flows.",
    architecture: [
      "React 17 + TypeScript + Redux/MUI Admin PWA behind API Gateway; webpack build with Storybook and Jest/RTL coverage on critical paths.",
      "Microservices tier: AuthD (RBAC), AccountD (merchants), ChargeD (card/ACH transactions), TreasuryD (fees/payouts/balances), RiskD, FundingD, ReportingD, OnboardingD.",
      "MongoDB per service, Redis auth cache, AWS SQS/S3, OpenTelemetry; Zift ACH and WorldPay integrations in operator workflows.",
    ],
    technicalDecisions: [
      "Cross service merchant activation via enableRequirements flags on AccountD, fees, risk ruleset, and payout schedule gate account enable in UI and API.",
      "Portal specific payment query contract in ChargeD (PORTAL_PAYMENT_QUERY_KEYS) isolated from generic API consumers.",
      "Legacy safe Mongo date queries and timezone safe processed time filters, local wall datetime converted to UTC before server search.",
      "Cents storage for core fee amounts with TreasuryD migration scripts and shared amountConversion utilities.",
      "Treasury reconciliation API (PUT /balance/:payoutId) paired with balance-entry.update permission migration in AuthD.",
      "Permission first feature rollout, every sensitive surface (fee delete, activation, banking details) gated before UI ships.",
    ],
    features: [
      "Merchant activation checklist and multi step KYC onboarding (owners, banking, signatures, payment profile)",
      "Payment history: server side date/time filters, advanced search, ACH/card detail surfaces, refunds, and fee breakdowns",
      "Fee management: merchant fee edit/delete, core/recurring fee UX, interchange validation, transaction cost on disbursements",
      "Payouts and disbursements: list/detail hardening, balance to payout linking, CSV/XLS export for finance ops",
      "Reporting filter enhancements and alerting; role/permission migrations for secure feature rollout",
      "Production hotfixes on revenue critical paths, ACH refunds (Zift), void vs refund quick filter, pagination edge cases",
    ],
    tech: [
      "React",
      "TypeScript",
      "Material UI",
      "Redux",
      "Formik",
      "Node.js",
      "Koa",
      "MongoDB",
      "Redis",
      "OpenTelemetry",
    ],
    impact: [
      "Led merchant activation checklist shipped across 6 microservices, structured go live for PayFac operations.",
      "Architected payment history search platform across Admin PWA and ChargeD query engine with matching unit tests.",
      "296 commits and 70+ Jira initiatives in documented window; 234 commits (79%) on primary portal codebase.",
      "Sustained production ownership including hotfixes through May 2026 on refund, filter, and disbursement defects.",
    ],
    impactMetric: "296 commits · 70 CSIPAY tickets · 11 repos · 6-service activation flagship.",
    lessonsLearned: [
      "Fintech UI wins when validation parity with backend prevents silent completion blockers in onboarding.",
      "Cross service features need a shared gate model (enableRequirements), not one off UI checks per tab.",
      "Operator trust requires cents accurate fees, timezone safe dates, and production ready error states on payout flows.",
    ],
    role: "Frontend team lead · full stack · PayFac platform",
    status: "Production",
    image: "/csipay.png",
    imageAlt: "Constellation Payments CSI Pay Admin Portal preview",
    systemExplorer: se(
      "React 17/Redux Admin PWA (@exactpayments/x2-admin-pwa) via API Gateway into AuthD, AccountD, ChargeD, TreasuryD, and sibling microservices.",
      [
        {
          id: "ui",
          label: "UI",
          headline: "Permission gated operator workflows",
          bullets: [
            "ActivateAccount.tsx: activation checklist gated on account.enableRequirements (fees, risk ruleset, payout schedule).",
            "PaymentsHistory.tsx (~1,400 lines): Material React Table + MUI DesktopDateTimePicker; Luxon wall datetime to UTC before API calls.",
            "Formik/Yup onboarding stepper; WorldPay MID warning blocks fee configuration until bankBoarding.worldpay.mid is set.",
            "FeeSection modals use amountConversion for cents accurate display and edit of core/recurring fees.",
          ],
        },
        {
          id: "state",
          label: "State / data",
          headline: "Redux thunks and portal filter state",
          bullets: [
            "paymentHistoryQueryFilters.ts: PaymentHistoryPortalFiltersState (amount, last4, cardholder, instrument, transactionTypes, processedFrom/To).",
            "buildPaymentHistoryQueryFilters serializes filters to query params for getPaymentList thunk; sessionStorage persists search term.",
            "accounts redux: enableRequirementsFlags drive checklist completion; accountsGetAccount loads account on activation tab mount.",
            "useServerPagination, client does not filter full payment history locally at operator scale.",
          ],
        },
        {
          id: "api",
          label: "API / integration",
          headline: "Gateway routes and service specific contracts",
          bullets: [
            "Admin PWA to API Gateway to AuthD (RBAC), AccountD, ChargeD, TreasuryD, RiskD, FundingD, ReportingD.",
            "ChargeD payment-query-portal.ts: PORTAL_PAYMENT_QUERY_KEYS stripped from generic Mongo query path.",
            "buildProcessedTimeRangeExpr handles legacy BSON Date vs ISO string via $convert with onError/onNull guards.",
            "CSIPAY-2767: TreasuryD balance to payout linking paired with AuthD balance-entry.update permission migration.",
          ],
        },
        {
          id: "logic",
          label: "Business logic",
          headline: "Activation gates, money movement, reconciliation",
          bullets: [
            "Merchant activation requires fees + risk ruleset + payout schedule before account enable in UI and API.",
            "Portal filters: sale vs authorization vs refund; void vs refund quick filter fix (CSIPAY-2803); ACH refund restoration (CSIPAY-2714).",
            "Core fee amounts stored in cents (dollarsToStoredAmount × 100); TreasuryD migration scripts align DB values.",
            "Disbursement cost breakdown and CSV/XLS export for finance ops; Zift ACH and WorldPay in operator flows.",
          ],
        },
        {
          id: "metrics",
          label: "Metrics / impact",
          headline: "Documented delivery and reliability",
          bullets: [
            "296 commits, 70 CSIPAY tickets, 12 repos, 234 commits (79%) on X2-Admin-PWA (x2-evidence).",
            "CSIPAY-2119: merchant activation checklist shipped across 6 microservices.",
            "Payment history platform: CSIPAY-416/2723 date time filtering + ChargeD portal query engine with unit tests.",
            "Production hotfixes through May 2026 on refund filters, pagination edge cases, payout hardening.",
          ],
        },
        {
          id: "lessons",
          label: "Lessons",
          headline: "Financial UI needs server truth and permission parity",
          bullets: [
            "Operator scale payment history requires server side search, client filters fail at PayFac volume.",
            "Permissions migrations and UI gating must ship together, CSIPAY-2767 tied treasury endpoint to AuthD first.",
            "Legacy Mongo date/string mixes need defensive $convert query layers, never assume clean schemas.",
            "Cents storage with shared amountConversion prevents fee display drift between TreasuryD and Admin PWA.",
          ],
        },
      ],
    ),

  },
  {
    slug: "sapo-dashboard",
    tagline: "From forecast signal to published staffing plan, one ops command center for restaurant workforce decisions.",
    title: "SAPO · Operations Command Center",
    description:
      "SAPO Dashboard is an operations focused Expo app for shift planning, forecasting, staffing decisions, and recommendation tracking. Restaurant ops managers move from demand signals to published schedules through a unified command center, Dashboard, Forecast Workbench, and Staffing Execution, with a persisted recommendation lifecycle and premium dual theme support across mobile, tablet, and web.",
    problem:
      "Restaurant operators juggle disconnected forecast, staffing, and schedule tools. Card first dashboards hide whether coverage matches demand, labor drift goes unnoticed until overtime hits, and forecast insights die in chat instead of flowing into auditable staffing actions.",
    solution:
      "Rebooted SAPO into a shift centric command center where scenario modeling composes staffing recommendations, operators review and apply changes in a structured inbox, and every decision leaves an audit trail. Weather, events, and promo inputs drive projected sales and risk states; recommendations progress draft to reviewed to applied to published with actor attribution.",
    myRole:
      "End to end product owner, designed and built the full SAPO experience: Expo Router screens, semantic theme system, ops domain model, recommendation lifecycle, responsive layouts, HTML prototypes, and Jest tests. Solo delivery from concept through production ready prototype; handed off AWS deploy pipeline to platform engineering.",
    architecture: [
      "Expo 55 + React Native 0.83 + TypeScript; Expo Router file based routes; NativeWind/Tailwind for cross platform styling.",
      "Feature modules: dashboard KPIs, forecast scenario engine, staffing execution tabs; pure opsModel.ts transitions separate from React opsStore.",
      "AsyncStorage persistence for recommendation state and theme mode; static web export deployed via GitHub Actions to S3 + CloudFront.",
    ],
    technicalDecisions: [
      "Pure opsModel + React opsStore, testable lifecycle transitions (draft/reviewed/applied/published) isolated from UI.",
      "Semantic theme tokens for dark/light parity, no ad hoc color literals across dashboard, forecast, and staffing surfaces.",
      "Client side scenario engine: rain, temperature, local events, and promos compose projected sales, confidence bands, and staffing deltas.",
      "Responsive breakpoints: bottom nav on mobile, sidebar at desktop web ≥1024px, one codebase for field managers and back office.",
      "Single repo web export (expo export --platform web) with OIDC deploy pipeline, no separate web codebase to maintain.",
    ],
    features: [
      "Command Center dashboard: service health score, recommendation queue, KPI strip, sales/weather/events cards, staffing status",
      "Forecast Workbench: scenario controls, confidence projection chart, driver impact table, Save + Send to Staffing composer",
      "Staffing Execution: recommendation inbox, schedule editor by role/day, apply and publish actions, full audit timeline",
      "Recommendation lifecycle with persisted history, actor, timestamp, and notes on every state transition",
      "Dual theme premium UI; responsive mobile, tablet, and desktop web layouts",
      "HTML prototypes for forecast, staffing scheduler, and workforce dashboard (design exploration phase)",
    ],
    tech: [
      "Expo",
      "React Native",
      "TypeScript",
      "Expo Router",
      "NativeWind",
      "Tailwind CSS",
      "AsyncStorage",
      "react-native-svg",
      "Jest",
      "AWS S3",
      "CloudFront",
    ],
    impact: [
      "Unified three screen ops flow, forecast scenario to staffing recommendation to published schedule with audit trail.",
      "Initial delivery: full app scaffold to production ready prototype in a single commit (21k+ lines, domain + tests + theme).",
      "Platform team adopted GitHub Actions deploy pipeline (PLATFORM-60) for dev/prod/sandbox environments.",
    ],
    impactMetric: "3 core flows · 4-state recommendation lifecycle · mobile + tablet + web.",
    lessonsLearned: [
      "Ops UX wins when recommendations have a lifecycle, not one off alerts managers ignore.",
      "Forecast without staffing execution is a dashboard; the handoff must be one tap, not a export.",
      "Pure domain models for transitions make lifecycle UX testable before backend APIs exist.",
    ],
    role: "End to end product · UI design & build · cross platform",
    status: "Development",
    repo: "https://github.com/guaneri/SAPO",
    demo: "/sapo-demo/",
    image: "/sapo.png",
    imageAlt: "SAPO restaurant operations command center preview",
    systemExplorer: se(
      "Expo 55 + React Native 0.83 command center: three Expo Router screens, pure opsModel transitions, AsyncStorage persistence, client first MVP.",
      [
        {
          id: "ui",
          label: "UI",
          headline: "Three screen ops command center",
          bullets: [
            "app/(dashboard)/index.tsx: KPI strip, recommendation queue, sales/weather/staffing cards, events calendar, audit preview.",
            "app/forecast.tsx: StepControls (rain, temp, event, promo), SVG confidence chart (react-native-svg), driver impact DataTable.",
            "app/staffing.tsx: inbox/schedule/audit tabs, RecommendationQueue, role/day schedule DataTable with gap labels.",
            "useBreakpoint: BottomNav below 1024px; Sidebar at desktop web; ThemeProvider toggles dark/light semantic palette.",
          ],
        },
        {
          id: "state",
          label: "State / data",
          headline: "Pure opsModel + opsStore with AsyncStorage",
          bullets: [
            "opsModel.ts: createRecommendation (starts draft) and transitionRecommendationState append audit history with actor/action/note.",
            "opsStore.tsx: hydrates from loadOpsState on mount, auto saves after hydrated flag; key sapo-ops-state-v1 in opsStorage.ts.",
            "Recommendation tracks source ('forecast'|'manual'), status lifecycle, projectedSales, confidence, risk, StaffingDelta.",
            "Theme mode persisted separately; semantic tokens in src/theme/tokens.ts drive dark/light parity.",
          ],
        },
        {
          id: "api",
          label: "API / integration",
          headline: "Client first MVP, no backend in repo",
          bullets: [
            "Scenario engine and dashboard KPIs run client side; mocks in src/mocks/dashboardData.ts and useDashboardState.",
            "Expo 55, expo-router ~55, NativeWind 4, AsyncStorage 2.2, no fetch/axios dependencies in prototype.",
            "HTML prototypes in tech-portfolio/public/sapo-demo/ informed RN navigation before commit.",
            "Production path: expo export --platform web to S3 + CloudFront (Guaneri GitHub Actions, remote repo).",
          ],
        },
        {
          id: "logic",
          label: "Business logic",
          headline: "Forecast scenario to recommendation to published schedule",
          bullets: [
            "forecast.tsx: weatherEffect + rainEffect + eventEffect + promoEffect to totalPct; projectedSales = round(12800 × (1 + totalPct/100)).",
            "Risk: confidence < 60 to VOLATILE; projectedSales > 13600 to BUSY; else STABLE.",
            "createRecommendation composes staffing deltas (addHeads 0-2 by threshold), transitions to reviewed, router.push('/staffing').",
            "Staffing approve/publish: transitionRecommendation to applied then published ('Staffing Manager', 'General Manager').",
          ],
        },
        {
          id: "metrics",
          label: "Metrics / impact",
          headline: "Demo KPIs and decision support signals",
          bullets: [
            "pendingCount = recommendations where status !== 'published', open ops queue at a glance.",
            "Forecast chart: base vs scenario paths; uncertaintyPct = max(0.8, (100 - confidence) × 0.05).",
            "Schedule DataTable: role level gap labels ('Gap -1', 'On target') vs recommended headcount.",
            "AuditTimeline renders full history[], who moved what status and when.",
          ],
        },
        {
          id: "lessons",
          label: "Lessons",
          headline: "Lifecycle UX and testable domain before APIs",
          bullets: [
            "opsModel functions Jest tested in __tests__/opsModel.test.ts independent of React.",
            "LifecyclePill + draft to reviewed to applied to published makes ops state scannable without detail drawers.",
            "Semantic tokens enforce dark/light parity, no ad hoc color literals in feature components.",
            "Cross platform breakpoints from day one: field managers on phone, planners on desktop web ≥1024px.",
          ],
        },
      ],
    ),

  },
{
    slug: "ai-chatbot-saas",
    tagline: "Grounded document Q&A for teams, with citations users can verify.",
    title: "AI Chatbot SaaS Platform",
    description:
      "Multi tenant platform where teams chat with their own docs. Upload files or links, we chunk and embed content with pgvector, then stream grounded answers with citations. Clean, responsive UI with organization level controls.",
    problem:
      "Teams cannot trust generic chat for internal knowledge. Answers without sources create compliance risk, and ad hoc uploads do not scale across orgs with different permissions.",
    solution:
      "A multi tenant RAG product with ingestion pipelines, org scoped retrieval, streaming chat, and citation UX so users verify answers before acting on them.",
    myRole:
      "End to end product delivery, designed and built the React client (streaming chat, citations, org admin, ingestion UX) and collaborated on Node/pgvector backend, embedding strategy, and permission boundaries. Owned typed API contracts, resilient loading states, and production guardrails.",
    architecture: [
      "React + TypeScript client; modular feature folders for chat, org settings, and ingestion status.",
      "PostgreSQL + pgvector for embeddings; Prisma for schema evolution and safe queries.",
      "Node services for chunking, deduplication, and retrieval orchestration before the LLM call.",
    ],
    technicalDecisions: [
      "Chunking tuned for recall vs. context window; metadata preserved for filterable retrieval.",
      "Org filters applied before context assembly to prevent cross tenant leakage.",
      "Rate limits and clear error copy prevent support churn more than raw speed.",
    ],
    tech: [
      "React", "TypeScript", "Node.js", "PostgreSQL", "pgvector",
      "OpenAI", "Prisma", "Tailwind CSS"
    ],
    features: [
      "Document ingestion: PDF/DOCX uploads and URL fetch; automatic chunking & deduplication",
      "Retrieval: vector search with metadata filters and source citations",
      "Chat UX: streaming responses, follow ups, and feedback capture",
      "Security: org membership, role based access; per user rate limits",
      "Ops: environment configs, structured logging, health checks"
    ],
    impact: [
      "61% reduction in internal support research time vs manual document search in pilot.",
      "84% of responses with citation clicks marked helpful by internal users.",
      "22 active teams, 8.7k monthly questions, 0.74s p95 time to first token.",
    ],
    impactMetric: "61% research time reduction · 84% helpful with citations · 0.74s p95 TTFT.",
    lessonsLearned: [
      "Citation UX matters as much as model quality, users abandon unverifiable answers.",
      "Explicit rate limits and error copy prevent support churn more than marginal latency gains.",
      "Operational visibility is a feature, not an afterthought.",
    ],
    role: "End to end product · full stack frontend lead",
    status: "Production",
    image: chatbot3,
    imageAlt: "Chatbot SaaS UI",
    gallery: [chatbot3, chatbot1, chatbot2],
  },
  {
    slug: "fitness-scheduling",
    tagline: "Nutrition, training, and progress in one calm surface.",
    title: "Fitness Scheduling App",
    description:
      "All in one app for meals, macros, and strength training: targets, fast logging, workouts, and trend charts. Mobile first layout with a deliberate logging flow. AI-assisted planning is scaffolded but not enabled yet.",
    problem:
      "Athletes juggle multiple apps for food, programs, and progress. Logging friction kills consistency, and charts rarely answer one clear question per view.",
    solution:
      "One mobile first product for nutrition, training, and progress with smart defaults, reversible actions, and server validated macro rules.",
    myRole:
      "End to end full stack owner, designed and built the React app (nutrition logging, workout editor, progress charts), Express API, Prisma data layer, and validation rules. Prioritized mobile performance and predictable sync semantics.",
    architecture: [
      "React + TypeScript SPA; route level code boundaries for nutrition vs. training.",
      "Express API with Prisma over PostgreSQL; migrations for evolving macro rules.",
      "Charts via Recharts with memoized series to keep interactions smooth.",
    ],
    technicalDecisions: [
      "Server side validation mirrors client rules to prevent silent drift.",
      "CSV import/export for portability and power user workflows.",
      "AI hooks isolated behind feature flags until prompts and cost model are ready.",
    ],
    tech: [
      "React", "TypeScript", "Express.js", "PostgreSQL",
      "Prisma", "Tailwind CSS", "Recharts"
    ],
    features: [
      "Nutrition: quick meal logging, custom foods, macro breakdown per meal/day",
      "Goals: daily macro targets (cut/recomp/bulk) with auto calorie/macros calc",
      "Training: workout builder with sets/reps/RPE, templates, rest timers",
      "Progress: bodyweight & PR tracking with trend charts",
      "Compliance dashboard: targets vs. actuals, weekly streaks",
      "Data: CSV export/import; sensible defaults and undo for last actions",
      "Roadmap: AI meal suggestions & macro planning; AI training tweaks (not enabled yet)"
    ],
    impact: [
      "Increased 7-day nutrition logging consistency from 41% to 69% in pilot users.",
      "Reduced average meal log completion time from 38s to 17s with optimized defaults.",
    ],
    impactMetric: "69% weekly streak retention · 17s avg meal log flow · 42ms median chart interaction latency.",
    lessonsLearned: [
      "Logging UX wins when defaults are smart and mistakes are reversible.",
      "Charts should answer one question per view, not every metric at once.",
    ],
    role: "End to end · full stack · data visualization",
    status: "Development",
    image: fitnessImg,
    imageAlt: "Fitness scheduling calendar",
    gallery: [fitness2, fitnessImg],
  },
  {
    slug: "modular-business-card",
    tagline: "Modular landing pages: contact, links, and embeds without rebuilding the shell.",
    title: "Modular Business Card Site",
    description:
      "Dynamic business card website with modular component architecture and customizable layouts.",
    problem:
      "Personal sites become one off JSX forks whenever a new section or embed is needed.",
    solution:
      "A token driven shell with a module registry and content driven sections so new blocks ship in hours, not days.",
    myRole:
      "End to end owner, designed and built the modular shell, all section modules, design tokens, animation system, and content driven composition layer. Defined module contract so stakeholders extend within guardrails without rewriting layout code.",
    architecture: [
      "React + TypeScript SPA with a registry based module system.",
      "Design tokens via CSS variables; lazy loaded third party embeds.",
      "Static friendly rendering path for SEO and fast first paint.",
    ],
    technicalDecisions: [
      "Registry validates module props at dev time where possible.",
      "Motion scoped to transform/opacity for compositor friendly animation.",
      "Ordering and visibility controlled from content, not code forks.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Pluggable modules (Calendly, etc.)",
      "SEO-friendly & performant",
      "Animation & theming system",
      "Content driven sections",
    ],
    impact: [
      "27% primary CTA conversion lift after modular content and hierarchy updates.",
      "New section/module additions cut from days to under 2 hours.",
    ],
    impactMetric: "98 Lighthouse performance · 100 accessibility · 1.4s LCP on emulated 4G.",
    lessonsLearned: [
      "Constraints unlock speed, modules are faster when the shell is opinionated.",
      "Token first styling scales better than per module CSS sprawl.",
    ],
    role: "End to end · UI design & build · design systems",
    status: "Production",
    image: cardSiteImg,
    imageAlt: "Business card landing page",
    gallery: [cardSiteImg, cardSite1, cardSite2, cardSite4, cardSite3],
  },

  {
    slug: "popup-jam",
    tagline: "Find or start a jam near you, map first discovery for musicians without forums or group chats.",
    title: "Pop-Up Jam · City Pilot",
    description:
      "Pop-Up Jam is a geo discoverable jam network prototype for musicians. A full screen dark map surfaces nearby sessions, public jams and leader led workshops, while a slide in panel handles search, filters, and a “New Jam Ping” flow where creators click the map to pin location before publishing.",
    problem:
      "Local jam opportunities are fragmented and invisible. Musicians rely on forums, group chats, or word of mouth, no real time, location aware view of who is playing, where, or what instruments are needed. Public jams and structured leader sessions get mixed together without clear modes or capacity signals.",
    solution:
      "A map first city pilot where events appear as typed markers (public vs. leader session), a Nearby Jams panel stays synced with the map, and creation enforces pin placement before publish. Filters, debounced search, discovery radius presets, and RSVP approval rules demonstrate the core UX before backend investment.",
    myRole:
      "Sole designer and engineer, end to end interactive prototype covering UX flows, visual system, Leaflet integration, demo data model, responsive panels, and client side create/join/report logic in one deployable HTML file.",
    architecture: [
      "Single static HTML file, zero build step, open locally or host as static assets for stakeholder demos.",
      "Leaflet 1.9.4 + CARTO dark_all basemap; custom divIcon markers with pulse animation for live events.",
      "In memory Demo state object (events, markersById, pickedLatLng) synchronizes map markers and sidebar list via shared getFilteredEvents().",
    ],
    technicalDecisions: [
      "Map first creation, users must click the map to set a pin before publishing, reinforcing location as the primary entity.",
      "Dual event taxonomy, public jams vs. leader sessions with distinct visual language, filters, and RSVP approval defaults.",
      "escapeHtml() on dynamic popup and card HTML, even in a demo, user generated titles/tags are sanitized.",
      "Debounced search (150ms) to avoid re render thrash when syncing markers and list cards.",
      "Responsive layout, desktop sidebar, mobile bottom sheet + FAB, full width create drawer on small screens.",
    ],
    features: [
      "Full screen dark map with custom markers for public jams (green) and leader sessions (orange)",
      "Nearby Jams panel with collapse, card click to fly, and live vs. scheduled timing badges",
      "New Jam Ping flow: title, tags, venue type, capacity, instruments needed, map pin placement",
      "Filters (All / Public Jams / Leader Sessions) and debounced search across title, tags, instruments",
      "Settings: discovery radius presets (urban / suburban / rural), discoverable toggle, reset demo data",
      "Join and report actions with capacity display and toast feedback",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Leaflet", "CARTO"],
    impact: [
      "Validated map first jam discovery UX in a zero backend prototype, stakeholders can open one file and walk the full flow.",
      "Dual session modes and approval gating modeled before auth, geospatial queries, or moderation backends exist.",
    ],
    impactMetric: "2 event types · map + list sync · mobile + desktop layouts.",
    lessonsLearned: [
      "Location first creation beats form first for geo social products, the pin step forces intent.",
      "Leader vs. public taxonomy should be visible in filters and markers, not buried in detail views.",
      "Single file prototypes ship faster for concept validation than scaffolding a full app shell.",
    ],
    role: "End to end · solo prototype · UI design & build",
    status: "Development",
    demo: "/popup-jam-demo/",
    demoLinks: [{ label: "City pilot (interactive map)", href: "/popup-jam-demo/" }],
    image: "/popupjam.png",
    imageAlt: "Pop-Up Jam map first musician discovery prototype",
    backdrop: "popup-jam-map",
    systemExplorer: se(
      "Single file jam-demo.html prototype: Leaflet 1.9.4 dark map, in memory Demo state, Oklahoma City seed events, zero build step.",
      [
        {
          id: "ui",
          label: "UI",
          headline: "Map first dark glass UI",
          bullets: [
            "Full screen #map with CARTO dark_all tiles; topbar with brand pill, filter group (All/Public/Leader), search, New Jam Ping CTA.",
            "Nearby Jams sidebar on desktop; mobile bottom sheet + FAB reopen; create drawer with map click pin instruction.",
            "Custom L.divIcon markers: green pulse for live public jams, orange for leader sessions; venue emoji overlays.",
            "CSS variables (--accent #c6f04a, backdrop filter glass) for consistent dark surface chrome.",
          ],
        },
        {
          id: "state",
          label: "State / data",
          headline: "In memory Demo object syncs map and list",
          bullets: [
            "Demo = { city, pickedLatLng, events[], markersById Map, currentUser }, all state in one closure, no persistence.",
            "Seed data: two OKC events (Scissortail Park acoustic jam + jazz workshop) offset from [35.4676, -97.5164].",
            "markersById Map keeps Leaflet markers in sync; clearMarkers() before rerender on filter changes.",
            "pickedLatLng gates create submission, createBtn validates pin exists before pushing to Demo.events.",
          ],
        },
        {
          id: "api",
          label: "API / integration",
          headline: "Zero backend, CDN assets only",
          bullets: [
            "Leaflet 1.9.4 CSS/JS from unpkg with SRI; CARTO tile PNGs fetched at runtime.",
            "joinEvent/reportEvent mutate Demo.events.attending client side; toast feedback only.",
            "resetBtn re runs seed() to restore demo events for stakeholder replays in one meeting.",
            "Production path: geospatial queries, auth, RSVP workflow, moderation queue, not in prototype.",
          ],
        },
        {
          id: "logic",
          label: "Business logic",
          headline: "Filters, dual session modes, discovery",
          bullets: [
            "getFilteredEvents(): active status + type filter + debounced search on title/tags/needs; live events sort first.",
            "Public jams: approvalRequired false, open Join; leader sessions default approvalRequired true in create form.",
            "Discovery area presets in settings (urban ~3 mi, suburban ~10-15 mi, rural county), UI-only toast on change.",
            "Create flow: eventType, venueType, capacity select, comma separated tags (max 10), instruments needed.",
          ],
        },
        {
          id: "metrics",
          label: "Metrics / impact",
          headline: "Demo capacity and discoverability signals",
          bullets: [
            "Card/popup shows attending pros vs amateurs and capacity (e.g. 5/12), joinEvent increments amateurs locally.",
            "Live pulse on markers where startWhen === 'now'; badges: Happening now / Within 1 hour / Scheduled today.",
            "Discoverable toggle in settings, create warns when user is hidden from network.",
            "eventCount badge in panel header reflects filtered visible events after search/filter.",
          ],
        },
        {
          id: "lessons",
          label: "Lessons",
          headline: "Location first creation, single file velocity",
          bullets: [
            "Map click required before publish forces location as primary entity, not an afterthought address field.",
            "escapeHtml() on dynamic popup/card HTML, even demos need XSS hygiene for user generated titles/tags.",
            "debounce(rerender, 150) on search prevents marker churn jank on low end mobile.",
            "Dual marker colors (green/orange) make session type scannable without opening detail cards.",
          ],
        },
      ],
    ),
  },
];
