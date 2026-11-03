import type { Locale } from "@/site/config";

export const BLOG_COPY: Record<
  Locale,
  {
    home: string;
    blog: string;
    indexTitle: string;
    indexHeading: string;
    indexLead: string;
    indexDescription: string;
    minRead: (n: number) => string;
    updated: string;
    toc: string;
    related: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    readMore: string;
    dateLocale: string;
  }
> = {
  ar: {
    home: "الرئيسية",
    blog: "المدونة",
    indexTitle: "مدونة ShopiBuild: أدلة Shopify للإمارات والخليج",
    indexHeading: "أدلة Shopify للتجارة الإلكترونية في الإمارات والخليج",
    indexLead: "شروحات عملية عن إنشاء متجر Shopify، والتكاليف، والدفع والشحن، و SEO، مكتوبة لأصحاب المتاجر في الإمارات والسعودية والخليج.",
    indexDescription:
      "أدلة عملية بالعربي عن إنشاء وتصميم متجر Shopify في الإمارات والخليج: التكلفة، الرخصة، الدفع، الشحن، SEO والتسويق.",
    minRead: (n) => `${n} دقائق قراءة`,
    updated: "آخر تحديث",
    toc: "محتويات المقال",
    related: "مقالات ذات صلة",
    ctaTitle: "تبي متجر Shopify جاهز للبيع في الإمارات؟",
    ctaText: "نصمّم متجرك بالعربي والإنجليزي، ونربط الدفع والشحن، ونطلقه خلال 5 إلى 7 أيام عمل.",
    ctaButton: "احجز مكالمة 15 دقيقة",
    readMore: "اقرأ المقال",
    dateLocale: "ar-AE",
  },
  en: {
    home: "Home",
    blog: "Blog",
    indexTitle: "ShopiBuild Blog: Shopify Guides for the UAE & Gulf",
    indexHeading: "Shopify ecommerce guides for the UAE and the Gulf",
    indexLead: "Practical guides on launching a Shopify store, costs, payments, shipping and SEO, written for store owners in the UAE, Saudi Arabia and the Gulf.",
    indexDescription:
      "Practical guides to building and designing a Shopify store in the UAE and the Gulf: costs, licensing, payments, shipping, SEO and marketing.",
    minRead: (n) => `${n} min read`,
    updated: "Updated",
    toc: "In this article",
    related: "Related articles",
    ctaTitle: "Want a Shopify store that's ready to sell in the UAE?",
    ctaText: "We design your store in Arabic and English, connect payments and shipping, and launch it in 5–7 business days.",
    ctaButton: "Book a 15-minute call",
    readMore: "Read article",
    dateLocale: "en-AE",
  },
};

// The blog index lists categories in this order; any new category goes at the end.
export const CATEGORY_ORDER: Record<Locale, string[]> = {
  ar: ["البدء في الإمارات", "مقارنة المنصات", "التصميم والعربي", "الدفع والشحن", "SEO و GEO", "التسويق والإعلانات"],
  en: ["Starting in the UAE", "Platform comparisons", "Design & Arabic", "Payments & shipping", "SEO & GEO", "Marketing & ads"],
};

export function formatDate(iso: string, locale: Locale) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(BLOG_COPY[locale].dateLocale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
