import ResultCard from '@/components/ResultCard'
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50">CyberIntel Dashboard</h1>
      <p className="text-slate-400 text-sm max-w-2xl">Dark Neon razvedka paneli. IP, URL, EXIF, username, domain va hujjat metadata tahlilini bitta joyga jamlang.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <ResultCard title="Tez start">
          <ul className="text-xs space-y-2">
            <li>→ IP: <code className="text-cyan-200">/iplookup</code></li>
            <li>→ URL Scan: <code className="text-cyan-200">/linkscan</code></li>
            <li>→ EXIF: <code className="text-cyan-200">/exif</code></li>
          </ul>
        </ResultCard>
        <ResultCard title="Foydali g‘oyalar">
          <ul className="text-xs space-y-1">
            <li>• Email leak tekshiruv</li>
            <li>• Telegram/IG username qidiruv</li>
            <li>• Kripto hamyon monitoring</li>
            <li>• AI threat tahlilchi</li>
          </ul>
        </ResultCard>
        <ResultCard title="Status">
          <p className="text-xs text-emerald-300">Frontend: active</p>
          <p className="text-xs text-amber-200">API kalitlar: .env.local faylga qo‘shing</p>
        </ResultCard>
      </div>
    </div>
  )
}
