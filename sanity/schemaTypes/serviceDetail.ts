import { defineType } from "sanity";

const requireEnglish = (rule: any) =>
  rule.required().custom((value: any) =>
    typeof value?.en === "string" && value.en.trim()
      ? true
      : "Teks English wajib diisi",
  );

export default defineType({
  name: "serviceDetail",
  title: "Services: Isi Halaman Detail",
  type: "document",
  fields: [
  {
    name: "service",
    title: "Untuk layanan",
    type: "reference",
    to: [{ type: "service" }],
    description: "Pilih layanan dari daftar Services. Nama, foto, dan hero image diambil dari sana.",
    validation: (r: any) => r.required(),
  },

  {
    name: "slug",
    title: "Alamat halaman (slug)",
    type: "slug",
    description: "Huruf kecil dan tanda -, contoh: warehousing. Alamatnya jadi /services/warehousing",
    validation: (r: any) => r.required(),
  },

    { name: "heroTitle", title: "Judul hero", type: "localizedString", validation: requireEnglish },
    { name: "heroTagline", title: "Tagline hero", type: "localizedString", validation: requireEnglish },
    { name: "heroDescription", title: "Deskripsi hero", type: "localizedText", validation: requireEnglish },
    { name: "whatWeHandleTitle", title: "Judul bagian daftar (What We Handle)", type: "localizedString", validation: requireEnglish },
    {
      name: "groups",
      title: "Grup daftar",
      type: "array",
      validation: (r: any) => r.required().min(1),
      of: [
        {
          type: "object",
          name: "group",
          fields: [
            { name: "heading", title: "Judul grup (opsional)", type: "localizedString" },
            {
              name: "items",
              title: "Item",
              type: "array",
              validation: (r: any) => r.required().min(1),
              of: [
                {
                  type: "object",
                  name: "item",
                  fields: [
                    { name: "title", title: "Judul", type: "localizedString", validation: requireEnglish },
                    { name: "desc", title: "Deskripsi", type: "localizedText", validation: requireEnglish },
                  ],
                  preview: { select: { title: "title.en", subtitle: "title.id" } },
                },
              ],
            },
          ],
          preview: { select: { title: "heading.en" } },
        },
      ],
    },
    {
      name: "related",
      title: "Layanan terkait (urutan tampil)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    },
  ],
  preview: { select: { title: "service.title.en", subtitle: "heroTitle.en", media: "service.image" } },
});