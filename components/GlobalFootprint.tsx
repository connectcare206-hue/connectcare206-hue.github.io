import React from 'react';
import { motion } from 'framer-motion';

export const GlobalFootprint: React.FC = () => {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-slate-900/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#64FFDA] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] mb-6 md:mb-10"
            >
              Global Footprint
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight mb-8 md:mb-12 leading-tight"
            >
              Unified <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#64FFDA]">Nexus Reach.</span>
            </motion.h3>
            <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl mb-12 md:mb-16 mx-auto lg:mx-0">
              Our infrastructure bridges the talent gap between the technical hubs of India and the innovation corridors of the West.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-lg mx-auto lg:mx-0">
              {[
                { label: 'India HQ', desc: 'Sourcing Core' },
                { label: 'Global Clients', desc: 'USA, UK, AU, CA' },
                { label: 'Talent Pool', desc: '500k+ Specialized' },
                { label: 'Compliance', desc: 'ISO 9001:2015' }
              ].map((stat, i) => (
                <div key={i} className="p-6 md:p-8 border border-white/5 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl">
                  <p className="text-xl md:text-2xl font-black text-white mb-1 md:mb-2 uppercase tracking-tight">{stat.label}</p>
                  <p className="text-[9px] md:text-[10px] font-black text-[#64FFDA] uppercase tracking-widest">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative w-full flex items-center justify-center">
            {/* Minimalist Tech Map Background */}
            <div className="relative aspect-square w-full max-w-[400px] md:max-w-none flex items-center justify-center scale-75 sm:scale-90 md:scale-100">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px]"></div>
              
              {/* Central India Point */}
              <div className="relative z-10 w-3 h-3 md:w-4 md:h-4 bg-[#64FFDA] rounded-full shadow-[0_0_20px_#64FFDA] md:shadow-[0_0_30px_#64FFDA] animate-pulse">
                <div className="absolute -inset-4 border border-[#64FFDA]/30 rounded-full animate-ping"></div>
              </div>
              
              {/* Orbiting Points representing global reach */}
              {[
                { angle: -45, label: 'USA', dist: '75%' },
                { angle: 30, label: 'UK', dist: '65%' },
                { angle: 180, label: 'AU', dist: '70%' },
                { angle: -90, label: 'CA', dist: '60%' }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute"
                  style={{
                    transform: `rotate(${p.angle}deg) translateY(-${p.dist})`
                  }}
                >
                  <div className="flex flex-col items-center gap-2 md:gap-3" style={{ transform: `rotate(${-p.angle}deg)` }}>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-lg"></div>
                    <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/5">{p.label}</span>
                    
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-1/2 -z-10 origin-top h-[100px] md:h-[150px] w-px bg-gradient-to-b from-[#64FFDA]/40 to-transparent" style={{ transform: `translate(-50%, 0) rotate(${p.angle + 180}deg)` }}></div>
                  </div>
                </motion.div>
              ))}
              
              {/* Rotating Rings */}
              <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute w-[60%] h-[60%] border border-[#64FFDA]/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};