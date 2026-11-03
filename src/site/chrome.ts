import { readFileSync } from "node:fs";
import path from "node:path";
import { localePath, type Locale } from "./config";

// Inner pages reuse the homepage's own header, footer and mobile CTA bar so they never drift apart.
const cache = new Map<Locale, { header: string; footer: string; extras: string }>();

function slice(html: string, start: string, end: string) {
  const i = html.indexOf(start);
  if (i < 0) return "";
  const j = html.indexOf(end, i);
  return j < 0 ? "" : html.slice(i, j + end.length);
}

function load(locale: Locale) {
  const hit = cache.get(locale);
  if (hit) return hit;
  const file = locale === "en" ? "markup.en.html" : "markup.html";
  const html = readFileSync(path.join(process.cwd(), "src/homepage", file), "utf8");
  const mbarStart = html.indexOf('<div class="mbar">');
  const parts = {
    header: slice(html, '<header class="site"', "</header>"),
    footer: slice(html, "<footer>", "</footer>"),
    extras: slice(html, '<a class="wa-fab"', "</a>") + (mbarStart < 0 ? "" : html.slice(mbarStart, html.indexOf("\n", mbarStart))),
  };
  cache.set(locale, parts);
  return parts;
}

// In-page anchors (#pricing, #lead…) point back to the homepage sections; the language switch goes to `altHref`.
export function getChrome(locale: Locale, altHref: string) {
  const home = localePath(locale);
  const fix = (s: string) =>
    s
      .replace(/href="#([^"]*)"/g, (_, id: string) => `href="${home}${id ? `#${id}` : ""}"`)
      .replace(/(<a class="lang" href=")[^"]*(")/, `$1${altHref}$2`);
  const { header, footer, extras } = load(locale);
  return { header: fix(header), footer: fix(footer), extras: fix(extras) };
}
