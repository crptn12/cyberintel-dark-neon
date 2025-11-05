import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_HASH = process.env.ADMIN_HASH || '';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const isAdmin = await bcrypt.compare(password, ADMIN_HASH);
  if (!isAdmin) return res.status(401).json({ error: 'Unauthorized' });
  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.setHeader('Set-Cookie', `ci_token=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Lax;`);
  return res.status(200).json({ ok: true });
}
