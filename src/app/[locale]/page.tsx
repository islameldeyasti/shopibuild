import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomeCanvas } from "@/homepage/HomeCanvas";
import "@/homepage/home.css";

export const metadata: Metadata = {
  title: "ShopiBuild | متجر Shopify بهويتك",
  description: "نبني متاجر Shopify بهوية علامتك، جاهزة للدفع والشحن والإعلانات خلال 5–7 أيام.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const html = readFileSync(path.join(process.cwd(), "src/homepage/markup.html"), "utf8");
  return <HomeCanvas html={html} />;
}
