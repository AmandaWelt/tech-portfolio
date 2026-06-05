/** Site identity and marketing copy. Edit here to update the site voice. */

export const site = {
  name: "Amanda Welt",
  brand: "AmandaWelt",
  mark: "AJW",
  title: "Senior Product Engineer · Front End Team Lead",
  tagline: "SENIOR FULL-STACK FRONT END · PAYMENTS PLATFORM · TEAM LEAD.",
  location: "Oklahoma City, OK · Open to remote",
  featuredIn: [
    { name: "Payments", className: "featured-logo--a" },
    { name: "Enterprise UX", className: "featured-logo--b" },
    { name: "Platform", className: "featured-logo--c" },
    { name: "Applied AI", className: "featured-logo--d" },
    { name: "Team Lead", className: "featured-logo--e" },
  ],
  expertise: [
    {
      title: "Product Ownership",
      body: "I lead products from concept to production.",
      support:
        "Bridging business goals, technical constraints, and user experience to deliver software that creates measurable impact.",
      tags: ["End to end ownership", "Product strategy", "Cross functional delivery"],
    },
    {
      title: "Complex Systems",
      body: "Experienced building software where accuracy, reliability, and scale matter.",
      support:
        "From payment operations and merchant onboarding to reporting platforms and internal tools, I specialize in systems that support real world business operations.",
      tags: ["Payments", "Enterprise systems", "Operational scale"],
    },
    {
      title: "Art Informed Engineering",
      body: "I design and build the interfaces in products I ship: layout, visual system, and production code in one pipeline.",
      support:
        "Formal art background informs composition, hierarchy, and interaction design. On solo projects that's the full stack; on team builds I still own the interface layer end to end while partnering on API, infra, and domain logic.",
      tags: ["UI design & build", "Visual systems", "Human centered systems"],
    },
  ],
  quote: {
    text: "Simplicity is the ultimate sophistication.",
    attribution: "Leonardo da Vinci",
  },
  workIntro:
    "Products I've owned end to end, plus two team builds where I lead frontend and stay hands on across the stack. SAPO, applied AI, fitness, and prototypes are mine solo; Aiugment and Constellation Payments are collaborative platform work.",
  proof: [
    { label: "Platform", value: "X2 / CSIPay Portal · PayFac operations" },
    { label: "Scope", value: "Onboarding · payment ops · ACH · reporting · team lead" },
    { label: "Focus", value: "Ownership · cross service delivery · trusted interfaces" },
  ],
  capabilities: [
    {
      title: "Product engineering",
      body: "Own products from concept through production: architecture, UI, APIs, and delivery. Most portfolio work is end to end; on larger teams I lead the frontend surface and partner on backend and platform.",
    },
    {
      title: "Enterprise frontend",
      body: "Lead and build complex money movement and operations interfaces where accuracy, clarity, and scale are non negotiable, often across microservices and cross functional teams.",
    },
    {
      title: "Applied AI",
      body: "Ship retrieval grounded AI with citations, streaming UX, and production guardrails, built for decisions, not demos.",
    },
    {
      title: "Technical leadership",
      body: "Direct frontend delivery on an enterprise payments estate: review standards, release coordination, and partnership with product and backend on high stakes edge cases.",
    },
  ],
  positioning: {
    greeting: "Hi, I'm Amanda.",
    kicker: "Senior · Front End Team Lead",
    headline: "Enterprise payments. High impact interfaces.",
    lede: "I lead frontend delivery on Constellation's X2 platform: merchant onboarding, payment operations, and reporting, while shipping hands on across a multi engineer PayFac estate.",
    support:
      "CSIPay Portal across AccountD, ChargeD, and treasury services. Previously owned multi tenant SaaS, applied AI, and design systems end to end, from UI through backend and launch.",
  },
  splitHero: {
    design: {
      headlineLead: "Human",
      headlineAccent: "Centered",
    },
    build: {
      headlineLead: "Production",
      headlineAccent: "Ready",
      ctaLabel: "SEE WHAT I'VE BUILT",
      ctaTo: "/#work",
    },
    portrait: "/portrait.png",
    portraitSketch: "/sketch-portrait.png",
    sketchBackground: "/sketch-bg2.png",
  },
  contact: {
    email: "Amanda.jolyn@gmail.com",
    website: "amandawelt.com",
    resumeUrl: "/WeltResume.pdf",
    githubUrl: "https://github.com/mandywelt",
    headline: "Available for select opportunities",
    body: "Senior product engineering and frontend leadership roles, payments platforms, enterprise applications, and teams where scope, ownership, and judgment matter as much as the stack.",
  },
  about: {
    education: "Associate in Computer Science",
    languages: "English, Levantine Arabic (conversational)",
  },
  nav: [
    { id: "home", label: "HOME", to: "/" },
    { id: "work", label: "WORK", to: "/work" },
    { id: "expertise", label: "EXPERTISE", to: "/#expertise" },
    { id: "experience", label: "ABOUT", to: "/#experience" },
    { id: "contact", label: "CONTACT", to: "/#contact" },
  ],
} as const;
