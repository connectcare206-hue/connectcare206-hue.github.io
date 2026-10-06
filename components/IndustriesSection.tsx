import React from 'react';

const industries = [
  { name: 'Technology & IT', description: 'Build and support software, infrastructure and digital products.', roles: ['Software developers', 'QA testers', 'Cloud engineers', 'IT support analysts'] },
  { name: 'Accounting & Finance', description: 'Add capacity to accounting, reporting and finance operations.', roles: ['Bookkeepers', 'Accounts payable clerks', 'Accounts receivable clerks', 'Payroll assistants'] },
  { name: 'Solar & Renewable Energy', description: 'Support renewable energy sales, project administration and operations.', roles: ['Solar designers', 'Sales coordinators', 'Project administrators', 'Customer support agents'] },
  { name: 'Healthcare', description: 'Staff administrative and back-office work for healthcare providers.', roles: ['Medical billing staff', 'Claims processors', 'Patient coordinators', 'Medical records assistants'] },
  { name: 'Real Estate & Property Management', description: 'Keep leasing, property administration and resident support moving.', roles: ['Leasing coordinators', 'Property administrators', 'Maintenance schedulers', 'Resident support agents'] },
  { name: 'Hospitality & Facility Management', description: 'Fill on-site hospitality and cleaning roles, with remote administrative support.', roles: ['Housekeeping staff (on-site)', 'Commercial cleaners (on-site)', 'Facility coordinators', 'Hotel support staff'] },
  { name: 'Pharma & Life Sciences', description: 'Support regulated operations, research administration and safety teams.', roles: ['Regulatory affairs assistants', 'Pharmacovigilance associates', 'Clinical data coordinators', 'Research assistants'] },
  { name: 'Logistics & Transportation', description: 'Support shipment coordination, customer service and transport operations.', roles: ['Dispatch coordinators', 'Logistics analysts', 'Freight documentation clerks', 'Customer service agents'] },
  { name: 'Professional Services', description: 'Give consulting and specialist firms dependable operational support.', roles: ['Executive assistants', 'Research analysts', 'Project coordinators', 'Client service associates'] },
];

export const IndustriesSection: React.FC = () => (
  <section id="industries" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="industries-heading">
    <div className="container mx-auto px-6">
      <header className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <p className="text-purple-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Industries We Support</p>
        <h2 id="industries-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight mb-5">Staffing for the work your industry needs</h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">ConnectCare supports Australian and global businesses with remote staffing from India and on-site staffing where the work requires a physical presence.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {industries.map((industry) => (
          <article key={industry.name} className="glass-card rounded-3xl border border-white/5 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">{industry.name}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{industry.description}</p>
            <ul className="space-y-2" aria-label={`${industry.name} staffing roles`}>
              {industry.roles.map((role) => <li key={role} className="flex gap-2 text-xs md:text-sm text-slate-300"><span aria-hidden="true" className="text-purple-400">•</span><span>{role}</span></li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
