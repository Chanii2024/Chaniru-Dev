import React from "react";
import { motion } from "framer-motion";
import { Server, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-white section-anchor"
    >
      {/* Background Soft Glows */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="relative w-full max-w-7xl h-full flex justify-center">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-soft-rose/30 blur-[130px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-gray/10 blur-[110px] rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center -mt-12 md:-mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold text-jet mb-8 tracking-tight leading-[1.05]"
        >
          Hello, I'm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-gray to-jet">
            Chaniru.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-gray/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Full-Stack Developer Specializing in Precision Architectures & Luxury Digital Experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-jet text-white font-bold rounded-2xl shadow-xl shadow-black/10 hover:bg-slate-gray transition-all flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 bg-slate-gray/5 border border-slate-gray/10 text-jet font-bold rounded-2xl hover:bg-slate-gray/10 transition-all backdrop-blur-sm flex items-center gap-2"
          >
            <Server className="w-5 h-5 text-slate-gray" />
            Contact Me
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[30px] h-[50px] border-2 border-slate-gray/30 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-[6px] h-[10px] bg-slate-gray/60 rounded-sm"
          />
        </div>
        <span className="text-xs font-bold text-slate-gray/60 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
