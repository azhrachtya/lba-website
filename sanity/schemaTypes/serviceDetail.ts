import { defineType } from "sanity";

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
  
    { name: "heroTitle", title: "Judul hero", type: "localizedString" },
    { name: "heroTagline", title: "Tagline hero", type: "localizedString" },
    { name: "heroDescription", title: "Deskripsi hero", type: "localizedText" },
    { name: "whatWeHandleTitle", title: "Judul bagian daftar (What We Handle)", type: "localizedString" },
    {
      name: "groups",
      title: "Grup daftar",
      type: "array",
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
              of: [
                {
                  type: "object",
                  name: "item",
                  fields: [
                    { name: "title", title: "Judul", type: "localizedString" },
                    { name: "desc", title: "Deskripsi", type: "localizedText" },
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