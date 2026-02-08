import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { AICostCalculator } from './components/AICostCalculator';
import { VoiceAgent } from './components/VoiceAgent';
import { InquiryAssistant } from './components/InquiryAssistant';
import { GlobalFootprint } from './components/GlobalFootprint';
import { PROCESS_STEPS } from './constants';
import { InquiryType } from './types';
import { ServicesPage } from './ServicesPage';
import * as Icons from './components/Icons';

const WA_NUMBER = "918460335032";
const getWaLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const SolarEclipseLogo = () => (
  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
    {/* Atmospheric Glow */}
    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[60px] md:blur-[120px] animate-pulse"></div>
    
    {/* Rotating Cosmic Rings */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border border-white/5 rounded-full"
    ></motion.div>
    
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-8 md:inset-12 border border-purple-500/20 rounded-full border-dashed"
    ></motion.div>
    
    {/* The Core Medallion */}
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "circOut" }}
      className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-black rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.15)] md:shadow-[0_0_100px_rgba(139,92,246,0.2)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      
      {/* Dynamic Brand Icon */}
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
        <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80" stroke="url(#galaxyGrad)" strokeWidth="6" strokeLinecap="round" />
        <defs>
          <linearGradient id="galaxyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="6" fill="white" />
      </svg>
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'services'>('home');
  const [activeInquiryTrigger, setActiveInquiryTrigger] = useState<{ type: InquiryType, key: number } | null>(null);

  const handleHeroAction = (type: InquiryType) => {
    setActiveInquiryTrigger({ type, key: Date.now() });
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppAction = (message: string) => {
    window.open(getWaLink(message), '_blank');
  };

  const handleNavigate = (target: 'home' | 'services') => {
    setView(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProcessIcon = (iconName: string) => {
    switch(iconName) {
      case 'fa-comments': return <Icons.IconEmail size={32} />;
      case 'fa-magnifying-glass': return <Icons.IconMagnify size={32} />;
      case 'fa-user-check': return <Icons.IconUserCheck size={32} />;
      default: return <Icons.IconSatellite size={32} />;
    }
  };

  return (
    <Layout 
      onActionTrigger={(type) => {
        if (type === 'Employer') {
          handleWhatsAppAction("Hi Connectcare, I’d like to scale my company with elite talent.");
        } else {
          handleHeroAction(type);
        }
      }} 
      onNavigate={handleNavigate}
    >
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* GALAXY HERO */}
            <section className="relative min-h-[90vh] md:min-h-screen pt-32 pb-16 md:pt-44 md:pb-20 flex items-center overflow-hidden">
              <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                  <div className="lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12"
                    >
                      <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                      ISO 9001:2015 Hub • India
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="hero-title mb-8 md:mb-10 tracking-tighter"
                    >
                      Beyond <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">Boundaries.</span>
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-base md:text-xl lg:text-2xl text-slate-400 mb-10 md:mb-16 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0"
                    >
                      Engineered recruitment for global brands. Deploying elite India-based talent hubs at <span className="text-white font-semibold">70% lower costs</span> for USA, UK, and AU enterprises.
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
                    >
                      <button 
                        onClick={() => handleWhatsAppAction("Hi Connectcare, I’d like to hire elite talent.")}
                        className="btn-neon px-8 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-xl"
                      >
                        Initiate Hiring
                      </button>
                      <button 
                        onClick={() => handleNavigate('services')}
                        className="border border-white/10 text-white px-8 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white/5 transition-all"
                      >
                        Explore Portfolios
                      </button>
                    </motion.div>
                  </div>
                  
                  <div className="lg:w-2/5 flex justify-center lg:justify-end order-1 lg:order-2">
                    <SolarEclipseLogo />
                  </div>
                </div>
              </div>
            </section>

            <AICostCalculator onSavingsClaimed={() => handleWhatsAppAction("Hi Connectcare, show me how to optimize my ROI with offshore talent.")} />
            
            <div className="w-full">
              <GlobalFootprint />
            </div>

            {/* PROCESS SECTION */}
            <section className="py-24 md:py-40 relative">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16 md:mb-32">
                  <h2 className="text-purple-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] mb-4 md:mb-6">Mission Control</h2>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">The 48hr Deployment.</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {PROCESS_STEPS.slice(0, 3).map((step, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative group overflow-hidden"
                    >
                      <div className="text-purple-500/10 text-6xl md:text-8xl font-black absolute top-6 md:top-10 right-8 md:right-12 group-hover:text-purple-500/20 transition-colors pointer-events-none">{step.number}</div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 md:mb-10">
                        {getProcessIcon(step.icon)}
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 uppercase tracking-tight">{step.title}</h4>
                      <p className="text-sm md:text-base text-slate-500 leading-relaxed font-light">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <ServicesPage onAction={(t) => handleWhatsAppAction("Hi Connectcare, I’d like to scale my company.")} />
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceAgent />

      {/* FOOTER CTA */}
      <section id="contact" className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight">Reach the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Event Horizon.</span></h3>
              <p className="text-base md:text-xl text-slate-400 mb-10 md:mb-16 leading-relaxed font-light mx-auto lg:mx-0 max-w-lg">Join the ranks of global brands scaling their efficiency through our elite human capital nexus.</p>
              
              <div className="space-y-6 md:space-y-8 max-w-md mx-auto lg:mx-0">
                {[
                  { Icon: Icons.IconEmail, label: 'connectcare206@gmail.com' },
                  { Icon: Icons.IconPhone, label: '+91 8460335032' },
                  { Icon: Icons.IconLocation, label: 'Ahmedabad Tech Hub, India' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 md:gap-6 group cursor-pointer justify-center lg:justify-start" onClick={() => handleWhatsAppAction(`Hi Connectcare, reaching out regarding ${item.label}`)}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-all shrink-0">
                      <item.Icon size={20} />
                    </div>
                    <span className="text-sm md:text-lg font-bold text-white/60 group-hover:text-white transition-colors truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <InquiryAssistant externalTypeTrigger={activeInquiryTrigger?.type} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
