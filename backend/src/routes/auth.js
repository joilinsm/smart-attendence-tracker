const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING id,email,name,role',
    [name, email, hash, role || 'student']
  );
  res.json(result.rows[0]);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT id,email,password_hash,role,name FROM users WHERE email=$1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

module.exports = router;
