const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function sign(payload, expiresIn = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

function verify(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

function getToken(req) {
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7);
  return null;
}

function requireAdmin(req, res, next) {
  const t = getToken(req);
  const p = t && verify(t);
  if (!p || p.role !== 'admin') return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Admin token required' } });
  req.user = p;
  next();
}

function requireClient(req, res, next) {
  const t = getToken(req);
  const p = t && verify(t);
  if (!p || p.role !== 'client') return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Client token required' } });
  req.user = p;
  next();
}

function optionalAuth(req, _res, next) {
  const t = getToken(req);
  if (t) {
    const p = verify(t);
    if (p) req.user = p;
  }
  next();
}

module.exports = { sign, verify, requireAdmin, requireClient, optionalAuth };
