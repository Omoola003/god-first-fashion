"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2, Ruler, Calendar, Scissors, Palette, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BespokeModal({ product, isOpen, onClose }) {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [sizingProfile, setSizingProfile] = useState("Standard");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/atelier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          product_name: product.name,
          submission_source: "Bespoke Modal"
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to synchronize");
      }

      setStatus("success");
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/98 backdrop-blur-xl" 
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-3xl bg-neutral-900 border border-white/5 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[95vh] no-scrollbar"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-neutral-600 hover:text-white transition-colors z-10">
              <X size={20} strokeWidth={1} />
            </button>

            {status === "success" ? (
              <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="mx-auto text-white mb-8" size={48} strokeWidth={1} />
                <h2 className="font-serif text-4xl text-white mb-4 italic">Archive Entry Secured</h2>
                <p className="text-neutral-500 font-light leading-loose max-w-sm mx-auto mb-10 text-sm">
                  Your specifications for the {product.name} are now with our master tailors. We will reach out shortly to finalize your bespoke journey.
                </p>
                <button onClick={onClose} className="text-[10px] uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-white transition-all">
                  Return to Archive
                </button>
              </div>
            ) : (
              <>
                <div className="mb-12 border-b border-white/5 pb-8 flex justify-between items-end">
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase tracking-[0.5em] block mb-4">Production Intake Form</span>
                    <h2 className="font-serif text-4xl text-white italic tracking-tight">Personal Commission</h2>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Item Ref</p>
                    <p className="text-xs text-white uppercase tracking-tighter">{product.name}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  
                  {/* ERROR STATE MESSAGE */}
                  {status === "error" && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-[10px] uppercase tracking-widest"
                    >
                        <AlertCircle size={14} />
                        Fine tailoring requires precision. Please verify your connection or contact the concierge.
                    </motion.div>
                  )}

                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-[0.3em]">Client & Timeline</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <AtelierInput label="Full Name" name="client_name" required />
                      <AtelierInput label="Email Address" name="client_email" type="email" required />
                      <AtelierInput label="Required by Date" name="deadline" type="date" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <Palette size={14} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-[0.3em]">Material Curation</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <AtelierInput label="Preferred Fabric Type" name="fabric_type" placeholder="e.g. Italian Wool, Silk Crepe" />
                      <AtelierInput label="Preferred Color/Tone" name="fabric_color" placeholder="e.g. Midnight Navy, Ivory" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <Scissors size={14} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-[0.3em]">Tailoring Profile</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Sizing Method</label>
                        <select 
                          value={sizingProfile}
                          onChange={(e) => setSizingProfile(e.target.value)}
                          name="sizing_profile" 
                          className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer"
                        >
                          <option className="bg-neutral-900" value="Standard">Standard Ready-to-Wear</option>
                          <option className="bg-neutral-900" value="Bespoke">Bespoke (Custom Measurements)</option>
                          <option className="bg-neutral-900" value="Returning">Returning Client (Use my Profile)</option>
                        </select>
                      </div>

                      {sizingProfile === "Standard" && (
                        <div className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-500">
                          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <label key={size} className="flex-1">
                              <input type="radio" name="standard_size" value={size} className="peer hidden" />
                              <div className="border border-white/5 py-3 text-center text-xs text-neutral-500 peer-checked:border-white peer-checked:text-white cursor-pointer transition-all uppercase tracking-widest">
                                {size}
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {sizingProfile === "Bespoke" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-10 pt-4"
                      >
                        <div className="space-y-6">
                          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Ruler size={12} /> Top / Jacket Measurements (Inches)
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <AtelierInput label="Chest" name="top_chest" placeholder="00.0" />
                            <AtelierInput label="Shoulder" name="top_shoulder" placeholder="00.0" />
                            <AtelierInput label="Sleeve" name="top_sleeve" placeholder="00.0" />
                            <AtelierInput label="Top Length" name="top_length" placeholder="00.0" />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Ruler size={12} /> Trouser / Bottom Measurements (Inches)
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <AtelierInput label="Waist" name="bot_waist" placeholder="00.0" />
                            <AtelierInput label="Hips" name="bot_hips" placeholder="00.0" />
                            <AtelierInput label="Inseam" name="bot_inseam" placeholder="00.0" />
                            <AtelierInput label="Thigh" name="bot_thigh" placeholder="00.0" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <AtelierInput label="Purpose of Commission" name="occasion" placeholder="e.g. Wedding, Gala, Corporate Keynote" />
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Artisanal Notes</label>
                      <textarea 
                        name="notes"
                        rows={2} 
                        className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-white transition-all resize-none placeholder:text-neutral-800"
                        placeholder="Any unique design modifications or fitting preferences..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="animate-spin" size={14} /> Synchronizing with Atelier</>
                    ) : (
                      <>Secure This Commission <Scissors size={14} className="group-hover:rotate-12 transition-transform" /></>
                    )}
                  </button>
                  
                  <p className="text-center text-[9px] text-neutral-600 uppercase tracking-[0.2em]">
                    By submitting, you initiate a bespoke production slot in our seasonal queue.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function AtelierInput({ label, ...props }) {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">{label}</label>
      <input 
        {...props} 
        className="w-full bg-transparent border-b border-white/10 py-4 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-neutral-800"
      />
    </div>
  );
}