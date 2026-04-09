"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    
    if (name === "name") {
      if (!value) error = "Name is required";
      else if (/[0-9]/.test(value)) error = "Names cannot contain numbers";
      else if (value.length < 2) error = "Name must be at least 2 characters";
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Please enter a valid email address";
    }

    if (name === "phone") {
      if (!value) {
        error = "Phone number is required";
      } else {
        const isSLFormat = value.startsWith("0") || value.startsWith("+94") || (!value.startsWith("+") && value.length === 9);
        
        if (isSLFormat) {
          const slDigits = value.replace("+94", "").replace(/^0/, "");
          if (!/^\d{9}$/.test(slDigits)) {
            error = "Invalid Sri Lankan phone format";
          }
        } else {
          const intlPhoneRegex = /^\+?[1-9]\d{1,14}$/;
          if (!intlPhoneRegex.test(value)) {
            error = "Invalid international phone number";
          }
        }
      }
    }

    if (name === "message") {
      if (!value) error = "Message is required";
      else if (value.length < 10) error = "Message must be at least 10 characters";
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormState]);
      if (error) newErrors[key as keyof Errors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) reject(new Error("Network failure"));
          else resolve(true);
        }, 1500);
      });
      
      showToast("Message sent successfully! I will contact you soon.", "success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      showToast("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative section-anchor">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-gray/10 border border-slate-gray/20 text-slate-gray text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span>Connect</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-jet mb-8">
              Let's build something <span className="text-slate-gray italic underline decoration-soft-rose underline-offset-8">Legendary.</span>
            </h2>
            <p className="text-slate-gray/70 mb-10 text-lg leading-relaxed font-medium">
              Whether you have a specific project in mind or just want to discuss the future of digital architecture, my inbox is always open.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-soft-rose/40 rounded-2xl flex items-center justify-center text-slate-gray">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-gray/50 uppercase tracking-widest">Email Me</p>
                  <p className="text-jet font-bold">chanirub2003@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-soft-rose/40 rounded-2xl flex items-center justify-center text-slate-gray">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-gray/50 uppercase tracking-widest">Location</p>
                  <p className="text-jet font-bold">Western Province, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.03] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-soft-rose/20 rounded-bl-[5rem] -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-gray/60 uppercase tracking-widest ml-4">Full Name</label>
                  <div className="relative">
                    <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.name ? 'text-red-400' : 'text-slate-gray/40'}`} />
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-black/[0.02] border ${errors.name ? 'border-red-500/30' : 'border-black/5 focus:border-slate-gray/30'} rounded-2xl py-4 pl-14 pr-6 text-sm text-jet placeholder:text-slate-gray/30 transition-all outline-none`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs font-bold ml-4 mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-gray/60 uppercase tracking-widest ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-gray/40'}`} />
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-black/[0.02] border ${errors.email ? 'border-red-500/30' : 'border-black/5 focus:border-slate-gray/30'} rounded-2xl py-4 pl-14 pr-6 text-sm text-jet placeholder:text-slate-gray/30 transition-all outline-none`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-bold ml-4 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-gray/60 uppercase tracking-widest ml-4">Contact Phone</label>
                <div className="relative">
                  <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.phone ? 'text-red-400' : 'text-slate-gray/40'}`} />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. +94 7X XXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-black/[0.02] border ${errors.phone ? 'border-red-500/30' : 'border-black/5 focus:border-slate-gray/30'} rounded-2xl py-4 pl-14 pr-6 text-sm text-jet placeholder:text-slate-gray/30 transition-all outline-none`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-bold ml-4 mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-gray/60 uppercase tracking-widest ml-4">Message</label>
                <div className="relative">
                  <MessageSquare className={`absolute left-5 top-6 w-4 h-4 transition-colors ${errors.message ? 'text-red-400' : 'text-slate-gray/40'}`} />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-black/[0.02] border ${errors.message ? 'border-red-500/30' : 'border-black/5 focus:border-slate-gray/30'} rounded-3xl py-4 pl-14 pr-6 text-sm text-jet placeholder:text-slate-gray/30 transition-all outline-none resize-none`}
                  />
                </div>
                {errors.message && <p className="text-red-500 text-xs font-bold ml-4 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jet text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-gray transition-all shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
