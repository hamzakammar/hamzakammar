'use client';
import { useState } from 'react';
import Intro from "./intro";
import Experience from "./experience";
import Projects from "./projects";
import Header from "./header";
import WorkingOn from "./workingOn";

export default function Home() {
  const [workingOnTrigger, setWorkingOnTrigger] = useState(false);

  const handleIntroComplete = () => {
    setWorkingOnTrigger(true);
  };

  return (
   <div className="relative min-h-screen">
    <Header />
    
    {/* SVG connections layer */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ top: '64px' }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Connection from center intro to top-left about */}
      <line x1="50%" y1="25%" x2="15%" y2="15%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
      </line>
      
      {/* Connection from center intro to bottom-left experience */}
      <line x1="50%" y1="30%" x2="20%" y2="60%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
      </line>
      
      {/* Connection from center intro to bottom-right projects */}
      <line x1="50%" y1="30%" x2="80%" y2="60%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
      </line>
      
      {/* Connection from center intro to top-right skills */}
      <line x1="50%" y1="25%" x2="85%" y2="15%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>

    {/* Content positioned in graph layout */}
    <div className="relative z-10 pt-20 min-h-screen flex items-center justify-center">
      {/* Center - Intro */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Intro onIntroComplete={handleIntroComplete} />
      </div>

      {/* Top Left - About/Working On */}
      <div className="absolute top-24 left-8 w-96">
        <div className="bg-gray-900/80 backdrop-blur-md border-2 border-gold/40 rounded-xl p-6 shadow-2xl hover:border-gold/60 hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gold mb-4">ABOUT</h2>
          <p className="text-gray-300 leading-relaxed">
            I'm a first-year Software Engineering student at the University of Waterloo who likes building systems that make complex things feel simple — from AI tools for students to humanoid simulations for autonomous driving.
          </p>
        </div>
      </div>

      {/* Top Right - Skills */}
      <div className="absolute top-24 right-8 w-96">
        <div className="bg-gray-900/80 backdrop-blur-md border-2 border-gold/40 rounded-xl p-6 shadow-2xl hover:border-gold/60 hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gold mb-4">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {['Python', 'C++', 'Swift', 'ROS2', 'React', 'Next.js', 'AWS', 'Docker', 'TensorFlow', 'PyTorch'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm border border-gold/30 hover:bg-gold/30 transition-colors">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">CONTACT</h3>
            <a href="mailto:hamza.k.ammar@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors block">
              hamza.k.ammar@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Left - Experience */}
      <div className="absolute top-[60vh] left-8 w-[45%]">
        <Experience />
      </div>

      {/* Bottom Right - Projects */}
      <div className="absolute top-[60vh] right-8 w-[45%]">
        <Projects />
      </div>
    </div>
   </div>
  );
}
