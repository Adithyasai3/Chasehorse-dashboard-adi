import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Warehouse, 
  Users, 
  Wallet, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { TOP_LANE_RATES } from '../../data/liveMarket';

const LIVE_MARKET_CARDS = [
  {
    path: '/live-market/book-truck',
    title: 'Book Truck Now',
    icon: Truck,
    badge: 'Spot & Contract FTL',
    desc: 'Instant truck capacity placement across 32ft containers, multi-axles, and trailers with live GPS tracking.',
    action: 'Book Vehicle',
  },
  {
    path: '/live-market/terminal-space',
    title: 'Book Truck Terminal Space',
    icon: Warehouse,
    badge: '6 Metro Hubs',
    desc: 'Reserve secure parking bays, driver amenities, reefer plug-ins, and cross-docking berths at certified logistics yards.',
    action: 'Reserve Bays',
  },
  {
    path: '/live-market/on-field-lead',
    title: 'Deploy On-field Lead',
    icon: Users,
    badge: 'Sub-2hr Dispatch',
    desc: 'Station vetted dock supervisors, warehouse inventory auditors, and GST checkpoint coordinators on-site.',
    action: 'Deploy Field Lead',
  },
  {
    path: '/live-market/trip-finance',
    title: 'Secure Trip Finance',
    icon: Wallet,
    badge: 'Immediate Liquidity',
    desc: 'Instant working capital and freight bill discounting against digital Proof-of-Delivery with transparent rates.',
    action: 'Simulate Funding',
  },
  {
    path: '/live-market/freight-index',
    title: 'Today Freight Index',
    icon: TrendingUp,
    badge: 'Live National Benchmark',
    desc: 'Real-time ₹/km freight spot benchmarks, diesel correlation, and lane indices across all Indian trade corridors.',
    action: 'View Rates Chart',
  },
];

export const LiveMarketOverviewPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Hero */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF4D16] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#FF4D16] animate-pulse" />
              <span>LIVE LOGISTICS EXCHANGE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Live Market & Spot Operations
            </h1>

            <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed font-light">
              Access real-time spot capacity, reserve secured terminal yard bays, dispatch on-demand field supervisors, or unlock trip working capital instantly.
            </p>

            <div className="pt-2 text-xs text-[#E2DED5]/60">
              * Active demo environment synchronized with Chasehorse 6-city zonal dispatch hubs.
            </div>
          </div>
        </div>

        {/* 5 Dedicated Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIVE_MARKET_CARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E2DED5] p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#FF4D16] border border-[#E2DED5] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFF0EB] text-[#FF4D16] border border-[#FF4D16]/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-[#171717] group-hover:text-[#FF4D16] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2DED5]/60">
                  <Link
                    to={item.path}
                    className="w-full py-3 bg-[#171717] text-white hover:bg-[#FF4D16] rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Freight Benchmark Ticker Table */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                ● TODAY&apos;S SPOT FREIGHT SNAPSHOT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#171717]">
                Arterial Corridor Rate Benchmarks
              </h3>
            </div>

            <Link
              to="/live-market/freight-index"
              className="text-xs font-bold text-[#FF4D16] hover:underline flex items-center space-x-1"
            >
              <span>View Full Analytics Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#8C877D] font-mono uppercase border-b border-[#E2DED5]">
                <tr>
                  <th className="p-3">Corridor</th>
                  <th className="p-3">Distance / Transit</th>
                  <th className="p-3">Avg Rate (₹/km)</th>
                  <th className="p-3">Weekly Change</th>
                  <th className="p-3">Typical Vehicles</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DED5]/60 text-[#171717]">
                {TOP_LANE_RATES.map((lane) => (
                  <tr key={lane.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-3 font-bold">
                      {lane.origin} <span className="text-[#FF4D16]">→</span> {lane.destination}
                    </td>
                    <td className="p-3 text-[#625E58]">
                      {lane.distance} • {lane.transitTime}
                    </td>
                    <td className="p-3 font-mono font-bold text-sm">
                      ₹{lane.ratePerKm.toFixed(1)}/km
                    </td>
                    <td className="p-3 font-mono font-semibold">
                      <span className={lane.changePercent > 0 ? 'text-red-600' : 'text-green-600'}>
                        {lane.changePercent > 0 ? `+${lane.changePercent}%` : `${lane.changePercent}%`}
                      </span>
                    </td>
                    <td className="p-3 text-[#625E58]">
                      {lane.truckTypes.join(', ')}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to="/live-market/book-truck"
                        className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#FF4D16] hover:text-white rounded-lg font-bold transition-colors text-[11px]"
                      >
                        Book
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

