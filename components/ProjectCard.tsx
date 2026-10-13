import Link from 'next/link'
import type { Entry } from '@/lib/content'

export function ProjectCard({ project }: { project: Entry }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card">
      {project.cover ? <img src={project.cover} alt="" className="card-visual" /> : null}
      <div className="card-body">
        <div className="card-meta">
          <span className="kicker">{project.kicker}</span>
          {project.status ? <span className="status">{project.status}</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
      </div>
    </Link>
  )
}
