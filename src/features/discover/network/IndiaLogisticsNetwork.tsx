import React, { useMemo, useState } from 'react';
import { Search, ArrowUpDown, Route, Compass, X, AlertTriangle, MessageSquare, MapPin, Info } from 'lucide-react';
import { LOGISTICS_LOCATIONS, KIND_LABELS, LogisticsLocation, LocationKind } from '../../../data/logisticsLocations';
import { findNearby, findPotentialPath } from '../../../lib/geoNetwork';
import { APP_CONFIG } from '../../../lib/config';
import { NetworkMap } from './NetworkMap';

// Client requirements → which kinds of location are relevant
const REQUIREMENTS: { id: string; label: string; kinds?: LocationKind[] }[] = [
  { id: 'any', label: 'Any location' },
  { id: 'freight', label: 'Freight movement', kinds: ['port', 'rail', 'air', 'metro', 'city'] },
  { id: 'warehouse', label: 'Warehouse coverage', kinds: ['warehousing', 'industrial', 'metro'] },
  { id: 'distribution', label: 'Regional distribution', kinds: ['metro', 'city'] },
  { id: 'industrial', label: 'Industrial coverage', kinds: ['industrial', 'port'] },
];

const RADII = [25, 50, 100];
const byId = new Map(LOGISTICS_LOCATIONS.map((l) => [l.id, l]));
const km = (n: number) => `${Math.round(n)} km`;

/** Search box with suggestions over all locations. */
const LocationSearch: React.FC<{
  placeholder: string;
  value?: LogisticsLocation;
  onPick: (l: LogisticsLocation) => void;
  onClear?: () => void;
}> = ({ placeholder, value, onPick, onClear }) => {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return LOGISTICS_LOCATIONS.filter((l) => l.name.toLowerCase().includes(t) || l.state.toLowerCase().includes(t))
      .sort((a, b) => Number(!a.name.toLowerCase().startsWith(t)) - Number(!b.name.toLowerCase().startsWith(t)))
      .slice(0, 7);
  }, [q]);

  if (value) {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/10">
        <MapPin className="w-4 h-4 text-[#FF4D16] shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white truncate">{value.name}</div>
          <div className="text-[11px] text-white/45 truncate">{value.state}</div>
        </div>
        {onClear && (
          <button type="button" onClick={onClear} aria-label={`Clear ${value.name}`} className="p-1 rounded text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) {
            onPick(results[0]);
            setQ('');
            setOpen(false);
          }
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#FF4D16]/70"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-xl bg-[#1C1C1C] border border-white/10 shadow-2xl overflow-hidden">
          {results.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(l);
                  setQ('');
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-white/[0.06] flex items-center justify-between gap-2"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-white truncate">{l.name}</span>
                  <span className="block text-[11px] text-white/45 truncate">{l.state}</span>
                </span>
                <span className="shrink-0 text-[10px] text-white/45">{KIND_LABELS[l.kinds[0]]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const KindTags: React.FC<{ loc: LogisticsLocation }> = ({ loc }) => (
  <div className="flex flex-wrap gap-1">
    {loc.kinds.map((k) => (
      <span key={k} className="px-1.5 py-0.5 rounded bg-white/[0.07] text-[10px] text-white/60">
        {KIND_LABELS[k]}
      </span>
    ))}
  </div>
);

export const IndiaLogisticsNetwork: React.FC = () => {
  const [mode, setMode] = useState<'explore' | 'plan'>('explore');
  const [requirement, setRequirement] = useState(REQUIREMENTS[0].id);
  const [radius, setRadius] = useState(50);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originId, setOriginId] = useState<string | null>(null);
  const [destId, setDestId] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ key: string; ids: string[] } | null>(null);
  const [showCorridor, setShowCorridor] = useState(false);

  const reqKinds = REQUIREMENTS.find((r) => r.id === requirement)?.kinds;
  const relevantIds = useMemo(
    () => (reqKinds ? new Set(LOGISTICS_LOCATIONS.filter((l) => l.kinds.some((k) => reqKinds.includes(k))).map((l) => l.id)) : undefined),
    [reqKinds]
  );

  const selected = selectedId ? byId.get(selectedId) : undefined;
  const origin = originId ? byId.get(originId) : undefined;
  const dest = destId ? byId.get(destId) : undefined;

  const nearby = useMemo(
    () => (selected ? findNearby(selected, LOGISTICS_LOCATIONS, radius, reqKinds) : []),
    [selected, radius, reqKinds]
  );

  const path = useMemo(
    () => (origin && dest && origin.id !== dest.id ? findPotentialPath(origin, dest, LOGISTICS_LOCATIONS, radius, reqKinds) : null),
    [origin, dest, radius, reqKinds]
  );

  const focusOn = (ids: string[]) => setFocus({ key: `${ids.join('|')}-${Date.now()}`, ids });

  const selectLocation = (l: LogisticsLocation) => {
    if (mode === 'plan') {
      if (!originId) setOriginId(l.id);
      else if (!destId && l.id !== originId) setDestId(l.id);
      else if (l.id !== originId) setDestId(l.id);
      return;
    }
    setSelectedId(l.id);
    const near = findNearby(l, LOGISTICS_LOCATIONS, radius).map((r) => r.location.id);
    focusOn([l.id, ...near]);
  };

  // Fit the map to a newly computed path
  const pathKey = path ? path.stops.map((s) => s.id).join('|') : '';
  React.useEffect(() => {
    if (path) focusOn(path.stops.map((s) => s.id));
    setShowCorridor(false);
  }, [pathKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchMode = (m: 'explore' | 'plan') => {
    setMode(m);
    setHoveredId(null);
  };

  const enquiryUrl = path
    ? `https://wa.me/${APP_CONFIG.ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        [
          'Hi Chasehorse team! I explored the India Logistics Network on your website.',
          '',
          `Requirement: ${REQUIREMENTS.find((r) => r.id === requirement)!.label}`,
          `From: ${path.stops[0].name}, ${path.stops[0].state}`,
          `To: ${path.stops[path.stops.length - 1].name}, ${path.stops[path.stops.length - 1].state}`,
          `Potential path: ${path.stops.map((s) => s.name).join(' → ')} (~${km(path.pathKm)})`,
          '',
          'Please share how Chasehorse can support this corridor.',
        ].join('\n')
      )}`
    : '';

  // Map highlighting per mode
  const highlight =
    mode === 'explore'
      ? { selectedId, emphasisIds: new Set(nearby.map((n) => n.location.id)), radiusKm: radius }
      : {
          stopIds: path?.stops.map((s) => s.id) ?? [originId, destId].filter(Boolean) as string[],
          emphasisIds: new Set(path?.corridor.map((c) => c.location.id) ?? []),
        };

  const hubCount = LOGISTICS_LOCATIONS.filter((l) => l.chasehorseHub).length;

  return (
    <section className="space-y-5">
      <div className="space-y-1.5">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">● Network discovery</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">India Logistics Network</h2>
        <p className="text-sm text-[#625E58] max-w-2xl">
          Explore logistics locations, operational hubs, and potential network opportunities across India.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-[#2A2A2A] bg-[#0E0E0E] shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        {/* Map */}
        <div className="lg:col-span-8 h-[480px] sm:h-[600px] lg:h-[720px] border-b lg:border-b-0 lg:border-r border-white/10">
          <NetworkMap
            locations={LOGISTICS_LOCATIONS}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onSelect={selectLocation}
            focus={focus}
            relevantIds={relevantIds}
            {...highlight}
          />
        </div>

        {/* Panel */}
        <aside className="lg:col-span-4 flex flex-col text-white lg:h-[720px]">
          <div className="p-4 border-b border-white/10 space-y-3">
            <div role="tablist" className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.05]">
              {([
                { id: 'explore', label: 'Explore', icon: Compass },
                { id: 'plan', label: 'Plan a path', icon: Route },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={mode === id}
                  type="button"
                  onClick={() => switchMode(id)}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                    mode === id ? 'bg-white text-[#141414]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Requirement</span>
                <select
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white outline-none focus:border-[#FF4D16]/70 [&>option]:bg-[#1C1C1C]"
                >
                  {REQUIREMENTS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Proximity</span>
                <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-white/[0.06] border border-white/10">
                  {RADII.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRadius(r)}
                      className={`py-1.5 rounded-md text-xs font-bold ${radius === r ? 'bg-[#FF4D16] text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mode === 'explore' ? (
              <>
                <LocationSearch placeholder="Search a city, port or industrial area" onPick={selectLocation} />

                {selected ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-lg font-extrabold leading-tight">{selected.name}</div>
                          <div className="text-xs text-white/50">{selected.state}</div>
                        </div>
                        <button type="button" onClick={() => setSelectedId(null)} aria-label="Clear selection" className="p-1 text-white/40 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <KindTags loc={selected} />
                      <div
                        className={`text-[11px] font-semibold ${selected.chasehorseHub ? 'text-[#FF7A4D]' : 'text-white/50'}`}
                      >
                        {selected.chasehorseHub ? '● Chasehorse operating hub city' : '○ Potential network location — not a Chasehorse facility'}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOriginId(selected.id);
                          setDestId(null);
                          switchMode('plan');
                        }}
                        className="w-full mt-1 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <Route className="w-3.5 h-3.5" /> Plan a path from here
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h4 className="text-sm font-bold">Within {radius} km</h4>
                        <span className="text-xs text-white/45">{nearby.length} locations</span>
                      </div>
                      {nearby.length === 0 ? (
                        <p className="text-xs text-white/45">
                          No mapped {reqKinds ? 'matching ' : ''}locations within {radius} km. Try a larger radius.
                        </p>
                      ) : (
                        <ul className="space-y-1">
                          {nearby.map(({ location: l, distanceKm }) => (
                            <li key={l.id}>
                              <button
                                type="button"
                                onClick={() => selectLocation(l)}
                                onMouseEnter={() => setHoveredId(l.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.05] text-left"
                              >
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold truncate">{l.name}</span>
                                  <span className="block text-[11px] text-white/45 truncate">{l.kinds.map((k) => KIND_LABELS[k]).join(' · ')}</span>
                                </span>
                                <span className="shrink-0 text-xs font-mono text-[#FF7A4D]">{km(distanceKm)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm text-white/60">
                    <p>Select any point on the map, or search, to discover locations within {radius} km.</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                        <div className="text-xl font-black text-white">{LOGISTICS_LOCATIONS.length}</div>
                        <div className="text-white/45">Mapped locations</div>
                      </div>
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                        <div className="text-xl font-black text-[#FF7A4D]">{hubCount}</div>
                        <div className="text-white/45">Chasehorse hub cities</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <LocationSearch placeholder="From — city or location" value={origin} onPick={(l) => setOriginId(l.id)} onClear={() => setOriginId(null)} />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      aria-label="Swap origin and destination"
                      onClick={() => {
                        setOriginId(destId);
                        setDestId(originId);
                      }}
                      className="p-1.5 rounded-lg bg-white/[0.06] text-white/60 hover:text-white"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </div>
                  <LocationSearch placeholder="To — city or location" value={dest} onPick={(l) => setDestId(l.id)} onClear={() => setDestId(null)} />
                </div>

                {!path ? (
                  <p className="text-sm text-white/55">
                    Choose two locations — search above or tap points on the map. We&apos;ll identify nearby locations that could link them.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { v: km(path.directKm), l: 'Direct' },
                        { v: km(path.pathKm), l: 'Via stops' },
                        { v: String(path.stops.length), l: 'Stops' },
                      ].map((s) => (
                        <div key={s.l} className="rounded-xl bg-white/[0.04] border border-white/10 py-2.5">
                          <div className="text-base font-black">{s.v}</div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">{s.l}</div>
                        </div>
                      ))}
                    </div>

                    <ol className="space-y-0.5">
                      {path.stops.map((s, i) => {
                        const hop = path.hops[i - 1];
                        return (
                          <li key={s.id}>
                            {hop && (
                              <div className={`pl-9 py-0.5 text-[11px] font-mono ${hop.exceedsRadius ? 'text-amber-400' : 'text-white/35'}`}>
                                {km(hop.distanceKm)}
                                {hop.exceedsRadius && ` · beyond ${radius} km — no mapped location in between`}
                              </div>
                            )}
                            <button
                              type="button"
                              onMouseEnter={() => setHoveredId(s.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              onClick={() => focusOn([s.id])}
                              className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/[0.05] text-left"
                            >
                              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-[#141414] text-[11px] font-black flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold truncate">{s.name}</span>
                                <span className="block text-[11px] text-white/45 truncate">
                                  {s.state}
                                  {s.chasehorseHub ? ' · Chasehorse hub' : ''}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>

                    {path.corridor.length > 0 && (
                      <div className="rounded-xl bg-white/[0.04] border border-white/10">
                        <button
                          type="button"
                          onClick={() => setShowCorridor((v) => !v)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold"
                        >
                          <span>{path.corridor.length} more locations within {radius} km of the path</span>
                          <span className="text-white/40 text-xs">{showCorridor ? 'Hide' : 'Show'}</span>
                        </button>
                        {showCorridor && (
                          <ul className="px-3 pb-3 space-y-1">
                            {path.corridor.map(({ location: l }) => (
                              <li key={l.id} className="flex items-center justify-between text-xs">
                                <span className="text-white/80 truncate">{l.name}</span>
                                <span className="text-white/40 shrink-0 ml-2">{KIND_LABELS[l.kinds[0]]}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <p className="flex gap-2 text-[11px] text-white/45 leading-relaxed">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      Potential path identified from geographic proximity between mapped locations. It is not an existing Chasehorse route or a
                      confirmed service.
                    </p>
                    {path.hops.some((h) => h.exceedsRadius) && (
                      <p className="flex gap-2 text-[11px] text-amber-400/90 leading-relaxed">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        Some hops are longer than {radius} km — coverage there would need to be planned with our team.
                      </p>
                    )}

                    <a
                      href={enquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#FF4D16] hover:bg-[#E53E0B] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" /> Enquire about this corridor
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
