import React, { useState } from 'react';
import { JOB_OPENINGS } from '../../data/careers';
import { JobOpening } from '../../types';
import { Briefcase, MapPin, Search, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

/** Searchable, filterable list of open roles with the details & apply modal. */
export const JobsBoard: React.FC<{ initialDept?: string }> = ({ initialDept = 'All' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>(initialDept);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applied, setApplied] = useState(false);
  const [appId, setAppId] = useState('');

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-JOB-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(id);
    setApplied(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
    {/* Search & Filter Toolbar */}
    <div id="jobs" className="bg-white rounded-2xl border border-[#E2DED5] p-4 sm:p-6 shadow-sm space-y-4 scroll-mt-24">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search open roles, locations (Bengaluru, Mumbai)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Operations', 'Technology', 'Quality & Safety', 'Business Development'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#FAF8F5] text-[#625E58] hover:text-[#171717]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Jobs List */}
    <div className="space-y-4">
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-12 text-center text-xs text-[#625E58]">
          No positions matching your search query. Try resetting filters.
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-[#E2DED5] p-6 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#FF4D16] border border-[#E2DED5]">
                  {job.department}
                </span>
                {job.isHot && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                    Urgent Hiring
                  </span>
                )}
                <span className="text-xs text-[#8C877D]">•</span>
                <span className="text-xs text-[#625E58]">{job.type}</span>
              </div>

              <h3 className="font-bold text-lg text-[#171717] group-hover:text-[#FF4D16] transition-colors">
                {job.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#625E58]">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>{job.experience}</span>
                </span>
                <span className="flex items-center space-x-1 font-mono font-semibold text-[#171717]">
                  <span>{job.salaryRange}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedJob(job);
                setApplied(false);
              }}
              className="px-5 py-2.5 bg-[#171717] group-hover:bg-[#FF4D16] text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap self-start md:self-center shadow-sm"
            >
              View Details & Apply →
            </button>
          </div>
        ))
      )}
    </div>
      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E2DED5] overflow-hidden z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E2DED5] flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <span className="text-[10px] font-mono text-[#FF4D16] uppercase font-bold">
                  {selectedJob.department} • {selectedJob.type}
                </span>
                <h3 className="font-bold text-lg text-[#171717]">{selectedJob.title}</h3>
                <span className="text-xs text-[#625E58]">{selectedJob.location}</span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg text-[#625E58] hover:text-[#171717] hover:bg-[#E2DED5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {applied ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#171717]">Application Submitted (Demo Mode)</h4>
                  <p className="text-xs text-[#625E58]">
                    Tracking ID: <span className="font-mono font-bold text-[#FF4D16]">{appId}</span>
                  </p>
                  <p className="text-xs text-[#8C877D] max-w-md mx-auto">
                    In the upcoming backend phase, candidate dossiers synchronize with our ATS pipeline. Our talent team will review profiles within 3 business days.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2.5 bg-[#171717] text-white rounded-xl text-xs font-bold"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">About the Role</h4>
                    <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">Key Responsibilities</h4>
                    <ul className="space-y-1.5 text-xs text-[#625E58]">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">Qualifications</h4>
                    <ul className="space-y-1.5 text-xs text-[#625E58]">
                      {selectedJob.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleApply} className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#171717]">
                      Submit Your Application
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-[#171717]">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3 py-2 bg-white border border-[#E2DED5] rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#171717]">Email *</label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="priya@example.com"
                          className="w-full px-3 py-2 bg-white border border-[#E2DED5] rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="font-bold text-[#171717]">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white border border-[#E2DED5] rounded-xl focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF4D16] text-white font-bold rounded-xl text-xs hover:bg-[#E53E0B] transition-colors shadow-sm"
                    >
                      Submit Job Application
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
