import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import postcss from "postcss";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import minify from "next/dist/compiled/cssnano-simple/index.js";

const output = "lib/site-css.generated.ts";
const dev = process.argv.includes("--dev");
const processor = postcss([tailwind(), autoprefixer(), minify({}, postcss)]);
const sourceDirs = ["app", "components"];

async function compile() {
  const [global, fonts] = await Promise.all([
    readFile("app/globals.css", "utf8"),
    readFile("app/fonts.css", "utf8"),
  ]);
  const { css } = await processor.process(global + "\n" + fonts, { from: "app/globals.css" });
  const module = `export const siteCss = ${JSON.stringify(css.replace(/<\/style/gi, "<\\/style"))};\n`;
  const previous = await readFile(output, "utf8").catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
  if (module !== previous) await writeFile(output, module);
}

await compile();

if (dev) {
  const { watch } = await import("node:fs");
  const require = createRequire(import.meta.url);
  const next = spawn(process.execPath, [
    require.resolve("next/dist/bin/next"), "dev", ...process.argv.slice(3),
  ], { stdio: "inherit" });

  let timer;
  let pending = Promise.resolve();
  const watchers = sourceDirs.map((dir) => watch(dir, { recursive: true }, (_, filename) => {
    if (!filename || !/\.(?:tsx?|css)$/.test(filename)) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      pending = pending.then(compile).catch(error => console.error("CSS compilation failed:", error));
    }, 100);
  }));
  const stop = () => next.kill();
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
  next.on("exit", (code) => {
    clearTimeout(timer);
    watchers.forEach(watcher => watcher.close());
    process.exitCode = code ?? 0;
  });
}
