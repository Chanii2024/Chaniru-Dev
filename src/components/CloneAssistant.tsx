"use client";

import React, { useState } from "react";
import { Project } from "@/lib/projects";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, FolderOpen, Play, ChevronRight, ChevronLeft } from "lucide-react";

interface CloneAssistantProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CloneAssistant = ({ project, isOpen, onClose }: CloneAssistantProps) => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const steps = [
    { id: 1, title: "Locate", icon: FolderOpen },
    { id: 2, title: "Clone", icon: Terminal },
    { id: 3, title: "Run", icon: Play },
  ];

  const cloneCommand = `git clone ${project.repoUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    showToast("Command copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => currentStep < 3 && setCurrentStep(prev => prev + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-jet/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-lavender/10">
              <div>
                <h3 className="text-2xl font-bold text-jet mb-1">Clone Assistant</h3>
                <p className="text-slate-gray/60 text-sm font-medium">Setting up <span className="text-slate-gray font-bold underline decoration-lavender">{project.title}</span></p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5 text-slate-gray" />
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="px-8 py-6 flex items-center justify-between relative bg-white">
              <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-black/5 z-0" />
              {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${
                    currentStep >= step.id ? "bg-slate-gray border-slate-gray text-white shadow-lg shadow-slate-gray/20" : "bg-white border-black/5 text-slate-gray/30"
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= step.id ? "text-slate-gray" : "text-slate-gray/30"}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="p-10 min-h-[300px]">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 p-6 bg-black/[0.02] rounded-3xl border border-black/5">
                      <div className="w-12 h-12 bg-slate-gray/10 rounded-2xl flex items-center justify-center">
                        <FolderOpen className="text-slate-gray w-6 h-6" />
                      </div>
                      <p className="text-jet/80 leading-relaxed font-medium">
                        Open your terminal or command prompt and navigate to the folder where you want to keep this project.
                      </p>
                    </div>
                    <div className="p-4 bg-lavender/30 border border-slate-gray/10 rounded-2xl">
                      <p className="text-xs text-slate-gray font-bold italic">Tip: Use "cd Documents/Projects" to move between folders.</p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <p className="text-jet/80 leading-relaxed font-medium">
                      Run the following command in your terminal to download the source code:
                    </p>
                    <div className="group relative">
                      <pre className="p-6 bg-black/[0.03] rounded-2xl border border-black/5 overflow-x-auto font-mono text-sm text-slate-gray">
                        <code>{cloneCommand}</code>
                      </pre>
                      <button
                        onClick={copyToClipboard}
                        className="absolute top-4 right-4 p-3 bg-white rounded-xl hover:bg-lavender shadow-sm transition-all text-slate-gray border border-black/5"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <p className="text-jet/80 leading-relaxed font-medium">
                      Follow these project-specific instructions to launch the system locally:
                    </p>
                    <div className="space-y-3">
                      {project.localInstructions?.map((ins, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-black/[0.02] rounded-2xl border border-black/5">
                          <span className="text-xs font-bold text-slate-gray bg-slate-gray/10 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-jet/70 text-sm font-bold">{ins}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Navigation */}
            <div className="p-8 bg-black/[0.01] border-t border-black/5 flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 text-sm font-bold text-slate-gray/40 hover:text-jet disabled:opacity-0 transition-all uppercase tracking-widest"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-jet text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-gray transition-all shadow-lg shadow-black/10"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-gray text-white rounded-xl font-bold flex items-center gap-2 hover:bg-jet transition-all shadow-lg shadow-slate-gray/20"
                >
                  Finish <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


export default CloneAssistant;
