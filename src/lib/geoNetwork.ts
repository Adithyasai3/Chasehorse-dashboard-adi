// ============================================================================
// Reusable geographic proximity + potential-path logic for the logistics network.
// All distances are great-circle (haversine) kilometres on real coordinates.
// ============================================================================
import type { LogisticsLocation, LocationKind } from '../data/logisticsLocations';

const EARTH_RADIUS_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180;

/** Great-circle distance between two lat/lng points, in km. */
export const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
};

/** Shortest distance (km) from point p to the segment a→b, using a local equirectangular plane. */
const distanceToSegmentKm = (
  p: { lat: number; lng: number },
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => {
  const lat0 = toRad((a.lat + b.lat) / 2);
  const project = (q: { lat: number; lng: number }) => [toRad(q.lng) * Math.cos(lat0) * EARTH_RADIUS_KM, toRad(q.lat) * EARTH_RADIUS_KM];
  const [px, py] = project(p);
  const [ax, ay] = project(a);
  const [bx, by] = project(b);
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};

export interface NearbyResult {
  location: LogisticsLocation;
  distanceKm: number;
}

/** Locations within `radiusKm` of `origin` (excluding itself), nearest first, optionally limited to some kinds. */
export const findNearby = (
  origin: LogisticsLocation,
  all: LogisticsLocation[],
  radiusKm = 50,
  kinds?: LocationKind[]
): NearbyResult[] =>
  all
    .filter((l) => l.id !== origin.id && (!kinds || l.kinds.some((k) => kinds.includes(k))))
    .map((l) => ({ location: l, distanceKm: haversineKm(origin, l) }))
    .filter((r) => r.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

export interface PathHop {
  from: LogisticsLocation;
  to: LogisticsLocation;
  distanceKm: number;
  /** True when this hop is longer than the proximity radius (no known location in between). */
  exceedsRadius: boolean;
}

export interface PotentialPath {
  stops: LogisticsLocation[];
  hops: PathHop[];
  directKm: number;
  pathKm: number;
  /** Relevant locations within `radiusKm` of any stop (excluding the stops themselves). */
  corridor: NearbyResult[];
}

/**
 * Identifies a potential path between two locations by chaining nearby locations.
 *
 * Candidates are limited to a corridor around the direct line. Hops are weighted by
 * distance², which prefers several short proximity hops (≈ the radius) over one long jump,
 * so the result follows real nearby locations. Hops longer than `radiusKm` are flagged.
 * This path is computed for the client — it is NOT drawn as a line on the map.
 */
export const findPotentialPath = (
  origin: LogisticsLocation,
  destination: LogisticsLocation,
  all: LogisticsLocation[],
  radiusKm = 50,
  corridorKinds?: LocationKind[]
): PotentialPath => {
  const directKm = haversineKm(origin, destination);
  const corridorWidth = Math.max(radiusKm, directKm * 0.18);

  const candidates = all.filter(
    (l) => l.id === origin.id || l.id === destination.id || distanceToSegmentKm(l, origin, destination) <= corridorWidth
  );

  // Dijkstra over the complete candidate graph with cost = distance²
  const n = candidates.length;
  const startIdx = candidates.findIndex((l) => l.id === origin.id);
  const endIdx = candidates.findIndex((l) => l.id === destination.id);
  const cost = new Array<number>(n).fill(Infinity);
  const prev = new Array<number>(n).fill(-1);
  const done = new Array<boolean>(n).fill(false);
  cost[startIdx] = 0;

  for (let iter = 0; iter < n; iter++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!done[i] && (u === -1 || cost[i] < cost[u])) u = i;
    if (u === -1 || cost[u] === Infinity || u === endIdx) break;
    done[u] = true;
    for (let v = 0; v < n; v++) {
      if (done[v]) continue;
      const d = haversineKm(candidates[u], candidates[v]);
      const c = cost[u] + d * d;
      if (c < cost[v]) {
        cost[v] = c;
        prev[v] = u;
      }
    }
  }

  const order: number[] = [];
  for (let i = endIdx; i !== -1; i = prev[i]) order.unshift(i);
  const stops = order.map((i) => candidates[i]);

  const hops: PathHop[] = stops.slice(1).map((to, i) => {
    const distanceKm = haversineKm(stops[i], to);
    return { from: stops[i], to, distanceKm, exceedsRadius: distanceKm > radiusKm };
  });

  const stopIds = new Set(stops.map((s) => s.id));
  const corridorMap = new Map<string, NearbyResult>();
  stops.forEach((s) =>
    findNearby(s, all, radiusKm, corridorKinds).forEach((r) => {
      if (stopIds.has(r.location.id)) return;
      const existing = corridorMap.get(r.location.id);
      if (!existing || r.distanceKm < existing.distanceKm) corridorMap.set(r.location.id, r);
    })
  );

  return {
    stops,
    hops,
    directKm,
    pathKm: hops.reduce((sum, h) => sum + h.distanceKm, 0),
    corridor: [...corridorMap.values()].sort((a, b) => a.distanceKm - b.distanceKm),
  };
};
