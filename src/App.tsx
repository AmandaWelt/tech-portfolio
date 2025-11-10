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
    frameworks: ["React", "Node.js", "Tailwind CSS", "Express.js"],
    databases: ["PostgreSQL", "MySQL", "Prisma"],
    tools: [
      "Git/GitHub",
      "RESTful API Development",
      "API Integration",
      "AI/LLM Integration (OpenAI, pgvector)",
      "Responsive Web Design",
      "UI/UX Principles",
    ],
    additional: ["AI-Powered Application Development", "Data Modeling"],
  };

  const experience: ExperienceItem[] = [
    {
      title: "Software Engineer",
      company: "Funky Outer Space",
      period: "2024–Current",
      description:
        "Full-stack engineer shipping MVPs end-to-end (React/TypeScript + Node/PostgreSQL). Owned UI, APIs, and data modeling across Snookie (AI doc Q&A), a macro & training tracker, and a modular business card site.",
      highlights: [
        "Built document ingestion + retrieval with embeddings and pgvector; streamed grounded answers with citations.",
        "Designed and delivered full-stack features: typed REST APIs, auth, org membership/roles, secure data flows.",
        "Improved developer speed with a reusable component system and Tailwind design primitives; consistent UX across products.",
        "Hardened apps with validation, error states, and environment configs; set up reliable deploys and observability.",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Funky Outer Space (FOS)",
      period: "6-month Internship · 2024",
      description:
        "Apprenticeship focused on learning and applying the exact stack I use today: React/TypeScript, Node.js, PostgreSQL/Prisma, and Tailwind. Contributed to production code under mentorship and shipped small features end-to-end.",
      highlights: [
        "Built UI features and fixed bugs; added typed REST endpoints and basic data models.",
        "Learned Git/GitHub workflows, code reviews, and issue tracking.",
        "Implemented auth flows, form validation, and clear error/empty states.",
        "Set up local dev envs, environment variables, and DB seed scripts; used Postman/Insomnia for API testing.",
        "Cross-browser QA and accessibility checks; wrote concise notes for hand-offs.",
        "Introduced to embeddings + pgvector basics used later in Snookie (AI doc Q&A)."
      ],
    },    
    {
      title: "Tattoo Artist- Digital Design",
      company: "Sacred Art Tattoo",
      period: "2021–2024",
      description:
        "Managed custom client projects end-to-end, translating vague ideas into precise, balanced designs.",
      highlights: [
        "Built strong client trust through clear expectation-setting and iterative sketches.",
        "Honed visual precision, symmetry, and digital illustration skills that now inform UI detail work.",
      ],
    },
    {
      title: "Human Intelligence Collector (35M)",
      company: "United States Army",
      period: "2015–2019",
      description:
        "Produced intelligence reporting and conducted interviews in high-stakes environments.",
      highlights: [
        "Developed analytic and leadership skills under pressure; cross-cultural communication in Levantine Arabic.",
        "Previously held TS/SCI clearance; meticulous about process, documentation, and accountability.",
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
            {activeSection === "experience" && <Experience experience={experience} />}
            {activeSection === "contact" && (
              <ContactSection
                email="Mandy@funkyouter.space"
                website="amandawelt.com"
                location="Oklahoma City, OK"
                resumeUrl="/AmandaWelt_Resume.png"  
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
