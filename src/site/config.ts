export const SITE_URL = "https://www.shopibuild.com";
export const SITE_NAME = "ShopiBuild";

export type Locale = "ar" | "en";
export const LOCALES: Locale[] = ["ar", "en"];

// Arabic is the default locale and has no prefix; English lives under /en.
export function localePath(locale: Locale, path = "/"): string {
  if (locale === "ar") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function absoluteUrl(locale: Locale, path = "/"): string {
  return SITE_URL + localePath(locale, path);
}

// hreflang map for a path that exists in the given locales.
export function languageAlternates(path: string, locales: Locale[] = LOCALES) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(locales.includes("ar") ? "ar" : locales[0], path);
  return languages;
}

export const OG_LOCALE: Record<Locale, string> = { ar: "ar_AE", en: "en_AE" };
