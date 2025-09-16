import React from "react";

const AboutSection: React.FC = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">ABOUT</h2>
      <div className="w-16 h-px bg-black mx-auto" />
    </div>

    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed font-light">
          Creative Developer with expertise in React, TypeScript, and full-stack web development.
          I combine technical precision with user-focused design thinking to build intuitive, high-performance applications.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed font-light">
          My unique background spanning military intelligence and creative industries provides
          diverse problem-solving capabilities and a collaborative approach to development.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">LOCATION</h3>
          <p className="text-gray-800">Oklahoma City, OK</p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">LANGUAGES</h3>
          <p className="text-gray-800">English, Levantine Arabic(Conversational)</p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">EDUCATION</h3>
          <p className="text-gray-800">Associates in Computer Science</p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
