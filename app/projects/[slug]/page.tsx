import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PersonMessage } from '@/components/PersonMessage'
import { getProject, getProjects } from '@/lib/content'

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
    <article className="article article-project">
      <header className="project-head">
        <div>
          <p className="eyebrow">{project.kicker ?? 'Project'}</p>
          <h1>{project.title}</h1>
          <p className="lede">{project.excerpt}</p>
          <div className="article-meta">
            {project.status ? <span className="status">{project.status}</span> : null}
            <Link href="/projects">活動紹介</Link>
          </div>
        </div>
        {project.cover ? <img src={project.cover} alt="" className="project-cover" /> : null}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
      {project.pm ? (
        <PersonMessage id="pm-message" eyebrow="Message" title="PMからのメッセージ" person={project.pm} />
      ) : null}
    </article>
  )
}
