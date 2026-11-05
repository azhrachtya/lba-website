import { defineType } from "sanity";

export default defineType({
  name: "office",
  title: "Kantor",
  type: "document",
  fields: [
    { name: "city", title: "Kota", type: "string", validation: (r) => r.required() },
    {
      name: "type",
      title: "Tipe",
      type: "string",
      options: {
        list: [
          { title: "Head Office", value: "head" },
          { title: "Branch Office", value: "branch" },
        ],
      },
      validation: (r) => r.required(),
    },
    { name: "address", title: "Alamat", type: "text" },
    { name: "phone", title: "Telepon kantor", type: "string" },
    { name: "whatsapp", title: "WhatsApp (format 62812xxxx tanpa +)", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "order", title: "Urutan", type: "number" },
    { name: "photo", title: "Foto kantor", type: "image", options: { hotspot: true } },
  ],
  preview: { select: { title: "city", subtitle: "type", media: "photo" } },
});