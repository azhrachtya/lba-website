// Data cadangan: tampil kalau Sanity belum diisi, jadi web tetap kelihatan penuh saat testing.
import { L3 } from "./i18n";

export const defaultServices: { title: L3; description: L3; image?: string; pageSlug?: string }[] = [
  {
    title: { en: "Import & Export Cargo Handling", id: "Penanganan Kargo Impor & Ekspor", zh: "进出口货物处理" },
    description: {
      en: "We handle import and export cargo through coordinated shipment arrangements, documentation, booking, transportation, and tracking to support cargo movement from origin to destination.",
      id: "Kami menangani kargo impor dan ekspor melalui pengaturan pengiriman, dokumentasi, pemesanan, transportasi, dan pelacakan yang terkoordinasi untuk mendukung pergerakan kargo dari asal hingga tujuan.",
      zh: "我们通过协调的运输安排、单证、订舱、运输和货物跟踪，处理进出口货物，支持货物从起点到目的地的流转。",
    },
    pageSlug: "import-export-cargo-handling",
  },
  {
    title: { en: "Customs Clearance Specialist", id: "Spesialis Kepabeanan", zh: "清关专家" },
    description: {
      en: "Customs clearance support for import and export shipments, including customs documentation, declaration coordination, and communication with relevant parties to support compliant cargo clearance.",
      id: "Dukungan kepabeanan untuk pengiriman impor dan ekspor, meliputi dokumen kepabeanan, koordinasi deklarasi, dan komunikasi dengan pihak terkait untuk mendukung proses clearance kargo yang sesuai ketentuan.",
      zh: "为进出口货物提供清关支持，包括报关单证、申报协调以及与相关方沟通，以确保货物合规清关。",
    },
    pageSlug: "customs-clearance-specialist",
  },
  {
    title: { en: "PPJK & Door-to-Door Logistics", id: "PPJK & Logistik Door-to-Door", zh: "PPJK 与门到门物流" },
    description: {
      en: "We combine PPJK services with coordinated logistics, managing customs, transportation, and delivery to help move your cargo from origin to final destination.",
      id: "Kami menggabungkan layanan PPJK dengan logistik terkoordinasi, mengelola kepabeanan, transportasi, dan pengiriman untuk membantu memindahkan kargo Anda dari asal hingga tujuan akhir.",
      zh: "我们将 PPJK 服务与协调物流相结合，统筹清关、运输和配送，帮助您的货物从起点运送至最终目的地。",
    },
    pageSlug: "door-to-door",
  },
  {
    title: { en: "Air & Sea Freight", id: "Angkutan Udara & Laut", zh: "空运与海运" },
    description: {
      en: "Flexible air and sea freight solutions for domestic and international shipments, tailored to your cargo requirements, delivery timelines, and destination.",
      id: "Solusi angkutan udara dan laut yang fleksibel untuk pengiriman domestik dan internasional, disesuaikan dengan kebutuhan kargo, jadwal pengiriman, dan tujuan Anda.",
      zh: "为国内和国际货运提供灵活的空运和海运方案，根据您的货物要求、交付时间和目的地量身定制。",
    },
    pageSlug: "sea-air-freight",
  },
  {
    title: { en: "Inland Transportation", id: "Transportasi Darat", zh: "内陆运输" },
    description: {
      en: "Land transportation solutions for general cargo, heavy equipment, and project cargo, coordinated according to cargo specifications, route conditions, and delivery requirements.",
      id: "Solusi transportasi darat untuk kargo umum, alat berat, dan project cargo, dikoordinasikan sesuai spesifikasi kargo, kondisi rute, dan kebutuhan pengiriman.",
      zh: "为普通货物、重型设备和项目货物提供陆路运输方案，根据货物规格、路线条件和交付要求协调安排。",
    },
    pageSlug: "inland-transportation",
  },
  {
    title: { en: "Stevedoring & Cargo Handling", id: "Stevedoring & Penanganan Kargo", zh: "装卸与货物处理" },
    description: {
      en: "LBA coordinates stevedoring and cargo handling services through appointed service providers to support loading, unloading, and the movement of industrial and project cargo.",
      id: "LBA mengoordinasikan layanan stevedoring dan penanganan kargo melalui penyedia jasa yang ditunjuk untuk mendukung bongkar muat serta pergerakan kargo industri dan proyek.",
      zh: "LBA 通过指定服务商协调装卸及货物处理服务，支持工业和项目货物的装卸与流转。",
    },
    pageSlug: "stevedoring",
  },
];

export const defaultOffices = [
  { city: { en: "Jakarta", id: "Jakarta", zh: "雅加达" }, type: "head", address: "Graha AG, Ruko Cilincing Plaza Blok A7, Cilincing, North Jakarta, DKI Jakarta", phone: "021-22442738", whatsapp: "6282188885284", email: "info@lbalogistics.id", image: "/images/office-jakarta.webp" },
  { city: { en: "Semarang", id: "Semarang", zh: "三宝垄" }, type: "branch", address: "Jl. Marina Raya No.8, Tawangsari, Kec. Semarang Barat, Kota Semarang, Jawa Tengah 50144", whatsapp: "6287776531338", email: "lba-smg@lbalogistics.id", image: "/images/office-semarang.webp", mapsUrl: "https://www.google.com/maps/place/PT+LAUTAN+BERLIAN+ABADI+SEMARANG/@-6.9594194,110.3160797,13z/data=!4m10!1m2!2m1!1sPT.+Lautan+Berlian+Abadi+semarang!3m6!1s0x2e70f5005ab2a9af:0x529e85da11733274!8m2!3d-6.9594194!4d110.3922974!15sCiFQVC4gTGF1dGFuIEJlcmxpYW4gQWJhZGkgc2VtYXJhbmeSAQl3YXJlaG91c2XgAQA!16s%2Fg%2F11ntpt7pxt?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D#:~:text=Jl.%20Marina%20Raya%20No.8%2C%20Tawangsari%2C%20Kec.%20Semarang%20Barat%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050144" },
  { city: { en: "Surabaya", id: "Surabaya", zh: "泗水" }, type: "branch", address: "Jl. Perak Timur No.512 512, North Perak, Pabean Cantikan, Surabaya, East Java 60164", whatsapp: "6281990466032", email: "lba-sub@lbalogistics.id", image: "/images/office-surabaya.webp", mapsUrl: "https://www.google.com/maps/place/PT.+Lautan+Berlian+Abadi/@-7.2024555,112.7313912,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7f994df6363cb:0xfd7399d5ca5bb1ec!8m2!3d-7.2024608!4d112.7339661!16s%2Fg%2F11rggw39yp?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D#:~:text=.512%20512%2C%20North-,Perak,-%2C%20Pabean%20Cantikan%2C%20Surabaya"},
];

export const defaultProjects = [
  {
    client: "Merdeka Copper Gold", category: "Breakbulk",
    title: { en: "Smelter Konawe Project", id:"", zh:"" },
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
