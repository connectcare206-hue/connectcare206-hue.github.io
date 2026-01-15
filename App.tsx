
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AICostCalculator } from './components/AICostCalculator';
import { VoiceAgent } from './components/VoiceAgent';
import { InquiryAssistant } from './components/InquiryAssistant';
import { SERVICES, PRICING_PLANS, PROCESS_STEPS } from './constants';
import { InquiryType } from './types';

const App: React.FC = () => {
  const [activeInquiryTrigger, setActiveInquiryTrigger] = useState<{ type: InquiryType, key: number } | null>(null);

  const handleHeroAction = (type: InquiryType) => {
    setActiveInquiryTrigger({ type, key: Date.now() });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout onActionTrigger={handleHeroAction}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-mesh">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                Global Recruitment Partner & Offshore Hub
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1] tracking-tight mb-8">
                Global Talent.<br />
                <span className="text-blue-600">Local Costs.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium">
                Helping companies in <strong className="text-slate-900">USA, UK, Canada & AU</strong> hire pre-screened professionals at 70% lower costs. You interview, you select, we deliver.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group text-left border border-white/5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-xl mb-2 uppercase tracking-tight">For Employers</h3>
                    <p className="text-xs text-slate-400 mb-8 leading-relaxed">Scale your IT, AI, or Sales teams in 48 hours with pre-screened talent.</p>
                  </div>
                  <button 
                    onClick={() => handleHeroAction('Employer')}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    Hire Elite Talent
                  </button>
                </div>
                <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl group text-left flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-xl mb-2 text-slate-900 uppercase tracking-tight">For Candidates</h3>
                    <p className="text-xs text-slate-500 mb-8 leading-relaxed">Join top-tier firms in USA, UK, and Australia. Global career starts here.</p>
                  </div>
                  <button 
                    onClick={() => handleHeroAction('Candidate')}
                    className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Submit Resume
                  </button>
                </div>
              </div>

              <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2"><i className="fas fa-certificate text-blue-600"></i> <span className="text-[10px] font-bold uppercase tracking-widest">ISO 9001 Certified</span></div>
                <div className="flex items-center gap-2"><i className="fas fa-shield-halved text-blue-600"></i> <span className="text-[10px] font-bold uppercase tracking-widest">GDPR Compliant</span></div>
                <div className="flex items-center gap-2"><i className="fas fa-check-double text-blue-600"></i> <span className="text-[10px] font-bold uppercase tracking-widest">Vetted 500k+ Database</span></div>
              </div>
            </div>
            
            <div className="lg:w-2/5 hidden lg:block">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Recruitment Consultant" className="rounded-[4rem] shadow-3xl grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-3xl border border-slate-100 animate-bounce-slow">
                  <p className="text-5xl font-black text-blue-600 mb-1">48h</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Sourcing Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-6">Expert Recruitment Partner</h2>
              <h3 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Scale Without the Margins.</h3>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Connectcare Services is not an outsourcing firm. We are your **Offshore Recruitment Hub**. 
                You get full control over candidates, while we handle the sourcing, screening, and logistics in India. 
                Perfect for firms in the **USA, UK, Canada, and Australia** looking to optimize for profit.
              </p>
              <div className="flex gap-12">
                 <div>
                    <p className="text-4xl font-black text-slate-900 mb-2">500k+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Talent Database</p>
                 </div>
                 <div>
                    <p className="text-4xl font-black text-slate-900 mb-2">40%+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Client Growth</p>
                 </div>
              </div>
              <button 
                onClick={() => handleHeroAction('Employer')}
                className="mt-12 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-2xl flex items-center gap-3"
              >
                Learn About Our Model <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
               <div className="p-8 bg-slate-50 rounded-[3rem] text-center border border-slate-100 hover:shadow-xl transition-shadow cursor-default group">
                  <i className="fas fa-users-viewfinder text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">Pre-Screened</h4>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] text-center border border-slate-100 mt-12 hover:shadow-xl transition-shadow cursor-default group">
                  <i className="fas fa-dollar-sign text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">Cost Effective</h4>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] text-center border border-slate-100 -mt-12 hover:shadow-xl transition-shadow cursor-default group">
                  <i className="fas fa-hand-holding-heart text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">High Retention</h4>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] text-center border border-slate-100 hover:shadow-xl transition-shadow cursor-default group">
                  <i className="fas fa-microchip text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                  <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">AI Enabled</h4>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-6">Our Solutions</h2>
            <h3 className="text-5xl font-black mb-8">Specialized Hiring Channels.</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(SERVICES).map(([key, service], idx) => (
              <article key={idx} className="bg-slate-800/50 border border-white/5 p-12 rounded-[3.5rem] hover:border-blue-600 transition-all duration-500 group flex flex-col justify-between h-full">
                <div>
                  <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className={`fas ${service.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-2xl font-black mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">{service.description}</p>
                  <div className="space-y-3 mb-10">
                    {service.roles.slice(0, 3).map((role, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => handleHeroAction('Employer')}
                  className="w-full bg-white/5 hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-white/10 hover:border-blue-600"
                >
                  Hire This Talent
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AICostCalculator onSavingsClaimed={() => handleHeroAction('Employer')} />
      <VoiceAgent />
      
      <section id="contact" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-5xl font-black text-slate-900 mb-8 leading-none">Ready to hire? <br />Or ready to be hired?</h3>
              <p className="text-xl text-slate-500 mb-12 font-medium">Use our Intelligent Inquiry Assistant to get started. Our AI will analyze your requirement and route you to the right department instantly.</p>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-slate-900 font-bold group">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <i className="fas fa-check"></i>
                    </div>
                    No Upfront Sourcing Fees
                 </div>
                 <div className="flex items-center gap-4 text-slate-900 font-bold group">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <i className="fas fa-shield-check"></i>
                    </div>
                    Global Compliance Management
                 </div>
                 <div className="flex items-center gap-4 text-slate-900 font-bold group">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    Dedicated Client Manager
                 </div>
              </div>
              <div className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl">
                 <p className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Direct Support</p>
                 <a href="tel:+918460335032" className="text-3xl font-black hover:text-blue-100 transition-colors block mb-2">+91 8460335032</a>
                 <a href="mailto:connectcare206@gmail.com" className="text-lg font-bold opacity-90 hover:opacity-100 underline decoration-blue-300">connectcare206@gmail.com</a>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <InquiryAssistant externalTypeTrigger={activeInquiryTrigger?.type} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
