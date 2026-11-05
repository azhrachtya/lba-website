function resolveCanonicalServiceSlug(requestedSlug, currentSlug, legacySlug) {
  return currentSlug?.trim() || legacySlug?.trim() || requestedSlug;
}

function buildHomeViewModel(content, mergeOffices) {
  return {
    offices: mergeOffices(content?.offices),
    heroPoster: content?.settings?.heroImageUrl || undefined,
  };
}

function buildServiceImageMaps(rows, slugFromTitle) {
  const cards = {};
  const heroes = {};

  for (const row of rows ?? []) {
    const slug = row?.pageSlug || slugFromTitle(row?.title || "");
    if (!slug) continue;
    if (row?.card) cards[slug] = row.card;
    if (row?.hero) heroes[slug] = row.hero;
  }

  return { cards, heroes };
}

async function localizeLocalizedValues(values, lang, translateBatch) {
  if (lang === "en") return values.map((value) => value?.en || "");

  const result = values.map((value) => value?.[lang] || "");
  const missing = [];
  const missingIndexes = [];

  values.forEach((value, index) => {
    if (!result[index] && value?.en) {
      missing.push(value.en);
      missingIndexes.push(index);
    }
  });

  if (!missing.length) return result;
  const translated = await translateBatch(missing, lang);
  missingIndexes.forEach((index, translatedIndex) => {
    result[index] = translated[translatedIndex] || missing[translatedIndex];
  });
  return result;
}

exports.resolveCanonicalServiceSlug = resolveCanonicalServiceSlug;
exports.buildHomeViewModel = buildHomeViewModel;
exports.buildServiceImageMaps = buildServiceImageMaps;
exports.localizeLocalizedValues = localizeLocalizedValues;
