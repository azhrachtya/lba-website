const fs = require("fs");
const path = require("path");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );

// 1) Tailwind arbitrary value: text-[10px], max-w-[150px], h-[470px], dll
for (const dir of ["components", "app"]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of walk(dir).filter((f) => f.endsWith(".tsx"))) {
    const src = fs.readFileSync(f, "utf8");
    const out = src.replace(/\[(\d+(?:\.\d+)?)px\]/g, (_, n) => `[${+(n / 16).toFixed(4)}rem]`);
    if (out !== src) { fs.writeFileSync(f, out); console.log("updated", f); }
  }
}

// 2) globals.css (nilai di bawah 4px dibiarkan: border, stroke)
const cssPath = "app/globals.css"; // ganti kalau lokasinya beda
const css = fs.readFileSync(cssPath, "utf8");
fs.writeFileSync(
  cssPath,
  css.replace(/(\d+(?:\.\d+)?)px/g, (m, n) => (+n < 4 ? m : `${+(n / 16).toFixed(4)}rem`))
);
console.log("done");