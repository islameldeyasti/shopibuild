import { urlsetXml, xmlResponse } from "@/site/sitemap";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(urlsetXml("pages"));
}
