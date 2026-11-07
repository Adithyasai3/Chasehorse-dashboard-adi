import React, { useState } from 'react';
import { PhoneCall, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubPageShell } from '../../components/layout/SubPageShell';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { APP_CONFIG } from '../../lib/config';

/** HSE Shop › Offline Store › Request a Callback — opens the existing request form on arrival. */
export const RequestCallbackPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(true);

  return (
    <SubPageShell
      navId="hse-shop"
      eyebrow="Offline Store"
      title="Request a Callback"
      intro="Share your details and our HSE store team will call you back about safety gear, bulk orders, or visiting an offline store."
      actions={
        <button
          onClick={() => setFormOpen(true)}
          className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm inline-flex items-center gap-2 shadow-lg"
        >
          <PhoneCall className="w-4 h-4" /> Request a Callback
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-[#171717]">Prefer to call us?</h4>
          <p className="text-sm text-[#625E58]">Reach the HSE store desk directly.</p>
          <a href={`tel:${APP_CONFIG.SUPPORT_PHONE.replace(/[^\d+]/g, '')}`} className="block font-bold text-[#171717] hover:text-[#FF4D16]">
            {APP_CONFIG.SUPPORT_PHONE}
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-[#171717]">Visit an offline store</h4>
          <p className="text-sm text-[#625E58]">See certified gear in person at a store near your hub.</p>
          <Link to="/hse-shop/offline-stores" className="inline-block text-sm font-bold text-[#171717] hover:text-[#FF4D16]">
            Find Offline Store →
          </Link>
        </div>
      </div>

      <EnquiryModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Request a Callback"
        defaultService="HSE Shop — Callback Request"
      />
    </SubPageShell>
  );
};
