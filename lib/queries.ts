import { client } from "@/sanity/lib/client";
import { defaultOffices, defaultProjects, defaultServices } from "./defaults";
import { autoTranslateList } from "./autoTranslate";

const q = `{
  "settings": *[_type=="siteSettings"][0],
  "projects": *[_type=="project"] | order(order asc),
  "services": *[_type=="service"] | order(order asc),
  "clients": *[_type=="clientLogo"] | order(order asc),
  "offices": *[_type=="office"] | order(order asc)
}`;

export async function getContent() {
  let d: any = {};
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) d = await client.fetch(q, {}, { next: { revalidate: 60 } });
  } catch (e) {
    console.warn("Sanity belum siap, pakai data default");
  }

  let projects = d?.projects?.length ? d.projects : defaultProjects;
  let services = d?.services?.length ? d.services : defaultServices;

  // Auto-translate: kalau admin di Sanity cuma isi field "en" (title/description),
  // id & zh otomatis diisi lewat Google Translate. Kalau id/zh SUDAH diisi manual, dipakai itu.
  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
projects = await autoTranslateList(projects, ["title", "subtitle", "description", "client", "consignee", "cargoType", "route", "mode"]);
services = await autoTranslateList(services, ["title", "description"]);
  }

  return {
    settings: d?.settings || {},
    projects,
    services,
    clients: d?.clients || [],
    offices: d?.offices?.length ? d.offices : defaultOffices,
  };
}
export type Content = Awaited<ReturnType<typeof getContent>>;
