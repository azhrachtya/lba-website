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
      proj: "Projects Delivered ",
      ship: "Ports & Sites",
      cont: "All Indonesia Coverage"
    },

    about: {
      tag: "About us",
      title: "Your Reliable Logistics Partner",
      body: [
        "Established in 2015, PT Lautan Berlian Abadi (LBA) is a logistics service provider specializing in integrated logistics, project transportation, customs clearance, freight forwarding, and cargo handling.",
        "We support domestic and international cargo movements through coordinated logistics solutions tailored to our customers’ business needs."
      ],
      vision: {
        title: "Vision",
        body: "To provide total logistics solutions that are efficient in terms of time and cost.",
        },
      mission: {
        title: "Mission",
        items: [
            "• To provide safe services at the right time, in the right quantity, and with the right quality.",
            "• To deliver added value to customers through effectiveness and efficiency.",
            "• To develop a continuous and sustainable business network."
        ]
        },
      values: {
        title: "Core Values",
        intro: "Integrity, Trust and Respect are the foundation of our company's long-term success. With our values and the spirit of professionalism, Lautan Berlian Abadi commits to giving added value to all stakeholders.",
        items: ["Integrity", "Trust", "Respect"],
      },
    },

    why: {
      tag: "WHY CHOOSE US",
      subtitle: "PT Lautan Berlian Abadi | Trusted Logistics & Freight Forwarding Across Indonesia",
      cards: [
        {
          title: "Logistics Integration",
          bullets: [
                      "PPJK-Licensed",
                      "Customs Compliance",
                      "Integrated Freight Forwarding",
                    ],
          desc: "Integrated coordination across customs clearance, freight, transportation, and cargo handling.",
        },
        {
          title: "Brilliant Solutions",
          bullets: [
                    "Coverage of Eastern Indonesia",
                    "Delivery to Remote Areas",
                    "Inter-Island Network",
                  ],
          desc: "Practical and flexible logistics solutions tailored to customer and project requirements.",
        },
        {
          title: "Assured Service",
          bullets: [
                    "Safety First",
                    "On-Time Delivery",
                    "Transparent Pricing",
                  ],
          desc: "Responsive coordination, operational care, and dependable service.",
        },
      ],
    },

    services: {
      tag: "Services",
      title: "End-to-end logistics.",
      sub: "One partner from origin to site: customs, freight, heavy haulage and warehousing.",
    },

    portfolio: {
      title: "Our Projects",
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
      titlegrid: "Our Projects",
      subgrid: "All deliveries",
      descgrid: "Full record of breakbulk, heavylift, and project cargo shipments handled across Indonesia.", 
      count: "projects",
      countOne: "project",
      empty: "No projects in this category yet.",

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
      title: "Let us handle your heavy shipment.",
      head: "Head Office",
      branch: "Branch Office",
    },

    footer: {
      tagline: "Integrated Logistics Solutions",
      rights: "All Rights Reserved.",
      est: "Established 2015",
      locations: "Locations",
      follow: "Follow Us",
    },

    categories: {
      Breakbulk: "Breakbulk",
      Heavylift: "Heavylift",
      Inland: "Inland",
      Warehousing: "Warehousing",
      Project_cargo: "Project Cargo",
    },

    serviceDetail: {
      related: "Related Services",
      relatedDesc: "This service often works together with:",
      getQuote: "Get a Quote",
      needSupport: "Need logistics support?",
      talkTeam: "Talk to our team about your",
      contactUs: "Contact Us",
    },

    serviceNames: {
      freight_forwarding: "Freight Forwarding",
      customs: "PPJK — Customs Clearance Specialist",
      seaAir: "Sea & Air Freight",
      inland: "Inland Transportation",
      warehousing: "Warehousing",
      projectCargo: "Project Cargo",
      stevadoring: "Stevadoring",
    },

    consult: {
      button: "Consultation",
      title: "How can we help?",
      sub: "Choose a topic and contact the LBA team via WhatsApp or email.",
      topicLabel: "Consultation topic",
      general: "General consultation",
      wa: "Continue to WhatsApp",
      email: "Contact via email",
      note: "Official LBA contact. Your message is only sent after you press send in WhatsApp or your email app.",
      close: "Close",
      waGreeting: "Hello LBA, I would like to consult about:",
      emailSubject: "Consultation Request",
      emailGreeting: "Hello LBA team,\n\nI would like to consult about:",
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
      proj: "Proyek yang Telah Diselesaikan",
      ship: "Pelabuhan & Lokasi",
      cont: "Mencakup Seluruh Indonesia"
    },

    about: {
      tag: "Tentang kami",
      title: "Mitra Logistik Handal Anda",
      body: [
        "Didirikan pada tahun 2015, PT Lautan Berlian Abadi (LBA) adalah penyedia jasa logistik yang berspesialisasi dalam logistik terintegrasi, transportasi proyek, kepabeanan, jasa pengiriman barang, dan penanganan kargo.",
        "Kami mendukung pergerakan kargo domestik dan internasional melalui solusi logistik terkoordinasi yang disesuaikan dengan kebutuhan bisnis pelanggan kami."
      ], 
      vision: {
        title: "Visi",
        body: "Untuk menyediakan solusi logistik menyeluruh yang efisien dari segi waktu dan biaya.",
      },
      mission: {
        title: "Misi",
        items: [ 
            "• Memberikan layanan yang aman pada waktu yang tepat, dalam jumlah yang tepat, dan dengan kualitas yang tepat.",
            "• Memberikan nilai tambah kepada pelanggan melalui efektivitas dan efisiensi.",
            "• Membangun jaringan bisnis yang berkelanjutan dan terus berkembang."]
      },
      values: {
        title: "Nilai Utama",
        intro: "Integritas, Kepercayaan, dan Rasa Hormat adalah fondasi kesuksesan jangka panjang perusahaan kami. Dengan nilai-nilai ini dan semangat profesionalisme, Lautan Berlian Abadi berkomitmen memberikan nilai tambah bagi seluruh pemangku kepentingan.",
        items: ["Integritas", "Kepercayaan", "Rasa Hormat"],
      },
    },

    why: {
      tag: "KENAPA MEMILIH KAMI",
      subtitle: "PT Lautan Berlian Abadi | Logistik & Freight Forwarding Terpercaya di Seluruh Indonesia",
      cards: [
        {
          title: "Integrasi Logistik",
          bullets: [
                    "Berlisensi PPJK",
                    "Kepatuhan Kepabeanan",
                    "pengiriman Terpadu",
                  ],
          desc: "Koordinasi terpadu yang mencakup proses bea cukai, pengiriman barang, transportasi, dan penanganan kargo.",
        },
        {
          title: "Solusi Cemerlang",
          bullets: [
                    "Jangkauan Indonesia Timur",
                    "Distribusi ke Daerah Terpencil",
                    "Jaringan Antarpulau",
                  ],
          desc: "Solusi logistik yang praktis dan fleksibel, yang disesuaikan dengan kebutuhan pelanggan dan proyek.",
        },
        {
          title: "Layanan Terjamin",
          bullets: [
                    "Prioritas Keselamatan",
                    "Pengiriman Tepat Waktu",
                    "Biaya Transparan",
                  ],
          desc: "Koordinasi yang responsif, penanganan operasional yang cermat, dan layanan yang dapat diandalkan.",
        },
      ],
    },

    services: {
      tag: "Layanan",
      title: "Logistik menyeluruh",
      sub: "Satu mitra dari asal hingga lokasi tujuan: kepabeanan, kargo, angkut berat, dan pergudangan.",
    },

    portfolio: {
      title: "Proyek Kami",
      all: "Semua",
      details: "Lihat detail",
      client: "Klien",
      year: "Tahun",
      consignee: "Penerima barang",
      cargoType: "Jenis Barang",
      route: "Rute",
      mode: "Moda",
      docs: "Dokumentasi",
      viewMore: "Lihat semua proyek",
      titlegrid: "Proyek Kami",
      subgrid: "Semua pengiriman",
      descgrid: "Catatan lengkap mengenai pengiriman kargo breakbulk, kargo berat, dan kargo proyek yang ditangani di seluruh Indonesia.", 
      count: "proyek",
      countOne: "proyek",
      empty: "Belum ada proyek di kategori ini.",
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
      title: "Serahkan saja pengiriman barang berat Anda kepada kami.",
      head: "Kantor Pusat",
      branch: "Kantor Cabang",
    },

    footer: {
      tagline: "Solusi Logistik Terpadu",
      rights: "Hak Cipta Dilindungi.",
      est: "Berdiri 2015",
      locations: "Lokasi",
      follow: "Ikuti Kami",

    },

    categories: {
      Breakbulk: "Barang curah",
      Heavylift: "Pengangkutan Barang Berat",
      Inland: "Darat",
      Warehousing: "Pergudangan",
      Project_cargo: "Kargo Proyek",
    },

    serviceDetail: {
      related: "Layanan Terkait",
      relatedDesc: "Layanan ini biasa dipakai bersama:",
      getQuote: "Minta Penawaran",
      needSupport: "Butuh dukungan logistik?",
      talkTeam: "Hubungi tim kami soal kebutuhan",
      contactUs: "Hubungi Kami",
    },

    serviceNames: {
      freight_forwarding: "Jasa Pengiriman Barang",
      customs: "PPJK — Kepabeanan",
      seaAir: "Pengiriman Laut & Udara",
      inland: "Transportasi Darat",
      warehousing: "Pergudangan",
      projectCargo: "Kargo Proyek",
      stevadoring: "Bongkar Muat",
    },

    consult: {
      button: "Konsultasi",
      title: "Ada yang bisa kami bantu?",
      sub: "Pilih topik dan hubungi tim LBA melalui WhatsApp atau email.",
      topicLabel: "Topik konsultasi",
      general: "Konsultasi umum",
      wa: "Lanjutkan ke WhatsApp",
      email: "Hubungi melalui email",
      note: "Kontak resmi LBA. Pesan dikirim setelah Anda menekan kirim di WhatsApp atau aplikasi email.",
      close: "Tutup",
      waGreeting: "Halo LBA, saya ingin berkonsultasi mengenai:",
      emailSubject: "Permintaan Konsultasi",
      emailGreeting: "Halo tim LBA,\n\nSaya ingin berkonsultasi mengenai:",
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
      proj: "已完成项目",
      ship: "港口与场地",
      cont: "覆盖整个印度尼西亚"
    },

    about: {
      tag: "关于我们",
      title: "值得信赖的物流伙伴",
      body: [
        "PT Lautan Berlian Abadi（LBA）成立于2015年，是一家专注于综合物流、项目运输、清关、货运代理和货物装卸的物流服务提供商。",
        "我们通过量身定制、协调一致的物流解决方案，支持国内外货物的运输，以满足客户的业务需求。"
      ],
    
      vision: {
        title: "愿景",
        body: "提供在时间和成本上均高效的一站式物流解决方案。",
      },
      mission: {
        title: "使命",
        items:[
            "• 及时, 足量, 高质量地提供安全的服务",
            "• 通过高效和高效率为客户创造附加值。",
            "• 构建持续且可持续的业务网络。"
        ]
      },
      values: {
        title: "核心价值观",
        intro: "诚信、信任与尊重是公司长期成功的基石。凭借这些价值观和专业精神，Lautan Berlian Abadi 致力于为所有利益相关方创造附加价值。",
        items: ["诚信", "信任", "尊重"],
      },
    },

    why: {
      tag: "为什么选择我们",
      subtitle: "PT Lautan Berlian Abadi | 遍布印度尼西亚的可靠物流与货运代理",
      cards: [
        {
          title: "物流整合",
          bullets: ["持有PPJK许可证",
                    "海关合规",
                    "一体化运输",],
          desc: "在通关、货运、运输和货物装卸方面进行全面协调。",
        },
        {
          title: "绝妙解决方案",
          bullets: [
                    "覆盖东印度尼西亚",
                    "向偏远地区配送",
                    "岛际网络",
                  ],
          desc: "根据客户和项目需求量身定制的实用且灵活的物流解决方案。",
        },
        {
          title: "可靠的服务",
          bullets: [
                    "安全优先",
                    "准时送达",
                    "费用透明",
                  ],
          desc: "反应迅速的协调、细致周到的运营和值得信赖的服务。",
        },
      ],
    },

    services: {
      tag: "服务",
      title: "端到端物流。",
      sub: "从起点到现场，一个伙伴搞定清关、货运、重型运输和仓储。",
    },

    portfolio: {
      title: "我们的项目",
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
      titlegrid: "我们的项目",
      subgrid: "所有配送",
      descgrid: "关于在印度尼西亚各地处理的杂货、重型货物和项目货物的完整记录.", 
      count: "个项目",
      countOne: "个项目",
      empty: "该类别暂无项目。",
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
      title: "让我们来为您处理这些大件货物吧",
      head: "总部",
      branch: "分公司",
    },

    footer: {
      tagline: "综合物流解决方案",
      rights: "版权所有。",
      est: "创立于 2015",
      locations: "地点",
      follow: "关注我们",

    },

    categories: {
      Breakbulk: "散杂货",
      Heavylift: "重型货物",
      Inland: "陆运",
      Warehousing: "仓储",
      Project_cargo: "项目货物",
    },

    serviceDetail: {
      related: "相关服务",
      relatedDesc: "此服务通常与以下服务搭配使用：",
      getQuote: "获取报价",
      needSupport: "需要物流支持？",
      talkTeam: "联系我们的团队，咨询您的",
      contactUs: "联系我们",
    },

    serviceNames: {
      freight_forwarding: "货运代理",
      customs: "PPJK — 清关专家",
      seaAir: "海运与空运",
      inland: "内陆运输",
      warehousing: "仓储",
      projectCargo: "项目货物运输",
      stevadoring: "装卸",
    },

    consult: {
      button: "咨询",
      title: "有什么可以帮您？",
      sub: "请选择咨询主题，并通过 WhatsApp 或电子邮件联系 LBA 团队。",
      topicLabel: "咨询主题",
      general: "一般咨询",
      wa: "前往 WhatsApp",
      email: "通过电子邮件联系",
      note: "LBA 官方联系方式。只有在 WhatsApp 或邮件应用中点击发送后，消息才会发出。",
      close: "关闭",
      waGreeting: "您好 LBA，我想咨询：",
      emailSubject: "咨询请求",
      emailGreeting: "LBA 团队您好，\n\n我想咨询：",
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