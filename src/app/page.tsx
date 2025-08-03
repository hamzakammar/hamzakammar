import Intro from "./intro";
import Experience from "./experience";
import Projects from "./projects";
// import AboutMe from "./aboutme";
import Header from "./header";

export default function Home() {
  return (
   <div className="flex flex-col">
    <Header />
    <div className="pt-16">
      <Intro />
      {/* <AboutMe /> */}
      <div className="flex">
        <Experience />
        <Projects />
      </div>
    </div>
   </div>
  );
}
