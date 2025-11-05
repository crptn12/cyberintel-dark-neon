export default async function handler(req, res) {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(400).json({ error: 'OpenAI key not configured' });
  const prompt = `Siz xavfsizlik tahlilchisiz. Quyidagi matnni tekshir: xavfsizmi, phishingmi, tahdidmi, misinformation yoki spammi. JSON formatda chiq: { category: "...", score: 0-1, reasons: ["..."] }. Matn: """${text}"""`;
  const r = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: 'user', content: prompt }], max_tokens: 300 }) });
  const j = await r.json();
  const reply = j?.choices?.[0]?.message?.content || '';
  try { const parsed = JSON.parse(reply); return res.status(200).json({ parsed, raw: reply }); } catch (e) { return res.status(200).json({ raw: reply }); }
}
