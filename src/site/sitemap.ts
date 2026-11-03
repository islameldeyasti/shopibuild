import { getAllPosts, getSlugs, postLocales } from "@/blog/posts";
import { getAllLanding, getLandingSlugs, landingLocales } from "@/landing/pages";
import { LOCALES, SITE_URL, localePath, type Locale } from "./config";

// The sitemap is split into sections so Search Console reports indexing per section.
// Browsers render it through /sitemap.xsl; crawlers ignore the stylesheet.

type Entry = { loc: string; lastmod: string; priority: number; alternates: { lang: string; href: string }[] };

export const SITEMAP_SECTIONS = ["pages", "blog"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];

const today = () => new Date().toISOString().slice(0, 10);

function entries(path: string, locales: Locale[], lastmod: string, priority: number): Entry[] {
  const alternates = [
    ...locales.map((l) => ({ lang: l, href: SITE_URL + localePath(l, path) })),
    { lang: "x-default", href: SITE_URL + localePath(locales.includes("ar") ? "ar" : locales[0], path) },
  ];
  return locales.map((l) => ({ loc: SITE_URL + localePath(l, path), lastmod, priority, alternates }));
}

function newestPostDate() {
  return LOCALES.flatMap((l) => getAllPosts(l)).map((p) => p.updated).sort().at(-1) ?? today();
}

export function sectionEntries(section: SitemapSection): Entry[] {
  if (section === "pages") {
    const updated = new Map(LOCALES.flatMap((l) => getAllLanding(l)).map((p) => [p.slug, p.updated]));
    const newest = [...updated.values(), newestPostDate()].filter(Boolean).sort().at(-1) ?? today();
    return [
      ...entries("/", LOCALES, newest, 1),
      ...entries("/services", LOCALES, newest, 0.9),
      ...getLandingSlugs().flatMap((slug) => entries(`/${slug}`, landingLocales(slug), updated.get(slug) || newest, 0.9)),
    ];
  }
  const posts = LOCALES.flatMap((l) => getAllPosts(l));
  const updated = new Map(posts.map((p) => [p.slug, p.updated]));
  const newest = newestPostDate();
  return [
    ...entries("/blog", LOCALES, newest, 0.8),
    ...getSlugs().flatMap((slug) => entries(`/blog/${slug}`, postLocales(slug), updated.get(slug) || newest, 0.7)),
  ];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const HEAD = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;

export function urlsetXml(section: SitemapSection): string {
  const urls = sectionEntries(section)
    .map(
      (e) =>
        `  <url>\n    <loc>${esc(e.loc)}</loc>\n` +
        e.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${esc(a.href)}"/>\n`).join("") +
        `    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n");
  return `${HEAD}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

export function indexXml(): string {
  const items = SITEMAP_SECTIONS.map((s) => {
    const lastmod = sectionEntries(s).map((e) => e.lastmod).sort().at(-1) ?? today();
    return `  <sitemap>\n    <loc>${SITE_URL}/sitemap-${s}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
  }).join("\n");
  return `${HEAD}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export function xmlResponse(body: string) {
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
