import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { Service, TierMeta } from './types';

import { APP_CONFIG } from '../../lib/config';

const BLUEPRINT_WHATSAPP_NUMBER = APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER;

interface BlueprintRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Service[];
  tiers: TierMeta[];
}

interface ContactDetails {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
}

const EMPTY: ContactDetails = { name: '', company: '', phone: '', email: '', city: '', notes: '' };

/** Builds the WhatsApp message: contact details followed by the selected services grouped by tier. */
export const buildBlueprintMessage = (details: ContactDetails, services: Service[], tiers: TierMeta[]) => {
  const lines: string[] = [
    'Hi Chasehorse team! I have designed my solution on your website and would like to discuss it.',
    '',
    '*Contact details*',
    `Name: ${details.name}`,
  ];
  if (details.company) lines.push(`Company: ${details.company}`);
  lines.push(`Phone: ${details.phone}`);
  if (details.email) lines.push(`Email: ${details.email}`);
  if (details.city) lines.push(`City: ${details.city}`);
  lines.push('', `*My Solution Blueprint (${services.length} services)*`);

  tiers.forEach((tier) => {
    const inTier = services.filter((s) => s.tier === tier.id);
    if (inTier.length === 0) return;
    lines.push('', `${tier.title}:`);
    inTier.forEach((s) => lines.push(`• ${s.name} (${s.group})`));
  });

  if (details.notes) lines.push('', `*Notes*`, details.notes);
  return lines.join('\n');
};

export const BlueprintRequestModal: React.FC<BlueprintRequestModalProps> = ({ isOpen, onClose, selectedServices, tiers }) => {
  const reduceMotion = useReducedMotion();
  const [details, setDetails] = useState<ContactDetails>(EMPTY);
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const set = (key: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }));

  const close = () => {
    onClose();
    // Reset after the modal has closed so the thank-you screen doesn't flash back to the form
    setTimeout(() => {
      setSent(false);
      setPhoneError('');
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = details.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setPhoneError('Please enter a valid mobile number (at least 10 digits).');
      return;
    }
    setPhoneError('');
    const text = buildBlueprintMessage(details, selectedServices, tiers);
    window.open(`https://wa.me/${BLUEPRINT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const firstName = details.name.trim().split(' ')[0];
  const inputCls = 'w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 transition-shadow';
  const inputStyle: React.CSSProperties = { background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' };

  // Rendered at the top level of the page so the overlay covers everything, including the navbar
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blueprint-modal-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl"
            style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5 transition-colors"
              style={{ color: 'var(--mut)' }}
            >
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                {/* Appreciation message */}
                <div className="space-y-3 pr-8">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ background: 'var(--soft)', color: 'var(--acc)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedServices.length} service{selectedServices.length === 1 ? '' : 's'} in your blueprint
                  </div>
                  <h2 id="blueprint-modal-title" className="text-2xl font-extrabold tracking-tight leading-tight">
                    Great choices — let&apos;s bring your solution to life!
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mut)' }}>
                    We truly appreciate you taking the time to design your logistics solution with Chasehorse. Share your
                    details and our solutions team will reach out with a plan tailored to your operations.
                  </p>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="space-y-1 text-xs font-bold">
                    <span>Full Name *</span>
                    <input required value={details.name} onChange={set('name')} placeholder="e.g. Anand Verma" className={inputCls} style={inputStyle} autoComplete="name" />
                  </label>
                  <label className="space-y-1 text-xs font-bold">
                    <span>Company</span>
                    <input value={details.company} onChange={set('company')} placeholder="e.g. Tata Autocomp" className={inputCls} style={inputStyle} autoComplete="organization" />
                  </label>
                  <label className="space-y-1 text-xs font-bold">
                    <span>Mobile Number *</span>
                    <input
                      required
                      type="tel"
                      value={details.phone}
                      onChange={set('phone')}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                      style={{ ...inputStyle, borderColor: phoneError ? '#DC2626' : inputStyle.borderColor }}
                      autoComplete="tel"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-bold">
                    <span>Email</span>
                    <input type="email" value={details.email} onChange={set('email')} placeholder="name@company.com" className={inputCls} style={inputStyle} autoComplete="email" />
                  </label>
                  <label className="space-y-1 text-xs font-bold sm:col-span-2">
                    <span>City</span>
                    <input value={details.city} onChange={set('city')} placeholder="e.g. Bengaluru" className={inputCls} style={inputStyle} autoComplete="address-level2" />
                  </label>
                  <label className="space-y-1 text-xs font-bold sm:col-span-2">
                    <span>Anything we should know? (optional)</span>
                    <textarea
                      value={details.notes}
                      onChange={set('notes')}
                      rows={2}
                      placeholder="Sites, volumes, timelines…"
                      className={`${inputCls} resize-none`}
                      style={inputStyle}
                    />
                  </label>
                </div>
                {phoneError && <p className="text-xs font-semibold text-red-600">{phoneError}</p>}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all"
                  style={{ backgroundColor: 'var(--acc)', boxShadow: 'var(--glow)' }}
                >
                  <Send className="w-4 h-4" />
                  Send My Blueprint
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-center" style={{ color: 'var(--mut)' }}>
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  Opens WhatsApp with your blueprint ready — just tap Send.
                </p>
              </form>
            ) : (
              <div className="p-8 sm:p-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'var(--soft)' }}>
                  <CheckCircle2 className="w-9 h-9" style={{ color: 'var(--acc)' }} />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Thank you{firstName ? `, ${firstName}` : ''}! We appreciate your trust.
                </h2>
                <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--mut)' }}>
                  Your solution blueprint is ready in WhatsApp. Tap <strong>Send</strong> there and our team will get back to
                  you shortly to shape it into a plan that moves your business forward.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white"
                  style={{ backgroundColor: 'var(--acc)' }}
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
