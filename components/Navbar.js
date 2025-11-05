import Link from 'next/link'
import { Shield, Camera, Globe2, Link2, User, Phone, FileText, Hash, GlobeLock } from 'lucide-react'
const links = [
  { href: '/', label: 'Dashboard', icon: Shield },
  { href: '/exif', label: 'EXIF', icon: Camera },
  { href: '/iplookup', label: 'IP Lookup', icon: Globe2 },
  { href: '/linkscan', label: 'URL Scan', icon: Link2 },
  { href: '/username', label: 'Username', icon: User },
  { href: '/phone', label: 'Phone', icon: Phone },
  { href: '/document', label: 'Document', icon: FileText },
  { href: '/hash', label: 'Hash', icon: Hash },
  { href: '/domain', label: 'Domain', icon: GlobeLock },
]
export default function Navbar() {
  return (
    <aside className="w-16 md:w-56 bg-black/20 border-r border-ci-border backdrop-blur-xl flex flex-col gap-3 py-4 px-2 md:px-4 sticky top-0 h-screen">
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/50 flex items-center justify-center">
          <Shield className="w-4 h-4 text-cyan-200" />
        </div>
        <span className="hidden md:block font-semibold tracking-tight text-sm">CyberIntel</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="group flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-cyan-400/10 transition">
            <item.icon className="w-5 h-5 text-cyan-200/80 group-hover:text-cyan-100" />
            <span className="hidden md:block text-sm text-slate-200/90">{item.label}</span>
          </Link>
        ))}
      </nav>
      <p className="hidden md:block text-xs text-slate-500">Dark Neon UI</p>
    </aside>
  )
}
