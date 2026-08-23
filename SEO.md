# SEO

Technical SEO as implemented in this repository. Schema and copy must match visible, factual content. Do not add pages or structured data only for search engines.

The site is a Swedish Next.js App Router app. Locale is `sv` with no locale prefixes in URLs.

## Site URL

Canonical URLs come from [`src/app/config/site.ts`](src/app/config/site.ts):

- `SITE_URL` is `process.env.SITE_URL`, falling back to `https://www.dahliakliniken.se`
- `canonicalUrl(path)` joins that base with a path and never adds a trailing slash on the homepage

Set `SITE_URL` in production (see [`.env.example`](.env.example)). Leave it unset on Vercel preview so preview deploys keep the production fallback URL and stay noindexed via `VERCEL_ENV=preview`.

`metadataBase` in [`src/app/layout.tsx`](src/app/layout.tsx) uses the same `SITE_URL`.

## Metadata

Use [`createPageMetadata({ title, description, path })`](src/app/config/metadata.ts) on every public indexable page. It sets:

- `title` and `description` (no title template — page titles already include ` - Dahliakliniken`)
- `alternates.canonical` via `canonicalUrl(path)`
- Open Graph: `url`, `siteName`, `locale: sv_SE`, `type: website`, `/opengraph-image.jpg`
- Twitter: `summary_large_image`, `/twitter-image.jpg`

The root layout only keeps `metadataBase` plus default title and description. Page metadata supplies canonicals and social tags.

`/tack-for-din-bokning` is the exception: it sets a title and `robots: { index: false, follow: false }` and does not use `createPageMetadata`.

App Router icon files in `src/app/` are `favicon.ico`, `icon.png`, and `apple-icon.png`. Next.js 16 emits `rel="apple-touch-icon"` from `apple-icon.png`; `apple-touch-icon.png` is not a supported metadata filename.

## Sitemap

[`src/app/sitemap.ts`](src/app/sitemap.ts) generates `/sitemap.xml` from [`src/lastModified.json`](src/lastModified.json). Each entry is `{ url: canonicalUrl(path), lastModified: date }`.

`prebuild` runs [`scripts/generate-last-modified.mjs`](scripts/generate-last-modified.mjs), which maps every `src/app/**/page.tsx` to its last git commit date. Routes in `NOINDEX_PATHS` (`/tack-for-din-bokning`) are omitted from the sitemap.

[`getLastModified()`](src/utils/getLastModified.ts) reads the same JSON for the “last updated” footer. Unknown paths return `undefined` (no homepage-date fallback).

## Robots / preview protection

[`src/app/robots.ts`](src/app/robots.ts):

- **Production:** allow `/`, disallow `NOINDEX_PATHS`, sitemap `{SITE_URL}/sitemap.xml`
- **Vercel preview** (`VERCEL_ENV === 'preview'`): disallow `/` and omit the sitemap

[`src/proxy.ts`](src/proxy.ts) also sets `X-Robots-Tag: noindex, nofollow` on preview responses.

## JSON-LD

Render schema with [`JsonLd`](src/app/components/surfaces/JsonLd.tsx). `id` is required and must be unique. The component SSR-emits a `<script type="application/ld+json">`.

**Schema must describe content that is actually visible on that page.** Do not invent reviews, ratings, locations, or services.

Current types:

| Type | Where |
| --- | --- |
| `Organization`, `WebSite` | Root layout (`jsonld-organization`). Logo is the public `/images/Logo.png` URL. `@id`s are `ORG_ID` and `{SITE_URL}#website`. |
| `MedicalClinic` | Homepage (`jsonld-clinic`): lean clinic entity (name, url, description, founder, specialty, areaServed, sameAs, `parentOrganization: ORG_ID`). Full NAP (phone, email, `PostalAddress`, clinic image) is on `/kontakt-och-besok` (`jsonld-clinic-contact`). Both use `CLINIC_ID`. |
| `FAQPage` | `/fragor-och-svar` |
| `BreadcrumbList` | Public pages with visible breadcrumbs |
| `Quotation` | Homepage testimonials |
| `MedicalWebPage` plus `ItemList` / `SurgicalProcedure` / `TherapeuticProcedure` / `MedicalDevice` | Matching treatment pages |

Use stable public image URLs (`/images/...`), not hashed `/_next/static/media/...` paths. Entity `@id`s (`CLINIC_ID`, `ORG_ID`, page `#breadcrumb` / `#faq` / testimonial ids) must stay unique and stable.

## FAQ

`/fragor-och-svar` builds `FAQPage` from the same `FAQ_ITEM_KEYS` as the visible accordion in [`accordionData.tsx`](src/app/fragor-och-svar/accordionData.tsx). Answers in JSON-LD are plain text (`t.raw()` with tags stripped) so rich-text placeholders in messages do not leak markup.

## Breadcrumbs

Visible crumbs ([`Breadcrumbs.tsx`](src/app/components/navigation/Breadcrumbs.tsx)) and `BreadcrumbList` ([`createBreadcrumbList.ts`](src/app/components/navigation/createBreadcrumbList.ts) via [`BreadcrumbJsonLd.tsx`](src/app/components/navigation/BreadcrumbJsonLd.tsx)) share [`breadcrumbLabels.ts`](src/app/components/navigation/breadcrumbLabels.ts). Item URLs use `canonicalUrl()`.

Home has no visible breadcrumbs and no `BreadcrumbList`. `/tack-for-din-bokning` is not given breadcrumb JSON-LD.

## Testimonials

The homepage [`Testimonials`](src/app/components/surfaces/Testimonials/Testimonials.tsx) Server Component shuffles the source list once per render and shows three cards. The same `selectedTestimonials` array is emitted as `Quotation` JSON-LD (`jsonld-testimonials`). This is not `Review` / `AggregateRating`, and the selection is not a fixed list.

## Semantic HTML

[`layout.tsx`](src/app/layout.tsx) provides a `<header>` (site chrome, including the expanded cookie control), `<main>`, and a `<footer>` for last-updated plus the privacy-policy link. Breadcrumbs use `<nav>`. Contact details on `/kontakt-och-besok` use `<address>`.

Each public page should have one visible `<h1>` and a normal heading hierarchy.

`/personuppgiftspolicy` is a public indexable page. The footer always includes `<a href="/personuppgiftspolicy">` in the server-rendered HTML.

## Adding a new public page

1. Add the App Router `page.tsx`.
2. Export `createPageMetadata({ title, description, path })` with the real canonical path.
3. Give the page one clear `<h1>`.
4. Rely on the shared breadcrumb UI; add `<BreadcrumbJsonLd path="..." />` when the page should emit `BreadcrumbList`.
5. Let `prebuild` refresh `lastModified.json` so the route appears in `/sitemap.xml` (omit it from the sitemap only if it belongs in `NOINDEX_PATHS`).
6. Add JSON-LD only when the page visibly contains an entity that justifies it, using `JsonLd` with a unique `id` and a stable public image URL if needed.
