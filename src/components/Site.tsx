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
    <span className="flex h-10 w-36 shrink-0 items-center justify-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
      <img src={`/brands/${name.toLowerCase()}.svg`} alt="" className="h-6 w-6 object-contain" />
      {name}
    </span>
  );
}

export function Site() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);
  const [menu, setMenu] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const [barsOn, setBarsOn] = useState(false);
  const [orderIdx, setOrderIdx] = useState(0);
  const [shownMsgs, setShownMsgs] = useState(1);

  const links = [
    ["#stages", t("nav.work")],
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
  const stages = t.raw("stages.items") as [string, string][];
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

        <section id="stages" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-center text-sm font-semibold text-green-deep">{t("stages.label")}</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("stages.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted">{t("stages.lead")}</p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {stages.map(([title, body], i) => (
                <article key={title} className="rounded-3xl border border-line bg-paper p-6">
                  <p className="text-4xl font-semibold text-ink/20">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <article className="rounded-[28px] border border-line bg-white p-8">
                <h3 className="text-xl font-semibold">{t("compare.them")}</h3>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {rows.map(([k, a]) => (
                    <li key={k}>✕ {a}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-[28px] bg-ink p-8 text-white">
                <h3 className="text-xl font-semibold text-green">{t("compare.us")}</h3>
                <ul className="mt-6 space-y-3 text-sm">
                  {rows.map(([k, , b]) => (
                    <li key={k}>✓ {b}</li>
                  ))}
                </ul>
              </article>
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
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setFormError(false);
                const res = await fetch("/api/lead", { method: "POST", body: new FormData(e.currentTarget) });
                setSending(false);
                if (res.ok) setSent(true);
                else setFormError(true);
              }}
            >
              <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
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
              <button disabled={sending} className="rounded-full bg-green py-3 text-sm font-semibold text-white disabled:opacity-60 sm:col-span-2">
                {t("book.submit")}
              </button>
              {formError && <p className="text-sm text-red-700 sm:col-span-2">{t("book.error")}</p>}
              <p className="text-xs text-muted sm:col-span-2">{t("book.reply")}</p>
            </form>
          )}
        </section>

        <section className="overflow-hidden border-t border-line bg-white py-14">
          <p className="text-center text-sm font-semibold text-green-deep">{t("partners.label")}</p>
          <h2 className="mt-2 text-center text-3xl font-semibold tracking-tight">{t("partners.title")}</h2>
          <div className="mt-8 overflow-hidden" dir="ltr">
            <div className="logo-marquee">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex items-center gap-4 pe-4">
                  {[
                    ["afrobica", "Afrobica"],
                    ["perfyra", "Perfyra"],
                    ["tasweeri", "Tasweeri"],
                    ["dive", "Dive Wellness"],
                    ["taj", "تاج"],
                    ["dopresso", "Dopresso"],
                    ["farid", "Farid Hub"],
                    ["hasobe", "Hasobe"],
                    ["daskie", "Daskie"],
                    ["little", "Little Explorers"],
                    ["poa", "POA QR UAE"],
                    ["nusuk", "Nusuk"],
                    ["riser", "Riser"],
                    ["emesa", "Emesa Art"],
                    ["velvet", "Velvet"],
                  ].map(([file, name]) => (
                    <li key={file + copy} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper px-4">
                      <img src={`/partners/${file}.png`} alt={name} className="h-14 w-full object-contain" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
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
