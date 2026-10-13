import Link from 'next/link'
import type { Entry } from '@/lib/content'
import { formatDate } from '@/lib/site'

export function PostRow({ post }: { post: Entry }) {
  return (
    <Link href={`/blog/${post.slug}`} className="log-row">
      <time className="log-date" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <span>
        <span className="log-title">{post.title}</span>
        <span className="log-excerpt">{post.excerpt}</span>
      </span>
      {post.cover ? <img src={post.cover} alt="" className="thumb" /> : <span />}
    </Link>
  )
}
