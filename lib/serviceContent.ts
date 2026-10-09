// Konten lengkap tiap halaman detail layanan.
// Mau ubah teks/isi? Edit langsung di sini — tiap service punya key sendiri.
// relatedSlugs = slug service lain yang muncul di section "Related Services" paling bawah.

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
  processTitle?: string;
  process: { num: string; title: string; desc: string }[];
  capabilitiesTitle?: string;
  capabilities: { title: string; desc: string }[];
  highlight?: { title: string; desc: string }; // callout box opsional, misal "Oversized? Heavy? Remote?"
  suitableFor?: string[]; // list tag, misal buat Warehousing/Project Cargo
  relatedSlugs: string[];
};

export const services: ServiceContent[] = [
  {
    slug: "freight-forwarding",
    image: "/images/freight-forwarding.png",
    navTitle: "Freight Forwarding",
    navDescription: "End-to-end freight forwarding solutions to support the movement of cargo from origin to destination.",
    heroTitle: "Freight Forwarding",
    heroTagline: "End-to-end cargo movement, from origin to final destination.",
    heroDescription: "We manage your shipment from pickup to final delivery, coordinating documentation, transportation, booking, and tracking through one integrated logistics solution.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { heading: "Export Coordination", items: [
        { title: "Freight & Schedule Search", desc: "Finding the nearest available vessel freight and shipping schedule for your cargo." },
        { title: "Vessel Booking", desc: "Booking shipping space with the appropriate carrier." },
        { title: "Shipping Instruction", desc: "Preparing and submitting the Shipping Instruction (SI) to the carrier." },
        { title: "B/L & Packing List Verification", desc: "Checking the Bill of Lading against the consignee's packing list before release." },
      ]},
      { heading: "Import Coordination", items: [
        { title: "Delivery Order Handling", desc: "Preparing documents and submitting DO pickup requests via the carrier's web portal, email, or in person." },
        { title: "Vessel Arrival Tracking", desc: "Monitoring vessel ETA to keep the next steps on schedule." },
        { title: "Container Return", desc: "Coordinating empty container return to the depot after unloading." },
        { title: "DO Extension", desc: "Handling Delivery Order extensions when customs, warehouse, or delivery delays occur." },
      ]},
    ],
    processTitle: "Our Process",
    process: [
      { num: "01", title: "Booking & Documentation", desc: "Freight search, vessel booking, and Shipping Instruction / B/L preparation." },
      { num: "02", title: "Payment & Confirmation", desc: "Carrier invoice payment, coordinated with Finance." },
      { num: "03", title: "DO / RO Release", desc: "Delivery Order (import) or Release Order (export) issued by the carrier." },
      { num: "04", title: "Field Coordination", desc: "Handover to field operations for container pickup or cargo delivery to site." },
      { num: "05", title: "Container Return", desc: "Empty container returned to the shipping line's depot after use." },
      { num: "06", title: "Documentation Close-out", desc: "Final documents and invoice prepared for the consignee and company records." },
    ],
    capabilitiesTitle: "Why Choose Our Freight Forwarding",
    capabilities: [
      { title: "Carrier Network", desc: "Established coordination with major shipping lines for booking and documentation." },
      { title: "Transparent Costing", desc: "Clear freight, DO, and demurrage costs with no hidden charges." },
      { title: "Proactive DO Management", desc: "Tracking Delivery Order validity and handling extensions before they cause delays." },
      { title: "One Point of Coordination", desc: "A single contact managing shipper, consignee, and carrier communication." },
    ],
    relatedSlugs: ["ppjk-customs", "sea-air-freight", "inland-transportation"],
  },
  {
    slug: "ppjk-customs",
    image: "/images/ppjk-customs.png",
    navTitle: "PPJK — Customs Clearance",
    navDescription: "Customs clearance and PPJK services to support efficient import and export processes.",
    heroTitle: "PPJK & Customs Clearance",
    heroTagline: "Simplifying customs. Keeping your cargo moving.",
    heroDescription: "Licensed PPJK services covering PIB/PEB declaration via the CEISA system, document coordination between shipper, consignee, and surveyor, and compliant clearance for both Green Line and Red Line import pathways.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { heading: "Import Clearance (BC 2.0)", items: [
        { title: "Importer Registration (NIB)", desc: "Supporting registration via OSS (oss.go.id) for companies without an active import license." },
        { title: "PIB Module Setup", desc: "Activation and installation of the PIB (Pemberitahuan Impor Barang) declaration module." },
        { title: "PIB Preparation & Submission", desc: "Preparing and electronically submitting the PIB through the CEISA system to Customs." },
        { title: "Permit Verification", desc: "Confirming Lartas (restricted goods) permits via insw.go.id before submission." },
      ]},
      { heading: "Document Coordination", items: [
        { title: "Shipper Documents", desc: "Original B/L, Invoice, Packing List, Insurance Policy, FTA/COO, MSDS for DG cargo." },
        { title: "Consignee Documents", desc: "Surat Kuasa, API-U/P, NPWP, NIB, SKB PPN/PPh, import permits (PI)." },
        { title: "Surveyor Coordination", desc: "Managing Verification Order (VO) and Laporan Surveyor (LS) / cargo inspection reports where required." },
        { title: "E-Billing & Payment", desc: "Processing the customs e-billing response and confirming BPN (proof of state payment)." },
      ]},
    ],
    processTitle: "Our Customs Process",
    process: [
      { num: "01", title: "Document Collection", desc: "Gathering shipper, consignee, and surveyor documents (B/L, Invoice, Packing List, permits)." },
      { num: "02", title: "Draft PIB", desc: "Preparing the draft PIB for consignee confirmation before submission." },
      { num: "03", title: "CEISA Submission", desc: "Submitting PIB data via CEISA 4.0 to receive the e-billing response." },
      { num: "04", title: "Payment & BPN", desc: "Processing duty/tax payment and receiving proof of state revenue (BPN)." },
      { num: "05", title: "Customs Routing", desc: "Receiving the Customs response — Green Line (direct release) or Red Line (physical inspection, minimum 3 days)." },
      { num: "06", title: "SPPB & Release", desc: "Receiving SPPB (release approval), settling DO/storage, and releasing cargo for delivery." },
    ],
    capabilitiesTitle: "What Makes It Different",
    capabilities: [
      { title: "Licensed PPJK", desc: "Officially licensed customs brokerage operating on the CEISA 4.0 system." },
      { title: "Green & Red Line Handling", desc: "Experienced managing both direct-release and physical-inspection pathways." },
      { title: "Multi-Party Coordination", desc: "Direct coordination with shipper, consignee, and surveyor to keep documents aligned." },
      { title: "SKB & Permit Support", desc: "Assistance with tax exemption (SKB PPN/PPh) and import permit (PI) requirements." },
    ],
    relatedSlugs: ["freight-forwarding", "sea-air-freight", "warehousing"],
  },
  {
    slug: "sea-air-freight",
    image: "/images/sea-air-freight.png",
    navTitle: "Sea & Air Freight",
    navDescription: "Flexible sea and air freight solutions based on cargo requirements, destination, and delivery needs.",
    heroTitle: "Sea & Air Freight",
    heroTagline: "Flexible transportation for every cargo requirement.",
    heroDescription: "Whether your cargo is time-critical or cost-sensitive, we match the right transport mode — air, FCL, LCL, breakbulk, or charter — to your shipment.",
    whatWeHandleTitle: "Choose Your Mode",
    whatWeHandleGroups: [
      { heading: "✈️ Air Freight — for time-critical shipments", items: [
        { title: "Fast Transit", desc: "Shortest possible transit times." },
        { title: "Urgent Cargo", desc: "Priority handling for time-sensitive goods." },
        { title: "Airport-to-Airport", desc: "Direct air routing between airports." },
        { title: "Time-Sensitive Industrial Cargo", desc: "Built for deadlines that matter." },
      ]},
      { heading: "🚢 Sea Freight — for flexible, cost-efficient transportation", items: [
        { title: "FCL", desc: "Full container load, dedicated to your cargo." },
        { title: "LCL", desc: "Shared container, pay by volume." },
        { title: "Breakbulk", desc: "For cargo that doesn't fit standard containers." },
        { title: "Charter", desc: "Dedicated vessel charter for large shipments." },
      ]},
    ],
    processTitle: "FCL vs LCL",
    process: [
      { num: "FCL", title: "Full Container", desc: "Dedicated container, suitable for large cargo, more control." },
      { num: "LCL", title: "Shared Container", desc: "Pay based on cargo volume, suitable for smaller shipments, more flexible." },
    ],
    capabilitiesTitle: "Our Capability",
    capabilities: [
      { title: "Sea Freight Booking", desc: "Vessel space booking across major routes." },
      { title: "Air Freight Booking", desc: "Priority air cargo space booking." },
      { title: "Chartering", desc: "Dedicated vessel or aircraft charter." },
      { title: "Breakbulk", desc: "Handling for non-containerized cargo." },
    ],
    relatedSlugs: ["freight-forwarding", "ppjk-customs", "project-cargo"],
  },
  {
    slug: "inland-transportation",
    image: "/images/inland-transportation.png",
    navTitle: "Inland Transportation",
    navDescription: "Cargo transportation from ports, warehouses, and other points to the required destination.",
    heroTitle: "Inland Transportation",
    heroTagline: "Reliable land transportation from port to final destination.",
    heroDescription: "From standard cargo to oversized equipment, we coordinate the right fleet, route, and handling to get your cargo from port to site safely.",
    whatWeHandleTitle: "Transportation Solutions",
    whatWeHandleGroups: [
      { items: [
        { title: "Light Truck", desc: "For smaller and standard cargo." },
        { title: "Medium / Heavy Truck", desc: "For industrial cargo and larger shipments." },
        { title: "Lowbed Trailer", desc: "For heavy machinery and oversized equipment." },
        { title: "Container Trailer", desc: "For containerized cargo movement." },
      ]},
    ],
    processTitle: "Our Process",
    process: [
      { num: "01", title: "Cargo Assessment", desc: "Dimensions, weight, and cargo type." },
      { num: "02", title: "Route Survey", desc: "Checking road access and conditions." },
      { num: "03", title: "Transport Planning", desc: "Determining vehicle and route." },
      { num: "04", title: "Loading & Securing", desc: "Cargo loading and securing." },
      { num: "05", title: "Escort & Transit", desc: "Escort where required during transit." },
      { num: "06", title: "Site Delivery", desc: "Final delivery to the project site." },
    ],
    capabilitiesTitle: "Heavy Haulage Capability",
    capabilities: [
      { title: "Lowbed Haulage", desc: "Specialized trailers for heavy equipment." },
      { title: "Route Survey", desc: "Access and clearance checks before transport." },
      { title: "Escort Coordination", desc: "Escort vehicles for oversized loads." },
      { title: "Remote Site Access", desc: "Transportation to locations off standard routes." },
    ],
    highlight: {
      title: "Oversized? Heavy? Remote?",
      desc: "We coordinate the equipment, route, and transportation requirements needed to move challenging cargo safely.",
    },
    relatedSlugs: ["project-cargo", "warehousing", "ppjk-customs"],
  },
  {
    slug: "warehousing",
    image: "/images/warehousing.png",
    navTitle: "Warehousing",
    navDescription: "Storage, cargo handling, and distribution support for efficient logistics operations.",
    heroTitle: "Warehousing",
    heroTagline: "Secure storage. Organized handling. Ready for distribution.",
    heroDescription: "Temporary storage, repacking, and distribution support from strategic hubs — keeping cargo organized and ready to move.",
    whatWeHandleTitle: "What We Offer",
    whatWeHandleGroups: [
      { items: [
        { title: "Storage", desc: "Secure temporary cargo storage." },
        { title: "Loading & Unloading", desc: "Professional cargo handling." },
        { title: "Repacking", desc: "Repacking and cargo preparation." },
        { title: "Distribution", desc: "Preparing cargo for onward delivery." },
      ]},
    ],
    processTitle: "Warehouse Process",
    process: [
      { num: "01", title: "Receive", desc: "Cargo arrival and check-in." },
      { num: "02", title: "Inspect", desc: "Condition and quantity verification." },
      { num: "03", title: "Store", desc: "Secure placement in storage." },
      { num: "04", title: "Handle", desc: "Loading, unloading, and movement." },
      { num: "05", title: "Repack", desc: "Repacking as required." },
      { num: "06", title: "Dispatch", desc: "Preparation for onward delivery." },
    ],
    capabilitiesTitle: "Warehouse Advantages",
    capabilities: [
      { title: "Secure Storage", desc: "Controlled, monitored storage facilities." },
      { title: "Strategic Location", desc: "Hubs positioned near major ports." },
      { title: "Professional Handling", desc: "Trained staff and equipment." },
      { title: "Distribution Support", desc: "Seamless handoff to onward transport." },
    ],
    suitableFor: ["Import cargo", "Export cargo", "Industrial equipment", "Project cargo", "Temporary storage", "Distribution preparation"],
    relatedSlugs: ["inland-transportation", "freight-forwarding", "ppjk-customs"],
  },
  {
    slug: "project-cargo",
    image: "/images/project-cargo.png",
    navTitle: "Project Cargo",
    navDescription: "Logistics support for heavy, oversized, special, or complex cargo requiring careful planning and coordination.",
    heroTitle: "Project Cargo",
    heroTagline: "Engineered logistics for oversized and heavy cargo.",
    heroDescription: "Moving oversized and heavy equipment requires more than transportation — it requires route engineering, specialized equipment, permits, handling, and coordination from port to project site.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "🏗️ Heavy Machinery", desc: "Transport and handling of heavy equipment." },
        { title: "🏭 Industrial Equipment", desc: "Specialized industrial cargo logistics." },
        { title: "⚙️ Factory Components", desc: "Component-level project logistics." },
        { title: "🔩 Steel Structures", desc: "Fabricated structure transport and handling." },
        { title: "🚜 Mining Equipment", desc: "Equipment logistics for mining operations." },
        { title: "📦 Oversized Cargo", desc: "Cargo exceeding standard transport dimensions." },
      ]},
    ],
    processTitle: "Project Cargo Process",
    process: [
      { num: "01", title: "Cargo Survey", desc: "Dimensions, weight, center of gravity, lifting points." },
      { num: "02", title: "Route Survey", desc: "Road access, bridges, turning radius, clearance." },
      { num: "03", title: "Engineering & Planning", desc: "Transport method, equipment, and handling plan." },
      { num: "04", title: "Port Handling", desc: "Loading, unloading, transshipment." },
      { num: "05", title: "Heavy Haulage", desc: "Specialized trailers and transportation." },
      { num: "06", title: "Site Delivery", desc: "Final positioning and delivery to project site." },
    ],
    capabilitiesTitle: "Specialized Capabilities",
    capabilities: [
      { title: "Heavy Lift", desc: "Specialized lifting equipment and handling." },
      { title: "Beach Landing", desc: "For locations without conventional port access." },
      { title: "Ship-to-Ship", desc: "Cargo transfer between vessels." },
      { title: "Lowbed Haulage", desc: "Heavy and oversized cargo transportation." },
      { title: "Route Survey", desc: "Detailed assessment before movement." },
    ],
    relatedSlugs: ["ppjk-customs", "sea-air-freight", "inland-transportation", "warehousing"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// Cocokin judul layanan dari Sanity CMS ke slug halaman detail, pakai kata kunci
// (bukan urutan posisi) — jadi tetap nyambung walau urutan di CMS diubah-ubah.
export function matchSlugFromTitle(title: string): string | undefined {
  const t = title.toLowerCase();
  if (t.includes("freight forward")) return "freight-forwarding";
  if (t.includes("ppjk") || t.includes("customs")) return "ppjk-customs";
  if (t.includes("sea") || t.includes("air")) return "sea-air-freight";
  if (t.includes("inland") || t.includes("transportation")) return "inland-transportation";
  if (t.includes("warehous")) return "warehousing";
  if (t.includes("project cargo")) return "project-cargo";
  return undefined;
}
