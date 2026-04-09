import React, { useState } from "react";
import { projects as curatedProjects, Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import CloneAssistant from "./CloneAssistant";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, HardDrive, ListFilter } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ProjectGrid = () => {
  const [filter, setFilter] = useState<"all" | "hosted" | "local">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCloneOpen, setIsCloneOpen] = useState(false);

  const sortedProjects = [...curatedProjects].sort((a, b) => {
    if (a.id === 'river-range-resort') return -1;
    if (b.id === 'river-range-resort') return 1;
    return 0;
  });

  const filteredProjects = sortedProjects.filter((p) => 
    filter === "all" ? true : p.type === filter
  );

  const filterButtons = [
    { id: "all", label: "All Systems", icon: ListFilter },
    { id: "hosted", label: "Hosted Solutions", icon: Globe },
    { id: "local", label: "Local Repositories", icon: HardDrive },
  ] as const;

  const handleCloneClick = (project: Project) => {
    setSelectedProject(project);
    setIsCloneOpen(true);
  };

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden section-anchor">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-jet mb-4"
            >
              Elite <span className="text-slate-gray italic underline decoration-soft-rose underline-offset-8">Collection.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-gray/60 text-lg font-medium"
            >
              Building digital systems with Precision.
            </motion.p>
          </div>

          {/* Custom Filter Tabs */}
          <div className="bg-black/[0.03] p-1.5 rounded-2xl border border-black/5 flex gap-1 relative">
            {filterButtons.map((btn) => {
              const isActive = filter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-300 whitespace-nowrap z-10",
                    isActive ? "text-jet" : "text-slate-gray/60 hover:text-jet"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-xl shadow-lg border border-black/5"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <btn.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onCloneClick={handleCloneClick}
            />
          ))}
        </div>

        {/* No Results Fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No systems cataloged in this specific category.</p>
          </div>
        )}

      </div>

      {/* Clone Assistant Modal */}
      <CloneAssistant 
        project={selectedProject}
        isOpen={isCloneOpen}
        onClose={() => setIsCloneOpen(false)}
      />
    </section>
  );
};

export default ProjectGrid;
