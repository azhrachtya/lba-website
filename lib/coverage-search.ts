import cityReference from './coverage-cities.json';
import { coverageLocations, mapRegions } from './coverage-map';
import type { CoverageLocation } from './coverage-map';
import type { Lang } from './i18n';

export type SearchAnchor = { name: string; coordinates: [number, number] };
export type NearbyLocation = { location: CoverageLocation; distance: number };

export function normalizeLocationName(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
    .replace(/[.,()—-]/g, ' ').replace(/\s+/g, ' ').trim();
}

const cityAliases: Record<string, string[]> = {
  yogyakarta: ['Jogja', 'Jogjakarta', 'Yogya'],
  surakarta: ['Solo'],
  makassar: ['Ujung Pandang'],
  denpasar: ['Bali'],
  mataram: ['Lombok'],
  pakalongan: ['Pekalongan'],
  perabumulih: ['Prabumulih'],
  bandjarmasin: ['Banjarmasin'],
};

const anchors: (SearchAnchor & { aliases: string[] })[] = [
  ...cityReference.cities.map(city => ({
    name: city.name,
    coordinates: city.coordinates as [number, number],
    aliases: [...city.aliases.flatMap(alias => alias.split(/[|;]/)), ...(cityAliases[normalizeLocationName(city.name)] || [])],
  })),
  ...coverageLocations.map(location => ({ name: location.name, coordinates: location.coordinates, aliases: [location.city, location.officeCity || '', location.project?.name || ''] })),
  ...mapRegions.map(region => ({ name: region.name.en, coordinates: region.center, aliases: [region.name.id, region.name.zh] })),
];

function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const diagonal = previous;
      previous = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + Number(a[i - 1] !== b[j - 1]));
    }
  }
  return row[b.length];
}

function nameScore(value: string, query: string): number {
  const name = normalizeLocationName(value);
  if (!name) return 0;
  if (name === query) return 100;
  if (name.replace(/\s/g, '') === query.replace(/\s/g, '')) return 98;
  if (name.startsWith(query)) return 75;
  if (name.includes(query)) return 55;
  if (query.length >= 4 && Math.abs(name.length - query.length) <= 2) {
    const distance = editDistance(name, query);
    if (distance <= (query.length >= 7 ? 2 : 1)) return 35 - distance;
  }
  return 0;
}

export function searchCoverage(query: string, lang: Lang): { matches: CoverageLocation[]; anchor: SearchAnchor | null } {
  const needle = normalizeLocationName(query);
  if (!needle) return { matches: coverageLocations, anchor: null };
  const matches = coverageLocations.filter(location => {
    const region = mapRegions.find(item => item.id === location.region)!;
    return normalizeLocationName(`${location.name} ${location.city} ${location.officeCity || ''} ${location.project?.name || ''} ${region.name[lang]}`).includes(needle);
  });
  if (needle.length < 2) return { matches, anchor: null };

  let best: SearchAnchor | null = null;
  let bestScore = 0;
  for (const anchor of anchors) {
    // Prefer a named city over a port whose city merely matches the query.
    const score = Math.max(nameScore(anchor.name, needle), ...anchor.aliases.map(alias => nameScore(alias, needle) * .95));
    if (score > bestScore) { bestScore = score; best = { name: anchor.name, coordinates: anchor.coordinates }; }
  }
  return { matches, anchor: best };
}

/** Great-circle distance in km, used to rank the existing LBA network. */
export function distanceKm(from: [number, number], to: [number, number]): number {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const dLat = radians(to[1] - from[1]);
  const dLon = radians(to[0] - from[0]);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(from[1])) * Math.cos(radians(to[1])) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}

export function nearestCoverageLocations(anchor: SearchAnchor, excludedIds: string[] = [], limit = 4): NearbyLocation[] {
  const excluded = new Set(excludedIds);
  return coverageLocations.filter(location => !excluded.has(location.id))
    .map(location => ({ location, distance: distanceKm(anchor.coordinates, location.coordinates) }))
    .sort((a, b) => a.distance - b.distance || a.location.name.localeCompare(b.location.name))
    .slice(0, limit);
}
