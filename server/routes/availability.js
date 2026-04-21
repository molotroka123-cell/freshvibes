const express = require('express');
const db = require('../db');

const router = express.Router();

const SLOT_STEP_MIN = 30;

function pad(n) { return String(n).padStart(2, '0'); }
function toMinutes(hhmm) { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; }
function fromMinutes(min) { return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`; }
function dateKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

function generateDaySlots(workingHour, durationMin, bufferMin) {
  const slots = [];
  const start = toMinutes(workingHour.starts_at);
  const end = toMinutes(workingHour.ends_at);
  for (let t = start; t + durationMin <= end; t += SLOT_STEP_MIN) {
    slots.push(fromMinutes(t));
  }
  return slots;
}

router.get('/', (req, res) => {
  const serviceId = Number(req.query.service_id);
  const clinicianId = req.query.clinician_id ? Number(req.query.clinician_id) : null;
  const from = req.query.from;
  const to = req.query.to;
  if (!serviceId || !from || !to) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'service_id, from, to required' } });
  }

  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId);
  if (!service) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });

  let clinicians;
  if (clinicianId) {
    const c = db.prepare('SELECT * FROM clinicians WHERE id = ? AND active = 1').get(clinicianId);
    clinicians = c ? [c] : [];
  } else {
    clinicians = db.prepare(`SELECT c.* FROM clinicians c
      JOIN clinician_services cs ON cs.clinician_id = c.id
      WHERE cs.service_id = ? AND c.active = 1`).all(serviceId);
  }

  const out = {};
  const fromD = new Date(from + 'T00:00:00');
  const toD = new Date(to + 'T00:00:00');

  for (let d = new Date(fromD); d <= toD; d.setDate(d.getDate() + 1)) {
    const key = dateKey(d);
    const weekday = (d.getDay() + 6) % 7;
    const allSlots = new Set();

    for (const cl of clinicians) {
      const wh = db.prepare('SELECT * FROM working_hours WHERE clinician_id = ? AND weekday = ?').get(cl.id, weekday);
      if (!wh) continue;
      const slots = generateDaySlots(wh, service.duration_min, service.buffer_min);
      const busy = db.prepare(`SELECT starts_at, ends_at FROM appointments
        WHERE clinician_id = ? AND status != 'cancelled'
        AND date(starts_at) = ?`).all(cl.id, key);
      const busyMin = busy.map(b => {
        const s = new Date(b.starts_at);
        const e = new Date(b.ends_at);
        return [s.getHours() * 60 + s.getMinutes(), e.getHours() * 60 + e.getMinutes() + service.buffer_min];
      });
      for (const slot of slots) {
        const sMin = toMinutes(slot);
        const eMin = sMin + service.duration_min;
        const overlaps = busyMin.some(([bs, be]) => sMin < be && eMin > bs);
        if (!overlaps) allSlots.add(slot);
      }
    }
    if (allSlots.size) out[key] = [...allSlots].sort();
  }
  res.json(out);
});

module.exports = router;
