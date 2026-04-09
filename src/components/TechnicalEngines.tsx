'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, FastForward, Play, Layers } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function TechnicalEngines() {
  const engines = projects.filter(p => 
    p.id === 'v-frame' || 
    p.id === 'sonic-pulse' || 
    p.id === 'neuralscale' || 
    p.id === 'cutout-ai'
  );

  return (
    <section id="technical-engines" className="py-24 px-6 md:px-12 lg:px-24 bg-jet text-white relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-slate-gray/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-soft-rose/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Cpu className="w-3 h-3" />
            <span>Proprietary Processing Engines</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            The <span className="text-slate-gray italic font-serif">Technical</span> Engines.
          </h2>
          <p className="max-w-2xl mx-auto text-slate-gray/50 text-lg font-medium leading-relaxed">
            High-performance web tools engineered for low-level media processing, hardware-accelerated AI, and real-time computational logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {engines.map((engine, index) => (
            <motion.div
              key={engine.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:border-white/20"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-white/5 text-slate-gray group-hover:text-white transition-colors border border-white/10">
                  {engine.id === 'v-frame' ? <Play className="w-6 h-6" /> : 
                   engine.id === 'sonic-pulse' ? <Activity className="w-6 h-6" /> :
                   engine.id === 'neuralscale' ? <Zap className="w-6 h-6" /> :
                   <Layers className="w-6 h-6" />}
                </div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest px-3 py-1 rounded-full border border-white/5">
                  Performance v2.4
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {engine.title.split(':')[0]}
              </h3>
              
              <p className="text-slate-gray/60 mb-8 leading-relaxed font-medium">
                {engine.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {engine.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-md bg-white/5 text-[10px] uppercase font-bold text-slate-gray border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                 <a 
                   href={engine.repoUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
                 >
                   <FastForward className="w-3 h-3" />
                   Review Engine Logic
                 </a>
                 <div className="w-2 h-2 rounded-full bg-soft-rose/40 animate-pulse shadow-[0_0_10px_rgba(244,194,194,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
