import { cache } from "react";
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

const getRawContent = cache(async () => {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return await client.fetch(q, {}, { next: { revalidate: 120 } });
    }
  } catch (error) {
    console.warn("Sanity belum siap, pakai data default", error);
  }
  return {};
});

export async function getOffices() {
  const content = await getRawContent();
  return content?.offices?.length ? content.offices : defaultOffices;
}

export const getContent = cache(async () => {
  const d = await getRawContent();
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
    offices: await getOffices(),
  };
});
export type Content = Awaited<ReturnType<typeof getContent>>;

// Gambar hero halaman detail service dari Sanity
export async function getServiceHeroImages() {
  const rows = await client.fetch(
    `*[_type == "service" && defined(heroImage.asset)]{
      "title": title.en,
      pageSlug,
      "url": heroImage.asset->url
    }`,
    {},
    { next: { revalidate: 120 } }
  );

  const map: Record<string, string> = {};

  rows.forEach((r: any) => {
  const slug = matchSlugFromTitle(r.title);
  if (slug) map[slug] = r.url;
});

  return map;
}

export async function getHeroVideos() {
  try {
    const d = await client.fetch(
      `*[_type=="siteSettings"][0]{
        "mp4": heroVideoMp4.asset->url,
        "webm": heroVideoWebm.asset->url
      }`,
      {},
      { next: { revalidate: 120 } }
    );
    return { mp4: d?.mp4 as string | undefined, webm: d?.webm as string | undefined };
  } catch {
    return { mp4: undefined, webm: undefined };
  }
}

export async function getDetailSlugs(): Promise<Record<string, string>> {
  try {
    const rows: any[] = await client.fetch(
      `*[_type=="serviceDetail" && defined(slug.current) && defined(service->title)]{
        "serviceId": service._ref,
        "slug": slug.current
      }`,
      {},
      { next: { revalidate: 120 } }
    );
    const map: Record<string, string> = {};
    rows.forEach((r) => { map[r.serviceId] = r.slug; });
    return map;
  } catch (e) {
    console.warn("getDetailSlugs gagal", e);
    return {};
  }
}