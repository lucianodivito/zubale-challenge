const CATEGORIES = ['Audit', 'Inventory', 'Cleaning', 'Delivery', 'Restock'] as const;

export type TaskCategory = (typeof CATEGORIES)[number];

export const ALL_CATEGORIES: readonly TaskCategory[] = CATEGORIES;

export function assignCategory(index: number): TaskCategory {
  return CATEGORIES[index % CATEGORIES.length];
}

const CARD_HEIGHTS = [150, 200, 250] as const;

export function getCardImageHeight(index: number): number {
  return CARD_HEIGHTS[index % CARD_HEIGHTS.length];
}

const DEG_TO_RAD = Math.PI / 180;
const EARTH_RADIUS_KM = 6371;

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = (lat2 - lat1) * DEG_TO_RAD;
  const dLng = (lng2 - lng1) * DEG_TO_RAD;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * DEG_TO_RAD) *
      Math.cos(lat2 * DEG_TO_RAD) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(EARTH_RADIUS_KM * c * 10) / 10;
}

const REFERENCE_POINT = {lat: 19.4326, lng: -99.1332};

export function getDistanceFromReference(lat: number, lng: number): number {
  return calculateDistance(
    REFERENCE_POINT.lat,
    REFERENCE_POINT.lng,
    lat,
    lng,
  );
}
