'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lock, Shield, Cpu, Zap, Hotel, Server } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function FeaturedSystems() {
  const featured = projects.filter(p => p.id.startsWith('river-range'));

  return (
    <section id="featured-systems" className="py-24 px-6 md:px-12 lg:px-24 bg-snow-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-soft-rose/5 -skew-x-12 translate-x-24" />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jet/5 border border-jet/10 text-jet/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3 h-3" />
            <span>Enterprise Architectures</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-jet leading-tight">
            High-Impact <span className="text-slate-gray italic italic underline decoration-soft-rose underline-offset-8">Systems.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white border border-jet/5 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-jet/5 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image / Placeholder */}
              <div className="aspect-[16/10] bg-jet/5 relative flex-shrink-0 rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-center p-8">
                      {project.id === 'river-range-resort' ? <Hotel className="w-16 h-16 text-jet/10 mx-auto mb-4" /> : <Server className="w-16 h-16 text-jet/10 mx-auto mb-4" />}
                      <p className="text-jet/20 font-black text-2xl uppercase tracking-tighter">Proprietary Architecture</p>
                    </div>
                  )}
                </div>

                {/* Live Badge Top Right */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md">
                    Live
                  </div>
                </div>

                {/* Tech Badges Overlay */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-jet uppercase tracking-wider border border-jet/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col flex-1 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl md:text-3xl font-black text-jet group-hover:text-slate-gray transition-colors">
                    {project.title}
                  </h3>
                  {project.isPrivate && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-500 text-[10px] font-bold uppercase tracking-widest shadow-sm flex-shrink-0">
                      <Lock className="w-3 h-3" />
                      <span>Security Locked • Private</span>
                    </div>
                  )}
                </div>

                {project.role && (
                  <div className="text-[11px] font-bold text-slate-gray/80 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1 h-3 bg-red-500 rounded-full" />
                    <span>Designation • {project.role}</span>
                  </div>
                )}
                
                <p className="text-slate-gray/70 text-lg leading-relaxed mb-8 font-medium">
                  {project.description}
                </p>

                <div className="mt-auto pt-8 border-t border-jet/5 flex flex-wrap items-center justify-between gap-6 relative">
                  <div className="flex items-center gap-6">
                    {/* Deploy Button */}
                    {project.id === 'river-range-resort' ? (
                      <div className="relative group/tooltip">
                        <motion.div 
                          className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg shadow-xl shadow-emerald-500/10 z-50 transition-all duration-300"
                          style={{ bottom: "100%", marginBottom: "12px" }}
                        >
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">Visit Website</span>
                          </div>
                          {/* Triangle Pointer */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-50 border-r border-b border-emerald-100 rotate-45 -mt-1" />
                        </motion.div>

                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-jet font-bold hover:gap-3 transition-all group/link"
                        >
                          <span className="text-sm">Deploy Site</span>
                          <ExternalLink className="w-4 h-4 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-jet/60 font-bold cursor-not-allowed">
                        <span className="text-sm">Deploy Site</span>
                        <Lock className="w-3 h-3 opacity-40" />
                      </div>
                    )}

                    {/* GitHub Button (Always Locked for these featured systems as per rule) */}
                    <div className="flex items-center gap-2 text-jet/60 font-bold cursor-not-allowed border-l border-jet/10 pl-6">
                      <span className="text-sm">GitHub Repo</span>
                      <Lock className="w-3 h-3 opacity-40" />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`p-2.5 rounded-full border border-jet/10 ${project.isPrivate ? 'bg-red-50/50 border-red-100 shadow-sm' : 'hover:bg-jet/5 transition-colors shadow-sm'}`}>
                      {project.isPrivate ? <Shield className="w-5 h-5 text-red-500/50" /> : <Zap className="w-5 h-5 text-jet" />}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
