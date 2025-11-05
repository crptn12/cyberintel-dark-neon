export default function ResultCard({ title, children }) {
  return (
    <div className="bg-black/20 border border-ci-border rounded-xl p-4 shadow-neon/10">
      <h2 className="text-sm font-semibold mb-3 text-cyan-100">{title}</h2>
      <div className="text-sm text-slate-100/80">
        {children}
      </div>
    </div>
  )
}
