import { defineType } from "sanity";
export default defineType({
  name: "service", title: "Layanan (Services)", type: "document",
  fields: [
    { name: "title", title: "Nama Layanan", type: "localizedString" },
    { name: "description", title: "Deskripsi", type: "localizedText" },
    { name: "image", title: "Foto (opsional)", type: "image" },
    { name: "order", title: "Urutan", type: "number" },
  ],
  preview: { select: { title: "title.en", media: "image" } },
});
