"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedSystems from "@/components/FeaturedSystems";
import TechnicalEngines from "@/components/TechnicalEngines";
import ProjectGrid from "@/components/ProjectGrid";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="relative bg-white selection:bg-slate-gray/10 selection:text-slate-gray">
      <Navbar />
      
      <Hero />
      
      <About />
      
      <Skills />

      <FeaturedSystems />

      <TechnicalEngines />
      
      <ProjectGrid />

      <ContactForm />

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-black/[0.03] text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-gray/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            &copy; {new Date().getFullYear()} Chaniru Weerasinghe
          </p>
          <div className="text-slate-gray/20 text-[8px] tracking-widest uppercase font-medium">
            System Administrator & Software Engineer • Moratuwa, Sri Lanka
          </div>
        </div>
      </footer>
    </main>
  );
}
