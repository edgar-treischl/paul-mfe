import { getGroupsSorted, type GroupId } from '../groupRegistry'
import { AppHeader } from '../components/AppHeader'
import { TopBackButton } from '../components/TopBackButton'
import { GroupCard } from '../components/GroupCard'
import { TeachersIcon, PupilsIcon, ParentsIcon } from '../assets/icons'
import '../styles/GroupSelector.css'

interface GroupSelectorPageProps {
  onSelectGroup: (groupId: GroupId) => void
  onBack: () => void
}

function getGroupIcon(groupId: GroupId) {
  const iconProps = {}
  switch (groupId) {
    case 'leh':
      return <TeachersIcon {...iconProps} />
    case 'sus':
      return <PupilsIcon {...iconProps} />
    case 'elt':
      return <ParentsIcon {...iconProps} />
    default:
      return null
  }
}

export function GroupSelectorPage({ onSelectGroup, onBack }: GroupSelectorPageProps) {
  return (
    <div className="paul-mfe paul-mfe__group-selector-page">
      <AppHeader onLogoClick={onBack} />
      <div className="paul-mfe__group-selector">
        <TopBackButton onBackClick={onBack} label="Zurück" />
        <div className="paul-mfe__group-selector-container">
          <GroupSelectorHeader />
          <GroupGrid onSelectGroup={onSelectGroup} />
        </div>
      </div>
    </div>
  )
}

function GroupSelectorHeader() {
  return (
    <div className="paul-mfe__group-selector-header">
      <h1 className="paul-mfe__group-selector-title">Ansicht wählen</h1>
      <p className="paul-mfe__group-selector-subtitle">
        Bitte wählen Sie eine Gruppe, für die Sie die Daten anzeigen möchten.
      </p>
    </div>
  )
}

interface GroupGridProps {
  onSelectGroup: (groupId: GroupId) => void
}

function GroupGrid({ onSelectGroup }: GroupGridProps) {
  const groups = getGroupsSorted()

  return (
    <div className="paul-mfe__group-grid">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          icon={getGroupIcon(group.id)}
          onSelect={() => onSelectGroup(group.id)}
        />
      ))}
    </div>
  )
}
