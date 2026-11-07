import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';
import { INDIA_MAP_OUTLINE_PATH } from '../../../data/indiaPathData';
import type { LogisticsLocation } from '../../../data/logisticsLocations';
import { projectLatLng, unitsPerKm } from '../../../components/maps/indiaProjection';

const FULL = { x: 0, y: 0, w: 600, h: 660 };
const ASPECT = FULL.h / FULL.w;
const MIN_W = 40;

export type ViewBox = typeof FULL;

export interface MapHighlight {
  /** Selected location (explore mode). */
  selectedId?: string | null;
  /** Locations to emphasise (nearby results / corridor). */
  emphasisIds?: Set<string>;
  /** Ordered potential-path stops — shown as numbered points (never joined by lines). */
  stopIds?: string[];
  /** Proximity radius drawn around the selected location, in km. */
  radiusKm?: number;
  /** Locations matching the client requirement (others are dimmed). */
  relevantIds?: Set<string>;
}

interface NetworkMapProps extends MapHighlight {
  locations: LogisticsLocation[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (loc: LogisticsLocation) => void;
  /** When this changes, the map animates to fit these locations. */
  focus: { key: string; ids: string[] } | null;
}

const REGIONS: { label: string; bbox?: [number, number, number, number] }[] = [
  { label: 'All India' },
  { label: 'North', bbox: [26, 73, 33, 80.5] },
  { label: 'West', bbox: [18, 68.5, 24.6, 76] },
  { label: 'Central', bbox: [20.5, 74.5, 27, 84] },
  { label: 'South', bbox: [8, 74, 17.6, 81.5] },
  { label: 'East', bbox: [19, 83, 27, 89] },
  { label: 'North-East', bbox: [23, 89.5, 28.5, 97.5] },
];

/** Fit a viewBox around projected points, keeping the map's aspect ratio. */
const fitBox = (pts: [number, number][], padUnits = 25): ViewBox => {
  if (pts.length === 0) return FULL;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  pts.forEach(([x, y]) => {
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  });
  let w = Math.max(x1 - x0 + padUnits * 2, MIN_W * 1.6);
  let h = Math.max(y1 - y0 + padUnits * 2, w * ASPECT);
  w = Math.max(w, h / ASPECT);
  h = w * ASPECT;
  return clampBox({ x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h });
};

const clampBox = (b: ViewBox): ViewBox => {
  const w = Math.min(FULL.w, Math.max(MIN_W, b.w));
  const h = w * ASPECT;
  const x = Math.min(FULL.w - w * 0.25, Math.max(-w * 0.75, b.x));
  const y = Math.min(FULL.h - h * 0.25, Math.max(-h * 0.75, b.y));
  return { x, y, w, h };
};

export const NetworkMap: React.FC<NetworkMapProps> = ({
  locations,
  hoveredId,
  onHover,
  onSelect,
  focus,
  selectedId,
  emphasisIds,
  stopIds,
  radiusKm,
  relevantIds,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<ViewBox>(FULL);
  const [region, setRegion] = useState('All India');
  const drag = useRef<{ x: number; y: number; box: ViewBox; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const projected = useMemo(
    () => new Map(locations.map((l) => [l.id, projectLatLng(l.lat, l.lng)] as const)),
    [locations]
  );

  // Fit to the requested locations whenever the focus key changes
  useEffect(() => {
    if (!focus) return;
    const pts = focus.ids.map((id) => projected.get(id)).filter(Boolean) as [number, number][];
    const sel = selectedId ? locations.find((l) => l.id === selectedId) : undefined;
    const ringPad = sel && radiusKm && focus.ids.includes(sel.id) ? radiusKm * unitsPerKm(sel.lat, sel.lng) * 1.35 : 0;
    if (pts.length) setBox(fitBox(pts, Math.max(pts.length === 1 ? 45 : 25, ringPad)));
  }, [focus?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Screen px → map units
  const toMap = useCallback(
    (clientX: number, clientY: number, b: ViewBox) => {
      const rect = svgRef.current!.getBoundingClientRect();
      return [b.x + ((clientX - rect.left) / rect.width) * b.w, b.y + ((clientY - rect.top) / rect.height) * b.h];
    },
    []
  );

  const zoomAt = useCallback((factor: number, cx?: number, cy?: number) => {
    setBox((b) => {
      const px = cx ?? b.x + b.w / 2;
      const py = cy ?? b.y + b.h / 2;
      const w = Math.min(FULL.w, Math.max(MIN_W, b.w / factor));
      const h = w * ASPECT;
      return clampBox({ x: px - ((px - b.x) / b.w) * w, y: py - ((py - b.y) / b.h) * h, w, h });
    });
  }, []);

  // Wheel zoom (non-passive so the page doesn't scroll while zooming the map)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setBox((b) => {
        const [mx, my] = toMap(e.clientX, e.clientY, b);
        const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
        const w = Math.min(FULL.w, Math.max(MIN_W, b.w / factor));
        const h = w * ASPECT;
        return clampBox({ x: mx - ((mx - b.x) / b.w) * w, y: my - ((my - b.y) / b.h) * h, w, h });
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [toMap]);

  const onPointerDown = (e: React.PointerEvent) => {
    justDragged.current = false;
    drag.current = { x: e.clientX, y: e.clientY, box, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const dx = ((e.clientX - d.x) / rect.width) * d.box.w;
    const dy = ((e.clientY - d.y) / rect.height) * d.box.h;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 4) return;
    if (!d.moved) {
      d.moved = true;
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    }
    setBox(clampBox({ ...d.box, x: d.box.x - dx, y: d.box.y - dy }));
  };
  const onPointerUp = () => {
    if (drag.current?.moved) justDragged.current = true;
    drag.current = null;
  };

  const goRegion = (r: (typeof REGIONS)[number]) => {
    setRegion(r.label);
    if (!r.bbox) return setBox(FULL);
    const [la0, lo0, la1, lo1] = r.bbox;
    setBox(fitBox([projectLatLng(la0, lo0), projectLatLng(la1, lo1), projectLatLng(la0, lo1), projectLatLng(la1, lo0)], 5));
  };

  // Everything is sized relative to the current zoom so points stay the same size on screen
  const s = box.w / FULL.w;
  const zoom = 1 / s;
  const stopIndex = useMemo(() => new Map((stopIds ?? []).map((id, i) => [id, i + 1])), [stopIds]);
  const hasFocus = Boolean(selectedId || (stopIds && stopIds.length));
  const selected = selectedId ? locations.find((l) => l.id === selectedId) : undefined;

  // Draw order: dim → normal → emphasised → stops → selected/hovered on top
  const ordered = useMemo(() => {
    const rank = (l: LogisticsLocation) =>
      l.id === selectedId || l.id === hoveredId ? 5 : stopIndex.has(l.id) ? 4 : emphasisIds?.has(l.id) ? 3 : l.chasehorseHub ? 2 : 1;
    return [...locations].sort((a, b) => rank(a) - rank(b));
  }, [locations, selectedId, hoveredId, stopIndex, emphasisIds]);

  return (
    <div className="relative w-full h-full select-none">
      {/* Region shortcuts */}
      <div className="absolute top-3 left-3 right-14 z-10 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {REGIONS.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => goRegion(r)}
            className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              region === r.label ? 'bg-white text-[#141414]' : 'bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col rounded-lg overflow-hidden border border-white/10 bg-[#141414]/90">
        <button type="button" aria-label="Zoom in" onClick={() => zoomAt(1.5)} className="p-2 text-white/80 hover:bg-white/10 hover:text-white">
          <Plus className="w-4 h-4" />
        </button>
        <button type="button" aria-label="Zoom out" onClick={() => zoomAt(1 / 1.5)} className="p-2 text-white/80 hover:bg-white/10 hover:text-white border-y border-white/10">
          <Minus className="w-4 h-4" />
        </button>
        <button type="button" aria-label="Reset view" onClick={() => goRegion(REGIONS[0])} className="p-2 text-white/80 hover:bg-white/10 hover:text-white">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
        className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="img"
        aria-label="Map of India showing logistics locations as points"
      >
        <defs>
          <pattern id="lnDots" width={5 * s} height={5 * s} patternUnits="userSpaceOnUse">
            <circle cx={2.5 * s} cy={2.5 * s} r={0.85 * s} fill="rgba(255,255,255,0.22)" />
          </pattern>
          <radialGradient id="lnGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="rgba(255,77,22,0.10)" />
            <stop offset="100%" stopColor="rgba(255,77,22,0)" />
          </radialGradient>
        </defs>

        {/* Dotted India */}
        <rect x={-600} y={-660} width={1800} height={1980} fill="url(#lnGlow)" />
        <path d={INDIA_MAP_OUTLINE_PATH} fill="url(#lnDots)" />
        <path d={INDIA_MAP_OUTLINE_PATH} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={0.8 * s} />

        {/* Proximity radius around the selected location (a range ring, not a route) */}
        {selected && radiusKm ? (
          <circle
            cx={projected.get(selected.id)![0]}
            cy={projected.get(selected.id)![1]}
            r={radiusKm * unitsPerKm(selected.lat, selected.lng)}
            fill="rgba(255,77,22,0.07)"
            stroke="rgba(255,122,77,0.55)"
            strokeWidth={1 * s}
            strokeDasharray={`${3 * s} ${3 * s}`}
          />
        ) : null}

        {/* Points */}
        {ordered.map((l) => {
          const [x, y] = projected.get(l.id)!;
          const isSel = l.id === selectedId;
          const isHover = l.id === hoveredId;
          const stopNo = stopIndex.get(l.id);
          const isEmph = emphasisIds?.has(l.id);
          const relevant = !relevantIds || relevantIds.has(l.id);
          const dim = (hasFocus && !isSel && !stopNo && !isEmph && !isHover) || !relevant;

          const base = l.chasehorseHub ? 4.2 : l.kinds.includes('metro') ? 3.2 : 2.3;
          const r = (stopNo ? base + 3 : isSel ? base + 1.6 : isEmph || isHover ? base + 0.8 : base) * s;
          const showLabel =
            isSel || isHover || Boolean(stopNo) || (isEmph && zoom >= 2.2) || (l.chasehorseHub && !hasFocus) || (zoom >= 3.5 && !dim);

          return (
            <g
              key={l.id}
              className="cursor-pointer"
              onPointerEnter={() => onHover(l.id)}
              onPointerLeave={() => onHover(null)}
              onClick={() => {
                if (!justDragged.current) onSelect(l);
              }}
            >
              {/* larger invisible hit area */}
              <circle cx={x} cy={y} r={Math.max(r * 2.2, 5 * s)} fill="transparent" />
              {(l.chasehorseHub || isSel || stopNo) && (
                <circle cx={x} cy={y} r={r * 2} fill="none" stroke={stopNo ? '#FFFFFF' : '#FF4D16'} strokeOpacity={dim ? 0.15 : 0.45} strokeWidth={0.8 * s} />
              )}
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={stopNo ? '#FFFFFF' : isSel || isEmph || isHover ? '#FF7A4D' : '#FF4D16'}
                fillOpacity={dim ? 0.18 : stopNo || isSel || isEmph || isHover || l.chasehorseHub ? 1 : 0.75}
                stroke={stopNo ? '#FF4D16' : 'none'}
                strokeWidth={stopNo ? 1.4 * s : 0}
              />
              {stopNo !== undefined && (
                <text x={x} y={y + 2.6 * s} textAnchor="middle" fontSize={7.5 * s} fontWeight={800} fill="#141414" className="pointer-events-none">
                  {stopNo}
                </text>
              )}
              {showLabel && (
                <text
                  x={x + r + 3 * s}
                  y={y + 3.4 * s}
                  fontSize={(isSel || isHover ? 10.5 : 9) * s}
                  fontWeight={isSel || isHover || stopNo ? 700 : 500}
                  fill={dim ? 'rgba(255,255,255,0.35)' : '#FFFFFF'}
                  stroke="#0E0E0E"
                  strokeWidth={3 * s}
                  paintOrder="stroke"
                  className="pointer-events-none"
                >
                  {l.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3 py-2 rounded-lg bg-[#141414]/90 border border-white/10 text-[10.5px] text-white/70">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D16] ring-2 ring-[#FF4D16]/40" /> Chasehorse hub
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF4D16]/75" /> Potential location
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#FF4D16]" /> Path stop
        </span>
      </div>
    </div>
  );
};
