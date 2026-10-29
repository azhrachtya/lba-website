// Konten lengkap tiap halaman detail layanan.
// Sumber isi: REVISI_WEBSITE_2.docx (6 service). Slug & gambar tetap sama seperti sebelumnya.
// relatedSlugs = slug service lain yang muncul di section "Related Services" paling bawah
// (kosongkan [] kalau tidak mau ada section itu).

export type ServiceContent = {
  slug: string;
  navTitle: string; // judul singkat buat kartu di Services section
  navDescription: string; // deskripsi singkat buat kartu di Services section
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  overviewImage?: string; // path di /public/images/, atau biarin kosong pakai default
  image?: string; // foto hero + thumbnail di kartu Related Services. Default: /images/service-<slug>.jpg
  whatWeHandleTitle?: string;
  whatWeHandleGroups: { heading?: string; items: { title: string; desc: string }[] }[];
  relatedSlugs: string[];
};

export const services: ServiceContent[] = [
  {
    slug: "freight-forwarding",
    image: "/images/freight-forwarding.png",
    navTitle: "Import & Export Cargo Handling",
    navDescription: "Import and export cargo handling services, coordinating shipments from origin to destination.",
    heroTitle: "Import & Export Cargo Handling",
    heroTagline: "Coordinated Shipments, from Origin to Final Destination.",
    heroDescription: "We handle import and export cargo through coordinated shipment arrangements, documentation, booking, transportation, and tracking to support cargo movement from origin to destination.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Import & Export Coordination", desc: "Coordination of shipment arrangements, booking, documentation, and cargo movement from origin to destination." },
        { title: "General Cargo", desc: "Handling and transportation coordination for general goods across domestic and international shipments." },
        { title: "Project Cargo", desc: "Coordinated logistics for industrial equipment, steel structures, and project-related cargo." },
        { title: "Heavy & Oversized Cargo", desc: "Transportation coordination for heavy equipment and oversized cargo, subject to route and handling requirements." },
        { title: "Breakbulk Cargo", desc: "Sea freight and handling coordination for oversized or non-containerized shipments." },
      ]},
    ],
    relatedSlugs: ["ppjk-customs", "door-to-door", "sea-air-freight"],
  },
  {
    slug: "ppjk-customs",
    image: "/images/ppjk-customs.png",
    navTitle: "Customs Clearance Specialist",
    navDescription: "Customs clearance support to facilitate import and export processes in accordance with applicable regulations.",
    heroTitle: "Customs Clearance Specialist",
    heroTagline: "Simplifying Customs. Keeping Your Cargo Moving.",
    heroDescription: "Customs clearance support for import and export shipments, including customs documentation, declaration coordination, and communication with relevant parties to support compliant cargo clearance.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Import & Export Customs Declaration", desc: "Coordination of import and export customs declarations, including PIB and PEB documentation, as applicable." },
        { title: "Customs Documentation", desc: "Assistance with customs-related documents and coordination to support accurate and complete submissions." },
        { title: "Stakeholder Coordination", desc: "Coordination between shippers, consignees, and relevant parties involved in the customs clearance process." },
        { title: "Customs Inspection Coordination", desc: "Coordination of inspection requirements and supporting documentation when required by relevant authorities." },
        { title: "Cargo Clearance Coordination", desc: "Follow-up and coordination of clearance progress to support onward cargo movement." },
      ]},
    ],
    relatedSlugs: ["door-to-door", "freight-forwarding", "sea-air-freight"],
  },
  {
    slug: "door-to-door",
    image: "/images/door-to-door.png",
    navTitle: "PPJK & Door-to-Door Logistics",
    navDescription: "PPJK and coordinated logistics services supporting cargo movement from origin to final destination.",
    heroTitle: "PPJK & Door-to-Door Logistics",
    heroTagline: "One Coordinated Service, from Origin to Your Door.",
    heroDescription: "We combine PPJK services with coordinated logistics, managing customs, transportation, and delivery to help move your cargo from origin to final destination.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Cargo Pickup & Origin Handling", desc: "Coordination of cargo pickup and origin handling based on shipment requirements." },
        { title: "PPJK & Customs Coordination", desc: "Coordination of customs documentation and clearance procedures in accordance with applicable requirements." },
        { title: "Freight & Transportation", desc: "Coordination of sea freight, air freight, and inland transportation according to shipment route and cargo requirements." },
        { title: "Final Delivery Coordination", desc: "Coordination of cargo delivery to the designated consignee or final destination." },
      ]},
    ],
    relatedSlugs: ["ppjk-customs", "freight-forwarding", "inland-transportation"],
  },
  {
    slug: "sea-air-freight",
    image: "/images/sea-air-freight.png",
    navTitle: "Air & Sea Freight",
    navDescription: "Flexible air and sea freight solutions for domestic and international shipping requirements.",
    heroTitle: "Air & Sea Freight",
    heroTagline: "Connecting Your Cargo to the World.",
    heroDescription: "Flexible air and sea freight solutions for domestic and international shipments, tailored to your cargo requirements, delivery timelines, and destination.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Air Freight", desc: "Air cargo coordination for shipments requiring air transportation, subject to route and service availability." },
        { title: "Sea Freight", desc: "Sea freight solutions for containerized and other suitable cargo shipments." },
        { title: "Shipment Coordination", desc: "Coordination of bookings, shipping documentation, and cargo movement throughout the shipment process." },
      ]},
    ],
    relatedSlugs: ["freight-forwarding", "ppjk-customs", "door-to-door"],
  },
  {
    slug: "inland-transportation",
    image: "/images/inland-transportation.png",
    navTitle: "Inland Transportation",
    navDescription: "Land transportation for general cargo, heavy equipment, and project cargo based on shipment requirements.",
    heroTitle: "Inland Transportation",
    heroTagline: "Reliable Delivery, Across Every Route.",
    heroDescription: "Land transportation solutions for general cargo, heavy equipment, and project cargo, coordinated according to cargo specifications, route conditions, and delivery requirements.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "General Cargo Transportation", desc: "Road transportation for general goods between warehouses, ports, and designated destinations." },
        { title: "Heavy Equipment Transportation", desc: "Transportation coordination for machinery and heavy equipment based on weight, dimensions, and route requirements." },
        { title: "Project Cargo Transportation", desc: "Land transportation coordination for steel structures and other project-related cargo." },
      ]},
    ],
    relatedSlugs: ["door-to-door", "stevadoring", "ppjk-customs"],
  },
  {
    slug: "stevadoring",
    image: "/images/stevadoring.png",
    navTitle: "Stevedoring & Cargo Handling",
    navDescription: "Loading and unloading services to support port operations and cargo handling requirements.",
    heroTitle: "Stevedoring & Cargo Handling",
    heroTagline: "Coordinated Handling. Reliable Cargo Movement.",
    heroDescription: "LBA coordinates stevedoring and cargo handling services through appointed service providers to support loading, unloading, and the movement of industrial and project cargo.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Loading & Unloading Coordination", desc: "Coordination of cargo loading and unloading activities at ports and designated handling locations." },
        { title: "Breakbulk Cargo Handling", desc: "Coordination of handling arrangements for oversized or non-containerized cargo." },
        { title: "Vendor & Operational Coordination", desc: "Coordination with appointed service providers to support cargo handling requirements and shipment schedules." },
      ]},
    ],
    relatedSlugs: ["freight-forwarding", "inland-transportation", "sea-air-freight"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function matchSlugFromTitle(title: string): string | undefined {
  const t = (title || "").toLowerCase();
  const hasWord = (w: string) => new RegExp(`\\b${w}\\b`).test(t);

  if (t.includes("stevadoring") || t.includes("stevedoring")) return "stevadoring";
  if (t.includes("door-to-door") || t.includes("door to door")) return "door-to-door"; // sebelum "ppjk"
  if (t.includes("customs") || t.includes("ppjk")) return "ppjk-customs";
  if (t.includes("import") && t.includes("export")) return "freight-forwarding";
  if (t.includes("freight forward")) return "freight-forwarding";
  if (t.includes("inland")) return "inland-transportation";
  if (t.includes("sea & air") || t.includes("air & sea") || t.includes("sea and air") || t.includes("air and sea") || hasWord("sea") || hasWord("air")) return "sea-air-freight";
  return undefined;
}
