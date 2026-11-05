import { defaultOffices } from "@/lib/defaults";

const keyOf = (c: any) => (typeof c === "string" ? c : c?.en ?? "").trim().toLowerCase();
const filled = (v: any) => v !== undefined && v !== null && !(typeof v === "string" && v.trim() === "");
// "Head Office" / "Branch Office" dari CMS -> "head" / "branch"
const normType = (t: any) => (/head|pusat/i.test(String(t ?? "")) ? "head" : "branch");

export function mergeOffices(cms?: any[] | null) {
  const list: any[] = (defaultOffices as any[]).map((o, i) => ({ ...o, order: o.order ?? i + 1 }));

  (cms ?? []).forEach((c) => {
    const k = keyOf(c.city);
    if (!k) return;
    const idx = list.findIndex((o) => keyOf(o.city) === k);

    if (idx >= 0) {
      // Kota yang sama: isi CMS menimpa, kolom yang kosong tetap pakai bawaan
      const merged = { ...list[idx] };
      for (const [key, val] of Object.entries(c)) {
        if (key.startsWith("_") || key === "city" || !filled(val)) continue;
        merged[key] = key === "type" ? normType(val) : val;
      }
      list[idx] = merged;
    } else {
      // Kota baru: ditambahkan di belakang
      list.push({ ...c, type: normType(c.type), order: c.order ?? list.length + 1 });
    }
  });

  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}