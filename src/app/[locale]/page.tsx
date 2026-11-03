import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomeCanvas } from "@/homepage/HomeCanvas";
import { JsonLd } from "@/site/JsonLd";
import { organizationSchema } from "@/site/schema";
import { OG_LOCALE, SITE_NAME, SITE_URL, languageAlternates, localePath, type Locale } from "@/site/config";
import "@/homepage/home.css";

const META: Record<Locale, { title: string; description: string }> = {
  ar: {
    title: "تصميم متجر Shopify في الإمارات والخليج | ShopiBuild",
    description: "وكالة Shopify في دبي: نصمّم متجرك الإلكتروني بالعربي والإنجليزي، ونربط Tabby و Tamara والشحن والإعلانات، ونطلقه خلال 5–7 أيام. الباقات من 2,000 درهم.",
  },
  en: {
    title: "Shopify Store Design in Dubai, UAE & the Gulf | ShopiBuild",
    description: "Dubai Shopify agency: we design your Arabic and English online store, connect Tabby, Tamara, shipping and ads, and launch in 5–7 days. Packages from AED 2,000.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = META[locale] ?? META.ar;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: localePath(locale), languages: languageAlternates("/") },
    openGraph: { type: "website", siteName: SITE_NAME, locale: OG_LOCALE[locale], title, description, url: localePath(locale), images: [`${SITE_URL}/logo.png`] },
    twitter: { card: "summary", title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const file = locale === "en" ? "markup.en.html" : "markup.html";
  const html = readFileSync(path.join(process.cwd(), "src/homepage", file), "utf8");
  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <HomeCanvas html={html} />
    </>
  );
}
