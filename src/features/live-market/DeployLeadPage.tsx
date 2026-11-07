import React, { useState } from 'react';
import { ONFIELD_LEAD_SKILLS } from '../../data/liveMarket';
import { INDIA_LOCATIONS } from '../../data/locations';
import { Users, Clock, ShieldCheck, CheckCircle2, ArrowRight, MapPin, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DeployLeadPage: React.FC = () => {
  const [selectedSkillId, setSelectedSkillId] = useState(ONFIELD_LEAD_SKILLS[0].id);
  const [selectedCity, setSelectedCity] = useState(INDIA_LOCATIONS[0].name);
  const [shiftsCount, setShiftsCount] = useState(1);
  const [deployed, setDeployed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const selectedSkill = ONFIELD_LEAD_SKILLS.find((s) => s.id === selectedSkillId) || ONFIELD_LEAD_SKILLS[0];

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-DEP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setDeployed(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
            <span>RAPID FIELD SUPERVISION DISPATCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Deploy On-Field Lead
          </h1>
          <p className="text-sm text-[#625E58] max-w-2xl">
            Dispatch certified logistics supervisors, dock inspectors, and GST checkpoint coordinators directly to your facility or loading dock within 2 to 4 hours.
          </p>
        </div>

        {deployed ? (
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 text-center space-y-5 shadow-lg max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#171717]">
                Field Supervisor Dispatch Initiated!
              </h2>
              <p className="text-xs text-[#625E58]">
                Deployment Order ID: <span className="font-mono font-bold text-[#FF4D16]">{ticketId}</span>
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] text-xs text-[#625E58] text-left space-y-2">
              <p><strong>Role Profile:</strong> {selectedSkill.title}</p>
              <p><strong>Operating Zone:</strong> {selectedCity} Hub</p>
              <p><strong>Shift Commitment:</strong> {shiftsCount} shift(s)</p>
              <p className="pt-2 text-[11px] text-[#8C877D] border-t border-[#E2DED5]">
                A certified Chasehorse Field Supervisor matching this specification has been notified. You will receive their name, contact, photo ID, and ETA via SMS in 15 minutes.
              </p>
            </div>

            <button
              onClick={() => setDeployed(false)}
              className="px-6 py-3 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#FF4D16] transition-colors"
            >
              Deploy Another Lead
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeploy} className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Lead Role Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block">
                Select Field Lead Specialization *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ONFIELD_LEAD_SKILLS.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-[#FFF0EB]/50 border-[#FF4D16] shadow-sm'
                          : 'bg-[#FAF8F5] border-[#E2DED5] hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm text-[#171717]">{skill.title}</h4>
                        <span className="text-xs font-mono font-bold text-[#FF4D16] shrink-0 ml-2">
                          {skill.ratePerShift}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-[#625E58]">
                        <Award className="w-3.5 h-3.5 text-[#FF4D16]" />
                        <span>Experience: {skill.experience}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-white text-[#171717] border border-[#E2DED5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* City & Shifts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>Deployment City / Regional Zone *</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                >
                  {INDIA_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.state})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717] flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>Number of Shifts *</span>
                </label>
                <select
                  value={shiftsCount}
                  onChange={(e) => setShiftsCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                >
                  <option value={1}>1 Shift (Single day / Emergency dock oversight)</option>
                  <option value={3}>3 Shifts (Weekend surge / audit)</option>
                  <option value={7}>7 Shifts (Weekly assignment)</option>
                  <option value={30}>30 Shifts (Monthly dedicated retainer)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors flex items-center justify-center space-x-2 shadow-md text-sm"
            >
              <span>Dispatch Certified Field Lead</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C877D]">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Identity Verified • Statutory PF/ESIC Insured • Equipped with Mobile Audit Tools</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

