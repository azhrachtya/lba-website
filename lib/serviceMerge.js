function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasCompleteGroups(groups) {
  return (
    Array.isArray(groups) &&
    groups.length > 0 &&
    groups.every(
      (group) =>
        Array.isArray(group?.items) &&
        group.items.length > 0 &&
        group.items.every((item) => hasText(item?.title) && hasText(item?.desc)),
    )
  );
}

function pickText(primary, fallback) {
  return hasText(primary) ? primary : fallback || "";
}

function mergeServiceDetail(cms, fallback) {
  const cmsGroupsComplete = hasCompleteGroups(cms?.whatWeHandleGroups);

  if (!fallback) {
    const hasRequiredCmsContent =
      hasText(cms?.navTitle) &&
      hasText(cms?.heroTitle) &&
      hasText(cms?.heroTagline) &&
      hasText(cms?.heroDescription) &&
      hasText(cms?.whatWeHandleTitle) &&
      cmsGroupsComplete;

    if (!hasRequiredCmsContent) return null;
  }

  return {
    ...fallback,
    ...cms,
    slug: cms?.slug || fallback?.slug || "",
    navTitle: pickText(cms?.navTitle, fallback?.navTitle),
    navDescription: pickText(cms?.navDescription, fallback?.navDescription),
    heroTitle: pickText(cms?.heroTitle, fallback?.heroTitle),
    heroTagline: pickText(cms?.heroTagline, fallback?.heroTagline),
    heroDescription: pickText(cms?.heroDescription, fallback?.heroDescription),
    whatWeHandleTitle: pickText(
      cms?.whatWeHandleTitle,
      fallback?.whatWeHandleTitle,
    ),
    whatWeHandleGroups: cmsGroupsComplete
      ? cms.whatWeHandleGroups
      : fallback?.whatWeHandleGroups || [],
    relatedSlugs: cmsGroupsComplete
      ? cms?.relatedSlugs || []
      : fallback?.relatedSlugs || [],
  };
}

exports.mergeServiceDetail = mergeServiceDetail;
