import type { Person } from '@/lib/site'

type Props = {
  id: string
  eyebrow: string
  title: string
  person: Person
  compact?: boolean
}

export function PersonMessage({ id, eyebrow, title, person, compact = false }: Props) {
  return (
    <section className={compact ? 'person-message is-compact' : 'person-message'} aria-labelledby={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <div className="pm-grid">
        {person.photo ? (
          <img className="pm-photo" src={person.photo} alt={person.name} />
        ) : (
          <span className="pm-photo pm-photo-empty" aria-hidden="true">
            {person.name.slice(0, 1)}
          </span>
        )}
        <div className="pm-body">
          {person.message.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="pm-sign">
            <span className="pm-role">{person.role}</span>
            <span className="pm-name">{person.name}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
