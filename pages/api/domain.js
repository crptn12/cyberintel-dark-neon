export default async function handler(req, res) {
  const { d } = req.query;
  if (!d) return res.status(400).json({ error: 'd required' });
  try {
    const r = await fetch(`https://dns.google/resolve?name=${d}&type=A`);
    const dns = await r.json();
    return res.status(200).json({ domain: d, dns });
  } catch (e) {
    return res.status(500).json({ error: 'DNS olishda xato' });
  }
}
