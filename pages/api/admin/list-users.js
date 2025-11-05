import fs from 'fs/promises';
export default async function handler(req, res) {
  try {
    const content = await fs.readFile('./data/users.json', 'utf8');
    const users = JSON.parse(content);
    return res.status(200).json({ users });
  } catch { return res.status(200).json({ users: [] }); }
}
