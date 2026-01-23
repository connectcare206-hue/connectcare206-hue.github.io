import React from 'react';

const ServiceSection: React.FC<{ icon: string; title: string; subtitle?: string; desc: string; bullets: string[]; onCta: () => void; ctaLabel?: string }> = ({ icon, title, subtitle, desc, bullets, onCta, ctaLabel = "Request Candidate Profiles" }) => (
  <div className="glass-card p-12 rounded-[4rem] group border border-white/5 relative overflow-hidden h-full flex flex-col hover:border-[#64FFDA]/40 hover:bg-[#64FFDA]/[0.03] transition-all duration-700">
    {/* Large background icon animation */}
    <div className="absolute -right-10 -top-10 text-9xl text-white/5 group-hover:text-[#64FFDA]/10 transition-all pointer-events-none group-hover:scale-125 group-hover:-rotate-12 duration-1000">
      <i className={`fas ${icon}`}></i>
    </div>
    
    {/* Small primary icon animation */}
    <div className="w-16 h-16 bg-[#64FFDA]/5 border border-[#64FFDA]/10 rounded-2xl flex items-center justify-center text-[#64FFDA] text-3xl mb-10 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#64FFDA]/20 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] transition-all duration-500">
      <i className={`fas ${icon} group-hover:animate-bounce`}></i>
    </div>

    <div>
      <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-[#64FFDA] transition-colors">{title}</h3>
      {subtitle && <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6">{subtitle}</p>}
    </div>
    
    <p className="text-slate-400 text-base mb-10 flex-grow font-medium leading-relaxed">{desc}</p>
    
    <ul className="grid grid-cols-2 gap-4 mb-12">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-[#64FFDA] shadow-[0_0_8px_rgba(100,255,218,0.6)]"></div>
          {b}
        </li>
      ))}
    </ul>
    
    <button 
      onClick={onCta} 
      className="w-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-[#64FFDA] py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#64FFDA] hover:text-[#020617] hover:shadow-[0_0_40px_rgba(100,255,218,0.4)] transition-all active:scale-95 shadow-lg group/btn"
    >
      <span className="flex items-center justify-center gap-2">
        {ctaLabel}
        <i className="fas fa-chevron-right text-[8px] group-hover/btn:translate-x-1 transition-transform"></i>
      </span>
    </button>
  </div>
);

export const ServicesPage: React.FC<{ onAction: (t: 'Employer') => void }> = ({ onAction }) => {
  return (
    <div className="pt-56 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-[#64FFDA] text-[11px] font-black uppercase tracking-[0.8em] mb-10">Nexus Industry Portfolios</h2>
          <h1 className="text-7xl md:text-[9rem] font-black text-white mb-10 leading-[0.85] tracking-tighter">
            Vertical <span className="text-[#64FFDA]">Nexus.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium opacity-80 leading-relaxed">
            Engineered recruitment solutions for global brands. From tech engineering to clinical research, we scale your company through premium specialized talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceSection 
            icon="fa-laptop-code" 
            title="IT & AI Engineering" 
            subtitle="Technology Core"
            desc="Deploying elite software engineers, AI researchers, and DevOps experts trained for western innovation hubs." 
            bullets={["Full Stack Devs", "AI Researchers", "Cloud DevOps", "Data Engineers"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Hire Elite Tech Talent"
          />
          <ServiceSection 
            icon="fa-calculator" 
            title="Bookkeeping & BPO" 
            subtitle="Financial Backbone"
            desc="Scale your back-office with offshore CPAs and expert bookkeepers at 50% lower operational costs." 
            bullets={["CPA Support", "Payroll Mgmt", "Tax Compliance", "AP/AR Ops"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Hire Finance Experts"
          />
          <ServiceSection 
            icon="fa-headset" 
            title="24/7 CX Support" 
            subtitle="Service Excellence"
            desc="Premium voice and chat hubs for USA, UK, and Australian markets with high English proficiency." 
            bullets={["Voice Support", "Chat Agents", "CX Strategy", "Support Ops"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Scale Support Teams"
          />
          <ServiceSection 
            icon="fa-chart-line" 
            title="Sales & Growth Hub" 
            subtitle="Outbound Engine"
            desc="High-performance BDRs and account managers trained for aggressive global outbound expansion." 
            bullets={["Lead Gen BDRs", "Sales Ops", "Market Analysts", "Growth Leads"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Hire Growth Specialists"
          />
          <ServiceSection 
            icon="fa-pills" 
            title="Pharma & Labs" 
            subtitle="Scientific Sourcing"
            desc="Specialized hiring for clinical trials, regulatory affairs, and international research centers." 
            bullets={["Clinical Leads", "Regulatory Spec", "Pharmacovigilance", "Lab Analysts"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Source Scientific Talent"
          />
          <ServiceSection 
            icon="fa-building-circle-check" 
            title="Managed RPO" 
            subtitle="Enterprise HR"
            desc="Acting as your internal recruitment engine room for high-volume staffing and compliance." 
            bullets={["Full Lifecycle", "Compliance Hub", "ATS Integration", "Sourcing Hub"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Consult on RPO"
          />
          <ServiceSection 
            icon="fa-solar-panel" 
            title="Solar & Energy" 
            subtitle="Renewable Tech"
            desc="Technical talent for the global energy transition, specializing in engineering and field coordination." 
            bullets={["Design Engineers", "Project Coordinators", "Grid Specialists", "Safety Leads"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Hire Solar Engineers"
          />
          <ServiceSection 
            icon="fa-building-wheat" 
            title="Real Estate Ops" 
            subtitle="Asset Management"
            desc="Virtual property managers and back-office admins for large scale global real estate portfolios." 
            bullets={["Prop Managers", "Lease Admin", "Asset Analysts", "CRM Managers"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Deploy Estate Admins"
          />
          <ServiceSection 
            icon="fa-plane-up" 
            title="Travel & Tourism" 
            subtitle="Global Mobility"
            desc="Specialized booking agents and customer success leads for the international travel sector." 
            bullets={["Booking Agents", "Itinerary Planners", "Customer Success", "Travel Analysts"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Hire Travel Specialists"
          />
          <ServiceSection 
            icon="fa-briefcase" 
            title="Executive Search" 
            subtitle="Leadership Nexus"
            desc="Confidential headhunting for C-suite and VP level positions across global technical domains." 
            bullets={["C-Suite Search", "Director Hiring", "Niche Specialists", "Market Intel"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Initiate Search"
          />
          <ServiceSection 
            icon="fa-user-clock" 
            title="Contract Staffing" 
            subtitle="Flexible Workforce"
            desc="Project-based manpower scaling with zero internal HR liability and rapid deployment." 
            bullets={["Short-term Pros", "Contract Teams", "Seasonal Staff", "Gig Specialists"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Request Contract Staff"
          />
          <ServiceSection 
            icon="fa-id-card-clip" 
            title="Resume Sourcing" 
            subtitle="CV Optimization"
            desc="Elite candidate profiling and formatting for top-tier global placement visibility." 
            bullets={["CV Formatting", "LinkedIn Audit", "Profile Building", "Sourcing Hub"]} 
            onCta={() => onAction('Employer')} 
            ctaLabel="Start Resume Sourcing"
          />
        </div>

        {/* Closing CTA */}
        <div className="mt-48 text-center bg-white/5 border border-white/10 p-20 rounded-[4rem] backdrop-blur-xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
           <h3 className="text-5xl font-black text-white mb-10 tracking-tight">Ready to Deploy Your <span className="text-[#64FFDA]">Nexus Team?</span></h3>
           <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 leading-relaxed">Our recruitment heads are ready to synchronize your requirements with our elite candidate pools in under 48 hours.</p>
           <button 
             onClick={() => onAction('Employer')} 
             className="bg-[#64FFDA] text-[#020617] px-20 py-8 rounded-3xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:shadow-[0_0_60px_rgba(100,255,218,0.6)] transition-all hover:-translate-y-1"
           >
             Start Sourcing Elite Talent
           </button>
        </div>
      </div>
    </div>
  );
};