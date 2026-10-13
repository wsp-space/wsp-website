import Link from 'next/link'
import { PostRow } from '@/components/PostRow'
import { ProjectCard } from '@/components/ProjectCard'
import { RocketMark } from '@/components/RocketMark'
import { getPosts, getProjects } from '@/lib/content'
import { yearSteps } from '@/lib/site'

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow light">Space development project</p>
            <h1>
              図面から打上まで、
              <br />
              自分たちの手で。
            </h1>
            <p className="lede">
              WSPは、ハイブリッドロケットと CanSat を学生の手で設計・製作・試験するところまで進める宇宙開発プロジェクトです。機体、推進、電装を別々の依頼先に分けず、同じ作業台の上でつなげます。
            </p>
            <div className="hero-actions">
              <Link href="/projects" className="btn btn-brass">
                プロジェクトを見る
              </Link>
              <Link href="/blog" className="btn btn-line">
                活動記録
              </Link>
            </div>
          </div>
          <RocketMark />
        </div>
        <div className="wrap">
          <dl className="nameplate">
            <div>
              <dt>つくるもの</dt>
              <dd>ハイブリッドロケット / CanSat</dd>
            </div>
            <div>
              <dt>進め方</dt>
              <dd>設計、製作、試験、報告</dd>
            </div>
            <div>
              <dt>記録</dt>
              <dd>活動日誌を GitHub で公開</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 — Projects</p>
              <h2>三つの作業台</h2>
            </div>
            <Link href="/projects" className="text-link">
              すべて見る
            </Link>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 — Cycle</p>
              <h2>一年の回り方</h2>
            </div>
          </div>
          <ol className="steps">
            {yearSteps.map((step) => (
              <li key={step.n}>
                <span className="step-no">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">03 — Log</p>
              <h2>活動記録</h2>
            </div>
            <Link href="/blog" className="text-link">
              記録一覧
            </Link>
          </div>
          <div className="log-list">
            {posts.slice(0, 3).map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="join-band">
        <div className="wrap join-inner">
          <div>
            <p className="eyebrow light">Join</p>
            <h2>未経験でも、図面の横に座れる。</h2>
            <p>切削もコードも、最初は隣で覚える前提です。経験の有無より、週のうち一度は作業に来ることを大事にしています。</p>
          </div>
          <Link href="/join" className="btn btn-brass">
            参加の案内
          </Link>
        </div>
      </section>
    </>
  )
}
