import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomeCanvas } from "@/homepage/HomeCanvas";
import "@/homepage/home.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      title: "ShopiBuild | A Shopify store in your brand",
      description: "We design and build Shopify stores in Arabic and English, ready for payments, shipping, and ads in 5–7 days.",
    };
  }
  return {
    title: "ShopiBuild | متجر Shopify بهويتك",
    description: "نبني متاجر Shopify بهوية علامتك، جاهزة للدفع والشحن والإعلانات خلال 5–7 أيام.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const file = locale === "en" ? "markup.en.html" : "markup.html";
  const html = readFileSync(path.join(process.cwd(), "src/homepage", file), "utf8");
  return <HomeCanvas html={html} />;
}
