import { defineType } from "sanity";
export default defineType({
  name: "office", title: "Kantor (Jakarta/Semarang/Surabaya)", type: "document",
  fields: [
    { name: "city", title: "Kota", type: "string" },
    { name: "type", title: "Tipe (Head Office / Branch Office)", type: "string" },
    { name: "address", title: "Alamat", type: "text" },
    { name: "phone", title: "Telepon kantor", type: "string" },
    { name: "whatsapp", title: "WhatsApp (format 62812xxxx tanpa +)", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "mapImage", title: "Gambar peta", type: "image" },
    { name: "order", title: "Urutan", type: "number" },
  ],
  preview: { select: { title: "city", subtitle: "type" } },
});
