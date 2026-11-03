import { getChrome } from "./chrome";
import type { Locale } from "./config";
import "@/homepage/home.css";

export function SiteChrome({ locale, altHref, children }: { locale: Locale; altHref: string; children: React.ReactNode }) {
  const { header, footer, extras } = getChrome(locale, altHref);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main>{children}</main>
      <div dangerouslySetInnerHTML={{ __html: footer + extras }} />
    </>
  );
}
