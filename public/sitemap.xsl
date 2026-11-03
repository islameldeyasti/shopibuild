<?xml version="1.0" encoding="UTF-8"?>
<!-- Presentation only: browsers use this to render the sitemap as a page. Search engines read the XML and ignore it. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap · ShopiBuild</title>
        <style>
          :root{--bg:#EEF3EC;--surface:#fff;--fg:#002D2D;--muted:#4F625E;--line:#C9D6D2;--band:#002D2D;--accent:#47702D;--action:#95BF47;--tag:#E4F0CF}
          *{box-sizing:border-box}
          body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.6 Inter,"Readex Pro",-apple-system,"Segoe UI",Tahoma,Arial,sans-serif}
          a{color:inherit}
          header{background:var(--band);color:#fff}
          .wrap{max-width:1120px;margin:0 auto;padding:0 20px}
          header .wrap{padding-block:32px 28px}
          .brand{font-weight:800;font-size:22px;letter-spacing:-.01em}
          .brand span{color:var(--action)}
          h1{margin:14px 0 6px;font-size:28px;line-height:1.25}
          header p{margin:0;color:#8FB3AE;max-width:70ch}
          header p.ar-line{margin-top:4px;text-align:left}
          header p a{color:var(--action)}
          .stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .stat{background:#0B3D3B;border:1px solid #1A524E;border-radius:999px;padding:6px 14px;font-size:14px}
          .stat b{color:var(--action)}
          main .wrap{padding-block:28px 56px}
          .card{background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(0,45,45,.05),0 10px 30px rgba(0,45,45,.08)}
          table{width:100%;border-collapse:collapse}
          th,td{padding:12px 16px;text-align:left;border-bottom:1px solid var(--line);vertical-align:middle}
          th{background:#F3F8EA;font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
          tr:last-child td{border-bottom:0}
          tbody tr:hover td{background:#F7FAF4}
          td.n{color:var(--muted);width:48px;font-variant-numeric:tabular-nums}
          td.url a{text-decoration:none;font-weight:600;word-break:break-all}
          td.url a:hover{color:var(--accent);text-decoration:underline}
          .badge{display:inline-block;font-size:12px;font-weight:700;border-radius:999px;padding:2px 10px;white-space:nowrap}
          .ar{background:var(--tag);color:var(--fg)}
          .en{background:#DCE8E5;color:var(--fg)}
          .type{color:var(--muted);font-size:13px;white-space:nowrap}
          .date,.pr{white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--muted)}
          .sec a{display:block;text-decoration:none;font-weight:700;font-size:17px}
          .sec a:hover{color:var(--accent)}
          .sec small{color:var(--muted)}
          footer{color:var(--muted);font-size:13px;margin-top:18px}
          @media (max-width:720px){
            h1{font-size:22px}
            th.hide,td.hide{display:none}
            th,td{padding:10px 12px}
          }
        </style>
      </head>
      <body>
        <header>
          <div class="wrap">
            <div class="brand">Shopi<span>Build</span></div>
            <xsl:choose>
              <xsl:when test="s:sitemapindex">
                <h1>Sitemap</h1>
                <p>The site's pages are split into sections. Open a section to see every URL in Arabic and English.</p>
                <p dir="rtl" class="ar-line">خريطة الموقع مقسّمة لأقسام، افتح أي قسم لتشوف كل الروابط بالعربي والإنجليزي.</p>
                <div class="stats"><span class="stat"><b><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></b> sections</span></div>
              </xsl:when>
              <xsl:otherwise>
                <h1>
                  <xsl:choose>
                    <xsl:when test="contains(s:urlset/s:url[1]/s:loc, '/blog')">Blog sitemap</xsl:when>
                    <xsl:otherwise>Pages and services sitemap</xsl:otherwise>
                  </xsl:choose>
                </h1>
                <p>Every URL in this section, with its language and last update. <a href="/sitemap.xml">All sections</a></p>
                <p dir="rtl" class="ar-line">كل روابط هذا القسم مع اللغة وتاريخ آخر تحديث.</p>
                <div class="stats">
                  <span class="stat"><b><xsl:value-of select="count(s:urlset/s:url)"/></b> URLs</span>
                  <span class="stat"><b><xsl:value-of select="count(s:urlset/s:url[not(contains(s:loc, '.com/en'))])"/></b> العربية</span>
                  <span class="stat"><b><xsl:value-of select="count(s:urlset/s:url[contains(s:loc, '.com/en')])"/></b> English</span>
                </div>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </header>
        <main>
          <div class="wrap">
            <div class="card">
              <xsl:apply-templates select="s:sitemapindex|s:urlset"/>
            </div>
            <footer>This page is a readable view of the XML sitemap at shopibuild.com, intended for people. Search engines read the XML directly.</footer>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="s:sitemapindex">
    <table>
      <thead><tr><th>Section</th><th>Last updated</th></tr></thead>
      <tbody>
        <xsl:for-each select="s:sitemap">
          <tr>
            <td class="sec">
              <a href="{s:loc}">
                <xsl:choose>
                  <xsl:when test="contains(s:loc, 'blog')">Blog · المدونة</xsl:when>
                  <xsl:otherwise>Pages and services · الصفحات والخدمات</xsl:otherwise>
                </xsl:choose>
              </a>
              <small><xsl:value-of select="s:loc"/></small>
            </td>
            <td class="date"><xsl:value-of select="s:lastmod"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <xsl:template match="s:urlset">
    <table>
      <thead>
        <tr><th class="hide">#</th><th>URL</th><th>Lang</th><th class="hide">Type</th><th class="hide">Updated</th><th class="hide">Priority</th></tr>
      </thead>
      <tbody>
        <xsl:for-each select="s:url">
          <xsl:variable name="path" select="substring-after(s:loc, 'shopibuild.com')"/>
          <tr>
            <td class="n hide"><xsl:value-of select="position()"/></td>
            <td class="url">
              <a href="{s:loc}">
                <xsl:choose>
                  <xsl:when test="$path = ''">/</xsl:when>
                  <xsl:otherwise><xsl:value-of select="$path"/></xsl:otherwise>
                </xsl:choose>
              </a>
            </td>
            <td>
              <xsl:choose>
                <xsl:when test="starts-with($path, '/en/') or $path = '/en'"><span class="badge en">EN</span></xsl:when>
                <xsl:otherwise><span class="badge ar">AR</span></xsl:otherwise>
              </xsl:choose>
            </td>
            <td class="type hide">
              <xsl:choose>
                <xsl:when test="contains($path, '/blog/')">Article</xsl:when>
                <xsl:when test="substring($path, string-length($path) - 4) = '/blog'">Blog</xsl:when>
                <xsl:when test="$path = '' or $path = '/' or $path = '/en'">Home</xsl:when>
                <xsl:when test="contains($path, 'services')">Services</xsl:when>
                <xsl:when test="contains($path, 'shopify-agency-')">City</xsl:when>
                <xsl:otherwise>Service</xsl:otherwise>
              </xsl:choose>
            </td>
            <td class="date hide"><xsl:value-of select="s:lastmod"/></td>
            <td class="pr hide"><xsl:value-of select="s:priority"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
