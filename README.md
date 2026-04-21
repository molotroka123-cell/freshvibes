# Aurum Dent

Тестовый прототип онлайн-записи в премиум-стоматологию «Aurum Dent» (Прага).
Фронт — точный перенос дизайн-пакета (6 iOS-экранов, RU/CZ/EN, светлая и тёмная темы).
Бэкенд — рабочий: Node/Express + SQLite, JWT-аутентификация админа и пациентов, CRUD услуг, врачей, записей, клиентов.

## Быстрый старт

```bash
npm install
npm run seed        # заливает демо-данные + создаёт админа
npm start           # http://localhost:3000
```

Креды админа по умолчанию (из `.env.example`):
- email: `admin@aurumdent.cz`
- пароль: `admin1234`

## Что доступно

- `/` — приложение (6 экранов, переключатель RU/CZ/EN и темы сверху справа)
- `/admin.html` — админка: записи, клиенты, услуги, врачи, смена статуса

## API

```
POST   /api/v1/auth/admin/login          { email, password } → { access_token }
POST   /api/v1/auth/client/register      { email, password, name, phone }
POST   /api/v1/auth/client/login         { email, password }

GET    /api/v1/services
GET    /api/v1/services/:slug
POST   /api/v1/services                  (admin)
PATCH  /api/v1/services/:id              (admin)
DELETE /api/v1/services/:id              (admin, soft-delete)

GET    /api/v1/clinicians
GET    /api/v1/clinicians/:slug
GET    /api/v1/clinicians/:id/working-hours
PUT    /api/v1/clinicians/:id/working-hours   (admin)
POST   /api/v1/clinicians                 (admin)
PATCH  /api/v1/clinicians/:id             (admin)
DELETE /api/v1/clinicians/:id             (admin)

GET    /api/v1/availability?service_id=&clinician_id=&from=YYYY-MM-DD&to=YYYY-MM-DD
POST   /api/v1/appointments               (optional client token)
GET    /api/v1/appointments/:id
POST   /api/v1/appointments/:id/cancel
GET    /api/v1/appointments               (admin, with ?from&to&status)
PATCH  /api/v1/appointments/:id           (admin, { status })

GET    /api/v1/clients                    (admin)
GET    /api/v1/clients/:id                (admin)
PATCH  /api/v1/clients/:id                (admin)
```

Защита от двойной брони — уникальный индекс `(clinician_id, starts_at)`: конкурентный запрос получит `409 SLOT_TAKEN`.

## Структура

```
server/
  index.js               Express entry
  db.js                  SQLite + схема
  auth.js                JWT + guards
  seed.js                демо-данные
  routes/                auth, services, clinicians, availability, appointments, clients
public/
  index.html             iOS-приложение (дизайн-пакет)
  admin.html             админ-панель
  css/app.css
  js/
    i18n.jsx             словари RU/CZ/EN (из дизайн-пакета)
    AurumUI.jsx          примитивы + темы (из дизайн-пакета)
    HomeScreen.jsx       домашний экран (из дизайн-пакета)
    BookingScreens.jsx   шаги 1–4 + Confirm (из дизайн-пакета)
    app.jsx              роутер экранов + data layer → API
design/                  оригинальный ZIP дизайна (референс, в прод не идёт)
```

## Заметки по дизайну

Фронт собран из дизайн-пакета (см. `design/README.md`). Палитра, типографика (Cormorant Garamond + Inter), spacing, анимации — как в оригинале. Навигация между экранами — через перехват кликов по CTA и плавающую панель управления (для быстрого обхода всех состояний во время теста). На финальном шаге CTA «Подтвердить запись» реально создаёт запись в БД.

«Всё на скорую руку» — визуал полный, но data-layer на фронте пока минимальный: экраны пользуются хардкодом из дизайна (врачи, услуги, слоты). Бэкенд уже принимает настоящие данные — фронт легко перевести на реальные API когда понадобится.

## Что не включено в v1

SMS, онлайн-оплата, Google Calendar sync, email-отправка (пишется в консоль сервера), мультиклиничность, личный кабинет клиента.
