const baseUrl = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3210").replace(/\/$/, "");
const expectNoIndex = process.env.SMOKE_EXPECT_NOINDEX !== "false";

const routes = [
  "/",
  "/id",
  "/zh",
  "/projects",
  "/id/projects",
  "/services/import-export-cargo-handling",
  "/id/services/import-export-cargo-handling",
  "/studio",
  "/robots.txt",
  "/sitemap.xml",
];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  if (response.status !== 200) {
    throw new Error(`${route}: expected HTTP 200, received ${response.status}`);
  }
  console.log(`PASS ${response.status} ${route}`);
}

const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
if (expectNoIndex && !robots.includes("Disallow: /")) {
  throw new Error("robots.txt does not block staging crawlers");
}

const translateResponse = await fetch(`${baseUrl}/api/translate`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ texts: ["Hello"], lang: "id" }),
});
if (translateResponse.status !== 200) {
  throw new Error(`/api/translate: expected HTTP 200, received ${translateResponse.status}`);
}
const translateBody = await translateResponse.json();
if (!Array.isArray(translateBody.translations) || translateBody.translations.length !== 1) {
  throw new Error("/api/translate returned an invalid response shape");
}
console.log("PASS 200 /api/translate");

const invalidMimeResponse = await fetch(`${baseUrl}/api/translate`, {
  method: "POST",
  headers: { "content-type": "application/jsonp" },
  body: JSON.stringify({ texts: ["Hello"], lang: "id" }),
});
if (invalidMimeResponse.status !== 415) {
  throw new Error(`/api/translate invalid MIME: expected HTTP 415, received ${invalidMimeResponse.status}`);
}
console.log("PASS 415 /api/translate invalid MIME");
