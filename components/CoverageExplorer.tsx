"use client";

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { useLang } from './LangProvider';
import { defaultOffices } from '@/lib/defaults';
import geography from '@/lib/coverage-geography.json';
import { coverageLocations, mapCopy, mapRegions, projectCoordinates } from '@/lib/coverage-map';
import type { CoverageLocation, LocationType, RegionId } from '@/lib/coverage-map';
import { nearestCoverageLocations, searchCoverage } from '@/lib/coverage-search';

type View = { scale: number; x: number; y: number };
type Office = { city: string; type?: string; address?: string; phone?: string; whatsapp?: string; email?: string };
type Filter = LocationType | 'all';
const WIDTH = 1122;
const HEIGHT = 470;
const INITIAL_VIEW: View = { scale: 1, x: 0, y: 0 };
const colors: Record<LocationType, string> = { office: '#ff666e', destination: '#f5c75c', project: '#63dfcb' };
const labelPositions = [
  { key: 'sumatra', x: 171, y: 200 }, { key: 'java', x: 345, y: 362 },
  { key: 'kalimantan', x: 441, y: 147 }, { key: 'sulawesi', x: 655, y: 123 },
  { key: 'bali', x: 573, y: 416 }, { key: 'maluku', x: 786, y: 262 }, { key: 'papua', x: 971, y: 192 },
] as const;

function clampView(view: View): View {
  const scale = Math.max(1, Math.min(6, view.scale));
  return { scale, x: Math.max(WIDTH * (1 - scale) - 35, Math.min(35, view.x)), y: Math.max(HEIGHT * (1 - scale) - 35, Math.min(35, view.y)) };
}

function Icon({ name, className = '' }: { name: 'search' | 'pin' | 'arrow' | 'reset' | 'close' | 'globe'; className?: string }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    reset: <path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  };
  return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function CoverageExplorer({ offices = defaultOffices }: { offices?: Office[] }) {
  const { t, lang } = useLang();
  const copy = mapCopy[lang];
  const uniqueId = useId().replace(/:/g, '');
  const [region, setRegion] = useState<RegionId | 'all'>('all');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('tanjung-priok');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [view, setView] = useState<View>(INITIAL_VIEW);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapUnit, setMapUnit] = useState(1.5);
  // Keep markers, hit areas, and tooltips readable at every screen width.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const bounds = svg.getBoundingClientRect();
      const ratio = Math.min(bounds.width / WIDTH, bounds.height / HEIGHT);
      if (ratio > 0) setMapUnit(1 / ratio);
    };
    const observer = new ResizeObserver(update);
    observer.observe(svg);
    update();
    return () => observer.disconnect();
  }, []);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ start: { x: number; y: number }; view: View; distance: number; moved: boolean; location?: string; region?: RegionId } | null>(null);
  const search = useMemo(() => searchCoverage(query, lang), [query, lang]);
  const visible = useMemo(() => search.matches.filter(location =>
    (region === 'all' || location.region === region) && (filter === 'all' || location.type === filter)), [search.matches, region, filter]);
  // Suggest nearby places only when the search has no match in the LBA network.
  // Category and region filters must not make an existing place look missing.
  const nearby = useMemo(() => search.anchor && search.matches.length === 0
    ? nearestCoverageLocations(search.anchor) : [], [search.anchor, search.matches]);
  const selected = coverageLocations.find(location => location.id === selectedId);
  const mapLocations = useMemo(() => [...new Map([
    ...visible, ...nearby.map(item => item.location), ...(selected ? [selected] : []),
  ].map(location => [location.id, location])).values()], [visible, nearby, selected]);
  const hovered = mapLocations.find(location => location.id === hoveredId);
  const anchorLongitude = search.anchor?.coordinates[0];
  const anchorLatitude = search.anchor?.coordinates[1];
  useEffect(() => {
    if (anchorLongitude === undefined || anchorLatitude === undefined) return;
    const [x, y] = projectCoordinates([anchorLongitude, anchorLatitude]);
    const scale = 2.8;
    setView(clampView({ scale, x: WIDTH / 2 - x * scale, y: HEIGHT / 2 - y * scale }));
  }, [anchorLongitude, anchorLatitude]);
  const activeRegion = mapRegions.find(r => r.id === region);
  const selectedOffice = selected?.officeCity ? offices.find(office => office.city.toLowerCase() === selected.officeCity?.toLowerCase()) : undefined;
  const primaryOffice = offices.find(office => office.type === 'head') || offices.find(office => office.city.toLowerCase() === 'jakarta') || offices[0];
  const whatsapp = (selectedOffice?.whatsapp || primaryOffice?.whatsapp || '').replace(/\D/g, '');
  const regionName = (id: RegionId) => mapRegions.find(r => r.id === id)!.name[lang];

  function zoom(factor: number) {
    setView(previous => {
      const scale = Math.max(1, Math.min(6, previous.scale * factor));
      const ratio = scale / previous.scale;
      return clampView({ scale, x: WIDTH / 2 - (WIDTH / 2 - previous.x) * ratio, y: HEIGHT / 2 - (HEIGHT / 2 - previous.y) * ratio });
    });
  }
  function selectRegion(id: RegionId | 'all') {
    setRegion(id); setSelectedId(null); setHoveredId(null);
    if (id === 'all') return setView(INITIAL_VIEW);
    const item = mapRegions.find(r => r.id === id)!;
    const [x, y] = projectCoordinates(item.center);
    setView(clampView({ scale: item.zoom, x: WIDTH / 2 - x * item.zoom, y: HEIGHT / 2 - y * item.zoom }));
  }
  function selectLocation(location: CoverageLocation, focus = true) {
    setSelectedId(location.id); setHoveredId(null);
    if (focus) {
      const [x, y] = projectCoordinates(location.coordinates);
      const scale = Math.max(view.scale, 3.5);
      setView(clampView({ scale, x: WIDTH / 2 - x * scale, y: HEIGHT / 2 - y * scale }));
    }
  }
  function clearFilters() {
    setRegion('all'); setFilter('all'); setQuery(''); setSelectedId(null); setHoveredId(null); setView(INITIAL_VIEW);
  }
  function point(event: PointerEvent<SVGSVGElement>) {
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return { x: event.clientX, y: event.clientY };
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    return { x: p.x, y: p.y };
  }
  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    const p = point(event);
    pointers.current.set(event.pointerId, p);
    const target = event.target as Element;
    svgRef.current?.setPointerCapture(event.pointerId);
    const values = [...pointers.current.values()];
    if (values.length === 2) {
      const [a, b] = values;
      gesture.current = { start: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, view, distance: Math.hypot(a.x - b.x, a.y - b.y), moved: true };
    } else gesture.current = { start: p, view, distance: 0, moved: false, location: target.closest('[data-map-location]')?.getAttribute('data-map-location') || undefined, region: target.closest('[data-map-region]')?.getAttribute('data-map-region') as RegionId | undefined };
  }
  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return;
    pointers.current.set(event.pointerId, point(event));
    const values = [...pointers.current.values()];
    const current = gesture.current;
    if (values.length === 2 && current.distance) {
      const [a, b] = values;
      const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const scale = Math.max(1, Math.min(6, current.view.scale * Math.hypot(a.x - b.x, a.y - b.y) / current.distance));
      const ratio = scale / current.view.scale;
      setView(clampView({ scale, x: midpoint.x - (current.start.x - current.view.x) * ratio, y: midpoint.y - (current.start.y - current.view.y) * ratio }));
      setDragging(true);
    } else if (values.length === 1) {
      const dx = values[0].x - current.start.x;
      const dy = values[0].y - current.start.y;
      if (Math.hypot(dx, dy) > 6) { current.moved = true; setDragging(true); setHoveredId(null); }
      if (current.moved) setView(clampView({ ...current.view, x: current.view.x + dx, y: current.view.y + dy }));
    }
  }
  function pointerUp(event: PointerEvent<SVGSVGElement>) {
    const current = gesture.current;
    pointers.current.delete(event.pointerId);
    if (svgRef.current?.hasPointerCapture(event.pointerId)) svgRef.current.releasePointerCapture(event.pointerId);
    if (current && !current.moved) {
      const location = mapLocations.find(item => item.id === current.location);
      if (location) selectLocation(location, false);
      else if (current.region) selectRegion(current.region);
    }
    if (pointers.current.size === 1) gesture.current = { start: [...pointers.current.values()][0], view, distance: 0, moved: true };
    else { gesture.current = null; setDragging(false); }
  }
  function mapKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    if (event.target !== event.currentTarget) return;
    const movements: Record<string, [number, number]> = { ArrowLeft: [55, 0], ArrowRight: [-55, 0], ArrowUp: [0, 55], ArrowDown: [0, -55] };
    if (movements[event.key]) {
      event.preventDefault(); const [dx, dy] = movements[event.key];
      setView(previous => clampView({ ...previous, x: previous.x + dx, y: previous.y + dy }));
    } else if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1.35); }
    else if (event.key === '-') { event.preventDefault(); zoom(1 / 1.35); }
    else if (event.key === 'Home') { event.preventDefault(); setView(INITIAL_VIEW); }
  }
  const filters: { id: Filter; label: string; color?: string }[] = [
    { id: 'all', label: copy.all }, { id: 'office', label: copy.office, color: colors.office },
    { id: 'destination', label: copy.destination, color: colors.destination }, { id: 'project', label: copy.project, color: colors.project },
  ];

  return (
    <section id="coverage" className="coverage-section bg-map-blue py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="coverage-eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-sky-300" />{t.coverage.tag}</span>
            <h2 className="mt-4 max-w-xl font-head text-3xl font-bold leading-tight text-white md:text-4xl">{t.coverage.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">{copy.instruction}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-sky-200"><Icon name="globe" />{copy.network}</div>
        </div>
        <div className="coverage-explorer mt-8 overflow-hidden rounded-3xl border border-white/15">
          <div className="coverage-toolbar flex flex-wrap items-center gap-3 border-b border-white/10 p-4 md:px-5">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={copy.locations}>
              {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setSelectedId(null); setHoveredId(null); }} className={`coverage-filter ${filter === item.id ? 'is-active' : ''}`}>
                {item.color && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />}{item.label}
              </button>)}
            </div>
            <div className="relative min-w-0 flex-1 basis-52 md:ml-auto md:max-w-64">
              <Icon name="search" className="pointer-events-none absolute left-3 top-3 text-slate-400" />
              <label className="sr-only" htmlFor={`${uniqueId}-search`}>{copy.search}</label>
              <input id={`${uniqueId}-search`} type="search" value={query} onChange={event => { setQuery(event.target.value); setSelectedId(null); setHoveredId(null); if (!event.target.value.trim()) setView(INITIAL_VIEW); }} placeholder={copy.search} aria-describedby={nearby.length ? `${uniqueId}-nearby-title` : undefined} className="coverage-search w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-400" />
            </div>
          </div>
          <div className="coverage-content grid lg:grid-cols-[minmax(0,1fr)_310px]">
            <div className="coverage-map-column min-w-0">
              <div className="flex flex-wrap gap-2 border-b border-white/10 p-4" role="group" aria-label={copy.regions}>
                <button type="button" className={`coverage-region-chip ${region === 'all' ? 'is-active' : ''}`} aria-pressed={region === 'all'} onClick={() => selectRegion('all')}>{copy.everywhere}</button>
                {mapRegions.map(item => <button key={item.id} type="button" className={`coverage-region-chip ${region === item.id ? 'is-active' : ''}`} aria-pressed={region === item.id} onClick={() => selectRegion(item.id)}>{item.name[lang]}</button>)}
              </div>
              <div className={`coverage-map relative h-[330px] overflow-hidden sm:h-[420px] lg:h-[470px] ${dragging ? 'is-dragging' : ''}`}>
                <div className="pointer-events-none absolute left-5 top-5 z-10"><p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{copy.intro}</p><p className="mt-1 text-sm font-semibold text-white">{activeRegion?.name[lang] || copy.everywhere}</p></div>
                <svg ref={svgRef} className="coverage-map-svg h-full w-full" style={{ touchAction: view.scale > 1 ? 'none' : 'pan-y' }} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="group" aria-label={`${copy.intro}. ${copy.keyboard}`} tabIndex={0} onKeyDown={mapKeyDown} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={event => { pointers.current.delete(event.pointerId); gesture.current = null; setDragging(false); }}>
                  <defs>
                    <pattern id={`${uniqueId}-grid`} width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#9aacd0" strokeOpacity=".07" strokeWidth="1" /></pattern>
                    <linearGradient id={`${uniqueId}-land`} x1="0" y1="0" x2="0.5" y2="1"><stop stopColor="#668fba" /><stop offset="1" stopColor="#335378" /></linearGradient>
                  </defs>
                  <rect width={WIDTH} height={HEIGHT} fill={`url(#${uniqueId}-grid)`} />
                  <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
                    <path d={geography.context} fill="#263950" stroke="#354760" strokeWidth=".5" vectorEffect="non-scaling-stroke" aria-hidden="true" />
                    {mapRegions.map(item => <path key={item.id} data-map-region={item.id} d={geography.regions[item.id]} fill={region === item.id ? '#80b9df' : `url(#${uniqueId}-land)`} className="coverage-island" stroke={region === item.id ? '#bbe9ff' : '#7da1c4'} strokeWidth={region === item.id ? 1.3 : .65} vectorEffect="non-scaling-stroke" opacity={region === 'all' || region === item.id ? 1 : .3} role="button" tabIndex={0} aria-label={item.name[lang]} aria-pressed={region === item.id} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); selectRegion(item.id); } }}><title>{item.name[lang]}</title></path>)}
                    {labelPositions.map(label => <text key={label.key} x={label.x} y={label.y} className="coverage-map-label" textAnchor="middle" fontSize={9 * mapUnit / view.scale} fill="#bbd0e6" aria-hidden="true">{copy[label.key]}</text>)}
                    {search.anchor && (() => {
                      const [x, y] = projectCoordinates(search.anchor.coordinates);
                      const unit = mapUnit / view.scale;
                      return <g transform={`translate(${x} ${y})`} pointerEvents="none" aria-hidden="true"><circle r={7 * unit} fill="#15253d" stroke="#fff" strokeWidth={1.5 * unit} strokeDasharray={`${2 * unit} ${2 * unit}`} /><text y={23 * unit} textAnchor="middle" fontSize={11 * unit} fill="#fff" className="coverage-map-label">{search.anchor.name}</text></g>;
                    })()}
                    {[...mapLocations].sort((a, b) => Number(a.id === selectedId) - Number(b.id === selectedId) || Number(a.type === 'office') - Number(b.type === 'office')).map(location => {
                      const [x, y] = projectCoordinates(location.coordinates);
                      const isSelected = selected?.id === location.id;
                      const unit = mapUnit / view.scale;
                      const radius = (location.type === 'office' ? 5.5 : location.type === 'project' ? 4.5 : 3) * unit;
                      return <g key={location.id} data-map-location={location.id} transform={`translate(${x} ${y})`} className={`coverage-pin ${isSelected ? 'is-selected' : ''}`} role="button" tabIndex={0} aria-label={`${location.name}, ${location.city} · ${copy[location.type]}`} aria-pressed={isSelected} onPointerEnter={() => { if (!dragging) setHoveredId(location.id); }} onPointerLeave={() => setHoveredId(null)} onFocus={() => setHoveredId(location.id)} onBlur={() => setHoveredId(null)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); selectLocation(location); } }}>
                        <title>{`${location.name} · ${location.city}`}</title><circle r={12 * unit} fill="transparent" />
                        {(location.type === 'office' || isSelected) && <circle className={isSelected ? 'coverage-pin-halo' : ''} r={(isSelected ? 13 : 10) * unit} fill={colors[location.type]} opacity=".2" />}
                        {isSelected && <circle r={10 * unit} fill="none" stroke={colors[location.type]} strokeWidth={unit} />}
                        {location.type === 'project' ? <rect x={-radius} y={-radius} width={radius * 2} height={radius * 2} rx={1.5 * unit} fill={colors[location.type]} stroke="#12263f" strokeWidth={1.5 * unit} transform="rotate(45)" /> : <circle r={radius} fill={colors[location.type]} stroke="#12263f" strokeWidth={1.5 * unit} />}
                      </g>;
                    })}
                    {hovered && (() => {
                      const [x, y] = projectCoordinates(hovered.coordinates);
                      const width = Math.max(140, hovered.name.length * 7 + 28);
                      const tooltipX = Math.max(width * mapUnit / 2, Math.min(WIDTH - width * mapUnit / 2, x * view.scale + view.x));
                      const tooltipY = Math.max(45 * mapUnit, Math.min(HEIGHT - 15 * mapUnit, y * view.scale + view.y - 15 * mapUnit));
                      return <g transform={`translate(${(tooltipX - view.x) / view.scale} ${(tooltipY - view.y) / view.scale}) scale(${mapUnit / view.scale})`} pointerEvents="none" aria-hidden="true"><rect x={-width / 2} y="-40" width={width} height="46" rx="9" fill="#f8fbff" /><text textAnchor="middle" y="-20" fontSize="13" fontWeight="700" fill="#172b46">{hovered.name}</text><text textAnchor="middle" y="-4" fontSize="10" fill="#64748b">{hovered.city} · {copy.tooltip}</text></g>;
                    })()}
                  </g>
                </svg>
              </div>
              <div className="coverage-map-actions flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                <div className="min-w-0 flex-1 text-[10px] leading-relaxed text-slate-400"><span className="mr-2 font-semibold text-sky-200">{view.scale.toFixed(1)}×</span><span className="hidden sm:inline">{copy.help}</span><span className="sm:hidden">{copy.mobileHelp}</span></div>
                <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/15 bg-white/[.03] p-1">
                  <button type="button" className="coverage-map-control" aria-label={copy.zoomIn} title={copy.zoomIn} disabled={view.scale >= 6} onClick={() => zoom(1.35)}><span className="text-xl">+</span></button>
                  <button type="button" className="coverage-map-control" aria-label={copy.zoomOut} title={copy.zoomOut} disabled={view.scale <= 1} onClick={() => zoom(1 / 1.35)}><span className="text-xl">−</span></button>
                  <span className="mx-1 h-5 w-px bg-white/10" /><button type="button" className="coverage-map-control" aria-label={copy.reset} title={copy.reset} onClick={() => { setView(INITIAL_VIEW); setHoveredId(null); }}><Icon name="reset" /></button>
                </div>
              </div>
              <div className="coverage-map-legend flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-white/10 px-4 py-4 text-[10px] text-slate-400">
                <div className="flex flex-wrap gap-4">{filters.filter(item => item.color).map(item => <span key={item.id} className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 ${item.id === 'project' ? 'rotate-45 rounded-sm' : 'rounded-full'}`} style={{ background: item.color }} />{item.label}</span>)}</div>
                <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200">Natural Earth ↗</a>
              </div>
            </div>
            <aside className="coverage-sidebar min-w-0 border-t border-white/10 p-5 lg:border-l lg:border-t-0" aria-label={copy.locations}>
              {selected ? <div className="coverage-detail rounded-2xl border border-white/15 p-4" key={selected.id}>
                <div className="flex items-center justify-between gap-2"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">{copy.detail}</p><button type="button" className="coverage-close" aria-label={copy.close} onClick={() => setSelectedId(null)}><Icon name="close" /></button></div>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold" style={{ color: colors[selected.type] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[selected.type] }} />{selected.type === 'office' ? (selectedOffice?.type === 'head' || selected.officeCity === 'Jakarta' ? copy.head : copy.branch) : copy[selected.type]}</div>
                <h3 className="mt-2 font-head text-xl font-bold text-white">{selected.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-300"><Icon name="pin" className="h-3 w-3" />{selected.city} · {regionName(selected.region)}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{selected.type === 'office' ? copy.officeDescription : selected.type === 'project' ? copy.projectDescription : copy.destinationDescription}</p>
                {selectedOffice?.address && <div className="mt-3 border-t border-white/10 pt-3"><p className="text-[10px] text-slate-400">{copy.officeAddress}</p><p className="mt-1 text-xs leading-relaxed text-slate-200">{selectedOffice.address}</p></div>}
                {selected.project && <dl className="mt-3 space-y-2 border-t border-white/10 pt-3">{[[copy.projectLabel, selected.project.name], [copy.cargo, selected.project.cargo], [copy.mode, selected.project.mode]].map(([label, value]) => <div key={label}><dt className="text-[10px] text-slate-400">{label}</dt><dd className="mt-0.5 text-xs text-slate-200">{value}</dd></div>)}</dl>}
                <a className="coverage-contact mt-4 flex items-center justify-between gap-2 rounded-xl bg-sky-200 px-3 py-3 text-xs font-semibold text-[#12263f] hover:bg-white" href={whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`${copy.contact}: ${selected.name}, ${selected.city}`)}` : '#contact'} target={whatsapp ? '_blank' : undefined} rel={whatsapp ? 'noopener noreferrer' : undefined}>{copy.contact}<Icon name="arrow" /></a>
                <a className="mt-3 inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedOffice?.address || `${selected.name} ${selected.city} Indonesia`)}`} target="_blank" rel="noopener noreferrer">{copy.maps}<span aria-hidden="true">↗</span></a>
              </div> : <div className="rounded-2xl border border-dashed border-white/15 p-4"><Icon name="pin" className="text-sky-200" /><h3 className="mt-2 text-sm font-semibold text-white">{copy.emptyDetail}</h3><p className="mt-2 text-xs leading-relaxed text-slate-400">{copy.emptyHint}</p></div>}
              <div className="coverage-sidebar-results mt-5 max-h-[28rem] overflow-y-auto pr-2">
                {search.anchor && nearby.length > 0 && <div className="coverage-nearby rounded-2xl border border-white/10 p-3" role="region" aria-label={copy.nearby}>
                  <h3 id={`${uniqueId}-nearby-title`} className="text-xs font-semibold leading-relaxed text-white">{copy.nearestTo} <span className="text-sky-200">{search.anchor.name}</span></h3>
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{copy.nearby} · {copy.allCategories}</p>
                  <div className="mt-3 space-y-2">
                    {nearby.map(({ location, distance }) => <button key={location.id} type="button" className={`coverage-nearby-card flex w-full items-center gap-2.5 rounded-xl border border-white/10 p-3 text-left ${selectedId === location.id ? 'is-active' : ''}`} aria-pressed={selectedId === location.id} onClick={() => selectLocation(location)}>
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: colors[location.type] }} />
                      <span className="min-w-0 flex-1"><span className="block text-xs font-semibold leading-relaxed text-white">{location.name}</span><span className="mt-1 block text-[10px] leading-relaxed text-slate-400">{location.city} · {copy[location.type]}</span></span>
                      <span className="shrink-0 whitespace-nowrap text-[11px] font-semibold text-sky-200">≈ {new Intl.NumberFormat(lang).format(Math.round(distance))} km</span>
                    </button>)}
                  </div>
                  <p className="mt-3 text-[10px] text-slate-400">{copy.distanceHint}</p>
                </div>}
              <div className={`coverage-results-header mb-3 flex flex-wrap items-center justify-between gap-2 ${nearby.length ? 'mt-5' : ''}`}><h3 className="text-xs font-semibold text-white">{copy.locations}</h3><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-slate-300" role="status" aria-live="polite" aria-atomic="true">{visible.length} {copy.results}</span></div>
              {(region !== 'all' || filter !== 'all' || query) && <button type="button" className="mb-2 text-[11px] text-sky-200 underline-offset-4 hover:underline" onClick={clearFilters}>{copy.clear}</button>}
              <div className="coverage-location-list space-y-2">
                {visible.length ? visible.map(location => <button key={location.id} type="button" aria-pressed={selected?.id === location.id} onClick={() => selectLocation(location)} className={`coverage-location w-full rounded-xl px-3 py-3 text-left ${selected?.id === location.id ? 'is-active' : ''}`}><span className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: colors[location.type] }} /><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-slate-200">{location.name}</span><span className="mt-1 block text-[10px] text-slate-400">{location.city}</span></span><Icon name="arrow" className="h-3 w-3 shrink-0 text-slate-500" /></span></button>) : <div className="py-5 text-center"><Icon name="search" className="mx-auto text-slate-500" /><p className="mt-3 text-sm text-slate-200">{copy.empty}</p><p className="mt-2 text-xs leading-relaxed text-slate-400">{nearby.length ? copy.nearbyHint : copy.emptySub}</p><button type="button" onClick={clearFilters} className="mt-3 text-xs font-medium text-sky-200 hover:underline">{copy.clear}</button></div>}
              </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="coverage-stats mt-8 flex flex-wrap items-center gap-x-8 gap-y-6 rounded-2xl bg-white p-6 text-slate-900">
          <div><p className="font-head text-2xl font-bold">34+</p><p className="mt-1 text-[11px] text-slate-500">{t.coverage.ports}</p></div>
          <div><p className="font-head text-2xl font-bold">All 7</p><p className="mt-1 text-[11px] text-slate-500">{t.coverage.islandGroup}</p></div>
          <div><p className="font-head text-2xl font-bold">Sabang — Merauke</p><p className="mt-1 text-[11px] text-slate-500">{t.coverage.endToEnd}</p></div>
          <p className="ml-auto max-w-xs text-xs leading-relaxed text-slate-500">{t.coverage.desc}</p>
        </div>
      </div>
    </section>
  );
}
