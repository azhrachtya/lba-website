import { client } from "@/sanity/lib/client";
import { defaultOffices, defaultProjects, defaultServices } from "./defaults";
import { autoTranslateList } from "./autoTranslate";
import { matchSlugFromTitle } from "./serviceContent";


const q = `{
  "settings": *[_type=="siteSettings"][0],
  "projects": *[_type=="project"] | order(order asc),
  "services": *[_type=="service"] | order(order asc),
  "clientLogos": *[_type=="clientLogo" && active == true] | order(order asc),
  "offices": *[_type=="office"] | order(order asc)
}`;

export async function getContent() {
  let d: any = {};
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) d = await client.fetch( q, {}, { cache: "no-store" });
  } catch (e) {
    console.warn("Sanity belum siap, pakai data default");
  }
  
let projects = d?.projects?.length ? d.projects : defaultProjects;
let services = d?.services?.length ? d.services : defaultServices;

// Otomatis terjemahkan judul dan deskripsi layanan
services = await autoTranslateList(services, ["title", "description"]);
projects = await autoTranslateList(projects, ["title","subtitle", "description"]);

  // Auto-translate: kalau admin di Sanity cuma isi field "en" (title/description),
  // id & zh otomatis diisi lewat Google Translate. Kalau id/zh SUDAH diisi manual, dipakai itu.
  return {
    settings: d?.settings || {},
    projects,
    services,
    clients: d?.clientLogos || [],
    offices: d?.offices?.length ? d.offices : defaultOffices,
  };
}
export type Content = Awaited<ReturnType<typeof getContent>>;

// slug layanan → gambar dari Sanity. Dipakai halaman detail & Related Services.
export async function getServiceImages(): Promise<Record<string, any>> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {};
    const rows: any[] = await client.fetch(
      `*[_type=="service"]{ title, "imageUrl": image.asset->url }`,
      {},
      { cache: "no-store" }
    );
    const map: Record<string, any> = {};
    for (const r of rows) {
      // judul di CMS berbentuk {en, id, zh}, cek semuanya
      const titles = typeof r.title === "string" ? [r.title] : [r.title?.en, r.title?.id, r.title?.zh];
      const slug = titles.map((t) => (t ? matchSlugFromTitle(t) : undefined)).find(Boolean);
      if (slug && r.imageUrl) map[slug] = r.imageUrl;    }
    return map;
  } catch (e) {
    console.log("SERVICE IMAGES ERROR", e);
    return {};
  }
}

