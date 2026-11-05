import { defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Hero & About",
  type: "document",
  fields: [
    {
      name: "heroVideoMp4",
      title: "Video Hero (MP4)",
      type: "file",
      options: { accept: "video/mp4" },
      description: "Wajib kalau mau pakai video dari CMS. Disarankan di bawah 10 MB, tanpa suara, maksimal 1080p.",
    },
    {
      name: "heroVideoWebm",
      title: "Video Hero (WebM, opsional)",
      type: "file",
      options: { accept: "video/webm" },
    },
    {
      name: "heroImage",
      title: "Foto Hero (cadangan / tampil sebelum video jalan)",
      type: "image",
      options: { hotspot: true },
    },
    { name: "aboutImage", title: "Foto About Us", type: "image", options: { hotspot: true } },
  ],
  preview: {
    select: { media: "heroImage" },
    prepare: ({ media }) => ({ title: "Hero & About", media }),
  },
});