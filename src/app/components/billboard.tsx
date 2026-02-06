import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";

export default function Billboard({ project, onClose }: { project: Project | null, onClose: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 w-[400px] h-[400px] p-10 z-50 pointer-events-none font-mono">
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            exit={{ opacity: 0, x: -10 }}
            className="pointer-events-auto relative h-full flex flex-col justify-end border-l border-b border-blue-500/40 p-6 bg-gradient-to-tr from-blue-500/5 to-transparent"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-blue-500" />
            
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
               <div className="w-full h-[2px] bg-white animate-scanline" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-blue-500 animate-pulse" />
                <h2 className="text-blue-400 text-[10px] uppercase tracking-[0.2em]">{project.district} // {project.status}</h2>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4 tracking-tighter uppercase">
                {project.title}
              </h1>

              <p className="text-slate-400 text-xs leading-relaxed mb-6 border-l-2 border-slate-800 pl-4 py-1">
                {project.narrative}
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-blue-300/60">
                  {project.stack.map(tech => (
                    <span key={tech}>&gt; {tech}</span>
                  ))}
                </div>
                
                <button 
                  onClick={onClose}
                  className="mt-4 text-[10px] text-slate-500 hover:text-white transition-colors flex items-center gap-2 underline underline-offset-4"
                >
                  TERMINATE_VIEW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}