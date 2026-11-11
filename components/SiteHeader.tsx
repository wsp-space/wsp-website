'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { media } from '@/lib/site'

const links = [
  { href: '/', label: 'トップ' },
  { href: '/projects', label: '活動紹介' },
  { href: '/archive', label: '過去プロジェクト' },
  { href: '/blog', label: 'ブログ' },
  { href: '/about', label: '団体について' },
  { href: '/join', label: '参加する' },
]

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

export function SiteHeader() {
  const pathname = normalize(usePathname() || '/')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={open ? 'header is-open' : 'header'}>
      <a className="skip" href="#main">
        本文へ
      </a>
      <div className="wrap header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <img className="brand-logo" src={media('/logo_colour_dark.png')} alt="WSP" />
          <span className="brand-sub">和歌山宇宙開発プロジェクト</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav" className="nav" aria-label="主要">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'nav-link is-active' : 'nav-link'}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
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
