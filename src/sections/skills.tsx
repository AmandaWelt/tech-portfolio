// src/sections/skills.tsx
import React from "react";
import {
  Code2,
  Boxes,
  Database,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Props = { skills: Record<string, string[]> };

type CategoryMeta = {
  label: string;
  Icon: LucideIcon;
  accentTop: string; 
  iconRing: string;  
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  languages: {
    label: "Languages",
    Icon: Code2,
    accentTop: "bg-gradient-to-r from-indigo-400/70 to-indigo-600/70",
    iconRing: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  },
  frameworks: {
    label: "Frameworks & Libraries",
    Icon: Boxes,
    accentTop: "bg-gradient-to-r from-emerald-400/70 to-emerald-600/70",
    iconRing: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  databases: {
    label: "Databases & ORMs",
    Icon: Database,
    accentTop: "bg-gradient-to-r from-amber-400/70 to-amber-600/70",
    iconRing: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  },
  tools: {
    label: "Tools & Technologies",
    Icon: Wrench,
    accentTop: "bg-gradient-to-r from-sky-400/70 to-sky-600/70",
    iconRing: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  },
  additional: {
    label: "Additional",
    Icon: Sparkles,
    accentTop: "bg-gradient-to-r from-violet-400/70 to-violet-600/70",
    iconRing: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  },
};

const humanize = (key: string) =>
  CATEGORY_META[key]?.label ??
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const Skills: React.FC<Props> = ({ skills }) => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">TECHNICAL SKILLS</h2>
      <div className="w-16 h-px bg-black mx-auto" />
    </div>

    {/* responsive grid of cards */}
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([category, list]) => {
        const meta = CATEGORY_META[category] ?? CATEGORY_META.additional;
        const Icon = meta.Icon;

        return (
          <section
            key={category}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-md"
          >
            {/* accent bar */}
            <div className={`absolute inset-x-0 top-0 h-1 ${meta.accentTop}`} />

            <div className="p-6">
              {/* header */}
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${meta.iconRing}`}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-600">{humanize(category)}</h3>
                  <p className="text-xs text-gray-400">
                    {list.length} item{list.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* pill badges */}
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-800 transition-colors hover:border-gray-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  </div>
);

export default Skills;
