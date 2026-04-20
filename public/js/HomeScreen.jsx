// HomeScreen.jsx — Aurum Dent main screen (themed)

function HomeScreen() {
  const au = useAU();
  return (
    <div style={{ width: '100%', height: '100%', background: au.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 84, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 16px', position: 'relative',
        }}>
          <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {uiIcons.menu(au.gold, 24)}
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <AuLogo size={28} />
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Elegant serif hero */}
        <div style={{ position: 'relative', paddingLeft: 20, paddingTop: 8, paddingBottom: 18, display: 'flex' }}>
          <div style={{ flex: 1, paddingRight: 12, zIndex: 2, paddingTop: 14 }}>
            <div style={{
              fontFamily: AU_FONTS.sans, fontSize: 11, fontWeight: 600,
              color: au.gold, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10,
            }}>Премиальная стоматология</div>
            <div style={{
              fontFamily: AU_FONTS.serif, fontSize: 32, fontWeight: 500,
              color: au.ink, letterSpacing: 0.2, lineHeight: 1.05,
            }}>Добро<br/>пожаловать<br/>в Aurum Dent</div>
            <div style={{ fontSize: 13.5, color: au.muted, marginTop: 10, lineHeight: 1.45 }}>
              Профессиональная забота<br/>о вашей улыбке
            </div>
          </div>
          <div style={{ width: 160, height: 220, marginTop: -8 }}>
            <AuInteriorImage height={230} rounded={24}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}/>
          </div>
        </div>

        {/* CTA card */}
        <div style={{ padding: '4px 20px 22px' }}>
          <div style={{
            background: au.beigeHi, borderRadius: 20, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: au.shadowSm,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: au.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: au.shadowSm,
            }}>{uiIcons.calendarCheck(au.gold, 24)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: au.ink, letterSpacing: -0.2 }}>
                Записаться на приём
              </div>
              <div style={{ fontSize: 12.5, color: au.body, marginTop: 2 }}>
                Выберите удобную дату и время
              </div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: au.gold,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: au.shadowCTA,
            }}>{uiIcons.chevR(au.dark ? '#1a1410' : '#fff', 14)}</div>
          </div>
        </div>

        <AuSectionHeading title="Наши услуги" />
        <div style={{ display: 'flex', gap: 9, padding: '0 20px', marginBottom: 20 }}>
          {[
            { icon: serviceIcons.tooth,   label: 'Лечение' },
            { icon: serviceIcons.implant, label: 'Имплантация' },
            { icon: serviceIcons.diamond, label: 'Эстетика' },
            { icon: serviceIcons.shield,  label: 'Профилактика' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 0,
              background: au.card, borderRadius: 18, padding: '14px 4px 12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              boxShadow: au.shadowSm, overflow: 'hidden',
            }}>
              {s.icon(au.gold, 28)}
              <div style={{
                fontSize: 11, color: au.ink, textAlign: 'center', fontWeight: 600,
                letterSpacing: -0.2, lineHeight: 1.15, padding: '0 2px',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Working hours */}
        <div style={{ padding: '0 20px', marginBottom: 12 }}>
          <div style={{
            background: au.card, borderRadius: 20, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: au.shadowSm, overflow: 'hidden',
          }}>
            <AuIconBadge icon={uiIcons.clock} size={46} radius={14}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: au.ink, letterSpacing: -0.2 }}>Часы работы</div>
              <div style={{ fontSize: 13, color: au.body, marginTop: 2 }}>Пн – Вс: 9:00 – 21:00</div>
              <div style={{ fontSize: 12, color: au.muted, marginTop: 1 }}>Без выходных</div>
            </div>
            <div style={{ width: 76, height: 64 }}>
              <AuInteriorImage height={64} rounded={12}/>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            background: au.card, borderRadius: 20, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: au.shadowSm,
          }}>
            <AuIconBadge icon={uiIcons.phone} size={46} radius={14}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: au.ink, letterSpacing: -0.2 }}>Связаться с нами</div>
              <div style={{ fontSize: 13, color: au.body, marginTop: 2 }}>+420 234 567 890</div>
              <div style={{ fontSize: 12, color: au.muted, marginTop: 1 }}>Pařížská 12, Praha 1</div>
            </div>
            {uiIcons.chevR(au.gold, 16)}
          </div>
        </div>
      </div>

      <AuTabBar active="home"/>
    </div>
  );
}

window.HomeScreen = HomeScreen;
