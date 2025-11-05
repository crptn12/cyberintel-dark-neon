export default async function handler(req, res) {
  const { addr } = req.query;
  if (!addr) return res.status(400).json({ error: 'addr required' });
  try {
    const r = await fetch(`https://apilist.tronscan.org/api/account?address=${addr}`);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
