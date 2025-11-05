export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'email required' });
  const key = process.env.HIBP_API_KEY;
  if (!key) return res.status(200).json({ note: 'HIBP key not configured' });
  try {
    const r = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, { headers: { 'hibp-api-key': key, 'user-agent': 'CyberIntel' } });
    if (r.status === 200) {
      const data = await r.json();
      return res.status(200).json({ breached: true, breaches: data });
    } else if (r.status === 404) {
      return res.status(200).json({ breached: false });
    } else {
      return res.status(500).json({ error: 'HIBP returned error', status: r.status });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
