---
title: "Shopify Speed Optimisation: 10 Practical Steps to a Faster Mobile Store"
description: How to speed up a Shopify store and improve Core Web Vitals, covering apps, images, fonts, video, the theme and measurement tools, with priorities in order.
date: 2026-11-03
updated: 2026-11-03
keyword: Shopify speed optimisation
category: Design & Arabic
---

**Short answer:** the biggest causes of slow Shopify stores are **too many apps**, **heavy images**, **fonts and video at the top of the page**, and **a bloated theme**. Start by removing apps you don't need, compressing images and simplifying the first screen, then measure with **PageSpeed Insights** on **mobile**. The goal is **Core Web Vitals** in the good range.

## Why speed matters

- **Conversion:** every second of delay loses visitors, especially those arriving from ads.
- **SEO:** Google uses page experience and Core Web Vitals among its ranking signals.
- **Ad cost:** a slow page means lower return on the same spend.

## Core Web Vitals in brief

| Metric | Measures | Good target |
|---|---|---|
| LCP | When the largest element on screen appears | 2.5 seconds or less |
| INP | How quickly the page responds to taps | 200 ms or less |
| CLS | Layout stability, with no jumping elements | 0.1 or less |

## 10 steps to a faster store

### 1. Audit your apps
Every app adds scripts. Remove the ones you don't use, and ask whether the feature can be built into the theme. **Note:** uninstalling an app sometimes leaves code in the theme, so clean it up.

### 2. Compress images
- Upload images at a sensible size (not 5,000px for a product shown at 800px).
- Shopify serves modern image formats automatically, but a huge original still has an impact.

### 3. Lighten the first screen
- A slider with five large images is slower than one strong image.
- Video at the top: use a poster image and load the video afterwards.

### 4. Lazy-load images
Images below the fold load as shoppers reach them, not all at once.

### 5. Fewer fonts
Two families at most (Arabic and English), few weights, and text shown immediately with a fallback font.

### 6. Reserve space for elements
Set dimensions for images and banners so the page doesn't jump while loading (improves CLS).

### 7. Watch your pop-ups
A pop-up that appears instantly annoys shoppers and hurts your metrics. Delay it or trigger it on behaviour.

### 8. Tracking scripts
Pixels are necessary, but use the official integrations rather than duplicating code. See [Meta Pixel and CAPI on Shopify](/en/blog/meta-pixel-capi-shopify).

### 9. A clean theme
A well-built theme without features you don't use. "Everything included" themes are often slower. See [custom theme vs template](/en/blog/custom-theme-vs-template).

### 10. Measure regularly
- **PageSpeed Insights** in mobile mode.
- The **Core Web Vitals** report in Google Search Console (real-visitor data).
- The speed report in your Shopify admin.

## Priorities, in order

1. Remove unnecessary apps.
2. Compress first-screen images.
3. Simplify sliders and video.
4. Fonts.
5. Everything else.

## FAQ

### Is Shopify slow?
No. The platform itself is fast; slowness usually comes from the theme, apps and images.

### What PageSpeed score do I need?
The score is a rough guide. What matters is that Core Web Vitals for your real visitors are in the good range.

### Is removing apps enough?
It's usually the biggest win, but make sure you clean up code apps leave behind in the theme.

### Are your stores fast?
We build features into the theme instead of apps, and design the first screen for speed. See our [packages](/en#pricing).
