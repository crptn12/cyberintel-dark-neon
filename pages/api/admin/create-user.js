import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
const USERS_FILE = './data/users.json';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
function verifyAdmin(req) {
  const cookie = req.headers.cookie || '';
  const token = cookie.split('ci_token=')[1];
  if (!token) return null;
  try { const data = jwt.verify(token.split(';')[0], JWT_SECRET); if (data.role !== 'admin') return null; return data; } catch { return null; }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const admin = verifyAdmin(req); if (!admin) return res.status(403).json({ error: 'Unauthorized: only admin allowed' });
  const { username, password } = req.body || {}; if (!username || !password) return res.status(400).json({ error: 'username & password required' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    let users = [];
    try { const content = await fs.readFile(USERS_FILE, 'utf8'); users = JSON.parse(content); } catch { users = []; }
    if (users.find(u => u.username === username)) { return res.status(400).json({ error: 'User already exists' }); }
    users.push({ username, password: hash, createdBy: admin.username, createdAt: new Date().toISOString() });
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    return res.status(200).json({ success: true, message: `User ${username} created.` });
  } catch (e) { return res.status(500).json({ error: 'internal error', details: e.message }); }
}
