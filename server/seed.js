require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

const tx = db.transaction(() => {
  db.exec('DELETE FROM appointments; DELETE FROM clients; DELETE FROM working_hours; DELETE FROM clinician_services; DELETE FROM clinicians; DELETE FROM services; DELETE FROM admin_users;');

  const services = [
    { slug: 'therapy',     name_cz: 'Terapie',         name_ru: 'Терапия',     name_en: 'Therapy',
      duration_min: 45, price_czk: 1200, price_display: 'от 1 200 Kč', sort_order: 1,
      description_cz: 'Léčba zubního kazu a endodoncie.',
      description_ru: 'Лечение кариеса и эндодонтия.',
      description_en: 'Caries treatment and endodontics.' },
    { slug: 'cleaning',    name_cz: 'Dentální hygiena', name_ru: 'Чистка',     name_en: 'Cleaning',
      duration_min: 60, price_czk: 2400, price_display: 'от 2 400 Kč', sort_order: 2,
      description_cz: 'Profesionální dentální hygiena.',
      description_ru: 'Профессиональная гигиена.',
      description_en: 'Professional dental hygiene.' },
    { slug: 'diagnostics', name_cz: 'Diagnostika',     name_ru: 'Диагностика', name_en: 'Diagnostics',
      duration_min: 30, price_czk: 700, price_display: 'от 700 Kč', sort_order: 3,
      description_cz: 'Vstupní vyšetření a konzultace.',
      description_ru: 'Первичный осмотр и консультация.',
      description_en: 'Initial exam and consultation.' },
    { slug: 'whitening',   name_cz: 'Bělení zubů',     name_ru: 'Отбеливание', name_en: 'Whitening',
      duration_min: 90, price_czk: 7500, price_display: 'от 7 500 Kč', sort_order: 4,
      description_cz: 'Profesionální bělení v ordinaci.',
      description_ru: 'Профессиональное отбеливание.',
      description_en: 'In-office professional whitening.' },
    { slug: 'implant',     name_cz: 'Implantace',      name_ru: 'Имплантация', name_en: 'Implantation',
      duration_min: 90, price_czk: 22500, price_display: 'от 22 500 Kč', sort_order: 5,
      description_cz: 'Implantáty s 10letou zárukou.',
      description_ru: 'Импланты с 10-летней гарантией.',
      description_en: 'Implants with a 10-year warranty.' },
    { slug: 'aesthetic',   name_cz: 'Estetika',        name_ru: 'Эстетика',    name_en: 'Aesthetics',
      duration_min: 60, price_czk: 3800, price_display: 'от 3 800 Kč', sort_order: 6,
      description_cz: 'Estetické rekonstrukce a fasety.',
      description_ru: 'Эстетические реставрации и виниры.',
      description_en: 'Aesthetic restorations and veneers.' },
  ];

  const insertService = db.prepare(`INSERT INTO services
    (slug, name_cz, name_ru, name_en, description_cz, description_ru, description_en,
     duration_min, buffer_min, price_czk, price_display, sort_order)
    VALUES (@slug, @name_cz, @name_ru, @name_en, @description_cz, @description_ru, @description_en,
            @duration_min, 15, @price_czk, @price_display, @sort_order)`);
  const serviceIds = {};
  for (const s of services) serviceIds[s.slug] = insertService.run(s).lastInsertRowid;

  const doctors = [
    { slug: 'novakova', name: 'Kateřina Nováková', title: 'Терапевт',
      bio_short: 'Эстетическая реставрация и эндодонтия.', sort_order: 1, services: ['therapy','cleaning','diagnostics','aesthetic','whitening'] },
    { slug: 'svoboda', name: 'Petr Svoboda', title: 'Хирург-имплантолог',
      bio_short: 'Имплантация Straumann, костная пластика.', sort_order: 2, services: ['implant','diagnostics'] },
    { slug: 'dvorakova', name: 'Marie Dvořáková', title: 'Ортодонт',
      bio_short: 'Брекет-системы и элайнеры Invisalign.', sort_order: 3, services: ['diagnostics','aesthetic'] },
    { slug: 'cerny', name: 'Jan Černý', title: 'Пародонтолог',
      bio_short: 'Лечение дёсен и профилактика.', sort_order: 4, services: ['cleaning','diagnostics','therapy'] },
    { slug: 'horakova', name: 'Olga Horáková', title: 'Детский стоматолог',
      bio_short: 'Бережный приём детей с 3 лет.', sort_order: 5, services: ['therapy','diagnostics','cleaning'] },
  ];

  const insertDoc = db.prepare(`INSERT INTO clinicians (slug, name, title, bio_short, sort_order)
    VALUES (@slug, @name, @title, @bio_short, @sort_order)`);
  const linkSvc = db.prepare('INSERT INTO clinician_services (clinician_id, service_id) VALUES (?, ?)');
  const insertWH = db.prepare('INSERT INTO working_hours (clinician_id, weekday, starts_at, ends_at) VALUES (?, ?, ?, ?)');

  for (const d of doctors) {
    const id = insertDoc.run(d).lastInsertRowid;
    for (const slug of d.services) linkSvc.run(id, serviceIds[slug]);
    // Mon-Fri 9-18, Sat 10-15
    for (let wd = 0; wd <= 4; wd++) insertWH.run(id, wd, '09:00', '18:00');
    insertWH.run(id, 5, '10:00', '15:00');
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aurumdent.cz';
  const adminPass  = process.env.ADMIN_PASSWORD || 'admin1234';
  db.prepare('INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)')
    .run(adminEmail, bcrypt.hashSync(adminPass, 10), 'admin');

  console.log(`Seeded: ${services.length} services, ${doctors.length} doctors, admin=${adminEmail} / ${adminPass}`);
});

tx();
