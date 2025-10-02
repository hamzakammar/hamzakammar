'use client';
import React from 'react';

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Kùzu Inc.',
    date: 'Summer 2024',
    description: 'Worked on graph database tooling and backend infrastructure.',
    tech: ['C++', 'Graph Databases'],
  },
  {
    title: 'Founder, Chair',
    company: 'NeoDev League',
    date: '2022 – Present',
    description: 'Built and led a developer community focused on peer learning, mentorship, and hands-on projects.',
    tech: ['Leadership', 'Event Planning'],
  },
  {
    title: 'High School Leader',
    company: 'Engineering Science Quest',
    date: 'Summer 2023',
    description: 'Led 8 STEM camps for 200+ students, creating a safe, engaging, and hands-on learning environment',
    tech: ['Leadership', 'Teaching']
  },
  {
    title: 'Data Manager',
    company: 'Mapflow Inc.',
    date: 'Nov 2022 – Oct 2024',
    description: 'Consolidated medical research into structured datasets, saving 2000+ pharmacists ∼15 minutes per patient',
    tech: ['Data modeling', 'JSON',]
  },
  {
    title: 'Team Member',
    company: '2702 Rebels',
    date: 'Oct 2022 - Sept 2024',
    description: 'Contributed to mechanical design, prototyping, and programming for competitive robotics. Collaborated under tight timelines, attended regional competitions, and supported public outreach efforts.',
    tech: ["SolidWorks CAD"]
  }
];

export default function Experience() {
  return (
    <div id="experience" className="max-w-2xl ml-8 px-4 py-12 text-white">
      <h1 className="text-2xl font-bold mb-10 text-center text-gold text-4xl">Experience</h1>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            className="relative pl-6 border-l border-gold/40 transition-all duration-300 hover:text-gold hover:scale-110 cursor-pointer group"
          >
            <div className="absolute w-3 h-3 bg-gold rounded-full -left-1.5 top-1.5 transition-all duration-300 group-hover:bg-white group-hover:scale-150"></div>
            <div className="mb-1 text-sm text-gray-300 group-hover:text-gold">{exp.date}</div>
            <h2 className="text-lg font-semibold text-white group-hover:text-gold">{exp.title} @ {exp.company}</h2>
            <p className="text-sm text-gray-200 mt-1 group-hover:text-gold">{exp.description}</p>
            <p className="text-xs text-gray-400 mt-1 group-hover:text-gold"><strong>Stack:</strong> {exp.tech.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
