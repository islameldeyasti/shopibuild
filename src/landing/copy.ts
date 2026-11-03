import type { Locale } from "@/site/config";

export const LANDING_COPY: Record<
  Locale,
  {
    home: string;
    services: string;
    book: string;
    packages: string;
    trust: string[];
    otherServices: string;
    cities: string;
    guides: string;
    ctaTitle: string;
    ctaText: string;
    indexTitle: string;
    indexHeading: string;
    indexLead: string;
    indexDescription: string;
    servicesHeading: string;
    citiesHeading: string;
    more: string;
  }
> = {
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    book: "احجز مكالمة 15 دقيقة",
    packages: "شوف الباقات",
    trust: ["عربي وإنجليزي داخل الثيم", "إطلاق خلال 5–7 أيام عمل", "سعر ثابت من 2,000 درهم", "دعم 6 شهور"],
    otherServices: "خدمات أخرى",
    cities: "نخدم المتاجر في",
    guides: "أدلة مرتبطة",
    ctaTitle: "جاهز تبدأ متجرك على Shopify؟",
    ctaText: "مكالمة قصيرة مش عرض مبيعات. نحدد الباقة والمدة والخطوات، ونرد خلال يوم عمل.",
    indexTitle: "خدمات ShopiBuild: تصميم وتطوير متاجر Shopify في الإمارات والخليج",
    indexHeading: "خدمات تصميم وتطوير متاجر Shopify",
    indexLead: "وكالة Shopify في دبي. نصمّم ونبرمج متاجر بالعربي والإنجليزي، ونخدم العلامات في الإمارات والسعودية وكل الخليج.",
    indexDescription: "كل خدمات ShopiBuild: تصميم متجر شوبيفاي، التطوير، المتاجر العربية، النقل، SEO، و Shopify Plus، في دبي والإمارات والخليج.",
    servicesHeading: "الخدمات",
    citiesHeading: "المدن والدول",
    more: "التفاصيل",
  },
  en: {
    home: "Home",
    services: "Services",
    book: "Book a 15-minute call",
    packages: "See packages",
    trust: ["Arabic and English built into the theme", "Launch in 5–7 business days", "Fixed price from AED 2,000", "6 months of support"],
    otherServices: "Other services",
    cities: "We serve stores in",
    guides: "Related guides",
    ctaTitle: "Ready to start your Shopify store?",
    ctaText: "A short call, not a sales pitch. We agree the package, timeline and steps, and reply within one business day.",
    indexTitle: "ShopiBuild Services: Shopify Store Design and Development in the UAE & Gulf",
    indexHeading: "Shopify store design and development services",
    indexLead: "A Shopify agency in Dubai. We design and build Arabic and English stores for brands across the UAE, Saudi Arabia and the Gulf.",
    indexDescription: "All ShopiBuild services: Shopify store design, development, Arabic stores, migration, SEO and Shopify Plus, in Dubai, the UAE and the Gulf.",
    servicesHeading: "Services",
    citiesHeading: "Cities and countries",
    more: "Details",
  },
};
