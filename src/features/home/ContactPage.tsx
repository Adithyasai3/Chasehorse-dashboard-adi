import React, { useState } from 'react';
import { INDIA_LOCATIONS } from '../../data/locations';
import { APP_CONFIG, getWhatsAppUrl } from '../../lib/config';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    hub: 'Bengaluru',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
            <span>LET&apos;S CONNECT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Contact Chasehorse
          </h1>
          <p className="text-sm text-[#625E58] max-w-2xl">
            Get in touch with our enterprise solutions team or connect with our 6 regional metro operational command centers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">Message Received!</h3>
                <p className="text-xs text-[#625E58] max-w-md mx-auto">
                  Thank you for connecting with Chasehorse. Our enterprise desk in {formData.hub} will get in touch within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#171717] text-white rounded-xl text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-bold text-base text-[#171717] pb-2 border-b border-[#E2DED5]">
                  Send an Operational Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#171717]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#171717]">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Mahindra Logistics"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#171717]">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#171717]">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#171717]">Nearest Service Hub</label>
                  <select
                    value={formData.hub}
                    onChange={(e) => setFormData({ ...formData, hub: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                  >
                    {INDIA_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#171717]">Operational Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on dispatch volume, dock locations, or service tier interest..."
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Quick Connect & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-base text-[#171717]">Direct Support Channels</h3>
              
              <div className="space-y-3 text-xs">
                <a
                  href={getWhatsAppUrl('Hi Chasehorse, I would like to speak with an operations specialist')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] hover:border-[#25D366] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#171717] block">WhatsApp Operations Desk</span>
                      <span className="text-[11px] text-[#625E58]">Instant response for spot requests</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C877D] group-hover:translate-x-1 group-hover:text-[#25D366] transition-all" />
                </a>

                <a
                  href={`tel:${APP_CONFIG.SUPPORT_PHONE.replace(/[^\d+]/g, '')}`}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] hover:border-[#171717] transition-colors flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#FF4D16]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#171717] block">{APP_CONFIG.SUPPORT_PHONE}</span>
                    <span className="text-[11px] text-[#625E58]">Central Operations Hotline</span>
                  </div>
                </a>

                <a
                  href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] hover:border-[#171717] transition-colors flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#FF4D16]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-[#171717] block break-all">{APP_CONFIG.SUPPORT_EMAIL}</span>
                    <span className="text-[11px] text-[#625E58]">Corporate Inquiry Desk</span>
                  </div>
                </a>
              </div>
            </div>

            {/* HQ Address Card */}
            <div className="bg-[#171717] rounded-3xl text-white p-6 border border-white/10 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-[#FF4D16] uppercase font-bold">
                HEADQUARTERS COMMAND
              </span>
              <h4 className="font-bold text-sm text-white">Chasehorse Technologies Pvt Ltd</h4>
              <p className="text-[#E2DED5]/80 leading-relaxed">
                Tech & Ops Tower, Hosur Road Logistics Hub, Bengaluru, Karnataka 560100
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

