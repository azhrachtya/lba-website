import { defineType } from "sanity";

export default defineType({
  name: "clientLogo",
  title: "Logo Klien (Trusted by)",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Nama Perusahaan",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "order",
      title: "Urutan",
      type: "number",
    },

    {
      name: "active",
      title: "Tampilkan Logo?",
      type: "boolean",
      initialValue: true,
    },
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
      active: "active",
    },
    prepare({ title, media, active }) {
      return {
        title,
        subtitle: active ? "Aktif" : "Nonaktif",
        media,
      };
    },
  },
});