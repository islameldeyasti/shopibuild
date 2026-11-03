import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllLanding, getLanding, landingLocales } from "@/landing/pages";
import { LANDING_COPY } from "@/landing/copy";
import { getAllPosts } from "@/blog/posts";
import { SiteChrome } from "@/site/SiteChrome";
import { JsonLd } from "@/site/JsonLd";
import { ORG_ID, breadcrumbSchema, faqSchema } from "@/site/schema";
import { LOCALES, OG_LOCALE, SITE_NAME, SITE_URL, absoluteUrl, languageAlternates, localePath, type Locale } from "@/site/config";
import "@/blog/blog.css";
import "@/landing/landing.css";

type Params = { locale: Locale; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return LOCALES.flatMap((locale) => getAllLanding(locale).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLanding(locale, slug);
  if (!page) return {};
  const url = localePath(locale, `/${slug}`);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url, languages: languageAlternates(`/${slug}`, landingLocales(slug)) },
    openGraph: { type: "website", siteName: SITE_NAME, locale: OG_LOCALE[locale], title: page.title, description: page.description, url, images: [`${SITE_URL}/logo.png`] },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}

export default async function LandingRoute({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getLanding(locale, slug);
  if (!page) notFound();

  const c = LANDING_COPY[locale];
  const other: Locale = locale === "ar" ? "en" : "ar";
  const altHref = landingLocales(slug).includes(other) ? localePath(other, `/${slug}`) : localePath(other);
  const url = absoluteUrl(locale, `/${slug}`);
  const all = getAllLanding(locale).filter((p) => p.slug !== slug);
  const services = all.filter((p) => p.kind === "service");
  const cities = all.filter((p) => p.kind === "city");
  const posts = getAllPosts(locale);
  const guides = page.related.map((s) => posts.find((p) => p.slug === s)).filter((p) => p !== undefined);

  return (
    <SiteChrome locale={locale} altHref={altHref}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.heading,
          serviceType: page.keyword || page.heading,
          description: page.description,
          url,
          inLanguage: locale,
          provider: { "@id": ORG_ID, "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
          areaServed: page.area ? { "@type": "Place", name: page.area } : undefined,
          offers: { "@type": "Offer", priceCurrency: "AED", price: "2000", description: locale === "ar" ? "الباقات تبدأ من 2,000 درهم" : "Packages from AED 2,000" },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: c.home, url: absoluteUrl(locale) },
          { name: c.services, url: absoluteUrl(locale, "/services") },
          { name: page.heading, url },
        ])}
      />
      {page.faq.length > 0 && <JsonLd data={faqSchema(page.faq)} />}

      <section className="lp-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="breadcrumb">
            <a href={localePath(locale)}>{c.home}</a>
            <span aria-hidden="true">/</span>
            <a href={localePath(locale, "/services")}>{c.services}</a>
          </nav>
          {page.eyebrow && <span className="tag lp-tag">{page.eyebrow}</span>}
          <h1>{page.heading}</h1>
          <p className="lead">{page.description}</p>
          <div className="lp-cta">
            <a className="btn btn-primary" href={`${localePath(locale)}#lead`}>
              {c.book}
            </a>
            <a className="btn btn-ghost" href={`${localePath(locale)}#pricing`}>
              {c.packages}
            </a>
          </div>
          <ul className="lp-trust">
            {c.trust.map((t) => (
              <li key={t}>
                <span className="tick">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <article className="post wrap lp-body">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />

        <aside className="post-cta">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <a className="btn btn-primary" href={`${localePath(locale)}#lead`}>
            {c.book}
          </a>
        </aside>

        {guides.length > 0 && (
          <section className="related">
            <h2>{c.guides}</h2>
            <div className="cards">
              {guides.map((p) => (
                <a key={p.slug} className="card" href={localePath(locale, `/blog/${p.slug}`)}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <nav className="lp-links" aria-label={c.otherServices}>
          <div>
            <h2>{c.otherServices}</h2>
            <ul>
              {services.map((p) => (
                <li key={p.slug}>
                  <a href={localePath(locale, `/${p.slug}`)}>{p.heading}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{c.cities}</h2>
            <ul>
              {cities.map((p) => (
                <li key={p.slug}>
                  <a href={localePath(locale, `/${p.slug}`)}>{p.heading}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </article>
    </SiteChrome>
  );
}
