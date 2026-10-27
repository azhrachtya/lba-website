import { defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Foto Hero & About",
  type: "document",
  fields: [
    { name: "heroImage", title: "Foto Hero (kapal)", type: "image", options: { hotspot: true } },
    { name: "aboutImage", title: "Foto About Us", type: "image", options: { hotspot: true } },
  ],
  preview: {
    prepare() {
      return { title: "Pengaturan Website (Foto Hero & About)", media: "image" };
    },
  },
});