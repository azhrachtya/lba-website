import { defineType } from "sanity";
// Field teks 3 bahasa: dipakai di semua schema
export const localizedString = defineType({
  name: "localizedString", title: "Teks 3 Bahasa", type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "id", title: "Indonesia", type: "string" },
    { name: "zh", title: "中文", type: "string" },
  ],
});
export const localizedText = defineType({
  name: "localizedText", title: "Paragraf 3 Bahasa", type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 3 },
    { name: "id", title: "Indonesia", type: "text", rows: 3 },
    { name: "zh", title: "中文", type: "text", rows: 3 },
  ],
});
