import { getAllPosts } from "@/blog/posts";
import { SITE_URL, localePath } from "@/site/config";

// llms.txt (llmstxt.org): a plain summary that AI assistants can read and cite.
export const dynamic = "force-static";

export function GET() {
  const list = (locale: "ar" | "en") =>
    getAllPosts(locale)
      .map((p) => `- [${p.title}](${SITE_URL}${localePath(locale, `/blog/${p.slug}`)}): ${p.description}`)
      .join("\n");

  const body = `# ShopiBuild

> ShopiBuild is a Shopify agency based in Dubai, UAE. It designs and builds custom Shopify stores in Arabic and English for brands in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman, and connects local payments (Tabby, Tamara, Apple Pay and card gateways), fulfillment and couriers, ad tracking, SEO and GEO.

## Key facts
- Location: Dubai, United Arab Emirates. Serves the whole GCC.
- Service: custom Shopify store design and development, Arabic (RTL) and English, built into the theme rather than with translation apps.
- Launch time: 5–7 business days for the Foundation and Growth packages, counted from receiving products and content.
- Packages: Foundation from AED 2,000; Growth from AED 3,000; Growth Partner from AED 50,000. Fixed project price; the Shopify subscription is paid to Shopify directly.
- Included: 2 months of SEO + GEO, built-in app features worth over $1,000, 6 months of support, training videos.
- Integrations: Tabby, Tamara, Apple Pay, Google Pay, card gateways (Shopify Payments where available; it is not available to UAE-registered merchants); iQ Fulfillment, Quiqup, Jeebly, DHL, FedEx, UPS, SMSA, Emirates Post; Meta, TikTok, Snapchat and Google pixels with server-side events.

## Main pages
- [Home (Arabic)](${SITE_URL}/): Shopify store design in the UAE and the Gulf
- [Home (English)](${SITE_URL}/en): Shopify store design in the UAE and the Gulf
- [Blog (Arabic)](${SITE_URL}/blog)
- [Blog (English)](${SITE_URL}/en/blog)

## Guides (English)
${list("en")}

## الأدلة (عربي)
${list("ar")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
