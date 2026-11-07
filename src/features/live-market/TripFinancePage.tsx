import React, { useState } from 'react';
import { Wallet, ShieldCheck, CheckCircle2, ArrowRight, Zap, Percent, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TripFinancePage: React.FC = () => {
  const [invoiceAmount, setInvoiceAmount] = useState(250000);
  const [advancePercent, setAdvancePercent] = useState(85);
  const [tenureDays, setTenureDays] = useState(30);
  const [applied, setApplied] = useState(false);
  const [appId, setAppId] = useState('');

  const advanceAmount = Math.round(invoiceAmount * (advancePercent / 100));
  const feePercent = 1.4; // 1.4% flat for 30 days
  const feeAmount = Math.round(advanceAmount * (feePercent / 100));
  const netDisbursement = advanceAmount - feeAmount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-FIN-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(id);
    setApplied(true);
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
            <span>WORKING CAPITAL ACCELERATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Secure Trip Finance
          </h1>
          <p className="text-sm text-[#625E58] max-w-2xl">
            Never let payment delays stall your fleet. Get up to 90% instant liquidity against verified freight bills, LRs, and electronic Proof-of-Delivery within 24 hours.
          </p>
        </div>

        {applied ? (
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 text-center space-y-5 shadow-lg max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#171717]">
                Trip Finance Simulation Approved!
              </h2>
              <p className="text-xs text-[#625E58]">
                Application Docket: <span className="font-mono font-bold text-[#FF4D16]">{appId}</span>
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] text-xs text-[#625E58] text-left space-y-2">
              <p><strong>Gross Invoice Value:</strong> ₹{invoiceAmount.toLocaleString('en-IN')}</p>
              <p><strong>Immediate Advance (85%):</strong> ₹{advanceAmount.toLocaleString('en-IN')}</p>
              <p><strong>Net Disbursal in 24h:</strong> <span className="text-[#FF4D16] font-bold">₹{netDisbursement.toLocaleString('en-IN')}</span></p>
              <p className="pt-2 text-[11px] text-[#8C877D] border-t border-[#E2DED5]">
                Upload your digital LR and GST E-way bill via our partner dashboard. Funds are directly remitted via NEFT/RTGS to your registered bank account upon shipper verification.
              </p>
            </div>

            <button
              onClick={() => setApplied(false)}
              className="px-6 py-3 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#FF4D16] transition-colors"
            >
              Simulate Another Invoice
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Calculator Form (7 cols) */}
            <form onSubmit={handleApply} className="lg:col-span-7 bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Freight Invoice Amount
                    </label>
                    <span className="text-lg font-mono font-extrabold text-[#FF4D16]">
                      ₹{invoiceAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={50000}
                    max={2000000}
                    step={25000}
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(parseInt(e.target.value))}
                    className="w-full accent-[#FF4D16] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C877D] font-mono">
                    <span>₹50,000</span>
                    <span>₹10,00,000</span>
                    <span>₹20,00,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#171717]">Advance Percentage</label>
                    <select
                      value={advancePercent}
                      onChange={(e) => setAdvancePercent(parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                    >
                      <option value={80}>80% Immediate Advance</option>
                      <option value={85}>85% Standard Advance</option>
                      <option value={90}>90% Maximum Advance</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#171717]">Credit Tenure</label>
                    <select
                      value={tenureDays}
                      onChange={(e) => setTenureDays(parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                    >
                      <option value={15}>15 Days</option>
                      <option value={30}>30 Days</option>
                      <option value={45}>45 Days</option>
                      <option value={60}>60 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] space-y-2.5 text-xs">
                <div className="flex justify-between text-[#625E58]">
                  <span>Immediate Advance ({advancePercent}%)</span>
                  <span className="font-mono font-bold text-[#171717]">₹{advanceAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#625E58]">
                  <span>Indicative Discounting Fee (1.4%)</span>
                  <span className="font-mono text-red-600">-₹{feeAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#E2DED5]">
                  <span className="font-extrabold text-sm text-[#171717]">Net Cash Disbursed to Bank</span>
                  <span className="font-mono font-extrabold text-xl text-[#FF4D16]">
                    ₹{netDisbursement.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors flex items-center justify-center space-x-2 shadow-md text-sm"
              >
                <span>Apply for Instant Trip Advance</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C877D]">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Zero Collateral Required • Partner NBFC Backed • Digital E-Sign</span>
              </div>
            </form>

            {/* Benefits & How It Works (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-base text-[#171717]">Why Transporters Choose Chasehorse</h3>
                <ul className="space-y-3 text-xs text-[#625E58]">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                    <span><strong>Sub-24h Liquidity:</strong> Don’t wait 60–90 days for corporate client bill settlements.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                    <span><strong>Zero Physical Paperwork:</strong> 100% digital KYC and electronic LR validation.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                    <span><strong>Keep Drivers Moving:</strong> Fund diesel, Fastags, and driver trip allowances without stress.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#171717] rounded-3xl text-white space-y-2 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                  ● STATUTORY TRANSPARENCY
                </span>
                <h4 className="font-bold text-sm text-white">NBFC Regulated Facility</h4>
                <p className="text-xs text-[#E2DED5]/80 leading-relaxed">
                  Trip finance facilities are executed through RBI-registered enterprise financial partners in accordance with statutory digital lending guidelines.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

