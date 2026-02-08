import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InquiryType } from '../types';
import { classifyInquiryIntent } from '../services/geminiService';
import * as Icons from './Icons';

export const InquiryAssistant: React.FC<{ externalTypeTrigger?: InquiryType | null }> = ({ externalTypeTrigger }) => {
  const [step, setStep] = useState<'INITIAL' | 'COLLECT' | 'SUCCESS'>('INITIAL');
  const [type, setType] = useState<InquiryType | null>(externalTypeTrigger || null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInitial = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const msg = (e.target as any).message.value;
    const res = await classifyInquiryIntent(msg);
    setType(res.intent);
    setConfidence(res.confidence);
    setStep('COLLECT');
    setLoading(false);
  };

  return (
    <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border border-white/5 min-h-[500px] md:min-h-[550px] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {step === 'SUCCESS' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 md:space-y-8"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
              <Icons.IconHandshake size={32} />
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight uppercase">Transmission Received.</h4>
              <p className="text-slate-500 font-light text-base md:text-lg max-w-xs mx-auto">A consultant will initialize contact within 4 Earth hours regarding your {type} inquiry.</p>
            </div>
          </motion.div>
        ) : step === 'INITIAL' ? (
          <motion.form 
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleInitial} 
            className="space-y-8 md:space-y-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 shrink-0">
                <Icons.IconSatellite size={20} />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold tracking-tight uppercase">AI Global Intake</h4>
                <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-600">Secure Classification Engine</p>
              </div>
            </div>
            
            <div className="relative">
              <textarea 
                name="message" 
                required 
                placeholder="Briefly describe your staffing requirements..." 
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 min-h-[180px] md:min-h-[220px] font-light outline-none focus:border-purple-500/50 transition-all text-white placeholder:text-slate-700 text-base md:text-lg resize-none"
              ></textarea>
              <div className="absolute bottom-4 right-6 text-[7px] md:text-[8px] font-bold text-slate-700 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5 hidden sm:block">Neural Link Active</div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-white text-black py-5 md:py-7 rounded-2xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] hover:bg-purple-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Analyze & Sync <Icons.IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form 
            key="collect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => { e.preventDefault(); setStep('SUCCESS'); }} 
            className="space-y-8 md:space-y-10"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-6 md:pb-8">
              <div>
                <h4 className="text-xl md:text-2xl font-bold tracking-tight uppercase">{type} PORTAL</h4>
                <p className="text-[8px] md:text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Classification Confirmed</p>
              </div>
              <button type="button" onClick={() => setStep('INITIAL')} className="text-[9px] font-bold uppercase text-slate-500 hover:text-white transition-all">Retry</button>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="relative">
                <input type="text" required placeholder="Full Name" className="w-full bg-black/40 border border-white/5 px-6 py-5 md:px-8 md:py-6 rounded-2xl font-light outline-none focus:border-purple-500/50 transition-all text-white text-base md:text-lg"/>
              </div>
              <div className="relative">
                <input type="text" required placeholder="WhatsApp or Email" className="w-full bg-black/40 border border-white/5 px-6 py-5 md:px-8 md:py-6 rounded-2xl font-light outline-none focus:border-purple-500/50 transition-all text-white text-base md:text-lg"/>
              </div>
            </div>

            <button className="w-full bg-purple-500 text-white py-5 md:py-7 rounded-2xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              Establish Connection
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
