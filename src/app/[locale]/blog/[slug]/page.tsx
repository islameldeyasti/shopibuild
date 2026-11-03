import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllPosts, getPost, getSlugs, postLocales, relatedPosts } from "@/blog/posts";
import { BLOG_COPY, formatDate } from "@/blog/copy";
import { SiteChrome } from "@/site/SiteChrome";
import { JsonLd } from "@/site/JsonLd";
import { ORG_ID, breadcrumbSchema, faqSchema } from "@/site/schema";
import { LOCALES, OG_LOCALE, SITE_NAME, SITE_URL, absoluteUrl, languageAlternates, localePath, type Locale } from "@/site/config";
import "@/blog/blog.css";

type Params = { locale: Locale; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return LOCALES.flatMap((locale) => getAllPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  const url = localePath(locale, `/blog/${slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keyword || undefined,
    alternates: { canonical: url, languages: languageAlternates(`/blog/${slug}`, postLocales(slug)) },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [`${SITE_URL}/logo.png`],
    },
    twitter: { card: "summary", title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!getSlugs().includes(slug)) notFound();
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const c = BLOG_COPY[locale];
  const other: Locale = locale === "ar" ? "en" : "ar";
  const altHref = postLocales(slug).includes(other) ? localePath(other, `/blog/${slug}`) : localePath(other, "/blog");
  const url = absoluteUrl(locale, `/blog/${slug}`);
  const related = relatedPosts(post);

  return (
    <SiteChrome locale={locale} altHref={altHref}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          inLanguage: locale,
          datePublished: post.date,
          dateModified: post.updated,
          mainEntityOfPage: url,
          url,
          keywords: post.keyword,
          articleSection: post.category,
          image: `${SITE_URL}/logo.png`,
          author: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: c.home, url: absoluteUrl(locale) },
          { name: c.blog, url: absoluteUrl(locale, "/blog") },
          { name: post.title, url },
        ])}
      />
      {post.faq.length > 0 && <JsonLd data={faqSchema(post.faq)} />}

      <article className="post wrap">
        <nav className="crumbs" aria-label="breadcrumb">
          <a href={localePath(locale)}>{c.home}</a>
          <span aria-hidden="true">/</span>
          <a href={localePath(locale, "/blog")}>{c.blog}</a>
          <span aria-hidden="true">/</span>
          <span>{post.category}</span>
        </nav>
        <header className="post-head">
          <h1>{post.title}</h1>
          <p className="lead">{post.description}</p>
          <p className="meta">
            {c.updated}: <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time> · {c.minRead(post.minutes)}
          </p>
        </header>

        {post.headings.length > 2 && (
          <nav className="toc" aria-label={c.toc}>
            <b>{c.toc}</b>
            <ol>
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="post-cta">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <a className="btn btn-primary" href={`${localePath(locale)}#lead`}>
            {c.ctaButton}
          </a>
        </aside>

        {related.length > 0 && (
          <section className="related">
            <h2>{c.related}</h2>
            <div className="cards">
              {related.map((p) => (
                <a key={p.slug} className="card" href={localePath(locale, `/blog/${p.slug}`)}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="meta">{c.readMore}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </SiteChrome>
  );
}
