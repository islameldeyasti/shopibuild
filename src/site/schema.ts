import { SITE_NAME, SITE_URL, absoluteUrl, type Locale } from "./config";

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const AREA_SERVED = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Bahrain" },
  { "@type": "Country", name: "Oman" },
];

const COPY = {
  ar: {
    description:
      "وكالة Shopify في دبي. نصمّم ونبرمج متاجر Shopify بالعربي والإنجليزي للإمارات والسعودية والخليج، مع الدفع والشحن والإعلانات و SEO.",
    services: [
      ["تصميم متجر Shopify", "تصميم وبرمجة ثيم Shopify مخصص بالعربي والإنجليزي خلال 5 إلى 7 أيام عمل."],
      ["SEO و GEO لمتاجر Shopify", "تحسين ظهور المتجر في Google وفي إجابات ChatGPT و Gemini و Perplexity."],
      ["ربط الدفع والشحن", "تفعيل Tabby و Tamara و Apple Pay وربط المتجر بالفولفيلمنت وشركات الشحن في الإمارات."],
    ],
  },
  en: {
    description:
      "Shopify agency in Dubai. We design and build Arabic and English Shopify stores for the UAE, Saudi Arabia and the Gulf, with payments, shipping, ads and SEO.",
    services: [
      ["Shopify store design", "A custom Arabic and English Shopify theme, designed and built in 5–7 business days."],
      ["Shopify SEO and GEO", "Visibility in Google and in answers from ChatGPT, Gemini and Perplexity."],
      ["Payments and shipping setup", "Tabby, Tamara and Apple Pay, plus fulfillment and courier integrations in the UAE."],
    ],
  },
} as const;

export function organizationSchema(locale: Locale) {
  const c = COPY[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/logo.png`,
        description: c.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        areaServed: AREA_SERVED,
        knowsLanguage: ["ar", "en"],
        priceRange: "AED 2,000 – AED 50,000",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "ar" ? "خدمات ShopiBuild" : "ShopiBuild services",
          itemListElement: c.services.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description, areaServed: AREA_SERVED },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ["ar", "en"],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(locale)}#webpage`,
        url: absoluteUrl(locale),
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
