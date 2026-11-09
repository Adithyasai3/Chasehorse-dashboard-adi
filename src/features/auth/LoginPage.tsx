import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  ArrowRight, 
  Lock, 
  Mail, 
  UserCheck, 
  Truck, 
  Sparkles 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'worker' | 'transporter'>('client');
  const [email, setEmail] = useState('r.malhotra@apolloprecision.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/account');
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'client' | 'worker' | 'transporter') => {
    setActiveTab(role);
    if (role === 'client') {
      setEmail('r.malhotra@apolloprecision.com');
    } else if (role === 'worker') {
      setEmail('rameshwar.lead@chasehorse.com');
    } else {
      setEmail('operations@delhi-express-logistics.in');
    }
    navigate('/account');
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#F4F1EA] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-[#E2DED5] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Column: Visual Brand & Feature Badges (Matches Reference Image) */}
        <div className="lg:col-span-5 relative bg-[#171717] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Truck Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80")' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/80 to-transparent" />

          {/* Top Logo Watermark */}
          <div className="relative z-10 space-y-2">
            <img
              src="/chasehorse-logo.png"
              alt="Chasehorse"
              className="h-10 w-auto filter invert"
            />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D16] block">
              Enterprise Field Portal
            </span>
          </div>

          {/* Middle Value Text */}
          <div className="relative z-10 space-y-3 my-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Real-Time Control of Your On-Ground Logistics
            </h2>
            <p className="text-xs text-[#E2DED5]/80 leading-relaxed">
              Track invoices, field worker timesheets, dock inspection reports, 8D quality dockets, and terminal space allocations in one synchronized dashboard.
            </p>
          </div>

          {/* Bottom 3 Badges (As seen in reference sheet) */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E2DED5]/90">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF4D16]" />
              <span className="font-semibold">Secure</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-[#FF4D16]" />
              <span className="font-semibold">Fast</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#FF4D16]" />
              <span className="font-semibold">Reliable</span>
            </div>
          </div>
        </div>

        {/* Right Column: Login Tabs & Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white">
          
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF4D16] font-bold block">
                ● ACCESS PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                Welcome Back
              </h1>
              <p className="text-xs text-[#625E58]">
                Sign into your verified Chasehorse account to manage deployments and invoices.
              </p>
            </div>

            {/* Portal Role Tabs (Matches reference design) */}
            <div className="flex p-1 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('client')}
                className={`flex-1 py-2 rounded-lg transition-colors text-center ${
                  activeTab === 'client'
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#625E58] hover:text-[#171717]'
                }`}
              >
                Client Portal
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('worker')}
                className={`flex-1 py-2 rounded-lg transition-colors text-center ${
                  activeTab === 'worker'
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#625E58] hover:text-[#171717]'
                }`}
              >
                Join as Worker
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('transporter')}
                className={`flex-1 py-2 rounded-lg transition-colors text-center ${
                  activeTab === 'transporter'
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#625E58] hover:text-[#171717]'
                }`}
              >
                Partner Login
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717]">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or mobile"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#171717]">Password</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#FF4D16] hover:underline text-[11px]">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#171717] hover:bg-[#FF4D16] text-white font-bold rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md"
              >
                <span>{isLoading ? 'Verifying Credentials...' : 'Login to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Demo Buttons */}
            <div className="p-4 bg-[#FFF0EB] rounded-2xl border border-[#FF4D16]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4D16] block">
                ⚡ 1-Click Instant Demo Exploration
              </span>
              <p className="text-[11px] text-[#625E58]">
                Explore the full authenticated client dashboard without typing credentials:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('client')}
                  className="px-3 py-1.5 bg-white text-[#171717] hover:bg-[#FF4D16] hover:text-white rounded-lg text-xs font-bold border border-[#E2DED5] transition-colors"
                >
                  Apollo Precision (Client Demo) →
                </button>
              </div>
            </div>
          </div>

          {/* Social or Partner Links */}
          <div className="pt-4 border-t border-[#E2DED5] flex items-center justify-between text-xs text-[#625E58]">
            <span>Don&apos;t have an account?</span>
            <Link to="/partners/apply" className="font-bold text-[#FF4D16] hover:underline">
              Apply to Partner Network →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

