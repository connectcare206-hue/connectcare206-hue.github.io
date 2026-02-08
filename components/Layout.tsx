import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from './Icons';

const WA_NUMBER = "918460335032";
const getWaLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <path d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" />
    <circle cx="50" cy="50" r="8" fill="white" className="animate-pulse" />
  </svg>
);

const Logo = ({ size = "md", onClick }: { size?: string, onClick?: () => void }) => {
  const isSmall = size === "sm";
  return (
    <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={onClick}>
      <div className={`relative flex items-center justify-center rounded-full border border-white/10 bg-black shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-700 group-hover:scale-110 ${isSmall ? 'w-8 h-8 md:w-10 md:h-10' : 'w-12 h-12 md:w-16 md:h-16'}`}>
        <LogoIcon className={isSmall ? "w-5 h-5 md:w-6 md:h-6" : "w-8 h-8 md:w-10 md:h-10"} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tighter ${isSmall ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-white uppercase`}>CONNECTCARE</span>
        <span className={`font-manrope font-bold tracking-[0.4em] ${isSmall ? 'text-[6px] md:text-[7px]' : 'text-[7px] md:text-[8px]'} text-purple-500 uppercase mt-1`}>Global Services</span>
      </div>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode; onActionTrigger?: (type: 'Employer' | 'Candidate' | 'General') => void; onNavigate?: (target: 'home' | 'services') => void }> = ({ children, onActionTrigger, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (target: 'home' | 'services') => {
    onNavigate?.(target);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo size={scrolled ? "sm" : "md"} onClick={() => navigateTo('home')} />
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-manrope">
            <button onClick={() => onNavigate?.('home')} className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">Origins</button>
            <button onClick={() => onNavigate?.('services')} className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">Portfolios</button>
            <button 
              onClick={() => window.open(getWaLink("Hi Connectcare, I'd like to scale my company."), '_blank')} 
              className="px-8 py-4 bg-white text-black rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Consult Now
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            ></motion.span>
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            ></motion.span>
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            ></motion.span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black pt-32 pb-10 px-6 lg:hidden flex flex-col gap-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              <button 
                onClick={() => navigateTo('home')} 
                className="text-4xl font-heading font-extrabold tracking-tighter text-white/40 hover:text-white text-left transition-colors"
              >
                ORIGINS
              </button>
              <button 
                onClick={() => navigateTo('services')} 
                className="text-4xl font-heading font-extrabold tracking-tighter text-white/40 hover:text-white text-left transition-colors"
              >
                PORTFOLIOS
              </button>
              <button 
                onClick={() => window.open(getWaLink("Hi Connectcare, I'd like to hire elite talent."), '_blank')} 
                className="text-4xl font-heading font-extrabold tracking-tighter text-purple-500 hover:text-purple-400 text-left transition-colors"
              >
                CONSULT NOW
              </button>
            </div>
            
            <div className="mt-auto border-t border-white/10 pt-10 space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connect Globally</p>
              <div className="flex gap-6">
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white"><Icons.IconPhone size={20} /></a>
                <a href="https://linkedin.com" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white"><Icons.IconExecutive size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
      
      <footer className="bg-black py-16 md:py-24 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-2">
              <Logo size="sm" onClick={() => onNavigate?.('home')} />
              <p className="mt-6 md:mt-8 text-sm md:text-base text-slate-500 font-light max-w-sm leading-relaxed">Scaling businesses into global brands through premium India-based talent hubs. ISO 9001:2015 Certified Excellence.</p>
            </div>
            <div className="font-manrope">
              <h4 className="text-white text-[9px] font-bold mb-6 md:mb-8 uppercase tracking-[0.4em]">Sectors</h4>
              <ul className="space-y-3 md:space-y-4 text-xs text-slate-600 font-bold uppercase tracking-widest">
                <li className="hover:text-purple-400 cursor-pointer transition-colors">IT & Engineering</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Finance Hub</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">CX Excellence</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">Solar Energy</li>
              </ul>
            </div>
            <div className="font-manrope">
              <h4 className="text-white text-[9px] font-bold mb-6 md:mb-8 uppercase tracking-[0.4em]">Connect</h4>
              <div className="flex gap-4">
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"><Icons.IconPhone size={18} /></a>
                <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"><Icons.IconExecutive size={18} /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-[7px] md:text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em]">&copy; 2025 CONNECTCARE SERVICES. ALL RIGHTS RESERVED.</p>
            <p className="text-[7px] md:text-[8px] font-bold text-purple-900 uppercase tracking-[0.3em]">Ahmedabad • San Francisco • London • Sydney</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
