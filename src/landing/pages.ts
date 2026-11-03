import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter, render } from "@/blog/posts";
import type { Locale } from "@/site/config";

// Service and city landing pages live in content/pages/<slug>/<locale>.md and are served at /<slug> and /en/<slug>.
const DIR = path.join(process.cwd(), "content/pages");

export type LandingKind = "service" | "city";

export type LandingMeta = {
  slug: string;
  locale: Locale;
  kind: LandingKind;
  title: string;
  description: string;
  heading: string;
  eyebrow: string;
  keyword: string;
  area: string;
  order: number;
  updated: string;
  related: string[];
};

export type LandingPage = LandingMeta & {
  html: string;
  faq: { q: string; a: string }[];
};

function readFile(slug: string, locale: Locale) {
  const file = path.join(DIR, slug, `${locale}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

function toMeta(slug: string, locale: Locale, data: Record<string, string>): LandingMeta {
  return {
    slug,
    locale,
    kind: data.kind === "city" ? "city" : "service",
    title: data.title ?? slug,
    description: data.description ?? "",
    heading: data.heading || data.title || slug,
    eyebrow: data.eyebrow ?? "",
    keyword: data.keyword ?? "",
    area: data.area ?? "",
    order: Number(data.order ?? 99),
    updated: data.updated ?? "",
    related: (data.related ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  };
}

export function getLandingSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((d) => fs.statSync(path.join(DIR, d)).isDirectory());
}

export function landingLocales(slug: string): Locale[] {
  return (["ar", "en"] as Locale[]).filter((l) => readFile(slug, l) !== null);
}

export function getAllLanding(locale: Locale): LandingMeta[] {
  return getLandingSlugs()
    .map((slug) => {
      const raw = readFile(slug, locale);
      return raw ? toMeta(slug, locale, parseFrontmatter(raw).data) : null;
    })
    .filter((p): p is LandingMeta => p !== null)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getLanding(locale: Locale, slug: string): LandingPage | null {
  const raw = readFile(slug, locale);
  if (!raw) return null;
  const { data, body } = parseFrontmatter(raw);
  const { html, faq } = render(body);
  return { ...toMeta(slug, locale, data), html, faq };
}
