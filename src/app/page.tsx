import Intro from "./intro";
import AboutMe from "./aboutme";
import Experience from "./experience";
import Projects from "./projects";
import Header from "./header";

export default function Home() {
  return (
   <div className="flex flex-col">
    <Header />
    <div className="pt-16">
      <Intro />
      <div className="flex">
        <Experience />
        <Projects />
      </div>
    </div>
   </div>
  );
}
