import type { MetadataRoute } from "next";
import { getAllPosts, getSlugs, postLocales } from "@/blog/posts";
import { getAllLanding, getLandingSlugs, landingLocales } from "@/landing/pages";
import { LOCALES, SITE_URL, localePath, type Locale } from "@/site/config";

function entry(path: string, locales: Locale[], lastModified: string, priority: number): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, SITE_URL + localePath(l, path)]));
  return locales.map((l) => ({
    url: SITE_URL + localePath(l, path),
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = LOCALES.flatMap((l) => getAllPosts(l));
  const newest = posts.map((p) => p.updated).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
  const updatedBySlug = new Map(posts.map((p) => [p.slug, p.updated]));

  const landingUpdated = new Map(LOCALES.flatMap((l) => getAllLanding(l)).map((p) => [p.slug, p.updated || newest]));

  return [
    ...entry("/", LOCALES, newest, 1),
    ...entry("/services", LOCALES, newest, 0.9),
    ...getLandingSlugs().flatMap((slug) => entry(`/${slug}`, landingLocales(slug), landingUpdated.get(slug) ?? newest, 0.9)),
    ...entry("/blog", LOCALES, newest, 0.8),
    ...getSlugs().flatMap((slug) => entry(`/blog/${slug}`, postLocales(slug), updatedBySlug.get(slug) ?? newest, 0.7)),
  ];
}
