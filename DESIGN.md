---
name: PROPESA
description: Living-chart business site for a live red lobster exporter in Ensenada, in the logo's navy and blue, opening on a full-bleed North Pacific chart where the routes to Asia are always in flight.
colors:
  marino: "#0A2373"
  marino-hondo: "#06164A"
  azul: "#0583C3"
  azul-boton: "#0472AB"
  azul-claro: "#5BBAEE"
  rojo-vivo: "#F0604B"
  papel: "#FFFFFF"
  texto: "#16224A"
  texto-2: "#46557A"
  sobre-marino: "#C9D6F0"
  linea-oscura: "rgba(255, 255, 255, .18)"
  carta-plataforma: "#0C3A92"
  carta-tierra: "#1B3683"
  carta-costa: "#7FB6E6"
  carta-isobata: "#2457B0"
  carta-agua: "#A9C9EE"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.9vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 82"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 82"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.28rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 650
    lineHeight: 1.2
rounded:
  sm: "4px"
  md: "6px"
  pill: "999px"
spacing:
  inline-gap: "12px"
  gutter: "clamp(20px, 5vw, 64px)"
  column-gap: "clamp(24px, 3vw, 48px)"
  section: "clamp(72px, 10vw, 136px)"
  container: "1240px"
  header: "76px"
components:
  button-blue:
    backgroundColor: "{colors.azul-boton}"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "54px"
  button-outline-on-navy:
    backgroundColor: "transparent"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "54px"
  signin:
    backgroundColor: "transparent"
    textColor: "{colors.papel}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  signin-hover:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.marino}"
  nav-link:
    textColor: "{colors.papel}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  header-solid:
    backgroundColor: "rgba(10, 35, 115, .82)"
    textColor: "{colors.papel}"
    height: "{spacing.header}"
  contact-tile:
    backgroundColor: "rgba(255, 255, 255, .06)"
    textColor: "{colors.papel}"
    rounded: "{rounded.md}"
    padding: "18px 22px"
    height: "78px"
  contact-tile-hover:
    backgroundColor: "rgba(5, 131, 195, .22)"
    textColor: "{colors.papel}"
  size-chip:
    backgroundColor: "rgba(6, 22, 74, .45)"
    textColor: "{colors.papel}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  audience-column:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.texto-2}"
    padding: "28px 0 0"
  text-link:
    textColor: "{colors.marino}"
    typography: "{typography.label}"
    height: "44px"
---

# Design System: PROPESA

## Overview

**Creative North Star: "The Living Chart"**

PROPESA's site is a chart that is still moving and a walk through the plant. It opens on a full-bleed North Pacific chart in the logo's navy, with no frame and no box: the map drifts slowly, the lobster-red routes draw themselves once, white light trails keep flying from Ensenada to Asia, and Ensenada pulses. The visitor then walks the plant, with dark and white sections taking turns (the user asked for less blue and more white): storage as a scene where a lobster on the tank edge fills the right side and fades into navy behind the text, export as a white section with the three destinations set large (the user removed its photo), maquila as a dark scene, the audiences on white, the lobster itself beside its spec sheet, and a white contact section with the Ensenada chart filling the right half.

The logo's colors lead. PROPESA navy and its deeper night navy carry almost every surface; logo blue drives buttons, rules and glows; its light tint sets the second line of every headline. Lobster red is kept for what travels. Type is one family, Archivo, set big and condensed (82% width) in two tones. Density is cinematic rather than editorial: few words per screen, large type, the real plant photographs doing the persuading.

Confirmed rejections: framed or boxed heroes, card grids, stock photos, cluttered photos, invented claims.

**Key Characteristics:**
- Dark and white alternate: chart hero (dark) → Almacenaje scene (dark) → Exportación (white, destinations list) → Maquila scene (dark) → audiences (white) → product scene (dark) → contact (white split) → footer (dark). Never two dark full-bleed sections in a row after the hero.
- Text sits on veils or on white, never in boxes: a soft navy radial veil on the chart, directional dark veils on photo scenes (navy on the text side, nearly neutral and light on the photo side so the photo keeps its own colors).
- Two-tone condensed headlines: white first line, light logo blue second line.
- Lobster red only on routes and destination points.
- Motion lives in the charts and the scroll; it pauses off-screen and is absent under reduced motion.
- Gently curved 6px corners on UI; sections and media are edge-to-edge and square.

## Colors

The logo's navy and blue on a night ground, one white breath, and one warm red for cargo in motion; chart tones are navy variations that stay inside maps.

### Primary
- **PROPESA Navy** (marino): the chart ocean, the hero ground and its stacked text band on small screens, the middle stop of every veil, the solid header, the mobile menu panel, headings in the white section, the text-link color on white.
- **Night Navy** (marino-hondo): the page and footer ground, the darkest (text-side) stop of every veil, the radial veil behind the hero text, map-label halos.

### Secondary
- **Logo Blue** (azul): the 3px top rules on the audience columns, link arrows and underlines on white, the focus ring inside the white section, the glow under the blue button, the far stop of photo veils, the radial glow in contact surfaces. Not a button fill under white text.
- **Button Blue** (azul-boton): the fill of the primary call button and the skip link, one step deeper than Logo Blue so white label text reaches 5.2:1.
- **Light Logo Blue** (azul-claro): the second line of every headline on dark grounds (6.5:1 on PROPESA Navy), spec-sheet terms and its top rule, contact icons, the comet trails, the focus ring on dark grounds, the contact-tile hover border.

### Tertiary
- **Lobster Red** (rojo-vivo): route strokes, destination points and their legend keys. 4.3:1 on the chart ocean and 3.2:1 on the shelf, both above the 3:1 needed for graphics. Nothing else.

### Neutral
- **Paper** (papel): headline first lines, button and link text on dark, the audience section ground, map place names, the origin marker, comet heads.
- **Ink** (texto): body text in the white section.
- **Muted Ink** (texto-2): audience paragraphs.
- **Navy Mist** (sobre-marino): body text on every dark ground, the hero statement, contact labels, minor map labels.
- **Night Hairline** (linea-oscura): dividers and tile borders on dark grounds (spec-sheet rows, contact tiles, footer rules, menu panel).

### Chart tones (charts only)
- **Chart Shelf** (carta-plataforma): the continental shelf, a brighter navy than the ocean.
- **Chart Land** (carta-tierra): land masses.
- **Chart Coast** (carta-costa): coastlines and, at 60% and dashed 3 2, national borders.
- **Chart Isobath** (carta-isobata): depth contours, dashed 6 3 for the deeper one.
- **Chart Water Lettering** (carta-agua): the italic ocean name.
- The ocean itself is PROPESA Navy; the graticule is white at 7–8% opacity.

### Named Rules
**The Red Route Rule.** Lobster red marks only what travels: the routes, destination points and the legend keys that explain them. It never colors a button, link, heading, icon, rule or background.

**The Navy Chart Rule.** Charts are drawn in navy variations only: ocean in PROPESA Navy, shelf, land, coast and isobaths in their chart tones, lettering in white, Navy Mist and Chart Water Lettering. The only other hues on a chart are the red routes and the white-and-light-blue comets. Chart tones never become UI surfaces or text colors outside charts.

**The Logo Leads Rule.** Every surface color comes from the logo: PROPESA Navy, Night Navy, Logo Blue and its light tint. White appears as one breathing section and as type; there is no grey, fog or tinted-paper band.

## Typography

**Display Font:** Archivo (self-hosted variable, weight 100–900, width 62–125%, roman and italic, with system-ui fallback)
**Body Font:** Archivo
**Label Font:** Archivo

**Character:** A sturdy grotesque pulled to 82% width for the headlines, which makes them tall, compact and loud enough to sit over a moving chart or a full photograph; body copy stays at normal width and reads plainly.

### Hierarchy
- **Display** (700, clamp(2.6rem, 4.9vw, 4.8rem), 1.06, wdth 82): the hero headline only, two-tone.
- **Headline** (700, clamp(2.4rem, 5.4vw, 4.8rem), 1.06, wdth 82): scene and section headings, two-tone on dark, single-tone PROPESA Navy in the white section. Balanced wrapping.
- **Title** (700, 1.3rem, 1.2): audience column headings.
- **Lead** (400, clamp(1.1rem, 1.4vw, 1.28rem), 1.6): scene paragraphs in Navy Mist, max 34rem; the hero statement runs at clamp(1.08rem, 1.35vw, 1.22rem), max 50ch; contact intro at 1.15rem.
- **Body** (400, 1.0625rem, 1.6; 1rem on phones): running copy, pretty wrapping.
- **Label** (650, ~1rem): buttons, sign-in, text links, spec-sheet terms; nav links at 550; contact-tile captions at 0.85rem 550.
- **Logo**: the platform's PROPESA logo, white file `img/logo-propesa-blanco.svg`, in the header at 56px tall (42px on phones) and the footer at 64px. Never redrawn or set in Archivo.

### Named Rules
**The One Family Rule.** Archivo only, self-hosted. Hierarchy comes from size, weight (400 / 450 / 500 / 550 / 650 / 700) and the width axis, never from a second face.

**The Two-Tone Headline Rule.** On dark grounds every h1 and h2 breaks into two lines: the first in white, the second (a block span) in Light Logo Blue. On the white section the heading is one line in PROPESA Navy; the light tint is never set on white.

**The Width Axis Rule.** Headlines sit at 82% width. Titles, body and labels stay at the default width.

**The Map Lettering Rule.** Inside charts, lettering follows cartographic convention: place names in white (700) with a Night Navy halo at 90% (7px on the hero, 4px on the contact chart); secondary place names in Navy Mist (500); the ocean name in letter-spaced (0.2em) italic (450) Chart Water Lettering without a halo (8.2:1 on the ocean, 6.0:1 on the shelf); region names on land in uppercase letter-spaced (0.22em) Navy Mist (600) without a halo (7.5:1 on land). This tracked lettering belongs to the chart and is not a model for page headings or labels.

## Layout

A 1240px centered container with fluid gutters (clamp(20px, 5vw, 64px)). Every section is full-bleed. The header is fixed above everything and 76px tall (64px on phones).

The hero is the chart at the map's 16:9 proportion: clamp(600px, min(100svh, 56.25vw), 1000px) tall, the chart cropped to cover. The text block sits over open ocean between the continents (from 37% of the width, clamp(40px, 9%, 96px) from the bottom, min(640px, 48%) wide) so the routes arc above it and neither end is covered.

Scenes are clamp(560px, 92svh, 900px) tall with section padding of clamp(72px, 10vw, 136px), content vertically centered, text max 760px. They alternate sides: text left with a 100° veil, text right with a 260° veil. The audience section is three equal columns (gap clamp(24px, 3vw, 48px)). Contact is clamp(520px, 72svh, 760px) tall with text left, max 560px.

Responsive: at 960px the nav collapses into a disclosure menu and audiences become one column. At 860px the hero stacks: the header height is padded in, the chart becomes a 16:9 strip, the text block sits below on PROPESA Navy, and the ocean name and minor labels drop. Scenes put their text at the bottom (or at the top, where the photo's subject sits low) behind vertical veils, and contact text moves to the top. At 640px hero actions stack full width, map labels leave the chart for a legend under the statement, the statement drops its destination clause, routes, comets and markers thicken, and the spec sheet goes single column. Touch targets are at least 44px throughout.

## Elevation & Depth

Depth comes from light, not from stacked surfaces: veils over photographs and charts, a glow under the primary button, glowing comet trails. Three soft shadows lift the few objects that float.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 2px rgba(6, 22, 74, .08), 0 18px 40px -18px rgba(6, 22, 74, .35)`): the mobile menu panel.
- **Header** (`box-shadow: 0 10px 30px -18px rgba(3, 9, 33, .8)`): the header once it turns solid.
- **Blue Glow** (`box-shadow: 0 12px 30px -12px rgba(5, 131, 195, .8)`): under the blue call button only.

### Veils
- **Hero veil:** a Night Navy radial ellipse (48% × 52% at 63% 82%, 90% to transparent) behind the text, a bottom fade (75% to 0 at 34%) and a top fade under the header (55% to 0 at 22%).
- **Scene veil:** Night Navy 96% at the text edge, PROPESA Navy 88% at 48%, 50% at 70%, Logo Blue 20% at the far edge, plus a bottom fade; mirrored at 260° for right-hand scenes. Vertical at 860px and below.
- **Product veil:** the same direction but clearing to 20% by 64% and 6% at the far edge, so the lobster's own red reads untouched.

### Named Rules
**The No Frame Rule.** Charts and photographs run edge to edge with no frame, border, cartouche or card; text reaches them through a veil, never through a box.

**The Soft Shadow Rule.** Shadows are soft and navy- or blue-tinted, and each has one job. No hard offsets, no stacked elevations.

## Shapes

Gently curved corners (6px) on buttons, sign-in, nav hovers, contact tiles and the menu panel; 4px on menu items; full pills on size chips and legend keys. Sections, charts and photographs are square and edge-to-edge. Rules carry structure: 3px Logo Blue on top of each audience column, 2px Light Logo Blue on top of the spec sheet, 1.5px outlines on outlined buttons and sign-in, 1px Night Hairlines on dark grounds. Map markers are circles: a white origin ringed in navy with a pulsing white ring, red destinations ringed in white.

## Components

### Buttons
Solid and unhurried, white type on logo blue.
- **Shape:** gently curved (6px), 54px tall, 20px icon left.
- **Blue (primary):** Button Blue fill, white 650 label, Blue Glow beneath; hover lifts 1px.
- **Outline on navy:** transparent with a 1.5px white border at 70%; hover adds a 10% white wash and a full white border.
- **Sign-in:** 44px, 1.5px white outline at 70% with a person icon; hover inverts to white fill, PROPESA Navy text.
- **Focus:** 3px Light Logo Blue outline, 3px offset; Logo Blue in the white section.
- **Motion:** state transitions 200ms on cubic-bezier(.16, 1, .3, 1).

### Text Links (white section)
PROPESA Navy, 650, underlined at 1.5px in Logo Blue at 50%, 6px below, with a Logo Blue trailing arrow. Hover brings the underline to full Logo Blue and nudges the arrow 4px right.

### Contact Tiles
White tiles in the white contact section: white fill, 1px #D5DEEC border, 6px corners, 78px minimum height. Logo Blue icon (28px) left; a muted-ink caption above the value in PROPESA Navy at clamp(1.1rem, 2vw, 1.4rem), 700. Hover fills #EEF4FA, turns the border Logo Blue and adds the soft shadow.

### White Split Sections
White sections where one real image fills half the viewport edge to edge (right half, full height): the contact section with the Ensenada chart. Exportación is white without an image: headline and lead on the left, the three destination regions on the right as a large list (PROPESA Navy, 82% width, clamp(1.7rem, 3.2vw, 2.8rem), lobster-red dot keys, hairline rules). Text sits in the left 45% of the container on white: two-tone headline in PROPESA Navy + Logo Blue at clamp(2.3rem, 4.3vw, 3.9rem), muted-ink lead capped at 34rem. Same scroll parallax and rising text as the scenes where supported. At 860px and below the image becomes a band under the text (4:3 for photos, 16:10 for the chart).

### Spec Sheet
A definition list over the product photo under a 2px Light Logo Blue rule: Light Logo Blue 650 terms in an 8.5rem column, white values, Night Hairline row dividers. Sizes are pill chips with a 30% white border on a 45% Night Navy fill and tabular figures.

### Navigation
Fixed header, transparent over the hero with a Night Navy top fade (78% to 0), turning solid PROPESA Navy (82% with a 12px blur and 1.3 saturation, 94% without blur support) plus the Header shadow after 40px of scroll; 350ms transition. White logo left, white 550 links with 10% white hover fills, outlined sign-in at the far right. Below 960px links move into a disclosure menu: a 44px icon button opening a PROPESA Navy panel with a Night Hairline border and the Lift shadow; choosing a link closes it.

### Scenes (signature)
Full-bleed sections, each one PROPESA photograph (`fotos/`, own plant photography only) covering the section under its veil, with a two-tone headline and one Lead paragraph. Where scroll-driven animation is supported and motion is allowed, the photo is 120% tall and drifts from -7% to 7% across the section's view, and the text rises 56px from 20% opacity between entry 5% and cover 38%. Otherwise the scene is static.

### The Globe (signature)
Since 3/nov/2026 the hero is a real 3D globe (`globo.js`, hand-written WebGL, no libraries): NASA Blue Marble (public domain, `img/tierra-textura.jpg`, 4096×2048) on a sphere with soft day-side shading, a darker limb, a thin blue atmosphere rim and a halo, on a deep navy radial background. It sits to the right of the headline on desktop (about 58% of the width, slightly off the right edge) and above the text on screens 860px wide and below.
- **Drag to turn:** mouse or finger turns the globe horizontally and vertically (touch: horizontal only, so a vertical swipe still scrolls the page); arrow keys turn it when focused. On release it keeps turning and slows down (inertia 0.94 per frame).
- **Boundary:** the globe's centre stays between 165°E–189°E and 10°N–36°N so Ensenada and the three Asian regions are always visible; dragging past the edge meets resistance and springs back.
- **Overlay (2D canvas, same projection):** the three lobster-red great-circle routes draw once on load, white light trails with a light-blue glow keep flying Ensenada → Asia, Ensenada pulses, red destination points and white labels with navy halos; anything on the far side of the globe is hidden.
- **Only one moving extra (7/nov/2026, user):** a small white cargo plane (with its shadow on the sea) flies the Ensenada → mainland China route. No boats, no lobsters, no lobster doodle and no big plane around or on the globe. Labels and points are steady from the first frame (they no longer pop in when the routes finish); the whole overlay fades in once, softly (no fade under reduced motion).
- **Idle:** after 5 s without touch the globe sways gently around the start view (177°E, 22°N); under reduced motion nothing moves by itself but dragging still works.
- **Hint:** a pill "Arrastre para girar el globo" with a hand icon under the globe until the first touch.
- **Fallback:** without WebGL a pre-rendered still of the start view (`img/globo-inicio.jpg`) shows with the routes and labels on top, not draggable.
- A navy gradient (`.velo-mapa`) rises from the bottom of the hero.

### Ensenada Contact Chart
The image half of the white contact section: a northern Baja California chart (`img/carta-contacto.svg`, Natural Earth 10m land and coastline, coast drawn as lines only) in the same navy chart tones, anchored right (`xMaxYMid slice`), with a white origin marker and its pulsing ring at Ensenada, the white "Ensenada" label and an uppercase "Baja California" region label. No frame, no veil, no caption bar.

### Map Legend
Shown only at 640px and below, under the hero statement: 12px round keys ringed in PROPESA Navy and white (white for the origin, Lobster Red for destinations) beside Navy Mist text at 0.95rem.

## Do's and Don'ts

### Do:
- **Do** build surfaces from the logo's colors: PROPESA Navy and Night Navy grounds, Logo Blue rules and glows, Light Logo Blue headline second lines, white type (The Logo Leads Rule).
- **Do** keep lobster red (#F0604B) for routes, destination points and their legend keys (The Red Route Rule).
- **Do** set two-tone headlines in Archivo 700 at 82% width on dark grounds (The Two-Tone Headline Rule).
- **Do** run charts and photographs full-bleed and reach them with a navy veil whose darkest stop sits behind the text.
- **Do** pause every looping animation off-screen and drop all motion under reduced motion.
- **Do** keep touch targets at 44px or more and the 3px focus outline visible on every interactive element.
- **Do** draw any new map in the navy chart tones and letter it by The Map Lettering Rule; move labels into a legend when the chart is too small to read them.
- **Do** use the platform's PROPESA logo files as they are.

### Don't:
- **Don't** frame or box a chart or photo: no cartouche, graduated border, inset frame or photo card (The No Frame Rule).
- **Don't** use lobster red on buttons, links, icons, rules, headings or backgrounds.
- **Don't** set white text on Logo Blue (#0583C3); filled buttons use Button Blue.
- **Don't** set Light Logo Blue on white.
- **Don't** build card grids or icon-tile cards; services are scenes, audiences are ruled columns.
- **Don't** use stock or generated photos presented as PROPESA's plant, tanks or product.
- **Don't** recreate the PROPESA logo in SVG; use the official file.
- **Don't** add shadows beyond Lift, Header and Blue Glow, and never hard offset shadows.
- **Don't** let chart tones become UI surfaces or text colors outside charts.
