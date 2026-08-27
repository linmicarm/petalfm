# petal.fm

A lo-fi and ambient music player for focus, rest, and creative flow. Browse by
**mood** rather than genre, and switch the whole interface between a dark
**night** palette and a soft **day** palette.

<img width="1171" height="915" alt="image" src="https://github.com/user-attachments/assets/95cd8ea8-b7e0-4b7b-a609-aeeca0e846da" />

**Live:** https://linmicarm.github.io/petalfm/

Built with React, TypeScript, Vite, Framer Motion, and CSS Modules.

![petal.fm night and day](docs/preview.png)

---

## What it does

- **Mood-based browsing** — tracks are curated into moods (rainy day, deep
  focus, dawn calm, late night, creative flow) instead of by artist or genre.
- **Custom audio player** — play / pause, previous / next, scrubbable seek bar,
  and volume, all built on a single `HTMLAudioElement` rather than a library.
- **Day / night theme** — a token-driven theme system swaps the entire palette.
  First load respects the visitor's OS `prefers-color-scheme`, and the choice
  persists across visits.
- **Immersive motion** — the album tile breathes while playing, track titles
  cross-fade on change, and the whole card eases in on load — all
  reduced-motion aware.

---

## Decisions

| Decision | Why |
| --- | --- |
| Curated tracks + original ambient audio, **no Spotify auth** | A deployed demo has to work the instant someone opens it. The Web Playback SDK needs every visitor to log in with Spotify Premium, and Spotify deprecated `preview_url` for most tracks in 2024 — both leave a recruiter with a login wall or silence. Owning the audio layer keeps the demo reliable and puts the real engineering (the player, the curation, the theming) on display. |
| **Mood** as the primary axis, not genre | It's the actual product idea — matching sound to how you want to feel. It also gives the data model a clean shape and drives the browse UI. |
| One `HTMLAudioElement` for the app's life, swap `.src` to change track | Flat memory and gapless switching. One element to reason about instead of one per track. |
| Theme as **CSS custom properties** set from JS | Lets the toggle animate, lets both palettes derive from one token vocabulary, and keeps every component styled against semantic vars (`--accent`, `--surface`) rather than hard-coded hex. |
| **Fraunces + Jost**, dark plum base | A departure from my usual soft-girl-engineer look (Fredoka, thick outlines, candy pastels). The brief is calm and atmospheric, so the type and palette had to be too — this project is here to show range. |
| Framer Motion for motion, not CSS keyframes | The title cross-fade needs enter/exit orchestration (`AnimatePresence`) that's awkward in plain CSS. |

---

## Problems → Fix → Lesson

**Audio effects fired twice in development**
React 18 StrictMode double-invokes effects, which set up the audio element and
its listeners twice.
→ **Fix:** create the element behind a `useRef` guard (`if (audioRef.current
=== null)`), and register listeners in an effect with an empty dependency array
plus a cleanup that removes them.
→ **Lesson:** anything that instantiates a long-lived object or binds an event
listener needs to be idempotent under StrictMode. The ref-guard pattern is the
reliable way to do "exactly once."

**Audio 404'd on the deployed subpath**
Referencing audio as `/audio/x.mp3` worked locally but broke on
`linmicarm.github.io/petalfm/`, because the leading slash resolves against the
domain root.
→ **Fix:** build every audio path from `import.meta.env.BASE_URL`, and set
`base: '/petalfm/'` in `vite.config.ts`.
→ **Lesson:** on a subpath host, every asset path has to be relative to
`BASE_URL`. A leading slash is a silent production-only 404.

**Refreshing a routed URL would 404 on GitHub Pages**
GitHub Pages has no server to fall back to `index.html` for unknown paths.
→ **Fix:** the standard `404.html` redirect trick plus a restore snippet in
`index.html`. Included now so adding routes later won't reintroduce the bug.
→ **Lesson:** static hosts need the SPA fallback wired up front; it's cheap
insurance even before there are routes to protect.

---

## What I learned

- **StrictMode-safe resource setup** — the ref-guard + cleanup pattern for
  objects that must be created once and never leak.
- **A theme system built on CSS variables** — semantic tokens (`--accent`,
  `--surface`, `--text-soft`) set from JS give you animatable, persisted,
  system-aware theming without a CSS-in-JS dependency.
- **The `<input type="range">` as a real control** — styling the filled portion
  with a `linear-gradient` driven by a `--pct` custom property, and keeping
  play state in sync via the audio element's own `play` / `pause` events rather
  than optimistic UI state.
- **Designing against a mood instead of a house style** — deliberately setting
  aside my usual palette and type to fit the product's feeling.

---

## If I built it again

- **Web Audio API crossfade** — route playback through an `AudioContext` and
  `GainNode`s to crossfade between tracks instead of hard-switching `.src`.
- **A real catalog + routing** — a browse view per mood with shareable URLs
  (the 404 fallback is already in place for it).
- **Queue and shuffle** — the data layer already returns a per-mood queue;
  surfacing it as an actual up-next list is the natural next step.
- **Swap in licensed audio** — the bundled loops are original placeholders;
  real curated tracks with maintained attribution would replace them, and the
  `credit` field on every track already exists to hold it.

---

## Audio

The bundled tracks are original ambient loops generated for this demo and
released CC0, so the deployed app has no external audio dependency and no
licensing burden. To use your own audio, drop files into `public/audio/` and
update `src` and `credit` in `src/data/tracks.ts`. Every track carries a
`credit` field so attribution stays in the code and in this README.

---

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run deploy   # build + publish to GitHub Pages
```

## Project structure

```
src/
  components/   Player, MoodStrip, ThemeToggle (each with a CSS module)
  data/         moods.ts, tracks.ts — the curation layer
  hooks/        useAudioPlayer, useTheme, formatTime
  theme/        themes.ts — day/night token palettes
  types/        shared Track / Mood / ThemeMode types
public/
  audio/        ambient loops (.mp3)
```
