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
        "In the mid of 2015, PT. Lautan Berlian Abadi set it self to on focus develop business onto the field of General Supplier & Trading Business.",
        "LBA serves the logistics needs of various key regions in Indonesia, including Sumatra, Java, Kalimantan, West Nusa Tenggara (NTB) and East Nusa Tenggara (NTT), Sulawesi, Maluku, and Papua.",
      ],
      checklist: ["Safety first for cargo and crew", "On-time delivery with updates", "Transparent costing & compliance", "Flexible solutions for remote sites"],
      history: ["Started at 2006 as a General Trading & Logistics Provider Company PT. Lautan Berlian Abadi is moving towards it's vision as an Logistics / Project Transport which have a National Reliability Reputation. Our Services starting from custom clearance, ship agent, stevadoring, warehousing, containerize/bulk transport (by railway or trucking), Heavy Transport & Door to Door services.",
        "The journey towards this vision is more focused when we conduct a visibility study on the distribution of Spareparts, Machines & Accesories parts of Industry, Mining and Marine transport in 2014.",
      ],
      exp: "We have strong experiences to handle big-scale projects for Domestic and International delivery.",
      vision: {
        title: "Vision",
        body: "Provide total logistics solution services that are efficient in terms of time and cost.",
        },
      mission: {
        title: "Mission",
        items: "To deliver safe, high-quality, and efficient services while creating added value for customers and building sustainable business partnerships.",
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
          title: "Licensed & Legal",
          bullets: ["PPJK Licensed", "Customs Compliant"],
          desc: "Fully licensed freight forwarder and customs broker, ensuring full compliance with Indonesian customs and trade regulations.",
        },
        {
          title: "Beyond Borders",
          bullets: ["Coverage Kalimantan, NTB, NTT, Sulawesi, Maluku, Papua, remote sites"],
          desc: "Extensive logistics network reaching remote islands and rural areas across Eastern Indonesia, from Kalimantan to Papua.",
        },
        {
          title: "Assured",
          bullets: ["Safety First", "On-time", "Transparent Costing"],
          desc: "Committed to operational safety, timely delivery, and transparent honest costing that builds lasting trust.",
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
      title: "Let us handle your next heavy shipment.",
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
      years: "Proyek",
      ship: "Pengiriman / bln",
      cont: "Kontainer / bln",
      proj: "Proyek",
      part: "Mitra & pelanggan",
    },

    about: {
      tag: "Tentang kami",
      title: "Mitra Logistik Handal Anda",
      body: [
        "Pada pertengahan tahun 2015, PT. Lautan Berlian Abadi menetapkan fokusnya untuk mengembangkan bisnis di bidang Pemasok Umum & Perdagangan.",
        " LBA melayani kebutuhan logistik di berbagai wilayah utama di Indonesia, termasuk Sumatra, Jawa, Kalimantan, NTB & NTT, Sulawesi, Maluku, dan Papua.",
      ],
      checklist: ["Keamanan kargo dan kru jadi prioritas", "Pengiriman tepat waktu dengan update berkala", "Biaya transparan & sesuai aturan", "Solusi fleksibel untuk lokasi terpencil"],
      history: ["Didirikan pada tahun 2006 sebagai perusahaan penyedia jasa perdagangan umum dan logistik, PT. Lautan Berlian Abadi terus bergerak menuju visi perusahaan sebagai penyedia jasa logistik dan transportasi proyek yang memiliki reputasi keandalan di tingkat nasional. Layanan kami mencakup mulai dari kepabeanan, agen kapal, bongkar muat, pergudangan, pengangkutan kontainer dan curah (melalui kereta api atau truk), pengangkutan barang berat, serta layanan door-to-door.",
        "Perjalanan menuju visi ini menjadi lebih terarah ketika kita melakukan studi visibilitas mengenai distribusi suku cadang, mesin, dan perlengkapan di sektor industri, pertambangan, dan transportasi laut pada tahun 2014.",
      ],
      exp: "Kami memiliki pengalaman yang mumpuni dalam menangani proyek berskala besar untuk pengiriman di dalam negeri maupun ke luar negeri.",
      vision: {
        title: "Visi",
        body: "Menyediakan layanan solusi logistik terpadu yang efisien dari sisi waktu dan biaya.",
      },
      mission: {
        title: "Misi",
        items: "Untuk memberikan layanan yang aman, berkualitas tinggi, dan efisien, sekaligus menciptakan nilai tambah bagi pelanggan dan membangun kemitraan bisnis yang berkelanjutan.",
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
          title: "Legal & Berizin",
          bullets: ["Berlisensi PPJK", "Patuh Kepabeanan"],
          desc: "Freight forwarder dan broker kepabeanan berlisensi penuh, memastikan kepatuhan penuh terhadap peraturan kepabeanan dan perdagangan Indonesia.",
        },
        {
          title: "Batas Bukan Hambatan",
          bullets: ["Jangkauan Kalimantan, NTB, NTT, Sulawesi, Maluku, Papua, hingga lokasi terpencil"],
          desc: "Jaringan logistik luas yang menjangkau pulau terpencil dan daerah pedesaan di seluruh Indonesia Timur, dari Kalimantan hingga Papua.",
        },
        {
          title: "Terjamin",
          bullets: ["Keselamatan Utama", "Tepat Waktu", "Biaya Transparan"],
          desc: "Berkomitmen pada keselamatan operasional, pengiriman tepat waktu, serta biaya yang transparan dan jujur demi membangun kepercayaan jangka panjang.",
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
      title: "Serahkan saja pengiriman barang berat Anda berikutnya kepada kami.",
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
        "2015年年中，PT. Lautan Berlian Abadi 确定将业务重点放在综合供应与贸易领域。",
        "LBA为印度尼西亚各主要地区提供物流服务，包括苏门答腊、爪哇、加里曼丹、西努沙登加拉省和东努沙登加拉省、苏拉威西、马鲁古以及巴布亚",
      ],
      checklist: ["货物与船员安全至上", "准时交付并提供实时更新", "成本透明合规", "为偏远地点提供灵活方案"],
      history: ["PT. Lautan Berlian Abadi 于 2006 年成立，最初是一家综合性贸易与物流服务提供商，目前正朝着成为一家在物流及项目运输领域享有全国可靠声誉的企业这一愿景迈进。我们的服务涵盖报关、船舶代理、装卸、仓储、集装箱/散货运输（铁路或公路运输）、重型运输及门到门服务。",
        "当我们于2014年对工业、采矿和海运领域的备件、机械及配件的分布情况开展可见性研究时，实现这一愿景的进程将更加明确",
      ],
      exp: "我们在处理面向国内和国际市场的大型项目方面拥有丰富的经验。",
      vision: {
        title: "愿景",
        body: "提供在时间和成本方面均高效的全方位物流解决方案服务。",
      },
      mission: {
        title: "使命",
        items: "在提供安全、优质、高效服务的同时，为客户创造附加值，并建立可持续的业务合作伙伴关系。",
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
          title: "已获许可且合法",
          bullets: ["PPJK 持证", "符合海关规定"],
          desc: "持有完整牌照的货运代理与报关行，确保完全符合印度尼西亚海关与贸易法规。",
        },
        {
          title: "超越边界",
          bullets: ["覆盖加里曼丹、西努沙登加拉、东努沙登加拉、苏拉威西、马鲁古、巴布亚及偏远地区"],
          desc: "广泛的物流网络，覆盖印度尼西亚东部的偏远岛屿和农村地区，从加里曼丹一直到巴布亚。",
        },
        {
          title: "有保证的",
          bullets: ["安全第一", "准时", "成本透明"],
          desc: "致力于运营安全、准时交付以及透明诚信的成本，赢得长久信任。",
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
      title: "请把您的下一批大件货物交给我们来处理吧。",
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