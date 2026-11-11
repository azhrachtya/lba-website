import { defineType } from "sanity";
import ServicePageSlugInput from "../components/ServicePageSlugInput";
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
      description: "Pilih dan urutkan layanan yang tampil di bagian Layanan Terkait. Jika dokumen detail juga punya daftar, daftar detail tampil lebih dulu.",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (r: any) => r.unique().max(4),
    },
    {
      name: "pageSlug",
      title: "Halaman Detail",
      type: "string",
      description: "Pilih halaman tujuan. Layanan baru bisa dipilih setelah halaman detailnya dipublikasikan. Halaman yang terhubung lewat \"Untuk layanan\" dipakai otomatis setelah dipublikasikan.",
      components: { input: ServicePageSlugInput },
    },
  ],
  preview: { select: { title: "title.en", media: "image" } },
});