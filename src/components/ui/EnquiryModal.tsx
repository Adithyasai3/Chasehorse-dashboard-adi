import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  title?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  title = 'Schedule an Operations Consultation',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    serviceNeeded: defaultService || 'General GELP Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
    
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2DED5] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E2DED5] flex items-center justify-between bg-[#FAF8F5]">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF4D16] block">
                ● ENTERPRISE INQUIRY
              </span>
              <h3 className="font-bold text-lg text-[#171717]">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#625E58] hover:text-[#171717] hover:bg-[#E2DED5]/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-[#171717]">
                  Consultation Request Logged!
                </h4>
                <p className="text-xs text-[#625E58]">
                  Reference ID: <span className="font-mono font-bold text-[#171717]">{ticketId}</span>
                </p>
              </div>

              <div className="p-4 bg-[#F4F1EA] rounded-xl text-xs text-[#625E58] text-left space-y-1 border border-[#E2DED5]">
                <p><strong>Service:</strong> {formData.serviceNeeded}</p>
                <p><strong>Company:</strong> {formData.company || 'Enterprise'}</p>
                <p><strong>Contact:</strong> {formData.email || formData.phone}</p>
                <p className="pt-1 text-[11px] text-[#8C877D]">
                  Our zonal operations lead will reach out via WhatsApp / Email within 2 business hours.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20just%20submitted%20consultation%20request%20${ticketId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow Up on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-[#171717] text-white text-xs font-bold rounded-xl hover:bg-[#FF4D16] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Verma"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Tata Autocomp"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Preferred Operating Hub</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  >
                    <option value="Bengaluru">Bengaluru (HQ & South)</option>
                    <option value="New Delhi">New Delhi / NCR</option>
                    <option value="Mumbai">Mumbai / Nhava Sheva</option>
                    <option value="Chennai">Chennai Industrial Corridor</option>
                    <option value="Kolkata">Kolkata / Eastern Gateway</option>
                    <option value="Hyderabad">Hyderabad / Central Corridor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#171717]">Primary Service Area</label>
                  <input
                    type="text"
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    placeholder="e.g. CH Deploy, TMS, 8D Root Cause"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717]">Operational Requirements (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your facility locations, shipment volumes, or specific pain points..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm shadow-md flex items-center justify-center space-x-2"
              >
                <span>Request Operations Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#8C877D] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Zero spam • Official NDA protection available upon request</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

