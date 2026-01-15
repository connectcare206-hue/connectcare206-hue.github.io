
import React, { useState, useEffect } from 'react';
import { InquiryType, InquiryData } from '../types';
import { classifyInquiryIntent } from '../services/geminiService';

interface InquiryAssistantProps {
  externalTypeTrigger?: InquiryType | null;
}

export const InquiryAssistant: React.FC<InquiryAssistantProps> = ({ externalTypeTrigger }) => {
  const [step, setStep] = useState<'INITIAL' | 'COLLECT' | 'SUCCESS'>('INITIAL');
  const [type, setType] = useState<InquiryType | null>(null);
  const [formData, setFormData] = useState<Partial<InquiryData>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Listen for external triggers from Hero buttons
  useEffect(() => {
    if (externalTypeTrigger) {
      setType(externalTypeTrigger);
      setStep('COLLECT');
      setFormData({}); // Clear previous data
      setErrors([]);
    }
  }, [externalTypeTrigger]);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = (e.target as any).message.value;
    if (!message || message.trim().length < 5) {
      setErrors(['Please provide a descriptive message for our AI to analyze.']);
      return;
    }

    setErrors([]);
    setLoading(true);
    const classification = await classifyInquiryIntent(message);
    setType(classification.intent as InquiryType);
    setFormData(prev => ({ ...prev, details: message }));
    setLoading(false);
    setStep('COLLECT');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    const currentErrors = [];
    if (!formData.name || formData.name.trim().length < 2) currentErrors.push('Valid full name is required.');
    if (!formData.contact || formData.contact.trim().length < 5) currentErrors.push('Valid contact details are required.');
    if (type === 'Employer' && (!formData.company || formData.company.trim().length < 2)) {
      currentErrors.push('Company name is required for Employer inquiries.');
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors([]);
    setLoading(true);

    // Simulate submission and notifications
    setTimeout(() => {
      const waMessage = `📩 New Website Inquiry\n\nType: ${type}\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nMessage/Requirement: ${formData.details || 'Direct Contact'}\nContact: ${formData.contact}\nSource: Website`;
      
      // LOGS represent the simulated instant notifications
      console.log("Email Notification Triggered for:", formData.contact);
      console.log("WhatsApp Admin Alert Triggered:", waMessage);
      
      setLoading(false);
      setStep('SUCCESS');
    }, 1200);
  };

  if (step === 'SUCCESS') {
    return (
      <div className="bg-white rounded-[3rem] p-12 text-center shadow-3xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="fas fa-check text-3xl"></i>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Inquiry Received!</h3>
        <p className="text-lg text-slate-500 font-medium mb-2">Thank you for contacting Connectcare Services.</p>
        <p className="text-sm text-slate-400">Our team has been notified and will get back to you shortly.</p>
        
        <div className="mt-10 flex flex-col gap-4">
          <button 
            onClick={() => { setStep('INITIAL'); setFormData({}); setType(null); setErrors([]); }}
            className="w-full bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 text-xs"
          >
            Submit Another Request
          </button>
          <a 
            href={`https://wa.me/918460335032?text=${encodeURIComponent("I just submitted a website inquiry regarding recruitment services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-green-600 transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            Follow up on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-3xl border border-slate-100 relative overflow-hidden">
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
          {errors.map((err, i) => (
            <p key={i} className="text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {err}
            </p>
          ))}
        </div>
      )}

      {step === 'INITIAL' && (
        <div className="animate-in slide-in-from-right-10 duration-500">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
              <i className="fas fa-robot text-xl"></i>
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900">AI Inquiry Assistant</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Intent Detection Active</p>
            </div>
          </div>
          <form onSubmit={handleInitialSubmit} className="space-y-6">
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-2">How can we help you today?</span>
              <textarea 
                name="message"
                required
                placeholder="e.g., I'm looking to hire a team of 5 React developers... or I want to apply for a Senior QA role."
                className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-6 focus:ring-2 ring-blue-600 font-bold min-h-[160px] text-slate-900 placeholder:text-slate-300"
              ></textarea>
            </label>
            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
              Analyze My Inquiry
            </button>
          </form>
        </div>
      )}

      {step === 'COLLECT' && (
        <div className="animate-in slide-in-from-right-10 duration-500">
          <div className="mb-8 pb-6 border-b border-slate-100 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
                {externalTypeTrigger ? 'Direct Selection' : 'AI Detected Intent'}
              </p>
              <h4 className="text-2xl font-black text-slate-900">{type} Inquiry</h4>
            </div>
            <button onClick={() => setStep('INITIAL')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
              Restart
            </button>
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input 
                  type="text" required
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 ring-blue-600 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contact (Email/Phone)</label>
                <input 
                  type="text" required
                  value={formData.contact || ''}
                  onChange={e => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="john@example.com" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 ring-blue-600 font-bold" 
                />
              </div>
            </div>

            {type === 'Employer' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Company Name</label>
                <input 
                  type="text" required
                  value={formData.company || ''}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nexus Tech Solutions" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 ring-blue-600 font-bold" 
                />
              </div>
            )}

            {type === 'Candidate' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Primary Skillset</label>
                  <input 
                    type="text" required
                    placeholder="e.g., Full Stack Developer" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 ring-blue-600 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Years of Experience</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 ring-blue-600 font-bold text-slate-500">
                    <option>0-1 Years</option>
                    <option>1-3 Years</option>
                    <option>3-7 Years</option>
                    <option>7+ Years</option>
                  </select>
                </div>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-check-circle"></i>}
              {loading ? 'Processing...' : 'Confirm Submission'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
