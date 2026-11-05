import assert from "node:assert/strict";
import test from "node:test";

import { mergeServiceDetail } from "../lib/serviceMerge.js";

test("incomplete CMS service detail preserves localized fallback content", () => {
  const fallback = {
    slug: "cargo",
    navTitle: "Fallback nav",
    navDescription: "Fallback description",
    heroTitle: "Fallback hero",
    heroTagline: "Fallback tagline",
    heroDescription: "Fallback hero description",
    whatWeHandleTitle: "Fallback section",
    whatWeHandleGroups: [
      { items: [{ title: "Fallback item", desc: "Fallback item description" }] },
    ],
    relatedSlugs: ["fallback-related"],
  };

  const result = mergeServiceDetail(
    {
      slug: "cargo",
      navTitle: "",
      navDescription: "",
      heroTitle: "CMS hero",
      heroTagline: "",
      heroDescription: "",
      whatWeHandleTitle: "",
      whatWeHandleGroups: [{ items: [{ title: "", desc: "" }] }],
      relatedSlugs: [],
    },
    fallback,
  );

  assert.equal(result.heroTitle, "CMS hero");
  assert.equal(result.navTitle, "Fallback nav");
  assert.equal(result.heroTagline, "Fallback tagline");
  assert.equal(result.heroDescription, "Fallback hero description");
  assert.equal(result.whatWeHandleTitle, "Fallback section");
  assert.deepEqual(result.whatWeHandleGroups, fallback.whatWeHandleGroups);
  assert.deepEqual(result.relatedSlugs, fallback.relatedSlugs);
});
