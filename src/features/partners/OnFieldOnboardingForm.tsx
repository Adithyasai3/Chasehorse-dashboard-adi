import React, { useState } from 'react';
import { Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Bengali', 'Gujarati'];
const TRAVEL_DISTANCES = ['10 km', '15 km', '20 km', 'Within District', 'No Limit'];
const WORKING_HOURS = ['Shift Hours', 'General Hours'];
const AVAILABLE_DAYS = ['Weekdays', 'Saturday', 'Sunday', 'Holidays'];
const PPE_ITEMS = ['Safety Shoes', 'Reflective Coat', 'Helmet'];
const PPE_NONE = 'None of the above';
const EXPERIENCE = ['0 – 1 years', '1 – 3 years', '3 – 6 years', 'Above 6 years'];
const YES_NO = ['Yes', 'No'];

interface OnFieldForm {
  name: string;
  dob: string;
  phone: string;
  altPhone: string;
  linkedin: string;
  email: string;
  languages: string[];
  currentAddress: string;
  permanentAddress: string;
  sameAddress: boolean;
  pincode: string;
  company: string;
  industry: string;
  ownsVehicle: string;
  hasLicense: string;
  expectedFee: string;
  travelDistance: string;
  availableTime: string;
  workingHours: string;
  shiftTimings: string;
  availableDays: string[];
  fieldExperience: string;
  ppe: string[];
  hseAware: string;
  totalExperience: string;
  referenceName: string;
  referencePhone: string;
}

const EMPTY: OnFieldForm = {
  name: '',
  dob: '',
  phone: '',
  altPhone: '',
  linkedin: '',
  email: '',
  languages: [],
  currentAddress: '',
  permanentAddress: '',
  sameAddress: false,
  pincode: '',
  company: '',
  industry: '',
  ownsVehicle: '',
  hasLicense: '',
  expectedFee: '',
  travelDistance: '',
  availableTime: '',
  workingHours: '',
  shiftTimings: '',
  availableDays: [],
  fieldExperience: '',
  ppe: [],
  hseAware: '',
  totalExperience: '',
  referenceName: '',
  referencePhone: '',
};

const formatDob = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

/** WhatsApp message with every answer, in the same order as the form. */
const buildMessage = (f: OnFieldForm) => {
  const permanent = f.sameAddress ? f.currentAddress : f.permanentAddress;
  const lines = [
    'Hi Chasehorse team! Here is my On-Field CX Lead onboarding application.',
    '',
    '*Personal details*',
    `Full Name: ${f.name}`,
    `Date of Birth: ${formatDob(f.dob)}`,
    `Mobile: ${f.phone}`,
  ];
  if (f.altPhone) lines.push(`Alternate contact: ${f.altPhone}`);
  lines.push(
    `LinkedIn: ${f.linkedin}`,
    `Email: ${f.email}`,
    `Languages: ${f.languages.join(', ')}`,
    '',
    '*Address*',
    `Current: ${f.currentAddress}`,
    `Permanent: ${permanent}`,
    `Pincode: ${f.pincode}`,
    '',
    '*Work profile*',
    `Current company: ${f.company}`,
    `Current industry: ${f.industry}`,
    `Owns a vehicle: ${f.ownsVehicle}`,
    `Valid driving license: ${f.hasLicense}`,
    `Expected fee (2.5-hour task): ₹${f.expectedFee}`,
    `Max travel distance per task: ${f.travelDistance}`,
    '',
    '*Availability*',
    `Available time for work: ${f.availableTime}`,
    `Current working hours: ${f.workingHours}`,
    `Shift timings: ${f.shiftTimings}`,
    `Available days: ${f.availableDays.length ? f.availableDays.join(', ') : 'Not specified'}`,
    '',
    '*Experience & safety*',
    `On-field logistics experience: ${f.fieldExperience}`,
    `PPE owned: ${f.ppe.join(', ')}`,
    `Aware of HSE & safety practices: ${f.hseAware}`,
    `Total work experience: ${f.totalExperience}`,
  );
  if (f.referenceName || f.referencePhone) {
    lines.push('', '*Reference*');
    if (f.referenceName) lines.push(`Name: ${f.referenceName}`);
    if (f.referencePhone) lines.push(`Contact: ${f.referencePhone}`);
  }
  return lines.join('\n');
};

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-[#E2DED5] bg-white text-sm text-[#171717] placeholder:text-[#A8A29A] outline-none focus:border-[#FF4D16] focus:ring-2 focus:ring-[#FF4D16]/15 transition';
const labelCls = 'space-y-1.5 text-xs font-bold text-[#171717] block';
const sectionCls = 'text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold mb-3';

const Req = () => <span className="text-[#FF4D16]">*</span>;

const ChoicePill: React.FC<{
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  checked: boolean;
  required?: boolean;
  onChange: () => void;
}> = ({ type, name, value, checked, required, onChange }) => (
  <label
    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
      checked ? 'border-[#FF4D16] bg-[#FFF0EB] text-[#171717]' : 'border-[#E2DED5] bg-white text-[#625E58] hover:border-[#FF4D16]/50'
    }`}
  >
    <input type={type} name={name} value={value} checked={checked} required={required} onChange={onChange} className="accent-[#FF4D16]" />
    {value}
  </label>
);

const Question: React.FC<{ label: React.ReactNode; hint?: string; error?: string; children: React.ReactNode }> = ({ label, hint, error, children }) => (
  <div className="space-y-2">
    <div>
      <span className="text-xs font-bold text-[#171717] block">{label}</span>
      {hint && <span className="text-xs text-[#8C877D] block">{hint}</span>}
    </div>
    <div className="flex flex-wrap gap-2">{children}</div>
    {error && <span className="text-xs font-semibold text-red-600 block">{error}</span>}
  </div>
);

/** On-Field CX Lead onboarding form — same questions as the former Google Form. */
export const OnFieldOnboardingForm: React.FC<{ onSent: (name: string) => void }> = ({ onSent }) => {
  const [f, setF] = useState<OnFieldForm>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof OnFieldForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));
  const pick = (key: keyof OnFieldForm, value: string) => setF((prev) => ({ ...prev, [key]: value }));
  const toggle = (key: 'languages' | 'availableDays', value: string) =>
    setF((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  // "None of the above" can't be combined with any PPE item
  const togglePpe = (value: string) =>
    setF((prev) => {
      if (value === PPE_NONE) return { ...prev, ppe: prev.ppe.includes(PPE_NONE) ? [] : [PPE_NONE] };
      const items = prev.ppe.filter((v) => v !== PPE_NONE);
      return { ...prev, ppe: items.includes(value) ? items.filter((v) => v !== value) : [...items, value] };
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const digits = (s: string) => s.replace(/\D/g, '');
    if (digits(f.phone).length < 10) next.phone = 'Please enter a valid mobile number (at least 10 digits).';
    if (f.altPhone && digits(f.altPhone).length < 10) next.altPhone = 'Please enter a valid number or leave it empty.';
    if (f.referencePhone && digits(f.referencePhone).length < 10) next.referencePhone = 'Please enter a valid number or leave it empty.';
    if (!/^\d{6}$/.test(f.pincode.trim())) next.pincode = 'Pincode must be 6 digits.';
    if (f.languages.length === 0) next.languages = 'Select at least one language.';
    if (f.ppe.length === 0) next.ppe = 'Select at least one option.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    window.open(
      `https://wa.me/${APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(f))}`,
      '_blank',
      'noopener,noreferrer'
    );
    onSent(f.name);
  };

  const errorText = (key: string) =>
    errors[key] ? (
      <span data-error="true" className="text-xs font-semibold text-red-600 block">
        {errors[key]}
      </span>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5]">
        <h3 className="font-extrabold text-lg text-[#171717]">On-Field CX Lead Onboarding Form</h3>
        <p className="text-xs text-[#625E58]">Chasehorse Logiworkx · <Req /> indicates a required question</p>
      </div>

      {/* Personal details */}
      <fieldset className="space-y-4">
        <legend className={sectionCls}>Personal details</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={labelCls}>
            <span>Full Name <Req /></span>
            <input required value={f.name} onChange={set('name')} className={inputCls} autoComplete="name" />
          </label>
          <label className={labelCls}>
            <span>Date of Birth <Req /></span>
            <input required type="date" value={f.dob} onChange={set('dob')} max={new Date().toISOString().slice(0, 10)} className={inputCls} autoComplete="bday" />
          </label>
          <label className={labelCls}>
            <span>Mobile Number <Req /></span>
            <input required type="tel" value={f.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={inputCls} autoComplete="tel" />
            {errorText('phone')}
          </label>
          <label className={labelCls}>
            <span>Alternate contact number</span>
            <input type="tel" value={f.altPhone} onChange={set('altPhone')} className={inputCls} />
            {errorText('altPhone')}
          </label>
          <label className={labelCls}>
            <span>LinkedIn Profile URL <Req /></span>
            <input required type="url" value={f.linkedin} onChange={set('linkedin')} placeholder="https://www.linkedin.com/in/…" className={inputCls} />
          </label>
          <label className={labelCls}>
            <span>Email ID <Req /></span>
            <input required type="email" value={f.email} onChange={set('email')} className={inputCls} autoComplete="email" />
          </label>
        </div>
        <Question label={<>Languages Known <Req /></>}>
          {LANGUAGES.map((l) => (
            <ChoicePill key={l} type="checkbox" name="languages" value={l} checked={f.languages.includes(l)} onChange={() => toggle('languages', l)} />
          ))}
        </Question>
        {errorText('languages')}
      </fieldset>

      {/* Address */}
      <fieldset className="space-y-4">
        <legend className={sectionCls}>Address</legend>
        <label className={labelCls}>
          <span>Current Address <Req /></span>
          <textarea required rows={2} value={f.currentAddress} onChange={set('currentAddress')} className={`${inputCls} resize-none`} autoComplete="street-address" />
        </label>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#171717]">Permanent Address <Req /></span>
            <label className="inline-flex items-center gap-2 text-xs text-[#625E58] cursor-pointer">
              <input
                type="checkbox"
                checked={f.sameAddress}
                onChange={(e) => setF((prev) => ({ ...prev, sameAddress: e.target.checked }))}
                className="accent-[#FF4D16]"
              />
              Same as current address
            </label>
          </div>
          <textarea
            required={!f.sameAddress}
            disabled={f.sameAddress}
            rows={2}
            value={f.sameAddress ? f.currentAddress : f.permanentAddress}
            onChange={set('permanentAddress')}
            aria-label="Permanent Address"
            className={`${inputCls} resize-none disabled:bg-[#FAF8F5] disabled:text-[#8C877D]`}
          />
        </div>
        <label className={`${labelCls} sm:w-1/2`}>
          <span>Pincode <Req /></span>
          <input required inputMode="numeric" maxLength={6} value={f.pincode} onChange={set('pincode')} className={inputCls} autoComplete="postal-code" />
          {errorText('pincode')}
        </label>
      </fieldset>

      {/* Work profile */}
      <fieldset className="space-y-5">
        <legend className={sectionCls}>Work profile</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={labelCls}>
            <span>Current company <Req /></span>
            <input required value={f.company} onChange={set('company')} className={inputCls} autoComplete="organization" />
          </label>
          <label className={labelCls}>
            <span>Current industry <Req /></span>
            <input required value={f.industry} onChange={set('industry')} className={inputCls} />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Question label={<>Do you own a vehicle? <Req /></>}>
            {YES_NO.map((v) => (
              <ChoicePill key={v} type="radio" name="ownsVehicle" value={v} required checked={f.ownsVehicle === v} onChange={() => pick('ownsVehicle', v)} />
            ))}
          </Question>
          <Question label={<>Do you have a valid driving license? <Req /></>}>
            {YES_NO.map((v) => (
              <ChoicePill key={v} type="radio" name="hasLicense" value={v} required checked={f.hasLicense === v} onChange={() => pick('hasLicense', v)} />
            ))}
          </Question>
        </div>
        <label className={`${labelCls} sm:w-1/2`}>
          <span>Expected fee for a 2.5-hour task (₹) <Req /></span>
          <input required type="number" min={0} value={f.expectedFee} onChange={set('expectedFee')} placeholder="e.g. 800" className={inputCls} />
        </label>
        <Question label={<>Maximum travel distance per task <Req /></>}>
          {TRAVEL_DISTANCES.map((v) => (
            <ChoicePill key={v} type="radio" name="travelDistance" value={v} required checked={f.travelDistance === v} onChange={() => pick('travelDistance', v)} />
          ))}
        </Question>
      </fieldset>

      {/* Availability */}
      <fieldset className="space-y-5">
        <legend className={sectionCls}>Availability</legend>
        <label className={labelCls}>
          <span>What is your available time for work <Req /></span>
          <input required value={f.availableTime} onChange={set('availableTime')} placeholder="e.g. 6 PM – 10 PM on weekdays" className={inputCls} />
        </label>
        <Question label={<>Current Working Hours <Req /></>}>
          {WORKING_HOURS.map((v) => (
            <ChoicePill key={v} type="radio" name="workingHours" value={v} required checked={f.workingHours === v} onChange={() => pick('workingHours', v)} />
          ))}
        </Question>
        <label className={labelCls}>
          <span>Please specify your current shift timings <Req /></span>
          <input required value={f.shiftTimings} onChange={set('shiftTimings')} placeholder="e.g. 9 AM – 6 PM" className={inputCls} />
        </label>
        <Question label="Which days are you available for task allocation?">
          {AVAILABLE_DAYS.map((v) => (
            <ChoicePill key={v} type="checkbox" name="availableDays" value={v} checked={f.availableDays.includes(v)} onChange={() => toggle('availableDays', v)} />
          ))}
        </Question>
      </fieldset>

      {/* Experience & safety */}
      <fieldset className="space-y-5">
        <legend className={sectionCls}>Experience & safety</legend>
        <Question
          label={<>Do you have on-field experience in logistics? <Req /></>}
          hint="(Transport, warehousing, site work, inspection, quality checks)"
        >
          {YES_NO.map((v) => (
            <ChoicePill key={v} type="radio" name="fieldExperience" value={v} required checked={f.fieldExperience === v} onChange={() => pick('fieldExperience', v)} />
          ))}
        </Question>
        <Question label={<>Do you have the following Personal Protective Equipment (PPE)? <Req /></>}>
          {[...PPE_ITEMS, PPE_NONE].map((v) => (
            <ChoicePill key={v} type="checkbox" name="ppe" value={v} checked={f.ppe.includes(v)} onChange={() => togglePpe(v)} />
          ))}
        </Question>
        {errorText('ppe')}
        <Question label={<>Are you aware of HSE and safety practices? <Req /></>}>
          {YES_NO.map((v) => (
            <ChoicePill key={v} type="radio" name="hseAware" value={v} required checked={f.hseAware === v} onChange={() => pick('hseAware', v)} />
          ))}
        </Question>
        <Question label={<>Total Years of Work Experience <Req /></>}>
          {EXPERIENCE.map((v) => (
            <ChoicePill key={v} type="radio" name="totalExperience" value={v} required checked={f.totalExperience === v} onChange={() => pick('totalExperience', v)} />
          ))}
        </Question>
      </fieldset>

      {/* Reference */}
      <fieldset className="space-y-4">
        <legend className={sectionCls}>Reference</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={labelCls}>
            <span>Reference Name</span>
            <input value={f.referenceName} onChange={set('referenceName')} className={inputCls} />
          </label>
          <label className={labelCls}>
            <span>Reference Contact Number</span>
            <input type="tel" value={f.referencePhone} onChange={set('referencePhone')} className={inputCls} />
            {errorText('referencePhone')}
          </label>
        </div>
      </fieldset>

      <div className="space-y-3">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Application
        </button>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#8C877D]">
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
            Opens WhatsApp with your application ready — just tap Send.
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            Your details are only shared with the Chasehorse partner desk.
          </span>
        </p>
      </div>
    </form>
  );
};
