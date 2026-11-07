import { geoConicEquidistant } from 'd3-geo';

/**
 * Projection that matches INDIA_MAP_OUTLINE_PATH (viewBox 0 0 600 660).
 * Calibrated against the outline's geographic extremes (Kutch, Arunachal, Kashmir,
 * Kanyakumari, Indira Point) — ~1px RMS error — so real lat/lng plot accurately on it.
 */
const projection = geoConicEquidistant()
  .parallels([12, 28])
  .rotate([-82, 0])
  .scale(1144.965668773719)
  .translate([290.12363310217626, 495.41070222478504]);

export const projectLatLng = (lat: number, lng: number): [number, number] => {
  const p = projection([lng, lat]);
  return p ? [p[0], p[1]] : [0, 0];
};

/** Approximate map units per km around a latitude (for drawing proximity radii). */
export const unitsPerKm = (lat: number, lng: number) => {
  const [, y1] = projectLatLng(lat, lng);
  const [, y2] = projectLatLng(lat + 1 / 111.2, lng);
  return Math.abs(y1 - y2);
};
