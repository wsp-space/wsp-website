import type { Metadata } from 'next'
import Link from 'next/link'
import { PersonMessage } from '@/components/PersonMessage'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjects } from '@/lib/content'
import { representative } from '@/lib/site'

export const metadata: Metadata = {
  title: '活動紹介',
  description: 'WSPのプロジェクトは、ハイブリッドロケットと成層圏気球の二つです。',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="wrap page">
      <header className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>ロケットと気球</h1>
        <p className="lede">
          ハイブリッドロケットと成層圏気球。発足から打上・放球までを全てを自分たちで計画し実行します。
        </p>
      </header>

      <PersonMessage
        id="representative-message"
        eyebrow="Message"
        title="代表からのメッセージ"
        person={representative}
      />

      <div className="project-grid project-list">
        {projects.map((project) => (
          <div key={project.slug} className="project-item">
            <ProjectCard project={project} />
            {project.pm ? (
              <PersonMessage
                id={`pm-${project.slug}`}
                eyebrow={`${project.kicker ?? 'Project'} PM`}
                title={`${project.title} PMからのメッセージ`}
                person={project.pm}
                compact
              />
            ) : null}
          </div>
        ))}
      </div>

      <p className="more-link">
        <Link href="/archive" className="text-link">
          過去プロジェクトを見る
        </Link>
      </p>
    </div>
  )
}
