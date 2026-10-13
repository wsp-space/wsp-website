import type { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'プロジェクト',
  description: 'ハイブリッドロケット、推進・地上試験、CanSat の三つの作業台です。',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>三つの作業台</h1>
        <p className="lede">
          機体、推進、CanSat。それぞれフォルダが一つです。図面や写真を足したいときは、記事と同じように画像をフォルダへ置きます。
        </p>
      </header>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
