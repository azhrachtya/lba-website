import { isLang } from "@/lib/seo";
import { notFoundCopy, notFoundLinks } from "@/lib/notFound";

export function GET(_request: Request, { params }: { params: { lang: string } }) {
  const lang = isLang(params.lang) ? params.lang : "en";
  const { title, description, home, services } = notFoundCopy[lang];
  const links = notFoundLinks(lang);

  return new Response(`<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${title} | PT Lautan Berlian Abadi</title>
  <style>
    body{margin:0;background:#eff4fb;color:#0f172a;font:1rem/1.5 system-ui,sans-serif}
    main{display:grid;min-height:100vh;place-items:center;padding:2rem;box-sizing:border-box}
    div{max-width:32rem;text-align:center}
    h1{margin:.5rem 0;font-size:clamp(2rem,6vw,3rem);line-height:1.15}
    p{margin:0;color:#475569}
    nav{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:2rem}
    a{border:1px solid #cbd5e1;border-radius:999px;padding:.6rem 1.2rem;color:#0f172a;font-weight:600}
    a:first-child{border-color:#0f172a;background:#0f172a;color:#fff}
  </style>
</head>
<body>
  <main><div>
    <p>404</p>
    <h1>${title}</h1>
    <p>${description}</p>
    <nav><a href="${links.home}">${home}</a><a href="${links.services}">${services}</a></nav>
  </div></main>
</body>
</html>`, {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
