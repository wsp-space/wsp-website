import Link from 'next/link'
import { media, site, socialLinks } from '@/lib/site'

const siteLinks = [
  { href: '/', label: 'トップ' },
  { href: '/projects', label: '活動紹介' },
  { href: '/archive', label: '過去プロジェクト' },
  { href: '/blog', label: 'ブログ' },
  { href: '/about', label: '団体について' },
  { href: '/join', label: '参加する' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="footer-logos">
            <img className="footer-logo" src={media('/logo_bg_dark.png')} alt="WSP" />
            <img className="footer-univ" src={media('/wakayama-univ-white.png')} alt="和歌山大学" />
          </div>
          <p>和歌山宇宙開発プロジェクト</p>
        </div>
        <div>
          <p className="footer-label">Site</p>
          <ul className="footer-links">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">Links</p>
          <ul className="footer-links">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="fine">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
