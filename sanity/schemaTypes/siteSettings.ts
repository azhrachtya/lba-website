import { defineType } from "sanity";
export default defineType({
  name: "siteSettings", title: "Pengaturan Website (Foto Hero & About)", type: "document",
  fields: [
    { name: "heroImage", title: "Foto Hero (kapal)", type: "image", options: { hotspot: true } },
    { name: "aboutImage", title: "Foto About Us", type: "image", options: { hotspot: true } },
    { name: "aboutImage2", title: "Foto About Us 2 (tengah)", type: "image", options: { hotspot: true } },
    { name: "aboutImage3", title: "Foto About Us 3 (kanan)", type: "image", options: { hotspot: true } },
    { name: "ctaImage", title: "Foto banner 'Let us handle...'", type: "image", options: { hotspot: true } },
  ],
});
