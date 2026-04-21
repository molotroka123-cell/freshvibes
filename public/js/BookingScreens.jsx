// BookingScreens.jsx — per-step booking screens + confirm (themed)

const DOCTORS = [
  { name: 'Kateřina Nováková', role: 'Terapeut',            tone: 'warm', female: true,  years: 12 },
  { name: 'Petr Svoboda',      role: 'Chirurg-implantolog', tone: 'cool', female: false, years: 16 },
  { name: 'Marie Dvořáková',   role: 'Ortodont',            tone: 'gold', female: true,  years: 9  },
  { name: 'Jan Černý',         role: 'Parodontolog',        tone: 'warm', female: false, years: 14 },
  { name: 'Olga Horáková',     role: 'Dětský stomatolog',   tone: 'cool', female: true,  years: 8  },
];

const SERVICES = [
  { icon: serviceIcons.tooth,        label: 'Терапия',        price: 'от 1 200 Kč' },
  { icon: serviceIcons.toothSparkle, label: 'Чистка',         price: 'от 2 400 Kč' },
  { icon: serviceIcons.search,       label: 'Диагностика',    price: 'от 700 Kč' },
  { icon: serviceIcons.toothSparkle, label: 'Отбеливание',    price: 'от 7 500 Kč' },
  { icon: serviceIcons.implant,      label: 'Имплантация',    price: 'от 22 500 Kč' },
  { icon: serviceIcons.diamond,      label: 'Эстетика',       price: 'от 3 800 Kč' },
];

const DATES = [
  { label: 'Сегодня', num: 23, mon: 'Květen' },
  { label: 'Pá',      num: 24, mon: 'Květen', selected: true },
  { label: 'So',      num: 25, mon: 'Květen' },
  { label: 'Ne',      num: 26, mon: 'Květen' },
  { label: 'Po',      num: 27, mon: 'Květen' },
];

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

// ───────── Header used across all booking steps ─────────
function AuBookingHeader() {
  const au = useAU();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px 16px', position: 'relative',
    }}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center' }}>
        {uiIcons.chevL(au.gold, 18)}
      </div>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <AuLogo size={26} />
      </div>
      <div style={{ width: 36 }} />
    </div>
  );
}

// ───────── Progress stepper bar ─────────
function AuStepper({ step }) {
  const au = useAU();
  return (
    <div style={{ display: 'flex', gap: 6, padding: '6px 20px 16px' }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i <= step ? au.gold : au.beige,
        }}/>
      ))}
    </div>
  );
}

// ───────── Text input ─────────
function AuTextInput({ icon, placeholder, value }) {
  const au = useAU();
  return (
    <div style={{
      height: 52, borderRadius: 14, border: `1px solid ${au.divider}`,
      background: au.inputBg,
      padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 14, color: value ? au.ink : au.muted,
    }}>
      {icon(au.muted, 18)}
      <div>{value || placeholder}</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// STEP 1 — Doctor
// ═════════════════════════════════════════════════════════════
function Step1DoctorScreen() {
  const au = useAU();
  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <AuBookingHeader />
      <AuPageTitle eyebrow="Шаг 1 из 4" title="Выберите врача" subtitle="Наши ведущие специалисты" />
      <AuStepper step={1}/>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10,
                    position: 'absolute', top: 218, left: 0, right: 0, bottom: 110, overflow: 'hidden' }}>
        {DOCTORS.slice(0, 4).map((d, i) => {
          const sel = i === 0;
          return (
            <div key={i} style={{
              background: sel ? au.beigeHi : au.card,
              border: sel ? `1.5px solid ${au.gold}` : '1px solid transparent',
              borderRadius: 20, padding: 14,
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: au.shadowSm,
            }}>
              <AuDoctorAvatar size={58} tone={d.tone} female={d.female}/>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: AU_FONTS.serif, fontSize: 18, fontWeight: 500,
                  color: au.ink, letterSpacing: 0.1,
                }}>{d.name}</div>
                <div style={{ fontSize: 12, color: au.muted, marginTop: 2 }}>{d.role}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 5, fontSize: 11, color: au.body }}>
                  <span style={{ color: au.gold }}>★ 4.9</span>
                  <span style={{ color: au.faint }}>•</span>
                  <span>Стаж {d.years} лет</span>
                </div>
              </div>
              {sel
                ? <div style={{ width: 24, height: 24, borderRadius: '50%', background: au.gold,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {uiIcons.check(au.dark ? '#1a1410' : '#fff', 14)}
                  </div>
                : <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1.5px solid ${au.goldTint}` }}/>}
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 38px',
        background: `linear-gradient(180deg, transparent, ${au.bg} 40%)`,
      }}>
        <AuButton>Далее</AuButton>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// STEP 2 — Service
// ═════════════════════════════════════════════════════════════
function Step2ServiceScreen() {
  const au = useAU();
  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <AuBookingHeader />
      <AuPageTitle eyebrow="Шаг 2 из 4" title="Выберите услугу" subtitle="Что вас интересует?" />
      <AuStepper step={2}/>

      <div style={{ padding: '0 20px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          {SERVICES.map((s, i) => {
            const sel = i === 0;
            return (
              <div key={i} style={{
                background: sel ? au.beigeHi : au.card,
                border: sel ? `1.5px solid ${au.gold}` : '1px solid transparent',
                borderRadius: 20, padding: '18px 14px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                gap: 10, position: 'relative',
                boxShadow: au.shadowSm, minHeight: 130,
              }}>
                {sel && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 22, height: 22, borderRadius: '50%', background: au.gold,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{uiIcons.check(au.dark ? '#1a1410' : '#fff', 12)}</div>
                )}
                <div style={{
                  width: 42, height: 42, borderRadius: 12, background: au.beige,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.icon(au.gold, 24)}</div>
                <div style={{
                  fontFamily: AU_FONTS.serif, fontSize: 18, fontWeight: 500,
                  color: au.ink, letterSpacing: 0.1, lineHeight: 1.1,
                }}>{s.label}</div>
                <div style={{ fontSize: 12, color: au.muted, fontWeight: 500 }}>{s.price}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 38px',
        background: `linear-gradient(180deg, transparent, ${au.bg} 40%)`,
      }}>
        <AuButton>Далее</AuButton>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// STEP 3 — Date & Time (calendar)
// ═════════════════════════════════════════════════════════════
function Step3DateScreen() {
  const au = useAU();
  const t = useT();

  // Mini calendar grid — May 2026
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // start pad, then 1..31
  const selectedDay = 24;

  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <AuBookingHeader />
      <AuPageTitle eyebrow={t.step3of4} title={t.dateTime} subtitle={t.dateTimeSub} />
      <AuStepper step={3}/>

      <div style={{ padding: '0 20px 10px' }}>
        <AuCard padding={16}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 14,
          }}>
            {uiIcons.chevL(au.muted, 16)}
            <div style={{
              fontFamily: AU_FONTS.serif, fontSize: 20, fontWeight: 500,
              color: au.ink, letterSpacing: 0.2,
            }}>{t.month}</div>
            {uiIcons.chevR(au.muted, 16)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {t.dow.map((w, i) => (
              <div key={i} style={{
                textAlign: 'center', fontSize: 11, fontWeight: 600,
                color: i >= 5 ? au.gold : au.muted, padding: '4px 0', letterSpacing: 1,
                fontFamily: AU_FONTS.serif,
              }}>{w}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {days.map((d, i) => {
              const inMonth = d >= 1 && d <= 31;
              const isSel = d === selectedDay;
              const isToday = d === 23;
              const isPast = inMonth && d < 23;
              const hasDot = [26, 28, 29].includes(d);
              return (
                <div key={i} style={{
                  height: 38, borderRadius: 10, position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: isSel ? 700 : 500,
                  background: isSel ? au.gold : 'transparent',
                  border: isToday && !isSel ? `1px solid ${au.goldTint}` : 'none',
                  color: !inMonth || isPast ? au.faint : isSel ? (au.dark ? '#1a1410' : '#fff') : au.ink,
                  boxShadow: isSel ? au.shadowCTA : 'none',
                  textDecoration: isPast ? 'line-through' : 'none',
                }}>
                  {inMonth ? d : ''}
                  {hasDot && !isSel && (
                    <div style={{
                      position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
                      width: 3, height: 3, borderRadius: '50%', background: au.gold,
                    }}/>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: `1px solid ${au.divider}`,
            display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, color: au.muted,
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: au.gold, display: 'inline-block' }}/>
              {t.legendSel}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${au.goldTint}`, display: 'inline-block' }}/>
              {t.legendToday}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: au.gold, display: 'inline-block' }}/>
              {t.legendFree}
            </span>
          </div>
        </AuCard>
      </div>

      <div style={{ padding: '4px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          margin: '10px 4px 10px',
        }}>
          <div style={{
            fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
            color: au.muted, letterSpacing: 2, textTransform: 'uppercase',
          }}>{t.freeOn(selectedDay)}</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 10, color: au.gold, fontWeight: 600,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: au.gold,
              boxShadow: `0 0 0 3px ${au.goldTint}40`,
            }}/>
            {t.slots(6)}
          </div>
        </div>

        {/* Period toggle */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 12,
          background: au.card, borderRadius: 12, padding: 4,
          boxShadow: au.shadowSm,
        }}>
          {[
            { label: t.morning,   sub: '9–12', active: false },
            { label: t.afternoon, sub: '12–17', active: true },
            { label: t.evening,   sub: '17–21', active: false },
          ].map((p, i) => (
            <div key={i} style={{
              flex: 1, padding: '7px 6px', borderRadius: 9,
              background: p.active ? au.gold : 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: p.active ? au.shadowCTA : 'none',
            }}>
              <div style={{
                fontFamily: AU_FONTS.serif, fontSize: 13, fontWeight: 500,
                color: p.active ? (au.dark ? '#1a1410' : '#fff') : au.ink,
                letterSpacing: 0.2,
              }}>{p.label}</div>
              <div style={{
                fontSize: 9.5, fontWeight: 500, marginTop: 1,
                color: p.active ? (au.dark ? 'rgba(26,20,16,0.65)' : 'rgba(255,255,255,0.8)') : au.muted,
              }}>{p.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { tm: '12:00', state: 'free' },
            { tm: '12:30', state: 'busy' },
            { tm: '13:00', state: 'free' },
            { tm: '13:30', state: 'free' },
            { tm: '14:00', state: 'busy' },
            { tm: '14:30', state: 'free' },
            { tm: '15:00', state: 'last' },
            { tm: '15:30', state: 'free' },
          ].map(({ tm, state }, i) => {
            const sel = tm === '13:00';
            const busy = state === 'busy';
            const last = state === 'last';
            return (
              <div key={i} style={{
                height: 46, borderRadius: 12, position: 'relative',
                background: sel ? au.gold : busy ? 'transparent' : au.card,
                border: sel ? 'none' : busy ? `1px dashed ${au.divider}` : `1px solid ${au.divider}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, letterSpacing: -0.2,
                color: sel ? (au.dark ? '#1a1410' : '#fff') : busy ? au.faint : au.ink,
                boxShadow: sel ? au.shadowCTA : busy ? 'none' : au.shadowSm,
                textDecoration: busy ? 'line-through' : 'none',
              }}>
                {tm}
                {last && (
                  <div style={{
                    fontSize: 8, fontWeight: 700, color: au.gold,
                    letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 1,
                  }}>{t.last}</div>
                )}
                {sel && (
                  <div style={{
                    fontSize: 8, fontWeight: 700,
                    color: au.dark ? 'rgba(26,20,16,0.75)' : 'rgba(255,255,255,0.9)',
                    letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 1,
                  }}>{t.selected}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Session duration hint */}
        <div style={{
          marginTop: 14, padding: '10px 14px',
          background: au.beigeHi, borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 11.5, color: au.body,
        }}>
          {uiIcons.clock(au.gold, 14)}
          <span>{t.duration(45, '13:45')}</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 38px',
        background: `linear-gradient(180deg, transparent, ${au.bg} 40%)`,
      }}>
        <AuButton>{t.next}</AuButton>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// STEP 4 — Details
// ═════════════════════════════════════════════════════════════
function Step4DetailsScreen() {
  const au = useAU();
  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <AuBookingHeader />
      <AuPageTitle eyebrow="Шаг 4 из 4" title="Ваши данные" subtitle="Последний шаг к записи" />
      <AuStepper step={4}/>

      <div style={{ padding: '0 20px 14px' }}>
        <div style={{
          fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
          color: au.muted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4,
        }}>Kontaktní údaje</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AuTextInput icon={uiIcons.user} placeholder="Jméno a příjmení" />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 78, height: 48, borderRadius: 14, background: au.card,
              border: `1px solid ${au.divider}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              fontSize: 13, fontWeight: 600, color: au.ink,
              boxShadow: au.shadowSm, flexShrink: 0,
            }}>
              <span style={{ fontSize: 14 }}>🇨🇿</span>
              <span>+420</span>
            </div>
            <div style={{ flex: 1 }}>
              <AuTextInput icon={uiIcons.phone} placeholder="234 567 890" />
            </div>
          </div>
          <AuTextInput icon={uiIcons.mail} placeholder="E-mail (nepovinné)" />
        </div>

        {/* First-visit toggle */}
        <div style={{
          marginTop: 10, padding: '12px 14px',
          background: au.card, borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: au.shadowSm,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: au.beigeHi,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{uiIcons.diamond ? uiIcons.diamond(au.gold, 16) : uiIcons.calendar(au.gold, 16)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: au.ink, letterSpacing: -0.1 }}>
              Prvnà návštěva
            </div>
            <div style={{ fontSize: 11.5, color: au.muted, marginTop: 1 }}>
              Získejte 10% slevu na první ošetření
            </div>
          </div>
          <div style={{
            width: 40, height: 24, borderRadius: 12, background: au.gold,
            position: 'relative', flexShrink: 0,
            boxShadow: au.shadowCTA,
          }}>
            <div style={{
              position: 'absolute', top: 2, right: 2,
              width: 20, height: 20, borderRadius: '50%',
              background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}/>
          </div>
        </div>
      </div>

      {/* Summary card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10, paddingLeft: 4, paddingRight: 4,
        }}>
          <div style={{
            fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
            color: au.muted, letterSpacing: 2, textTransform: 'uppercase',
          }}>Shrnutí rezervace</div>
          <div style={{
            fontSize: 10.5, fontWeight: 600, color: au.gold, letterSpacing: 0.3,
          }}>Upravit</div>
        </div>
        <AuCard padding={0}>
          <ConfirmRow label="Lékař" value="Kateřina Nováková" sub="Terapeut · 12 let praxe"/>
          <ConfirmRow label="Služba" value="Terapie" sub="1 200 Kč"/>
          <ConfirmRow label="Termín" value="Pá, 24. května" sub="13:00 · ~45 min"/>
          <div style={{
            padding: '12px 16px',
            borderTop: `1px dashed ${au.divider}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: au.beigeHi,
          }}>
            <div style={{
              fontFamily: AU_FONTS.serif, fontSize: 14, fontWeight: 500, color: au.ink,
              letterSpacing: 0.2,
            }}>Celkem</div>
            <div style={{
              fontFamily: AU_FONTS.serif, fontSize: 20, fontWeight: 500, color: au.gold,
              letterSpacing: 0.2,
            }}>1 080 Kč
              <span style={{
                fontSize: 10.5, color: au.muted, fontFamily: AU_FONTS.sans,
                fontWeight: 500, marginLeft: 6, textDecoration: 'line-through',
              }}>1 200 Kč</span>
            </div>
          </div>
        </AuCard>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 38px',
        background: `linear-gradient(180deg, transparent, ${au.bg} 50%)`,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <AuButton>Potvrdit rezervaci</AuButton>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 6, fontSize: 10.5, color: au.muted, paddingTop: 2,
        }}>
          {uiIcons.shield(au.muted, 12)}
          Vaše údaje jsou chráněny · GDPR
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Confirm screen
// ═════════════════════════════════════════════════════════════

const AU_SUCCESS_KEYFRAMES = `
@keyframes au-halo-in {
  0%   { transform: scale(0.3); opacity: 0; }
  55%  { transform: scale(1.08); opacity: 1; }
  75%  { transform: scale(0.96); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes au-check-draw {
  0%   { stroke-dashoffset: 48; opacity: 0; }
  30%  { opacity: 0; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes au-ring-pulse {
  0%   { transform: scale(0.4); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes au-spark-float {
  0%   { transform: translate(0,0) scale(0); opacity: 0; }
  20%  { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 1; }
  100% { transform: translate(calc(var(--dx) * 1.6), calc(var(--dy) * 1.6 - 40px)) scale(0); opacity: 0; }
}
@keyframes au-eyebrow-in {
  0%   { opacity: 0; transform: translateY(6px); letter-spacing: 1px; }
  100% { opacity: 1; transform: translateY(0); letter-spacing: 2.5px; }
}
@keyframes au-title-in {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

function SuccessBurst({ au }) {
  // 10 gold sparks at distributed angles
  const sparks = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + Math.PI / 7;
    const dist = 58 + (i % 3) * 14;
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      size: 2 + (i % 3),
      delay: 0.35 + (i % 5) * 0.04,
      dur: 1.4 + (i % 4) * 0.15,
    };
  });

  return (
    <div style={{
      position: 'relative', width: 140, height: 140,
      marginTop: 4, marginBottom: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Expanding ring pulse */}
      <div style={{
        position: 'absolute', width: 92, height: 92, borderRadius: '50%',
        border: `1.5px solid ${au.gold}`,
        animation: 'au-ring-pulse 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards',
        opacity: 0,
      }}/>

      {/* Gold sparks */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: s.size, height: s.size, borderRadius: '50%',
          background: au.gold,
          boxShadow: `0 0 6px ${au.gold}`,
          '--dx': `${s.dx}px`,
          '--dy': `${s.dy}px`,
          animation: `au-spark-float ${s.dur}s cubic-bezier(0.22, 1, 0.36, 1) ${s.delay}s forwards`,
          opacity: 0,
        }}/>
      ))}

      {/* Halo with check */}
      <div style={{
        width: 92, height: 92, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${au.dark ? '#E3C28A' : '#F5E0BB'}, ${au.goldSoft})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: au.dark ? '0 10px 30px rgba(212,168,90,0.4)' : '0 10px 30px rgba(184,135,60,0.35)',
        animation: 'au-halo-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        opacity: 0,
        position: 'relative', zIndex: 2,
      }}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.5l4.5 4.5L19 7"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{
              strokeDasharray: 48,
              strokeDashoffset: 48,
              animation: 'au-check-draw 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards',
            }}/>
        </svg>
      </div>
    </div>
  );
}

function ConfirmScreen() {
  const au = useAU();
  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <style>{AU_SUCCESS_KEYFRAMES}</style>
      <AuBookingHeader />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 24px' }}>
        <SuccessBurst au={au} />

        <div style={{
          fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
          color: au.gold, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10,
          opacity: 0,
          animation: 'au-eyebrow-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.75s forwards',
        }}>Успешно</div>

        <div style={{
          fontFamily: AU_FONTS.serif, fontSize: 28, fontWeight: 500,
          color: au.ink, letterSpacing: 0.2, textAlign: 'center',
          lineHeight: 1.1, whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'au-title-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards',
        }}>Запись подтверждена</div>
        <div style={{
          fontSize: 14, color: au.muted, marginTop: 12, textAlign: 'center', lineHeight: 1.45,
          opacity: 0,
          animation: 'au-title-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.95s forwards',
        }}>
          Мы отправили детали на ваш телефон.<br/>Ждём вас в Aurum Dent.
        </div>
      </div>

      <div style={{ padding: '12px 20px 0' }}>
        <AuCard padding={0}>
          <ConfirmRow label="Врач"   value="Kateřina Nováková" sub="Терапевт"/>
          <ConfirmRow label="Услуга" value="Терапевтический приём" sub="от 1 200 Kč"/>
          <ConfirmRow label="Дата"   value="Pá, 24. května 2026" sub="10:00" last/>
        </AuCard>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: au.beigeHi, borderRadius: 16, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12.5, color: au.body, lineHeight: 1.35,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: au.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{uiIcons.calendar(au.gold, 18)}</div>
          Добавим напоминание за день до приёма
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 38px',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <AuButton>На главную</AuButton>
        <div style={{
          textAlign: 'center', fontSize: 13, fontWeight: 600, color: au.gold, padding: 10,
        }}>Добавить в календарь</div>
      </div>
    </div>
  );
}

function ConfirmRow({ label, value, sub, last }) {
  const au = useAU();
  return (
    <div style={{
      padding: '14px 16px',
      borderBottom: last ? 'none' : `0.5px solid ${au.divider}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
    }}>
      <div style={{ fontSize: 11, color: au.muted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: AU_FONTS.serif, fontSize: 16, fontWeight: 500,
          color: au.ink, letterSpacing: 0.1,
        }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: au.muted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

Object.assign(window, {
  Step1DoctorScreen, Step2ServiceScreen, Step3DateScreen, Step4DetailsScreen,
  ConfirmScreen, AuBookingHeader, AuStepper, AuTextInput, ConfirmRow,
});
