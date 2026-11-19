# Art direction: "Kuća od poda"

_Nov 2026 redesign pass._

**Visual thesis.** The client's own logo already holds the idea: a house outline with a leaf growing from its
floor, and a wordmark standing on a floor line. The site extends that line. Headlines stand on a heavy ink rule,
photographs are laid like boards, and the logo returns at architectural scale in the footer.

- **Logo.** The original logo (orange roof, green house and leaf, `#333` wordmark on a rule), redrawn as a vector
  from the client's PNG (`public/brand`, `src/components/brand`). The PNG is preserved untouched.
- **Hero focal asset.** Interior photographs from the client's current website on a wide stage. They change in six
  vertical planks that rise from the floor line, left to right, which is how a floor is actually laid.
- **Type.** Instrument Sans (structure, information) + Newsreader italic (material, voice).
- **Colour.** Warm paper, ink, oak. The logo's roof orange appears only as small section markers; the leaf green
  stays in the logo. Colour otherwise comes from the photographs.
- **Section sequence.** Hero → statement → collections index → sample boards → material story (dark chapter) →
  inspiration → manufacturers → showroom → footer with the full-width logo.
- **Motion narrative.** GSAP is the only animation system: logo draw-in (house outline, roof, leaf, wordmark along
  its rule), hero planks, headings rising word by word from their baseline, the statement brightening word by word
  as it is read (scrubbed), and short parallax drift inside framed photos. CSS handles hover and focus only.
- **Smooth scroll.** Lenis, chosen over Locomotive Scroll (v5 is itself built on Lenis, so it adds weight without
  adding anything we use). It runs on native scroll, so `position: sticky` and anchors keep working; it is driven
  by the GSAP ticker and feeds ScrollTrigger. Disabled under `prefers-reduced-motion`.
- **Three.js.** Not used. The one transition that could justify a shader (the hero image change) is expressed
  better and more cheaply as clip-path planks, and nothing else needs spatial depth.
- **Assets.** No illustrations. A 128 px generated paper-grain tile (`public/textures/grain.png`). Photographs and
  their provenance are listed in `src/content/media.ts` and on `/napomene`.

**Accessibility and fallbacks.** Split headings are split on the server (`components/motion/Split.tsx`): an unsplit
`sr-only` copy carries the accessible name and the split copy is `aria-hidden`. Hidden start states exist only
under `html.js` and `prefers-reduced-motion: no-preference`, and a 3 s failsafe (`html.motion-off`) shows
everything if the motion system never starts. The hero gallery has numbered controls and a pause button; it stops
offscreen, in background tabs and on hover, and never autoplays under reduced motion.
