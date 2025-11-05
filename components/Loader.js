export default function Loader() {
  return (
    <div className="flex items-center gap-3 text-cyan-100">
      <div className="w-8 h-8 border-2 border-cyan-200/30 border-t-cyan-200 rounded-full animate-spin" />
      <p className="text-sm">Analyzing…</p>
    </div>
  )
}
