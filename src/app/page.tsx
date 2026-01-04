'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const experiences = [
  {
    title: 'Founding Engineer',
    company: 'Dealish',
    date: 'Dec 2025 – Present',
    skills: ['React Native', 'Supabase', 'Mobile Development', 'TypeScript'],
    image: '/dealish.png',
    backgroundImage: '/dealish-bg.png',
    link: 'https://www.dealish.io',    
  },
  {
    title: 'Software Developer',
    company: 'Kùzu Inc.',
    date: 'Summer 2024',
    description: 'Worked on graph database tooling and backend infrastructure.',
    skills: ['C++', 'Graph Databases', 'Backend'],
    image: '/kuzu.png',
    backgroundImage: '/kuzu-bg.png',
    link: 'https://kuzudb.github.io/',
  },
  {
    title: 'Founder, Chair',
    company: 'NeoDev League',
    date: 'May 2024 – Present',
    description: 'Built and led a developer community focused on peer learning, mentorship, and hands-on projects.',
    skills: ['Leadership', 'Event Planning', 'Community Building'],
    image: '/neodev.png',
    backgroundImage: '/neodev-bg.png',
    link: 'https://neoleague.dev',
  },
  // {
  //   title: 'High School Leader',
  //   company: 'Engineering Science Quest',
  //   date: 'Summer 2023',
  //   description: 'Led 8 STEM camps for 200+ students, creating a safe, engaging, and hands-on learning environment.',
  //   skills: ['Leadership', 'Teaching', 'STEM'],
  //   image: '/esq.png',
  //   backgroundImage: '/esq-bg.png',
  //   link: 'https://uwaterloo.ca/engineering-outreach/engineering-science-quest',
  // },
  {
    title: 'Data Manager',
    company: 'Mapflow Inc.',
    date: 'Nov 2022 – Oct 2024',
    description: 'Consolidated medical research into structured datasets, saving 2000+ pharmacists ∼15 minutes per patient.',
    skills: ['Data Modeling', 'JSON', 'Healthcare'],
    image: '/mapflow.png',
    backgroundImage: '/mapflow-bg.png',
    link: 'https://mapflow.ca',
  },
];

const projects = [
  {
    title: 'ChessBot',
    date: 'November 2025',
    link: 'https://github.com/j3rry1iu/ChessHacks-Training',
  },
  {
    title: 'Course Connect',
    date: 'September 2025 - Present',
    link: 'https://cc.hamzaammar.ca',
  },
  {
    title: 'Flourishing Realty Website',
    date: 'August 2025',
    link: 'https://flourishing.homes',
  },
  {
    title: 'Sahil Go',
    date: 'July 2025 - Present',
    link: '',
  },
  {
    title: 'MentAI',
    date: 'April 2023',
    link: 'https://devpost.com/software/therealbaymax',
  },
  {
    title: 'UniMap',
    date: 'Summer 2022',
    link: 'https://github.com/hamzakammar/UniMap',
  },
];

export default function Home() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
   <div className="min-h-screen bg-black text-white">
    
    <main className="max-w-3xl mx-auto px-6 py-20">
      <section className="mb-20">
        <h1 className="text-4xl font-bold mb-4">Hey there!</h1>
        <div className="flex items-center gap-4">
          <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src="/me.png" 
              alt="Hamza"
              width={512}
              height={512}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            I&apos;m Hamza, a Software Engineering student <br /> @ UWaterloo. 
          </p>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Experience</h2>
        <div className="space-y-2">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredExp(idx)}
              onMouseLeave={() => setHoveredExp(null)}
              className="rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-900"
            >
              <a 
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 cursor-pointer block"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                  <Image 
                    src={exp.image} 
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="text-sm text-gray-400">{exp.title}</p>
                </div>
              </a>
              <div 
                className={`bg-gray-900 overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredExp === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex relative min-h-[200px]">
                  {/* Left content section */}
                  <div className="flex-1 p-6 z-10">
                    <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                    <p className="text-base text-gray-400 mb-4">{exp.title}</p>
                    <p className="text-sm text-gray-500 mb-6">{exp.date}</p>
                    <div className="flex flex-wrap gap-3">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Right background image section */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/2">
                    <div className="relative w-full h-full">
                      <Image 
                        src={exp.backgroundImage} 
                        alt={exp.company}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Projects</h2>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div key={idx} className="group">
              <a
                href={project.link || '#'}
                className={`block ${project.link ? 'hover:text-gray-400' : 'cursor-default'}`}
                target={project.link ? '_blank' : undefined}
                rel={project.link ? 'noopener noreferrer' : undefined}
              >
                <h3 className="font-semibold text-lg mb-1">
                  {project.title}
                  {project.link && (
                    <span className="ml-2 text-sm text-gray-500 group-hover:text-gray-400">→</span>
                  )}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Get in Touch</h2>
        <div className="space-y-2">
          <a href="mailto:hamza.k.ammar@gmail.com" className="block text-gray-400 hover:text-white transition-colors">
            Email
          </a>
          <a href="https://linkedin.com/in/hamzakammar" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/hamzakammar" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://twitter.com/hamzakammar" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
            X
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
            Resume
          </a>

        </div>
      </section>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <a href={`https://se30webring.com?from=${currentUrl}&dir=prev`} style={{ textDecoration: 'none', color: '#FFCE1A', fontSize: '1.5rem', lineHeight: 1, display: 'flex', alignItems: 'center' }}>←</a>
        <a href="https://se30webring.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img 
            src="https://se30webring.com/assets/icon-yellow.svg" 
            alt="SE '30 Webring" 
            style={{ width: '32px', height: '32px' }} 
          />
        </a>
        <a href={`https://se30webring.com?from=${currentUrl}&dir=next`} style={{ textDecoration: 'none', color: '#FFCE1A', fontSize: '1.5rem', lineHeight: 1, display: 'flex', alignItems: 'center' }}>→</a>
      </div>

    </main>
   </div>
  );
}
