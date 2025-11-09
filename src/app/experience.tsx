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
    <div id="experience" className="bg-gray-900/80 backdrop-blur-md border-2 border-gold/40 rounded-xl p-6 shadow-2xl hover:border-gold/60 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gold">EXPERIENCE</h1>
      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-gray-800">
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            className="relative pl-6 border-l-2 border-gold/40 transition-all duration-300 hover:border-gold group"
          >
            <div className="absolute w-3 h-3 bg-gold rounded-full -left-[7px] top-1.5 transition-all duration-300 group-hover:bg-white group-hover:scale-125"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 group-hover:text-gold transition-colors">{exp.date}</span>
              <span className="text-gray-500">•</span>
              <h2 className="text-base font-semibold text-white group-hover:text-gold transition-colors">{exp.title}</h2>
              <span className="text-sm text-gray-300 group-hover:text-gold/80 transition-colors">@ {exp.company}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
