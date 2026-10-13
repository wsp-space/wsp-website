import type { Metadata } from 'next'
import { yearSteps } from '@/lib/site'

export const metadata: Metadata = {
  title: '団体について',
  description: 'WSPが何を作り、一年をどう回すかをまとめています。',
}

const venues = [
  {
    name: '能代宇宙イベント',
    body: '秋田県能代市で開かれる、学生ロケットの代表的な打上実験の場です。',
  },
  {
    name: '伊豆大島共同打上実験',
    body: '複数団体が機体を持ち寄り、同じ射場で打上と回収を行う実験です。',
  },
  {
    name: '種子島ロケットコンテスト',
    body: 'ロケットと CanSat の両方がある、学生向けのコンテストです。',
  },
  {
    name: 'UNISEC',
    body: '大学宇宙工学コンソーシアム。団体同士の横のつながりをまとめています。',
  },
]

export default function AboutPage() {
  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">About</p>
        <h1>学生が、機体の端から端まで持つ。</h1>
        <p className="lede">
          工学院大学 KASA、筑波大学 STEP、東北大学 FROM THE EARTH、名古屋大学 NAFT、埼玉大学あかとき。公開されている学生団体のサイトに共通しているのは、設計から打上、あるいは投下までを自分たちでやる、という一点です。WSPもそこに置きます。
        </p>
      </header>

      <div className="stack">
        <section className="block">
          <h2>ロケットと CanSat を両方やる</h2>
          <p>
            ハイブリッドロケットは、構造、推進、電装、回収が一つの機体に載ります。できることは多い一方、試験の前日まで人が足りなくなりやすい。CanSat は胴体が小さく、ミッション、制御、通信を短い周期で回せます。大きい機体だけだと試験が遠く、小さい機体だけだと推進と構造が残りません。二つの作業台を同時に置くのは、その穴を埋めるためです。
          </p>
        </section>

        <section className="block">
          <h2>一年の回り方</h2>
          <ol className="steps">
            {yearSteps.map((step) => (
              <li key={step.n}>
                <span className="step-no">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="block">
          <h2>外に出るときの地図</h2>
          <p>
            参加そのものは、まだ決めていません。国内の団体が機体を外に出すときに名前が挙がる場だけ、先に置いておきます。
          </p>
          <ul className="venue-list">
            {venues.map((venue) => (
              <li key={venue.name}>
                <strong>{venue.name}</strong>
                {venue.body}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
