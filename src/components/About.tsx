import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { careerStats } from "@/lib/config";

const About = () => {
  const education = [
    {
      year: "2025 - 2027 (Present)",
      title: "BSc(Hons) Computing",
      institution: "Coventry University (UK)"
    },
    {
      year: "2024 - 2025",
      title: "Higher National Diploma in Software Engineering",
      institution: ""
    },
    {
      year: "2023 - 2024",
      title: "Diploma in Software Engineering",
      institution: ""
    },
    {
      year: "2022 - 2023",
      title: "Certificate in Computer Science",
      institution: ""
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative section-anchor">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-gray/10 border border-slate-gray/20 text-slate-gray text-xs font-bold uppercase tracking-widest mb-6">
                <span>The Mindset</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-jet mb-8 leading-tight">
                Bridging specialized logic with the <span className="text-slate-gray italic underline decoration-soft-rose underline-offset-8">stability of infrastructure.</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-gray/70 text-lg leading-relaxed font-medium">
              <p>Operating at the intersection of System Administration and Software Engineering, the focus remains on building systems that are as secure and stable as possible. It is not just about writing code; it is about architecting environments where performance and reliability are the absolute priorities.</p>
              <p>The emphasis is on creating scalable, full-stack systems that deliver for the end-user. Great care is taken in every architectural decision to ensure stability, even when the logic gets complex. Whether solving a technical bottleneck or designing infrastructure from scratch, the standard is always to deliver results that clients can truly rely on.</p>
              <p>A strong focus is maintained on complex logics, advanced thinking patterns, and rigorous error handling through detailed test cases. Rather than settling for simple development paths, these foundational elements are prioritized to ensure every system delivered is as solid as possible from every angle.</p>
            </div>

            <div className="flex gap-12 pt-4">
              <div className="space-y-1">
                <p className="text-4xl font-black text-jet">{careerStats.yearsOfCoding}+</p>
                <p className="text-xs font-bold text-slate-gray/50 uppercase tracking-widest">Years of Coding</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-jet">{careerStats.projectsCompleted}+</p>
                <p className="text-xs font-bold text-slate-gray/50 uppercase tracking-widest">Digital Solutions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-soft-rose/20 rounded-[3rem] p-10 border border-black/5 relative">
              <h3 className="text-xl font-bold text-jet mb-10 flex items-center gap-3">
                <GraduationCap className="text-slate-gray w-6 h-6" />
                Academic Milestone
              </h3>

              <div className="space-y-0 relative">
                <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-slate-gray/20" />

                {education.map((item, idx) => (
                  <div key={idx} className="relative pl-10 pb-10 last:pb-0 group">
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-white border-4 border-slate-gray/30 group-hover:border-slate-gray transition-colors z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-slate-gray rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <span className="text-xs font-bold text-slate-gray tracking-widest uppercase mb-2 block">{item.year}</span>
                    <h4 className="text-lg font-bold text-jet group-hover:text-slate-gray transition-colors">{item.title}</h4>
                    {item.institution && <p className="text-sm text-slate-gray/60 font-medium">{item.institution}</p>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
