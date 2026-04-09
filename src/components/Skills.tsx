"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code, Server, Database, Smartphone, Palette, Globe,
  Terminal, Cpu, GitBranch, Layers, ShieldCheck, Layout, Cloud,
  Monitor, Video, Music
} from "lucide-react";

const Skills = () => {
  const frontendSkills = [
    { title: "React.js", icon: Layout },
    { title: "Next.js", icon: Layers },
    { title: "TypeScript", icon: Code },
    { title: "JavaScript (ES6+)", icon: Code },
    { title: "Tailwind CSS", icon: Palette },
    { title: "Figma", icon: Layers },
    { title: "HTML5 Canvas", icon: Monitor },
    { title: "Responsive UI/UX", icon: Smartphone },
  ];

  const backendSkills = [
    { title: "Node.js", icon: Server },
    { title: "Express.js", icon: Layers },
    { title: "Java / Spring", icon: ShieldCheck },
    { title: "C# / .NET", icon: Terminal },
    { title: "Microservices", icon: Layers },
    { title: "RESTful API Design", icon: Globe },
    { title: "FFmpeg Engine", icon: Video },
    { title: "Web Audio API", icon: Music },
    { title: "WebGPU / ONNX Runtime", icon: Cpu },
    { title: "Vision Transformers (ViT)", icon: Cpu },
  ];

  const databaseSkills = [
    { title: "Firebase (NoSQL)", icon: Database },
    { title: "PostgreSQL", icon: Database },
    { title: "MySQL", icon: Database },
    { title: "SQL Server", icon: Database },
  ];

  const hostingSkills = [
    { title: "Firebase / Cloud", icon: Cloud },
    { title: "Vercel / Next.js", icon: Cloud },
    { title: "GitHub Pages", icon: Globe },
  ];

  const toolingSuite = [
    { title: "Docker / Container", icon: Cpu },
    { title: "VS Code", icon: Code },
    { title: "Postman", icon: Globe },
    { title: "Git / GitHub", icon: GitBranch },
    { title: "Android Studio", icon: Smartphone },
  ];

  const MarqueeRow = ({ title, items, direction }: { title: string, items: any[], direction: "ltr" | "rtl" }) => {
    // Duplicate items for a truly seamless loop
    const marqueeItems = [...items, ...items, ...items];

    return (
      <div className="mb-20 last:mb-0">
        <h3 className="text-xs font-bold text-slate-gray/40 uppercase tracking-[0.2em] mb-10 text-center">{title}</h3>
        <div className="overflow-hidden relative flex">
          <motion.div
            className="flex gap-6 whitespace-nowrap py-2"
            animate={{
              x: direction === "ltr" ? ["-33.33%", "0%"] : ["0%", "-33.33%"]
            }}
            transition={{
              duration: Math.max(30, items.length * 6),
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "fit-content" }}
          >
            {marqueeItems.map((skill, idx) => (
              <div
                key={`${skill.title}-${idx}`}
                className="flex-shrink-0 w-[240px] md:w-[280px] bg-soft-rose/10 border border-black/5 p-8 rounded-[2rem] text-center group hover:bg-slate-gray/5 hover:border-slate-gray/30 transition-all duration-300"
              >
                <skill.icon className="w-10 h-10 mx-auto mb-4 text-slate-gray transition-transform" />
                <h4 className="font-bold text-jet text-sm">{skill.title}</h4>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 bg-white border-y border-black/[0.03] section-anchor overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center text-balance">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-gray/10 border border-slate-gray/20 text-slate-gray text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span>My Expertise & Ecosystem</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-jet"
          >
            Technologies I&apos;ve Built With
          </motion.h2>
        </div>
      </div>

      {/* Full-Width Granular Marquee Sections */}
      <div className="flex flex-col gap-4">
        <MarqueeRow title="Frontend & Design" items={frontendSkills} direction="ltr" />
        <MarqueeRow title="Backend & Systems" items={backendSkills} direction="rtl" />
        <MarqueeRow title="Databases & Data Management" items={databaseSkills} direction="ltr" />
        <MarqueeRow title="Hosting & Cloud Deployment" items={hostingSkills} direction="rtl" />
        <MarqueeRow title="Professional Tooling Suite" items={toolingSuite} direction="ltr" />
      </div>
    </section>
  );
};

export default Skills;
