import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllLanding } from "@/landing/pages";
import { LANDING_COPY } from "@/landing/copy";
import { SiteChrome } from "@/site/SiteChrome";
import { JsonLd } from "@/site/JsonLd";
import { breadcrumbSchema } from "@/site/schema";
import { OG_LOCALE, SITE_NAME, absoluteUrl, languageAlternates, localePath, type Locale } from "@/site/config";
import "@/blog/blog.css";
import "@/landing/landing.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = LANDING_COPY[locale];
  return {
    title: { absolute: c.indexTitle },
    description: c.indexDescription,
    alternates: { canonical: localePath(locale, "/services"), languages: languageAlternates("/services") },
    openGraph: { type: "website", siteName: SITE_NAME, locale: OG_LOCALE[locale], title: c.indexTitle, description: c.indexDescription, url: localePath(locale, "/services") },
  };
}

export default async function ServicesIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = LANDING_COPY[locale];
  const pages = getAllLanding(locale);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const groups = [
    { title: c.servicesHeading, items: pages.filter((p) => p.kind === "service") },
    { title: c.citiesHeading, items: pages.filter((p) => p.kind === "city") },
  ];

  return (
    <SiteChrome locale={locale} altHref={localePath(other, "/services")}>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.home, url: absoluteUrl(locale) },
          { name: c.services, url: absoluteUrl(locale, "/services") },
        ])}
      />
      <section className="blog-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="breadcrumb">
            <a href={localePath(locale)}>{c.home}</a>
            <span aria-hidden="true">/</span>
            <span>{c.services}</span>
          </nav>
          <h1>{c.indexHeading}</h1>
          <p className="lead">{c.indexLead}</p>
        </div>
      </section>
      <div className="wrap blog-list">
        {groups.map((g) => (
          <section key={g.title} className="blog-cat">
            <h2>{g.title}</h2>
            <div className="cards">
              {g.items.map((p) => (
                <a key={p.slug} className="card" href={localePath(locale, `/${p.slug}`)}>
                  <h3>{p.heading}</h3>
                  <p>{p.description}</p>
                  <span className="meta">{c.more}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteChrome>
  );
}
