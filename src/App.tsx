import React, { useState } from "react";
import { Mail, Code2, Briefcase } from "lucide-react";

import Hero from "./sections/Hero";
import ProjectsSection from "./sections/projects";
import SkillsSection from "./sections/skills";
import Experience from "./sections/Experience";
import ContactSection from "./sections/contact";

import type { ExperienceItem } from "./types/portfolio";
import { projects } from "./data/projects";
import mLogo from "./Assets/m.png";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("projects");

  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
    frameworks: [
      "React",
      "Vue.js",
      "Redux",
      "Node.js",
      "Tailwind CSS",
      "styled-components",
      "Express.js",
    ],
    databases: ["PostgreSQL", "MySQL", "Prisma"],
    tools: [
      "Git/GitHub",
      "Jira",
      "RESTful API Development",
      "API Integration",
      "AI/LLM Integration (OpenAI, pgvector)",
      "Progressive Web Apps (PWA)",
      "Responsive Web Design",
      "UI/UX Principles",
    ],
    additional: ["AI-Powered Application Development", "Data Modeling"],
  };

  const experienceSummary =
    "I build and lead front-end work on complex products—merchant tooling, payments, permissions, and onboarding—in React and TypeScript. I partner with backend and product early on API contracts and edge cases so delivery stays predictable, not reactive.\n\nI still write code every day: clear patterns, strong typing, and tests where they earn their keep. I have shipped MVPs full-stack, built LLM-backed product surfaces end to end (retrieval, grounding, UX), and spent years in client-facing creative work—so I care about maintainable UI, honest UX, and communication that keeps teams aligned.";

  const experience: ExperienceItem[] = [
    {
      title: "Senior Engineer, Front End Team Lead",
      company: "Constellation Payments",
      period: "October 2025 – Present",
      description:
        "Merchant admin and payments tooling in React and TypeScript—leading a small front-end team while staying hands-on on complex flows.",
      highlights: [
        "Lead a small frontend team. Review code, set direction, help unblock work.",
        "Work directly with backend and product to figure out API contracts and edge cases early, especially around payments, balances, and permissions.",
        "Owned the frontend of merchant onboarding. Built multi-step flows, validation, and UX tied into onboarding APIs and existing financial systems.",
        "Standardized patterns for forms, permissions, and state management. Cut down a lot of one-off implementations across the app.",
        "Partnered on how we build model-backed product features: practical patterns, clear guardrails, and UX that earns trust instead of risky automation.",
        "Keep a high bar for code quality. Strong typing, practical tests, and maintainable components.",
      ],
      footer: "Tech: React, TypeScript, Redux, REST APIs, Styled Components",
    },
    {
      title: "Software Engineer",
      company: "Funky Outer Space",
      period: "2024 – October 2025",
      description:
        "Built and shipped multiple MVPs end to end. Covered frontend, backend, and database design.",
      highlights: [
        "Built a document Q&A product: ingestion and retrieval with embeddings and pgvector, streaming grounded answers with citations.",
        "Designed typed REST APIs, auth flows, and role-based access for multi-tenant apps.",
        "Built a reusable component system with Tailwind. Made UI more consistent and faster to develop.",
        "Improved reliability with better validation, error handling, and environment setup.",
        "Set up basic observability and deployment flows so projects were easier to maintain.",
      ],
      footer: "Tech: React, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind",
    },
    {
      title: "Software Engineering Intern",
      company: "Funky Outer Space",
      period: "2024",
      description:
        "Contributed to production features across React and Node.",
      highlights: [
        "Built UI components, simple APIs, and data models used in live apps.",
        "Worked through code reviews, Git workflows, and issue tracking.",
        "Implemented auth flows, validation, and error states.",
        "Helped with QA, cross-browser checks, and small fixes across the stack.",
      ],
    },
    {
      title: "Tattoo Artist (Digital Design)",
      company: "Sacred Art Tattoo",
      period: "2021 – 2024",
      description:
        "Designed custom digital artwork for clients. Took rough ideas and turned them into clear, structured designs.",
      highlights: [
        "Worked in tight feedback loops with clients. That carried over directly into how I approach UI and product work.",
        "Built strong habits around communication, constraints, and delivering exactly what was asked for.",
        "Developed attention to detail that shows up in layout, spacing, and visual balance in UI.",
        "Studied Computer Science during this time and transitioned into software engineering.",
      ],
    },
    {
      title: "Human Intelligence Collector (35M)",
      company: "United States Army",
      period: "2015 – 2019",
      description:
        "Conducted interviews and produced intelligence reports in high-pressure environments.",
      highlights: [
        "Learned how to communicate clearly, ask better questions, and make decisions with incomplete information.",
        "Previously held TS/SCI clearance.",
      ],
    },
  ];
  

  const navigation = [
    { id: "projects", label: "Projects", icon: Code2 },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <Hero logoSrc={mLogo} />

      {/* Main Content */}
      <div className="bg-white text-black">
        {/* Bulletproof content container (mobile → ultrawide) */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6">
          {/* Navigation (wrap on small screens to prevent overflow) */}
          <nav className="border-b border-gray-200">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              {navigation.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center space-x-2
                    px-3 py-4 sm:px-6 md:px-8
                    font-light tracking-wide transition-all duration-300 border-b-2 ${
                      activeSection === id
                        ? "border-black text-black"
                        : "border-transparent text-gray-600 hover:text-black hover:border-gray-300"
                    }`}
                >
                  <Icon size={16} strokeWidth={1} />
                  <span className="text-xs sm:text-sm uppercase">{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Sections */}
          <div className="px-4 sm:px-8 py-12 sm:py-16">
            {activeSection === "projects" && <ProjectsSection projects={projects} />}
            {activeSection === "skills" && <SkillsSection skills={skills} />}
            {activeSection === "experience" && (
              <Experience experience={experience} summary={experienceSummary} />
            )}
            {activeSection === "contact" && (
              <ContactSection
                email="Amanda.jolyn@gmail.com"
                website="amandawelt.com"
                location="Oklahoma City, OK"
                resumeUrl="/WeltResume.pdf"
                githubUrl="https://github.com/mandywelt"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
