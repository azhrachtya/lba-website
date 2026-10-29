import { NextRequest, NextResponse } from "next/server";

const LANGS = ["id", "zh"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /en/... tidak dipakai: arahkan ke alamat tanpa awalan
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLang = LANGS.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (!hasLang) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url); // alamat di browser tetap "/"
  }
}

export const config = {
  matcher: ["/((?!api|studio|_next|.*\\..*).*)"],
};