import type { Metadata } from 'next'
import { PostRow } from '@/components/PostRow'
import { getPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: '活動記録',
  description: '設計、製作、試験の記録です。記事と画像は同じフォルダに置きます。',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">Log</p>
        <h1>活動記録</h1>
        <p className="lede">
          一記事につき一フォルダ。本文は index.md、写真や図はその隣です。Markdown の相対パスが、そのままページの画像になります。
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="note">まだ記録がありません。</p>
      ) : (
        <div className="log-list">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
