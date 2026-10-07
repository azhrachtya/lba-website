import { defineType } from "sanity";
export default defineType({
  name: "clientLogo", title: "Logo Klien (Trusted by)", type: "document",
  fields: [
    { name: "name", title: "Nama Perusahaan", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    { name: "order", title: "Urutan", type: "number" },
  ],
  preview: { select: { title: "name", media: "logo" } },
});
