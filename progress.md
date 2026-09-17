# Dinner Menu — project progress

**Live site: https://diya-gamma.vercel.app/**  ·  Repo: https://github.com/gautamnarayan28/Diya
Deploys automatically from `main` via Vercel (no build step). Share the live URL with Diya.

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

**v1 built and deployed to https://diya-gamma.vercel.app/ . Not yet shared with Diya.**

Done:
- [x] Extracted all 14 recipes + the "make your own" template from the PDF into `js/data.js` (Hindi + English).
- [x] Today view: tonight's dish, big card, kcal/macros, "see recipe" button, week strip (Mon–Sun).
- [x] Recipe view: ingredients (icon · quantity · name), tap-to-tick steps, read-aloud, trainer's protein swaps (collapsed, English, for Gautam).
- [x] All-recipes grid.
- [x] Plan view (for Gautam): pick a dish per weekday, save, share as a link; one-day override with its own link; make-your-own template table.
- [x] Language toggle (हिंदी ⇄ English) in the header, remembered per phone.
- [x] Mobile layout tested at ~375px width in the in-app browser.
- [x] Pre-recorded Hindi audio (Sarvam Priya) for every name/ingredient/step; per-step ▶ and whole-recipe playback tested locally.

Not done / open:
- [x] **Hosting.** Vercel, imported from the GitHub repo; every push to `main` redeploys.
- [ ] Send the link to Diya and have her "Add to Home Screen".
- [ ] Confirm Diya's preferred language. Hindi is assumed. If she reads Kannada/Tamil/etc. better, add a third language key (e.g. `kn`) to every `{en, hi}` object in `js/data.js` and to the `UI` strings in `js/app.js`.
- [ ] Sanity-check Hindi phrasing with Gautam/Diya on a real phone (translations were written by the agent, not a native reviewer).
- [ ] Optional: "add to home screen" icon (a `manifest.json` + 192/512px PNG) so it feels like an app.
- [ ] Optional: shopping-list view for the week (sum ingredients across the 7 planned dishes).

## Voice: pre-recorded Hindi audio (Sarvam AI Bulbul)

Decision 2026-09-16: instead of the phone's built-in voice, generate one MP3 per clip once and ship
the files with the site. Provider: **Sarvam AI** (`bulbul:v3`, female speaker `priya`, pace 0.9;
`bulbul:v2` is deprecated and the API rejects it). 280 clips, ~11k characters, 19 MB, generated
2026-09-16 and committed. To try another voice: `python3 scripts/gen-audio.py --speaker ritu --force`
(other v3 female voices: neha, pooja, simran, kavya), then commit + push.

- `scripts/gen-audio.py` — reads `js/data.js` (via macOS `osascript` JavaScriptCore, no Node needed),
  calls `POST https://api.sarvam.ai/text-to-speech`, writes `audio/<recipe-id>/{name,ing-N,step-N}.mp3`
  and `audio/manifest.js` (`window.AUDIO`, recipe id → clip key → text hash). Re-running only
  regenerates clips whose Hindi text changed. `--dry-run`, `--force`, `--recipe ID`, `--speaker`, `--model`.
- API key: `SARVAM_API_KEY` env var or a `.sarvam_key` file in the project root (**git-ignored**; never commit it).
- App (`js/app.js`): if `window.AUDIO` has clips for the recipe and the UI is in Hindi, the 🔊 button plays
  name → ingredients → steps in sequence and highlights the current step; each step also gets its own ▶.
  Otherwise it falls back to browser `speechSynthesis`. English audio is not generated (Gautam reads).
- Workflow after editing Hindi text: `python3 scripts/gen-audio.py && git add -A && git commit && git push`.

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
├── js/app.js           hash router, views, planner, share links, audio playback + TTS fallback, localStorage
├── audio/manifest.js   generated: which clips exist (window.AUDIO)
├── audio/<id>/*.mp3    generated Hindi clips (Sarvam) — commit them, they are part of the site
├── scripts/gen-audio.py  regenerates audio/ from js/data.js (needs Sarvam key)
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

Gotcha (Claude desktop app, 2026-09-16/17): a server launched through `.claude/launch.json` by the app
cannot read `~/Documents` (macOS permission: 404 for every file, or `PermissionError: Operation not
permitted` on startup). Starting the same command from a Bash tool call / terminal works. So the default
`dinner-menu` launch config only **attaches** to http://localhost:8766 — start the server first with the
command above (or via a Bash tool call: `nohup python3 -m http.server 8766 --bind 127.0.0.1 &` from the
project folder). `dinner-menu-spawn` is the direct-spawn variant for machines without this restriction.

Tested in the in-app browser at 375px: today / recipe / all / plan views, language toggle,
`?p=` weekly-plan link, `?d=&dish=` one-day link (toast + week strip update). Read-aloud not
testable in the in-app browser — check on a real phone.

## Deploying

Done on 2026-09-16. Vercel project imported from GitHub `gautamnarayan28/Diya` (note: repo is named
`Diya`, local folder is `dinner-menu`). Framework preset "Other", no build command, root output.

To ship a change:
```bash
git add -A && git commit -m "describe change" && git push
```
Vercel redeploys `main` in ~20 s. Live URL: https://diya-gamma.vercel.app/

Machine notes: no `gh`, `node`, `brew` or `vercel` CLI installed. Git pushes over SSH as GitHub user
`gautamnarayan28` (key in `~/.ssh/id_ed25519`). Vercel is managed from the web dashboard.

## Themes (colour schemes)

All colours are CSS variables in `css/style.css`; the base `:root` is the "warm" theme and
`[data-theme="…"]` blocks override only variables. Available: `warm`, `slate`, `forest`, `ink`, `midnight`.
`js/app.js` sets `<html data-theme>` from `DEFAULT_THEME` (or `?theme=NAME` in the URL, remembered per phone).
To change the site's look: edit `DEFAULT_THEME` in `js/app.js`. To compare all five side by side:
run the dev server and open http://localhost:8766/dev/themes.html (dev only, harmless if deployed).
2026-09-16: Gautam asked for sharper design + colour options; five themes were built.
2026-09-17: Gautam chose **Ink & Tomato** and asked for classier elements. `ink` is now the `:root` base and
`DEFAULT_THEME`. Design language: white paper, hairline rules, black primary button, tomato red only for
numbers / active states / small-caps labels; serif display type (Fraunces for Latin, Tiro Devanagari Hindi
for Hindi) on dish names and step numbers ("01, 02…"); Inter + Noto Sans Devanagari for body; macros as a
4-cell stat strip; ingredients and steps as hairline lists (no boxed cards); section titles as small caps
with a bilingual right-aligned sub-label. Other themes still work via `?theme=` but only swap colours.

## Decisions log
- 2026-09-16 · Ingredient audio removed (kept name + steps only): not useful to Diya, halved audio size (19 → 11 MB).
- 2026-09-16 · Static site over an app/backend: zero cost, one link, editable by any agent. Sync via URL parameters instead of a database.
- 2026-09-16 · Hindi primary / English secondary on the same screen instead of a hard language switch, so Gautam and Diya can read the same page together. A toggle swaps which is big.
- 2026-09-16 · Quantities kept exactly as the PDF (grams, ml, tsp/tbsp). Where the PDF was ambiguous, small practical notes were added (e.g. soak/boil dry chickpeas; "cloves" in biryani method taken as laung).
- 2026-09-16 · Default weekly rotation chosen by the agent for variety (Mon curry, Tue basil chicken, Wed rajma, Thu tikka masala, Fri sriracha, Sat biryani, Sun fish). Gautam should change it from the Plan screen.

## Next session checklist
1. Open https://diya-gamma.vercel.app/ on a real phone, tap 🔊 and a step ▶ — confirm the Sarvam voice plays (not the robotic phone voice). Gautam to decide whether to keep "Priya" or switch voice.
2. Gautam sets the real weekly plan on the Plan screen and shares the link to Diya.
3. Review Hindi wording with Diya; fix in `js/data.js`, commit, push.
