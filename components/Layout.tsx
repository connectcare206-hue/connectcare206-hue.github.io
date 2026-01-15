
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onActionTrigger?: (type: 'Employer' | 'Candidate') => void;
}

const Logo = ({ inverted = false, size = "md" }) => {
  const isSmall = size === "sm";
  return (
    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <div className={`relative flex items-center justify-center rounded-full border-[3px] shadow-xl transition-all duration-500 group-hover:scale-105 ${inverted ? 'bg-blue-600 border-slate-700' : 'bg-blue-600 border-slate-200'} ${isSmall ? 'w-10 h-10 border-[2px]' : 'w-14 h-14'}`}>
        <div className="absolute inset-0 rounded-full border-b-[4px] border-black/20"></div>
        <div className="flex items-center gap-[2px]">
          <div className="w-1.5 h-3 bg-white rounded-sm"></div>
          <div className="w-3 h-4 bg-white rounded-md flex items-center justify-center">
            <div className="w-[1px] h-2 bg-blue-600"></div>
          </div>
          <div className="w-1.5 h-3 bg-white rounded-sm"></div>
        </div>
      </div>
      
      <div className="flex flex-col leading-tight">
        <span className={`font-extrabold tracking-tight ${isSmall ? 'text-sm' : 'text-xl'} ${inverted ? 'text-white' : 'text-slate-900'}`}>
          Connectcare <span className="text-blue-600 lowercase">services</span>
        </span>
        <span className={`italic font-bold tracking-tight ${isSmall ? 'text-[7px]' : 'text-[9px]'} ${inverted ? 'text-slate-400' : 'text-slate-500'}`}>
          Your Satisfaction, Our Commitment
        </span>
      </div>
    </div>
  );
};

const FloatingWhatsApp = () => {
  const message = encodeURIComponent("Hello, I am interested in your recruitment services.");
  return (
    <a 
      href={`https://wa.me/918460335032?text=${message}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-28 right-8 z-[100] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all animate-bounce hover:animate-none group cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp text-3xl"></i>
      <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
        Chat on WhatsApp
      </span>
    </a>
  );
}

const Header: React.FC<{ onHireClick?: () => void }> = ({ onHireClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2 border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo size={scrolled ? "sm" : "md"} />
        <nav className="hidden lg:flex items-center gap-8">
          {['About', 'Services', 'Process', 'Calculator'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={onHireClick}
            className="bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            Hire Talent
          </button>
        </nav>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-slate-900 p-2 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-90 transition-all" 
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      {/* Mobile Menu Content */}
      <div className={`lg:hidden fixed right-0 top-0 h-full w-[280px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out p-10 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-10 mt-10">
          {['About', 'Services', 'Process', 'Calculator'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())} 
              className="text-left text-sm font-black uppercase tracking-widest text-slate-900 hover:text-blue-600"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => { onHireClick?.(); setIsMobileMenuOpen(false); }}
            className="bg-blue-600 text-white w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95"
          >
            Hire Talent Now
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC<{ onAction?: (t: 'Employer' | 'Candidate') => void }> = ({ onAction }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const waMessage = encodeURIComponent("Hello, I am interested in your recruitment services.");

  return (
    <footer className="bg-slate-950 text-slate-400 py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1">
            <Logo inverted size="sm" />
            <p className="mt-8 text-sm leading-relaxed max-w-xs">
              The premier global recruitment firm specialized in contractual staffing for IT, AI, Pharma, Solar, and Real Estate. Direct talent finalization with 70% cost savings.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://linkedin.com" target="_blank" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-linkedin-in text-lg"></i></a>
              <a href="https://facebook.com" target="_blank" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-facebook-f text-lg"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px]">Staffing Hubs</h4>
            <ul className="space-y-4 text-xs font-bold">
              <li><button onClick={() => onAction?.('Employer')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">IT & AI Developers</button></li>
              <li><button onClick={() => onAction?.('Employer')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Solar & Real Estate</button></li>
              <li><button onClick={() => onAction?.('Employer')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Healthcare & Pharma</button></li>
              <li><button onClick={() => onAction?.('Employer')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Finance & Accounting</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px]">Quick Navigation</h4>
            <ul className="space-y-4 text-xs font-bold">
              <li><button onClick={() => scrollTo('about')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Our Approach</button></li>
              <li><button onClick={() => scrollTo('process')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Hiring Process</button></li>
              <li><button onClick={() => scrollTo('calculator')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Savings Estimator</button></li>
              <li><button onClick={() => onAction?.('Employer')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Post Job Requirement</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px]">Contact Us</h4>
            <ul className="space-y-6 text-xs font-bold">
              <li className="flex items-start gap-3">
                <i className="fas fa-location-dot text-blue-500 mt-1"></i> 
                Global Recruitment Hub, India
              </li>
              <li className="flex items-start gap-3">
                <a href="mailto:connectcare206@gmail.com?subject=Recruitment%20Inquiry" className="hover:text-white transition-all flex items-center gap-2 group cursor-pointer">
                  <i className="fas fa-envelope text-blue-500 group-hover:scale-110 transition-transform"></i> 
                  connectcare206@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <a href="tel:+918460335032" className="hover:text-white transition-all flex items-center gap-2 group cursor-pointer">
                  <i className="fas fa-phone text-blue-500 group-hover:scale-110 transition-transform"></i> 
                  +91 8460335032
                </a>
              </li>
              <li className="flex items-start gap-3">
                <a href={`https://wa.me/918460335032?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-all flex items-center gap-2 group cursor-pointer">
                  <i className="fab fa-whatsapp text-green-500 group-hover:scale-110 transition-transform"></i> 
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between text-[10px] font-black uppercase tracking-[0.2em]">
          <p>&copy; 2025 Connectcare Services. All rights reserved. ISO 9001:2015 Recruitment Firm.</p>
          <div className="flex gap-10">
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer uppercase">Privacy Shield</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer uppercase">Legal Terms</button>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors cursor-pointer uppercase">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onActionTrigger }) => (
  <div className="min-h-screen bg-white">
    <Header onHireClick={() => onActionTrigger?.('Employer')} />
    <main className="flex-grow">{children}</main>
    <FloatingWhatsApp />
    <Footer onAction={onActionTrigger} />
  </div>
);
