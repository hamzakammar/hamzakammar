'use client';
import { useState, useEffect } from 'react';
import CitySvg from './components/CitySvg';

export default function Home() {
  const [showCity, setShowCity] = useState(false);
  const [isDay, setIsDay] = useState(false);
  


  return (
      <div className="min-h-[200vh] ">
        <button
          onClick={() => { setIsDay(!isDay); console.log(isDay); }}
          className="fixed top-4 right-4 z-10 px-4 py-2 bg-blue-600 text-white rounded"
          >
          Toggle Day/Night
        </button>
        <div
          className={`
            sticky top-0 h-screen w-screen
            flex items-center justify-center
            transition-opacity transition-transform duration-1000
            'opacity-100 translate-y-0' 
          `}
        >
          <CitySvg isDay={isDay} />
        </div>
      </div>
  );
}
