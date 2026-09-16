# Dinner Menu — project progress

> Hand-off file. Any coding agent (or human) should be able to pick this up cold.
> Keep this file updated at the end of every working session.

## What this is

A tiny mobile website that tells Gautam's cook, **Diya**, what to make for dinner each day.
Gautam is on a fitness programme; the dishes come from a trainer-provided PDF
(`source/Aditya Lunch Dinner Menu.pdf`, "Lean Machine Program" by Viren Barman / Team GFC).
All 14 dishes are ~500 kcal and must be followed **exactly** (quantities in grams — a kitchen scale is assumed).

Both Gautam and Diya open the **same link** on their phones.

### Constraints that shaped the design
- Diya is not fluent in reading English → **Hindi is the primary language**, English shown smaller underneath.
  Every string in the data file is bilingual (`{ en, hi }`).
- Very large type, emoji icons per ingredient, numbered steps that can be tapped ✓ when done,
  and a **🔊 read-aloud** button (browser text-to-speech in `hi-IN`).
- No backend, no login, no build step. Plain HTML/CSS/JS so it can be hosted anywhere for free
  and edited by any agent.

## Current status (2026-09-16)

**v1 built, running locally. Not yet deployed / not yet shared with Diya.**

Done:
- [x] Extracted all 14 recipes + the "make your own" template from the PDF into `js/data.js` (Hindi + English).
- [x] Today view: tonight's dish, big card, kcal/macros, "see recipe" button, week strip (Mon–Sun).
- [x] Recipe view: ingredients (icon · quantity · name), tap-to-tick steps, read-aloud, trainer's protein swaps (collapsed, English, for Gautam).
- [x] All-recipes grid.
- [x] Plan view (for Gautam): pick a dish per weekday, save, share as a link; one-day override with its own link; make-your-own template table.
- [x] Language toggle (हिंदी ⇄ English) in the header, remembered per phone.
- [x] Mobile layout tested at ~375px width in the in-app browser.

Not done / open:
- [ ] **Hosting.** Needs a public URL to share. Recommended: GitHub Pages (free, one-time setup) — see "Deploying" below. Netlify Drop is the zero-git alternative.
- [ ] Confirm Diya's preferred language. Hindi is assumed. If she reads Kannada/Tamil/etc. better, add a third language key (e.g. `kn`) to every `{en, hi}` object in `js/data.js` and to the `UI` strings in `js/app.js`.
- [ ] Sanity-check Hindi phrasing with Gautam/Diya on a real phone (translations were written by the agent, not a native reviewer).
- [ ] Optional: "add to home screen" icon (a `manifest.json` + 192/512px PNG) so it feels like an app.
- [ ] Optional: shopping-list view for the week (sum ingredients across the 7 planned dishes).

## How the "same link for both" sync works (no server)

The site is static, so the weekly plan lives in `localStorage` on each phone.
To sync, the Plan screen generates links that carry the data in the URL:

| Link | Effect when opened |
|---|---|
| `…/?p=id,id,id,id,id,id,id` | Saves those 7 recipe ids as the weekly plan (Mon→Sun) |
| `…/?d=2026-09-20&dish=biryani` | Saves a one-day override for that date |

The app stores the values, shows a toast, then strips the query from the URL.
Gautam taps **Share** → the phone's share sheet opens (or the text is copied) → he sends it to Diya on WhatsApp → she taps it once and her phone is updated.

Limitation: if Diya clears browser data she loses the plan and falls back to `defaultPlan` in `js/data.js`. So keep `defaultPlan` reasonably current too.

## File map

```
dinner-menu/
├── index.html          shell: header, <main id="app">, bottom tabs, script tags
├── css/style.css       all styles, mobile-first, CSS variables at the top
├── js/data.js          THE CONTENT. window.MENU = { defaultPlan, days, recipes[14], template[7] }
├── js/app.js           hash router, views, planner, share links, text-to-speech, localStorage
├── source/…Menu.pdf    the trainer's original document (source of truth)
├── .claude/launch.json local dev server config (python http.server on :8765)
├── progress.md         this file
└── README.md           short user-facing readme
```

### Data shape (`js/data.js`)
```js
{
  id: "chicken-curry",            // used in URLs and the plan
  emoji: "🍲",
  name: { en, hi },
  kcal: 500, macros: { c, f, p }, // grams
  tags: ["LC" | "V" | "M"],       // low carb / vegetarian / modifiable protein
  ingredients: [ { icon, qty:{en,hi}, name:{en,hi}, optional? } | { group:{en,hi} } ],
  steps: [ { en, hi } ],
  mods: [ "English strings — trainer's swaps, shown to Gautam only" ]
}
```
Recipe ids: tomato-chicken, garlic-chicken-potatoes, yogurt-potato-salad, tikka-masala, pad-thai,
tomato-chicken-pasta, chicken-dosa, chicken-curry, basil-chicken, sriracha-chicken, steamed-fish,
biryani, rajma-chawal, channe-roti.

### Routes (`js/app.js`)
`#/` today · `#/day/N` (0=Mon) · `#/recipe/ID` · `#/all` · `#/plan`

## Running locally

```bash
cd ~/Documents/dinner-menu && python3 -m http.server 8766
```
Open http://localhost:8766 . Opening `index.html` directly from Finder also works, except share links (they need a real URL).

Gotcha (Claude desktop app, 2026-09-16): a server launched through `.claude/launch.json` by the app
returned 404 for every file — the app-spawned Python has no macOS permission to read `~/Documents`.
Starting the same command from a Bash tool call / terminal works. `launch.json` therefore has a
`dinner-menu-attach` entry that just attaches to an already-running server on :8766.

Tested in the in-app browser at 375px: today / recipe / all / plan views, language toggle,
`?p=` weekly-plan link, `?d=&dish=` one-day link (toast + week strip update). Read-aloud not
testable in the in-app browser — check on a real phone.

## Deploying (todo)

Option A — GitHub Pages (recommended, keeps history):
1. `git init && git add -A && git commit -m "Dinner menu v1"`
2. Create a repo (private is fine; Pages can still be public) and push.
3. Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
4. URL will be `https://<user>.github.io/<repo>/`. Send that to Diya; suggest "Add to Home Screen".

Option B — Netlify Drop: drag the folder onto https://app.netlify.com/drop . Instant URL, but re-drag on every change.

## Decisions log
- 2026-09-16 · Static site over an app/backend: zero cost, one link, editable by any agent. Sync via URL parameters instead of a database.
- 2026-09-16 · Hindi primary / English secondary on the same screen instead of a hard language switch, so Gautam and Diya can read the same page together. A toggle swaps which is big.
- 2026-09-16 · Quantities kept exactly as the PDF (grams, ml, tsp/tbsp). Where the PDF was ambiguous, small practical notes were added (e.g. soak/boil dry chickpeas; "cloves" in biryani method taken as laung).
- 2026-09-16 · Default weekly rotation chosen by the agent for variety (Mon curry, Tue basil chicken, Wed rajma, Thu tikka masala, Fri sriracha, Sat biryani, Sun fish). Gautam should change it from the Plan screen.

## Next session checklist
1. Ask Gautam which hosting he wants; deploy; put the URL at the top of this file.
2. Open it on a real phone, test 🔊 read-aloud in Hindi (iOS voice "Lekha", Android "Google हिन्दी").
3. Review Hindi wording with Diya; fix in `js/data.js`.
