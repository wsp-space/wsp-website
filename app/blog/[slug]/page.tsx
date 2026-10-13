import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/content'
import { formatDate, githubEditUrl } from '@/lib/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: '見つかりません' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <article className="article">
      <p className="eyebrow">Log</p>
      <h1>{post.title}</h1>
      <div className="article-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.tags.length > 0 ? (
          <ul className="tags">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <p className="edit-link">
        <Link href="/blog">記録一覧へ</Link>
        {' · '}
        <a href={githubEditUrl('posts', post.slug)}>GitHubでこの記事を編集</a>
      </p>
    </article>
  )
}
