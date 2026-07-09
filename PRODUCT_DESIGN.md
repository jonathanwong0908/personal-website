# Time Tracker — Product Design Document

**Status:** Design locked for greenfield build  
**Audience:** Any engineer or agent starting a **new** project from this doc alone  
**Prototype note:** An earlier Next.js/localStorage grid prototype validated that a month grid + paint/drag entry is feasible. **Do not treat that prototype as the product codebase.** This document is the source of truth for a new implementation.

Use this doc to produce a separate **implementation plan** (phases, tasks, stack choices, schema). Prefer decisions written here over inventing new product behavior.

---

## 1. Product summary

A **paid-only**, web-first personal time tracker that feels as flexible as a spreadsheet’s columns, but with:

1. A visual month/day grid for painting time  
2. Structured facets (activities + optional secondary activity + user-defined dimensions)  
3. Natural-language fill via an agent with DB tools  
4. Insights that answer “where did my time go?” and “what usually goes together?”

**Not in v1:** free tier, offline-first sync, mobile app (Expo comes later).

---

## 2. Goals and non-goals

### Goals
- Let a user log a full day/month of time with low friction  
- Support **one primary activity** per slot (truth for totals) plus optional richness  
- Allow **user-defined dimensions** (Companion, Project, Location, transport mode, etc.) without forcing a built-in taxonomy  
- Make NL entry (`4-5 gym`) a first-class input path on web  
- Show honest stats: primary sums to the logged day; overlays never corrupt that total  
- Ship insights early (pairings) so the product feels smarter than a grid + pie chart  

### Non-goals (v1)
- Free / freemium plan  
- Offline-first architecture  
- Native mobile app  
- Team / multiplayer / billing-for-clients  
- Perfect timezone/DST modeling  
- Auto-tracking from OS screen time or wearables (later)  

---

## 3. Platform and business

| Topic | Decision |
|-------|----------|
| Business model | **Pro only — no free plan** |
| Primary platform | **Web** |
| Mobile | **Late** (React Native + Expo when web loop is proven) |
| Offline-first | **Deferred** (NL agent and cloud DB imply online-first) |
| Auth | Required (account-bound data) |
| Backend | Cloud DB + auth (implementation plan chooses Convex, Supabase, etc.) |
| NL stack | Vercel AI SDK + Zod-structured tool results + server tools that talk to the DB |

---

## 4. Core concepts

### 4.1 Time grid
- A **day** is a vertical stack of slots; a **month** (or week) view lays days on an axis  
- **Slot resolution (storage):** **15 minutes**  
- **Zoom / view aggregation:**  
  - Zoomed in → show 15-minute rows  
  - Zoomed out → aggregate to **1-hour** rows for readability  
- If zoom UX is too costly in early milestones, ship a simpler fixed view first, but **keep 15-minute storage** so zoom can land without a data migration  
- **Day boundary:** always **local midnight → next midnight** (no configurable day-start in v1)  
- **Timezone / DST:** ignore complex handling in v1. Users log in the local timeline they care about for that day (see §11 Travel)  

### 4.2 Activity axis (what)
- **Activity** — user-defined (name, emoji/icon, color). Fully custom; nothing locked in.  
- **Category** — user-defined grouping of activities (e.g. Work, Rest, Health). Fully custom.  
- Product may **suggest** activities/categories from onboarding answers; suggestions are optional and editable.  

### 4.3 Secondary activity
- Optional **second activity** on the same slot (e.g. Commute + Podcast, Eat + Show)  
- Drawn from the **same** activity list as primary  
- **Forbidden:** primary and secondary referring to the **same** activity  
- Secondary is an **overlay** for insights — it does **not** count toward primary totals or primary-only goals  

### 4.4 Dimensions (facets / context)
Dimensions answer questions like *who with*, *which project*, *where*, *what transport*.

- **User-defined.** No dimensions are pre-installed.  
- Discovery via **guides/recipes + NL agent offers + insight nudges** (not forced onboarding installs).  
- A dimension has: name, list of values/tags, **max values per slot** (author-chosen; **default 3**; optional **unlimited**), colors/icons as needed, and optional relevance rules (which activities/categories it applies to, or universal).  
- **Attached to the slot** (the primary context), not to the secondary activity.  
- **Blank = unspecified** (not “Alone”). If the user wants Alone/None, they pick an explicit value.  

**Example — cafe deep work with friends**  
- Primary: Deep Work  
- Dimensions: `Project = X`, `Companion = Friends`, `Location = Cafe`  

**Example — commute**  
- Primary: Commute  
- Dimension: `Transport = Train` (or Flight, Walk, …)  
- Optional secondary: Podcast  

### 4.5 Slot shape (logical model)
```text
Slot {
  date: LocalDate           // day the slot belongs to (midnight-based)
  slotIndex: number         // 0 .. 95 for 15-min slots in a 24h day
  primaryActivityId: Id     // required when slot is filled
  secondaryActivityId?: Id  // optional; ≠ primary
  dimensions: {
    [dimensionId: Id]: Id[] // 1..max values; empty key = unspecified
  }
}
```
Unfilled slots simply have no record (sparse storage).

**Clearing primary clears the entire slot** (secondary + dimensions go away).

---

## 5. Counting and stats rules (non-negotiable)

1. **Primary hours** are the spine. Sum of primary time for a day ≤ 24h (for logged coverage). This is “where did my time go?”  
2. **Secondary hours** are reported separately (“alongside”). Never add secondary into the primary pie.  
3. **Dimension rollups** are separate views/filters (e.g. time with Friends across all primaries).  
4. **Multi-select dimensions:** a slot with Friends + Girlfriend counts **once** in a “time with people” rollup if that rollup is defined as “any of these values,” or once per value in per-value charts — never double-count the same slot into a single “people total” by summing per-value bars blindly. Implementation plan must define rollup helpers carefully.  
5. **Goals use primary only.** Secondary can still be shown as informational (“Podcasts as secondary: 6h”).  

### Stats to ship
| ID | Name | Description |
|----|------|-------------|
| #1 | Primary breakdown | Pie/bars of primary activities; sums to logged day |
| #2 | Alongside totals | Per-activity secondary hours; dimension value rollups |
| #4 | Pairings / co-occurrence | “Podcasts mostly with Commute”; multitasking rate; top activity×dimension pairs |
| #3 | Total presence | Deferred (primary+secondary for one activity) until users ask |

Ship **#1 + #2 + #4** even before any dimensions exist (#4 can use primary×secondary pairings first).

---

## 6. Input methods

### 6.1 Grid + brush
- Desktop: drag-select / paint regions  
- Brush state carries: **primary + optional secondary + relevant dimension values**  
- Set brush once → paint a block in one stroke (amortizes multi-facet cost)  
- **Brush overwrites** existing slot data in the target region  
- Progressive disclosure: users who never create dimensions only ever set primary (and maybe secondary)  

### 6.2 Natural-language agent (web, Pro)
**Stack intent:** Vercel AI SDK, Zod schemas for structured tool I/O, server tools with DB access.

**Example utterances**
- `4-5 gym`  
- `yesterday 9-12 deep work project x`  
- `commute and podcast 8-9`  
- `volleyball with friends saturday afternoon`  

**Behavior**
- Parse intent → call tools (`resolveActivity`, `listActivities`, `fillSlots`, `setSecondary`, `setDimensions`, `createActivity`, `createDimension`, `askClarification`, …)  
- **Missing date/time → ask**, with **quick suggestion chips** (Cursor-style), not silent defaults  
- Ambiguity → **chips first**, short chat only when needed  
- **Create** new activities/dimensions **only with confirmation**  
- Dimension **values**: auto-suggest with **one-tap confirm**  
- If any target slot is **non-empty** → **prompt** before overwrite (unlike brush)  
- Never write unresolved/hallucinated entity names; resolve via tools + Zod validation  

### 6.3 Other entry (later, not blocking design)
- Live timer / clock-in  
- Templates, repeat yesterday, recurring blocks  
- Reminders for gaps  

---

## 7. Onboarding

1. Account creation  
2. Short **self-describe** step using selects / radio groups (not a huge form). Suggested axes for implementation:  
   - Role / life context (e.g. student, knowledge worker, mixed)  
   - Focus areas (fitness, deep work, social, creative — multi-select)  
   - Lifestyle (commuter, WFH, mixed)  
3. Generate **personalized suggested activities + categories** from those answers  
4. User accepts/edits/skips; everything remains fully custom afterward  
5. **Do not** install dimensions by default; optionally show one soft line that dimensions exist later  

---

## 8. Dimensions: discovery without built-ins

| Channel | Behavior |
|---------|----------|
| Guides / recipes | “Track who you’re with → create Companion” one-tap create-from-recipe |
| Agent | “You said ‘with friends’ — create dimension Companion + value Friends?” |
| Insights | “You often pair Gym with Socializing — want a Companion dimension?” |

Recipes are **templates**, not seeded data. Until the user confirms, the DB has zero dimensions.

---

## 9. Insights (brainstorm → v1 priorities)

**Ship early (no dimensions required)**
- Primary×secondary pairings (“Podcasts ride along with Commute”)  
- Multitasking rate (% slots with secondary)  
- Coverage gaps (unlogged hours)  
- Week-over-week primary drift  

**When dimensions exist**
- Activity × dimension cross-tabs (Deep Work at Cafe vs Home)  
- Companion / project rollups  
- Transport mix on Commute  

**Nudge-style**
- Suggest dimension recipes from language patterns and pairings  
- Suggest pinning frequent NL aliases (“gym”)  

**Guardrails**
- Minimum sample size before claiming a pattern  
- Always label primary vs secondary language  
- Avoid guilt-heavy copy; allow tone/opt-out later  

---

## 10. Information architecture (screens)

Minimum web IA for implementation planning:

1. **Grid** — primary workspace (day/week/month + zoom)  
2. **Brush / picker** — activity, secondary, active dimension values  
3. **NL command bar** — agent entry + chip clarifications  
4. **Stats / insights** — #1, #2, #4  
5. **Library** — activities, categories, dimensions & values  
6. **Guides** — dimension recipes + short “how counting works”  
7. **Settings** — account, (later) timezone display prefs  
8. **Onboarding** — self-describe → suggestions  

---

## 11. Edge cases and conventions

| Case | Rule |
|------|------|
| Two real activities at once | User picks **primary**; other may be **secondary** |
| Friends / family / partner | Prefer a **Companion dimension**, not an activity named “friends” — unless the *what* is purely socializing |
| Blank dimension | **Unspecified**, not Alone |
| Clear primary | Clear whole slot |
| Brush vs agent conflict | Brush overwrites; agent asks if non-empty |
| Same activity twice | Forbidden (primary ≠ secondary) |
| Travel / flights | User logs the **experienced local timeline** they care about; v1 does not auto-convert zones. Example: HK→TYO flight logged as the continuous block the user considers “in transit,” with Commute + Transport dimension |
| DST / 23h–25h days | Accepted limitation in v1; avoid baking “always 96 slots forever” so hard that DST can’t be fixed later |
| Sparse optional fields | Insights must not overclaim; pairings need thresholds |
| Taxonomy edits | Renames should preserve history; merges need an explicit later design |

---

## 12. Feature list (prioritized)

### P0 — Must have for first useful product
- Auth + cloud persistence  
- Custom activities & categories  
- 15-min slot grid with paint/brush (primary)  
- Optional secondary activity  
- Stats #1 (primary breakdown)  
- Onboarding self-describe → suggestions  
- Basic library CRUD  

### P1 — Differentiator
- User-defined dimensions (slot-level, max default 3, optional unlimited)  
- Dimension guides/recipes + insight/agent nudges  
- Brush carries secondary + dimensions  
- Stats #2 and #4 (alongside + pairings)  
- NL agent (Vercel AI SDK + Zod + DB tools) with chip clarifications  
- Zoom in (15m) / zoom out (1h view)  

### P2 — Retention & depth
- Goals (primary-only)  
- Timer / reminders / gap nudges  
- Templates, repeat yesterday, recurring blocks  
- Export (CSV/JSON)  
- Richer insight narratives  

### P3 — Platform expansion
- Mobile (Expo): FlashList + gestures + bottom sheet; NL may remain online-only  
- Calendar import, wearables  
- Offline-friendly grid (agent still online)  
- Widgets / watch  

---

## 13. What “more powerful than Excel” means here

Excel gives flat cells. This product gives:

- Structured primary/secondary + arbitrary facets per slot  
- One-stroke brush bundles and NL fill with clarification  
- Automatic pairings and cross-tabs without formulas  
- Honest dual reporting (spine totals vs overlays)  

Positioning line: **spreadsheet flexibility, productized entry, insights built for you.**

---

## 14. Prototype lessons (optional context)

The exploratory prototype proved:
- Month grid + 30-min mental model is usable  
- Desktop drag-select and mobile paint-brush are viable interaction patterns  
- localStorage is fine for spikes, **not** for the product  

**Do not copy** its hard-coded activities, single activity-per-slot model, or localStorage-as-source-of-truth into the new app. Reuse only interaction ideas and UX confidence.

---

## 15. Open items deferred (not blocking v1 design)

- Configurable day-start for night owls  
- Full timezone/DST-correct slot counts  
- Goals that optionally include secondary (“presence”)  
- Secondary carrying its own dimensions  
- Free tier / usage-capped NL  
- E2E encryption for sensitive companion data  

---

## 16. Decision log (locked)

| ID | Decision |
|----|----------|
| D1 | Blank dimension = unspecified; explicit Alone/None when needed |
| D2 | Onboarding = self-describe (selects/radios) → personalized suggestions |
| D3 | Dimension discovery = guides + agent + insight nudges |
| D4 | Dimension max values: author-chosen; **default 3**; optional unlimited |
| D5 | Forbid identical primary and secondary |
| D6 | Storage resolution **15 minutes**; UI zoom 15m ↔ 1h (simplify view if needed, keep storage) |
| D7 | Day boundary = midnight |
| D8 | Ignore complex TZ/DST in v1; travel logged per user’s experienced timeline |
| D9 | Goals count **primary only**; still show secondary hours informatively |
| D10 | NL missing date/time → **ask** with suggestion chips |
| D11 | Clarify UX = chips first, chat when needed |
| D12 | Agent creates activities/dimensions with confirmation; values one-tap confirm |
| D13 | **Pro only**, no free plan; NL included |
| D14 | Ship primary/secondary pairings immediately; nudge dimension recipes |
| D15 | Brush overwrites; agent prompts on non-empty targets |
| D16 | Clear primary → clear entire slot |
| D17 | Dimensions attach to **slot**; user-defined; no built-in installs |
| D18 | Activities & categories fully custom; suggestions only |
| D19 | Web-first; mobile and offline-first late |
| D20 | Stats ship #1, #2, #4; defer #3 |

---

## 17. Instructions for writing the implementation plan

When creating `IMPLEMENTATION_PLAN.md` (or equivalent) in a **new** repo:

1. Choose concrete stack (Next.js/web, auth provider, DB, AI SDK wiring) consistent with §3  
2. Derive DB schema from §4.5 and §4.4 (activities, categories, dimensions, dimension_values, slots, users)  
3. Phase delivery as **P0 → P1 → P2**; do not start mobile in P0  
4. Implement counting helpers before fancy charts so #1/#2/#4 stay honest  
5. Build NL as tool-calling agent with Zod schemas; never free-form DB writes from raw model text  
6. Keep dimension creation behind confirmation + recipes  
7. Call out zoom as a UI milestone that must not require re-modeling slots if storage is already 15-min  
8. Treat this file as product law; if implementation wants to violate a Decision Log row, update this doc first  

### Suggested implementation phase sketch (for the other doc to expand)
1. Scaffold + auth + empty app shell  
2. Activity/category library + onboarding suggestions  
3. 15-min slot grid + primary brush + persistence  
4. Secondary activity + stats #1  
5. Dimensions CRUD + slot attachment + brush bundle + stats #2/#4  
6. Guides/recipes + insight nudges  
7. NL agent + clarifications + confirm-creates  
8. Zoom, polish, export, goals (as capacity allows)  

---

## 18. Glossary

| Term | Meaning |
|------|---------|
| Primary | The main activity for a slot; counts in totals/goals |
| Secondary | Optional parallel activity; overlay only |
| Dimension | User-defined facet type (e.g. Companion, Project, Transport) |
| Dimension value / tag | A value within a dimension (e.g. Friends, Train) |
| Brush | Current paint tool state applied to grid selections |
| Unspecified | Missing dimension value; not the same as Alone/None |
| Recipe | Guided template to create a common dimension |
| Pairing | Co-occurrence insight between activities and/or dimensions |
