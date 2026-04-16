import React, { useState } from "react";
import { motion } from "framer-motion";
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
    "Senior front end team lead (React, TypeScript, Redux). Sets technical direction for a small team while remaining hands-on on complex UI, permissions, and API integration. Experienced shipping full-stack products and retrieval-based LLM features with verifiable outputs. Prior TS/SCI clearance; background in intelligence analysis and digital design.";

  const experience: ExperienceItem[] = [
    {
      title: "Senior Engineer, Front End Team Lead",
      company: "Constellation Payments",
      period: "October 2025 – Present",
      description:
        "Leading a small frontend team on merchant tooling, payments, and onboarding—hands-on on complex flows while setting direction for the group.",
      highlights: [
        "Lead a small frontend team, guiding direction and removing blockers.",
        "Partner with backend and product to shape APIs and edge cases around payments, balances, and permissions.",
        "Owned merchant onboarding flows from UX to validation to system integration.",
        "Created shared patterns for forms, permissions, and state handling.",
        "Introduced thoughtful AI-assisted workflows.",
        "Focus on strong typing, clear tests, and maintainable components.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Funky Outer Space",
      period: "April 2023 – October 2025",
      description:
        "Delivered MVPs across frontend, backend, and database layers; built AI document Q&A and multi-tenant apps.",
      highlights: [
        "Delivered MVPs across frontend, backend, and database layers.",
        "Built AI document Q&A with embeddings and grounded answers.",
        "Created typed REST APIs, auth, and role-based access for multi-tenant apps.",
        "Developed a reusable UI system for faster builds.",
        "Improved reliability with better validation, errors, and environment setup.",
        "Added basic observability and deployment steps.",
      ],
    },
    {
      title: "Tattoo Artist (Digital Design)",
      company: "Sacred Art Tattoo",
      period: "Feb 2021 – April 2024",
      description:
        "Custom digital artwork and client collaboration—habits that carry over directly into UI and product work.",
      highlights: [
        "Designed custom digital artwork; turned rough ideas into clear, structured designs.",
        "Tight client feedback loops; habits that carry over to UI and product collaboration.",
        "Attention to detail in layout, spacing, and visual balance.",
        "Studied Computer Science during this period and transitioned into software engineering.",
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
    <motion.div
      className="min-h-screen w-full overflow-x-hidden bg-black text-white"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero logoSrc={mLogo} />

      <div className="bg-white text-black">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6">
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
    </motion.div>
  );
};

export default App;
