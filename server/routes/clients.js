const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../auth');

const router = express.Router();

router.get('/', requireAdmin, (_req, res) => {
  const rows = db.prepare(`SELECT c.*, COUNT(a.id) AS appointments_count
    FROM clients c LEFT JOIN appointments a ON a.client_id = c.id
    GROUP BY c.id ORDER BY c.created_at DESC LIMIT 500`).all();
  res.json(rows);
});

router.get('/:id', requireAdmin, (req, res) => {
  const c = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
  if (!c) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Client not found' } });
  const appts = db.prepare(`SELECT a.*, s.name_ru AS service_name, cl.name AS clinician_name
    FROM appointments a JOIN services s ON s.id = a.service_id JOIN clinicians cl ON cl.id = a.clinician_id
    WHERE a.client_id = ? ORDER BY a.starts_at DESC`).all(req.params.id);
  res.json({ ...c, appointments: appts });
});

router.patch('/:id', requireAdmin, (req, res) => {
  const fields = ['name', 'phone', 'note'];
  const sets = [];
  const vals = [];
  for (const f of fields) if (f in req.body) { sets.push(`${f} = ?`); vals.push(req.body[f]); }
  if (!sets.length) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'no fields' } });
  vals.push(req.params.id);
  db.prepare(`UPDATE clients SET ${sets.join(', ')} WHERE id = ?`).run(...vals);
  res.json(db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id));
});

module.exports = router;
