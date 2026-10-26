import { defineType } from "sanity";
export default defineType({
  name: "service", title: "Layanan (Services)", type: "document",
  fields: [
    { name: "title", title: "Nama Layanan", type: "localizedString" },
    { name: "description", title: "Deskripsi", type: "localizedText" },
    { name: "image", title: "Foto (opsional)", type: "image", options: { hotspot: true }, validation: (r: any) => r.required() },
    { name: "order", title: "Urutan", type: "number" },
    { name: "heroImage", title: "Hero Image (halaman detail)", type: "image", options: { hotspot: true } },

    // ↓ FIELD BARU, taruh di sini
    {
      name: "pageSlug",
      title: "Halaman Detail",
      type: "string",
      options: {
        list: [
                { title: "Import & Export Cargo Handling", value: "freight-forwarding" },
                { title: "Customs Clearance Specialist", value: "ppjk-customs" },
                { title: "PPJK & Door-to-Door Logistics", value: "door-to-door" },
                { title: "Air & Sea Freight", value: "sea-air-freight" },
                { title: "Inland Transportation", value: "inland-transportation" },
                { title: "Stevedoring & Cargo Handling", value: "stevadoring" },
              ],
      },
    },
  ],
  preview: { select: { title: "title.en", media: "image" } },
});