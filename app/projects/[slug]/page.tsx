import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/lib/content'
import { githubEditUrl } from '@/lib/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: '見つかりません' }
  return { title: project.title, description: project.excerpt }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <article className="article">
      <p className="eyebrow">{project.kicker ?? 'Project'}</p>
      <h1>{project.title}</h1>
      <div className="article-meta">
        {project.status ? <span className="status">{project.status}</span> : null}
        <Link href="/projects">プロジェクト一覧</Link>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
      <p className="edit-link">
        <a href={githubEditUrl('projects', project.slug)}>GitHubでこのページを編集</a>
      </p>
    </article>
  )
}
