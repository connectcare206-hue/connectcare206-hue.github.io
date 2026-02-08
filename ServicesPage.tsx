import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from './components/Icons';

const WA_NUMBER = "918460335032";
const getWaLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const ServiceSection: React.FC<{ 
  Icon: React.FC<{ size?: number | string }>; 
  title: string; 
  subtitle?: string; 
  desc: string; 
  bullets: string[]; 
  onCta: () => void; 
  ctaLabel?: string; 
  waMessage: string;
  index: number;
}> = ({ Icon, title, subtitle, desc, bullets, onCta, ctaLabel = "Request Candidate Profiles", waMessage, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] group border border-white/5 relative overflow-hidden h-full flex flex-col hover:border-[#64FFDA]/40 hover:bg-[#64FFDA]/[0.03] transition-all duration-700"
  >
    {/* Large background icon animation - Hidden on very small screens for clarity */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      whileInView={{ opacity: 0.05, scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, delay: index * 0.05 + 0.2 }}
      className="absolute -right-6 -top-6 md:-right-10 md:-top-10 text-white/5 group-hover:text-[#64FFDA]/10 transition-all pointer-events-none group-hover:scale-125 group-hover:-rotate-12 duration-1000 hidden sm:block"
    >
      <Icon size={120} />
    </motion.div>
    
    {/* Small primary icon animation */}
    <motion.div 
      whileHover={{ 
        scale: 1.1, 
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
      className="w-12 h-12 md:w-16 md:h-16 bg-[#64FFDA]/5 border border-[#64FFDA]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#64FFDA] mb-8 md:mb-10 group-hover:bg-[#64FFDA]/20 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] transition-all duration-500"
    >
      <Icon size={32} />
    </motion.div>

    <div>
      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#64FFDA] transition-colors">{title}</h3>
      {subtitle && <p className="font-manrope text-[8px] md:text-[9px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-500 mb-6">{subtitle}</p>}
    </div>
    
    <p className="text-sm md:text-base text-slate-400 mb-10 flex-grow font-normal leading-relaxed">{desc}</p>
    
    <ul className="grid grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-12 font-manrope">
      {bullets.map((b, i) => (
        <motion.li 
          key={i} 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + i * 0.1 + 0.5 }}
          className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[9px] font-extrabold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors"
        >
          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#64FFDA] shadow-[0_0_8px_rgba(100,255,218,0.6)] shrink-0"></div>
          <span className="truncate">{b}</span>
        </motion.li>
      ))}
    </ul>
    
    <button 
      onClick={() => window.open(getWaLink(waMessage), '_blank')} 
      className="font-button w-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-[#64FFDA] py-5 md:py-6 rounded-xl md:rounded-2xl font-extrabold text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-[#64FFDA] hover:text-[#020617] hover:shadow-[0_0_40px_rgba(100,255,218,0.4)] transition-all active:scale-95 shadow-lg group/btn"
    >
      <span className="flex items-center justify-center gap-2">
        {ctaLabel}
        <Icons.IconChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
      </span>
    </button>
  </motion.div>
);

export const ServicesPage: React.FC<{ onAction: (t: 'Employer') => void }> = ({ onAction }) => {
  const services = [
    {
      Icon: Icons.IconIT,
      title: "IT & AI Engineering",
      subtitle: "Technology Core",
      desc: "Deploying elite software engineers, AI researchers, and DevOps experts trained for western innovation hubs.",
      bullets: ["Full Stack Devs", "AI Researchers", "Cloud DevOps", "Data Engineers"],
      waMessage: "Hi Connectcare, I’m interested in IT & AI staffing services."
    },
    {
      Icon: Icons.IconFinance,
      title: "Bookkeeping & BPO",
      subtitle: "Financial Backbone",
      desc: "Scale your back-office with offshore CPAs and expert bookkeepers at 50% lower operational costs.",
      bullets: ["CPA Support", "Payroll Mgmt", "Tax Compliance", "AP/AR Ops"],
      waMessage: "Hi Connectcare, I want to know more about bookkeeping and finance outsourcing."
    },
    {
      Icon: Icons.IconSupport,
      title: "24/7 CX Support",
      subtitle: "Service Excellence",
      desc: "Premium voice and chat hubs for USA, UK, and Australian markets with high English proficiency.",
      bullets: ["Voice Support", "Chat Agents", "CX Strategy", "Support Ops"],
      waMessage: "Hi Connectcare, I’m interested in 24/7 customer support services."
    },
    {
      Icon: Icons.IconGrowth,
      title: "Sales & Growth Hub",
      subtitle: "Outbound Engine",
      desc: "High-performance BDRs and account managers trained for aggressive global outbound expansion.",
      bullets: ["Lead Gen BDRs", "Sales Ops", "Market Analysts", "Growth Leads"],
      waMessage: "Hi Connectcare, I'm interested in the Sales & Growth Hub talent."
    },
    {
      Icon: Icons.IconScience,
      title: "Pharma & Labs",
      subtitle: "Scientific Sourcing",
      desc: "Specialized hiring for clinical trials, regulatory affairs, and international research centers.",
      bullets: ["Clinical Leads", "Regulatory Spec", "Pharmacovigilance", "Lab Analysts"],
      waMessage: "Hi Connectcare, I'm interested in Pharma and Lab research recruitment."
    },
    {
      Icon: Icons.IconHR,
      title: "Managed RPO",
      subtitle: "Enterprise HR",
      desc: "Acting as your internal recruitment engine room for high-volume staffing and compliance.",
      bullets: ["Full Lifecycle", "Compliance Hub", "ATS Integration", "Sourcing Hub"],
      waMessage: "Hi Connectcare, I want to discuss Managed RPO for my company."
    },
    {
      Icon: Icons.IconEnergy,
      title: "Solar & Energy",
      subtitle: "Renewable Tech",
      desc: "Technical talent for the global energy transition, specializing in engineering and field coordination.",
      bullets: ["Design Engineers", "Project Coordinators", "Grid Specialists", "Safety Leads"],
      waMessage: "Hi Connectcare, I'm interested in technical talent for Solar & Energy projects."
    },
    {
      Icon: Icons.IconRealEstate,
      title: "Real Estate Ops",
      subtitle: "Asset Management",
      desc: "Virtual property managers and back-office admins for large scale global real estate portfolios.",
      bullets: ["Prop Managers", "Lease Admin", "Asset Analysts", "CRM Managers"],
      waMessage: "Hi Connectcare, I'm interested in Real Estate Ops staffing."
    },
    {
      Icon: Icons.IconTravel,
      title: "Travel & Tourism",
      subtitle: "Global Mobility",
      desc: "Specialized booking agents and customer success leads for the international travel sector.",
      bullets: ["Booking Agents", "Itinerary Planners", "Customer Success", "Travel Analysts"],
      waMessage: "Hi Connectcare, I'm interested in travel and tourism support staffing."
    },
    {
      Icon: Icons.IconExecutive,
      title: "Executive Search",
      subtitle: "Leadership Nexus",
      desc: "Confidential headhunting for C-suite and VP level positions across global technical domains.",
      bullets: ["C-Suite Search", "Director Hiring", "Niche Specialists", "Market Intel"],
      waMessage: "Hi Connectcare, I'd like to discuss confidential Executive Search services."
    },
    {
      Icon: Icons.IconContract,
      title: "Contract Staffing",
      subtitle: "Flexible Workforce",
      desc: "Project-based manpower scaling with zero internal HR liability and rapid deployment.",
      bullets: ["Short-term Pros", "Contract Teams", "Seasonal Staff", "Gig Specialists"],
      waMessage: "Hi Connectcare, I'm interested in flexible contract staffing."
    },
    {
      Icon: Icons.IconResume,
      title: "Resume Sourcing",
      subtitle: "CV Optimization",
      desc: "Elite candidate profiling and formatting for top-tier global placement visibility.",
      bullets: ["CV Formatting", "LinkedIn Audit", "Profile Building", "Sourcing Hub"],
      waMessage: "Hi Connectcare, I'm interested in resume sourcing and CV optimization."
    }
  ];

  return (
    <div className="pt-32 md:pt-56 pb-20 md:pb-32 w-full overflow-x-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-manrope text-[#64FFDA] text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.6em] md:tracking-[0.8em] mb-8 md:mb-10"
          >
            Nexus Industry Portfolios
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[9rem] font-black text-white mb-8 md:mb-10 leading-[0.9] md:leading-[0.85] tracking-tighter"
          >
            Vertical <span className="text-[#64FFDA]">Nexus.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-normal opacity-80 leading-relaxed"
          >
            Engineered recruitment solutions for global brands. From tech engineering to clinical research, we scale your company through premium specialized talent.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map((service, idx) => (
            <ServiceSection 
              key={idx}
              index={idx}
              {...service}
              onCta={() => onAction('Employer')}
            />
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 md:mt-48 text-center bg-white/5 border border-white/10 p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] backdrop-blur-xl relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
           <h3 className="text-3xl md:text-5xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight">Ready to Deploy Your <span className="text-[#64FFDA]">Nexus Team?</span></h3>
           <p className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed font-normal">Our recruitment heads are ready to synchronize your requirements with our elite candidate pools in under 48 hours.</p>
           <button 
             onClick={() => window.open(getWaLink("Hi Connectcare, I’d like to start sourcing elite talent for my company."), '_blank')} 
             className="font-button w-full sm:w-auto bg-[#64FFDA] text-[#020617] px-8 py-5 md:px-20 md:py-8 rounded-2xl md:rounded-3xl font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm shadow-2xl hover:shadow-[0_0_60px_rgba(100,255,218,0.6)] transition-all hover:-translate-y-1"
           >
             Start Sourcing Elite Talent
           </button>
        </motion.div>
      </div>
    </div>
  );
};
