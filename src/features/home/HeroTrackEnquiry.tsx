import React, { useState } from 'react';
import { Search, PackageSearch, MessageSquareText, Send, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { MOCK_DASHBOARD_DATA } from '../../data/dashboard';
import { APP_CONFIG } from '../../lib/config';

type Tab = 'track' | 'enquiry';

const ORDERS = MOCK_DASHBOARD_DATA.orders;
const STEPS = ['Booked', 'In Transit', 'Delivered'];

/** Which progress step an order status maps to. */
const stepFor = (status: string) => {
  if (status === 'Delivered' || status === 'Active') return 2;
  if (status === 'In Transit') return 1;
  return 0;
};

const SERVICE_OPTIONS = [
  'Truck booking / freight',
  'On-field leads & workforce',
  'Warehouse & terminal space',
  'HSE safety gear',
  'GELP platform & technology',
  'Something else',
];

/** Hero right-hand card: track an order, or send a quick enquiry over WhatsApp. */
export const HeroTrackEnquiry: React.FC = () => {
  const [tab, setTab] = useState<Tab>('track');

  // Track
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const match = searched
    ? ORDERS.find((o) => [o.id, o.trackingNumber].some((v) => v.toLowerCase() === query.trim().toLowerCase()))
    : undefined;

  // Enquiry
  const [form, setForm] = useState({ name: '', phone: '', service: SERVICE_OPTIONS[0], message: '' });
  const [phoneError, setPhoneError] = useState('');
  const [sent, setSent] = useState(false);

  const submitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.replace(/\D/g, '').length < 10) {
      setPhoneError('Please enter a valid mobile number.');
      return;
    }
    setPhoneError('');
    const text = [
      'Hi Chasehorse team! I have an enquiry from your website.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Looking for: ${form.service}`,
      ...(form.message ? ['', form.message] : []),
    ].join('\n');
    window.open(`https://wa.me/${APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl border border-[#E2DED5] bg-white text-sm text-[#171717] placeholder:text-[#A8A29A] outline-none focus:border-[#FF4D16] focus:ring-2 focus:ring-[#FF4D16]/15 transition';

  return (
    <div className="bg-white rounded-3xl border border-[#E2DED5] shadow-[0_24px_60px_-20px_rgba(23,23,23,0.18)] overflow-hidden">
      {/* Tabs */}
      <div role="tablist" aria-label="Track or enquire" className="grid grid-cols-2 p-1.5 m-4 mb-0 rounded-2xl bg-[#F4F1EA]">
        {([
          { id: 'track', label: 'Track', icon: PackageSearch },
          { id: 'enquiry', label: 'Enquiry', icon: MessageSquareText },
        ] as const).map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                active ? 'bg-white text-[#171717] shadow-sm' : 'text-[#625E58] hover:text-[#171717]'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-[#FF4D16]' : ''}`} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-7">
        {tab === 'track' ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">Track your shipment</h3>
              <p className="text-sm text-[#625E58]">Enter your order ID or tracking number.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearched(true);
              }}
              className="flex gap-2"
            >
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(false);
                }}
                placeholder="e.g. ORD-7741 or CH-TRK-99042"
                aria-label="Order ID or tracking number"
                className={inputCls}
                required
              />
              <button
                type="submit"
                className="shrink-0 px-4 rounded-xl bg-[#171717] hover:bg-[#FF4D16] text-white transition-colors flex items-center gap-1.5 text-sm font-bold"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Track</span>
              </button>
            </form>

            {searched && match && (
              <div className="rounded-2xl border border-[#E2DED5] bg-[#FAF8F5] p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8C877D]">
                      {match.id} · {match.trackingNumber}
                    </div>
                    <div className="mt-1 font-bold text-sm text-[#171717]">{match.category}</div>
                    <div className="text-xs text-[#625E58]">{match.items}</div>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      stepFor(match.status) === 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FFF0EB] text-[#FF4D16]'
                    }`}
                  >
                    {match.status}
                  </span>
                </div>

                {/* Progress */}
                <ol className="flex items-center">
                  {STEPS.map((step, i) => {
                    const done = i <= stepFor(match.status);
                    return (
                      <li key={step} className="flex-1 flex items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              done ? 'bg-[#FF4D16] text-white' : 'bg-white border border-[#E2DED5] text-[#C9C3B6]'
                            }`}
                          >
                            {i === 1 ? <Truck className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          </span>
                          <span className={`text-[10px] font-bold ${done ? 'text-[#171717]' : 'text-[#A8A29A]'}`}>{step}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <span className={`flex-1 h-0.5 mx-2 mb-4 rounded-full ${i < stepFor(match.status) ? 'bg-[#FF4D16]' : 'bg-[#E2DED5]'}`} />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {searched && !match && (
              <div className="rounded-2xl border border-[#FF4D16]/25 bg-[#FFF0EB] p-4 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-[#FF4D16] shrink-0" />
                <div className="text-[#625E58]">
                  We couldn&apos;t find <strong className="text-[#171717]">{query.trim()}</strong>. Check the ID, or{' '}
                  <button type="button" onClick={() => setTab('enquiry')} className="font-bold text-[#FF4D16] hover:underline">
                    send us an enquiry
                  </button>
                  .
                </div>
              </div>
            )}

            {!searched && (
              <div className="rounded-2xl border border-dashed border-[#E2DED5] p-5 text-center text-xs text-[#8C877D]">
                Live status for truck bookings, terminal space, and HSE orders.
              </div>
            )}
          </div>
        ) : sent ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF0EB] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#FF4D16]" />
            </div>
            <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">
              Thanks{form.name ? `, ${form.name.trim().split(' ')[0]}` : ''}!
            </h3>
            <p className="text-sm text-[#625E58] max-w-xs mx-auto">
              Your enquiry is ready in WhatsApp — tap <strong>Send</strong> and our team will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setForm({ name: '', phone: '', service: SERVICE_OPTIONS[0], message: '' });
              }}
              className="text-sm font-bold text-[#FF4D16] hover:underline"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={submitEnquiry} className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">Quick enquiry</h3>
              <p className="text-sm text-[#625E58]">Tell us what you need — we&apos;ll call you back.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name *"
                aria-label="Full name"
                autoComplete="name"
                className={inputCls}
              />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Mobile number *"
                aria-label="Mobile number"
                autoComplete="tel"
                className={`${inputCls} ${phoneError ? '!border-red-500' : ''}`}
              />
            </div>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              aria-label="What are you looking for?"
              className={inputCls}
            >
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Anything else? (optional)"
              aria-label="Message"
              rows={2}
              className={`${inputCls} resize-none`}
            />
            {phoneError && <p className="text-xs font-semibold text-red-600">{phoneError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FF4D16] hover:bg-[#E53E0B] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D16]/25 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
