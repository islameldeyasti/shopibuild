import { NextRequest, NextResponse } from "next/server";

const TO = "shopibuild.ae@gmail.com";
const hits = new Map<string, number[]>();

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  if (recent.length >= 5) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const form = await request.formData();
  if (clean(form.get("company"), 80)) {
    return NextResponse.json({ ok: true });
  }

  const first = clean(form.get("first"), 60);
  const last = clean(form.get("last"), 60);
  const phone = clean(form.get("phone"), 30);
  const site = clean(form.get("site"), 160);
  const spend = clean(form.get("spend"), 80);

  if (first.length < 2 || last.length < 2 || !/^[+\d][\d\s()-]{6,}$/.test(phone) || spend.length < 2) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sent = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: `${first} ${last}`,
      phone,
      store: site || "—",
      monthly_ad_spend_aed: spend,
      _subject: "طلب مكالمة جديد — ShopiBuild",
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  recent.push(now);
  hits.set(ip, recent);
  return NextResponse.json({ ok: true });
}
