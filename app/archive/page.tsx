import type { Metadata } from 'next'
import { ArchiveRail } from '@/components/ArchiveRail'
import { getArchive, type ArchiveCategory } from '@/lib/content'

export const metadata: Metadata = {
  title: '過去プロジェクト',
  description: 'WSPがこれまでに打ち上げたハイブリッドロケットと、放球した成層圏気球の記録です。',
}

const categories: { key: ArchiveCategory; kicker: string; title: string }[] = [
  { key: 'rocket', kicker: 'Rocket', title: 'ハイブリッドロケット' },
  { key: 'balloon', kicker: 'Balloon', title: '成層圏気球' },
]

export default async function ArchivePage() {
  const entries = await getArchive()

  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">Archive</p>
        <h1>過去プロジェクト</h1>
        <p className="lede">
          これまでに打ち上げたロケットと、放球した気球の記録です。右へ送るほど、古いプロジェクトに遡ります。
        </p>
      </header>
      {categories.map((category) => (
        <ArchiveRail
          key={category.key}
          id={`archive-${category.key}`}
          kicker={category.kicker}
          title={category.title}
          items={entries
            .filter((entry) => entry.category === category.key)
            .map((entry) => ({
              slug: entry.slug,
              title: entry.title,
              excerpt: entry.excerpt,
              cover: entry.cover,
              period: entry.period,
              status: entry.status,
            }))}
        />
      ))}
    </div>
  )
}
