import { client } from "@/sanity/lib/client";
import { defaultOffices, defaultProjects, defaultServices } from "./defaults";
import { autoTranslateList } from "./autoTranslate";
import { matchSlugFromTitle } from "@/lib/serviceContent";

const CACHE_TIME = 3600;


function optimizeSanityImage(
  url: string,
  width = 900,
  height = 1022
) {
  if (!url) return url;

  const optimizedUrl = new URL(url);

  optimizedUrl.searchParams.set("w", String(width));
  optimizedUrl.searchParams.set("h", String(height));
  optimizedUrl.searchParams.set("fit", "crop");
  optimizedUrl.searchParams.set("q", "75");
  optimizedUrl.searchParams.set("auto", "format");

  return optimizedUrl.toString();
}

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
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      d = await client.fetch(
        q,
        {},
        {
          next: { revalidate: 300 },
        }
      );
    }
  } catch (e) {
    console.warn("Sanity belum siap, pakai data default");
  }

  let projects = d?.projects?.length
    ? d.projects
    : defaultProjects;

  let services = d?.services?.length
    ? d.services
    : defaultServices;

  services = await autoTranslateList(
    services,
    ["title", "description"]
  );

  projects = await autoTranslateList(
    projects,
    ["title", "subtitle", "description"]
  );

  return {
    settings: d?.settings || {},
    projects,
    services,
    clients: d?.clientLogos || [],
    offices: d?.offices?.length
      ? d.offices
      : defaultOffices,
  };
}
export type Content = Awaited<ReturnType<typeof getContent>>;

// slug layanan → gambar dari Sanity. Dipakai halaman detail & Related Services.
// Foto kartu service (dari field "image"): slug -> URL
// Gambar service dari Sanity
export async function getServiceImages() {
  const rows = await client.fetch(
    `*[_type == "service" && defined(heroImage.asset)]{
      "title": title.en,
      pageSlug,
      "url": heroImage.asset->url
    }`,
    {},
    { cache: "no-store" }
  );

  const map: Record<string, string> = {};

  rows.forEach((r: any) => {
  const slug = r.pageSlug || matchSlugFromTitle(r.title);
  if (slug) map[slug] = r.url;
});

  return map;
}

// Gambar hero halaman detail service dari Sanity
export async function getServiceHeroImages() {
  const rows = await client.fetch(
    `*[_type == "service" && defined(heroImage.asset)]{
      "title": title.en,
      pageSlug,
      "url": heroImage.asset->url
    }`,
    {},
    { cache: "no-store" }
  );

  const map: Record<string, string> = {};

  rows.forEach((r: any) => {
  const slug = matchSlugFromTitle(r.title);
  if (slug) map[slug] = r.url;
});

  return map;
}