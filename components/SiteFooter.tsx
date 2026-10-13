import Link from 'next/link'
import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-mark">WSP</p>
          <p>宇宙開発プロジェクト</p>
        </div>
        <div>
          <p className="footer-label">Site</p>
          <ul className="footer-links">
            <li>
              <Link href="/projects">プロジェクト</Link>
            </li>
            <li>
              <Link href="/blog">活動記録</Link>
            </li>
            <li>
              <Link href="/about">団体について</Link>
            </li>
            <li>
              <Link href="/join">参加する</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-label">Repository</p>
          <ul className="footer-links">
            <li>
              <a href={site.repo}>wsp-space/wsp-website</a>
            </li>
            <li>
              <a href={`${site.repo}/issues`}>連絡は Issues へ</a>
            </li>
          </ul>
        </div>
        <p className="fine">
          プロジェクト紹介は、国内の学生宇宙開発団体に共通する活動の型で書いた初稿です。打上実績や所属の詳細は、決まり次第このサイトの記録で置き換えていきます。
        </p>
      </div>
    </footer>
  )
}
