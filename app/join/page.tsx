import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '参加する',
  description: 'WSPへの参加案内です。経験よりも、作業に来ることを優先しています。',
}

const roles = [
  { name: '構造', body: '図面、加工、組立。手を動かす時間が一番長い席です。' },
  { name: '推進', body: '供給系と燃焼器、地上試験の手順。安全側の確認を文章にします。' },
  { name: '電装', body: 'センサ、点火制御、通信。基板とケーブルの現物を残します。' },
  { name: 'ソフト', body: '搭載ソフト、地上局、試験ログの整理。CanSat 側の比重が大きいです。' },
  { name: '記録', body: '写真、測定値、中止の理由。このサイトの記事を書く席でもあります。' },
]

export default function JoinPage() {
  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">Join</p>
        <h1>週に一度、作業台に来る。</h1>
        <p className="lede">
          大学の宇宙系サークルの募集文に繰り返し出てくる条件は、ほぼ同じです。初心者でよい、代わりに作業に来ること。WSPもそこを募集の条件にします。学部や学科は問いません。
        </p>
      </header>

      <section className="block">
        <h2>席の名前</h2>
        <ul className="role-list">
          {roles.map((role) => (
            <li key={role.name}>
              <strong>{role.name}</strong>
              {role.body}
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>連絡</h2>
        <p>
          メールアドレスはまだ置いていません。用件はリポジトリの Issues に書いてください。参加の相談、活動記録の訂正、写真の差し替え、どれもそこで受けます。
        </p>
        <p>
          <a className="btn btn-solid" href={`${site.repo}/issues`}>
            Issues を開く
          </a>
        </p>
      </section>
    </div>
  )
}
