import type { Project } from "../types/portfolio";
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



export const projects: Project[] = [
  {
    title: "AI Chatbot SaaS Platform",
    description:
      "Multi-tenant platform where teams chat with their own docs. Upload files or links, we chunk and embed content with pgvector, then stream grounded answers with citations. Clean, responsive UI with organization-level controls.",
    tech: [
      "React", "TypeScript", "Node.js", "PostgreSQL", "pgvector",
      "OpenAI", "Prisma", "Tailwind CSS"
    ],
    features: [
      "Document ingestion: PDF/DOCX uploads and URL fetch; automatic chunking & deduplication",
      "Retrieval: vector search with metadata filters and source citations",
      "Chat UX: streaming responses, follow-ups, and feedback capture",
      "Security: org membership, role-based access; per-user rate limits",
      "Ops: environment configs, structured logging, health checks"
    ],
    status: "Production",
    //link: "#",
    //repo: "NA",
    image: chatbot3,
    imageAlt: "Chatbot SaaS UI",
    gallery: [chatbot3, chatbot1, chatbot2],
  },
  {
    title: "Fitness Scheduling App",
    description:
      "All-in-one app to track meals, macros, and strength training. Set targets, log food fast, build workouts, and visualize progress. Designed mobile-first with clean charts and a smooth logging flow. AI features are planned and scaffolded but not enabled yet.",
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
    status: "Development",
    //link: "#",
    //repo: "#",
    image: fitnessImg,
    imageAlt: "Fitness scheduling calendar",
    gallery: [fitness2, fitnessImg],
  },
  {
    title: "Modular Business Card Site",
    description:
      "Dynamic business card website with modular component architecture and customizable layouts.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Pluggable modules (Calendly, etc.)",
      "SEO-friendly & performant",
      "Animation & theming system",
      "Content-driven sections",
    ],
    status: "Production",
    //link: "#",
    //repo: "#",
    image: cardSiteImg,
    imageAlt: "Business card landing page",
    gallery: [cardSiteImg, cardSite1, cardSite2, cardSite4, cardSite3],
  },
];
