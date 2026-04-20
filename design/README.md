# Aurum Dent — Design Handoff

Premium dental clinic iOS app. Warm beige + champagne gold, serif display type, quiet luxury aesthetic. Ru / Cs / En.

This document is the single source of truth for implementation. Values in this doc match the prototype's source exactly.

---

## 1. Design Principles

1. **Quiet luxury, not flashy.** Gold is used as an accent, never a flood. Black backgrounds in dark mode are espresso (`#14110E`), not pure black.
2. **Type carries the brand.** Cormorant Garamond sets tone. Keep sans for UI chrome only — labels, buttons, meta.
3. **Animations are once-per-session, slow, and purposeful.** No loops that play forever in the user's peripheral vision. If it's not triggered by context, it's decoration — remove it.
4. **Generous whitespace and long-form breathing room.** Card padding ≥ 16. Corner radii ≥ 14 on cards, 12 on small pills, 16 on primary buttons.
5. **Respect `prefers-reduced-motion`.** All animations below must be gated behind a media query that disables them.

---

## 2. Design Tokens

### 2.1 Colors — Light Theme

| Token       | Hex         | Use                                          |
|-------------|-------------|----------------------------------------------|
| `bg`        | `#FBF8F3`   | App background                               |
| `card`      | `#FFFFFF`   | Card surface                                 |
| `beige`     | `#F3E7D4`   | Icon badge fill, soft chip background        |
| `beigeSoft` | `#F8EFE0`   | Tint surface                                 |
| `beigeHi`   | `#FAF1DD`   | Highlight card (gold wash)                   |
| `gold`      | `#B8873C`   | Primary accent, CTAs, active states          |
| `goldDeep`  | `#A17530`   | Pressed / deep variant                       |
| `goldSoft`  | `#D9B177`   | Tagline, secondary gold                      |
| `goldTint`  | `#EBD5B0`   | Subtle gold border/ring                      |
| `ink`       | `#1F1E1C`   | Primary text                                 |
| `body`      | `#3B3A37`   | Body text                                    |
| `muted`     | `#8C8579`   | Meta, labels, inactive                       |
| `faint`     | `#BFB8AB`   | Disabled text                                |
| `divider`   | `rgba(40,30,20,0.06)` | Hairlines                          |
| `inputBg`   | `#FBF8F3`   | Input background                             |

### 2.2 Colors — Dark Theme

| Token       | Hex         |
|-------------|-------------|
| `bg`        | `#14110E`   |
| `card`      | `#1E1A15`   |
| `cardElev`  | `#2A241D`   |
| `beige`     | `#2E2821`   |
| `beigeSoft` | `#24201B`   |
| `beigeHi`   | `#3A2F22`   |
| `gold`      | `#D4A85A`   |
| `goldDeep`  | `#B8873C`   |
| `goldSoft`  | `#E3C28A`   |
| `goldTint`  | `#3E332A`   |
| `ink`       | `#F5EFE4`   |
| `body`      | `#D8CFBE`   |
| `muted`     | `#8F8676`   |
| `faint`     | `#5A5348`   |
| `divider`   | `rgba(245,230,200,0.08)` |
| `inputBg`   | `#26211B`   |

### 2.3 Shadows

```
shadowSm  — small surface lift (cards)
  light: 0 1px 2px rgba(40,28,10,0.04), 0 4px 14px rgba(40,28,10,0.05)
  dark:  0 1px 2px rgba(0,0,0,0.3),     0 4px 14px rgba(0,0,0,0.25)

shadowMd  — elevated card
  light: 0 2px 4px rgba(40,28,10,0.05), 0 10px 28px rgba(40,28,10,0.07)
  dark:  0 2px 4px rgba(0,0,0,0.3),     0 10px 28px rgba(0,0,0,0.35)

shadowCTA — gold button glow
  light: 0 6px 18px rgba(184,135,60,0.35), 0 2px 4px rgba(184,135,60,0.25)
  dark:  0 6px 18px rgba(212,168,90,0.30), 0 2px 4px rgba(212,168,90,0.20)
```

### 2.4 Typography

```
serif: "Cormorant Garamond", "Playfair Display", "Times New Roman", serif
sans:  -apple-system, "SF Pro Display", "Inter", system-ui, sans-serif
```

| Role                     | Family | Size | Weight | Letter-spacing | Line-height |
|--------------------------|--------|------|--------|----------------|-------------|
| Display (hero title)     | serif  | 34   | 500    | 0.3            | 1.05        |
| Page title (Confirm)     | serif  | 28   | 500    | 0.2            | 1.1         |
| Section heading          | serif  | 22   | 500    | 0.2            | 1.2         |
| Card title               | serif  | 20   | 500    | 0.2            | 1.3         |
| Row value                | serif  | 16   | 500    | 0.1            | 1.4         |
| Button                   | sans   | 17   | 600    | −0.2           | 1           |
| Body                     | sans   | 14   | 400    | 0              | 1.45        |
| Meta / label             | sans   | 11–12.5 | 600 | 0              | 1.4         |
| Eyebrow (uppercase)      | sans   | 11   | 600    | 2.5, UPPERCASE | 1           |
| Status bar time          | sans   | 17   | 600    | −0.2           | 1           |

### 2.5 Radii, spacing, heights

```
Radius    cards 28   |  buttons 16  |  inputs 14  |  pills 10–12  |  chips 9
Button    height 58  |  min-tap 44
Tab bar   height 68 visible + 34 safe area
Stepper   4 bars, gap 6, height 2.5
Card pad  16 default
Screen x-pad  20
```

### 2.6 Motion tokens

```
Easing
  standard:   cubic-bezier(0.22, 1, 0.36, 1)      /* ease-out-expo — default */
  overshoot:  cubic-bezier(0.34, 1.56, 0.64, 1)   /* soft bounce, use sparingly */
  linear:     linear                               /* only for halos & sparkles */

Duration
  instant:  150ms   button press, ripple out
  short:    250ms   fade, color swap
  medium:   400ms   card reveal, stepper fill
  long:     600ms   page title reveal
  hero:     1400ms  success halo + check
  ambient:  4000ms+ hero square shimmer & pulse (decorative, loops)
```

---

## 3. Screens

6 screens total: Home, Booking Step 1–4, Confirm.

### 3.1 Home
- Logo (AD monogram in gold ring, tagline under)
- Animated "Aurum" hero square (see §5.1)
- Section: "Наши услуги" — 5 service cards: Терапия, Имплантация, Эстетика, Профилактика, Диагностика
- Section: "Приём сегодня" — 1–2 doctor cards
- CTA: "Записаться на приём"
- Tab bar: Главная · Записи · Уведомления · Профиль

### 3.2 Step 1 — Doctor
- Page title + stepper (1/4)
- Filter chips by specialty
- Doctor list — avatar, name, specialty, rating, next available slot

### 3.3 Step 2 — Service
- Service grid with "Новое" badge on new offerings
- Price range on each

### 3.4 Step 3 — Date & Time
- Monthly calendar (Mon-first, CZ locale: `Po Út St Čt Pá So Ne`)
- Legend: selected · today · free slots
- Period toggle: Ráno 9–12 · Odpo 12–17 · Večer 17–21
- Time slot grid (4-col) — states: free / busy (dashed, strikethrough) / last / selected
- Session duration hint
- CTA: Далее

### 3.5 Step 4 — Details
- Fields: name, phone (with CZ `+420` prefix chip), email (optional)
- Toggle "První návštěva — 10 % sleva"
- Booking summary card: Lékař / Služba / Termín
- CTA: Potvrdit rezervaci

### 3.6 Confirm
- Animated success burst (see §5.2)
- Eyebrow "Успешно" + serif title "Запись подтверждена"
- Summary rows: Врач / Услуга / Дата
- Reminder hint card
- CTA: "На главную" + link "Добавить в календарь"

---

## 4. Component API

### `<AuFrame width? height? theme="light"|"dark" lang="ru"|"cs"|"en">`
iOS device shell. Provides `ThemeCtx` + `LANG_CTX` to children. Renders status bar + home indicator.

### `<AuLogo size={34} showTagline />`
AD monogram with a gold ring + wordmark + tagline.

### `<AuPageTitle eyebrow title subtitle align="left">`
Standard screen header.

### `<AuStepper step={1..4} total={4} />`
4-bar progress. Active bars are `gold`, inactive are `goldTint/divider`.

### `<AuCard padding={16} style?>`
Rounded 28px surface, `shadowSm`.

### `<AuButton variant="gold"|"ghost" onClick>`
Full-width 58px. Gold variant has `shadowCTA`.

### `<AuIconBadge icon size={48} bg? color? radius={14} />`
Badge wrapper for icon functions. `icon` is `(color, size) => svg`.

### `<AuTabBar active="home"|"records"|"notif"|"profile" />`
Frosted bottom bar, 4 tabs.

### `<AuInteriorImage height={200} rounded={20} />`
Hero "Aurum" square. See §5.1.

### `<AuDoctorAvatar size={72} tone="warm"|"cool"|"neutral" female={true} />`
Illustrated portrait. Vector, no photos.

### Icons
- `serviceIcons` — `tooth, toothSparkle, implant, diamond, shield, search`
- `uiIcons` — `chevR, chevL, chevDown, check, clock, phone, calendar, calendarCheck, menu, mail, user, shield`
- `tabIcons` — `home, cal, bell, user` (accept `(stroke, size, activeFill)` — filled when `stroke === activeFill`)

### `useT()` / `useAU()`
Hooks. `useT()` returns the active i18n dictionary from `LANG_CTX`. `useAU()` returns the active theme object.

---

## 5. Motion Spec

### 5.1 Hero square (ambient, loops)
Five concurrent loops inside the hero square:
| Name       | Duration | Timing     | What                          |
|------------|----------|------------|-------------------------------|
| shimmer    | 4.5s     | ease-in-out infinite | diagonal highlight sweeps across |
| rotate     | 14s      | linear infinite      | conic-gradient halo rotates |
| pulse      | 3.5s     | ease-in-out infinite | AD monogram scales 1 → 1.08 → 1 |
| float      | 4s       | ease-in-out infinite | AD translateY 0 → −4 → 0 |
| spark      | 2.4s     | ease-in-out infinite (staggered delays 0, 0.7, 1.4, 2.1) | sparkle twinkles |

All ambient animations MUST be disabled under `prefers-reduced-motion: reduce`.

### 5.2 Confirm screen — success burst (once, on mount)

| Layer           | Delay | Duration | Easing      | Effect                                                |
|-----------------|-------|----------|-------------|-------------------------------------------------------|
| halo (circle)   | 0     | 700ms    | overshoot   | scale 0.3 → 1.08 → 0.96 → 1, opacity 0 → 1            |
| ring pulse      | 150ms | 1400ms   | standard    | scale 0.4 → 2.4, opacity 0.6 → 0                      |
| check draw      | 500ms | 550ms    | standard    | stroke-dashoffset 48 → 0                              |
| sparks (×10)    | 350ms + 0.04 × (i%5) | 1400–1850ms | standard | radial burst then drift up + fade |
| eyebrow "Успешно" | 750ms | 600ms | standard | opacity + translateY(6→0) + letter-spacing 1 → 2.5 |
| title           | 850ms | 700ms   | standard    | opacity + translateY(10→0)                            |
| subtitle        | 950ms | 700ms   | standard    | opacity + translateY(10→0)                            |

Spark geometry: 10 particles, angles `i / 10 * 2π + π/7`, distance `58 + (i%3)*14` px, size `2 + (i%3)` px, box-shadow `0 0 6px gold`.

### 5.3 Recommended additions (not yet in prototype)

These were scoped and approved — implement in Claude Code:

| Event                    | Animation                                               | Duration | Easing    |
|--------------------------|---------------------------------------------------------|----------|-----------|
| Route change             | Shared-element iconography (FLIP)                        | 350ms    | standard  |
| Stepper advance          | Gold fill expands left-to-right on the new bar          | 250ms    | standard  |
| Checkbox tick            | SVG stroke-draw of the checkmark                        | 300ms    | standard  |
| Toggle (switch)          | Knob slides + track color crossfade                     | 200ms    | standard  |
| Time-slot tap            | Ripple from tap point, gold, 600ms radius               | 600ms    | standard  |
| Button press             | scale 1 → 0.97 on pointerdown; back on pointerup        | 120ms    | standard  |
| Day selection (calendar) | Selected day pill grows from 0.85 → 1 with shadowCTA    | 220ms    | overshoot |
| List reveal              | Items fade + translateY(16→0) + blur(8→0), **staggered by 40ms** | 400ms | standard  |
| Hero square tap          | "Polish" state — shimmer speeds up 4×, extra sparks     | while pressed | — |

**Reduced motion:** swap all of the above for a simple opacity crossfade ≤ 150ms.

---

## 6. i18n

Keys live in `i18n.jsx` under `DICT[lang]`. Supported: `ru`, `cs`, `en`. Use `useT()` in any component inside an `<AuFrame lang>`.

Key examples: `tagline`, `step3of4`, `dateTime`, `dateTimeSub`, `month`, `dow` (array 7), `legendSel`, `legendToday`, `legendFree`, `freeOn(d)`, `slots(n)`, `morning`, `afternoon`, `evening`, `last`, `selected`, `duration(min, endsAt)`, `next`, `tabHome`, `tabRecords`, `tabNotif`, `tabProfile`.

**Do not mix languages within a single screen.** If you need a CZ-only string inside an RU UI (e.g., local Czech month name), keep it consistent with locale data.

---

## 7. Accessibility

- **Contrast:** Gold CTA on cream has AA contrast only at 17px+/600. Do not use gold for body copy.
- **Touch targets:** 44pt minimum. Slot chips are 46px for comfort.
- **Focus states:** 2px `gold` outline offset by 2px on keyboard focus (not implemented in the prototype — Claude Code should add).
- **Reduced motion:** see §5.
- **Right-to-left:** not currently supported.

---

## 8. File map (source of truth)

```
AurumUI.jsx         primitives: theme, logo, frame, tab bar, cards, buttons, icons, hero square, avatars
HomeScreen.jsx      Home screen
BookingScreens.jsx  Step 1–4 + Confirm + success-burst component + keyframes
i18n.jsx            dict + <LANG_CTX> + useT()
design-canvas.jsx   orchestrates all screens into the 2-theme presentation canvas
Aurum Dent.html     entry point (Babel + Google Fonts + mounts canvas)
ios-frame.jsx       local copy of the ios_frame starter (unused — AuFrame replaces it)
```

---

## 9. Known gaps & next steps for Claude Code

1. **Wire Tweaks panel** to live toggle `theme` + `lang` across the canvas.
2. **Real data layer** — doctors / services / slots are currently hardcoded in `HomeScreen.jsx` and `BookingScreens.jsx`. Move to a `data/` module.
3. **Form validation** on Step 4 — phone format, email format, required fields.
4. **Success burst** currently plays on every re-render; gate it behind `useState(() => true)` + `useEffect` or an IntersectionObserver so it plays exactly once when the user lands on Confirm.
5. **Implement §5.3** motion additions.
6. **Add focus-visible styles** across all interactive elements.
7. **Persist user state** (selected doctor / service / date / time / form values) through the booking flow. Prototype currently treats each step as independent.
8. **`reduced-motion` gate** — wrap the ambient hero animations in `@media (prefers-reduced-motion: no-preference)`.
9. **Calendar** is visually static — wire month nav and real dates.
