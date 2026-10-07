// Data cadangan: tampil kalau Sanity belum diisi, jadi web tetap kelihatan penuh saat testing.
import { L3 } from "./i18n";

export const defaultServices: { title: L3; description: L3 }[] = [
  { title: { en: "Freight Forwarding", id: "Freight Forwarding", zh: "货运代理" }, description: { en: "End-to-end freight forwarding from origin to destination.", id: "Freight forwarding dari asal hingga tujuan.", zh: "从起点到目的地的端到端货运代理。" } },
  { title: { en: "PPJK — Customs Clearance", id: "PPJK — Kepabeanan", zh: "PPJK 清关" }, description: { en: "Customs clearance services for efficient import and export.", id: "Layanan kepabeanan untuk impor dan ekspor yang efisien.", zh: "高效的进出口清关服务。" } },
  { title: { en: "Sea & Air Freight", id: "Angkutan Laut & Udara", zh: "海运与空运" }, description: { en: "Flexible sea and air freight based on cargo and destination.", id: "Angkutan laut dan udara fleksibel sesuai kargo dan tujuan.", zh: "根据货物和目的地提供灵活的海空运输。" } },
  { title: { en: "Inland Transportation", id: "Transportasi Darat", zh: "内陆运输" }, description: { en: "Cargo transport from ports and warehouses to destination.", id: "Angkut kargo dari pelabuhan dan gudang ke tujuan.", zh: "从港口和仓库到目的地的货物运输。" } },
  { title: { en: "Warehousing", id: "Pergudangan", zh: "仓储" }, description: { en: "Storage, handling, and distribution support.", id: "Penyimpanan, penanganan, dan distribusi kargo.", zh: "仓储、装卸及配送支持。" } },
  { title: { en: "Project Cargo", id: "Project Cargo", zh: "项目货物" }, description: { en: "Logistics for heavy, oversized, or complex cargo.", id: "Logistik untuk kargo berat, besar, atau kompleks.", zh: "重型、超大或复杂货物的物流支持。" } },
];

export const defaultOffices = [
  { city: "Jakarta", type: "head", address: "Graha AG, Ruko Cilincing Plaza Blok A7, Cilincing, North Jakarta, DKI Jakarta", phone: "021-22442738", whatsapp: "6281219769494", email: "info@lbalogistics.id", image: "/images/office-jakarta.png" },
  { city: "Semarang", type: "branch", address: "Jl. Marina Raya No. 7, Tawangsari, Semarang Barat, Central Java", whatsapp: "6287776531338", email: "info@lbalogistics.id", image: "/images/office-semarang.jpg" },
  { city: "Surabaya", type: "branch", address: "Ruko Perak Timur Blok C6 No. 512, Surabaya, East Java", whatsapp: "6281358166613", email: "info@lbalogistics.id", image: "/images/office-surabaya.png" },
];

export const defaultProjects = [
  {
    client: "Merdeka Copper Gold", category: "Breakbulk",
    title: { en: "Smelter Konawe Project" },
    subtitle: { en: "Delivery Steel Structure – Konawe Site" },
    description: { en: "Steel structure shipped via breakbulk method to support the Konawe smelter project." },
    consignee: "PT Merdeka Tsingshan Indonesia (Undername: PT Giri Mukti Sentosa)",
    cargoType: "Steel Structure",
    route: "Tanjung Priok Port, Jakarta → Konawe, Southeast Sulawesi (Project Site)",
    mode: "Breakbulk Cargo Seafreight + Trucking",
  },
  {
    client: "PT Kalimantan Alumina Nusantara (PT. KAN)", category: "Heavylift",
    title: { en: "Smelter Penebang Project" },
    subtitle: { en: "Delivery Crane & Truck Crane – Pulau Penebang" },
    description: { en: "Heavy equipment delivered via ship-to-ship method in a coastal area to support the smelter project." },
    consignee: "PT CCEPC Environment Protection & Energy; PT Dafang Heavy Machine Indonesia; PT Global Machinery Rental; PT Minerchinery Leaser Trade Indonesia; PT Zoomlion Indonesia Heavy Industri",
    cargoType: "Crane & Truck Crane",
    route: "China → Penebang, Kayong Utara (Project Site)",
    mode: "Ship-to-Ship",
  },
  {
    client: "Contemporary Amperex Technology Co. Limited (CATL) for BYD Project", category: "Inland",
    title: { en: "CATIB Karawang Project" },
    subtitle: { en: "Delivery Steel Structure – BYD Project" },
    description: { en: "Steel structure distribution to support the electric vehicle battery industry project in Karawang." },
    consignee: "PT Contemporary Amperex Technology Indonesia Albattery",
    cargoType: "Steel Structure",
    route: "Tanjung Priok Port, Jakarta → Catib Karawang (Warehouse)",
    mode: "Trucking",
  },
  {
    client: "PT. Feiyu Development Indonesia", category: "Breakbulk",
    title: { en: "Obi Island Project" },
    subtitle: { en: "Delivery Steel Structure – Pulau Obi Maluku" },
    description: { en: "Steel structure shipped to an island area via breakbulk method to support an industrial project." },
    consignee: "PT. Feiyu Development Indonesia",
    cargoType: "Steel Structure",
    route: "Tanjung Priok Port, Jakarta → Obi Island, Maluku",
    mode: "Breakbulk Cargo Sea Freight",
  },
  {
    client: "Samator Group", category: "Project Cargo",
    title: { en: "Storage Tank Relocation Project" },
    subtitle: { en: "Delivery Storage Tank – Kendal to Batam" },
    description: { en: "Relocation and installation of a storage tank to support plant operations in Batam." },
    consignee: "PT Samator Gas Industri",
    cargoType: "Storage Tank",
    route: "Tanjung Priok Port, Jakarta → Kendal (Relocation Point) → Batam (Factory)",
    mode: "Moving Erection Storage Tank to Samator Plant",
  },
  {
    client: "PT. Cargo Anda Indonesia", category: "Inland",
    title: { en: "Cirata Project" },
    subtitle: { en: "Delivery Electric Winch – Bendungan Cirata" },
    description: { en: "Electric winch delivery to support the lifting process at the Cirata Dam project." },
    consignee: "PT. Mutiara Indah Construction",
    cargoType: "Electric Winch",
    route: "Tanjung Priok Port, Jakarta → Jalan Bendungan Cirata, West Java",
    mode: "Trucking",
  },
  {
    client: "PT. Cargo Anda Indonesia", category: "Warehousing",
    title: { en: "Drilling Machine Distribution Project" },
    subtitle: { en: "Multi Warehouse Handling & Delivery" },
    description: { en: "Drilling machine distribution to multiple warehouse points with structured delivery coordination." },
    consignee: "PT. Sinopeace Peralatan Indonesia",
    cargoType: "Drilling Machine",
    route: "Tanjung Priok Port, Jakarta → Buntu - Kawasan Berikat Nusantara, DK 74 - Jatiluhur (Warehouse)",
    mode: "Trucking",
  },
  {
    client: "PT Sampoerna Kayoe", category: "Warehousing",
    title: { en: "SGS Warehouse Management Project" },
    subtitle: { en: "Warehouse Management & Distribution Services" },
    description: { en: "Integrated storage, handling, and distribution services for wood pellet cargo." },
    consignee: "PT Sampoerna Kayoe",
    cargoType: "Wood Pellet",
    mode: "Trucking",
  },
];

export const coverageRegions = [
  { name: "Sumatra", category: "Western Gateway", ports: ["Belawan Medan", "Dumai", "Palembang", "Padang Panjang", "Batu Ampar Padang", "Tanjung Pinang"] },
  { name: "Java", category: "Headquarters Corridor", ports: ["Tanjung Priok Jakarta (HQ)", "Tanjung Emas Semarang (Branch)", "Cirebon", "Tanjung Perak Surabaya (Branch)", "Merak", "Tanjung Intan Cilacap"] },
  { name: "Kalimantan", category: "Industrial & Mining", ports: ["Banjarmasin", "Balikpapan", "Samarinda", "Pontianak", "Kota Baru", "Pulau Penebang Kayong Utara (Project Site)"] },
  { name: "Sulawesi", category: "Smelter & Nickel Hub", ports: ["Makassar", "Bitung", "Kendari", "Konawe Southeast Sulawesi (Project Site)", "Palu", "Gotontalo"] },
  { name: "Bali Nusra", category: "Bali · NTB · NTT", ports: ["Benoa Bali", "Lembar Lombok", "Badas Sumbawa", "Tenau Kupang"] },
  { name: "Maluku & Papua", category: "Eastern Frontier", ports: ["Ambon", "Sorong", "Jayapura", "Marauke", "Timika", "Biak"] },
];
