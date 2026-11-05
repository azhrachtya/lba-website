import assert from "node:assert/strict";
import test from "node:test";

import {
  buildHomeViewModel,
  buildServiceImageMaps,
  localizeLocalizedValues,
  resolveCanonicalServiceSlug,
} from "../lib/serviceDocument.js";

test("canonical CMS slug wins when request uses a legacy service slug", () => {
  assert.equal(
    resolveCanonicalServiceSlug("legacy-cargo", "canonical-cargo", "legacy-cargo"),
    "canonical-cargo",
  );
  assert.equal(resolveCanonicalServiceSlug("legacy-cargo", "", "legacy-cargo"), "legacy-cargo");
  assert.equal(resolveCanonicalServiceSlug("requested", "", ""), "requested");
});

test("home view model reuses merged offices and resolves the CMS hero poster URL", () => {
  const merged = [{ city: "Jakarta" }, { city: "Surabaya" }];
  let received;
  const view = buildHomeViewModel(
    { offices: [{ city: "Jakarta" }], settings: { heroImageUrl: "https://cdn.example/hero.webp" } },
    (offices) => {
      received = offices;
      return merged;
    },
  );

  assert.deepEqual(received, [{ city: "Jakarta" }]);
  assert.strictEqual(view.offices, merged);
  assert.equal(view.heroPoster, "https://cdn.example/hero.webp");
});

test("one service image result creates separate card and hero maps", () => {
  const maps = buildServiceImageMaps(
    [
      { pageSlug: "cargo", title: "Cargo", card: "card.webp", hero: "hero.webp" },
      { title: "Air Freight", card: "air-card.webp", hero: "air-hero.webp" },
    ],
    (title) => title.toLowerCase().replaceAll(" ", "-"),
  );

  assert.deepEqual(maps.cards, {
    cargo: "card.webp",
    "air-freight": "air-card.webp",
  });
  assert.deepEqual(maps.heroes, {
    cargo: "hero.webp",
    "air-freight": "air-hero.webp",
  });
});

test("missing CMS localizations use one batched translation call", async () => {
  const calls = [];
  const result = await localizeLocalizedValues(
    [
      { en: "Hero", id: "Pahlawan" },
      { en: "Description" },
      { en: "Handling" },
      null,
    ],
    "id",
    async (texts, lang) => {
      calls.push({ texts, lang });
      return texts.map((text) => `ID:${text}`);
    },
  );

  assert.deepEqual(calls, [
    { texts: ["Description", "Handling"], lang: "id" },
  ]);
  assert.deepEqual(result, ["Pahlawan", "ID:Description", "ID:Handling", ""]);
});
