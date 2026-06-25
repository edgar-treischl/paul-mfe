import { groupRegistry, type GroupId } from '../groupRegistry'
import { AppHeader } from './AppHeader'
import { TopBackButton } from './TopBackButton'
import '../styles/GroupSelector.css'

interface GroupSelectorProps {
  onSelectGroup: (groupId: GroupId) => void
  onBack: () => void
}

export function GroupSelector({ onSelectGroup, onBack }: GroupSelectorProps) {
  return (
    <div className="paul-mfe paul-mfe__group-selector-page">
      <AppHeader onLogoClick={onBack} />
      <div className="paul-mfe__group-selector">
        <TopBackButton onBackClick={onBack} label="Zurück" />
        <div className="paul-mfe__group-selector-container">
          <div className="paul-mfe__group-selector-header">
            <h1 className="paul-mfe__group-selector-title">Ansicht wählen</h1>
            <p className="paul-mfe__group-selector-subtitle">
              Bitte wählen Sie eine Gruppe, für die Sie die Daten anzeigen möchten.
            </p>
          </div>

          <div className="paul-mfe__group-grid">
            {groupRegistry.map((group) => (
              <button
                key={group.id}
                className="paul-mfe__group-card"
                onClick={() => onSelectGroup(group.id)}
                style={{ '--group-color': group.color } as React.CSSProperties}
              >
                <div className="paul-mfe__group-card-icon">{group.emoji}</div>
                <div className="paul-mfe__group-card-content">
                  <h2 className="paul-mfe__group-card-title">{group.label}</h2>
                  <p className="paul-mfe__group-card-description">
                    {group.description}
                  </p>
                </div>
                <div className="paul-mfe__group-card-arrow">→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
