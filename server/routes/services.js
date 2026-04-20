const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../auth');

const router = express.Router();

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM services WHERE active = 1 ORDER BY sort_order, id').all();
  res.json(rows);
});

router.get('/:slug', (req, res) => {
  const row = db.prepare('SELECT * FROM services WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
  res.json(row);
});

router.post('/', requireAdmin, (req, res) => {
  const { slug, name_cz, name_ru, name_en, description_cz, description_ru, description_en,
    duration_min, buffer_min = 15, price_czk = null, price_display = null, sort_order = 0 } = req.body || {};
  if (!slug || !name_cz || !name_ru || !name_en || !duration_min) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'slug, names and duration_min required' } });
  }
  try {
    const info = db.prepare(`INSERT INTO services
      (slug, name_cz, name_ru, name_en, description_cz, description_ru, description_en,
       duration_min, buffer_min, price_czk, price_display, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(slug, name_cz, name_ru, name_en, description_cz, description_ru, description_en,
        duration_min, buffer_min, price_czk, price_display, sort_order);
    res.json(db.prepare('SELECT * FROM services WHERE id = ?').get(info.lastInsertRowid));
  } catch (e) {
    res.status(409).json({ error: { code: 'CONFLICT', message: e.message } });
  }
});

router.patch('/:id', requireAdmin, (req, res) => {
  const fields = ['slug','name_cz','name_ru','name_en','description_cz','description_ru','description_en',
    'duration_min','buffer_min','price_czk','price_display','sort_order','active'];
  const sets = [];
  const vals = [];
  for (const f of fields) if (f in req.body) { sets.push(`${f} = ?`); vals.push(req.body[f]); }
  if (!sets.length) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'no fields' } });
  vals.push(req.params.id);
  db.prepare(`UPDATE services SET ${sets.join(', ')} WHERE id = ?`).run(...vals);
  res.json(db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requireAdmin, (req, res) => {
  db.prepare('UPDATE services SET active = 0 WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
