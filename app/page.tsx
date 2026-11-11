import type { CSSProperties } from 'react'
import Link from 'next/link'
import { PostRow } from '@/components/PostRow'
import { ProjectCard } from '@/components/ProjectCard'
import { getPosts, getProjects } from '@/lib/content'
import { media, yearSteps } from '@/lib/site'

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()])
  const heroStyle = { '--hero-image': `url("${media('/hero.jpg')}")` } as CSSProperties

  return (
    <>
      <section className="hero" style={heroStyle}>
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow light">Space development project</p>
            <h1>
              計画から打上まで、
              <br />
              自分たちの手で。
            </h1>
            <p className="lede">
              WSPは、ハイブリッドロケットと成層圏気球を学生の手で設計・製作・試験するところまで進める宇宙開発プロジェクトです。
            </p>
            <div className="hero-actions">
              <Link href="/projects" className="btn btn-brass">
                活動紹介を見る
              </Link>
              <Link href="/blog" className="btn btn-line">
                ブログ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 — Projects</p>
              <h2>ロケットと気球</h2>
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
              <h2>プロジェクトの回り方</h2>
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
              <p className="eyebrow">03 — Blog</p>
              <h2>ブログ</h2>
            </div>
            <Link href="/blog" className="text-link">
              ブログ一覧
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
            <h2>未経験でも、宇宙を目指せる</h2>
            <p>問われるのは経験の有無よりもやる気です。一緒に宇宙を目指しませんか？</p>
          </div>
          <Link href="/join" className="btn btn-brass">
            参加の案内
          </Link>
        </div>
      </section>
    </>
  )
}
