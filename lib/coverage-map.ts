import { Lang } from './i18n';

export type RegionId = 'sumatra' | 'java' | 'kalimantan' | 'sulawesi' | 'bali-nusra' | 'maluku-papua';
export type LocationType = 'office' | 'destination' | 'project';
export type CoverageLocation = {
  id: string;
  name: string;
  city: string;
  region: RegionId;
  type: LocationType;
  coordinates: [number, number]; // Longitude, latitude; regional map reference.
  officeCity?: string;
  project?: { name: string; cargo: string; mode: string };
};

export const mapRegions: { id: RegionId; name: Record<Lang, string>; center: [number, number]; zoom: number }[] = [
  { id: 'sumatra', name: { en: 'Sumatra', id: 'Sumatra', zh: '苏门答腊' }, center: [101.5, -0.3], zoom: 2.3 },
  { id: 'java', name: { en: 'Java', id: 'Jawa', zh: '爪哇' }, center: [110.2, -7.2], zoom: 3.5 },
  { id: 'kalimantan', name: { en: 'Kalimantan', id: 'Kalimantan', zh: '加里曼丹' }, center: [114, -0.7], zoom: 2.8 },
  { id: 'sulawesi', name: { en: 'Sulawesi', id: 'Sulawesi', zh: '苏拉威西' }, center: [122, -1.6], zoom: 2.8 },
  { id: 'bali-nusra', name: { en: 'Bali & Nusa Tenggara', id: 'Bali & Nusa Tenggara', zh: '巴厘与努沙登加拉' }, center: [119.5, -8.6], zoom: 3.2 },
  { id: 'maluku-papua', name: { en: 'Maluku & Papua', id: 'Maluku & Papua', zh: '马鲁古与巴布亚' }, center: [133.5, -3.9], zoom: 2.2 },
];

export const coverageLocations: CoverageLocation[] = [
  { id: 'belawan', name: 'Belawan', city: 'Medan', region: 'sumatra', type: 'destination', coordinates: [98.68, 3.79] },
  { id: 'dumai', name: 'Dumai', city: 'Dumai', region: 'sumatra', type: 'destination', coordinates: [101.45, 1.69] },
  { id: 'palembang', name: 'Palembang', city: 'Palembang', region: 'sumatra', type: 'destination', coordinates: [104.78, -2.98] },
  { id: 'padang-panjang', name: 'Padang Panjang', city: 'Padang Panjang', region: 'sumatra', type: 'destination', coordinates: [100.4, -0.46] },
  { id: 'batu-ampar', name: 'Batu Ampar', city: 'Batam', region: 'sumatra', type: 'destination', coordinates: [104.01, 1.17] },
  { id: 'tanjung-pinang', name: 'Tanjung Pinang', city: 'Tanjung Pinang', region: 'sumatra', type: 'destination', coordinates: [104.45, 0.93] },
  { id: 'tanjung-priok', name: 'Tanjung Priok', city: 'Jakarta', officeCity: 'Jakarta', region: 'java', type: 'office', coordinates: [106.88, -6.1] },
  { id: 'tanjung-emas', name: 'Tanjung Emas', city: 'Semarang', officeCity: 'Semarang', region: 'java', type: 'office', coordinates: [110.42, -6.95] },
  { id: 'cirebon', name: 'Cirebon', city: 'Cirebon', region: 'java', type: 'destination', coordinates: [108.57, -6.71] },
  { id: 'tanjung-perak', name: 'Tanjung Perak', city: 'Surabaya', officeCity: 'Surabaya', region: 'java', type: 'office', coordinates: [112.73, -7.2] },
  { id: 'merak', name: 'Merak', city: 'Merak', region: 'java', type: 'destination', coordinates: [106.0, -5.93] },
  { id: 'tanjung-intan', name: 'Tanjung Intan', city: 'Cilacap', region: 'java', type: 'destination', coordinates: [109.0, -7.73] },
  { id: 'banjarmasin', name: 'Banjarmasin', city: 'Banjarmasin', region: 'kalimantan', type: 'destination', coordinates: [114.59, -3.32] },
  { id: 'balikpapan', name: 'Balikpapan', city: 'Balikpapan', region: 'kalimantan', type: 'destination', coordinates: [116.83, -1.28] },
  { id: 'samarinda', name: 'Samarinda', city: 'Samarinda', region: 'kalimantan', type: 'destination', coordinates: [117.15, -0.5] },
  { id: 'pontianak', name: 'Pontianak', city: 'Pontianak', region: 'kalimantan', type: 'destination', coordinates: [109.33, -0.02] },
  { id: 'kotabaru', name: 'Kotabaru', city: 'Kotabaru', region: 'kalimantan', type: 'destination', coordinates: [116.23, -3.29] },
  { id: 'penebang', name: 'Pulau Penebang', city: 'Kayong Utara', region: 'kalimantan', type: 'project', coordinates: [109.18, -1.17], project: { name: 'Smelter Penebang Project', cargo: 'Crane & Truck Crane', mode: 'Ship-to-Ship' } },
  { id: 'makassar', name: 'Makassar', city: 'Makassar', region: 'sulawesi', type: 'destination', coordinates: [119.41, -5.13] },
  { id: 'bitung', name: 'Bitung', city: 'Bitung', region: 'sulawesi', type: 'destination', coordinates: [125.19, 1.44] },
  { id: 'kendari', name: 'Kendari', city: 'Kendari', region: 'sulawesi', type: 'destination', coordinates: [122.59, -3.97] },
  { id: 'konawe', name: 'Konawe', city: 'Sulawesi Tenggara', region: 'sulawesi', type: 'project', coordinates: [122.16, -3.85], project: { name: 'Smelter Konawe Project', cargo: 'Steel Structure', mode: 'Breakbulk Cargo Seafreight + Trucking' } },
  { id: 'palu', name: 'Palu', city: 'Palu', region: 'sulawesi', type: 'destination', coordinates: [119.85, -0.7] },
  { id: 'gorontalo', name: 'Gorontalo', city: 'Gorontalo', region: 'sulawesi', type: 'destination', coordinates: [123.06, 0.52] },
  { id: 'benoa', name: 'Benoa', city: 'Bali', region: 'bali-nusra', type: 'destination', coordinates: [115.22, -8.75] },
  { id: 'lembar', name: 'Lembar', city: 'Lombok', region: 'bali-nusra', type: 'destination', coordinates: [116.07, -8.73] },
  { id: 'badas', name: 'Badas', city: 'Sumbawa', region: 'bali-nusra', type: 'destination', coordinates: [117.38, -8.46] },
  { id: 'tenau', name: 'Tenau', city: 'Kupang', region: 'bali-nusra', type: 'destination', coordinates: [123.52, -10.19] },
  { id: 'ambon', name: 'Ambon', city: 'Ambon', region: 'maluku-papua', type: 'destination', coordinates: [128.18, -3.69] },
  { id: 'sorong', name: 'Sorong', city: 'Sorong', region: 'maluku-papua', type: 'destination', coordinates: [131.25, -0.87] },
  { id: 'jayapura', name: 'Jayapura', city: 'Jayapura', region: 'maluku-papua', type: 'destination', coordinates: [140.71, -2.54] },
  { id: 'merauke', name: 'Merauke', city: 'Merauke', region: 'maluku-papua', type: 'destination', coordinates: [140.39, -8.49] },
  { id: 'timika', name: 'Timika', city: 'Timika', region: 'maluku-papua', type: 'destination', coordinates: [136.89, -4.55] },
  { id: 'biak', name: 'Biak', city: 'Biak', region: 'maluku-papua', type: 'destination', coordinates: [136.08, -1.18] },
];

export function projectCoordinates([longitude, latitude]: [number, number]): [number, number] {
  return [(longitude - 94) * 22, (7 - latitude) * 22];
}

export const mapCopy = {
  en: {
    intro: 'Explore our network', instruction: 'Select a region or a location to explore our coverage.',
    all: 'All locations', office: 'LBA offices', destination: 'Destinations', project: 'Project sites',
    search: 'Search a city or location', regions: 'Regions', everywhere: 'All Indonesia',
    nearby: 'Nearby locations', nearestTo: 'Closest to', allCategories: 'All categories', distanceHint: 'Approx. distance in a straight line',
    nearbyHint: 'Choose a nearby location to view its details.',
    detail: 'Selected location', emptyDetail: 'Explore a location', emptyHint: 'Choose a pin or a location from the list to view details.',
    locations: 'Locations', results: 'matching locations', empty: 'No locations found', emptySub: 'Try another name or reset your filters.',
    clear: 'Clear filters', reset: 'Reset map', zoomIn: 'Zoom in', zoomOut: 'Zoom out',
    help: 'Drag to explore · Use + / − to zoom', mobileHelp: 'Drag & zoom', keyboard: 'Arrow keys to move; + / − to zoom; Home to reset.',
    contact: 'Discuss your shipment', maps: 'View location on Google Maps', head: 'Head office', branch: 'Branch office',
    officeAddress: 'Office address', cargo: 'Cargo', mode: 'Transport mode', projectLabel: 'Project',
    officeDescription: 'Connect with our local team for your logistics needs.',
    destinationDescription: 'Plan freight, customs clearance and delivery with the LBA team.',
    projectDescription: 'A project location from the LBA portfolio.',
    network: 'Nationwide network', offices: 'Office hubs', sites: 'Ports & sites', regional: 'Coverage regions',
    showing: 'Showing', of: 'of', tooltip: 'View details', close: 'Close details',
    sumatra: 'SUMATRA', java: 'JAVA', kalimantan: 'KALIMANTAN', sulawesi: 'SULAWESI', bali: 'BALI & NUSA TENGGARA', maluku: 'MALUKU', papua: 'PAPUA',
  },
  id: {
    intro: 'Jelajahi jaringan kami', instruction: 'Pilih wilayah atau lokasi untuk melihat jangkauan kami.',
    all: 'Semua lokasi', office: 'Kantor LBA', destination: 'Destinasi', project: 'Lokasi proyek',
    search: 'Cari kota atau lokasi', regions: 'Wilayah', everywhere: 'Seluruh Indonesia',
    nearby: 'Lokasi terdekat', nearestTo: 'Terdekat dari', allCategories: 'Semua kategori', distanceHint: 'Perkiraan jarak garis lurus',
    nearbyHint: 'Pilih lokasi terdekat untuk melihat detailnya.',
    detail: 'Lokasi terpilih', emptyDetail: 'Jelajahi lokasi', emptyHint: 'Pilih pin atau lokasi dari daftar untuk melihat detail.',
    locations: 'Lokasi', results: 'lokasi ditemukan', empty: 'Lokasi tidak ditemukan', emptySub: 'Coba nama lain atau reset filter.',
    clear: 'Hapus filter', reset: 'Reset peta', zoomIn: 'Perbesar', zoomOut: 'Perkecil',
    help: 'Geser untuk menjelajah · Gunakan + / − untuk zoom', mobileHelp: 'Geser & zoom', keyboard: 'Tombol panah untuk geser; + / − untuk zoom; Home untuk reset.',
    contact: 'Konsultasi pengiriman', maps: 'Lihat lokasi di Google Maps', head: 'Kantor pusat', branch: 'Kantor cabang',
    officeAddress: 'Alamat kantor', cargo: 'Kargo', mode: 'Moda transportasi', projectLabel: 'Proyek',
    officeDescription: 'Hubungi tim lokal kami untuk kebutuhan logistik Anda.',
    destinationDescription: 'Rencanakan freight, kepabeanan, dan pengiriman bersama tim LBA.',
    projectDescription: 'Lokasi proyek dari portofolio LBA.',
    network: 'Jaringan nasional', offices: 'Hub kantor', sites: 'Pelabuhan & lokasi', regional: 'Wilayah cakupan',
    showing: 'Menampilkan', of: 'dari', tooltip: 'Lihat detail', close: 'Tutup detail',
    sumatra: 'SUMATRA', java: 'JAWA', kalimantan: 'KALIMANTAN', sulawesi: 'SULAWESI', bali: 'BALI & NUSA TENGGARA', maluku: 'MALUKU', papua: 'PAPUA',
  },
  zh: {
    intro: '探索我们的网络', instruction: '选择地区或地点以了解我们的覆盖范围。',
    all: '全部地点', office: 'LBA 办事处', destination: '目的地', project: '项目地点',
    search: '搜索城市或地点', regions: '地区', everywhere: '印度尼西亚全境',
    nearby: '附近地点', nearestTo: '距离最近', allCategories: '全部类别', distanceHint: '大致直线距离',
    nearbyHint: '选择附近地点以查看详情。',
    detail: '已选地点', emptyDetail: '探索地点', emptyHint: '选择地图标记或列表中的地点以查看详情。',
    locations: '地点', results: '个匹配地点', empty: '未找到地点', emptySub: '请尝试其他名称或重置筛选。',
    clear: '清除筛选', reset: '重置地图', zoomIn: '放大', zoomOut: '缩小',
    help: '拖动以探索 · 使用 + / − 缩放', mobileHelp: '拖动与缩放', keyboard: '方向键移动；+ / − 缩放；Home 重置。',
    contact: '咨询货运', maps: '在 Google 地图中查看', head: '总部', branch: '分支机构',
    officeAddress: '办事处地址', cargo: '货物', mode: '运输方式', projectLabel: '项目',
    officeDescription: '联系当地团队，满足您的物流需求。',
    destinationDescription: '与 LBA 团队规划货运、清关和配送。',
    projectDescription: 'LBA 项目案例中的地点。',
    network: '全国网络', offices: '办事处枢纽', sites: '港口与地点', regional: '覆盖地区',
    showing: '显示', of: '/', tooltip: '查看详情', close: '关闭详情',
    sumatra: '苏门答腊', java: '爪哇', kalimantan: '加里曼丹', sulawesi: '苏拉威西', bali: '巴厘与努沙登加拉', maluku: '马鲁古', papua: '巴布亚',
  },
};
