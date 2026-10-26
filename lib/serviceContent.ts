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
    navTitle: "Import & Export Cargo Handling",
    navDescription: "Import and export cargo handling services, coordinating shipments from origin to destination.",
    heroTitle: "Import & Export Cargo Handling",
    heroTagline: "Coordinated shipments, from origin to final destination.",
    heroDescription: "We handle import and export cargo from pickup to delivery, coordinating documentation, booking, transportation, and tracking through one integrated logistics solution.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { heading: "Export Coordination", items: [
        { title: "Freight & Schedule Search", desc: "Finding the nearest available vessel freight and shipping schedule for your cargo." },
        { title: "Vessel Booking", desc: "Booking shipping space with the appropriate carrier." },
        { title: "Shipping Instruction", desc: "Preparing and submitting the Shipping Instruction (SI) to the carrier." },
        { title: "B/L & Packing List Verification", desc: "Checking the Bill of Lading against the consignee's packing list before release." },
      ]},
      { heading: "Import Coordination", items: [
        { title: "Delivery Order Handling", desc: "Preparing documents and submitting DO pickup requests to the carrier." },
        { title: "Vessel Arrival Tracking", desc: "Monitoring vessel ETA to keep the next steps on schedule." },
        { title: "Container Return", desc: "Coordinating empty container return to the depot after unloading." },
        { title: "DO Extension", desc: "Handling Delivery Order extensions when delays occur." },
      ]},
    ],
    processTitle: "Our Process",
    process: [
      { num: "01", title: "Booking & Documentation", desc: "Freight search, vessel booking, and Shipping Instruction / B/L preparation." },
      { num: "02", title: "Payment & Confirmation", desc: "Carrier invoice payment, coordinated with Finance." },
      { num: "03", title: "DO / RO Release", desc: "Delivery Order (import) or Release Order (export) issued by the carrier." },
      { num: "04", title: "Field Coordination", desc: "Handover to field operations for container pickup or cargo delivery." },
      { num: "05", title: "Container Return", desc: "Empty container returned to the shipping line's depot after use." },
      { num: "06", title: "Documentation Close-out", desc: "Final documents and invoice prepared for the consignee and company records." },
    ],
    capabilitiesTitle: "Why Choose Us",
    capabilities: [
      { title: "Carrier Network", desc: "Established coordination with major shipping lines." },
      { title: "Transparent Costing", desc: "Clear freight, DO, and demurrage costs with no hidden charges." },
      { title: "Proactive DO Management", desc: "Tracking DO validity and handling extensions before delays occur." },
      { title: "One Point of Coordination", desc: "A single contact for shipper, consignee, and carrier communication." },
    ],
    relatedSlugs: ["ppjk-customs", "door-to-door", "sea-air-freight"],
  },
  {
    slug: "ppjk-customs",
    image: "/images/ppjk-customs.png",
    navTitle: "Customs Clearance Specialist",
    navDescription: "Customs clearance support to facilitate import and export processes in accordance with applicable regulations.",
    heroTitle: "Customs Clearance Specialist",
    heroTagline: "Simplifying customs. Keeping your cargo moving.",
    heroDescription: "Customs clearance support covering PIB/PEB declaration via the CEISA system, document coordination between shipper, consignee, and surveyor, and compliant clearance for both Green Line and Red Line pathways.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { heading: "Import Clearance (BC 2.0)", items: [
        { title: "Importer Registration (NIB)", desc: "Supporting registration via OSS (oss.go.id) for companies without an active import license." },
        { title: "PIB Module Setup", desc: "Activation and installation of the PIB declaration module." },
        { title: "PIB Preparation & Submission", desc: "Preparing and electronically submitting the PIB through CEISA." },
        { title: "Permit Verification", desc: "Confirming Lartas (restricted goods) permits via insw.go.id before submission." },
      ]},
      { heading: "Document Coordination", items: [
        { title: "Shipper Documents", desc: "Original B/L, Invoice, Packing List, Insurance Policy, FTA/COO, MSDS for DG cargo." },
        { title: "Consignee Documents", desc: "Surat Kuasa, API-U/P, NPWP, NIB, SKB PPN/PPh, import permits (PI)." },
        { title: "Surveyor Coordination", desc: "Managing Verification Order (VO) and surveyor reports where required." },
        { title: "E-Billing & Payment", desc: "Processing the customs e-billing response and confirming BPN." },
      ]},
    ],
    processTitle: "Our Customs Process",
    process: [
      { num: "01", title: "Document Collection", desc: "Gathering shipper, consignee, and surveyor documents." },
      { num: "02", title: "Draft PIB", desc: "Preparing the draft PIB for consignee confirmation." },
      { num: "03", title: "CEISA Submission", desc: "Submitting PIB data via CEISA 4.0 to receive the e-billing response." },
      { num: "04", title: "Payment & BPN", desc: "Processing duty/tax payment and receiving proof of state revenue." },
      { num: "05", title: "Customs Routing", desc: "Green Line (direct release) or Red Line (physical inspection)." },
      { num: "06", title: "SPPB & Release", desc: "Receiving SPPB, settling DO/storage, and releasing cargo for delivery." },
    ],
    capabilitiesTitle: "What Makes It Different",
    capabilities: [
      { title: "Regulation Compliant", desc: "Clearance handled in accordance with applicable regulations." },
      { title: "Green & Red Line Handling", desc: "Experienced with both direct-release and physical-inspection pathways." },
      { title: "Multi-Party Coordination", desc: "Direct coordination with shipper, consignee, and surveyor." },
      { title: "SKB & Permit Support", desc: "Assistance with tax exemption and import permit requirements." },
    ],
    relatedSlugs: ["door-to-door", "freight-forwarding", "sea-air-freight"],
  },
  {
    slug: "door-to-door",
    image: "/images/door-to-door.png",
    navTitle: "PPJK & Door-to-Door Logistics",
    navDescription: "PPJK and coordinated logistics services supporting cargo movement from origin to final destination.",
    heroTitle: "PPJK & Door-to-Door Logistics",
    heroTagline: "One coordinated service, from origin to your door.",
    heroDescription: "We combine PPJK services with coordinated logistics, managing customs, transportation, and delivery so your cargo moves from origin to final destination without gaps.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "PPJK Services", desc: "Customs declaration and clearance handled together with your shipment." },
        { title: "Pickup at Origin", desc: "Cargo collection from the shipper's location or port." },
        { title: "Transportation", desc: "Sea, air, and land transport arranged as one flow." },
        { title: "Final Delivery", desc: "Delivery to the consignee's address or project site." },
      ]},
    ],
    processTitle: "Our Process",
    process: [
      { num: "01", title: "Requirement Review", desc: "Understanding cargo type, origin, destination, and schedule." },
      { num: "02", title: "Documentation", desc: "Preparing shipping and customs documents." },
      { num: "03", title: "Transport Planning", desc: "Choosing the right mode and route end to end." },
      { num: "04", title: "Customs Clearance", desc: "Handling PPJK process at the port of entry or exit." },
      { num: "05", title: "Transit & Tracking", desc: "Monitoring the shipment and updating you along the way." },
      { num: "06", title: "Door Delivery", desc: "Final delivery and handover documents." },
    ],
    capabilitiesTitle: "Why Choose Us",
    capabilities: [
      { title: "Single Coordination", desc: "One team managing customs, transport, and delivery." },
      { title: "Fewer Handoffs", desc: "Reduced delays between parties." },
      { title: "Transparent Costing", desc: "Clear cost breakdown with no hidden charges." },
      { title: "Flexible Solutions", desc: "Tailored to cargo type and destination." },
    ],
    relatedSlugs: ["ppjk-customs", "freight-forwarding", "inland-transportation"],
  },
  {
    slug: "sea-air-freight",
    image: "/images/sea-air-freight.png",
    navTitle: "Air & Sea Freight",
    navDescription: "Flexible air and sea freight solutions for domestic and international shipping requirements.",
    heroTitle: "Air & Sea Freight",
    heroTagline: "Flexible transportation for every cargo requirement.",
    heroDescription: "Whether your cargo is time-critical or cost-sensitive, we match the right transport mode, air, FCL, LCL, breakbulk, or charter, to your domestic or international shipment.",
    whatWeHandleTitle: "Choose Your Mode",
    whatWeHandleGroups: [
      { heading: "Air Freight: for time-critical shipments", items: [
        { title: "Fast Transit", desc: "Shortest possible transit times." },
        { title: "Urgent Cargo", desc: "Priority handling for time-sensitive goods." },
        { title: "Airport-to-Airport", desc: "Direct air routing between airports." },
        { title: "Time-Sensitive Industrial Cargo", desc: "Built for deadlines that matter." },
      ]},
      { heading: "Sea Freight: for flexible, cost-efficient transportation", items: [
        { title: "FCL", desc: "Full container load, dedicated to your cargo." },
        { title: "LCL", desc: "Shared container, pay by volume." },
        { title: "Breakbulk", desc: "For cargo that doesn't fit standard containers." },
        { title: "Charter", desc: "Dedicated vessel charter for large shipments." },
      ]},
    ],
    processTitle: "FCL vs LCL",
    process: [
      { num: "FCL", title: "Full Container", desc: "Dedicated container, suitable for large cargo, more control." },
      { num: "LCL", title: "Shared Container", desc: "Pay based on cargo volume, suitable for smaller shipments." },
    ],
    capabilitiesTitle: "Our Capability",
    capabilities: [
      { title: "Sea Freight Booking", desc: "Vessel space booking across major routes." },
      { title: "Air Freight Booking", desc: "Priority air cargo space booking." },
      { title: "Chartering", desc: "Dedicated vessel or aircraft charter." },
      { title: "Breakbulk", desc: "Handling for non-containerized cargo." },
    ],
    relatedSlugs: ["freight-forwarding", "ppjk-customs", "door-to-door"],
  },
  {
    slug: "inland-transportation",
    image: "/images/inland-transportation.png",
    navTitle: "Inland Transportation",
    navDescription: "Land transportation for general cargo, heavy equipment, and project cargo based on shipment requirements.",
    heroTitle: "Inland Transportation",
    heroTagline: "Reliable land transportation from port to final destination.",
    heroDescription: "From general cargo to heavy and oversized equipment, we coordinate the right fleet, route, and handling to get your cargo to site safely.",
    whatWeHandleTitle: "Transportation Solutions",
    whatWeHandleGroups: [
      { items: [
        { title: "Light Truck", desc: "For smaller and general cargo." },
        { title: "Medium / Heavy Truck", desc: "For industrial cargo and larger shipments." },
        { title: "Lowbed Trailer", desc: "For heavy equipment and project cargo." },
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
      { num: "06", title: "Site Delivery", desc: "Final delivery to the destination or project site." },
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
    relatedSlugs: ["door-to-door", "stevadoring", "ppjk-customs"],
  },
  {
    slug: "stevadoring",
    image: "/images/stevadoring.png",
    navTitle: "Stevedoring & Cargo Handling",
    navDescription: "Loading and unloading services to support port operations and cargo handling requirements.",
    heroTitle: "Stevedoring & Cargo Handling",
    heroTagline: "Safe and efficient cargo loading and unloading.",
    heroDescription: "We handle loading and unloading of cargo between vessel and shore, coordinating equipment, manpower, and safety procedures to support port operations and keep your cargo on schedule.",
    whatWeHandleTitle: "What We Handle",
    whatWeHandleGroups: [
      { items: [
        { title: "Vessel Loading", desc: "Loading cargo onto the vessel according to the stowage plan." },
        { title: "Vessel Unloading", desc: "Discharging cargo from the vessel to the quay or storage area." },
        { title: "Lashing & Securing", desc: "Securing cargo on board to prevent movement during transit." },
        { title: "Cargo Handling Equipment", desc: "Coordinating cranes, forklifts, and other handling equipment." },
      ]},
    ],
    processTitle: "Our Process",
    process: [
      { num: "01", title: "Cargo & Vessel Assessment", desc: "Reviewing cargo type, dimensions, weight, and vessel details." },
      { num: "02", title: "Handling Plan", desc: "Preparing equipment, manpower, and safety plan." },
      { num: "03", title: "Port Coordination", desc: "Coordinating schedule and permits with the port and vessel agent." },
      { num: "04", title: "Loading / Unloading", desc: "Executing cargo movement under supervision." },
      { num: "05", title: "Lashing & Inspection", desc: "Securing cargo and checking condition after handling." },
      { num: "06", title: "Reporting", desc: "Completion report and documentation for all parties." },
    ],
    capabilitiesTitle: "Why Choose Us",
    capabilities: [
      { title: "Experienced Crew", desc: "Trained personnel for general and heavy cargo handling." },
      { title: "Safety First", desc: "Strict safety procedures for cargo and crew." },
      { title: "Equipment Coordination", desc: "Right equipment arranged for each type of cargo." },
      { title: "Port Network", desc: "Established coordination with ports and vessel agents." },
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
