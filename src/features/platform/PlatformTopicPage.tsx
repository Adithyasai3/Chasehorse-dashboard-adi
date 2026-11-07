import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, MessageSquare, CalendarCheck, LayoutGrid } from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { PLATFORM_TOPICS, getPlatformTopic } from './platformTopics';

const pad = (n: number) => String(n).padStart(2, '0');

export const PlatformTopicPage: React.FC = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const activePillRef = useRef<HTMLAnchorElement>(null);

  // Keep the active topic pill in view on the mobile topic bar
  useEffect(() => {
    activePillRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [topicSlug]);

  const topic = getPlatformTopic(topicSlug);
  if (!topic) return <Navigate to="/platform" replace />;

  const index = PLATFORM_TOPICS.indexOf(topic);
  const next = PLATFORM_TOPICS[index + 1];
  const Icon = topic.icon;
  const Section = topic.Section;
  const whatsapp = `https://wa.me/917337369111?text=${encodeURIComponent(
    `Hi Chasehorse, I want to know more about GELP — ${topic.title}`
  )}`;

  return (
    <div className="w-full bg-[#F4F1EA] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs text-[#625E58] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#FF4D16]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <Link to="/platform" className="hover:text-[#FF4D16]">Platform</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <span className="font-bold text-[#171717]">{topic.title}</span>
        </nav>

        {/* ================= TOPIC BANNER ================= */}
        <motion.section
          key={topic.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#141414] text-white border border-white/10 shadow-2xl mb-10"
          style={{
            backgroundImage: [
              'radial-gradient(90% 120% at 100% 0%, rgba(255,77,22,0.22) 0%, rgba(255,77,22,0) 55%)',
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        >
          {/* Large outlined topic number */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute top-4 right-6 font-black leading-none tracking-tighter text-transparent text-[110px] sm:text-[160px]"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.12)' }}
          >
            {pad(index + 1)}
          </span>

          <div className="relative p-8 sm:p-12 space-y-5 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#FF4D16] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(255,77,22,0.35)]">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#FF4D16]">
                GELP Platform · {pad(index + 1)} / {pad(PLATFORM_TOPICS.length)}
              </span>
            </div>
            <h1 className="font-hero text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[1.02]">{topic.title}</h1>
            <p className="text-base sm:text-lg text-[#E2DED5]/85 leading-relaxed">{topic.intro}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-all text-sm flex items-center space-x-2 shadow-lg"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/10 hover:bg-white hover:text-[#171717] border border-white/20 text-white font-bold rounded-xl transition-all text-sm flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Highlight numbers */}
          <div className="relative grid grid-cols-3 border-t border-white/10 divide-x divide-white/10">
            {topic.highlights.map((h) => (
              <div key={h.label} className="px-5 sm:px-12 py-5 sm:py-6">
                <div className="text-xl sm:text-3xl font-black tracking-tight bg-gradient-to-br from-[#FF7A4D] to-[#FF4D16] bg-clip-text text-transparent">
                  {h.value}
                </div>
                <div className="mt-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/55">{h.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================= MOBILE TOPIC BAR ================= */}
        <div className="lg:hidden -mx-4 px-4 mb-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {PLATFORM_TOPICS.map((t, i) => {
            const active = t.slug === topic.slug;
            return (
              <Link
                key={t.slug}
                ref={active ? activePillRef : undefined}
                to={`/platform/${t.slug}`}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white text-[#171717] border-[#E2DED5] hover:border-[#171717]'
                }`}
              >
                <span className={`font-mono mr-1.5 ${active ? 'text-[#FF4D16]' : 'text-[#8C877D]'}`}>{pad(i + 1)}</span>
                {t.title}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ================= DESKTOP SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-5">
              <nav className="bg-white rounded-2xl border border-[#E2DED5] p-2">
                <Link
                  to="/platform"
                  className="flex items-center gap-2 px-3 py-2.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#8C877D] hover:text-[#171717]"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Platform overview
                </Link>
                <div className="h-px bg-[#E2DED5] mx-2 mb-1" />
                {PLATFORM_TOPICS.map((t, i) => {
                  const active = t.slug === topic.slug;
                  return (
                    <Link
                      key={t.slug}
                      to={`/platform/${t.slug}`}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        active ? 'bg-[#FAF8F5] text-[#171717] font-bold' : 'text-[#625E58] hover:text-[#171717] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="platformTopicActive"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#FF4D16]"
                        />
                      )}
                      <span className={`font-mono text-[11px] font-bold ${active ? 'text-[#FF4D16]' : 'text-[#C9C3B6]'}`}>
                        {pad(i + 1)}
                      </span>
                      <span>{t.title}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Talk to an expert */}
              <div className="rounded-2xl bg-[#171717] text-white p-5 space-y-3">
                <CalendarCheck className="w-5 h-5 text-[#FF4D16]" />
                <div className="font-bold text-base leading-snug">See GELP running on your lanes</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  A 30-minute walkthrough tailored to your plants, hubs, and transporters.
                </p>
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full py-2.5 bg-[#FF4D16] hover:bg-[#E53E0B] rounded-xl text-xs font-bold transition-colors"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}
          <main className="lg:col-span-9 min-w-0">
            <motion.div
              key={topic.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Section />
            </motion.div>

            {/* Up next */}
            {next ? (
              <Link
                to={`/platform/${next.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-white border border-[#E2DED5] hover:border-[#171717] p-7 sm:p-9 transition-all hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF4D16]">
                      Up next · {pad(index + 2)}
                    </span>
                    <div className="font-hero text-2xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">{next.title}</div>
                    <p className="text-sm text-[#625E58]">{next.summary}</p>
                  </div>
                  <span className="shrink-0 w-14 h-14 rounded-full bg-[#171717] group-hover:bg-[#FF4D16] text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/platform"
                className="group block rounded-3xl bg-white border border-[#E2DED5] hover:border-[#171717] p-7 sm:p-9 transition-all hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF4D16]">
                      You&apos;ve seen it all
                    </span>
                    <div className="font-hero text-2xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">Back to platform overview</div>
                    <p className="text-sm text-[#625E58]">Revisit any topic, or book a demo to see GELP live.</p>
                  </div>
                  <span className="shrink-0 w-14 h-14 rounded-full bg-[#171717] group-hover:bg-[#FF4D16] text-white flex items-center justify-center transition-colors">
                    <LayoutGrid className="w-6 h-6" />
                  </span>
                </div>
              </Link>
            )}
          </main>
        </div>
      </div>

      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} title={`Book a GELP Demo — ${topic.title}`} />
    </div>
  );
};
