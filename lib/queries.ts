import { client } from "@/sanity/lib/client";
import { defaultOffices, defaultProjects, defaultServices } from "./defaults";
import { autoTranslateList } from "./autoTranslate";
import { matchSlugFromTitle } from "@/lib/serviceContent";



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
// Foto kartu service (dari field "image"): slug -> URL
export async function getServiceImages() {
  const rows = await client.fetch(
    `*[_type == "service" && defined(image.asset)]{
      "title": title.en,
      "url": image.asset->url
    }`
  );
  const map: Record<string, string> = {};
  rows.forEach((r: any) => {
    const slug = matchSlugFromTitle(r.title);
    if (slug) map[slug] = r.url;
  });
  return map;
}

// Foto hero halaman detail (dari field "heroImage"): slug -> URL
export async function getServiceHeroImages() {
  const rows = await client.fetch(
    `*[_type == "service" && defined(heroImage.asset)]{
      "title": title.en,
      "url": heroImage.asset->url
    }`
  );
  const map: Record<string, string> = {};
  rows.forEach((r: any) => {
    const slug = matchSlugFromTitle(r.title);
    if (slug) map[slug] = r.url;
  });
  return map;
}