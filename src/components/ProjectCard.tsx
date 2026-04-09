"use client";

import React, { useState } from "react";
import { Project } from "@/lib/projects";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { 
  ExternalLink, Code, Monitor, Download, ArrowUpRight, 
  Hotel, Music, BookOpen, Layers, Star, Lock,
  Coffee, Terminal, Cpu, Layout, Palette, Server, Box, Code2
} from "lucide-react";

const IconMap: Record<string, any> = {
  Hotel,
  Music,
  BookOpen,
  Layers,
  Coffee,
  Terminal,
  Cpu,
  Layout,
  Palette,
  Server,
  Box,
  Code2
};

interface ProjectCardProps {
  project: Project;
  onCloneClick?: (project: Project) => void;
}

const ProjectCard = ({ project, onCloneClick }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);
  const Icon = IconMap[project.icon] || Layers;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] p-4 border border-black/[0.03] hover:border-slate-gray/30 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Card Header (Image or Branded Placeholder) */}
      <div className="relative h-52 rounded-[2.2rem] overflow-hidden mb-6 group-hover:shadow-lg transition-all duration-500 bg-black/[0.02]">
        {!imageError ? (
          <img 
            src={project.image} 
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-lavender/40 via-soft-rose/20 to-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-white/80 shadow-sm flex items-center justify-center mb-4 border border-white/50">
                <Icon className="w-8 h-8 text-slate-gray/40" />
              </div>
              <p className="text-[10px] font-bold text-slate-gray/30 uppercase tracking-[0.2em]">Visual in production</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        {/* Type & Privacy Badges */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          {project.stars !== undefined && project.stars > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold bg-white/90 backdrop-blur-md rounded-full shadow-sm">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>{project.stars}</span>
            </div>
          )}
          <div className="flex gap-2">
            {project.isPrivate && (
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-red-50 border border-red-200 text-red-500 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Private</span>
              </div>
            )}
            <span className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border backdrop-blur-md",
              project.type === "hosted" 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600" 
                : "bg-slate-gray/10 border-slate-gray/30 text-slate-gray"
            )}>
              {project.type === "hosted" ? "Live" : "Repo"}
            </span>
          </div>
        </div>

        {/* Floating Language Icon */}
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-slate-gray" />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 px-4 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-jet group-hover:text-slate-gray transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-sm text-slate-gray/70 leading-relaxed mb-6 line-clamp-3 font-medium">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-black/[0.03] text-[10px] font-bold text-slate-gray/60 rounded-lg group-hover:bg-slate-gray/5 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-2">
          {project.type === "hosted" ? (
            <>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] py-3.5 bg-slate-gray text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-jet transition-all shadow-lg shadow-slate-gray/20"
              >
                <Monitor className="w-3 h-3" />
                View Live Site
              </a>
              <a
                href={project.isPrivate ? undefined : project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex-1 py-3.5 bg-black/[0.03] border border-black/5 text-jet rounded-xl text-xs font-bold flex items-center justify-center transition-all",
                  project.isPrivate ? "opacity-20 cursor-not-allowed grayscale" : "hover:bg-black/[0.08]"
                )}
                title={project.isPrivate ? "Private Repository" : "View Source"}
              >
                <Code className="w-3.5 h-3.5" />
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => !project.isPrivate && onCloneClick?.(project)}
                className={cn(
                  "flex-[2] py-3.5 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all",
                  project.isPrivate 
                    ? "bg-slate-gray/50 cursor-not-allowed shadow-none" 
                    : "bg-jet hover:bg-slate-gray shadow-lg shadow-black/10"
                )}
              >
                {project.isPrivate ? <Lock className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                {project.isPrivate ? "Private Access" : "Download/Clone"}
              </button>
              <a
                href={project.isPrivate ? undefined : project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex-1 py-3.5 bg-black/[0.03] border border-black/5 text-jet rounded-xl text-xs font-bold flex items-center justify-center transition-all",
                  project.isPrivate ? "opacity-20 cursor-not-allowed grayscale" : "hover:bg-black/[0.08]"
                )}
                title={project.isPrivate ? "Private Repository" : "View Source"}
              >
                <Code className="w-3.5 h-3.5" />
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
