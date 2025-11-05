import fs from 'fs/promises';
export default async function handler(req, res) {
  const { username } = req.body || {}; if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const content = await fs.readFile('./data/users.json', 'utf8');
    const users = JSON.parse(content);
    const filtered = users.filter(u => u.username !== username);
    await fs.writeFile('./data/users.json', JSON.stringify(filtered, null, 2));
    return res.status(200).json({ success: true });
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
