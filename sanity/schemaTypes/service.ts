import { defineType } from "sanity";
export default defineType({
  name: "service", title: "Services", type: "document",
  fields: [
    { name: "title", title: "Nama Layanan", type: "localizedString" },
    { name: "description", title: "Deskripsi", type: "localizedText" },
    { name: "image", title: "Foto (opsional)", type: "image", options: { hotspot: true }, validation: (r: any) => r.required() },
    { name: "order", title: "Urutan", type: "number" },
    { name: "heroImage", title: "Hero Image (halaman detail)", type: "image", options: { hotspot: true } },
    {
      name: "related",
      title: "Layanan terkait",
      type: "array",
      description: "Layanan lain yang sering dipakai bersama layanan ini. Tampil di bagian Related Services.",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (r: any) => r.unique().max(4),
    },
    // ↓ FIELD BARU, taruh di sini
    {
      name: "pageSlug",
      title: "Halaman Detail",
      type: "string",
      hidden: ({ document }: any) => !document?.pageSlug,
      options: {
        list: [
                { title: "Import & Export Cargo Handling", value: "import-export-cargo-handling" },
                { title: "Customs Clearance Specialist", value: "customs-clearance-specialist" },
                { title: "PPJK & Door-to-Door Logistics", value: "door-to-door" },
                { title: "Air & Sea Freight", value: "sea-air-freight" },
                { title: "Inland Transportation", value: "inland-transportation" },
                { title: "Stevedoring & Cargo Handling", value: "stevedoring" },
              ],
      },
    },
  ],
  preview: { select: { title: "title.en", media: "image" } },
});