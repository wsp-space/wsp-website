import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PersonMessage } from '@/components/PersonMessage'
import { getArchive, getArchiveEntry } from '@/lib/content'

export const dynamicParams = false

const kickers = { rocket: 'Rocket', balloon: 'Balloon' } as const

export async function generateStaticParams() {
  const entries = await getArchive()
  return entries.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = await getArchiveEntry(slug)
  if (!entry) return { title: '見つかりません' }
  return { title: entry.title, description: entry.excerpt }
}

export default async function ArchiveEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await getArchiveEntry(slug)
  if (!entry) notFound()

  const kicker = entry.category ? kickers[entry.category] : 'Archive'

  return (
    <article className="article article-project">
      <header className="project-head">
        <div>
          <p className="eyebrow">
            {kicker}
            {entry.period ? <> — {entry.period}</> : null}
          </p>
          <h1>{entry.title}</h1>
          <p className="lede">{entry.excerpt}</p>
          <div className="article-meta">
            {entry.status ? <span className="status">{entry.status}</span> : null}
            <Link href="/archive">過去プロジェクト一覧</Link>
          </div>
        </div>
        {entry.cover ? <img src={entry.cover} alt="" className="project-cover" /> : null}
      </header>
      {entry.facts.length > 0 ? (
        <dl className="facts">
          {entry.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="prose" dangerouslySetInnerHTML={{ __html: entry.html }} />
      {entry.pm ? (
        <PersonMessage id="pm-message" eyebrow="Message" title="PMからのメッセージ" person={entry.pm} />
      ) : null}
      <p className="edit-link">
        <Link href="/archive">過去プロジェクト一覧へ</Link>
      </p>
    </article>
  )
}
