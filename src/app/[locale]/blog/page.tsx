import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/blog/posts";
import { BLOG_COPY, CATEGORY_ORDER, formatDate } from "@/blog/copy";
import { SiteChrome } from "@/site/SiteChrome";
import { JsonLd } from "@/site/JsonLd";
import { breadcrumbSchema } from "@/site/schema";
import { OG_LOCALE, SITE_NAME, absoluteUrl, languageAlternates, localePath, type Locale } from "@/site/config";
import "@/blog/blog.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = BLOG_COPY[locale];
  return {
    title: { absolute: c.indexTitle },
    description: c.indexDescription,
    alternates: { canonical: localePath(locale, "/blog"), languages: languageAlternates("/blog") },
    openGraph: { type: "website", siteName: SITE_NAME, locale: OG_LOCALE[locale], title: c.indexTitle, description: c.indexDescription, url: localePath(locale, "/blog") },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = BLOG_COPY[locale];
  const posts = getAllPosts(locale);
  const rank = (cat: string) => {
    const i = CATEGORY_ORDER[locale].indexOf(cat);
    return i < 0 ? Infinity : i;
  };
  const categories = [...new Set(posts.map((p) => p.category))].sort((a, b) => rank(a) - rank(b));
  const other: Locale = locale === "ar" ? "en" : "ar";

  return (
    <SiteChrome locale={locale} altHref={localePath(other, "/blog")}>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.home, url: absoluteUrl(locale) },
          { name: c.blog, url: absoluteUrl(locale, "/blog") },
        ])}
      />
      <section className="blog-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="breadcrumb">
            <a href={localePath(locale)}>{c.home}</a>
            <span aria-hidden="true">/</span>
            <span>{c.blog}</span>
          </nav>
          <h1>{c.indexHeading}</h1>
          <p className="lead">{c.indexLead}</p>
          <div className="cat-chips">
            {categories.map((cat) => (
              <a key={cat} href={`#${encodeURIComponent(cat)}`}>
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="wrap blog-list">
        {categories.map((cat) => (
          <section key={cat} id={encodeURIComponent(cat)} className="blog-cat">
            <h2>{cat}</h2>
            <div className="cards">
              {posts
                .filter((p) => p.category === cat)
                .map((p) => (
                  <a key={p.slug} className="card" href={localePath(locale, `/blog/${p.slug}`)}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <span className="meta">
                      {formatDate(p.updated, locale)} · {c.minRead(p.minutes)}
                    </span>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
    </SiteChrome>
  );
}
