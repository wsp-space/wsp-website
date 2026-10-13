import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="wrap article">
      <p className="eyebrow">404</p>
      <h1>そのページは図面にありません。</h1>
      <p>アドレスを確認するか、トップから入り直してください。</p>
      <Link href="/" className="btn btn-solid">
        トップへ戻る
      </Link>
    </div>
  )
}
