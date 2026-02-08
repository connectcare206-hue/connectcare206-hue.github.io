import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCostComparison } from '../services/geminiService';
import * as Icons from './Icons';

export const AICostCalculator: React.FC<{ onSavingsClaimed?: () => void }> = ({ onSavingsClaimed }) => {
  const [hires, setHires] = useState(1);
  const [role, setRole] = useState('Senior Full-Stack Developer');
  const [localCost, setLocalCost] = useState(25); 
  const [nexusCost, setNexusCost] = useState(7.5);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Standard reduction factor for Connectcare Nexus talent
    const reductionFactor = 0.3; 
    setNexusCost(parseFloat((localCost * reductionFactor).toFixed(1)));
  }, [localCost]);

  const runAiAnalysis = async () => {
    if (!role.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    const data = await getCostComparison(role, 'Western Market (USA/UK)');
    if (data) {
      const val = parseInt(data.localAvg.replace(/[^0-9]/g, '')) || 25;
      setLocalCost(val);
    }
    setIsAnalyzing(false);
  };

  const monthlySavings = (localCost - nexusCost) * 160 * hires;

  return (
    <section id="calculator" className="py-24 md:py-40 bg-slate-900/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-manrope text-[#64FFDA] text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.6em] md:tracking-[0.8em] mb-6 md:mb-10"
            >
              Efficiency Nexus
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-tight"
            >
              Optimize Your ROI.
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 bg-slate-950/60 p-6 sm:p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <label className="font-manrope block text-[9px] md:text-[10px] font-extrabold text-[#64FFDA] uppercase tracking-[0.4em]">Target Specialized Role</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input 
                    type="text" 
                    value={role} 
                    onChange={e => setRole(e.target.value)} 
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-5 md:px-8 md:py-6 outline-none font-bold text-white focus:border-[#64FFDA]/40 transition-all text-base md:text-lg" 
                  />
                  <button 
                    onClick={runAiAnalysis} 
                    disabled={isAnalyzing}
                    className="bg-[#64FFDA]/10 border border-[#64FFDA]/30 p-5 sm:px-8 rounded-2xl text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#020617] transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Icons.IconSatellite size={24} />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex justify-between items-end">
                  <label className="font-manrope text-[9px] md:text-[10px] font-extrabold text-[#64FFDA] uppercase tracking-[0.4em]">Resource Volume</label>
                  <span className="font-numeric text-2xl md:text-3xl font-extrabold text-white">{hires} <span className="text-xs md:text-sm font-normal text-slate-500 uppercase tracking-widest">Experts</span></span>
                </div>
                <input 
                  type="range" min="1" max="50" value={hires} 
                  onChange={e => setHires(parseInt(e.target.value))} 
                  className="w-full h-2 bg-white/10 accent-[#64FFDA] cursor-pointer rounded-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6 font-numeric">
                <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5">
                  <p className="text-[8px] md:text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Market Rate</p>
                  <p className="text-2xl md:text-4xl font-extrabold text-white">${localCost}<span className="text-sm font-normal text-slate-600">/hr</span></p>
                </div>
                <div className="p-6 md:p-8 bg-[#64FFDA]/10 rounded-2xl md:rounded-3xl border border-[#64FFDA]/30">
                  <p className="text-[8px] md:text-[9px] font-extrabold text-[#64FFDA] uppercase tracking-widest mb-3 md:mb-4">Nexus Rate</p>
                  <p className="text-2xl md:text-4xl font-extrabold text-[#64FFDA]">${nexusCost}<span className="text-sm font-normal text-slate-700">/hr</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#020617]/40 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col justify-between border border-white/5 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 to-transparent opacity-30"></div>
              
              <div className="relative z-10 space-y-8 md:space-y-12">
                <div>
                  <p className="font-manrope text-[9px] md:text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-6">Net Monthly Savings</p>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={monthlySavings}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-numeric text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#64FFDA] tracking-tighter"
                    >
                      ${monthlySavings.toLocaleString()}
                      <span className="text-xl md:text-2xl font-normal text-slate-600 ml-2 md:ml-4">/mo</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                <p className="text-sm md:text-lg text-slate-400 leading-relaxed font-light">
                  We architect your growth by deploying high-efficiency talent hubs that reduce burn while accelerating technical roadmap delivery.
                </p>
              </div>
              
              <button 
                onClick={onSavingsClaimed} 
                className="font-button mt-10 md:mt-16 bg-[#64FFDA] text-[#020617] py-6 md:py-8 rounded-2xl font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all relative z-10"
              >
                Claim Efficiency Gains
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
