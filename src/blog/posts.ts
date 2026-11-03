import fs from "node:fs";
import path from "node:path";
import { Marked, type Token, type Tokens } from "marked";
import type { Locale } from "@/site/config";

// Each article lives in content/blog/<slug>/<locale>.md and shares its slug across languages.
const DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated: string;
  keyword: string;
  category: string;
  minutes: number;
};

export type Post = PostMeta & {
  html: string;
  headings: { id: string; text: string }[];
  faq: { q: string; a: string }[];
};

const FAQ_HEADING = /الأسئلة الشائعة|أسئلة شائعة|^FAQ|frequently asked/i;

export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: raw.slice(m[0].length) };
}

function plain(tokens: Token[]): string {
  return tokens
    .map((t) => ("tokens" in t && t.tokens ? plain(t.tokens) : "text" in t ? t.text : ""))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaq(tokens: Token[]) {
  const faq: { q: string; a: string }[] = [];
  let inFaq = false;
  for (const t of tokens) {
    if (t.type === "heading") {
      const h = t as Tokens.Heading;
      if (h.depth <= 2) inFaq = FAQ_HEADING.test(h.text);
      else if (inFaq && h.depth === 3) faq.push({ q: plain(h.tokens), a: "" });
      continue;
    }
    if (inFaq && faq.length && (t.type === "paragraph" || t.type === "list")) {
      const last = faq[faq.length - 1];
      const text = t.type === "list" ? (t as Tokens.List).items.map((i) => plain(i.tokens)).join("، ") : plain((t as Tokens.Paragraph).tokens);
      last.a = last.a ? `${last.a} ${text}` : text;
    }
  }
  return faq.filter((f) => f.q && f.a);
}

export function render(body: string) {
  const headings: { id: string; text: string }[] = [];
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${inner}</h${depth}>\n`;
        const id = `s${headings.length + 1}`;
        headings.push({ id, text: plain(tokens) });
        return `<h2 id="${id}">${inner}</h2>\n`;
      },
      table(token) {
        // Wide comparison tables scroll sideways on phones instead of breaking the layout.
        return `<div class="tbl">${md.Renderer.prototype.table.call(this, token)}</div>\n`;
      },
    },
  });
  const tokens = md.lexer(body);
  const html = md.parser(tokens);
  return { html, headings, faq: extractFaq(tokens) };
}

function readFile(slug: string, locale: Locale) {
  const file = path.join(DIR, slug, `${locale}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

function toMeta(slug: string, locale: Locale, data: Record<string, string>, body: string): PostMeta {
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    locale,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    updated: data.updated || data.date || "",
    keyword: data.keyword ?? "",
    category: data.category ?? "",
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((d) => fs.statSync(path.join(DIR, d)).isDirectory());
}

export function postLocales(slug: string): Locale[] {
  return (["ar", "en"] as Locale[]).filter((l) => readFile(slug, l) !== null);
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const raw = readFile(slug, locale);
      if (!raw) return null;
      const { data, body } = parseFrontmatter(raw);
      return toMeta(slug, locale, data, body);
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const raw = readFile(slug, locale);
  if (!raw) return null;
  const { data, body } = parseFrontmatter(raw);
  return { ...toMeta(slug, locale, data, body), ...render(body) };
}

export function relatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const all = getAllPosts(post.locale).filter((p) => p.slug !== post.slug);
  const same = all.filter((p) => p.category === post.category);
  return [...same, ...all.filter((p) => p.category !== post.category)].slice(0, limit);
}
