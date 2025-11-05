const SITES = [
  { name: 'Telegram', url: (u)=>`https://t.me/${u}` },
  { name: 'GitHub', url: (u)=>`https://github.com/${u}` },
  { name: 'X', url: (u)=>`https://x.com/${u}` },
  { name: 'Instagram', url: (u)=>`https://instagram.com/${u}` },
  { name: 'TikTok', url: (u)=>`https://www.tiktok.com/@${u}` },
  { name: 'Facebook', url: (u)=>`https://www.facebook.com/${u}` },
  { name: 'YouTube', url: (u)=>`https://www.youtube.com/${u}` },
  { name: 'Reddit', url: (u)=>`https://www.reddit.com/user/${u}` },
  { name: 'LinkedIn', url: (u)=>`https://www.linkedin.com/in/${u}` },
  { name: 'Pinterest', url: (u)=>`https://www.pinterest.com/${u}` },
];

export default async function handler(req, res) {
  const { u } = req.query;
  if (!u) return res.status(400).json({ error: 'u param required' });
  const results = await Promise.all(SITES.map(async (s) => {
    const target = s.url(u);
    try {
      let r = await fetch(target, { method: 'HEAD', redirect: 'manual' });
      if (r.status === 200) return { site: s.name, exists: true, url: target };
      r = await fetch(target, { method: 'GET', redirect: 'manual' });
      if (r.status === 200) return { site: s.name, exists: true, url: target };
      if (r.status >= 300 && r.status < 400) return { site: s.name, exists: true, url: target, redirect: true };
      return { site: s.name, exists: false, url: target, status: r.status };
    } catch (e) {
      return { site: s.name, exists: false, url: target, error: e.message };
    }
  }));
  return res.status(200).json({ results });
}
