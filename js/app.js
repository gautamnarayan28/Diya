/* ============================================================
   Dinner menu app — single page, hash-routed, no build step.

   Routes
     #/              today's dinner + week strip
     #/day/N         dinner for weekday N (0 = Monday … 6 = Sunday)
     #/recipe/ID     full recipe (ingredients + steps + read-aloud)
     #/all           every recipe
     #/plan          Gautam's planner: weekly rotation, one-off override, share links

   Shared state without a backend
     The site is static. The weekly plan lives in localStorage on each phone.
     To sync, the planner generates a link that carries the plan in the URL:
       ?p=id,id,id,id,id,id,id      → saves as the weekly plan (Mon…Sun)
       ?d=YYYY-MM-DD&dish=id        → saves a one-day override
     When Diya opens such a link, the app stores it and cleans the URL.
   ============================================================ */

(function () {
  "use strict";

  const M = window.MENU;
  const byId = Object.fromEntries(M.recipes.map(r => [r.id, r]));
  const $app = document.getElementById("app");
  const THEMES = ["warm", "slate", "forest", "ink", "midnight"];   // see css/style.css
  const DEFAULT_THEME = "ink";   // chosen by Gautam 2026-09-17
  const LS = {
    theme: "dm.theme",
    lang: "dm.lang",
    plan: "dm.plan",
    overrides: "dm.overrides",
    done: "dm.done"
  };

  /* ---------------- storage helpers ---------------- */
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }

  let lang = load(LS.lang, "hi");           // primary language shown big
  let plan = sanitizePlan(load(LS.plan, null));
  let overrides = load(LS.overrides, {});   // { "2026-09-16": "biryani" }
  let done = load(LS.done, {});             // { "2026-09-16|biryani": [0,2] }

  function sanitizePlan(p) {
    if (!Array.isArray(p) || p.length !== 7 || !p.every(id => byId[id])) return M.defaultPlan.slice();
    return p;
  }

  /* ---------------- language helpers ---------------- */
  const other = () => (lang === "hi" ? "en" : "hi");
  const T = obj => (obj ? obj[lang] : "");
  const S = obj => (obj ? obj[other()] : "");
  const UI = {
    todayDinner: { hi: "आज का डिनर", en: "Tonight's dinner" },
    dinnerOf: { hi: "का डिनर", en: "dinner" },
    seeRecipe: { hi: "रेसिपी देखें", en: "See recipe" },
    thisWeek: { hi: "इस हफ़्ते", en: "This week" },
    ingredients: { hi: "सामग्री", en: "Ingredients" },
    method: { hi: "विधि", en: "Method" },
    tapDone: { hi: "हर स्टेप पूरा होने पर उस पर टैप करें ✓", en: "Tap a step when it is done ✓" },
    listen: { hi: "🔊 रेसिपी सुनें", en: "🔊 Read aloud" },
    stop: { hi: "⏹ रोकें", en: "⏹ Stop" },
    back: { hi: "‹ वापस", en: "‹ Back" },
    all: { hi: "सभी रेसिपी", en: "All recipes" },
    forGautam: { hi: "For Gautam: protein swaps (English)", en: "Protein swaps (from the trainer)" },
    plan: { hi: "हफ़्ते का प्लान", en: "Weekly plan" },
    planHelp: { hi: "हर दिन के लिए डिश चुनें, फिर सेव करें और लिंक दिया को भेजें।", en: "Pick a dish for each day, save, then send the link to Diya." },
    savePlan: { hi: "✅ प्लान सेव करें", en: "✅ Save plan" },
    sharePlan: { hi: "📤 प्लान का लिंक भेजें", en: "📤 Share plan link" },
    resetPlan: { hi: "↺ डिफ़ॉल्ट प्लान", en: "↺ Reset to default" },
    override: { hi: "एक दिन के लिए बदलें", en: "Change one day" },
    overrideHelp: { hi: "किसी एक तारीख़ के लिए अलग डिश तय करें और लिंक भेजें।", en: "Set a different dish for one date and send the link." },
    saveOverride: { hi: "✅ इस दिन के लिए सेव करें", en: "✅ Save for this day" },
    shareOverride: { hi: "📤 इस दिन का लिंक भेजें", en: "📤 Share this day" },
    clearOverrides: { hi: "🗑 सभी बदलाव हटाएँ", en: "🗑 Clear all one-day changes" },
    saved: { hi: "सेव हो गया ✓", en: "Saved ✓" },
    copied: { hi: "लिंक कॉपी हो गया ✓", en: "Link copied ✓" },
    planReceived: { hi: "नया हफ़्ते का प्लान मिल गया ✓", en: "New weekly plan received ✓" },
    overrideReceived: { hi: "एक दिन का बदलाव मिल गया ✓", en: "One-day change received ✓" },
    changed: { hi: "आज बदला गया", en: "Changed for today" },
    template: { hi: "Make-your-own template (English)", en: "Make-your-own meal template" },
    kcal: { hi: "कैलोरी", en: "kcal" },
    fileWarn: { hi: "यह पेज अभी फ़ाइल से खुला है। लिंक भेजने के लिए साइट को ऑनलाइन होस्ट करें (देखें progress.md)।", en: "This page is opened from a file. Host the site online before sharing links (see progress.md)." }
  };
  const u = key => UI[key][lang];

  /* ---------------- date helpers ---------------- */
  function todayKey(d = new Date()) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), da = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
  }
  const weekdayIndex = (d = new Date()) => (d.getDay() + 6) % 7; // Mon = 0
  function dateForWeekday(idx) {
    const d = new Date(); d.setDate(d.getDate() + (idx - weekdayIndex()));
    return d;
  }
  function dishFor(date) {
    const key = todayKey(date);
    if (overrides[key] && byId[overrides[key]]) return { recipe: byId[overrides[key]], overridden: true };
    return { recipe: byId[plan[weekdayIndex(date)]] || M.recipes[0], overridden: false };
  }
  function fmtDate(d) {
    try {
      return d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long" });
    } catch (e) { return todayKey(d); }
  }

  /* ---------------- incoming links (sync) ---------------- */
  function absorbQuery() {
    const q = new URLSearchParams(location.search);
    let msg = null;
    if (q.has("p")) {
      const ids = q.get("p").split(",");
      if (ids.length === 7 && ids.every(id => byId[id])) { plan = ids; save(LS.plan, plan); msg = u("planReceived"); }
    }
    if (q.has("d") && q.has("dish") && byId[q.get("dish")] && /^\d{4}-\d{2}-\d{2}$/.test(q.get("d"))) {
      overrides[q.get("d")] = q.get("dish"); save(LS.overrides, overrides); msg = u("overrideReceived");
    }
    if (q.has("theme") && THEMES.includes(q.get("theme"))) save(LS.theme, q.get("theme"));
    if (q.has("p") || q.has("d") || q.has("theme")) {
      history.replaceState(null, "", location.pathname + location.hash);
      if (msg) setTimeout(() => toast(msg), 300);
    }
  }

  function applyTheme() {
    const t = load(LS.theme, DEFAULT_THEME);
    document.documentElement.dataset.theme = THEMES.includes(t) ? t : DEFAULT_THEME;
    // keep the browser chrome (Android address bar / iOS status area) matching the header
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) requestAnimationFrame(() => { meta.content = getComputedStyle(document.querySelector(".top")).backgroundColor; });
  }

  /* ---------------- rendering helpers ---------------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function macroPills(r) {
    const tags = [
      r.tags.includes("LC") ? `<span class="tag tag-lc">${lang === "hi" ? "लो कार्ब" : "Low carb"}</span>` : "",
      r.tags.includes("V") ? `<span class="tag tag-v">${lang === "hi" ? "शाकाहारी" : "Vegetarian"}</span>` : ""
    ].join("");
    return `<div class="macros">
      <span><b>${r.kcal}</b>${u("kcal")}</span>
      <span><b>${r.macros.p}g</b>${lang === "hi" ? "प्रोटीन" : "Protein"}</span>
      <span><b>${r.macros.c}g</b>${lang === "hi" ? "कार्ब" : "Carbs"}</span>
      <span><b>${r.macros.f}g</b>${lang === "hi" ? "फ़ैट" : "Fat"}</span>
    </div>${tags ? `<div class="tags">${tags}</div>` : ""}`;
  }
  const h2 = key => `<h2>${UI[key][lang]}<span class="sub">${UI[key][other()]}</span></h2>`;

  function weekStrip() {
    const ti = weekdayIndex();
    return `<div class="week-title">${h2("thisWeek")}<a href="#/plan">${lang === "hi" ? "बदलें" : "Edit"}</a></div>
    <div class="week">${M.days.map((d, i) => {
      const { recipe, overridden } = dishFor(dateForWeekday(i));
      return `<a class="day ${i === ti ? "today" : ""}" href="#/day/${i}" title="${esc(T(recipe.name))}">
        <div class="d">${T(d.short)}</div>
        <div class="e">${recipe.emoji}${overridden ? "·" : ""}</div>
      </a>`;
    }).join("")}</div>`;
  }

  /* ---------------- views ---------------- */
  function viewDay(idx) {
    const isToday = idx === weekdayIndex();
    const date = dateForWeekday(idx);
    const { recipe: r, overridden } = dishFor(date);
    const dayName = T(M.days[idx]);
    const heading = isToday ? u("todayDinner") : (lang === "hi" ? `${dayName} ${u("dinnerOf")}` : `${dayName} ${u("dinnerOf")}`);
    return `
      <p class="eyebrow">${esc(dayName)}, ${esc(fmtDate(date))}${overridden ? ` · <strong>${u("changed")}</strong>` : ""}</p>
      <h1>${esc(heading)}</h1>
      <div class="card hero">
        <div class="emoji">${r.emoji}</div>
        <p class="name-hi">${esc(T(r.name))}</p>
        <p class="name-en">${esc(S(r.name))}</p>
        ${macroPills(r)}
        <a class="btn" href="#/recipe/${r.id}">📖 ${u("seeRecipe")}</a>
      </div>
      ${weekStrip()}`;
  }

  function viewRecipe(id) {
    const r = byId[id];
    if (!r) return `<p class="empty">Recipe not found.</p>`;
    const doneKey = `${todayKey()}|${r.id}`;
    const doneSet = new Set(done[doneKey] || []);
    let stepIndex = 0;
    return `
      <a class="back" href="#/">${u("back")}</a>
      <div class="rhead">
        <div class="emoji">${r.emoji}</div>
        <div><h1>${esc(T(r.name))}</h1><span class="sub">${esc(S(r.name))}</span></div>
      </div>
      <div class="meta">${macroPills(r)}</div>
      <button class="speak" id="speakBtn" type="button">${u("listen")}</button>

      ${h2("ingredients")}
      <div>
        <ul class="ing">${r.ingredients.map(i => i.group
          ? `<li class="group">${esc(T(i.group))} <span class="sub">· ${esc(S(i.group))}</span></li>`
          : `<li class="${i.optional ? "opt" : ""}">
              <div class="ic">${i.icon || "•"}</div>
              <div><span class="q">${esc(T(i.qty))}</span> <span class="n">${esc(T(i.name))}<span class="sub">${esc(S(i.qty))} ${esc(S(i.name))}</span></span></div>
            </li>`).join("")}
        </ul>
      </div>

      ${h2("method")}
      <p class="hint">${u("tapDone")}</p>
      <div>
        <ol class="steps ${lang === "hi" && hasClip(r.id, "step-0") ? "has-audio" : ""}" id="steps">${r.steps.map(s => {
          const i = stepIndex++;
          const clip = lang === "hi" && hasClip(r.id, `step-${i}`);
          return `<li data-i="${i}" data-key="step-${i}" class="${doneSet.has(i) ? "done" : ""}">
            <div class="num"></div>
            <div class="txt">${esc(T(s))}<span class="sub">${esc(S(s))}</span></div>
            ${clip ? `<button class="play-step" type="button" data-play="step-${i}" aria-label="${lang === "hi" ? "यह स्टेप सुनें" : "Play this step"}">▶</button>` : ""}
          </li>`;
        }).join("")}</ol>
      </div>

      ${r.mods.length ? `<details><summary>ℹ️ ${u("forGautam")}</summary><ul>${r.mods.map(m => `<li>${esc(m)}</li>`).join("")}</ul></details>` : ""}
      <p class="hint" style="margin-top:18px">Source: Aditya's Lunch &amp; Dinner Menu, Team GFC · 500 kcal</p>`;
  }

  function viewAll() {
    return `<h1>${u("all")}</h1>
      <div class="grid">${M.recipes.map(r => `
        <a class="tile" href="#/recipe/${r.id}">
          <div class="e">${r.emoji}</div>
          <div class="t">${esc(T(r.name))}</div>
          <div class="s">${esc(S(r.name))}</div>
          <div class="s macro">P ${r.macros.p}g · ${r.tags.includes("LC") ? "LC" : `C ${r.macros.c}g`}${r.tags.includes("V") ? " · VEG" : ""}</div>
        </a>`).join("")}
      </div>`;
  }

  function options(selected) {
    return M.recipes.map(r => `<option value="${r.id}" ${r.id === selected ? "selected" : ""}>${r.emoji} ${esc(T(r.name))}</option>`).join("");
  }

  function viewPlan() {
    const tk = todayKey();
    const currentOverride = overrides[tk] || dishFor(new Date()).recipe.id;
    const overrideList = Object.keys(overrides).sort();
    return `<h1>${u("plan")}</h1>
      <p class="hint">${u("planHelp")}</p>
      <div class="card">
        ${M.days.map((d, i) => `
          <div class="plan-row">
            <label for="plan-${i}">${esc(d.hi)}<span class="sub">${esc(d.en)}</span></label>
            <select id="plan-${i}" data-i="${i}">${options(plan[i])}</select>
          </div>`).join("")}
        <button class="btn" id="savePlan" type="button">${u("savePlan")}</button>
        <div class="btn-row">
          <button class="btn secondary small" id="sharePlan" type="button">${u("sharePlan")}</button>
          <button class="btn secondary small" id="resetPlan" type="button">${u("resetPlan")}</button>
        </div>
      </div>

      ${h2("override")}
      <p class="hint">${u("overrideHelp")}</p>
      <div class="card">
        <div class="plan-row">
          <label for="ovDate">${lang === "hi" ? "तारीख़" : "Date"}</label>
          <input type="date" id="ovDate" value="${tk}">
        </div>
        <div class="plan-row">
          <label for="ovDish">${lang === "hi" ? "डिश" : "Dish"}</label>
          <select id="ovDish">${options(currentOverride)}</select>
        </div>
        <button class="btn small" id="saveOverride" type="button">${u("saveOverride")}</button>
        <button class="btn secondary small" id="shareOverride" type="button">${u("shareOverride")}</button>
        ${overrideList.length ? `
          <ul style="margin:14px 0 0;padding-left:18px;font-size:15px;color:var(--muted)">
            ${overrideList.map(k => `<li>${k}: ${byId[overrides[k]] ? byId[overrides[k]].emoji + " " + esc(byId[overrides[k]].name.en) : "?"}</li>`).join("")}
          </ul>
          <button class="btn secondary small" id="clearOverrides" type="button">${u("clearOverrides")}</button>` : ""}
      </div>
      ${location.protocol === "file:" ? `<div class="note">${u("fileWarn")}</div>` : ""}

      <details>
        <summary>📐 ${u("template")}</summary>
        <p class="hint">500 kcal. CF = 1 tsp cooking fat (5 ml ghee/olive oil/butter). Veg = 150 g green/leafy vegetables. Lean meat = chicken, mutton, prawn, fish, pork, beef with visible fat removed.</p>
        <div class="scroll-x"><table class="tpl">
          <thead><tr><th>#</th><th>Option</th><th>C</th><th>F</th><th>P</th></tr></thead>
          <tbody>${M.template.map((t, i) => `<tr><td>${i + 1}</td><td>${esc(t.option)}</td><td>${t.c}</td><td>${t.f}</td><td>${t.p}</td></tr>`).join("")}</tbody>
        </table></div>
      </details>`;
  }

  /* ---------------- share helpers ---------------- */
  function baseUrl() { return location.origin + location.pathname; }
  async function shareLink(url, text) {
    const full = `${text}\n${url}`;
    if (navigator.share) {
      try { await navigator.share({ text: full }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(full); toast(u("copied")); }
    catch (e) { window.open(`https://wa.me/?text=${encodeURIComponent(full)}`, "_blank"); }
  }

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------------- audio: pre-recorded clips (Sarvam) with browser TTS fallback ----------------
     audio/manifest.js (generated by scripts/gen-audio.py) sets window.AUDIO = { recipeId: { clipKey: hash } }.
     Clip keys: "name", "step-N"; file = audio/<recipeId>/<clipKey>.mp3 (Hindi only for now).
     If a recipe has no clips (or the UI is in English) we fall back to speechSynthesis. */
  const AUDIO = window.AUDIO || {};
  const player = new Audio();
  player.preload = "auto";
  let queue = [];
  let speaking = false;         // true while either clips or TTS are playing

  const hasClip = (rid, key) => !!(AUDIO[rid] && AUDIO[rid][key]);
  const clipUrl = (rid, key) => `audio/${rid}/${key}.mp3`;
  function recipeHasAudio(r) {
    return lang === "hi" && hasClip(r.id, "name") && r.steps.every((_, i) => hasClip(r.id, `step-${i}`));
  }
  function setPlaying(key) {
    document.querySelectorAll("#steps li.playing").forEach(li => li.classList.remove("playing"));
    if (key) { const li = document.querySelector(`#steps li[data-key="${key}"]`); if (li) { li.classList.add("playing"); li.scrollIntoView({ block: "center", behavior: "smooth" }); } }
  }
  function stopAudio() {
    queue = [];
    player.onended = player.onerror = null;
    player.pause();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    speaking = false;
    setPlaying(null);
    const btn = document.getElementById("speakBtn");
    if (btn) { btn.classList.remove("on"); btn.textContent = u("listen"); }
  }
  function playClips(rid, keys, onDone) {
    queue = keys.slice();
    const next = () => {
      if (!queue.length) { setPlaying(null); if (onDone) onDone(); return; }
      const key = queue.shift();
      setPlaying(key.startsWith("step-") ? key : null);
      player.src = clipUrl(rid, key);
      player.onended = next;
      player.onerror = next;                 // a missing file should not stall the sequence
      player.play().catch(next);
    };
    next();
  }
  function recipeClipKeys(r) {
    return ["name", ...r.steps.map((_, i) => `step-${i}`)];   // ingredients are not voiced
  }

  /* ---------------- text-to-speech fallback ---------------- */
  function recipeSpeechText(r) {
    const L = lang;
    const parts = [r.name[L], "."];
    parts.push(UI.ingredients[L] + ":");
    r.ingredients.forEach(i => { if (!i.group) parts.push(`${i.qty[L]} ${i.name[L]}.`); });
    parts.push(UI.method[L] + ":");
    r.steps.forEach((s, i) => parts.push(`${L === "hi" ? "स्टेप" : "Step"} ${i + 1}. ${s[L]}`));
    return parts.join(" ");
  }
  function toggleSpeech(r, btn) {
    if (speaking) { stopAudio(); return; }
    if (recipeHasAudio(r)) {
      speaking = true; btn.classList.add("on"); btn.textContent = u("stop");
      playClips(r.id, recipeClipKeys(r), stopAudio);
      return;
    }
    if (!("speechSynthesis" in window)) { toast(lang === "hi" ? "इस फ़ोन पर आवाज़ उपलब्ध नहीं" : "Speech not available on this device"); return; }
    const utt = new SpeechSynthesisUtterance(recipeSpeechText(r));
    const want = lang === "hi" ? "hi" : "en";
    const voices = speechSynthesis.getVoices();
    const v = voices.find(x => x.lang && x.lang.toLowerCase().startsWith(want + "-in")) || voices.find(x => x.lang && x.lang.toLowerCase().startsWith(want));
    if (v) utt.voice = v;
    utt.lang = lang === "hi" ? "hi-IN" : "en-IN";
    utt.rate = 0.9;
    utt.onend = utt.onerror = () => { speaking = false; btn.classList.remove("on"); btn.textContent = u("listen"); };
    speaking = true; btn.classList.add("on"); btn.textContent = u("stop");
    speechSynthesis.cancel(); speechSynthesis.speak(utt);
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices(); // warm up voice list

  /* ---------------- router ---------------- */
  function route() {
    stopAudio();
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\/?/, "").split("/");
    let html, tab = "today";

    if (parts[0] === "recipe" && parts[1]) { html = viewRecipe(parts[1]); tab = ""; }
    else if (parts[0] === "day" && parts[1] !== undefined) { const i = Math.max(0, Math.min(6, parseInt(parts[1], 10) || 0)); html = viewDay(i); }
    else if (parts[0] === "all") { html = viewAll(); tab = "all"; }
    else if (parts[0] === "plan") { html = viewPlan(); tab = "plan"; }
    else html = viewDay(weekdayIndex());

    $app.innerHTML = html;
    document.querySelectorAll(".tabs a").forEach(a => a.classList.toggle("active", a.dataset.tab === tab));
    window.scrollTo(0, 0);
    bind(parts);
  }

  function bind(parts) {
    if (parts[0] === "recipe") {
      const r = byId[parts[1]]; if (!r) return;
      const doneKey = `${todayKey()}|${r.id}`;
      document.getElementById("steps").addEventListener("click", e => {
        const play = e.target.closest("[data-play]");
        if (play) {                      // ▶ on one step: play just that clip
          const key = play.dataset.play;
          const wasThis = speaking && player.src.endsWith(clipUrl(r.id, key)) && queue.length === 0;
          stopAudio();
          if (!wasThis) { speaking = true; playClips(r.id, [key], () => { speaking = false; setPlaying(null); }); }
          return;
        }
        const li = e.target.closest("li"); if (!li) return;
        li.classList.toggle("done");
        const arr = [...document.querySelectorAll("#steps li.done")].map(x => +x.dataset.i);
        // keep only today's entries so storage does not grow forever
        done = { [doneKey]: arr }; save(LS.done, done);
      });
      const btn = document.getElementById("speakBtn");
      btn.addEventListener("click", () => toggleSpeech(r, btn));
    }

    if (parts[0] === "plan") {
      const readPlan = () => [...document.querySelectorAll("select[data-i]")].map(s => s.value);
      document.getElementById("savePlan").onclick = () => { plan = sanitizePlan(readPlan()); save(LS.plan, plan); toast(u("saved")); };
      document.getElementById("resetPlan").onclick = () => { plan = M.defaultPlan.slice(); save(LS.plan, plan); route(); toast(u("saved")); };
      document.getElementById("sharePlan").onclick = () => {
        plan = sanitizePlan(readPlan()); save(LS.plan, plan);
        const lines = plan.map((id, i) => `${M.days[i].hi} – ${byId[id].emoji} ${byId[id].name.hi}`).join("\n");
        shareLink(`${baseUrl()}?p=${plan.join(",")}`, `🍽️ इस हफ़्ते का डिनर प्लान:\n${lines}\n\nलिंक खोलें 👇`);
      };
      const ovDate = document.getElementById("ovDate"), ovDish = document.getElementById("ovDish");
      document.getElementById("saveOverride").onclick = () => {
        if (!ovDate.value) return;
        overrides[ovDate.value] = ovDish.value; save(LS.overrides, overrides); route(); toast(u("saved"));
      };
      document.getElementById("shareOverride").onclick = () => {
        if (!ovDate.value) return;
        overrides[ovDate.value] = ovDish.value; save(LS.overrides, overrides);
        const r = byId[ovDish.value];
        shareLink(`${baseUrl()}?d=${ovDate.value}&dish=${r.id}`, `🍽️ ${ovDate.value} का डिनर: ${r.emoji} ${r.name.hi}\n\nलिंक खोलें 👇`);
      };
      const clr = document.getElementById("clearOverrides");
      if (clr) clr.onclick = () => { overrides = {}; save(LS.overrides, overrides); route(); toast(u("saved")); };
    }
  }

  /* ---------------- language toggle ---------------- */
  const langBtn = document.getElementById("langBtn");
  function applyLang() {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    langBtn.textContent = lang === "hi" ? "English" : "हिंदी";
    document.querySelectorAll(".tabs .lbl").forEach(el => { el.textContent = el.dataset[lang]; });
  }
  langBtn.addEventListener("click", () => { lang = other(); save(LS.lang, lang); applyLang(); route(); });

  /* ---------------- boot ---------------- */
  absorbQuery();
  applyTheme();
  applyLang();
  window.addEventListener("hashchange", route);
  route();
})();
