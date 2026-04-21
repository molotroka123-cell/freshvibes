const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { sign } = require('../auth');

const router = express.Router();

router.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'email & password required' } });
  const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Wrong email or password' } });
  }
  const access_token = sign({ uid: user.id, email: user.email, role: 'admin' });
  res.json({ access_token, user: { id: user.id, email: user.email, role: user.role } });
});

router.post('/client/register', (req, res) => {
  const { email, password, name, phone } = req.body || {};
  if (!email || !password || !name) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'email, password, name required' } });
  const existing = db.prepare('SELECT id FROM clients WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: { code: 'EMAIL_TAKEN', message: 'Email already registered' } });
  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare('INSERT INTO clients (email, password_hash, name, phone) VALUES (?, ?, ?, ?)').run(email, hash, name, phone || null);
  const access_token = sign({ uid: info.lastInsertRowid, email, role: 'client' });
  res.json({ access_token, user: { id: info.lastInsertRowid, email, name, role: 'client' } });
});

router.post('/client/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'email & password required' } });
  const user = db.prepare('SELECT * FROM clients WHERE email = ?').get(email);
  if (!user || !user.password_hash || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Wrong email or password' } });
  }
  const access_token = sign({ uid: user.id, email: user.email, role: 'client' });
  res.json({ access_token, user: { id: user.id, email: user.email, name: user.name, role: 'client' } });
});

module.exports = router;
