'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/projects', label: 'プロジェクト' },
  { href: '/blog', label: '活動記録' },
  { href: '/about', label: '団体について' },
  { href: '/join', label: '参加する' },
]

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

export function SiteHeader() {
  const pathname = normalize(usePathname() || '/')

  return (
    <header className="header">
      <a className="skip" href="#main">
        本文へ
      </a>
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">WSP</span>
          <span className="brand-sub">宇宙開発プロジェクト</span>
        </Link>
        <nav className="nav" aria-label="主要">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'nav-link is-active' : 'nav-link'}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
