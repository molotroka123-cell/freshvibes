const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { requireAdmin, optionalAuth } = require('../auth');

const router = express.Router();

function addMinutes(iso, min) {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + min);
  return d.toISOString();
}

router.post('/', optionalAuth, (req, res) => {
  const { service_id, clinician_id, starts_at, client } = req.body || {};
  if (!service_id || !clinician_id || !starts_at || !client || !client.name || !client.gdpr_consent) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'service_id, clinician_id, starts_at, client.name, client.gdpr_consent required' } });
  }
  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(service_id);
  if (!service) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
  const clinician = db.prepare('SELECT * FROM clinicians WHERE id = ?').get(clinician_id);
  if (!clinician) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Clinician not found' } });

  const startDate = new Date(starts_at);
  if (Number.isNaN(startDate.getTime()) || startDate < new Date()) {
    return res.status(400).json({ error: { code: 'INVALID_TIME', message: 'starts_at must be a future ISO datetime' } });
  }
  const ends_at = addMinutes(starts_at, service.duration_min);

  let clientId = req.user && req.user.role === 'client' ? req.user.uid : null;
  if (!clientId && client.email) {
    const existing = db.prepare('SELECT id FROM clients WHERE email = ?').get(client.email);
    if (existing) {
      clientId = existing.id;
      db.prepare('UPDATE clients SET name = ?, phone = ? WHERE id = ?').run(client.name, client.phone || null, clientId);
    } else {
      const info = db.prepare('INSERT INTO clients (email, name, phone) VALUES (?, ?, ?)')
        .run(client.email, client.name, client.phone || null);
      clientId = info.lastInsertRowid;
    }
  }

  try {
    const info = db.prepare(`INSERT INTO appointments
      (clinician_id, service_id, client_id, starts_at, ends_at, status,
       client_name, client_phone, client_email, client_note, gdpr_consent_at)
      VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, datetime('now'))`)
      .run(clinician_id, service_id, clientId, starts_at, ends_at,
        client.name, client.phone || null, client.email || null, client.note || null);
    const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(info.lastInsertRowid);
    res.json({ ...appt, confirmation_token: crypto.createHash('sha256').update(`${appt.id}:${appt.starts_at}`).digest('hex').slice(0, 24) });
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) {
      return res.status(409).json({ error: { code: 'SLOT_TAKEN', message: 'Этот слот только что заняли. Обновите время.' } });
    }
    res.status(500).json({ error: { code: 'SERVER', message: e.message } });
  }
});

router.get('/:id', (req, res) => {
  const appt = db.prepare(`SELECT a.*, s.name_cz, s.name_ru, s.name_en, s.price_czk, s.duration_min,
    c.name as clinician_name, c.title as clinician_title
    FROM appointments a
    JOIN services s ON s.id = a.service_id
    JOIN clinicians c ON c.id = a.clinician_id
    WHERE a.id = ?`).get(req.params.id);
  if (!appt) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Appointment not found' } });
  res.json(appt);
});

router.post('/:id/cancel', (req, res) => {
  const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  if (!appt) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Appointment not found' } });
  db.prepare("UPDATE appointments SET status = 'cancelled' WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

// Admin
router.get('/', requireAdmin, (req, res) => {
  const { from, to, status } = req.query;
  const where = [];
  const params = [];
  if (from) { where.push('starts_at >= ?'); params.push(from); }
  if (to)   { where.push('starts_at <= ?'); params.push(to); }
  if (status) { where.push('status = ?'); params.push(status); }
  const sql = `SELECT a.*, s.name_ru as service_name, c.name as clinician_name
    FROM appointments a JOIN services s ON s.id = a.service_id JOIN clinicians c ON c.id = a.clinician_id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY a.starts_at DESC LIMIT 500`;
  res.json(db.prepare(sql).all(...params));
});

router.patch('/:id', requireAdmin, (req, res) => {
  const allowed = ['pending', 'confirmed', 'cancelled', 'no_show', 'completed'];
  const { status } = req.body || {};
  if (!allowed.includes(status)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'invalid status' } });
  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json(db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id));
});

module.exports = router;
