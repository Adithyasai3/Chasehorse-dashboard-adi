import React, { useState } from 'react';
import {
  Search,
  PackageSearch,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle,
  Truck,
  Warehouse,
  Undo2,
  Users,
  Cpu,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { MOCK_DASHBOARD_DATA } from '../../data/dashboard';
import { APP_CONFIG } from '../../lib/config';
import {
  enquiryService,
  generateReferenceId,
  REQUEST_STATUSES,
  type ServiceRequestRecord,
} from '../../services';

type Tab = 'live' | 'track';

/** The five headline categories shown in the widget. The full 17-service catalogue stays on the main site. */
const LIVE_SERVICES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'truck-freight', label: 'Truck Booking & Freight', icon: Truck },
  { id: 'warehouse-field', label: 'Warehouse & Field Operations', icon: Warehouse },
  { id: 'returns', label: 'Returns & Reverse Logistics', icon: Undo2 },
  { id: 'fleet-driver', label: 'Fleet & Driver Management', icon: Users },
  { id: 'digital', label: 'Digital Transformation & Automation', icon: Cpu },
];

const EMPTY_FORM = { name: '', phone: '', email: '', company: '', service: '', message: '' };
type FormState = typeof EMPTY_FORM;
type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Enter your full name.';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid mobile number.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (!f.company.trim()) e.company = 'Enter your company name.';
  if (!f.service) e.service = 'Choose a service.';
  return e;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/** Existing demo orders remain trackable by ID so earlier tracking links keep working. */
const ORDERS = MOCK_DASHBOARD_DATA.orders;
function demoOrderAsRecord(query: string): ServiceRequestRecord | null {
  const q = query.trim().toLowerCase();
  const o = ORDERS.find((x) => [x.id, x.trackingNumber].some((v) => v.toLowerCase() === q));
  if (!o) return null;
  const status = o.status === 'Delivered' || o.status === 'Active' ? 'Completed' : 'In Progress';
  const at = new Date(o.date).toISOString();
  return {
    referenceId: `${o.id} · ${o.trackingNumber}`,
    name: '',
    phone: '',
    email: '',
    company: '',
    service: o.category,
    message: o.items,
    createdAt: at,
    updatedAt: at,
    status,
    history: [{ status, at, note: o.status }],
  };
}

function buildMessage(r: { referenceId: string } & FormState) {
  return [
    `New service request: ${r.referenceId}`,
    '',
    `Name: ${r.name}`,
    `Mobile: ${r.phone}`,
    `Email: ${r.email}`,
    `Company: ${r.company}`,
    `Service: ${r.service}`,
    ...(r.message.trim() ? ['', `Requirement: ${r.message.trim()}`] : []),
  ].join('\n');
}

/** Hero right-hand card: raise a live service request, or track an existing one. */
export const HeroTrackEnquiry: React.FC = () => {
  const [tab, setTab] = useState<Tab>('live');

  // ---- Live ----
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ServiceRequestRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`live-${first}`)?.focus();
      return;
    }

    const referenceId = generateReferenceId();
    // Existing notification workflow: hand the request to the ops WhatsApp number.
    // Opened synchronously so popup blockers treat it as part of the click.
    window.open(
      `https://wa.me/${APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage({ referenceId, ...form }))}`,
      '_blank',
      'noopener,noreferrer'
    );

    setSubmitting(true);
    const res = await enquiryService.createServiceRequest({
      referenceId,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      service: form.service,
      message: form.message.trim() || undefined,
    });
    setSubmitting(false);
    if (res.data) setSubmitted(res.data);
  };

  const copyRef = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(submitted.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  // ---- Track ----
  const [trackId, setTrackId] = useState('');
  const [trackPhone, setTrackPhone] = useState('');
  const [tracking, setTracking] = useState(false);
  const [result, setResult] = useState<ServiceRequestRecord | null | undefined>(undefined);

  const submitTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const demo = demoOrderAsRecord(trackId);
    if (demo) {
      setResult(demo);
      return;
    }
    setTracking(true);
    const res = await enquiryService.trackServiceRequest(trackId, trackPhone);
    setTracking(false);
    setResult(res.data ?? null);
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl border border-[#E2DED5] bg-white text-sm text-[#171717] placeholder:text-[#A8A29A] outline-none focus:border-[#FF4D16] focus:ring-2 focus:ring-[#FF4D16]/15 transition';
  const errCls = '!border-red-500';

  const field = (key: keyof FormState, placeholder: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <input
        id={`live-${key}`}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder.replace(' *', '')}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `live-${key}-err` : undefined}
        className={`${inputCls} ${errors[key] ? errCls : ''}`}
        {...props}
      />
      {errors[key] && (
        <p id={`live-${key}-err`} className="mt-1 text-[11px] font-semibold text-red-600">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-[#E2DED5] shadow-[0_24px_60px_-20px_rgba(23,23,23,0.18)] overflow-hidden">
      {/* Tabs */}
      <div role="tablist" aria-label="Live request or track" className="grid grid-cols-2 p-1.5 m-4 mb-0 rounded-2xl bg-[#F4F1EA]">
        {([
          { id: 'live', label: 'Live', icon: Zap },
          { id: 'track', label: 'Track', icon: PackageSearch },
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
              {id === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-7">
        {tab === 'track' ? (
          /* ======================= TRACK ======================= */
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">Track your request</h3>
              <p className="text-sm text-[#625E58]">Enter your reference ID and the mobile number you registered with.</p>
            </div>

            <form onSubmit={submitTrack} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={trackId}
                  onChange={(e) => {
                    setTrackId(e.target.value);
                    setResult(undefined);
                  }}
                  placeholder="Reference ID, e.g. CH-REQ-482913"
                  aria-label="Reference ID"
                  className={inputCls}
                  required
                />
                <input
                  type="tel"
                  value={trackPhone}
                  onChange={(e) => {
                    setTrackPhone(e.target.value);
                    setResult(undefined);
                  }}
                  placeholder="Registered mobile number"
                  aria-label="Registered mobile number"
                  autoComplete="tel"
                  className={inputCls}
                  required={!/^(ord-|ch-trk-)/i.test(trackId.trim())}
                />
              </div>
              <button
                type="submit"
                disabled={tracking}
                className="w-full py-3 rounded-xl bg-[#171717] hover:bg-[#FF4D16] disabled:opacity-70 text-white transition-colors flex items-center justify-center gap-2 text-sm font-bold"
              >
                {tracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Track Request
              </button>
            </form>

            {result && <TrackResult record={result} />}

            {result === null && (
              <div className="rounded-2xl border border-[#FF4D16]/25 bg-[#FFF0EB] p-4 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-[#FF4D16] shrink-0" />
                <div className="text-[#625E58]">
                  No request matches <strong className="text-[#171717]">{trackId.trim()}</strong> with that mobile number. Check
                  both, or{' '}
                  <button type="button" onClick={() => setTab('live')} className="font-bold text-[#FF4D16] hover:underline">
                    raise a new request
                  </button>
                  .
                </div>
              </div>
            )}

            {result === undefined && (
              <div className="rounded-2xl border border-dashed border-[#E2DED5] p-5 text-center text-xs text-[#8C877D]">
                Status updates for service requests, truck bookings and HSE orders.
              </div>
            )}
          </div>
        ) : submitted ? (
          /* ======================= SUCCESS ======================= */
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF0EB] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#FF4D16]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">Request submitted</h3>
              <p className="text-sm text-[#625E58] max-w-xs mx-auto">
                Thanks, {submitted.name.split(' ')[0]}. Our team will contact you shortly about{' '}
                <strong className="text-[#171717]">{submitted.service}</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2DED5] bg-[#FAF8F5] p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C877D]">Reference ID</div>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-extrabold text-[#171717]">{submitted.referenceId}</span>
                <button
                  type="button"
                  onClick={copyRef}
                  aria-label="Copy reference ID"
                  className="p-1.5 rounded-lg text-[#625E58] hover:text-[#FF4D16] hover:bg-white transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1 text-[11px] text-[#8C877D]">Save this ID to track your request.</p>
            </div>

            <p className="text-xs text-[#625E58]">
              We opened WhatsApp with your request details. Tap <strong>Send</strong> to reach our team.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  buildMessage({ ...submitted, message: submitted.message ?? '' })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl border border-[#E2DED5] hover:border-[#171717] text-xs font-bold text-[#171717] flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle className="w-4 h-4" /> Open WhatsApp again
              </a>
              <a
                href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}?cc=${encodeURIComponent(submitted.email)}&subject=${encodeURIComponent(
                  `Service request ${submitted.referenceId}`
                )}&body=${encodeURIComponent(buildMessage({ ...submitted, message: submitted.message ?? '' }))}`}
                className="py-2.5 rounded-xl border border-[#E2DED5] hover:border-[#171717] text-xs font-bold text-[#171717] flex items-center justify-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Email a copy
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm">
              <button
                type="button"
                onClick={() => {
                  setTrackId(submitted.referenceId);
                  setTrackPhone(submitted.phone);
                  setResult(submitted);
                  setTab('track');
                }}
                className="font-bold text-[#171717] hover:text-[#FF4D16]"
              >
                Track this request
              </button>
              <span className="text-[#E2DED5]">|</span>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(null);
                  setForm(EMPTY_FORM);
                }}
                className="font-bold text-[#FF4D16] hover:underline"
              >
                New request
              </button>
            </div>
          </div>
        ) : (
          /* ======================= LIVE FORM ======================= */
          <form onSubmit={submitRequest} noValidate className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-hero text-2xl font-extrabold tracking-tight text-[#171717]">
                Get it done, live with ChaseHorse
              </h3>
              <p className="text-sm text-[#625E58]">Raise a service request, book logistics, or get immediate support.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field('name', 'Full name *', { autoComplete: 'name' })}
              {field('phone', 'Mobile number *', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
              {field('email', 'Email address *', { type: 'email', autoComplete: 'email' })}
              {field('company', 'Company name *', { autoComplete: 'organization' })}
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-bold text-[#171717]">
                Select a service <span className="text-[#FF4D16]">*</span>
              </legend>
              <div
                id="live-service"
                role="radiogroup"
                tabIndex={-1}
                aria-invalid={!!errors.service}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 outline-none"
              >
                {LIVE_SERVICES.map(({ id, label, icon: Icon }) => {
                  const active = form.service === label;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set('service', label)}
                      className={`relative flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D16] ${
                        active
                          ? 'border-[#FF4D16] bg-[#FFF0EB] shadow-sm'
                          : `bg-white hover:border-[#171717]/40 hover:bg-[#FAF8F5] ${errors.service ? 'border-red-300' : 'border-[#E2DED5]'}`
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          active ? 'bg-[#FF4D16] text-white' : 'bg-[#F4F1EA] text-[#625E58]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className={`text-[12px] leading-tight font-bold ${active ? 'text-[#171717]' : 'text-[#3D3A35]'}`}>
                        {label}
                      </span>
                      {active && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-[#FF4D16]" />}
                    </button>
                  );
                })}
              </div>
              {errors.service && <p className="mt-1 text-[11px] font-semibold text-red-600">{errors.service}</p>}
            </fieldset>

            <textarea
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder="Describe your requirement (optional)"
              aria-label="Requirement description"
              rows={2}
              className={`${inputCls} resize-none`}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#FF4D16] hover:bg-[#E53E0B] disabled:opacity-70 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D16]/25 transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/** Tracking result card with status progress and history. */
const TrackResult: React.FC<{ record: ServiceRequestRecord }> = ({ record }) => {
  const stepIndex = REQUEST_STATUSES.indexOf(record.status);
  const done = record.status === 'Completed';
  return (
    <div className="rounded-2xl border border-[#E2DED5] bg-[#FAF8F5] p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8C877D] break-all">
            {record.referenceId}
          </div>
          <div className="mt-1 font-bold text-sm text-[#171717]">{record.service}</div>
          {record.message && <div className="text-xs text-[#625E58] line-clamp-2">{record.message}</div>}
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold ${
            done ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FFF0EB] text-[#FF4D16]'
          }`}
        >
          {record.status}
        </span>
      </div>

      {/* Progress */}
      <ol className="flex items-center">
        {REQUEST_STATUSES.map((s, i) => {
          const reached = i <= stepIndex;
          return (
            <li key={s} className="flex-1 flex items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    reached ? 'bg-[#FF4D16] text-white' : 'bg-white border border-[#E2DED5] text-[#C9C3B6]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span className={`text-[10px] font-bold whitespace-nowrap ${reached ? 'text-[#171717]' : 'text-[#A8A29A]'}`}>{s}</span>
              </div>
              {i < REQUEST_STATUSES.length - 1 && (
                <span className={`flex-1 h-0.5 mx-1.5 mb-4 rounded-full ${i < stepIndex ? 'bg-[#FF4D16]' : 'bg-[#E2DED5]'}`} />
              )}
            </li>
          );
        })}
      </ol>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <dt className="text-[#8C877D]">Request date</dt>
          <dd className="font-semibold text-[#171717]">{formatDate(record.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-[#8C877D]">Last updated</dt>
          <dd className="font-semibold text-[#171717]">{formatDate(record.updatedAt)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[#8C877D]">Assigned team</dt>
          <dd className="font-semibold text-[#171717]">{record.assignedTeam ?? 'Being assigned'}</dd>
        </div>
      </dl>

      {record.history.length > 0 && (
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C877D] mb-2">Status history</div>
          <ul className="space-y-2 border-l-2 border-[#E2DED5] pl-3">
            {[...record.history].reverse().map((h, i) => (
              <li key={i} className="text-xs">
                <span className="font-bold text-[#171717]">{h.status}</span>
                <span className="text-[#8C877D]"> · {formatDate(h.at)}</span>
                {h.note && <div className="text-[#625E58]">{h.note}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
