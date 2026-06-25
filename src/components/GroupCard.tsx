import type { ReactNode } from 'react'
import type { GroupConfig, GroupId } from '../lib/registries/groupRegistry'

interface GroupCardProps {
  group: GroupConfig
  icon: ReactNode
  onSelect: (groupId: GroupId) => void
}

export function GroupCard({ group, icon, onSelect }: GroupCardProps) {
  return (
    <button
      className="paul-mfe__group-card"
      onClick={() => onSelect(group.id)}
      style={{ '--group-color': group.color } as React.CSSProperties}
      aria-label={`Wähle ${group.label}`}
    >
      <div className="paul-mfe__group-card-icon">{icon}</div>
      <div className="paul-mfe__group-card-content">
        <h2 className="paul-mfe__group-card-title">{group.label}</h2>
        <p className="paul-mfe__group-card-description">
          {group.description}
        </p>
      </div>
      <div className="paul-mfe__group-card-arrow">→</div>
    </button>
  )
}
