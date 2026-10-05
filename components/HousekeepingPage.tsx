import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from './Icons';

const WA_NUMBER = "918460335032";
const getWaLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

interface RoleCardProps {
  title: string;
  roles: string[];
  type: 'onsite' | 'remote';
  description: string;
  index: number;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, roles, type, description, index }) => {
  const isOnsite = type === 'onsite';
  const borderColor = isOnsite ? 'border-amber-500/30' : 'border-cyan-500/30';
  const bgColor = isOnsite ? 'bg-amber-500/5' : 'bg-cyan-500/5';
  const accentColor = isOnsite ? 'text-amber-400' : 'text-cyan-400';
  const dotColor = isOnsite ? 'bg-amber-400' : 'bg-cyan-400';
  const labelBg = isOnsite ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  const labelBorder = isOnsite ? 'border-amber-500/20' : 'border-cyan-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className={`glass-card p-8 md:p-10 rounded-2xl md:rounded-3xl border ${borderColor} ${bgColor} flex flex-col h-full hover:border-opacity-50 transition-all duration-300`}
    >
      {/* Type Badge */}
      <div className={`inline-flex items-center gap-2 ${labelBg} border ${labelBorder} rounded-full px-4 py-2 mb-6 w-fit`}>
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] ${accentColor}`}>
          {isOnsite ? 'On-Site' : 'Remote/Back-Office'}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight ${accentColor}`}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed">
        {description}
      </p>

      {/* Roles List */}
      <div className="flex-grow mb-8">
        <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
          {isOnsite ? 'On-Site Roles' : 'Remote Roles'}
        </p>
        <ul className="space-y-2.5">
          {roles.map((role, i) => (
            <li key={i} className="flex items-center gap-3 text-sm md:text-base text-slate-300">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`}></div>
              <span>{role}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => window.open(getWaLink(`Hi Connectcare, I'm interested in ${title} staffing.`), '_blank')}
        className={`w-full border-2 ${borderColor} text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.16em] hover:${bgColor} transition-all duration-300`}
      >
        Request Candidates
      </button>
    </motion.div>
  );
};

export const HousekeepingPage: React.FC = () => {
  const onsiteRoles = [
    {
      title: "Housekeeping Staff",
      roles: [
        "Housekeeping Associates",
        "Room Attendants",
        "Hotel Housekeepers",
        "Cleaning Technicians"
      ],
      description: "Professional on-site housekeeping teams trained in hospitality standards, attention to detail, and guest satisfaction."
    },
    {
      title: "Commercial Cleaners",
      roles: [
        "Commercial Cleaners",
        "Office Maintenance Staff",
        "Building Cleaners",
        "Sanitization Specialists"
      ],
      description: "Skilled cleaners for offices, retail spaces, and commercial properties. OSHA-trained and equipped with modern techniques."
    },
    {
      title: "Housekeeping Supervisors",
      roles: [
        "Housekeeping Managers",
        "Cleaning Supervisors",
        "Team Leads",
        "Quality Inspectors"
      ],
      description: "Experienced supervisors to lead housekeeping teams, manage schedules, and ensure quality standards across properties."
    },
    {
      title: "Hotel Support Staff",
      roles: [
        "Hotel Attendants",
        "Bellhops & Porters",
        "Laundry Attendants",
        "Property Support Staff"
      ],
      description: "Full-service hospitality support for hotels, resorts, and luxury properties. Guest-facing and behind-the-scenes roles."
    },
    {
      title: "Facility Coordinators",
      roles: [
        "Facility Managers",
        "Building Coordinators",
        "Maintenance Technicians",
        "Grounds Staff"
      ],
      description: "On-site facility professionals managing daily operations, maintenance requests, and vendor coordination."
    },
    {
      title: "Property Cleaning Teams",
      roles: [
        "Property Cleaning Crews",
        "Carpet & Upholstery Cleaners",
        "Post-Construction Cleaners",
        "Window Cleaning Specialists"
      ],
      description: "Specialized teams for specialized cleaning projects, post-renovation work, and deep cleaning operations."
    }
  ];

  const remoteRoles = [
    {
      title: "Housekeeping Back-Office Support",
      roles: [
        "Scheduling Coordinators",
        "Cleaning Operations Managers",
        "Compliance Officers",
        "Data Entry Specialists"
      ],
      description: "Remote administrative and operational support for housekeeping teams. Manage schedules, track compliance, and coordinate logistics."
    },
    {
      title: "Facility Support Services",
      roles: [
        "Facility Planning Specialists",
        "Vendor Managers",
        "Maintenance Coordinators",
        "Quality Assurance Reviewers"
      ],
      description: "Remote support roles for facility operations. Coordinate vendor contracts, process maintenance requests, and ensure standards."
    }
  ];

  return (
    <div className="pt-32 md:pt-48 pb-20 md:pb-32 w-full overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
          >
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Staffing Solution</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter"
          >
            Housekeeping & Facility Staffing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            ConnectCare provides staffing solutions for hospitality, commercial properties, residential communities and facility operations.
          </motion.p>
        </div>

        {/* On-Site Roles Section */}
        <div className="mb-24 md:mb-32">
          <div className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-[10px] md:text-[11px] font-bold text-amber-300 uppercase tracking-[0.2em]">On-Site / Physical Roles</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight"
            >
              Physical Property & Hospitality Staffing
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {onsiteRoles.map((role, idx) => (
              <RoleCard
                key={idx}
                index={idx}
                title={role.title}
                roles={role.roles}
                type="onsite"
                description={role.description}
              />
            ))}
          </div>
        </div>

        {/* Remote Roles Section */}
        <div className="mb-24 md:mb-32">
          <div className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-[10px] md:text-[11px] font-bold text-cyan-300 uppercase tracking-[0.2em]">Remote / Back-Office</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight"
            >
              Remote Operations & Support
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {remoteRoles.map((role, idx) => (
              <RoleCard
                key={idx}
                index={idx}
                title={role.title}
                roles={role.roles}
                type="remote"
                description={role.description}
              />
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 md:mt-24 text-center bg-white/5 border border-white/10 p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] backdrop-blur-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight">
            Ready to Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Housekeeping & Facility Team?</span>
          </h3>
          <p className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed font-light">
            Whether you need on-site staff for properties or remote support for operations, ConnectCare delivers reliable, trained professionals.
          </p>
          <button
            onClick={() => window.open(getWaLink("Hi Connectcare, I'd like to discuss housekeeping and facility staffing for my properties."), '_blank')}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-cyan-500 text-white px-8 py-5 md:px-20 md:py-8 rounded-2xl md:rounded-3xl font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all duration-300 text-[11px] md:text-[12px]"
          >
            Get Staffing Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
};
