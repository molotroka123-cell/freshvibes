require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

const api = express.Router();
api.use('/auth', require('./routes/auth'));
api.use('/services', require('./routes/services'));
api.use('/clinicians', require('./routes/clinicians'));
api.use('/availability', require('./routes/availability'));
api.use('/appointments', require('./routes/appointments'));
api.use('/clients', require('./routes/clients'));
api.get('/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.use('/api/v1', api);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/admin', (_req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'admin.html')));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  const count = db.prepare('SELECT COUNT(*) AS n FROM services').get().n;
  console.log(`Aurum Dent server on http://localhost:${port} · services in DB: ${count}`);
  if (count === 0) console.log("Run 'npm run seed' to populate demo data.");
});
