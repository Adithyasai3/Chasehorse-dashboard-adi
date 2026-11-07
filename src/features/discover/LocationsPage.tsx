import React from 'react';
import { INDIA_LOCATIONS } from '../../data/locations';
import { IndiaOperationsMap } from '../../components/maps/IndiaOperationsMap';
import { MapPin, Phone, Users, Truck, ShieldCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LocationsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
            <span>PAN-INDIA OPERATIONAL NETWORK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Our Service Locations
          </h1>
          <p className="text-sm sm:text-base text-[#625E58] max-w-2xl">
            Operating across 6 primary economic gateways in India with full-service zonal command centers, dedicated truck terminals, and field dispatch operations.
          </p>
        </div>

        {/* Interactive Map Visual */}
        <IndiaOperationsMap />

        {/* Detailed Directory of all 6 cities */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#171717]">Metro Logistics Hub Directory</h2>
            <p className="text-xs text-[#625E58]">Complete branch office addresses and active operational capacities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDIA_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-lg text-[#171717]">{loc.name}</h3>
                        {loc.isHeadquarters && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF4D16] text-white">
                            HQ
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#FF4D16] font-semibold">{loc.hubType}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#FF4D16] border border-[#E2DED5]">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-[#625E58] leading-relaxed">
                    {loc.address}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2DED5]/60 text-xs">
                    <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E2DED5]">
                      <span className="block font-bold text-[#171717]">
                        {loc.activeFieldWorkers.toLocaleString('en-IN')}+
                      </span>
                      <span className="text-[10px] text-[#8C877D]">Field Leads</span>
                    </div>

                    <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E2DED5]">
                      <span className="block font-bold text-[#171717]">
                        {loc.terminalBays} Bays
                      </span>
                      <span className="text-[10px] text-[#8C877D]">Terminal Space</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D] block">
                      Zonal Focus:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {loc.specialization.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] text-[#171717] rounded border border-[#E2DED5]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2DED5] flex items-center justify-between text-xs text-[#625E58]">
                  <span className="flex items-center space-x-1 font-semibold text-[#171717]">
                    <Phone className="w-3.5 h-3.5 text-[#FF4D16]" />
                    <span>{loc.contact}</span>
                  </span>
                  <a
                    href={`https://wa.me/917337369111?text=Hi%20Chasehorse%20${loc.name}%20Branch`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#FF4D16] hover:underline"
                  >
                    Contact Branch
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline HSE Stores Callout */}
        <div id="hse-stores" className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● FIELD EQUIPMENT DEPOTS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#171717]">
              Find Offline HSE Safety Stores
            </h3>
            <p className="text-xs sm:text-sm text-[#625E58] max-w-xl">
              Physical Chasehorse HSE safety depots are collocated at each of our 6 metro logistics terminals, carrying certified PPE kits, helmets, and steel-toe footwear in stock for immediate walk-in collection.
            </p>
          </div>

          <Link
            to="/hse-shop"
            className="px-6 py-3.5 bg-[#171717] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#FF4D16] transition-colors whitespace-nowrap shadow-sm"
          >
            Visit HSE Store Online →
          </Link>
        </div>

      </div>
    </div>
  );
};

