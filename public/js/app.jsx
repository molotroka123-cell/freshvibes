// app.jsx — Aurum Dent single-app router + data layer wiring to backend
// This replaces design-canvas.jsx (which rendered 6 artboards side-by-side).
// Screens themselves (HomeScreen, Step1…Step4, ConfirmScreen) are reused unchanged
// from the design handoff. Navigation is done by intercepting CTA button clicks.

const { useState, useEffect, useMemo, useCallback } = React;

const SCREENS = ['home', 'step1', 'step2', 'step3', 'step4', 'confirm'];
const API = '/api/v1';

function api(path, opts = {}) {
  return fetch(API + path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  }).then(async r => {
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error?.message || r.statusText);
    if (r.status === 204) return null;
    return r.json();
  });
}

function ControlPanel({ lang, setLang, theme, setTheme, screen, setScreen }) {
  const Btn = ({ active, children, onClick }) => (
    <button onClick={onClick} className={active ? 'active' : ''}>{children}</button>
  );
  return (
    <div className="au-controls">
      <Btn active={lang === 'ru'} onClick={() => setLang('ru')}>RU</Btn>
      <Btn active={lang === 'cs'} onClick={() => setLang('cs')}>CZ</Btn>
      <Btn active={lang === 'en'} onClick={() => setLang('en')}>EN</Btn>
      <div className="au-sep"/>
      <Btn active={theme === 'light'} onClick={() => setTheme('light')}>☼</Btn>
      <Btn active={theme === 'dark'} onClick={() => setTheme('dark')}>☾</Btn>
      <div className="au-sep"/>
      {SCREENS.map((s, i) => (
        <Btn key={s} active={screen === s} onClick={() => setScreen(s)}>
          {i === 0 ? 'Home' : i === 5 ? 'Confirm' : `S${i}`}
        </Btn>
      ))}
      <div className="au-sep"/>
      <a className="au-link" href="/admin.html">Admin →</a>
    </div>
  );
}

// CTA labels per language that should advance the flow
const NEXT_LABELS = ['Далее', 'Pokračovat', 'Continue', 'Записаться на приём',
  'Rezervovat termín', 'Book an appointment'];
const CONFIRM_LABELS = ['Подтвердить запись', 'Potvrdit rezervaci', 'Confirm booking'];
const HOME_LABELS = ['На главную', 'Na úvod', 'Back home'];

function AppRoot() {
  const [lang, setLang] = useState('ru');
  const [theme, setTheme] = useState('light');
  const [screen, setScreen] = useState('home');
  const [services, setServices] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    Promise.all([api('/services'), api('/clinicians')])
      .then(([s, c]) => { setServices(s); setClinicians(c); })
      .catch(e => setToast('API: ' + e.message));
  }, []);

  const goNext = useCallback(() => {
    setScreen(s => {
      const i = SCREENS.indexOf(s);
      return SCREENS[Math.min(i + 1, SCREENS.length - 1)];
    });
  }, []);

  const submitBooking = useCallback(async () => {
    if (submitting) return;
    if (!services.length || !clinicians.length) { setToast('Данные ещё грузятся…'); return; }
    const service = services[0];
    const cl = clinicians.find(c => c.service_ids?.includes(service.id)) || clinicians[0];
    const start = new Date();
    start.setDate(start.getDate() + 2);
    start.setHours(10, 0, 0, 0);
    setSubmitting(true);
    try {
      const r = await api('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          service_id: service.id,
          clinician_id: cl.id,
          starts_at: start.toISOString(),
          client: {
            name: 'Demo Patient',
            phone: '+420 777 123 456',
            email: `demo+${Date.now()}@aurumdent.cz`,
            note: 'Тестовая запись из booking flow',
            gdpr_consent: true,
          },
        }),
      });
      setToast(`✓ Запись #${r.id} создана`);
      setScreen('confirm');
    } catch (e) {
      setToast('✗ ' + e.message);
    } finally {
      setSubmitting(false);
    }
  }, [services, clinicians, submitting]);

  // Event delegation: intercept clicks on CTA buttons inside the iPhone frame.
  const onFrameClick = useCallback((e) => {
    const el = e.target.closest('[role="button"], button, div');
    if (!el) return;
    const txt = (el.textContent || '').trim();
    if (NEXT_LABELS.some(l => txt === l)) {
      if (screen === 'home') { setScreen('step1'); e.preventDefault(); }
      else if (screen.startsWith('step')) {
        const n = Number(screen.slice(4));
        if (n < 4) { setScreen('step' + (n + 1)); e.preventDefault(); }
      }
    } else if (CONFIRM_LABELS.some(l => txt === l)) {
      e.preventDefault();
      submitBooking();
    } else if (HOME_LABELS.some(l => txt === l)) {
      setScreen('home');
      e.preventDefault();
    }
  }, [screen, submitBooking]);

  const Screen = useMemo(() => ({
    home:    window.HomeScreen,
    step1:   window.Step1DoctorScreen,
    step2:   window.Step2ServiceScreen,
    step3:   window.Step3DateScreen,
    step4:   window.Step4DetailsScreen,
    confirm: window.ConfirmScreen,
  })[screen], [screen]);

  return (
    <>
      <ControlPanel lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}
                    screen={screen} setScreen={setScreen}/>
      <div className="au-stage" onClickCapture={onFrameClick}>
        <window.AuFrame theme={theme} lang={lang}>
          {Screen ? <Screen/> : <div style={{padding: 20}}>Loading…</div>}
        </window.AuFrame>
      </div>
      {submitting && <div style={toastStyle}>Сохраняем запись...</div>}
      {toast && !submitting && (
        <div style={toastStyle} onClick={() => setToast(null)}>{toast}</div>
      )}
    </>
  );
}

const toastStyle = {
  position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
  background: 'rgba(31,30,28,0.94)', color: '#FAF1DD',
  padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 500,
  fontFamily: 'Inter, sans-serif', zIndex: 200, cursor: 'pointer',
  boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppRoot/>);
