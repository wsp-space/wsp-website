'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export type RailItem = {
  slug: string
  title: string
  excerpt: string
  cover?: string
  period?: string
  status?: string
}

type Props = {
  id: string
  kicker: string
  title: string
  items: RailItem[]
}

export function ArchiveRail({ id, kicker, title, items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollBy = (direction: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.rail-card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.8
    const left = Math.min(track.scrollWidth - track.clientWidth, Math.max(0, track.scrollLeft + direction * step))
    track.scrollTo({ left, behavior: 'smooth' })
  }

  return (
    <section className="rail" aria-labelledby={id}>
      <div className="section-head">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h2 id={id}>{title}</h2>
        </div>
        {items.length > 1 ? (
          <div className="rail-controls">
            <span className="rail-hint">新しい順</span>
            <button
              type="button"
              className="rail-btn"
              aria-label="新しいプロジェクトへ戻る"
              disabled={edges.start}
              onClick={() => scrollBy(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="rail-btn"
              aria-label="古いプロジェクトへ進む"
              disabled={edges.end}
              onClick={() => scrollBy(1)}
            >
              →
            </button>
          </div>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="note">まだ掲載しているプロジェクトはありません。</p>
      ) : (
        <div
          className="rail-track"
          ref={trackRef}
          onScroll={update}
          role="region"
          aria-label={`${title}の過去プロジェクト`}
          tabIndex={0}
        >
          {items.map((item) => (
            <Link key={item.slug} href={`/archive/${item.slug}`} className="rail-card">
              {item.cover ? (
                <img src={item.cover} alt="" className="rail-visual" loading="lazy" />
              ) : (
                <span className="rail-visual rail-visual-empty">{kicker}</span>
              )}
              <span className="rail-body">
                <span className="rail-meta">
                  <span className="rail-period">{item.period}</span>
                  {item.status ? <span className="status">{item.status}</span> : null}
                </span>
                <span className="rail-title">{item.title}</span>
                <span className="rail-excerpt">{item.excerpt}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
