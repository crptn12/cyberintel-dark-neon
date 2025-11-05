export default async function handler(req, res) {
  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'url is required' });
  const vtKey = process.env.VT_API_KEY;
  const result = { url };
  try {
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'CyberIntel/1.0' } });
      const text = await r.text().catch(()=>null);
      const titleMatch = text ? text.match(/<title>([^<]*)<\/title>/i) : null;
      result.http_status = r.status;
      result.content_type = r.headers.get('content-type') || null;
      result.server = r.headers.get('server') || null;
      result.title = titleMatch ? titleMatch[1] : null;
    } catch (e) {
      result.fetch_error = 'Unable to fetch page';
    }
    if (vtKey) {
      const vtStart = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: { 'x-apikey': vtKey, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url })
      });
      const vtStartJson = await vtStart.json();
      if (vtStartJson.data && vtStartJson.data.id) {
        const analysisId = vtStartJson.data.id;
        const vtGet = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, { headers: { 'x-apikey': vtKey } });
        const vtJson = await vtGet.json();
        result.vt = vtJson;
      } else {
        result.vt = vtStartJson;
      }
    } else {
      result.note = 'VT API key not configured; showing basic fetch info';
    }
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: 'internal error', details: e.message });
  }
}
