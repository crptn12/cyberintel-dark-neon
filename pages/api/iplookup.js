export default async function handler(req, res) {
  const { ip } = req.query;
  if (!ip) return res.status(400).json({ error: 'ip param is required' });
  try {
    const token = process.env.IPINFO_TOKEN;
    const url = token ? `https://ipinfo.io/${ip}?token=${token}` : `https://ipinfo.io/${ip}/json`;
    const r = await fetch(url);
    const data = await r.json();
    return res.status(200).json({ ip: data.ip || ip, city: data.city || '', country: data.country || '', loc: data.loc || '', org: data.org || '' });
  } catch (e) {
    return res.status(500).json({ error: 'Servisga ulanishda xatolik' });
  }
}
