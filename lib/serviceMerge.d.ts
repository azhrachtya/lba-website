import type { ServiceContent } from "./serviceContent";

export function mergeServiceDetail(
  cms: ServiceContent,
  fallback?: ServiceContent | null,
): ServiceContent | null;
