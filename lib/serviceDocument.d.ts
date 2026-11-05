export function resolveCanonicalServiceSlug(
  requestedSlug: string,
  currentSlug?: string | null,
  legacySlug?: string | null,
): string;

export function buildHomeViewModel<T>(
  content: { offices?: T[] | null; settings?: { heroImageUrl?: string | null } | null },
  mergeOffices: (offices?: T[] | null) => T[],
): { offices: T[]; heroPoster?: string };

export function buildServiceImageMaps(
  rows: Array<{
    pageSlug?: string | null;
    title?: string | null;
    card?: string | null;
    hero?: string | null;
  }> | null | undefined,
  slugFromTitle: (title: string) => string,
): { cards: Record<string, string>; heroes: Record<string, string> };

export function localizeLocalizedValues(
  values: Array<{ en?: string; id?: string; zh?: string } | null | undefined>,
  lang: "en" | "id" | "zh",
  translateBatch: (texts: string[], lang: "id" | "zh") => Promise<string[]>,
): Promise<string[]>;
