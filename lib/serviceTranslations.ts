// Terjemahan tetap (ID & 中文) untuk halaman detail service.
// Ditulis di kode, jadi ikut ke HTML dari server dan bisa dibaca Google.
// Kunci = slug di serviceContent.ts. `items` urutannya HARUS sama dengan urutan item
// di whatWeHandleGroups (semua grup digabung berurutan). Kalau item ditambah/dihapus di
// serviceContent.ts, ubah juga di sini.
import type { ServiceContent } from "./serviceContent";
import type { Lang } from "./i18n";

type ServiceText = {
  navTitle: string;
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  whatWeHandleTitle: string;
  items: { title: string; desc: string }[];
};

const T: Record<string, { id: ServiceText; zh: ServiceText }> = {
  "freight-forwarding": {
    id: {
      navTitle: "Penanganan Kargo Impor & Ekspor",
      heroTitle: "Penanganan Kargo Impor & Ekspor",
      heroTagline: "Pengiriman terkoordinasi, dari asal hingga tujuan akhir.",
      heroDescription: "Kami menangani kargo impor dan ekspor melalui pengaturan pengiriman, dokumentasi, booking, transportasi, dan pelacakan yang terkoordinasi untuk mendukung pergerakan kargo dari asal hingga tujuan.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Koordinasi Impor & Ekspor", desc: "Koordinasi pengaturan pengiriman, booking, dokumentasi, dan pergerakan kargo dari asal hingga tujuan." },
        { title: "Kargo Umum", desc: "Koordinasi penanganan dan transportasi barang umum untuk pengiriman domestik maupun internasional." },
        { title: "Project Cargo", desc: "Logistik terkoordinasi untuk peralatan industri, struktur baja, dan kargo terkait proyek." },
        { title: "Kargo Berat & Berdimensi Besar", desc: "Koordinasi transportasi untuk alat berat dan kargo berdimensi besar, sesuai kebutuhan rute dan penanganan." },
        { title: "Kargo Breakbulk", desc: "Koordinasi angkutan laut dan penanganan untuk pengiriman berdimensi besar atau non-kontainer." },
      ],
    },
    zh: {
      navTitle: "进出口货物处理",
      heroTitle: "进出口货物处理",
      heroTagline: "协调有序的运输，从起点直达最终目的地。",
      heroDescription: "我们通过协调的运输安排、单证、订舱、运输和货物跟踪，处理进出口货物，支持货物从起点到目的地的流转。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "进出口协调", desc: "协调运输安排、订舱、单证以及货物从起点到目的地的流转。" },
        { title: "普通货物", desc: "协调国内外货运中普通货物的装卸与运输。" },
        { title: "项目货物", desc: "为工业设备、钢结构及项目相关货物提供协调一致的物流服务。" },
        { title: "重型与超大货物", desc: "根据路线和装卸要求，协调重型设备及超大货物的运输。" },
        { title: "散杂货", desc: "为超大或非集装箱货物协调海运及装卸。" },
      ],
    },
  },

  "ppjk-customs": {
    id: {
      navTitle: "Spesialis Kepabeanan",
      heroTitle: "Spesialis Kepabeanan",
      heroTagline: "Menyederhanakan kepabeanan. Menjaga kargo Anda tetap bergerak.",
      heroDescription: "Dukungan kepabeanan untuk pengiriman impor dan ekspor, meliputi dokumen kepabeanan, koordinasi deklarasi, dan komunikasi dengan pihak terkait untuk mendukung proses clearance kargo yang sesuai ketentuan.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Deklarasi Kepabeanan Impor & Ekspor", desc: "Koordinasi deklarasi kepabeanan impor dan ekspor, termasuk dokumen PIB dan PEB, sesuai kebutuhan." },
        { title: "Dokumen Kepabeanan", desc: "Bantuan terkait dokumen kepabeanan dan koordinasi untuk mendukung pengajuan yang akurat dan lengkap." },
        { title: "Koordinasi Pemangku Kepentingan", desc: "Koordinasi antara pengirim, penerima barang, dan pihak terkait dalam proses clearance kepabeanan." },
        { title: "Koordinasi Pemeriksaan Kepabeanan", desc: "Koordinasi persyaratan pemeriksaan dan dokumen pendukung bila diminta oleh otoritas terkait." },
        { title: "Koordinasi Clearance Kargo", desc: "Tindak lanjut dan koordinasi progres clearance untuk mendukung pergerakan kargo selanjutnya." },
      ],
    },
    zh: {
      navTitle: "清关专家",
      heroTitle: "清关专家",
      heroTagline: "简化清关，让您的货物畅通无阻。",
      heroDescription: "为进出口货物提供清关支持，包括报关单证、申报协调以及与相关方沟通，以确保货物合规清关。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "进出口报关申报", desc: "协调进出口报关申报，包括适用的 PIB 和 PEB 单证。" },
        { title: "报关单证", desc: "协助处理报关相关单证并做好协调，确保申报准确、完整。" },
        { title: "相关方协调", desc: "协调发货人、收货人及清关流程中的相关各方。" },
        { title: "海关查验协调", desc: "在相关部门要求时，协调查验要求及配套文件。" },
        { title: "货物放行协调", desc: "跟进并协调清关进度，以支持货物的后续运输。" },
      ],
    },
  },

  "door-to-door": {
    id: {
      navTitle: "PPJK & Logistik Door-to-Door",
      heroTitle: "PPJK & Logistik Door-to-Door",
      heroTagline: "Satu layanan terkoordinasi, dari asal hingga ke depan pintu Anda.",
      heroDescription: "Kami menggabungkan layanan PPJK dengan logistik terkoordinasi, mengelola kepabeanan, transportasi, dan pengiriman untuk membantu memindahkan kargo Anda dari asal hingga tujuan akhir.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Penjemputan Kargo & Penanganan di Asal", desc: "Koordinasi penjemputan kargo dan penanganan di lokasi asal sesuai kebutuhan pengiriman." },
        { title: "Koordinasi PPJK & Kepabeanan", desc: "Koordinasi dokumen kepabeanan dan prosedur clearance sesuai ketentuan yang berlaku." },
        { title: "Freight & Transportasi", desc: "Koordinasi angkutan laut, angkutan udara, dan transportasi darat sesuai rute pengiriman dan kebutuhan kargo." },
        { title: "Koordinasi Pengiriman Akhir", desc: "Koordinasi pengiriman kargo ke penerima barang yang ditunjuk atau tujuan akhir." },
      ],
    },
    zh: {
      navTitle: "PPJK 与门到门物流",
      heroTitle: "PPJK 与门到门物流",
      heroTagline: "一站式协调服务，从起点直达您的门口。",
      heroDescription: "我们将 PPJK 服务与协调物流相结合，统筹清关、运输和配送，帮助您的货物从起点运送至最终目的地。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "货物提取与起运地处理", desc: "根据运输需求，协调货物提取及起运地处理。" },
        { title: "PPJK 与清关协调", desc: "按照适用规定，协调报关单证及清关手续。" },
        { title: "货运与运输", desc: "根据运输路线和货物要求，协调海运、空运及内陆运输。" },
        { title: "末端交付协调", desc: "协调将货物交付至指定收货人或最终目的地。" },
      ],
    },
  },

  "sea-air-freight": {
    id: {
      navTitle: "Angkutan Udara & Laut",
      heroTitle: "Angkutan Udara & Laut",
      heroTagline: "Menghubungkan kargo Anda ke seluruh dunia.",
      heroDescription: "Solusi angkutan udara dan laut yang fleksibel untuk pengiriman domestik dan internasional, disesuaikan dengan kebutuhan kargo, jadwal pengiriman, dan tujuan Anda.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Angkutan Udara", desc: "Koordinasi kargo udara untuk pengiriman yang membutuhkan angkutan udara, sesuai ketersediaan rute dan layanan." },
        { title: "Angkutan Laut", desc: "Solusi angkutan laut untuk pengiriman kontainer dan kargo lain yang sesuai." },
        { title: "Koordinasi Pengiriman", desc: "Koordinasi booking, dokumen pengiriman, dan pergerakan kargo sepanjang proses pengiriman." },
      ],
    },
    zh: {
      navTitle: "空运与海运",
      heroTitle: "空运与海运",
      heroTagline: "让您的货物连通世界。",
      heroDescription: "为国内和国际货运提供灵活的空运和海运方案，根据您的货物要求、交付时间和目的地量身定制。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "空运", desc: "为需要空运的货物协调空运服务，视航线及服务可用性而定。" },
        { title: "海运", desc: "为集装箱及其他适合的货物提供海运方案。" },
        { title: "运输协调", desc: "在整个运输过程中协调订舱、运输单证及货物流转。" },
      ],
    },
  },

  "inland-transportation": {
    id: {
      navTitle: "Transportasi Darat",
      heroTitle: "Transportasi Darat",
      heroTagline: "Pengiriman andal di setiap rute.",
      heroDescription: "Solusi transportasi darat untuk kargo umum, alat berat, dan project cargo, dikoordinasikan sesuai spesifikasi kargo, kondisi rute, dan kebutuhan pengiriman.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Transportasi Kargo Umum", desc: "Transportasi darat untuk barang umum antara gudang, pelabuhan, dan tujuan yang ditentukan." },
        { title: "Transportasi Alat Berat", desc: "Koordinasi transportasi mesin dan alat berat berdasarkan bobot, dimensi, dan kebutuhan rute." },
        { title: "Transportasi Project Cargo", desc: "Koordinasi transportasi darat untuk struktur baja dan kargo terkait proyek lainnya." },
      ],
    },
    zh: {
      navTitle: "内陆运输",
      heroTitle: "内陆运输",
      heroTagline: "每条路线，可靠送达。",
      heroDescription: "为普通货物、重型设备和项目货物提供陆路运输方案，根据货物规格、路线条件和交付要求协调安排。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "普通货物运输", desc: "在仓库、港口及指定目的地之间提供普通货物公路运输。" },
        { title: "重型设备运输", desc: "根据重量、尺寸和路线要求，协调机械及重型设备的运输。" },
        { title: "项目货物运输", desc: "为钢结构及其他项目相关货物协调陆路运输。" },
      ],
    },
  },

  stevedoring: {
    id: {
      navTitle: "Stevedoring & Penanganan Kargo",
      heroTitle: "Stevedoring & Penanganan Kargo",
      heroTagline: "Penanganan terkoordinasi. Pergerakan kargo yang andal.",
      heroDescription: "LBA mengoordinasikan layanan stevedoring dan penanganan kargo melalui penyedia jasa yang ditunjuk untuk mendukung bongkar muat serta pergerakan kargo industri dan proyek.",
      whatWeHandleTitle: "Yang Kami Tangani",
      items: [
        { title: "Koordinasi Bongkar Muat", desc: "Koordinasi kegiatan pemuatan dan pembongkaran kargo di pelabuhan dan lokasi penanganan yang ditentukan." },
        { title: "Penanganan Kargo Breakbulk", desc: "Koordinasi pengaturan penanganan untuk kargo berdimensi besar atau non-kontainer." },
        { title: "Koordinasi Vendor & Operasional", desc: "Koordinasi dengan penyedia jasa yang ditunjuk untuk mendukung kebutuhan penanganan kargo dan jadwal pengiriman." },
      ],
    },
    zh: {
      navTitle: "装卸与货物处理",
      heroTitle: "装卸与货物处理",
      heroTagline: "协调有序的装卸，可靠的货物流转。",
      heroDescription: "LBA 通过指定服务商协调装卸及货物处理服务，支持工业和项目货物的装卸与流转。",
      whatWeHandleTitle: "我们的服务范围",
      items: [
        { title: "装卸协调", desc: "协调港口及指定作业地点的货物装卸作业。" },
        { title: "散杂货装卸", desc: "协调超大或非集装箱货物的装卸安排。" },
        { title: "供应商与运营协调", desc: "与指定服务商协调，以满足货物装卸需求并配合运输时间表。" },
      ],
    },
  },
};

// Kembalikan versi service dalam bahasa yang diminta (EN = apa adanya).
// Kalau terjemahan untuk slug itu belum ada, otomatis jatuh ke bahasa Inggris.
export function localize(s: ServiceContent, lang: Lang): ServiceContent {
  if (lang === "en") return s;
  const tx = T[s.slug]?.[lang];
  if (!tx) return s;

  let n = 0; // penunjuk urutan item (semua grup digabung)
  return {
    ...s,
    navTitle: tx.navTitle,
    heroTitle: tx.heroTitle,
    heroTagline: tx.heroTagline,
    heroDescription: tx.heroDescription,
    whatWeHandleTitle: tx.whatWeHandleTitle,
    whatWeHandleGroups: s.whatWeHandleGroups.map((g) => ({
      ...g,
      items: g.items.map((it) => tx.items[n++] ?? it),
    })),
  };
}
