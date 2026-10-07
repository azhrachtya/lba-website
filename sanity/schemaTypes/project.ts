import { defineType } from "sanity";
export default defineType({
  name: "project", title: "Portfolio / Recent Deliveries", type: "document",
  fields: [
    { name: "cover", title: "Foto Utama", type: "image", options: { hotspot: true }, validation: (r: any) => r.required() },
{ name: "category", title: "Kategori", type: "string",
  options: { list: ["Breakbulk", "Heavylift", "Inland", "Warehousing", "Project Cargo"] }, validation: (r: any) => r.required() },    { name: "title", title: "Nama Project (Project Name)", type: "localizedString", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subjudul Project (Project Subtitle)", type: "localizedString" },
    { name: "description", title: "Deskripsi / Caption Singkat", type: "localizedText" },
    { name: "client", title: "Client", type: "localizedString" },
    { name: "consignee", title: "Consignee", type: "text", rows: 2 },
    { name: "cargoType", title: "Jenis Barang", type: "localizedString" },
    { name: "route", title: "Rute", type: "text", rows: 2 },
    { name: "mode", title: "Moda", type: "localizedString" },
    { name: "gallery", title: "Dokumentasi (Foto-foto)", type: "array", of: [{ type: "image" }] },
    { name: "order", title: "Urutan tampil (kecil = duluan)", type: "number" },
  ],
  orderings: [{ title: "Urutan", name: "o", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", subtitle: "category", media: "cover" } },
});
