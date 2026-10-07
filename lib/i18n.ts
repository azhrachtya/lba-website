// SEMUA teks statis (label, judul, tombol) 3 bahasa ada di sini.

export type Lang = "en" | "id" | "zh";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "id", label: "ID" },
  { code: "zh", label: "中文" },
];

export const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      project: "Project",
      coverage: "Coverage",
      contact: "Contact",
    },

    hero: {
      title: "Integrated Logistics Solutions",
      body: "Moving Businesses Forward Through Reliable Logistics Solutions",
      sub: "Reliable logistics support for freight movement, customs clearance, transportation, warehousing, and project cargo across Indonesia.",
      est: "EST. 2015",
      years: "Projects",
      ship: "Shipments / mo",
      cont: "Containers / mo",
      proj: "Projects",
      part: "Partners & customers",
    },

    about: {
      tag: "About us",
      title: "Your Reliable Logistics Partner",
      body: [
        "Established in 2015, PT Lautan Berlian Abadi (LBA) is an integrated logistics company based in North Jakarta, Indonesia. LBA provides logistics solutions covering freight forwarding, PPJK and customs clearance, sea and air freight services, inland transportation, warehousing, and project cargo.",
        "Supported by branch operations in Jakarta, Semarang, and Surabaya, LBA serves logistics requirements across major regions of Indonesia, including Sumatra, Java, Kalimantan, NTB & NTT, Sulawesi, Maluku, and Papua.",
      ],
    },

    why: {
      title: "Why choose LBA",
      items: [
        ["Integrated Solutions", "Multiple logistics services through one reliable partner."],
        ["Reliable Operations", "Structured coordination to support smooth cargo movement."],
        ["Responsive Service", "Clear communication and responsive operational support."],
        ["Flexible Solutions", "Tailored to different cargo and customer requirements."],
      ],
    },

    services: {
      tag: "Services",
      title: "End-to-end logistics.",
      sub: "One partner from origin to site: customs, freight, heavy haulage and warehousing.",
    },

    portfolio: {
      tag: "Project portfolio",
      title: "Recent deliveries",
      all: "All",
      details: "View details",
      client: "Client",
      year: "Year",
      consignee: "Consignee",
      cargoType: "Cargo Type",
      route: "Route",
      mode: "Mode",
      docs: "Documentation",
      viewMore: "View all projects",
    },

    coverage: {
      tag: "Coverage",
      title: "All Indonesia Logistics Coverage.",
      sub: "Nationwide coverage from Sabang to Merauke.",
      ports: "Ports & sites",
      islandGroup: "Island group",
      endToEnd: "End-to-end control",
      desc: "One partner for customs, freight, heavy haulage and beach landing from western Sumatra to eastern Papua.",
      hub: "LBA Office Hub",
      destination: "Destination Port",
    },

    clients: {
      tag: "Trusted by industry",
      title: "Industrial and project leaders",
    },

    cta: {
      title: "Let’s Discuss Your Logistics Requirements",
      sub: "Looking for a reliable logistics partner? Contact LBA to discuss your freight, customs, transportation, warehousing, or project cargo requirements",
      wa: "WhatsApp",
      call: "Call",
      email: "Email",
    },

    contact: {
      title: "Let us handle your next heavy shipment.",
      head: "Head Office",
      branch: "Branch Office",
    },

    footer: {
      tagline: "Integrated Logistics Solutions",
      rights: "All Rights Reserved.",
      est: "Established 2015",
    },

    categories: {
      Breakbulk: "Breakbulk",
      Heavylift: "Heavylift",
      Inland: "Inland",
      Warehousing: "Warehousing",
      "Project Cargo": "Project Cargo",
    },

    serviceDetail: {
      related: "Related Services",
      relatedDesc: "This service often works together with:",
      getQuote: "Get a Quote",
      needSupport: "Need logistics support?",
      talkTeam: "Talk to our team about your",
      contactUs: "Contact Us",
    },
  },

  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      services: "Layanan",
      project: "Proyek",
      coverage: "Jangkauan",
      contact: "Kontak",
    },

    hero: {
      title: "Solusi Logistik Terpadu",
      body: "Mendorong Kemajuan Bisnis Melalui Solusi Logistik yang Andal",
      sub: "Dukungan logistik andal untuk pengiriman barang, kepabeanan, transportasi, pergudangan, dan project cargo di seluruh Indonesia.",
      est: "SEJAK 2015",
      years: "Proyek",
      ship: "Pengiriman / bln",
      cont: "Kontainer / bln",
      proj: "Proyek",
      part: "Mitra & pelanggan",
    },

    about: {
      tag: "Tentang kami",
      title: "Mitra Logistik Andal Anda",
      body: [
        "Berdiri pada tahun 2015, PT Lautan Berlian Abadi (LBA) adalah perusahaan logistik terpadu yang berkantor pusat di Jakarta Utara, Indonesia. LBA menyediakan solusi logistik yang mencakup jasa pengurusan pengiriman barang, PPJK, dan kepabeanan, layanan pengiriman barang melalui laut dan udara, transportasi darat, pergudangan, serta pengiriman barang proyek.",
        "Didukung oleh kantor cabang di Jakarta, Semarang, dan Surabaya, LBA melayani kebutuhan logistik di berbagai wilayah utama di Indonesia, termasuk Sumatra, Jawa, Kalimantan, NTB & NTT, Sulawesi, Maluku, dan Papua.",
      ],
    },

    why: {
      title: "Kenapa memilih LBA",
      items: [
        ["Solusi Terpadu", "Beragam layanan logistik lewat satu mitra andal."],
        ["Operasional Andal", "Koordinasi terstruktur agar pergerakan kargo lancar."],
        ["Layanan Responsif", "Komunikasi jelas dan dukungan operasional yang sigap."],
        ["Solusi Fleksibel", "Disesuaikan dengan jenis kargo dan kebutuhan pelanggan."],
      ],
    },

    services: {
      tag: "Layanan",
      title: "Logistik dari ujung ke ujung.",
      sub: "Satu mitra dari asal hingga lokasi tujuan: kepabeanan, freight, angkut berat, dan pergudangan.",
    },

    portfolio: {
      tag: "Portofolio proyek",
      title: "Pengiriman terbaru",
      all: "Semua",
      details: "Lihat detail",
      client: "Klien",
      year: "Tahun",
      consignee: "Consignee",
      cargoType: "Jenis Barang",
      route: "Rute",
      mode: "Moda",
      docs: "Dokumentasi",
      viewMore: "Lihat semua proyek",
    },

    coverage: {
      tag: "Jangkauan",
      title: "Jangkauan Logistik Seluruh Indonesia.",
      sub: "Layanan nasional dari Sabang sampai Merauke.",
      ports: "Pelabuhan & lokasi",
      islandGroup: "Kelompok pulau",
      endToEnd: "Kendali menyeluruh",
      desc: "Satu mitra untuk kepabeanan, freight, angkutan berat, dan beach landing dari Sumatra bagian barat hingga Papua bagian timur.",
      hub: "Hub Kantor LBA",
      destination: "Pelabuhan Destinasi",
    },

    clients: {
      tag: "Dipercaya industri",
      title: "Pemimpin industri dan proyek",
    },

    cta: {
      title: "Mari diskusikan kebutuhan logistik Anda",
      sub: "Sedang mencari mitra logistik yang andal? Hubungi LBA untuk mendiskusikan kebutuhan Anda terkait pengiriman barang, bea cukai, transportasi, pergudangan, atau kargo proyek",
      wa: "WhatsApp",
      call: "Telepon",
      email: "Email",
    },

    contact: {
      title: "Serahkan saja pengiriman barang berat Anda berikutnya kepada kami.",
      head: "Kantor Pusat",
      branch: "Kantor Cabang",
    },

    footer: {
      tagline: "Solusi Logistik Terpadu",
      rights: "Hak Cipta Dilindungi.",
      est: "Berdiri 2015",
    },

    categories: {
      Breakbulk: "Breakbulk",
      Heavylift: "Heavylift",
      Inland: "Darat",
      Warehousing: "Pergudangan",
      "Project Cargo": "Project Cargo",
    },

    serviceDetail: {
      related: "Layanan Terkait",
      relatedDesc: "Layanan ini biasa dipakai bersama:",
      getQuote: "Minta Penawaran",
      needSupport: "Butuh dukungan logistik?",
      talkTeam: "Hubungi tim kami soal kebutuhan",
      contactUs: "Hubungi Kami",
    },
  },

  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      services: "服务",
      project: "项目",
      coverage: "覆盖范围",
      contact: "联系我们",
    },

    hero: {
      title: "综合物流解决方案",
      body: "通过可靠的物流解决方案推动企业发展",
      sub: "为印度尼西亚全境提供可靠的货运、清关、运输、仓储及项目货物物流支持。",
      est: "创立于 2015",
      years: "项目",
      ship: "每月货运量",
      cont: "每月集装箱",
      proj: "个项目",
      part: "合作伙伴与客户",
    },

    about: {
      tag: "关于我们",
      title: "值得信赖的物流伙伴",
      body: [
        "PT Lautan Berlian Abadi（LBA）成立于2015年，是一家总部位于印度尼西亚雅加达北部的综合物流公司。LBA提供的物流解决方案涵盖货运代理、PPJK及清关服务、海运和空运服务、内陆运输、仓储以及项目货物运输。",
        "凭借位于雅加达、三宝垄和泗水的分支机构，LBA 能够满足印度尼西亚各大地区（包括苏门答腊、爪哇、加里曼丹、西努沙登加拉省和东努沙登加拉省、苏拉威西、马鲁古和巴布亚）的物流需求。",
      ],
    },

    why: {
      title: "为什么选择 LBA",
      items: [
        ["一站式方案", "通过一个可靠的伙伴获得多种物流服务。"],
        ["可靠运营", "结构化协调，确保货物顺畅运输。"],
        ["响应迅速", "沟通清晰，运营支持及时。"],
        ["灵活方案", "根据不同货物和客户需求量身定制。"],
      ],
    },

    services: {
      tag: "服务",
      title: "端到端物流。",
      sub: "从起点到现场，一个伙伴搞定清关、货运、重型运输和仓储。",
    },

    portfolio: {
      tag: "项目案例",
      title: "近期交付",
      all: "全部",
      details: "查看详情",
      client: "客户",
      year: "年份",
      consignee: "收货人",
      cargoType: "货物类型",
      route: "路线",
      mode: "运输方式",
      docs: "项目资料",
      viewMore: "查看全部项目",
    },

    coverage: {
      tag: "覆盖范围",
      title: "覆盖印尼全境的物流网络。",
      sub: "从沙璜到马老奇的全国覆盖。",
      ports: "港口与站点",
      islandGroup: "岛屿群",
      endToEnd: "端到端管控",
      desc: "从苏门答腊西部到巴布亚东部，一个合作伙伴提供清关、货运、重型运输和海滩登陆服务。",
      hub: "LBA 办事处枢纽",
      destination: "目的港",
    },

    clients: {
      tag: "行业信赖",
      title: "工业与项目领域的领军企业",
    },

    cta: {
      title: "让我们来探讨一下您的物流需求",
      sub: "正在寻找可靠的物流合作伙伴吗？请联系LBA，商讨您的货运、报关、运输、仓储或项目货物需求。",
      wa: "WhatsApp",
      call: "呼叫",
      email: "电子邮件",
    },

    contact: {
      title: "请把您的下一批大件货物交给我们来处理吧。",
      head: "总部",
      branch: "分公司",
    },

    footer: {
      tagline: "综合物流解决方案",
      rights: "版权所有。",
      est: "创立于 2015",
    },

    categories: {
      Breakbulk: "散杂货",
      Heavylift: "重型货物",
      Inland: "陆运",
      Warehousing: "仓储",
      "Project Cargo": "项目货物",
    },

    serviceDetail: {
      related: "相关服务",
      relatedDesc: "此服务通常与以下服务搭配使用：",
      getQuote: "获取报价",
      needSupport: "需要物流支持？",
      talkTeam: "联系我们的团队，咨询您的",
      contactUs: "联系我们",
    },
  },
} as const;

export type L3 = {
  en?: string;
  id?: string;
  zh?: string;
};

export const pick = (v: L3 | undefined, lang: Lang) =>
  v?.[lang] || v?.en || "";