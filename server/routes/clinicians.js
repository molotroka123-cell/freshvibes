const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../auth');

const router = express.Router();

function withServices(row) {
  if (!row) return row;
  const ids = db.prepare('SELECT service_id FROM clinician_services WHERE clinician_id = ?').all(row.id).map(r => r.service_id);
  return { ...row, service_ids: ids };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM clinicians WHERE active = 1 ORDER BY sort_order, id').all();
  res.json(rows.map(withServices));
});

router.get('/:slug', (req, res) => {
  const row = db.prepare('SELECT * FROM clinicians WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Clinician not found' } });
  res.json(withServices(row));
});

router.post('/', requireAdmin, (req, res) => {
  const { slug, name, title, bio_short, bio_long, photo_url, sort_order = 0, service_ids = [] } = req.body || {};
  if (!slug || !name) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'slug & name required' } });
  try {
    const info = db.prepare(`INSERT INTO clinicians (slug, name, title, bio_short, bio_long, photo_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)`).run(slug, name, title, bio_short, bio_long, photo_url, sort_order);
    const ins = db.prepare('INSERT INTO clinician_services (clinician_id, service_id) VALUES (?, ?)');
    for (const sid of service_ids) ins.run(info.lastInsertRowid, sid);
    res.json(withServices(db.prepare('SELECT * FROM clinicians WHERE id = ?').get(info.lastInsertRowid)));
  } catch (e) {
    res.status(409).json({ error: { code: 'CONFLICT', message: e.message } });
  }
});

router.patch('/:id', requireAdmin, (req, res) => {
  const fields = ['slug','name','title','bio_short','bio_long','photo_url','sort_order','active'];
  const sets = [];
  const vals = [];
  for (const f of fields) if (f in req.body) { sets.push(`${f} = ?`); vals.push(req.body[f]); }
  if (sets.length) {
    vals.push(req.params.id);
    db.prepare(`UPDATE clinicians SET ${sets.join(', ')} WHERE id = ?`).run(...vals);
  }
  if (Array.isArray(req.body.service_ids)) {
    db.prepare('DELETE FROM clinician_services WHERE clinician_id = ?').run(req.params.id);
    const ins = db.prepare('INSERT INTO clinician_services (clinician_id, service_id) VALUES (?, ?)');
    for (const sid of req.body.service_ids) ins.run(req.params.id, sid);
  }
  res.json(withServices(db.prepare('SELECT * FROM clinicians WHERE id = ?').get(req.params.id)));
});

router.delete('/:id', requireAdmin, (req, res) => {
  db.prepare('UPDATE clinicians SET active = 0 WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

router.get('/:id/working-hours', (req, res) => {
  const rows = db.prepare('SELECT * FROM working_hours WHERE clinician_id = ? ORDER BY weekday').all(req.params.id);
  res.json(rows);
});

router.put('/:id/working-hours', requireAdmin, (req, res) => {
  const list = Array.isArray(req.body) ? req.body : [];
  const tx = db.transaction((items) => {
    db.prepare('DELETE FROM working_hours WHERE clinician_id = ?').run(req.params.id);
    const ins = db.prepare('INSERT INTO working_hours (clinician_id, weekday, starts_at, ends_at) VALUES (?, ?, ?, ?)');
    for (const it of items) ins.run(req.params.id, it.weekday, it.starts_at, it.ends_at);
  });
  tx(list);
  res.json(db.prepare('SELECT * FROM working_hours WHERE clinician_id = ? ORDER BY weekday').all(req.params.id));
});

module.exports = router;
