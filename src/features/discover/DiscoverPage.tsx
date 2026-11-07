import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  DISCOVER_COURSES, 
  DISCOVER_INTERNSHIPS, 
  DISCOVER_STORIES, 
  DISCOVER_RESOURCES 
} from '../../data/discover';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Video, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Clock, 
  CheckCircle2,
  Calendar,
  Sparkles,
  Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { IndiaLogisticsNetwork } from './network/IndiaLogisticsNetwork';

export const DiscoverPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'courses' | 'internships' | 'resources' | 'stories' | 'about' | 'network'>('courses');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Course Enrollment');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('network')) setActiveTab('network');
    else if (path.includes('courses')) setActiveTab('courses');
    else if (path.includes('internships')) setActiveTab('internships');
    else if (path.includes('resources') || path.includes('videos')) setActiveTab('resources');
    else if (path.includes('stories') || path.includes('customers')) setActiveTab('stories');
    else if (path.includes('about') || path.includes('benefits') || path.includes('demo') || path.includes('events')) setActiveTab('about');
  }, [location.pathname]);

  const openModal = (title: string) => {
    setEnquiryTitle(title);
    setEnquiryOpen(true);
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Header */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● KNOWLEDGE & COMMUNITY HUB
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Discover Chasehorse
            </h1>
            <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed font-light">
              Explore professional certifications, whitepapers, enterprise case studies, and careers at Chasehorse.
            </p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-[#E2DED5]">
          {[
            { id: 'courses', label: 'Courses & Certifications', icon: GraduationCap },
            { id: 'resources', label: 'SOPs & Resources', icon: BookOpen },
            { id: 'stories', label: 'Customer Stories', icon: Sparkles },
            { id: 'about', label: 'About Chasehorse', icon: Award },
            { id: 'network', label: 'India Logistics Network', icon: Network },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#171717] text-white shadow-md'
                    : 'bg-white text-[#625E58] hover:text-[#171717] border border-[#E2DED5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF4D16]' : 'text-[#8C877D]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Highlighted Careers group: Internships tab + link to open roles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF4D16] whitespace-nowrap">
              Careers
            </span>
            <button
              onClick={() => setActiveTab('internships')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'internships'
                  ? 'bg-[#FF4D16] text-white shadow-md'
                  : 'bg-[#FFF0EB] text-[#FF4D16] border border-[#FF4D16]/30 hover:border-[#FF4D16]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Internships</span>
            </button>
            <Link
              to="/careers/jobs"
              className="flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap bg-[#FFF0EB] text-[#FF4D16] border border-[#FF4D16]/30 hover:border-[#FF4D16] transition-all"
            >
              <span>Open Roles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* INDIA LOGISTICS NETWORK */}
        {activeTab === 'network' && <IndiaLogisticsNetwork />}

        {/* TAB 1: COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#171717]">Professional Logistics Certifications</h2>
              <p className="text-xs text-[#625E58]">Upskilling field personnel and supply chain executives with industry-recognized credentials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISCOVER_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-[#E2DED5] overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#171717]/80 rounded text-[10px] font-bold text-white uppercase">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#8C877D]">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-[#FF4D16]" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="font-bold text-[#171717]">⭐ {course.rating} ({course.enrolled} Enrolled)</span>
                      </div>

                      <h3 className="font-bold text-base text-[#171717]">{course.title}</h3>
                      <p className="text-xs text-[#625E58] leading-relaxed">{course.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E2DED5]/60 space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D] block">
                        Core Syllabus Modules:
                      </span>
                      <ul className="space-y-1 text-xs text-[#625E58]">
                        {course.modules.slice(0, 3).map((mod, mIdx) => (
                          <li key={mIdx} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => openModal(`Enroll in ${course.title}`)}
                        className="w-full py-2.5 bg-[#FF4D16] text-white rounded-xl text-xs font-bold hover:bg-[#E53E0B] transition-colors"
                      >
                        Enroll in Course →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERNSHIPS */}
        {activeTab === 'internships' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#171717]">On-Ground Operational Internships</h2>
              <p className="text-xs text-[#625E58]">Paid field apprenticeships for logistics graduates and engineers across 6 Indian hub cities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DISCOVER_INTERNSHIPS.map((intern) => (
                <div
                  key={intern.id}
                  className="bg-white rounded-3xl border border-[#E2DED5] p-6 flex flex-col justify-between shadow-sm space-y-4"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#FF4D16] border border-[#E2DED5]">
                      Stipend: {intern.stipend}
                    </span>
                    <h3 className="font-bold text-lg text-[#171717]">{intern.title}</h3>
                    <p className="text-xs text-[#625E58] leading-relaxed">{intern.description}</p>
                    <div className="text-[11px] text-[#8C877D]">
                      <strong>Locations:</strong> {intern.locations.join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => openModal(`Apply for ${intern.title}`)}
                    className="w-full py-2.5 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#FF4D16] transition-colors"
                  >
                    Apply for Traineeship →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#171717]">Whitepapers & Operational Toolkits</h2>
              <p className="text-xs text-[#625E58]">Free download resources for supply chain directors, factory heads, and logistics managers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DISCOVER_RESOURCES.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#E2DED5] p-6 flex flex-col justify-between shadow-sm space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF4D16] uppercase">
                      {res.type} • {res.size}
                    </span>
                    <h3 className="font-bold text-sm text-[#171717] leading-snug">{res.title}</h3>
                    <p className="text-xs text-[#625E58]">{res.description}</p>
                  </div>

                  <button
                    onClick={() => openModal(`Download ${res.title}`)}
                    className="w-full py-2.5 bg-[#FAF8F5] border border-[#E2DED5] text-[#171717] hover:border-[#171717] rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Resource ({res.downloads})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER STORIES */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#171717]">Verified Enterprise Case Studies</h2>
              <p className="text-xs text-[#625E58]">Real-world logistics impact achieved across Indian industrial verticals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DISCOVER_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-3xl border border-[#E2DED5] p-6 flex flex-col justify-between shadow-sm space-y-4"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#625E58] border border-[#E2DED5]">
                      {story.industry}
                    </span>
                    <h3 className="font-bold text-sm text-[#171717] leading-snug">{story.headline}</h3>
                    <p className="text-xs text-[#625E58] leading-relaxed">{story.summary}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E2DED5] text-center">
                    {story.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="block font-mono font-bold text-sm text-[#FF4D16]">{m.value}</span>
                        <span className="text-[9px] text-[#8C877D] block leading-tight">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ABOUT CHASEHORSE */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 space-y-8 shadow-sm">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                ● OUR HERITAGE & VISION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
                Growth Enabling Logiworkx Partner
              </h2>
              <p className="text-sm text-[#625E58] leading-relaxed">
                Founded to bridge the critical execution gap between digital supply chain software and physical reality on Indian docks and highways, Chasehorse provides enterprise clients with guaranteed operational reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-[#171717]">Our Mission</h3>
                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                  To eliminate friction, losses, and uncertainty in Indian logistics by combining vetted human intelligence on the ground with cutting-edge software and rapid capital access.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-[#171717]">Pan-India Presence</h3>
                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                  Headquartered in Bengaluru with zonal operational commands in New Delhi NCR, Mumbai, Chennai, Kolkata, and Hyderabad.
                </p>
                <Link
                  to="/locations"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF4D16] hover:underline"
                >
                  <span>Explore All 6 Service Hub Locations →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={enquiryTitle}
      />
    </div>
  );
};

