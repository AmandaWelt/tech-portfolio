import React from 'react';

const abilities = {
  clientSide: ['HTML', 'CSS/SCSS', 'Tailwind', 'TypeScript', 'React', 'Next.js'],
  serverSide: ['REST API', 'Node.js', 'Express', 'MongoDB'],
  design: ['UI/UX Design', 'Prototyping', 'Design Systems'],
  tools: ['GitHub', 'Jira', 'Storybook', 'Jest'],
  softSkills: ['Communication', 'Empathy', 'Critical Thinking'],
};

const Abilities: React.FC = () => {
  return (
    <section id="abilities" className="py-12 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Abilities</h2>
        {Object.entries(abilities).map(([category, skills]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="bg-white shadow px-3 py-1 rounded text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Abilities;
