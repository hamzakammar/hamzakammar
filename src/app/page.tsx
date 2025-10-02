'use client';
import { useState } from 'react';
import Intro from "./intro";
// import AboutMe from "./aboutme";
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
   <div className="flex flex-col">
    <Header />
    <div className="pt-16 flex w-full">
      <div className="flex-1 flex justify-center items-center">
        <Intro onIntroComplete={handleIntroComplete} />
        {/* <AboutMe /> */}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <WorkingOn trigger={workingOnTrigger} />
      </div>
    </div>
    <div className="flex justify-between w-full">
      <Experience />
      <Projects />
    </div>
   </div>
  );
}
