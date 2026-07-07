/* ============================================================
   Duet — app logic
   ============================================================ */

const PAGE_SIZE = 12;

/* ---------- demo copy templates, keyed by use-case ---------- */
const TEMPLATES = {
  Editorial: {
    k: "The Long Read", h: "The Quiet Art of Paying Attention",
    d: "In a world engineered for distraction, focus has become the rarest — and most valuable — creative skill.",
    b: "We spoke with twelve writers, designers and researchers about how they protect their mornings, why boredom is a feature rather than a bug, and what it takes to finish long work in a short-attention economy.",
    m: "By Amara Okafor · 14 min read",
  },
  Magazine: {
    k: "Issue № 42 — The Cities Issue", h: "What We Talk About When We Talk About Home",
    d: "Four photographers return to the streets that raised them, cameras in hand and scores to settle.",
    b: "From Lagos to Lisbon, the assignment was the same: shoot the neighbourhood you left, in the light you remember it. The results are tender, argumentative, and occasionally furious — much like going home itself.",
    m: "Photography · 22 pages",
  },
  News: {
    k: "Economy · Analysis", h: "The Numbers Behind the Recovery",
    d: "Unemployment is falling and wages are rising — so why doesn't it feel that way on the ground?",
    b: "A close read of this quarter's data reveals a two-speed economy: booming in the metros, brittle everywhere else. We break down the five figures that matter and what they signal for the year ahead.",
    m: "By the Data Desk · Updated 08:40 GMT",
  },
  Blog: {
    k: "Notes on Work", h: "Everything I Wish I'd Known Before Going Freelance",
    d: "Five years, forty clients, and one spectacular invoice disaster later — here's the honest version.",
    b: "Nobody warns you that the hard part isn't finding work, it's stopping. This is a post about rates, boundaries, the myth of passive income, and the Tuesday afternoon I nearly took a full-time job again.",
    m: "Posted March 14 · 8 min read",
  },
  SaaS: {
    k: "Product", h: "Ship Better Software, Faster",
    d: "One workspace for planning, building and releasing — so your team can stop switching tabs and start shipping.",
    b: "Teams at over four thousand companies use our platform to plan sprints, review code and ship with confidence. Automated workflows handle the busywork; your engineers handle the interesting problems.",
    m: "Free 14-day trial · No credit card required", cta: "Start Building",
  },
  Tech: {
    k: "Engineering Blog", h: "Scaling Search to a Billion Queries a Day",
    d: "How we rebuilt our ranking pipeline without a single minute of downtime.",
    b: "When query volume doubled for the third year running, the shortcuts stopped working. This is the story of the migration: the architecture we chose, the two dead ends we hit, and the graphs that finally went flat.",
    m: "By the Infrastructure Team · 11 min read",
  },
  Dev: {
    k: "Documentation", h: "Get Started in Five Minutes",
    d: "Install the CLI, authenticate, and deploy your first project — everything else is optional.",
    b: "The fastest path to production is three commands long. This guide walks through installation, environment configuration and your first deploy, with copy-paste examples for macOS, Linux and Windows.",
    m: "v4.2 · Last updated this week", cta: "Read the Docs",
  },
  Portfolio: {
    k: "Selected Work 2019 — 2026", h: "Designer & Art Director",
    d: "I help ambitious brands find their voice — then make sure it carries across every surface they touch.",
    b: "Based in Copenhagen, working worldwide. Recent projects include an identity for a Michelin-starred restaurant, a design system for a fintech unicorn, and a typeface commissioned by a national museum.",
    m: "Currently booking for autumn", cta: "View Projects",
  },
  Agency: {
    k: "Case Study", h: "Rebranding a Hundred-Year-Old Institution",
    d: "How do you modernise a museum without erasing what made it beloved? Very, very carefully.",
    b: "Eighteen months, two hundred stakeholder interviews and one nearly-catastrophic logo reveal later, the museum's visitor numbers are up forty percent. Here's the full process, including the parts that went wrong.",
    m: "Branding · Strategy · Digital",
  },
  Luxury: {
    k: "The Maison", h: "Crafted Without Compromise",
    d: "Sixty hours of handwork. Eleven artisans. One timepiece that will outlive everyone in the building.",
    b: "In our Geneva atelier, nothing is hurried. Each movement is assembled, regulated and finished by a single watchmaker, whose initials are engraved inside a case only a service technician will ever open.",
    m: "By appointment only",
  },
  Fashion: {
    k: "Collection № 9", h: "The New Silhouette",
    d: "Structured shoulders, liquid hemlines, and a palette borrowed from a storm over the Atlantic.",
    b: "This season the studio looked away from the archive and toward the weather. The result is a wardrobe of contradictions — rigorous tailoring in fabrics that refuse to behave, shown against raw concrete.",
    m: "Paris · March 2026",
  },
  Food: {
    k: "Kitchen Stories", h: "A Table for Everyone",
    d: "Seasonal cooking, no gatekeeping — recipes that assume nothing except hunger.",
    b: "This month: a ragù that forgives you for rushing it, the case for buying a whole fish, and why the best olive oil in the shop is rarely the most expensive one. Plus three desserts that need no oven.",
    m: "27 recipes · Winter issue",
  },
  Travel: {
    k: "Field Notes", h: "Somewhere North of Ordinary",
    d: "Six days on the Lofoten archipelago, where the mountains fall straight into the sea and nobody checks their phone.",
    b: "The cabins are red, the cod is drying on wooden racks, and the light does something at midnight that no camera fully captures. A practical guide to Norway's most impractical destination.",
    m: "Words & photography · 16 min read",
  },
  Finance: {
    k: "Insights", h: "Money, Made Legible",
    d: "Clear thinking about markets, risk and the long game — delivered without the jargon.",
    b: "Our quarterly letter covers what changed, what didn't, and what we're doing about it. This edition: why boring portfolios keep winning, the real cost of waiting for a correction, and one chart worth printing.",
    m: "Q2 2026 Letter · 9 min read",
  },
  Wedding: {
    k: "Save the Date", h: "Together in October",
    d: "Elena & Marcus invite you to a weekend in the Tuscan hills — vows at sunset, dancing till late.",
    b: "Ceremony at the chapel of San Gimignano, followed by dinner in the olive grove. Dress for warm days and cool evenings. Children, dogs and enthusiastic dancing all warmly welcome.",
    m: "RSVP by the first of August",
  },
  Kids: {
    k: "Storytime", h: "The Bear Who Borrowed the Moon",
    d: "A bedtime story about sharing, sleeping, and one extremely inconvenient celestial object.",
    b: "Barnaby the bear only wanted a nightlight. What he got was the actual moon, three very annoyed owls, and a lesson about putting things back where you found them. Ages four and up, sleepy grown-ups included.",
    m: "Chapter one · Read-aloud time: 9 minutes",
  },
  Event: {
    k: "Summer Series · Live", h: "Three Nights Under the Lights",
    d: "An open-air festival of music, food and film on the old harbour — free entry, all welcome.",
    b: "Friday opens with the city orchestra, Saturday belongs to the DJs, and Sunday winds down with cinema on the water. Bring a blanket, bring your people, and let the ferries provide the light show.",
    m: "June 19–21 · Harbour East", cta: "Get Tickets",
  },
  Music: {
    k: "On Tour", h: "Loud Nights, Small Rooms",
    d: "Fourteen cities, one van, and a record we're still surprised anyone let us make.",
    b: "The new album is out on vinyl and everywhere else. We're playing the clubs we grew up in — the ones with the sticky floors and the sound guy who's seen everything. Come early; the openers are better than us.",
    m: "Tickets on sale Friday", cta: "Tour Dates",
  },
  Sports: {
    k: "Match Day", h: "Ninety Minutes of Everything",
    d: "Derby week is here — form guides, team news and the only prediction that matters: nobody knows.",
    b: "The numbers say one thing, the injury list says another, and thirty thousand people will show up anyway. Our writers pick their line-ups, argue about the manager, and agree on absolutely nothing.",
    m: "Kick-off Saturday 17:30",
  },
  Education: {
    k: "Learning Lab", h: "How Memory Actually Works",
    d: "Forget highlighting — the science of remembering has better tools, and they take less time.",
    b: "Spaced repetition, retrieval practice and the testing effect: three techniques with decades of evidence behind them, explained with experiments you can run on yourself this week. Course notes included.",
    m: "Lesson 3 of 12 · 20 minutes",
  },
  Health: {
    k: "Wellbeing", h: "Rest Is a Skill",
    d: "Sleep is not a luxury or a character flaw — it's training, and most of us are doing it badly.",
    b: "A sleep scientist, a physiotherapist and a very well-rested violinist on what recovery actually looks like. The short version: consistency beats duration, darkness is underrated, and your phone knows what it did.",
    m: "Reviewed by Dr. S. Lindqvist",
  },
  Brand: {
    k: "Manifesto", h: "Make Something Worth Keeping",
    d: "We believe in fewer, better things — designed slowly, built to be repaired, priced honestly.",
    b: "Every object we make starts with the same question: will this still matter in ten years? If the answer is no, it doesn't go into production. This is our promise, and our entire business plan.",
    m: "Est. 2019 · Carbon neutral",
  },
  Architecture: {
    k: "Projects", h: "Concrete, Light and Patience",
    d: "A house on a cliff in Portugal, ten years in the permitting and worth every form.",
    b: "The clients asked for a building that would disappear; the site had other opinions. The finished house sits low against the rock, opens entirely to the Atlantic, and needs no air conditioning at all.",
    m: "Completed 2025 · 340 m²",
  },
  Ecommerce: {
    k: "New Arrivals", h: "Objects for Everyday Rituals",
    d: "Ceramics, linen and hand-forged tools — made by people whose names we actually know.",
    b: "The autumn collection is here: stoneware mugs that hold their heat, aprons that improve with every wash, and a chef's knife you'll argue about in your will. Free shipping over eighty euros.",
    m: "124 products · Ships worldwide", cta: "Shop the Collection",
  },
};

/* ---------- font helpers ---------- */
const loadedFontKeys = new Set();

function availableWeights(family, wanted) {
  if (SINGLE_400.has(family)) return [400];
  if (LIMITED_WEIGHTS[family]) {
    const avail = LIMITED_WEIGHTS[family];
    const w = wanted.filter((x) => avail.includes(x));
    return w.length ? w : [avail[avail.length - 1]];
  }
  return wanted;
}

function renderWeight(family, desired) {
  if (SINGLE_400.has(family)) return 400;
  if (LIMITED_WEIGHTS[family]) {
    const avail = LIMITED_WEIGHTS[family];
    return avail.includes(desired) ? desired : avail[avail.length - 1];
  }
  return desired;
}

function gfCssUrl(family, weights) {
  const fam = family.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${fam}:wght@${weights.join(";")}&display=swap`;
}

function specimenUrl(family) {
  return `https://fonts.google.com/specimen/${family.replace(/ /g, "+")}`;
}

function fallbackFor(family) {
  if (MONO_FAMILIES.has(family)) return "monospace";
  if (SCRIPT_FAMILIES.has(family)) return "cursive";
  if (SERIF_FAMILIES.has(family)) return "serif";
  return "sans-serif";
}

function ensureFontsLoaded(pairs) {
  const frag = document.createDocumentFragment();
  for (const p of pairs) {
    const specs = [
      [p.h, availableWeights(p.h, [...new Set([400, 700, p.hw])].sort((a, b) => a - b))],
      [p.b, availableWeights(p.b, [400, 700])],
    ];
    for (const [family, weights] of specs) {
      const key = `${family}:${weights.join(",")}`;
      if (loadedFontKeys.has(key)) continue;
      loadedFontKeys.add(key);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = gfCssUrl(family, weights);
      frag.appendChild(link);
    }
  }
  document.head.appendChild(frag);
}

/* ---------- copy-paste CSS builder ---------- */
function buildCss(p) {
  const hW = availableWeights(p.h, [...new Set([400, p.hw])].sort((a, b) => a - b));
  const bW = availableWeights(p.b, [400, 700]);
  const url =
    "https://fonts.googleapis.com/css2?family=" +
    p.h.replace(/ /g, "+") + ":wght@" + hW.join(";") +
    "&family=" + p.b.replace(/ /g, "+") + ":wght@" + bW.join(";") +
    "&display=swap";
  return `/* ${p.h} + ${p.b} — via Google Fonts */
@import url('${url}');

h1, h2, h3 {
  font-family: '${p.h}', ${fallbackFor(p.h)};
  font-weight: ${renderWeight(p.h, p.hw)};
}

body {
  font-family: '${p.b}', ${fallbackFor(p.b)};
  font-weight: 400;
  line-height: 1.6;
}`;
}

/* ---------- state ---------- */
let state = { page: 1, cat: "all", q: "" };

function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const page = parseInt(params.get("p"), 10);
  const cat = params.get("c");
  const q = params.get("q");
  if (page > 0) state.page = page;
  if (cat && CATEGORIES[cat]) state.cat = cat;
  if (q) state.q = q;
}

function writeHash() {
  const params = new URLSearchParams();
  if (state.page > 1) params.set("p", state.page);
  if (state.cat !== "all") params.set("c", state.cat);
  if (state.q) params.set("q", state.q);
  const str = params.toString();
  history.replaceState(null, "", str ? "#" + str : location.pathname);
}

/* ---------- filtering ---------- */
function filtered() {
  const q = state.q.trim().toLowerCase();
  return PAIRINGS.filter((p) => {
    if (state.cat !== "all" && p.c !== state.cat) return false;
    if (!q) return true;
    return (
      p.h.toLowerCase().includes(q) ||
      p.b.toLowerCase().includes(q) ||
      p.use.toLowerCase().includes(q) ||
      p.note.toLowerCase().includes(q) ||
      CATEGORIES[p.c].toLowerCase().includes(q)
    );
  });
}

/* ---------- rendering ---------- */
const grid = document.getElementById("grid");
const paginationEl = document.getElementById("pagination");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function cardHtml(p, idx) {
  const t = TEMPLATES[p.use] || TEMPLATES.Brand;
  const hw = renderWeight(p.h, p.hw);
  const boost = SIZE_BOOST[p.h] || 1;
  const isScript = SCRIPT_FAMILIES.has(p.h);
  const hSize = (2.25 * boost).toFixed(2);
  const hFont = `'${p.h.replace(/'/g, "\\'")}', ${fallbackFor(p.h)}`;
  const bFont = `'${p.b.replace(/'/g, "\\'")}', ${fallbackFor(p.b)}`;
  const num = String(PAIRINGS.indexOf(p) + 1).padStart(3, "0");
  const cta = t.cta
    ? `<span class="demo-cta" style="font-family:${bFont}">${t.cta}</span>`
    : "";
  return `
  <article class="card" data-idx="${idx}">
    <header class="card-head">
      <div class="card-title-row">
        <span class="card-num">№ ${num}</span>
        <h2 class="card-names">${p.h} <span class="card-x">×</span> ${p.b}</h2>
        <span class="card-chip">${CATEGORIES[p.c]}</span>
      </div>
      <p class="card-note">${p.note}</p>
    </header>

    <div class="demo">
      <p class="demo-kicker" style="font-family:${bFont}">${t.k}</p>
      <h3 class="demo-headline${isScript ? " is-script" : ""}"
          style="font-family:${hFont};font-weight:${hw};font-size:${hSize}rem">${t.h}</h3>
      <p class="demo-deck" style="font-family:${bFont}">${t.d}</p>
      <p class="demo-body" style="font-family:${bFont}">${t.b}</p>
      <div class="demo-meta-row">
        <span class="demo-meta" style="font-family:${bFont}">${t.m}</span>
        ${cta}
      </div>
    </div>

    <footer class="card-foot">
      <div class="card-specs">
        <span class="spec"><span class="spec-label">Display</span> ${p.h} · ${hw}</span>
        <span class="spec"><span class="spec-label">Text</span> ${p.b} · 400</span>
      </div>
      <div class="card-actions">
        <a class="action-link" href="${specimenUrl(p.h)}" target="_blank" rel="noopener" title="Open ${p.h} on Google Fonts">${p.h}&nbsp;↗</a>
        <a class="action-link" href="${specimenUrl(p.b)}" target="_blank" rel="noopener" title="Open ${p.b} on Google Fonts">${p.b}&nbsp;↗</a>
        <button class="action-copy" data-copy="${idx}">Copy CSS</button>
      </div>
    </footer>
  </article>`;
}

function paginationHtml(totalPages) {
  if (totalPages <= 1) return "";
  const cur = state.page;
  const pages = [];
  const push = (n) => { if (!pages.includes(n)) pages.push(n); };
  push(1);
  for (let n = cur - 1; n <= cur + 2; n++) if (n > 1 && n < totalPages) push(n);
  if (totalPages > 1) push(totalPages);
  pages.sort((a, b) => a - b);

  let html = `<button class="page-btn page-arrow" data-page="${cur - 1}" ${cur === 1 ? "disabled" : ""} aria-label="Previous page">←</button>`;
  let prev = 0;
  for (const n of pages) {
    if (n - prev > 1) html += `<span class="page-ellipsis">…</span>`;
    html += `<button class="page-btn${n === cur ? " is-active" : ""}" data-page="${n}">${n}</button>`;
    prev = n;
  }
  html += `<button class="page-btn page-arrow" data-page="${cur + 1}" ${cur === totalPages ? "disabled" : ""} aria-label="Next page">→</button>`;
  return html;
}

function renderChips() {
  const counts = {};
  for (const p of PAIRINGS) counts[p.c] = (counts[p.c] || 0) + 1;
  const el = document.getElementById("chips");
  el.innerHTML = Object.entries(CATEGORIES)
    .map(([key, label]) => {
      const n = key === "all" ? PAIRINGS.length : counts[key] || 0;
      return `<button class="chip${state.cat === key ? " is-active" : ""}" data-cat="${key}">${label}<span class="chip-count">${n}</span></button>`;
    })
    .join("");
}

function render() {
  const items = filtered();
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  ensureFontsLoaded(pageItems);

  grid.innerHTML = pageItems
    .map((p) => cardHtml(p, PAIRINGS.indexOf(p)))
    .join("");
  emptyState.hidden = pageItems.length > 0;
  paginationEl.innerHTML = paginationHtml(totalPages);

  resultCount.textContent = items.length
    ? `${items.length} pairing${items.length === 1 ? "" : "s"} · page ${state.page} of ${totalPages}`
    : "";
  renderChips();
  writeHash();
}

/* ---------- header stats ---------- */
function renderStats() {
  const families = new Set();
  PAIRINGS.forEach((p) => { families.add(p.h); families.add(p.b); });
  document.getElementById("heroStats").innerHTML = `
    <div class="stat"><span class="stat-num">${PAIRINGS.length}</span><span class="stat-label">curated pairings</span></div>
    <div class="stat"><span class="stat-num">${families.size}</span><span class="stat-label">typefaces</span></div>
    <div class="stat"><span class="stat-num">100%</span><span class="stat-label">free &amp; open source</span></div>`;
  document.getElementById("topbarCount").textContent = `${PAIRINGS.length} pairings`;
}

/* ---------- events ---------- */
document.getElementById("chips").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cat]");
  if (!btn) return;
  state.cat = btn.dataset.cat;
  state.page = 1;
  render();
  scrollToGrid();
});

paginationEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-page]");
  if (!btn || btn.disabled) return;
  state.page = parseInt(btn.dataset.page, 10);
  render();
  scrollToGrid();
});

let searchTimer;
document.getElementById("searchInput").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = e.target.value;
    state.page = 1;
    render();
  }, 200);
});

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
  }
  return copyTextFallback(text);
}

function copyTextFallback(text) {
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    ok ? resolve() : reject(new Error("copy failed"));
  });
}

grid.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const p = PAIRINGS[parseInt(btn.dataset.copy, 10)];
  try {
    await copyText(buildCss(p));
    btn.textContent = "Copied ✓";
    btn.classList.add("is-copied");
    setTimeout(() => {
      btn.textContent = "Copy CSS";
      btn.classList.remove("is-copied");
    }, 1600);
  } catch {
    btn.textContent = "Copy failed";
    setTimeout(() => (btn.textContent = "Copy CSS"), 1600);
  }
});

document.getElementById("clearFilters").addEventListener("click", () => {
  state = { page: 1, cat: "all", q: "" };
  document.getElementById("searchInput").value = "";
  render();
});

document.getElementById("homeLink").addEventListener("click", (e) => {
  e.preventDefault();
  state = { page: 1, cat: "all", q: "" };
  document.getElementById("searchInput").value = "";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function scrollToGrid() {
  const toolbar = document.getElementById("toolbar");
  const y = toolbar.getBoundingClientRect().top + window.scrollY - 8;
  if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- theme ---------- */
const themeToggle = document.getElementById("themeToggle");
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem("duet-theme", t);
}
themeToggle.addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme;
  applyTheme(cur === "dark" ? "light" : "dark");
});
(function initTheme() {
  const saved = localStorage.getItem("duet-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || preferred);
})();

/* ---------- init ---------- */
readHash();
const savedQ = state.q;
if (savedQ) document.getElementById("searchInput").value = savedQ;
renderStats();
render();
