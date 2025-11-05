export default async function handler(req, res) {
  const { number } = req.query;
  if (!number) return res.status(400).json({ error: 'number required' });
  const key = process.env.NUMVERIFY_KEY;
  if (!key) {
    return res.status(200).json({ number, country_name: 'Uzbekistan', location: 'Tashkent', carrier: 'UzMobile', line_type: 'mobile', note: 'NUMVERIFY_KEY not set' });
  }
  try {
    const r = await fetch(`http://apilayer.net/api/validate?access_key=${key}&number=${number}`);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Servisga ulanmadi' });
  }
}
