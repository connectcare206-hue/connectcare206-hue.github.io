import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from './Icons';

const WA_NUMBER = "918460335032";
const getWaLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const ServiceCard: React.FC<{
  Icon: React.FC<{ size?: number | string }>;
  title: string;
  description: string;
  roles: string[];
  waMessage: string;
  index: number;
}> = ({ Icon, title, description, roles, waMessage, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
    className="glass-card p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 flex flex-col h-full hover:border-purple-500/30 hover:bg-white/[0.02] transition-all duration-300"
  >
    {/* Icon */}
    <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-500/10 border border-purple-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-purple-400 mb-6 md:mb-8">
      <Icon size={32} />
    </div>

    {/* Title */}
    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight">{title}</h3>

    {/* Description */}
    <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8 flex-grow leading-relaxed">{description}</p>

    {/* Example Roles */}
    <div className="mb-8 md:mb-10">
      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Example Roles</p>
      <ul className="space-y-2 md:space-y-2.5">
        {roles.map((role, i) => (
          <li key={i} className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
            <span>{role}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* CTA Button */}
    <button
      onClick={() => window.open(getWaLink(waMessage), '_blank')}
      className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-300 py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.1em] hover:bg-purple-600/40 hover:border-purple-500/50 hover:text-purple-200 transition-all duration-300"
    >
      Learn More
    </button>
  </motion.div>
);

export const HomepageServices: React.FC = () => {
  const services = [
    {
      Icon: Icons.IconIT,
      title: "IT & AI Staffing",
      description: "Elite software engineers, AI researchers, and cloud specialists trained for innovation-driven organizations worldwide.",
      roles: ["Full Stack Developers", "AI/ML Engineers", "DevOps Specialists", "Data Engineers"],
      waMessage: "Hi Connectcare, I'm interested in IT & AI staffing services."
    },
    {
      Icon: Icons.IconFinance,
      title: "Accounting & Finance Staffing",
      description: "Expert CPAs, bookkeepers, and financial analysts to scale your back-office operations at 50% lower costs.",
      roles: ["CPA Professionals", "Bookkeepers", "Tax Specialists", "Financial Analysts"],
      waMessage: "Hi Connectcare, I want accounting and finance staffing solutions."
    },
    {
      Icon: Icons.IconSupport,
      title: "Sales & Customer Support",
      description: "Premium customer service agents and sales representatives with high English proficiency for global markets.",
      roles: ["Customer Service Reps", "Sales Development Reps", "Support Agents", "Client Success Managers"],
      waMessage: "Hi Connectcare, I'm interested in sales and customer support talent."
    },
    {
      Icon: Icons.IconEnergy,
      title: "Solar & Energy Staffing",
      description: "Technical talent specialized in renewable energy, engineering design, and field project coordination.",
      roles: ["Solar Engineers", "Project Coordinators", "Grid Specialists", "Safety Officers"],
      waMessage: "Hi Connectcare, I'm interested in solar and energy technical staffing."
    },
    {
      Icon: Icons.IconRealEstate,
      title: "Real Estate & Property Management",
      description: "Virtual property managers and administrative professionals for large-scale global real estate portfolios.",
      roles: ["Property Managers", "Lease Administrators", "Asset Managers", "CRM Specialists"],
      waMessage: "Hi Connectcare, I'm interested in real estate and property management staffing."
    },
    {
      Icon: Icons.IconScience,
      title: "Healthcare & Medical Back-office",
      description: "Specialized healthcare professionals and medical administrative staff for compliance-focused organizations.",
      roles: ["Medical Coders", "Healthcare Admin", "Compliance Officers", "Patient Support Specialists"],
      waMessage: "Hi Connectcare, I'm interested in healthcare and medical back-office staffing."
    },
    {
      Icon: Icons.IconHR,
      title: "Housekeeping & Facility Staffing",
      description: "Professional cleaning and facility management staff for commercial properties, hospitality, and corporate offices.",
      roles: ["Cleaning Supervisors", "Facility Managers", "Maintenance Technicians", "Housekeeping Staff"],
      waMessage: "Hi Connectcare, I'm interested in housekeeping and facility staffing services."
    },
    {
      Icon: Icons.IconContract,
      title: "RPO & Contract Staffing",
      description: "Flexible workforce solutions for project-based needs with zero internal HR liability and rapid deployment.",
      roles: ["Contract Professionals", "RPO Coordinators", "Temporary Specialists", "Gig Workers"],
      waMessage: "Hi Connectcare, I'm interested in RPO and contract staffing solutions."
    }
  ];

  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 md:mb-8"
          >
            <span className="text-[8px] md:text-[9px] font-bold text-purple-300 uppercase tracking-[0.3em]">Staffing Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight"
          >
            Our Staffing Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Global Staffing Solutions Built Around Your Business
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              index={idx}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
