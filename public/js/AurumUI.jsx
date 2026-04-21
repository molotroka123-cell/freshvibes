// AurumUI.jsx — shared primitives for Aurum Dent (with light/dark themes)

// ───────── Theme factory ─────────
function makeTheme(dark) {
  if (!dark) return {
    bg:        '#FBF8F3',
    card:      '#FFFFFF',
    cardElev:  '#FFFFFF',
    beige:     '#F3E7D4',
    beigeSoft: '#F8EFE0',
    beigeHi:   '#FAF1DD',
    gold:      '#B8873C',
    goldDeep:  '#A17530',
    goldSoft:  '#D9B177',
    goldTint:  '#EBD5B0',
    ink:       '#1F1E1C',
    body:      '#3B3A37',
    muted:     '#8C8579',
    faint:     '#BFB8AB',
    divider:   'rgba(40,30,20,0.06)',
    tabBarBg:  'rgba(255,255,255,0.92)',
    inputBg:   '#FBF8F3',
    shadowSm:  '0 1px 2px rgba(40,28,10,0.04), 0 4px 14px rgba(40,28,10,0.05)',
    shadowMd:  '0 2px 4px rgba(40,28,10,0.05), 0 10px 28px rgba(40,28,10,0.07)',
    shadowCTA: '0 6px 18px rgba(184,135,60,0.35), 0 2px 4px rgba(184,135,60,0.25)',
    statusInk: '#000',
    dark: false,
  };
  // Dark theme — deep espresso + champagne gold
  return {
    bg:        '#14110E',      // near-black espresso
    card:      '#1E1A15',      // card surface
    cardElev:  '#2A241D',      // highlighted card
    beige:     '#2E2821',      // icon badge fill
    beigeSoft: '#24201B',
    beigeHi:   '#3A2F22',      // highlight card (gold wash)
    gold:      '#D4A85A',      // champagne — brighter for contrast
    goldDeep:  '#B8873C',
    goldSoft:  '#E3C28A',
    goldTint:  '#3E332A',
    ink:       '#F5EFE4',      // warm off-white text
    body:      '#D8CFBE',
    muted:     '#8F8676',
    faint:     '#5A5348',
    divider:   'rgba(245,230,200,0.08)',
    tabBarBg:  'rgba(20,17,14,0.9)',
    inputBg:   '#26211B',
    shadowSm:  '0 1px 2px rgba(0,0,0,0.3), 0 4px 14px rgba(0,0,0,0.25)',
    shadowMd:  '0 2px 4px rgba(0,0,0,0.3), 0 10px 28px rgba(0,0,0,0.35)',
    shadowCTA: '0 6px 18px rgba(212,168,90,0.3), 0 2px 4px rgba(212,168,90,0.2)',
    statusInk: '#fff',
    dark: true,
  };
}

// Default (light) — remains accessible as window.AU for legacy use
let AU = makeTheme(false);

// Theme context
const ThemeCtx = React.createContext(AU);
const useAU = () => React.useContext(ThemeCtx);

const AU_FONTS = {
  serif: '"Cormorant Garamond", "Playfair Display", "Times New Roman", serif',
  sans:  '-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif',
};

// ───────── Status bar ─────────
function AuStatusBar({ time = '9:41' }) {
  const au = useAU();
  return (
    <div style={{
      height: 54, paddingTop: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 28px 0',
      fontFamily: AU_FONTS.sans, color: au.statusInk,
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>{time}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="11" viewBox="0 0 18 11">
          {[2,5,8,11].map((h, i) => (
            <rect key={i} x={i*4.5} y={11-h} width="3" height={h} rx="0.6" fill={au.statusInk}/>
          ))}
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11">
          <path d="M8 2.5c2.2 0 4.2.9 5.7 2.3l1-1C12.9 2 10.6 1 8 1S3.1 2 1.3 3.8l1 1C3.8 3.4 5.8 2.5 8 2.5z" fill={au.statusInk}/>
          <path d="M8 5.6c1.4 0 2.6.5 3.5 1.4l1-1C11.3 4.8 9.7 4.1 8 4.1s-3.3.7-4.5 1.9l1 1C5.4 6.1 6.6 5.6 8 5.6z" fill={au.statusInk}/>
          <circle cx="8" cy="9.2" r="1.3" fill={au.statusInk}/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke={au.statusInk} strokeOpacity="0.45"/>
          <rect x="2" y="2" width="19" height="8" rx="1.6" fill={au.statusInk}/>
          <rect x="23" y="4" width="1.5" height="4" rx="0.6" fill={au.statusInk} fillOpacity="0.45"/>
        </svg>
      </div>
    </div>
  );
}

// ───────── Logo — "AD" monogram in a gold ring ─────────
function AuLogo({ size = 34, showTagline = true }) {
  const au = useAU();
  const t = (typeof useT === 'function') ? useT() : { tagline: 'стоматология премиум класса' };
  const gid = React.useId().replace(/[:#]/g, '');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width={size * 1.05} height={size * 1.05} viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id={`aug_${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor={au.dark ? '#F0D49A' : '#E6BD78'}/>
            <stop offset="45%" stopColor={au.gold}/>
            <stop offset="100%" stopColor={au.dark ? '#8E6326' : '#7A5420'}/>
          </linearGradient>
        </defs>
        {/* gold ring */}
        <circle cx="22" cy="22" r="19.5" stroke={`url(#aug_${gid})`} strokeWidth="1.6" fill="none"/>
        {/* AD monogram — serif, overlapping */}
        <text x="14.5" y="28.2" fontFamily='"Cormorant Garamond","Playfair Display",serif'
              fontSize="19" fontWeight="600" fill={`url(#aug_${gid})`}
              textAnchor="middle" letterSpacing="-0.5">A</text>
        <text x="29.5" y="28.2" fontFamily='"Cormorant Garamond","Playfair Display",serif'
              fontSize="19" fontWeight="600" fill={`url(#aug_${gid})`}
              textAnchor="middle" letterSpacing="-0.5">D</text>
        {/* sparkle */}
        <path d="M7 13 L7.7 14.6 L9.3 15.3 L7.7 16 L7 17.6 L6.3 16 L4.7 15.3 L6.3 14.6 Z"
              fill={au.dark ? '#F0D49A' : '#E6BD78'} opacity="0.9"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontFamily: AU_FONTS.serif, fontSize: size * 0.72, fontWeight: 500,
          letterSpacing: size * 0.08, color: au.gold, lineHeight: 1,
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>Aurum Dent</div>
        {showTagline && (
          <div style={{
            fontFamily: AU_FONTS.sans, fontSize: size * 0.22, fontWeight: 500,
            letterSpacing: size * 0.05, color: au.goldSoft,
            textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap',
          }}>{t.tagline}</div>
        )}
      </div>
    </div>
  );
}

// ───────── Tab bar ─────────
function AuTabBar({ active = 'home' }) {
  const au = useAU();
  const t = (typeof useT === 'function') ? useT() : {
    tabHome: 'Главная', tabRecords: 'Записи', tabNotif: 'Уведомления', tabProfile: 'Профиль',
  };
  const tabs = [
    { id: 'home',    label: t.tabHome,    icon: tabIcons.home },
    { id: 'records', label: t.tabRecords, icon: tabIcons.cal },
    { id: 'notif',   label: t.tabNotif,   icon: tabIcons.bell },
    { id: 'profile', label: t.tabProfile, icon: tabIcons.user },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 10, paddingBottom: 34,
      background: au.tabBarBg,
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `0.5px solid ${au.divider}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      zIndex: 20,
    }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        const color = isActive ? au.gold : au.muted;
        return (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color, flex: 1,
          }}>
            {t.icon(color, 24, au.gold)}
            <div style={{
              fontFamily: AU_FONTS.sans, fontSize: 10.5, fontWeight: isActive ? 600 : 500,
              letterSpacing: -0.1,
            }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ───────── Home indicator ─────────
function AuHomeIndicator() {
  const au = useAU();
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 30, pointerEvents: 'none',
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 100,
        background: au.dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.35)',
      }} />
    </div>
  );
}

// ───────── iOS Frame ─────────
function AuFrame({ children, width = 390, height = 844, theme = 'light', lang = 'ru' }) {
  const au = React.useMemo(() => makeTheme(theme === 'dark'), [theme]);
  // keep window.AU pointing at this theme during render — so legacy callers
  // (e.g. doctor arrays defined at module scope) see current gold/beige
  window.AU = au;
  return (
    <LANG_CTX.Provider value={lang}>
      <ThemeCtx.Provider value={au}>
        <div style={{
          width, height, borderRadius: 54, overflow: 'hidden',
          position: 'relative', background: au.bg,
          boxShadow: au.dark
            ? '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,240,210,0.05)'
            : '0 40px 80px rgba(40,28,10,0.18), 0 0 0 1px rgba(40,28,10,0.08)',
          fontFamily: AU_FONTS.sans,
          WebkitFontSmoothing: 'antialiased',
        }}>
          <AuStatusBar />
          <div style={{
            position: 'absolute', top: 54, left: 0, right: 0, bottom: 0,
            overflow: 'hidden',
          }}>{children}</div>
          <AuHomeIndicator />
        </div>
      </ThemeCtx.Provider>
    </LANG_CTX.Provider>
  );
}

// ───────── Elegant page title (serif) ─────────
function AuPageTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const au = useAU();
  return (
    <div style={{ padding: '0 20px 12px', textAlign: align }}>
      {eyebrow && (
        <div style={{
          fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
          color: au.gold, letterSpacing: 2.5, textTransform: 'uppercase',
          marginBottom: 10,
        }}>{eyebrow}</div>
      )}
      <div style={{
        fontFamily: AU_FONTS.serif, fontSize: 34, fontWeight: 500,
        color: au.ink, letterSpacing: 0.3, lineHeight: 1.05,
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontFamily: AU_FONTS.sans, fontSize: 13.5, fontWeight: 400,
          color: au.muted, marginTop: 8, letterSpacing: -0.1, lineHeight: 1.4,
        }}>{subtitle}</div>
      )}
    </div>
  );
}

// ───────── Service icons ─────────
const serviceIcons = {
  tooth: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 40 42" fill="none">
      <path d="M20 6c-5 0-9 1.5-11 4.5-2 3-2.2 7-.5 12 1 3 1.8 6 2.2 9 .4 3 1.5 5 3.3 5 1.5 0 2.5-1.5 3-4 .5-2.5 1-4 3-4s2.5 1.5 3 4c.5 2.5 1.5 4 3 4 1.8 0 2.9-2 3.3-5 .4-3 1.2-6 2.2-9 1.7-5 1.5-9-.5-12-2-3-6-4.5-11-4.5z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  toothSparkle: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 40 42" fill="none">
      <path d="M33 4 L34 7 L37 8 L34 9 L33 12 L32 9 L29 8 L32 7 Z" fill={c}/>
      <path d="M20 8c-5 0-9 1.5-11 4.5-2 3-2.2 7-.5 12 1 3 1.8 6 2.2 9 .4 3 1.5 5 3.3 5 1.5 0 2.5-1.5 3-4 .5-2.5 1-4 3-4s2.5 1.5 3 4c.5 2.5 1.5 4 3 4 1.8 0 2.9-2 3.3-5 .4-3 1.2-6 2.2-9 1.7-5 1.5-9-.5-12-2-3-6-4.5-11-4.5z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  implant: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 32 40" fill="none">
      <ellipse cx="16" cy="8" rx="8" ry="4" stroke={c} strokeWidth="1.8"/>
      <path d="M8 8v3c0 2 3.5 4 8 4s8-2 8-4V8" stroke={c} strokeWidth="1.8"/>
      <path d="M13 15v3M19 15v3" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 18h8M12 21h8M12 24h8M12 27h8M12 30h8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M13 30l3 6 3-6" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  diamond: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 36 32" fill="none">
      <path d="M8 4h20l6 8L18 30 2 12l6-8z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M2 12h32M14 4l-6 8 10 18M22 4l6 8-10 18M14 4l4 8 4-8" stroke={c} strokeWidth="1.4"/>
    </svg>
  ),
  shield: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 32 36" fill="none">
      <path d="M16 3 4 7v11c0 7 5 12 12 15 7-3 12-8 12-15V7L16 3z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M11 17l4 4 7-8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: (c, s = 30) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <circle cx="14" cy="14" r="8" stroke={c} strokeWidth="1.8"/>
      <path d="M20 20l7 7" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

// ───────── UI icons ─────────
const uiIcons = {
  chevR: (c, s = 14) => (<svg width={s * 0.57} height={s} viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevL: (c, s = 14) => (<svg width={s * 0.57} height={s} viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevDown: (c, s = 14) => (<svg width={s} height={s * 0.57} viewBox="0 0 14 8"><path d="M1 1l6 6 6-6" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  check: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 5" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  clock: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M12 7v5l3.5 2.5" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>),
  phone: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6.5 3h2l1.5 4-2 1.5c1 2.5 3 4.5 5.5 5.5L15 12l4 1.5v2c0 .8-.7 1.5-1.5 1.5C10 17 7 14 7 6.5 7 5.7 6.7 5 6.5 3z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" fill="none"/></svg>),
  calendar: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.5" stroke={c} strokeWidth="1.7"/><path d="M3 9h18M8 3v4M16 3v4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>),
  calendarCheck: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.5" stroke={c} strokeWidth="1.7"/><path d="M3 9h18M8 3v4M16 3v4M8.5 14l2.5 2.5L15.5 12" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  menu: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  mail: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke={c} strokeWidth="1.7"/><path d="M3.5 7l8.5 6 8.5-6" stroke={c} strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>),
  user: (c, s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" stroke={c} strokeWidth="1.7"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>),
  shield: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 3 5 6v6c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6l-7-3z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

// ───────── Tab icons (c = stroke, activeFill = gold for active) ─────────
const tabIcons = {
  home: (c, s, activeFill) => {
    const filled = c === activeFill;
    return filled
      ? <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z" fill={c}/></svg>
      : <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/></svg>;
  },
  cal: (c, s, activeFill) => {
    const filled = c === activeFill;
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2.5" stroke={c} strokeWidth="1.7" fill={filled ? c : 'none'} fillOpacity={filled ? 0.18 : 1}/>
        <path d="M3 9.5h18M8 3v4M16 3v4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    );
  },
  bell: (c, s, activeFill) => {
    const filled = c === activeFill;
    return filled
      ? <svg width={s} height={s} viewBox="0 0 24 24"><path d="M5 17V11a7 7 0 0 1 14 0v6l2 2H3l2-2z" fill={c}/><path d="M10 20a2 2 0 0 0 4 0" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>
      : <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 17V11a7 7 0 0 1 14 0v6l2 2H3l2-2z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>;
  },
  user: (c, s, activeFill) => {
    const filled = c === activeFill;
    return filled
      ? <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="9" r="4" fill={c}/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill={c}/></svg>
      : <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" stroke={c} strokeWidth="1.7"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>;
  },
};

// ───────── Icon badge ─────────
function AuIconBadge({ icon, size = 48, bg, color, iconSize, radius = 14 }) {
  const au = useAU();
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: bg || au.beige,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icon(color || au.gold, iconSize || Math.round(size * 0.54))}
    </div>
  );
}

// ───────── Card ─────────
function AuCard({ children, style = {}, padding = 16 }) {
  const au = useAU();
  return (
    <div style={{
      background: au.card, borderRadius: 28,
      boxShadow: au.shadowSm,
      padding, ...style,
    }}>{children}</div>
  );
}

// ───────── Gold CTA ─────────
function AuButton({ children, style = {}, variant = 'gold', onClick }) {
  const au = useAU();
  const bg = variant === 'gold' ? au.gold : au.card;
  const color = variant === 'gold' ? (au.dark ? '#1a1410' : '#fff') : au.gold;
  const shadow = variant === 'gold' ? au.shadowCTA : au.shadowSm;
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 58, borderRadius: 16, border: 'none',
      background: bg, color, boxShadow: shadow,
      fontFamily: AU_FONTS.sans, fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
      cursor: 'pointer', ...style,
    }}>{children}</button>
  );
}

// ───────── Section heading (in-screen) ─────────
function AuSectionHeading({ title, right }) {
  const au = useAU();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', marginBottom: 12,
    }}>
      <div style={{
        fontFamily: AU_FONTS.serif, fontSize: 22, fontWeight: 500,
        color: au.ink, letterSpacing: 0.2,
      }}>{title}</div>
      {right}
    </div>
  );
}

// ───────── Animated hero "Aurum" square — gold shimmer + rotating tooth ─────────
function AuInteriorImage({ width = '100%', height = 200, rounded = 20, style = {} }) {
  const au = useAU();
  const id = React.useId().replace(/[:#]/g, '');
  const bgGrad = au.dark
    ? 'linear-gradient(135deg, #3A2D1C 0%, #1F1810 60%, #000 100%)'
    : 'linear-gradient(135deg, #F7E7C4 0%, #D7AD6F 55%, #8E6326 100%)';
  return (
    <div style={{
      width, height, borderRadius: rounded, overflow: 'hidden',
      position: 'relative', flexShrink: 0, background: bgGrad,
      boxShadow: au.dark
        ? 'inset 0 0 0 1px rgba(212,168,90,0.2)'
        : 'inset 0 0 0 1px rgba(184,135,60,0.25)',
      ...style,
    }}>
      {/* animated shimmer sweep */}
      <style>{`
        @keyframes au_shimmer_${id} {
          0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          30%  { opacity: 1; }
          60%  { opacity: 1; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        @keyframes au_rotate_${id} { to { transform: rotate(360deg); } }
        @keyframes au_pulse_${id} {
          0%, 100% { transform: scale(1);   opacity: 0.85; }
          50%      { transform: scale(1.08); opacity: 1; }
        }
        @keyframes au_float_${id} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes au_spark_${id} {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      {/* warm radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: au.dark
          ? 'radial-gradient(ellipse at 50% 40%, rgba(220,180,110,0.28), transparent 65%)'
          : 'radial-gradient(ellipse at 50% 40%, rgba(255,240,210,0.9), transparent 65%)',
      }}/>

      {/* slowly rotating gold halo */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '160%', height: '160%', marginLeft: '-80%', marginTop: '-80%',
        background: `conic-gradient(from 0deg,
          transparent 0deg,
          ${au.dark ? 'rgba(212,168,90,0.18)' : 'rgba(255,240,210,0.55)'} 60deg,
          transparent 120deg,
          ${au.dark ? 'rgba(212,168,90,0.1)' : 'rgba(255,240,210,0.3)'} 210deg,
          transparent 280deg,
          transparent 360deg)`,
        animation: `au_rotate_${id} 14s linear infinite`,
        opacity: 0.85,
      }}/>

      {/* marble flow lines */}
      <svg width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <path d="M0 80 Q 100 40 200 90 T 400 70" stroke={au.dark ? 'rgba(255,230,180,0.4)' : 'rgba(255,255,255,0.75)'} strokeWidth="1" fill="none"/>
        <path d="M0 140 Q 120 110 220 160 T 400 140" stroke={au.dark ? 'rgba(255,230,180,0.25)' : 'rgba(255,255,255,0.5)'} strokeWidth="0.8" fill="none"/>
        <path d="M0 200 Q 150 170 260 220 T 400 200" stroke="rgba(184,135,60,0.3)" strokeWidth="0.8" fill="none"/>
      </svg>

      {/* diagonal shimmer sweep */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
        background: `linear-gradient(90deg, transparent, ${au.dark ? 'rgba(255,230,180,0.22)' : 'rgba(255,255,255,0.7)'}, transparent)`,
        filter: 'blur(8px)',
        animation: `au_shimmer_${id} 4.5s ease-in-out infinite`,
      }}/>

      {/* floating + pulsing AD monogram in gold ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `au_float_${id} 4s ease-in-out infinite`,
      }}>
        <div style={{ animation: `au_pulse_${id} 3.5s ease-in-out infinite` }}>
          <svg width={Math.min(height * 0.62, 120)} height={Math.min(height * 0.62, 120)} viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id={`admg_${id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stopColor={au.dark ? '#F5E0B4' : '#FFFFFF'}/>
                <stop offset="45%" stopColor={au.dark ? '#E6BD78' : '#D4A85A'}/>
                <stop offset="100%" stopColor={au.dark ? '#8E6326' : '#7A5420'}/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" stroke={`url(#admg_${id})`} strokeWidth="2.2" fill="none"/>
            <text x="36" y="62" fontFamily='"Cormorant Garamond","Playfair Display",serif'
                  fontSize="42" fontWeight="600" fill={`url(#admg_${id})`}
                  textAnchor="middle" letterSpacing="-1.5">A</text>
            <text x="64" y="62" fontFamily='"Cormorant Garamond","Playfair Display",serif'
                  fontSize="42" fontWeight="600" fill={`url(#admg_${id})`}
                  textAnchor="middle" letterSpacing="-1.5">D</text>
          </svg>
        </div>
      </div>

      {/* twinkling sparkles */}
      {[
        { top: '18%', left: '22%', d: 0,   s: 6 },
        { top: '28%', right: '18%', d: 0.7, s: 4 },
        { top: '68%', left: '18%',  d: 1.4, s: 5 },
        { top: '75%', right: '24%', d: 2.1, s: 4 },
      ].map((p, i) => (
        <svg key={i} width={p.s * 2.4} height={p.s * 2.4} viewBox="0 0 20 20"
             style={{
               position: 'absolute', top: p.top, left: p.left, right: p.right,
               animation: `au_spark_${id} 2.4s ease-in-out ${p.d}s infinite`,
             }}>
          <path d="M10 2 L11 9 L18 10 L11 11 L10 18 L9 11 L2 10 L9 9 Z"
                fill={au.dark ? '#F0D49A' : '#FFFFFF'}/>
        </svg>
      ))}

      {/* wordmark at bottom */}
      <div style={{
        position: 'absolute', bottom: 14, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: AU_FONTS.serif,
        fontSize: Math.max(11, Math.min(height * 0.075, 15)),
        fontWeight: 500, letterSpacing: 3,
        color: au.dark ? '#F0D49A' : '#6B4A1C',
        textTransform: 'uppercase', opacity: 0.9,
      }}>Aurum Dent</div>
    </div>
  );
}

// ───────── Doctor avatar ─────────
function AuDoctorAvatar({ size = 72, tone = 'warm', female = true }) {
  const au = useAU();
  const bgGrad = au.dark
    ? (tone === 'warm' ? 'linear-gradient(160deg, #4A3A28, #2D2418)'
      : tone === 'cool' ? 'linear-gradient(160deg, #453728, #28201A)'
      : 'linear-gradient(160deg, #4E3D25, #2F2517)')
    : (tone === 'warm' ? 'linear-gradient(160deg, #F7E6CF, #E8C9A0)'
      : tone === 'cool' ? 'linear-gradient(160deg, #EEE5D3, #D9BC8B)'
      : 'linear-gradient(160deg, #F3E0C4, #DDB77F)');
  const hairColor = tone === 'cool' ? '#4A3420' : '#6B4423';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bgGrad, position: 'relative', overflow: 'hidden',
      boxShadow: `inset 0 0 0 1px ${au.dark ? 'rgba(212,168,90,0.25)' : 'rgba(184,135,60,0.15)'}`,
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', left: '50%', bottom: -size * 0.15,
        transform: 'translateX(-50%)',
        width: size * 0.95, height: size * 0.55, borderRadius: '50% 50% 0 0',
        background: au.dark ? '#E8DCC5' : '#FFFFFF',
      }}/>
      <div style={{
        position: 'absolute', left: '50%', bottom: size * 0.02,
        transform: 'translateX(-50%) rotate(45deg)',
        width: size * 0.18, height: size * 0.18,
        background: bgGrad,
      }}/>
      <div style={{
        position: 'absolute', left: '50%', top: size * 0.18,
        transform: 'translateX(-50%)',
        width: size * 0.42, height: size * 0.46, borderRadius: '50%',
        background: '#F3D6B5',
      }}/>
      {female ? (
        <>
          <div style={{ position: 'absolute', left: '50%', top: size * 0.14, transform: 'translateX(-50%)', width: size * 0.52, height: size * 0.35, borderRadius: '50% 50% 40% 40%', background: hairColor }}/>
          <div style={{ position: 'absolute', left: size * 0.22, top: size * 0.28, width: size * 0.14, height: size * 0.32, borderRadius: '40%', background: hairColor }}/>
          <div style={{ position: 'absolute', right: size * 0.22, top: size * 0.28, width: size * 0.14, height: size * 0.32, borderRadius: '40%', background: hairColor }}/>
        </>
      ) : (
        <div style={{ position: 'absolute', left: '50%', top: size * 0.13, transform: 'translateX(-50%)', width: size * 0.44, height: size * 0.22, borderRadius: '50% 50% 20% 20%', background: '#3A2818' }}/>
      )}
      <div style={{
        position: 'absolute', left: '50%', top: size * 0.35,
        transform: 'translateX(-50%)', display: 'flex', gap: size * 0.09,
      }}>
        <div style={{ width: size * 0.04, height: size * 0.04, borderRadius: '50%', background: '#3A2818' }}/>
        <div style={{ width: size * 0.04, height: size * 0.04, borderRadius: '50%', background: '#3A2818' }}/>
      </div>
      <div style={{
        position: 'absolute', left: '50%', top: size * 0.46,
        transform: 'translateX(-50%)',
        width: size * 0.12, height: size * 0.04,
        borderBottom: `1.2px solid rgba(150,90,50,0.6)`,
        borderRadius: '0 0 50% 50%',
      }}/>
    </div>
  );
}

Object.assign(window, {
  AU, makeTheme, ThemeCtx, useAU, AU_FONTS,
  AuStatusBar, AuLogo, AuTabBar, AuHomeIndicator, AuFrame,
  AuIconBadge, AuCard, AuButton, AuSectionHeading, AuPageTitle,
  AuInteriorImage, AuDoctorAvatar,
  serviceIcons, uiIcons, tabIcons,
});
