"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

function formatAmount(value: number, arabic: boolean) {
  const grouped = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!arabic) return grouped;
  const digits = "٠١٢٣٤٥٦٧٨٩";
  return grouped.replace(/\d/g, (d) => digits[Number(d)]).replaceAll(",", "٬");
}

function Brand({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink/80">
      <Logo name={name} />
      {name}
    </span>
  );
}

function Logo({ name }: { name: string }) {
  const common = "h-6 w-6 shrink-0";
  if (name === "Shopify") {
    return (
      <svg className={common} viewBox="0 0 24 24" aria-hidden>
        <path fill="#95BF47" d="M15.3 3.2s-.2 0-.4.1l-.7 2.2c-.4-.1-.9-.2-1.4-.2-.1 0-.2 0-.3.1L11.8 3c-.3-.1-.6.1-.7.4L9.6 8.2c-.5.2-.9.4-1.2.6-.8.6-.8 1.3-.9 1.7L6.2 19.2c0 .2.1.4.3.5.2.1 2.4.7 6.4.7h.3c4-.1 6.2-.6 6.4-.7.2-.1.3-.3.3-.5l-1.3-8.7c0-.4-.1-1.1-.9-1.7-.2-.1-.5-.3-.9-.5L15.9 3.6c0-.2-.2-.4-.6-.4zm-2.6 2.4 1.1 3.4c-.6.2-1.2.4-1.7.5l.6-3.9zm-1.4.6.7 4.2c-.8.2-1.6.5-2.2.8l1.5-5zm4.2 8.6c-.3.1-1.6.8-1.8.8-.2.1-.4 0-.4-.4v-2.2l-1.2.4c.1 1.5.2 2.7.2 2.8 0 .5-.3.7-.7.8-1 .3-2.1.1-3.1-.4.3-.8.8-1.6 1.3-2.4.6-.9 1.1-1.5.9-2.3-.1-.6-.7-.9-1.3-1 .8-.9 2.2-1.4 3.4-1.4.5 0 1 .1 1.4.2l.6 1.8c.5-.2 1-.3 1.3-.3.9 0 1.4.6 1.5 1.6.1 1.2-.6 2-1.1 2.6z" />
      </svg>
    );
  }
  if (name === "Meta") {
    return (
      <svg className={common} viewBox="0 0 24 24" aria-hidden>
        <path fill="#0668E1" d="M7.2 8.2c1.2 0 2.3.6 3.4 1.8.7.8 1.3 1.8 1.4 1.8s.7-1 1.4-1.8c1.1-1.2 2.2-1.8 3.4-1.8 2.2 0 3.7 1.6 3.7 4.3 0 2.8-1.8 6.3-3.6 6.3-1 0-1.7-.7-2.8-2.3l-1.1-1.6-1.1 1.6c-1.1 1.6-1.8 2.3-2.8 2.3-1.8 0-3.6-3.5-3.6-6.3 0-2.7 1.5-4.3 3.7-4.3zm0 1.5c-1.2 0-2.2 1.2-2.2 2.8 0 2.1 1.3 4.8 2.1 4.8.5 0 1-.6 1.8-1.8l1.1-1.7 1.1 1.7c.8 1.2 1.3 1.8 1.8 1.8.8 0 2.1-2.7 2.1-4.8 0-1.6-1-2.8-2.2-2.8-1 0-1.7.7-2.8 2.1L12 12.2l-.2-.4c-1.1-1.4-1.8-2.1-2.8-2.1z" />
      </svg>
    );
  }
  if (name === "TikTok") {
    return (
      <svg className={common} viewBox="0 0 24 24" aria-hidden>
        <path fill="#111" d="M14.2 3.2c.4 2.4 1.7 4 4 4.4v2.5c-1.4 0-2.7-.4-3.9-1.2v5.8c0 3.6-2.8 6.5-6.5 6.5S1.3 18.3 1.3 14.7c0-3.5 2.6-6.3 6-6.5v2.7c-1.6.2-2.9 1.6-2.9 3.3 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4V3.2h3z" transform="translate(2.2 0)" />
      </svg>
    );
  }
  if (name === "Snapchat") {
    return (
      <svg className={common} viewBox="0 0 24 24" aria-hidden>
        <path fill="#FFFC00" stroke="#111" strokeWidth="0.6" d="M12 3.2c2.2 0 3.6 1.6 3.6 3.8 0 .5.1 1.3.4 1.7.5.6 1.6.5 2 .8.3.2.2.7-.2.9-.8.3-1.2.8-1.1 1.4.1.4.6.6 1.2.8.5.2.7.6.3 1-.7.6-1.6.8-2.1 1.3-.3.3-.2.8.2 1.1.7.4.6 1-.1 1.2-.9.3-1.5.1-2-.3-.4-.3-1 .1-1.6.1s-1.2-.4-1.6-.1c-.5.4-1.1.6-2 .3-.7-.2-.8-.8-.1-1.2.4-.3.5-.8.2-1.1-.5-.5-1.4-.7-2.1-1.3-.4-.4-.2-.8.3-1 .6-.2 1.1-.4 1.2-.8.1-.6-.3-1.1-1.1-1.4-.4-.2-.5-.7-.2-.9.4-.3 1.5-.2 2-.8.3-.4.4-1.2.4-1.7 0-2.2 1.4-3.8 3.6-3.8z" />
      </svg>
    );
  }
  if (name === "Google") {
    return (
      <svg className={common} viewBox="0 0 24 24" aria-hidden>
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
        <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6C4.7 19.8 8.1 22 12 22z" />
        <path fill="#FBBC05" d="M6.4 13.9A6 6 0 0 1 6.1 12c0-.7.1-1.3.3-1.9V7.5H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.5l3.3-2.6z" />
        <path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.1 14.7 2 12 2 8.1 2 4.7 4.2 3.1 7.5l3.3 2.6c.8-2.3 3-4 5.6-4z" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" aria-hidden>
      <path fill="#25D366" d="M12 3.2A8.7 8.7 0 0 0 4.4 16.3L3.2 21l4.8-1.2A8.7 8.7 0 1 0 12 3.2zm5 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.8-.2-1.4-.5-2.4-1-4-3.5-4.1-3.7-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.6.7 2 .7 2.1.1.1 0 .3-.1.4l-.3.4c-.1.1-.3.3-.1.5.2.3.7 1.1 1.4 1.8.9.8 1.7 1.1 2 .1.1-.2.3-.3.5-.2l1.2.6c.2.1.4.2.4.3.1.2.1.8-.1 1.4z" />
    </svg>
  );
}

export function Site() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [menu, setMenu] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const [barsOn, setBarsOn] = useState(false);
  const [orderIdx, setOrderIdx] = useState(0);
  const [shownMsgs, setShownMsgs] = useState(1);

  const links = [
    ["#cycle", t("nav.work")],
    ["#services", t("nav.services")],
    ["#pricing", t("nav.pricing")],
    ["#results", t("nav.results")],
    ["#faq", t("nav.faq")],
  ] as const;

  const plans = t.raw("pricing.plans") as {
    name: string;
    desc: string;
    price: string;
    per: string;
    features: string[];
  }[];
  const features = t.raw("features.items") as [string, string][];
  const cycle = t.raw("cycle.items") as [string, string][];
  const who = t.raw("who.cards") as [string, string][];
  const rows = t.raw("compare.rows") as [string, string, string][];
  const reviews = t.raw("reviews.items") as [string, string, string][];
  const msgs = t.raw("reviews.msgs") as [string, string, string][];
  const faqs = t.raw("faq.items") as [string, string][];
  const channels = t.raw("panel.rows") as [string, string][];
  const aPoints = t.raw("paths.aPoints") as string[];
  const bPoints = t.raw("paths.bPoints") as string[];
  const spends = t.raw("book.spends") as string[];
  const points = t.raw("book.points") as string[];
  const liveOrders = t.raw("panel.feed") as [string, string][];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevenue(18430);
      setBarsOn(true);
      setShownMsgs(msgs.length);
      return;
    }
    const target = 18430;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setRevenue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const bars = window.setTimeout(() => setBarsOn(true), 200);
    const orders = window.setInterval(() => setOrderIdx((i) => (i + 1) % liveOrders.length), 3200);
    const chat = window.setInterval(() => setShownMsgs((n) => (n >= msgs.length ? 1 : n + 1)), 1800);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(bars);
      clearInterval(orders);
      clearInterval(chat);
    };
  }, [liveOrders.length, msgs.length]);

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center">
            <img src="/logo.png" alt="ShopiBuild" className="h-8 w-auto" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={pathname}
              locale={other}
              className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold"
            >
              {t("nav.lang")}
            </Link>
            <a href="#book" className="hidden rounded-full bg-green px-4 py-2 text-sm font-semibold text-white sm:inline">
              {t("nav.cta")}
            </a>
            <button
              className="rounded-full border border-line px-3 py-1.5 text-sm lg:hidden"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
            >
              {menu ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-line bg-paper px-5 py-4 lg:hidden">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)} className="block py-2 font-medium">
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="pt-[72px]">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green-deep">
              <span className="size-1.5 rounded-full bg-green" />
              {t("hero.kicker")}
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{t("hero.lead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                {t("hero.primary")}
              </a>
              <a href="#pricing" className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold">
                {t("hero.secondary")}
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">{t("hero.note")}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                [t("hero.s1n"), t("hero.s1")],
                [t("hero.s2n"), t("hero.s2")],
                [t("hero.s3n"), t("hero.s3")],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-semibold">{n}</dt>
                  <dd className="mt-1 text-xs text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -top-4 start-4 z-10 flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2 shadow-sm">
              <span className="grid size-8 place-items-center rounded-lg bg-green-soft text-sm font-semibold text-green-deep">↑</span>
              <span>
                <span className="block text-sm font-semibold">{t("panel.badge1")}</span>
                <span className="block text-xs text-muted">{t("panel.badge1s")}</span>
              </span>
            </div>
            <div className="rounded-[28px] border border-line bg-white p-5 shadow-[0_20px_60px_rgba(18,33,12,0.06)]">
              <div className="flex items-center justify-between text-xs font-semibold text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-green" />
                  {t("panel.live")}
                </span>
                <span className="rounded-full bg-green-soft px-2 py-1 text-green-deep">{t("panel.today")}</span>
              </div>
              <p className="mt-4 text-4xl font-semibold tabular-nums tracking-tight">
                {formatAmount(revenue, locale === "ar")}
                <span className="ms-2 text-base font-medium text-muted">{t("panel.currency")}</span>
              </p>
              <p className="mt-1 text-sm font-medium text-green-deep">{t("panel.delta")}</p>
              <div className="mt-5 flex h-24 items-end gap-2">
                {[32, 48, 40, 62, 54, 78, 92].map((h, i) => (
                  <div
                    key={h}
                    className={`flex-1 rounded-t-md transition-[height] duration-700 ${i === 6 ? "bg-green" : "bg-green-soft"}`}
                    style={{ height: barsOn ? `${h}%` : "8%" }}
                  />
                ))}
              </div>
              <table className="mt-5 w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted">
                    <th className="pb-2 text-start font-medium">{t("panel.ch")}</th>
                    <th className="pb-2 text-end font-medium">{t("panel.orders")}</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map(([name, n]) => (
                    <tr key={name} className="border-t border-line">
                      <td className="py-2">{name}</td>
                      <td className="py-2 text-end font-semibold tabular-nums">{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 rounded-2xl bg-paper p-3 text-sm leading-relaxed text-muted">{t("panel.insight")}</p>
            </div>
            <div key={orderIdx} className="absolute -bottom-4 end-4 flex animate-[pop_0.45s_ease] items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2 shadow-sm">
              <span className="grid size-8 place-items-center rounded-lg bg-[#fff4d6] text-xs font-bold">+</span>
              <span>
                <span className="block text-sm font-semibold">{liveOrders[orderIdx][0]}</span>
                <span className="block text-xs text-muted">
                  {liveOrders[orderIdx][1]} {t("panel.currency")}
                </span>
              </span>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-line bg-white py-5">
          <div className="marquee items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-14 pe-14">
                <Brand name="Shopify" />
                <Brand name="Meta" />
                <Brand name="TikTok" />
                <Brand name="Snapchat" />
                <Brand name="Google" />
                <Brand name="WhatsApp" />
              </div>
            ))}
          </div>
        </div>

        <section id="cycle" className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold text-green-deep">{t("cycle.label")}</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{t("cycle.title")}</h2>
          <p className="mt-3 max-w-xl text-muted">{t("cycle.lead")}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cycle.map(([title, body], i) => (
              <article key={title} className="rounded-3xl border border-line bg-white p-5">
                <p className="text-xs font-semibold text-green-deep">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 lg:grid-cols-2">
            <article className="rounded-[28px] border border-line bg-paper p-8">
              <p className="text-sm font-semibold text-green-deep">{t("paths.label")}</p>
              <h2 className="mt-3 text-2xl font-semibold">{t("paths.aTitle")}</h2>
              <p className="mt-2 text-muted">{t("paths.aLead")}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {aPoints.map((p) => (
                  <li key={p}>✓ {p}</li>
                ))}
              </ul>
              <a href="#pricing" className="mt-8 inline-block text-sm font-semibold text-green-deep">
                {t("paths.aCta")} →
              </a>
            </article>
            <article className="rounded-[28px] bg-ink p-8 text-white">
              <h2 className="text-2xl font-semibold">{t("paths.bTitle")}</h2>
              <p className="mt-2 text-white/70">{t("paths.bLead")}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/90">
                {bPoints.map((p) => (
                  <li key={p}>✓ {p}</li>
                ))}
              </ul>
              <a href="#book" className="mt-8 inline-block rounded-full bg-green px-4 py-2 text-sm font-semibold text-ink">
                {t("paths.bCta")}
              </a>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold text-green-deep">{t("who.label")}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t("who.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {who.map(([title, body], i) => (
              <article
                key={title}
                className={`rounded-3xl border p-6 ${i === 2 ? "border-green bg-green-soft" : "border-line bg-white"}`}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-semibold text-green-deep">{t("features.label")}</p>
            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight">{t("features.title")}</h2>
              <p className="max-w-sm text-sm text-muted">{t("features.lead")}</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {features.map(([title, body], i) => (
                <article key={title} className="bg-white p-6">
                  <p className="text-xs font-semibold text-green">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold text-green-deep">{t("pricing.label")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t("pricing.title")}</h2>
            <p className="mt-3 text-muted">{t("pricing.lead")}</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <article
                key={plan.name}
                className={`relative rounded-[28px] border p-6 ${
                  i === 1 ? "border-green bg-ink text-white" : "border-line bg-white"
                }`}
              >
                {i === 1 && (
                  <span className="absolute end-5 top-5 rounded-full bg-green px-2 py-1 text-xs font-semibold text-ink">
                    {t("pricing.popular")}
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${i === 1 ? "text-white/70" : "text-muted"}`}>{plan.desc}</p>
                <p className="mt-6 text-4xl font-semibold">
                  {plan.price}
                  <span className="ms-2 text-sm font-medium">{t("pricing.currency")}{plan.per}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold ${
                    i === 1 ? "bg-green text-ink" : "bg-ink text-white"
                  }`}
                >
                  {i === 0 ? t("pricing.select") : i === 1 ? t("pricing.scale") : t("pricing.apply")}
                </a>
                {i === 2 && <p className="mt-3 text-center text-xs text-muted">{t("pricing.spots")}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-semibold text-green-deep">{t("compare.label")}</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight">{t("compare.title")}</h2>
            <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-paper text-start">
                    <th className="p-4 font-medium" />
                    <th className="p-4 font-medium text-muted">{t("compare.them")}</th>
                    <th className="p-4 font-semibold text-green-deep">{t("compare.us")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([k, a, b]) => (
                    <tr key={k} className="border-t border-line">
                      <th className="p-4 text-start font-semibold">{k}</th>
                      <td className="p-4 text-muted">{a}</td>
                      <td className="p-4">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="results" className="mx-auto grid max-w-6xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] bg-[#0b3d2e] p-4 text-white">
            <div className="rounded-2xl bg-[#075e54] px-4 py-3">
              <p className="font-semibold">{t("reviews.waName")}</p>
              <p className="text-xs text-white/70">{t("reviews.online")}</p>
            </div>
            <div className="space-y-2 p-3">
              {msgs.slice(0, shownMsgs).map(([side, text, time]) => (
                <div
                  key={time + text}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                    side === "out" ? "ms-auto bg-[#dcf8c6] text-ink" : "bg-white/10"
                  }`}
                >
                  <p>{text}</p>
                  <p className="mt-1 text-[10px] opacity-60">{time}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-deep">{t("reviews.label")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t("reviews.title")}</h2>
            <div className="mt-6 space-y-4">
              {reviews.map(([quote, name, role]) => (
                <blockquote key={name} className="rounded-3xl border border-line bg-white p-5">
                  <p className="text-sm leading-relaxed">“{quote}”</p>
                  <footer className="mt-3 text-sm">
                    <span className="font-semibold">{name}</span>
                    <span className="text-muted"> · {role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-center text-sm font-semibold text-green-deep">{t("faq.label")}</p>
            <h2 className="mt-2 text-center text-3xl font-semibold">{t("faq.title")}</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map(([q, a], i) => (
                <div key={q}>
                  <button
                    className="flex w-full items-center justify-between gap-4 py-4 text-start font-semibold"
                    onClick={() => setFaq(faq === i ? -1 : i)}
                    aria-expanded={faq === i}
                  >
                    {q}
                    <span className="text-muted">{faq === i ? "−" : "+"}</span>
                  </button>
                  {faq === i && <p className="pb-4 text-sm leading-relaxed text-muted">{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-green-deep">{t("book.label")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t("book.title")}</h2>
            <p className="mt-3 text-muted">{t("book.lead")}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {points.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
          {sent ? (
            <p className="rounded-3xl bg-green-soft p-8 font-medium text-green-deep">{t("book.done")}</p>
          ) : (
            <form
              className="grid gap-3 rounded-[28px] border border-line bg-white p-6 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="text-sm">
                {t("book.first")}
                <input required name="first" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
              </label>
              <label className="text-sm">
                {t("book.last")}
                <input required name="last" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
              </label>
              <label className="text-sm sm:col-span-2">
                {t("book.phone")}
                <input required name="phone" type="tel" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
              </label>
              <label className="text-sm sm:col-span-2">
                {t("book.site")}
                <input name="site" className="mt-1 w-full rounded-xl border border-line px-3 py-2" />
              </label>
              <label className="text-sm sm:col-span-2">
                {t("book.spend")}
                <select name="spend" className="mt-1 w-full rounded-xl border border-line px-3 py-2" defaultValue="">
                  <option value="" disabled>
                    {t("book.spendPh")}
                  </option>
                  {spends.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <button className="rounded-full bg-green py-3 text-sm font-semibold text-white sm:col-span-2">
                {t("book.submit")}
              </button>
              <p className="text-xs text-muted sm:col-span-2">{t("book.reply")}</p>
            </form>
          )}
        </section>
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          <div>
            <img src="/logo.png" alt="ShopiBuild" className="h-8 brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm text-white/70">{t("footer.blurb")}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{t("footer.services")}</p>
            <a className="mt-2 block text-white/70" href="#services">{t("footer.s1")}</a>
            <a className="mt-2 block text-white/70" href="#services">{t("footer.s2")}</a>
            <a className="mt-2 block text-white/70" href="#services">{t("footer.s3")}</a>
            <a className="mt-2 block text-white/70" href="#services">{t("footer.s4")}</a>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{t("footer.company")}</p>
            <a className="mt-2 block text-white/70" href="#pricing">{t("footer.c1")}</a>
            <a className="mt-2 block text-white/70" href="#results">{t("footer.c2")}</a>
            <a className="mt-2 block text-white/70" href="#book">{t("footer.c3")}</a>
          </div>
        </div>
        <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">{t("footer.copy")}</p>
      </footer>
    </div>
  );
}
