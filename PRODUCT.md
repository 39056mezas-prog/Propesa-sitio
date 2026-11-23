# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS (no framework, no libraries, no CDN), deployed on Vercel like the PROPESA platform. Confirmed 2/nov/2026.

The home page takes over **propesa.org**. The internal platform (today served at propesa.org) moves to its own subdomain (proposed `app.propesa.org`; final name not decided). That move is a separate change in the platform repo and must account for: tablets that installed the app to their home screen from propesa.org, `og:url`/`og:image` URLs, the CSP and Supabase Auth redirect URLs, and the Vercel cron `/api/despierta`.

## Users

The first public page about the company. Every audience below was confirmed (2/nov/2026):

- **Buyers and importers in Asia**: clients and consignees in mainland China, Hong Kong and Taiwan looking for a supplier of live red lobster.
- **Fishing cooperatives of Baja California**: suppliers deciding whether to sell their catch to PROPESA.
- **Maquila clients**: companies that want PROPESA to hold and pack their own lobster in its tanks.
- **PROPESA staff**: people who use the internal platform day to day. They sign in from the top right of the home page and land in the platform exactly as it works today (confirmed 2/nov/2026).

Language: **Spanish only** for now. Visitors are addressed as **usted** (confirmed 2/nov/2026).

## Product Purpose

Tell each audience, plainly, what PROPESA is and does, and let them get in touch. Success = a buyer, cooperative or maquila client understands the service and emails or calls.

## Positioning

What PROPESA does that a neighbouring site could not truthfully copy (confirmed 2/nov/2026):

1. **Wet storage in Ensenada.** Live red lobster is held in tanks at its own plant in Ensenada, Baja California, until it ships.
2. **Air export to Asia.** Lobster is packed in coolers and shipped live by air to mainland China, Hong Kong and Taiwan.
3. **Storage and packing service (maquila).** Other companies store and pack their lobster with PROPESA, and each one's product is kept separate.

Not claimed publicly: lot-by-lot traceability through the platform was offered as a claim and **not** selected. Do not market the internal platform on the site.

## Operating Context

- **Company:** Proveedor del Pescador S.A. de C.V. (PROPESA).
- **Product:** live red lobster (langosta roja), held in wet storage ("almacenaje húmedo") and exported alive.
- **Season:** red lobster is fished from 16 September to 15 February; the closed season ("veda") lasts the other ~7 months. **The site does not state season dates** (confirmed 2/nov/2026).
- **Supply:** fishing cooperatives of Baja California (e.g. SCPP Ensenada, Emancipación, Leyes de Reforma appear in company records). Do not publish supplier names without permission.
- **Process (internal terms):** Entrada (intake) → Órdenes → Empaque (packing into coolers / hieleras) → Embarque (shipment by truck to the airport, then by air).
- **Destinations:** the records show shipments to mainland China, Hong Kong and Taiwan. **The site names regions only, never cities or airports** (confirmed 2/nov/2026).
- **Sizes (grams):** 491–610, 611–850, 851–1220, 1221+ (company sizes; maquila clients may use their own).
- **Coolers:** 16 kg net of product per cooler for PROPESA (some maquila clients use 15 kg).

## Capabilities and Constraints

- Contact on the page: **email only** (phone removed 5/nov/2026 at the owner's request). No contact form, no WhatsApp, no mail backend.
- Contact shown on the site (from the company's official forms):
  - propesaseafood@gmail.com
- **Not shown online** (confirmed 2/nov/2026): the company's street address and its R.F.C. Location is stated only as Ensenada, Baja California.
- **Staff sign-in:** a sign-in link at the top right goes to the platform, which stays as it is. No platform features, screenshots or description on the site.
- No prices, no ordering, no client portal on the site.
- **Open decisions:**
  - Final subdomain for the platform (proposed `app.propesa.org`; the user connects it later, the sign-in link points there meanwhile).
  - Chinese or English versions (not in this version).

## Brand Commitments

- Name: **PROPESA** (the logo reads PROPĒSA). Legal name: Proveedor del Pescador S.A. de C.V.
- **Logo (decided 2/nov/2026):** the site uses the same PROPESA logo as the platform (the SVG drawn in the platform's `index.html`, `LGP`/`LGW`): color version in the header, white version in the footer (`img/logo-propesa.svg`, `img/logo-propesa-blanco.svg`). If an official file arrives later, replace both files.
- **Standing preference (2/nov/2026):** the site is a traditional, everyday business website in PROPESA navy. The full-page chart concept was declined; the user then asked for a hybrid, so the Pacific chart lives only in the hero, in brand navy, and everything below stays traditional.
- The platform's brand record (`docs/BRAND.md` in the platform repo) describes an incumbent identity: deep navy `#0B1D59`, ocean blue, sparse cyan, logo blues `#0a2373` / `#0583c3`, white lobster favicon. It is evidence of the existing identity, not a binding spec for the site; the visual direction is decided in new-work.

## Evidence on Hand

- **Photos:** PROPESA's own plant photos uploaded 2/nov/2026 (`fotos/`, 7 used: tanks, cooler sealing, packing, product crate, sorting team, weighing, crate check). The pallet photo was not used because its label shows an airport code and a phone number. Do not use stock photos or generated images presented as PROPESA's plant or product.
- **Logo:** the platform's PROPESA logo, in color and white (see Brand Commitments).
- **Absent — must not be invented:** permits or certifications, years in operation, volumes, number of cooperatives, client or consignee names, testimonials, awards, quality claims with numbers.

## Product Principles

1. **Only what is true, and only what is public.** Every claim on the page maps to a confirmed fact above; anything else is left out until the user confirms it. No street address, R.F.C., cities, suppliers or clients online: regions and "Ensenada, Baja California" are enough.
2. **One page, three audiences.** A buyer, a cooperative and a maquila client should each find, quickly, what PROPESA offers them.
3. **Getting in touch is the point.** Email is always easy to find and work with one tap on a phone.
4. **The real place, the real product.** PROPESA's own photos and logo carry the page; nothing stands in for them.
5. **The website and the internal platform stay separate.** The site does not advertise or describe the platform; staff reach it through the sign-in link at the top right.

## Accessibility & Inclusion

Phone-number detection is off (`format-detection`) so iOS does not turn sizes like 851–1220 g into call links.

WCAG 2.1 AA, carried over from the platform's rule (contrast 4.5:1 for text, 44 px touch targets, visible focus, respects reduced motion). Many visitors will open it on a phone, some on slow mobile data.
