'use client';
import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface WorkingOnProps {
  trigger?: boolean;
}

export default function WorkingOn({ trigger = false }: WorkingOnProps) {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    if (trigger) {
      // Start the first animation after a delay
      setTimeout(() => setCurrentAnimation(1), 0);
    }
  }, [trigger]);

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      <div className="text-center mb-8">
        <div className="h-24 flex items-center justify-center">
          {currentAnimation >= 1 && (
            <TypeAnimation
              sequence={[
                "UW SE '30",
                1000,
                () => setCurrentAnimation(2)
              ]}
              wrapper="div"
              speed={2}
              cursor={false}
              style={{ fontSize: '1.5em', display: 'block', color: '#9ca3af' }}
            />
          )}
        </div>
      </div>
{/*       
      <div className="text-center mb-8">
        <div className="h-24 flex items-center justify-center">
          {currentAnimation >= 2 && (
            <TypeAnimation
              sequence={[
                "Working on... ",
                1000,
                () => setCurrentAnimation(3)
              ]}
              wrapper="div"
              speed={2}
              cursor={false}
              style={{ fontSize: '1.5em', display: 'block', color: '#9ca3af' }}
            />
          )}
        </div>
      </div> */}
      
      <div className="text-center mb-8">
        <div className="h-24 flex items-center justify-center">
          {currentAnimation >= 3 && (
            <TypeAnimation
              sequence={[
                "Prev. at Kuzu db, MapFLOW",
                1000,
              ]}
              wrapper="div"
              speed={2}
              cursor={false}
              repeat={Infinity}
              style={{ fontSize: '1.5em', display: 'block', color: '#9ca3af' }}
            />
          )}
        </div>
      </div>

      {/* Experience Button */}
      {currentAnimation >= 3 && (
        <div className="text-center mt-8">
          <button
            onClick={scrollToExperience}
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-3 rounded-md transition-all duration-300 font-semibold text-lg hover:scale-105"
          >
            See My Experience
          </button>
        </div>
      )}
    </div>
  );
}