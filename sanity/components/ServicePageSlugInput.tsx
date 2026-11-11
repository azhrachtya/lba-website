import { useEffect, useState } from "react";
import { set, unset, useClient, useDocumentStore, type StringInputProps } from "sanity";
import { services } from "../../lib/serviceContent";

type PageOption = { value: string; title: string };
type PageOptions = {
  pages: (PageOption & { serviceId: string | null })[];
  services: { _id: string; title: string }[];
};

const builtInPages = services.map((service) => ({
  value: service.slug,
  title: service.navTitle,
}));
const legacyTitles = new Set(builtInPages.map((page) => page.title.toLowerCase()));

const pageOptionsQuery = {
  fetch: `{
    "pages": *[_type == "serviceDetail" && defined(slug.current)] | order(slug.current asc){
      "value": slug.current,
      "title": coalesce(service->title.en, service->title.id, service->title.zh, heroTitle.en, slug.current),
      "serviceId": service._ref
    },
    "services": *[_type == "service"] | order(order asc){
      _id,
      "title": coalesce(title.en, title.id, title.zh, "Layanan tanpa nama")
    }
  }`,
  listen: `*[_type in ["service", "serviceDetail"]]`,
};
const queryOptions = { apiVersion: "2025-02-19", perspective: "published" } as const;

export default function ServicePageSlugInput({ elementProps, onChange, readOnly, value }: StringInputProps) {
  const client = useClient({ apiVersion: queryOptions.apiVersion });
  const store = useDocumentStore();
  const [data, setData] = useState<PageOptions>({ pages: [], services: [] });
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let receivedLiveData = false;

    // Muat opsi awal meskipun koneksi pembaruan otomatis belum tersambung.
    client.fetch<PageOptions>(pageOptionsQuery.fetch, {}, {
      perspective: queryOptions.perspective,
      signal: controller.signal,
    }).then((result) => {
      if (!controller.signal.aborted && !receivedLiveData) {
        setData(result);
        setLoadFailed(false);
      }
    }).catch(() => {
      if (!controller.signal.aborted && !receivedLiveData) setLoadFailed(true);
    });

    const subscription = store.listenQuery(pageOptionsQuery, {}, queryOptions).subscribe({
      next(result: PageOptions) {
        receivedLiveData = true;
        setData(result);
        setLoadFailed(false);
      },
      error(error) {
        console.warn("Pembaruan daftar halaman detail gagal:", error);
      },
    });

    return () => {
      controller.abort();
      subscription.unsubscribe();
    };
  }, [client, store]);

  const options = new Map(builtInPages.map((page) => [page.value, page.title]));
  const servicesWithPages = new Set(data.pages.map((page) => page.serviceId));
  data.pages.forEach((page) => options.set(page.value, page.title));
  if (value && !options.has(value)) options.set(value, value);

  const pending = data.services.filter((service) =>
    !servicesWithPages.has(service._id) && !legacyTitles.has(service.title.trim().toLowerCase())
  );

  return (
    <>
      <select
        {...elementProps}
        disabled={readOnly}
        value={value ?? ""}
        onChange={(event) => {
          const slug = event.currentTarget.value;
          onChange(slug ? set(slug) : unset());
        }}
        style={{ width: "100%", minHeight: 36, paddingInline: 8, font: "inherit" }}
      >
        <option value="">Pilih halaman detail</option>
        {[...options].map(([slug, title]) => (
          <option key={slug} value={slug}>{title}</option>
        ))}
        {pending.length > 0 && (
          <optgroup label="Halaman detail belum terbit">
            {pending.map((service) => (
              <option key={service._id} disabled>{service.title}</option>
            ))}
          </optgroup>
        )}
      </select>
      {loadFailed && <small role="status">Daftar dari Sanity gagal dimuat. Muat ulang Studio untuk mencoba lagi.</small>}
    </>
  );
}
