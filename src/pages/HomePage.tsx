import React from "react";
import HomeHero from "../components/home/HomeHero";
import ExpertiseSection from "../components/home/ExpertiseSection";
import QuoteSection from "../components/home/QuoteSection";
import WorkSection from "../components/home/WorkSection";
import ExperienceSection from "../components/home/ExperienceSection";
import ContactSection from "../components/home/ContactSection";

const HomePage: React.FC = () => (
  <>
    <HomeHero />
    <ExpertiseSection />
    <QuoteSection />
    <WorkSection />
    <ExperienceSection />
    <ContactSection />
  </>
);

export default HomePage;
